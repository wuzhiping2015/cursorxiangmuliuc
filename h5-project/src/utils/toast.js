/**
 * Toast 消息提示工具函数
 * 提供全局消息提示的便捷调用方法
 * @author 前端工程师团队
 * @date 2024-12-XX
 */

/**
 * Toast 实例
 */
let toastInstance = null

/**
 * 设置 Toast 实例
 * @param {Object} instance Toast 组件实例
 */
export const setToastInstance = (instance) => {
  toastInstance = instance
}

/**
 * 显示 Toast 消息
 * @param {Object} options 配置选项
 * @param {string} options.type 消息类型: success|error|warning|info|loading
 * @param {string} options.message 消息内容
 * @param {string} options.title 消息标题（可选）
 * @param {number} options.duration 持续时间（毫秒），0为不自动消失
 * @param {boolean} options.closable 是否可手动关闭
 * @param {Function} options.onClick 点击回调
 * @returns {string} Toast ID
 */
export const showToast = (options) => {
  if (!toastInstance) {
    console.warn('Toast 组件未初始化')
    return null
  }
  
  return toastInstance.addToast(options)
}

/**
 * 显示成功消息
 * @param {string} message 消息内容
 * @param {Object} options 额外选项
 * @returns {string} Toast ID
 */
export const showSuccess = (message, options = {}) => {
  return showToast({
    type: 'success',
    message,
    ...options
  })
}

/**
 * 显示错误消息
 * @param {string} message 消息内容
 * @param {Object} options 额外选项
 * @returns {string} Toast ID
 */
export const showError = (message, options = {}) => {
  return showToast({
    type: 'error',
    message,
    duration: 4000, // 错误消息显示更长时间
    ...options
  })
}

/**
 * 显示警告消息
 * @param {string} message 消息内容
 * @param {Object} options 额外选项
 * @returns {string} Toast ID
 */
export const showWarning = (message, options = {}) => {
  return showToast({
    type: 'warning',
    message,
    ...options
  })
}

/**
 * 显示信息消息
 * @param {string} message 消息内容
 * @param {Object} options 额外选项
 * @returns {string} Toast ID
 */
export const showInfo = (message, options = {}) => {
  return showToast({
    type: 'info',
    message,
    ...options
  })
}

/**
 * 显示加载消息
 * @param {string} message 消息内容
 * @param {Object} options 额外选项
 * @returns {string} Toast ID
 */
export const showLoading = (message = '加载中...', options = {}) => {
  return showToast({
    type: 'loading',
    message,
    duration: 0, // 加载消息不自动消失
    closable: false, // 加载消息不可手动关闭
    ...options
  })
}

/**
 * 移除指定 Toast
 * @param {string} id Toast ID
 */
export const removeToast = (id) => {
  if (!toastInstance) {
    console.warn('Toast 组件未初始化')
    return
  }
  
  toastInstance.removeToast(id)
}

/**
 * 清空所有 Toast
 */
export const clearToasts = () => {
  if (!toastInstance) {
    console.warn('Toast 组件未初始化')
    return
  }
  
  toastInstance.clearToasts()
}

/**
 * 显示 API 错误消息
 * @param {Error} error 错误对象
 * @param {string} defaultMessage 默认错误消息
 */
export const showApiError = (error, defaultMessage = '操作失败，请重试') => {
  const message = error?.message || defaultMessage
  return showError(message)
}

/**
 * 显示网络错误消息
 */
export const showNetworkError = () => {
  return showError('网络连接失败，请检查网络设置')
}

/**
 * 显示权限错误消息
 */
export const showPermissionError = () => {
  return showError('权限不足，请联系管理员')
}

/**
 * 显示复制成功消息
 */
export const showCopySuccess = () => {
  return showSuccess('复制成功')
}

/**
 * 显示操作成功消息
 * @param {string} operation 操作名称
 */
export const showOperationSuccess = (operation) => {
  return showSuccess(`${operation}成功`)
}

/**
 * 显示表单验证错误
 * @param {string} field 字段名称
 * @param {string} rule 验证规则描述
 */
export const showValidationError = (field, rule) => {
  return showError(`${field}${rule}`)
}

// 默认导出对象，包含所有方法
export default {
  show: showToast,
  success: showSuccess,
  error: showError,
  warning: showWarning,
  info: showInfo,
  loading: showLoading,
  remove: removeToast,
  clear: clearToasts,
  
  // 快捷方法
  apiError: showApiError,
  networkError: showNetworkError,
  permissionError: showPermissionError,
  copySuccess: showCopySuccess,
  operationSuccess: showOperationSuccess,
  validationError: showValidationError,
  
  // 实例管理
  setInstance: setToastInstance
}