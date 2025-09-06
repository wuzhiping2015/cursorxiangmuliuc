const axios = require('axios');
const Store = require('electron-store');
const crypto = require('crypto');

class Translator {
    constructor() {
        this.store = new Store();
        this.services = {
            baidu: {
                name: '百度翻译',
                url: 'https://fanyi-api.baidu.com/api/trans/vip/translate',
                weight: 100
            },
            youdao: {
                name: '有道翻译',
                url: 'https://openapi.youdao.com/api',
                weight: 90
            },
            libre: {
                name: 'LibreTranslate',
                url: 'https://libretranslate.de/translate',
                weight: 80
            }
        };

        this.serviceStatus = {
            baidu: { available: true, weight: 100 },
            youdao: { available: true, weight: 90 },
            libre: { available: true, weight: 80 }
        };
    }

    // 设置API密钥
    setApiKeys(service, keys) {
        if (this.services[service]) {
            this.services[service].keys = keys;
            this.store.set(`apiKeys.${service}`, keys);
            return true;
        }
        return false;
    }

    // 获取服务状态
    getServiceStatus() {
        return this.serviceStatus;
    }

    // 获取统计信息
    getStats() {
        return this.store.get('stats') || { totalTranslations: 0, successfulTranslations: 0 };
    }

    // 更新服务状态
    updateServiceStatus(service, available, weight) {
        if (this.serviceStatus[service]) {
            this.serviceStatus[service].available = available;
            if (weight) this.serviceStatus[service].weight = weight;
        }
    }

    // 百度翻译实现
    async baiduTranslate(text, from, to) {
        const { url, keys } = this.services.baidu;
        if (!keys || !keys.appid || !keys.key) {
            throw new Error('百度翻译API密钥未配置');
        }

        const salt = Date.now();
        const sign = crypto.createHash('md5')
            .update(keys.appid + text + salt + keys.key)
            .digest('hex');

        try {
            const response = await axios.get(url, {
                params: {
                    q: text,
                    from: from === 'auto' ? 'auto' : from,
                    to: to,
                    appid: keys.appid,
                    salt: salt,
                    sign: sign
                }
            });

            if (response.data && response.data.trans_result) {
                return response.data.trans_result[0].dst;
            }
            throw new Error(response.data.error_msg || '翻译失败');
        } catch (error) {
            console.error('百度翻译失败:', error);
            throw error;
        }
    }

    // 有道翻译实现
    async youdaoTranslate(text, from, to) {
        const { url, keys } = this.services.youdao;
        if (!keys || !keys.appid || !keys.key) {
            throw new Error('有道翻译API密钥未配置');
        }

        const salt = Date.now();
        const curtime = Math.round(new Date().getTime() / 1000);
        const sign = crypto.createHash('sha256')
            .update(keys.appid + text + salt + curtime + keys.key)
            .digest('hex');

        try {
            const response = await axios.post(url, {
                q: text,
                from: from === 'auto' ? 'auto' : from,
                to: to,
                appKey: keys.appid,
                salt: salt,
                sign: sign,
                signType: 'v3',
                curtime: curtime
            });

            if (response.data && response.data.translation) {
                return response.data.translation[0];
            }
            throw new Error(response.data.errorMessage || '翻译失败');
        } catch (error) {
            console.error('有道翻译失败:', error);
            throw error;
        }
    }

    // LibreTranslate实现
    async libreTranslate(text, from, to) {
        const { url } = this.services.libre;
        try {
            const response = await axios.post(url, {
                q: text,
                source: from === 'auto' ? 'auto' : from,
                target: to
            });

            if (response.data && response.data.translatedText) {
                return response.data.translatedText;
            }
            throw new Error('翻译失败');
        } catch (error) {
            console.error('LibreTranslate失败:', error);
            throw error;
        }
    }

    // 主翻译方法
    async translate(text, from = 'auto', to = 'en') {
        // 检查缓存
        const cacheKey = `${text}:${from}:${to}`;
        const cached = this.store.get(`cache.${cacheKey}`);
        if (cached) {
            return cached;
        }

        // 按权重排序可用的翻译服务
        const availableServices = Object.entries(this.serviceStatus)
            .filter(([_, status]) => status.available)
            .sort((a, b) => b[1].weight - a[1].weight)
            .map(([service]) => service);

        let lastError = null;

        for (const service of availableServices) {
            try {
                let result;
                switch (service) {
                    case 'baidu':
                        result = await this.baiduTranslate(text, from, to);
                        break;
                    case 'youdao':
                        result = await this.youdaoTranslate(text, from, to);
                        break;
                    case 'libre':
                        result = await this.libreTranslate(text, from, to);
                        break;
                    default:
                        continue;
                }

                // 缓存结果
                this.store.set(`cache.${cacheKey}`, result);

                // 更新统计
                const stats = this.getStats();
                stats.totalTranslations++;
                stats.successfulTranslations++;
                this.store.set('stats', stats);

                return result;
            } catch (error) {
                lastError = error;
                this.updateServiceStatus(service, false);
                continue;
            }
        }

        const errorMessage = lastError ? lastError.message : '所有翻译服务均失败';
        throw new Error(errorMessage);
    }
}

module.exports = new Translator();