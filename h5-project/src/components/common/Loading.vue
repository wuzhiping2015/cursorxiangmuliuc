<template>
  <div v-if="visible" :class="loadingClass">
    <!-- 背景遮罩 -->
    <div v-if="overlay" class="loading-overlay" @click="handleOverlayClick"></div>
    
    <!-- 加载内容 -->
    <div class="loading-content">
      <!-- 加载动画 -->
      <div class="loading-spinner">
        <div v-if="type === 'dots'" class="loading-dots">
          <span class="dot"></span>
          <span class="dot"></span>
          <span class="dot"></span>
        </div>
        <div v-else-if="type === 'circle'" class="loading-circle">
          <div class="circle-path"></div>
        </div>
        <div v-else-if="type === 'bars'" class="loading-bars">
          <span class="bar"></span>
          <span class="bar"></span>
          <span class="bar"></span>
          <span class="bar"></span>
          <span class="bar"></span>
        </div>
        <div v-else class="loading-default">
          <div class="spinner-ring"></div>
        </div>
      </div>
      
      <!-- 加载文本 -->
      <div v-if="text" class="loading-text">{{ text }}</div>
    </div>
  </div>
</template>

<script setup>
/**
 * Loading 加载组件
 * 支持全屏和局部加载状态显示，多种动画效果
 * @author 前端工程师团队
 * @date 2024-12-XX
 */
import { computed } from 'vue'

// Props 定义
const props = defineProps({
  /** 是否显示加载 */
  visible: {
    type: Boolean,
    default: false
  },
  /** 加载文本 */
  text: {
    type: String,
    default: ''
  },
  /** 加载动画类型 */
  type: {
    type: String,
    default: 'default',
    validator: value => ['default', 'dots', 'circle', 'bars'].includes(value)
  },
  /** 尺寸大小 */
  size: {
    type: String,
    default: 'medium',
    validator: value => ['small', 'medium', 'large'].includes(value)
  },
  /** 是否全屏显示 */
  fullscreen: {
    type: Boolean,
    default: false
  },
  /** 是否显示背景遮罩 */
  overlay: {
    type: Boolean,
    default: true
  },
  /** 背景颜色 */
  background: {
    type: String,
    default: 'rgba(255, 255, 255, 0.9)'
  },
  /** 主题色 */
  color: {
    type: String,
    default: ''
  },
  /** 点击遮罩是否可关闭 */
  closable: {
    type: Boolean,
    default: false
  }
})

// Events 定义
const emit = defineEmits(['close'])

/**
 * 计算加载容器样式类
 */
const loadingClass = computed(() => {
  return [
    'loading-container',
    `loading-container--${props.size}`,
    {
      'loading-container--fullscreen': props.fullscreen,
      'loading-container--overlay': props.overlay
    }
  ]
})

/**
 * 处理遮罩点击事件
 */
const handleOverlayClick = () => {
  if (props.closable) {
    emit('close')
  }
}
</script>

<style lang="scss" scoped>
@use "@/assets/styles/variables.scss" as *;
@use "@/assets/styles/mixins.scss" as *;

.loading-container {
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  
  // 全屏模式
  &--fullscreen {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: $z-index-modal;
  }
  
  // 有遮罩
  &--overlay {
    .loading-overlay {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      backdrop-filter: blur(2px);
    }
  }
}

.loading-content {
  position: relative;
  z-index: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.loading-spinner {
  color: $primary-color;
}

// 尺寸变体
.loading-container--small {
  .loading-spinner {
    transform: scale(0.8);
  }
  
  .loading-text {
    font-size: $font-size-sm;
  }
}

.loading-container--medium {
  .loading-spinner {
    transform: scale(1);
  }
  
  .loading-text {
    font-size: $font-size-base;
  }
}

.loading-container--large {
  .loading-spinner {
    transform: scale(1.2);
  }
  
  .loading-text {
    font-size: $font-size-lg;
  }
}

// 默认加载动画
.loading-default {
  .spinner-ring {
    width: 40px;
    height: 40px;
    border: 4px solid rgba($primary-color, 0.1);
    border-left-color: $primary-color;
    border-radius: 50%;
    animation: loading-rotate 1s linear infinite;
  }
}

// 点点动画
.loading-dots {
  display: flex;
  align-items: center;
  gap: 4px;
  
  .dot {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background-color: $primary-color;
    animation: loading-dots 1.4s ease-in-out infinite both;
    
    &:nth-child(1) { animation-delay: -0.32s; }
    &:nth-child(2) { animation-delay: -0.16s; }
    &:nth-child(3) { animation-delay: 0s; }
  }
}

// 圆圈动画
.loading-circle {
  width: 40px;
  height: 40px;
  position: relative;
  
  .circle-path {
    width: 100%;
    height: 100%;
    border: 3px solid transparent;
    border-top-color: $primary-color;
    border-radius: 50%;
    animation: loading-circle 1s ease-in-out infinite;
    
    &::before {
      content: '';
      position: absolute;
      top: -3px;
      left: -3px;
      right: -3px;
      bottom: -3px;
      border: 3px solid rgba($primary-color, 0.1);
      border-radius: 50%;
    }
  }
}

// 条形动画
.loading-bars {
  display: flex;
  align-items: center;
  gap: 3px;
  
  .bar {
    width: 3px;
    height: 20px;
    background-color: $primary-color;
    border-radius: 2px;
    animation: loading-bars 1.2s ease-in-out infinite;
    
    &:nth-child(1) { animation-delay: -0.24s; }
    &:nth-child(2) { animation-delay: -0.12s; }
    &:nth-child(3) { animation-delay: 0s; }
    &:nth-child(4) { animation-delay: 0.12s; }
    &:nth-child(5) { animation-delay: 0.24s; }
  }
}

// 加载文本
.loading-text {
  margin-top: $spacing-base;
  color: $text-color-secondary;
  text-align: center;
  white-space: nowrap;
}

// 动画定义
@keyframes loading-rotate {
  to {
    transform: rotate(360deg);
  }
}

@keyframes loading-dots {
  0%, 80%, 100% {
    transform: scale(0.6);
    opacity: 0.5;
  }
  40% {
    transform: scale(1);
    opacity: 1;
  }
}

@keyframes loading-circle {
  0% {
    transform: rotate(0deg);
  }
  50% {
    transform: rotate(180deg);
    border-top-color: rgba($primary-color, 0.5);
  }
  100% {
    transform: rotate(360deg);
  }
}

@keyframes loading-bars {
  0%, 40%, 100% {
    transform: scaleY(0.6);
    opacity: 0.6;
  }
  20% {
    transform: scaleY(1);
    opacity: 1;
  }
}

// 移动端适配
@include respond-to(xs) {
  .loading-container--small {
    .loading-spinner {
      transform: scale(0.7);
    }
  }
  
  .loading-container--medium {
    .loading-spinner {
      transform: scale(0.9);
    }
  }
  
  .loading-container--large {
    .loading-spinner {
      transform: scale(1.1);
    }
  }
  
  .loading-text {
    font-size: $font-size-sm;
  }
}
</style>