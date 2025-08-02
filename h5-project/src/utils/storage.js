/**
 * 本地存储工具类
 * 封装localStorage操作，支持过期时间和数据加密
 * @author 前端工程师团队
 * @date 2024-12-XX
 */

/**
 * 本地存储工具类
 */
class Storage {
    constructor() {
        this.prefix = 'h5_invite_' // 存储键名前缀
    }

    /**
     * 获取完整的存储键名
     * @param {string} key 原始键名
     * @returns {string} 完整键名
     */
    getFullKey(key) {
        return `${this.prefix}${key}`
    }

    /**
     * 设置存储
     * @param {string} key 键名
     * @param {*} value 值
     * @param {number} expire 过期时间（毫秒）
     * @param {boolean} encrypt 是否加密
     */
    set(key, value, expire = null, encrypt = false) {
        try {
            const data = {
                value: encrypt ? this.encrypt(value) : value,
                expire: expire ? Date.now() + expire : null,
                timestamp: Date.now(),
                encrypted: encrypt
            }

            const fullKey = this.getFullKey(key)
            localStorage.setItem(fullKey, JSON.stringify(data))

            console.log(`[Storage] Set: ${key}`, { expire, encrypt })
        } catch (error) {
            console.error(`[Storage] Set Error: ${key}`, error)
        }
    }

    /**
     * 获取存储
     * @param {string} key 键名
     * @returns {*} 存储值
     */
    get(key) {
        try {
            const fullKey = this.getFullKey(key)
            const item = localStorage.getItem(fullKey)

            if (!item) {
                return null
            }

            const data = JSON.parse(item)

            // 检查是否过期
            if (data.expire && Date.now() > data.expire) {
                this.remove(key)
                console.log(`[Storage] Expired: ${key}`)
                return null
            }

            // 解密数据
            const value = data.encrypted ? this.decrypt(data.value) : data.value

            console.log(`[Storage] Get: ${key}`)
            return value
        } catch (error) {
            console.error(`[Storage] Get Error: ${key}`, error)
            return null
        }
    }

    /**
     * 移除存储
     * @param {string} key 键名
     */
    remove(key) {
        try {
            const fullKey = this.getFullKey(key)
            localStorage.removeItem(fullKey)
            console.log(`[Storage] Remove: ${key}`)
        } catch (error) {
            console.error(`[Storage] Remove Error: ${key}`, error)
        }
    }

    /**
     * 清空存储（仅清空当前应用的数据）
     */
    clear() {
        try {
            const keys = Object.keys(localStorage)
            keys.forEach(key => {
                if (key.startsWith(this.prefix)) {
                    localStorage.removeItem(key)
                }
            })
            console.log('[Storage] Clear all')
        } catch (error) {
            console.error('[Storage] Clear Error', error)
        }
    }

    /**
     * 获取所有存储的键名
     * @returns {Array} 键名数组
     */
    keys() {
        try {
            const keys = Object.keys(localStorage)
            return keys
                .filter(key => key.startsWith(this.prefix))
                .map(key => key.replace(this.prefix, ''))
        } catch (error) {
            console.error('[Storage] Keys Error', error)
            return []
        }
    }

    /**
     * 获取存储大小（字节）
     * @returns {number} 存储大小
     */
    size() {
        try {
            let total = 0
            const keys = Object.keys(localStorage)

            keys.forEach(key => {
                if (key.startsWith(this.prefix)) {
                    const value = localStorage.getItem(key)
                    total += new Blob([value]).size
                }
            })

            return total
        } catch (error) {
            console.error('[Storage] Size Error', error)
            return 0
        }
    }

    /**
     * 检查存储是否存在
     * @param {string} key 键名
     * @returns {boolean} 是否存在
     */
    has(key) {
        const value = this.get(key)
        return value !== null
    }

    /**
     * 设置临时存储（页面刷新后清除）
     * @param {string} key 键名
     * @param {*} value 值
     */
    setSession(key, value) {
        try {
            const fullKey = this.getFullKey(key)
            sessionStorage.setItem(fullKey, JSON.stringify({
                value,
                timestamp: Date.now()
            }))
            console.log(`[SessionStorage] Set: ${key}`)
        } catch (error) {
            console.error(`[SessionStorage] Set Error: ${key}`, error)
        }
    }

    /**
     * 获取临时存储
     * @param {string} key 键名
     * @returns {*} 存储值
     */
    getSession(key) {
        try {
            const fullKey = this.getFullKey(key)
            const item = sessionStorage.getItem(fullKey)

            if (!item) {
                return null
            }

            const data = JSON.parse(item)
            console.log(`[SessionStorage] Get: ${key}`)
            return data.value
        } catch (error) {
            console.error(`[SessionStorage] Get Error: ${key}`, error)
            return null
        }
    }

    /**
     * 移除临时存储
     * @param {string} key 键名
     */
    removeSession(key) {
        try {
            const fullKey = this.getFullKey(key)
            sessionStorage.removeItem(fullKey)
            console.log(`[SessionStorage] Remove: ${key}`)
        } catch (error) {
            console.error(`[SessionStorage] Remove Error: ${key}`, error)
        }
    }

    /**
     * 简单加密
     * @param {*} data 要加密的数据
     * @returns {string} 加密后的字符串
     */
    encrypt(data) {
        try {
            const jsonString = JSON.stringify(data)
                // 简单的Base64编码（注意：这不是安全的加密，仅用于混淆）
            return btoa(encodeURIComponent(jsonString))
        } catch (error) {
            console.error('[Storage] Encrypt Error', error)
            return data
        }
    }

    /**
     * 简单解密
     * @param {string} encryptedData 加密的数据
     * @returns {*} 解密后的数据
     */
    decrypt(encryptedData) {
        try {
            const jsonString = decodeURIComponent(atob(encryptedData))
            return JSON.parse(jsonString)
        } catch (error) {
            console.error('[Storage] Decrypt Error', error)
            return encryptedData
        }
    }

    /**
     * 清理过期数据
     */
    cleanExpired() {
        try {
            const keys = this.keys()
            let cleanedCount = 0

            keys.forEach(key => {
                const fullKey = this.getFullKey(key)
                const item = localStorage.getItem(fullKey)

                if (item) {
                    try {
                        const data = JSON.parse(item)
                        if (data.expire && Date.now() > data.expire) {
                            localStorage.removeItem(fullKey)
                            cleanedCount++
                        }
                    } catch (error) {
                        // 数据格式错误，也删除
                        localStorage.removeItem(fullKey)
                        cleanedCount++
                    }
                }
            })

            console.log(`[Storage] Cleaned ${cleanedCount} expired items`)
            return cleanedCount
        } catch (error) {
            console.error('[Storage] Clean Expired Error', error)
            return 0
        }
    }

    /**
     * 获取存储信息
     * @returns {Object} 存储信息
     */
    getInfo() {
        try {
            const keys = this.keys()
            const totalSize = this.size()
            const maxSize = 5 * 1024 * 1024 // 5MB（大概的localStorage限制）

            return {
                totalKeys: keys.length,
                totalSize,
                maxSize,
                usagePercentage: Math.round((totalSize / maxSize) * 100),
                availableSize: maxSize - totalSize,
                keys
            }
        } catch (error) {
            console.error('[Storage] Get Info Error', error)
            return {
                totalKeys: 0,
                totalSize: 0,
                maxSize: 0,
                usagePercentage: 0,
                availableSize: 0,
                keys: []
            }
        }
    }
}

// 创建单例实例
const storage = new Storage()

// 定期清理过期数据
if (typeof window !== 'undefined') {
    // 页面加载时清理一次
    storage.cleanExpired()

    // 每30分钟清理一次过期数据
    setInterval(() => {
        storage.cleanExpired()
    }, 30 * 60 * 1000)
}

export default storage