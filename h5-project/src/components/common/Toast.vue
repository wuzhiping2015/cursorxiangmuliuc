<template>
  <teleport to="body">
    <transition-group name="toast-list" tag="div" class="toast-container">
      <div
        v-for="toast in toasts"
        :key="toast.id"
        :class="getToastClass(toast)"
        @click="handleToastClick(toast)"
      >
        <div class="toast-icon">
          <span v-html="getToastIcon(toast.type)"></span>
        </div>
        <div class="toast-content">
          <div class="toast-title" v-if="toast.title">{{ toast.title }}</div>
          <div class="toast-message">{{ toast.message }}</div>
        </div>
        <div v-if="toast.closable" class="toast-close" @click.stop="removeToast(toast.id)">
          ✕
        </div>
      </div>
    </transition-group>
  </teleport>
</template>

<script setup>
/**
 * Toast 消息提示组件
 * 全局消息反馈系统，支持多种类型和自动消失
 * @author 前端工程师团队
 * @date 2024-12-XX
 */
import { ref, onMounted, onUnmounted } from 'vue'

// 响应式数据
const toasts = ref([])
const timers = new Map()

/**
 * 获取Toast样式类
 * @param {Object} toast Toast对象
 * @returns {Array} 样式类数组
 */
const getToastClass = (toast) => {
  return [
    'toast-item',
    `toast-item--${toast.type}`,
    {
      'toast-item--closable': toast.closable
    }
  ]
}

/**
 * 获取Toast图标
 * @param {string} type Toast类型
 * @returns {string} 图标HTML
 */
const getToastIcon = (type) => {
  const icons = {
    success: '✓',
    error: '✕',
    warning: '⚠',
    info: 'ⓘ',
    loading: '⏳'
  }
  return icons[type] || icons.info
}

/**
 * 添加Toast消息
 * @param {Object} options Toast配置
 */
const addToast = (options) => {
  const toast = {
    id: Date.now() + Math.random(),
    type: options.type || 'info',
    title: options.title || '',
    message: options.message || '',
    duration: options.duration !== undefined ? options.duration : 3000,
    closable: options.closable !== undefined ? options.closable : true,
    onClick: options.onClick
  }

  toasts.value.push(toast)

  // 设置自动消失
  if (toast.duration > 0) {
    const timer = setTimeout(() => {
      removeToast(toast.id)
    }, toast.duration)
    timers.set(toast.id, timer)
  }

  return toast.id
}

/**
 * 移除Toast消息
 * @param {string} id Toast ID
 */
const removeToast = (id) => {
  const index = toasts.value.findIndex(toast => toast.id === id)
  if (index > -1) {
    toasts.value.splice(index, 1)
    
    // 清除定时器
    if (timers.has(id)) {
      clearTimeout(timers.get(id))
      timers.delete(id)
    }
  }
}

/**
 * 清空所有Toast
 */
const clearToasts = () => {
  toasts.value = []
  // 清除所有定时器
  timers.forEach(timer => clearTimeout(timer))
  timers.clear()
}

/**
 * 处理Toast点击事件
 * @param {Object} toast Toast对象
 */
const handleToastClick = (toast) => {
  if (toast.onClick && typeof toast.onClick === 'function') {
    toast.onClick(toast)
  }
}

// 生命周期
onMounted(() => {
  // 注册全局Toast方法
  if (typeof window !== 'undefined') {
    window.$toast = {
      show: addToast,
      success: (message, options = {}) => addToast({ ...options, type: 'success', message }),
      error: (message, options = {}) => addToast({ ...options, type: 'error', message }),
      warning: (message, options = {}) => addToast({ ...options, type: 'warning', message }),
      info: (message, options = {}) => addToast({ ...options, type: 'info', message }),
      loading: (message, options = {}) => addToast({ ...options, type: 'loading', message, duration: 0 }),
      clear: clearToasts,
      remove: removeToast
    }
  }
})

onUnmounted(() => {
  // 清理定时器
  timers.forEach(timer => clearTimeout(timer))
  timers.clear()
})

// 暴露方法供组件调用
defineExpose({
  addToast,
  removeToast,
  clearToasts
})
</script>

<style lang="scss" scoped>
@use "@/assets/styles/variables.scss" as *;
@use "@/assets/styles/mixins.scss" as *;

.toast-container {
  position: fixed;
  top: 20px;
  left: 50%;
  transform: translateX(-50%);
  z-index: $z-index-toast;
  pointer-events: none;
  width: calc(100vw - 32px);
  max-width: 400px;
}

.toast-item {
  display: flex;
  align-items: flex-start;
  padding: $spacing-base;
  margin-bottom: $spacing-sm;
  background-color: $background-color;
  border-radius: $border-radius-lg;
  box-shadow: $box-shadow-lg;
  pointer-events: auto;
  @include transition(all);
  word-break: break-word;
  
  // Toast类型样式
  &--success {
    border-left: 4px solid $success-color;
    
    .toast-icon {
      color: $success-color;
    }
  }
  
  &--error {
    border-left: 4px solid $error-color;
    
    .toast-icon {
      color: $error-color;
    }
  }
  
  &--warning {
    border-left: 4px solid $warning-color;
    
    .toast-icon {
      color: $warning-color;
    }
  }
  
  &--info {
    border-left: 4px solid $info-color;
    
    .toast-icon {
      color: $info-color;
    }
  }
  
  &--loading {
    border-left: 4px solid $primary-color;
    
    .toast-icon {
      color: $primary-color;
      animation: spin 1s linear infinite;
    }
  }
}

.toast-icon {
  font-size: $font-size-lg;
  font-weight: bold;
  margin-right: $spacing-sm;
  flex-shrink: 0;
  margin-top: 2px;
}

.toast-content {
  flex: 1;
  min-width: 0;
}

.toast-title {
  font-size: $font-size-base;
  font-weight: $font-weight-medium;
  color: $text-color-primary;
  margin-bottom: $spacing-xs;
}

.toast-message {
  font-size: $font-size-sm;
  color: $text-color-secondary;
  line-height: $line-height-base;
}

.toast-close {
  font-size: $font-size-base;
  color: $text-color-disabled;
  cursor: pointer;
  margin-left: $spacing-sm;
  flex-shrink: 0;
  @include transition(color);
  
  &:hover {
    color: $text-color-secondary;
  }
}

// 过渡动画
.toast-list-enter-active {
  transition: all $animation-duration-base ease-out;
}

.toast-list-leave-active {
  transition: all $animation-duration-base ease-in;
}

.toast-list-enter-from {
  opacity: 0;
  transform: translateY(-20px) scale(0.95);
}

.toast-list-leave-to {
  opacity: 0;
  transform: translateY(-20px) scale(0.95);
}

.toast-list-move {
  transition: transform $animation-duration-base ease;
}

@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

// 移动端适配
@include respond-to(xs) {
  .toast-container {
    top: 16px;
    width: calc(100vw - 24px);
  }
  
  .toast-item {
    padding: $spacing-sm $spacing-base;
    font-size: $font-size-sm;
  }
  
  .toast-icon {
    font-size: $font-size-base;
  }
}
</style>