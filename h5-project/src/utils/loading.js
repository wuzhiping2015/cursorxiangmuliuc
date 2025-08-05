/**
 * Loading 加载工具函数
 * 提供全局加载状态的便捷调用方法
 * @author 前端工程师团队
 * @date 2024-12-XX
 */

/**
 * Loading 实例
 */
let loadingInstance = null
let loadingCount = 0

/**
 * 设置 Loading 实例
 * @param {Object} instance Loading 组件实例
 */
export const setLoadingInstance = (instance) => {
    loadingInstance = instance
}

/**
 * 显示全屏加载
 * @param {Object} options 配置选项
 * @param {string} options.text 加载文本
 * @param {string} options.type 动画类型
 * @param {boolean} options.overlay 是否显示遮罩
 * @param {string} options.background 背景颜色
 * @param {string} options.color 主题色
 * @returns {Function} 关闭函数
 */
export const showLoading = (options = {}) => {
    if (!loadingInstance) {
        console.warn('Loading 组件未初始化')
        return () => {}
    }

    loadingCount++

    // 合并默认配置
    const config = {
        text: '加载中...',
        type: 'default',
        overlay: true,
        fullscreen: true,
        ...options
    }

    loadingInstance.show(config)

    // 返回关闭函数
    return () => {
        hideLoading()
    }
}

/**
 * 隐藏全屏加载
 */
export const hideLoading = () => {
    if (!loadingInstance) {
        console.warn('Loading 组件未初始化')
        return
    }

    loadingCount = Math.max(0, loadingCount - 1)

    if (loadingCount === 0) {
        loadingInstance.hide()
    }
}

/**
 * 强制隐藏所有加载状态
 */
export const forceHideLoading = () => {
    if (!loadingInstance) {
        console.warn('Loading 组件未初始化')
        return
    }

    loadingCount = 0
    loadingInstance.hide()
}

/**
 * 显示简单加载
 * @param {string} text 加载文本
 * @returns {Function} 关闭函数
 */
export const showSimpleLoading = (text = '加载中...') => {
    return showLoading({
        text,
        type: 'default'
    })
}

/**
 * 显示点点加载动画
 * @param {string} text 加载文本
 * @returns {Function} 关闭函数
 */
export const showDotsLoading = (text = '请稍候...') => {
    return showLoading({
        text,
        type: 'dots'
    })
}

/**
 * 显示圆圈加载动画
 * @param {string} text 加载文本
 * @returns {Function} 关闭函数
 */
export const showCircleLoading = (text = '处理中...') => {
    return showLoading({
        text,
        type: 'circle'
    })
}

/**
 * 显示条形加载动画
 * @param {string} text 加载文本
 * @returns {Function} 关闭函数
 */
export const showBarsLoading = (text = '加载中...') => {
    return showLoading({
        text,
        type: 'bars'
    })
}

/**
 * API 请求加载包装器
 * @param {Function} apiCall API 请求函数
 * @param {Object} options 加载配置
 * @returns {Promise} API 请求结果
 */
export const withLoading = async(apiCall, options = {}) => {
    const hideLoadingFn = showLoading(options)

    try {
        const result = await apiCall()
        return result
    } finally {
        hideLoadingFn()
    }
}

/**
 * 创建局部加载状态管理器
 * @returns {Object} 加载状态管理器
 */
export const createLocalLoading = () => {
    let isLoading = false
    let loadingTimeout = null

    return {
        /**
         * 开始加载
         * @param {number} delay 延迟显示时间（毫秒）
         */
        start(delay = 300) {
            if (loadingTimeout) {
                clearTimeout(loadingTimeout)
            }

            if (delay > 0) {
                loadingTimeout = setTimeout(() => {
                    isLoading = true
                }, delay)
            } else {
                isLoading = true
            }
        },

        /**
         * 停止加载
         */
        stop() {
            if (loadingTimeout) {
                clearTimeout(loadingTimeout)
                loadingTimeout = null
            }
            isLoading = false
        },

        /**
         * 获取加载状态
         */
        get loading() {
            return isLoading
        }
    }
}

/**
 * 防抖加载（防止加载状态闪烁）
 * @param {Function} apiCall API 请求函数
 * @param {number} minDuration 最小显示时间（毫秒）
 * @param {Object} options 加载配置
 * @returns {Promise} API 请求结果
 */
export const withDebounceLoading = async(apiCall, minDuration = 500, options = {}) => {
    const startTime = Date.now()
    const hideLoadingFn = showLoading(options)

    try {
        const result = await apiCall()

        // 确保加载至少显示指定时间
        const elapsed = Date.now() - startTime
        if (elapsed < minDuration) {
            await new Promise(resolve => setTimeout(resolve, minDuration - elapsed))
        }

        return result
    } finally {
        hideLoadingFn()
    }
}

// 默认导出对象
export default {
    show: showLoading,
    hide: hideLoading,
    forceHide: forceHideLoading,

    // 快捷方法
    simple: showSimpleLoading,
    dots: showDotsLoading,
    circle: showCircleLoading,
    bars: showBarsLoading,

    // 包装器
    withLoading,
    withDebounceLoading,
    createLocal: createLocalLoading,

    // 实例管理
    setInstance: setLoadingInstance
}