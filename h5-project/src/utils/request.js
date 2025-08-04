/**
 * HTTP 请求封装工具
 * 基于 axios 封装的请求库，包含拦截器和错误处理
 * @author 前端工程师团队
 * @date 2024-12-XX
 */

import axios from 'axios'
import storage from './storage'

/**
 * 创建 axios 实例
 */
const request = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL || '/api',
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json'
    }
})

/**
 * 请求拦截器
 * 统一处理请求头、token等
 */
request.interceptors.request.use(
    config => {
        // 添加时间戳防止缓存
        if (config.method === 'get') {
            config.params = {
                ...config.params,
                _t: Date.now()
            }
        }

        // 添加用户token
        const token = storage.get('token')
        if (token) {
            config.headers.Authorization = `Bearer ${token}`
        }

        // 添加请求标识
        config.headers['X-Request-ID'] = generateRequestId()

        console.log(`[Request] ${config.method?.toUpperCase()} ${config.url}`, config.data || config.params)
        return config
    },
    error => {
        console.error('[Request Error]', error)
        return Promise.reject(error)
    }
)

/**
 * 响应拦截器
 * 统一处理响应数据和错误
 */
request.interceptors.response.use(
    response => {
        const { code, data, message } = response.data

        console.log(`[Response] ${response.config.url}`, response.data)

        // 成功响应
        if (code === 200 || code === 0) {
            return data
        }

        // 业务错误
        const error = new Error(message || '请求失败')
        error.code = code
        error.response = response

        // 特殊错误码处理
        if (code === 401) {
            handleUnauthorized()
        } else if (code === 403) {
            showMessage('权限不足')
        } else if (code === 500) {
            showMessage('服务器错误，请稍后重试')
        }

        return Promise.reject(error)
    },
    error => {
        console.error('[Response Error]', error)

        let message = '网络错误'

        if (error.response) {
            // 服务器响应错误
            const { status, data } = error.response
            switch (status) {
                case 400:
                    message = data?.message || '请求参数错误'
                    break
                case 401:
                    message = '用户未登录'
                    handleUnauthorized()
                    break
                case 403:
                    message = '权限不足'
                    break
                case 404:
                    message = '请求的资源不存在'
                    break
                case 429:
                    message = '请求过于频繁，请稍后重试'
                    break
                case 500:
                    message = '服务器内部错误'
                    break
                case 502:
                    message = '网关错误'
                    break
                case 503:
                    message = '服务暂时不可用'
                    break
                default:
                    message = data?.message || `服务器错误 (${status})`
            }
        } else if (error.request) {
            // 网络错误
            if (error.code === 'ECONNABORTED') {
                message = '请求超时，请检查网络连接'
            } else {
                message = '网络连接失败，请检查网络'
            }
        }

        showMessage(message)

        const customError = new Error(message)
        customError.code = error.response?.status || 'NETWORK_ERROR'
        customError.original = error

        return Promise.reject(customError)
    }
)

/**
 * 处理未授权错误
 */
function handleUnauthorized() {
    // 清除本地存储的用户信息
    storage.remove('token')
    storage.remove('userInfo')

    // 重定向到登录页面或首页
    if (window.location.pathname !== '/') {
        window.location.href = '/'
    }
}

/**
 * 显示错误消息
 * @param {string} message 错误消息
 */
function showMessage(message) {
    // 这里可以集成Toast组件或其他消息提示
    console.warn('[API Message]', message)

    // 如果有全局消息组件，可以这样调用
    // if (window.$toast) {
    //   window.$toast.error(message)
    // }
}

/**
 * 生成请求ID
 * @returns {string} 请求ID
 */
function generateRequestId() {
    return Math.random().toString(36).substr(2, 9) + Date.now().toString(36)
}

/**
 * 请求方法封装
 */
const api = {
    /**
     * GET 请求
     * @param {string} url 请求地址
     * @param {Object} params 请求参数
     * @param {Object} config 配置选项
     * @returns {Promise} 请求结果
     */
    get(url, params = {}, config = {}) {
        return request.get(url, { params, ...config })
    },

    /**
     * POST 请求
     * @param {string} url 请求地址
     * @param {Object} data 请求数据
     * @param {Object} config 配置选项
     * @returns {Promise} 请求结果
     */
    post(url, data = {}, config = {}) {
        return request.post(url, data, config)
    },

    /**
     * PUT 请求
     * @param {string} url 请求地址
     * @param {Object} data 请求数据
     * @param {Object} config 配置选项
     * @returns {Promise} 请求结果
     */
    put(url, data = {}, config = {}) {
        return request.put(url, data, config)
    },

    /**
     * DELETE 请求
     * @param {string} url 请求地址
     * @param {Object} config 配置选项
     * @returns {Promise} 请求结果
     */
    delete(url, config = {}) {
        return request.delete(url, config)
    },

    /**
     * PATCH 请求
     * @param {string} url 请求地址
     * @param {Object} data 请求数据
     * @param {Object} config 配置选项
     * @returns {Promise} 请求结果
     */
    patch(url, data = {}, config = {}) {
        return request.patch(url, data, config)
    },

    /**
     * 上传文件
     * @param {string} url 上传地址
     * @param {FormData} formData 文件数据
     * @param {Object} config 配置选项
     * @returns {Promise} 上传结果
     */
    upload(url, formData, config = {}) {
        return request.post(url, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            },
            ...config
        })
    },

    /**
     * 下载文件
     * @param {string} url 下载地址
     * @param {Object} params 请求参数
     * @param {string} filename 文件名
     * @returns {Promise} 下载结果
     */
    async download(url, params = {}, filename = '') {
        try {
            const response = await request.get(url, {
                params,
                responseType: 'blob'
            })

            // 创建下载链接
            const blob = new Blob([response])
            const downloadUrl = window.URL.createObjectURL(blob)
            const link = document.createElement('a')
            link.href = downloadUrl
            link.download = filename || `download_${Date.now()}`
            document.body.appendChild(link)
            link.click()
            document.body.removeChild(link)
            window.URL.revokeObjectURL(downloadUrl)

            return { success: true }
        } catch (error) {
            console.error('文件下载失败:', error)
            return { success: false, message: error.message }
        }
    }
}

// 导出请求实例和封装方法
export default api
export { request }