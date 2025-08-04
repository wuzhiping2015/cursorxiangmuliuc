<template>
  <button 
    :class="buttonClass" 
    :disabled="disabled || loading"
    @click="handleClick"
  >
    <span v-if="loading" class="loading-icon">⏳</span>
    <slot v-else />
  </button>
</template>

<script>
/**
 * 通用按钮组件
 * 支持多种样式、尺寸和状态
 * @author 前端工程师团队
 * @date 2024-12-XX
 */
export default {
  name: 'CommonButton',
  props: {
    /** 按钮类型 */
    type: {
      type: String,
      default: 'primary',
      validator: value => ['primary', 'secondary', 'outline', 'text'].includes(value)
    },
    /** 按钮尺寸 */
    size: {
      type: String,
      default: 'medium',
      validator: value => ['small', 'medium', 'large'].includes(value)
    },
    /** 是否禁用 */
    disabled: {
      type: Boolean,
      default: false
    },
    /** 是否加载中 */
    loading: {
      type: Boolean,
      default: false
    },
    /** 是否为块级按钮 */
    block: {
      type: Boolean,
      default: false
    },
    /** 是否为圆角按钮 */
    round: {
      type: Boolean,
      default: false
    }
  },
  emits: ['click'],
  computed: {
    buttonClass() {
      return [
        'common-button',
        `common-button--${this.type}`,
        `common-button--${this.size}`,
        {
          'common-button--disabled': this.disabled,
          'common-button--loading': this.loading,
          'common-button--block': this.block,
          'common-button--round': this.round
        }
      ]
    }
  },
  methods: {
    /**
     * 处理点击事件
     * @param {Event} event 点击事件
     */
    handleClick(event) {
      if (this.disabled || this.loading) {
        return
      }
      this.$emit('click', event)
    }
  }
}
</script>

<style lang="scss" scoped>
@use "@/assets/styles/variables.scss" as *;
@use "@/assets/styles/mixins.scss" as *;
.common-button {
  @include button-base();
  position: relative;
  border: 1px solid transparent;
  
  // 基础尺寸
  &--small {
    padding: 6px 12px;
    font-size: $font-size-sm;
    min-height: 32px;
  }
  
  &--medium {
    padding: 8px 16px;
    font-size: $font-size-base;
    min-height: 40px;
  }
  
  &--large {
    padding: 12px 24px;
    font-size: $font-size-lg;
    min-height: 48px;
  }
  
  // 按钮类型样式
  &--primary {
    background-color: $primary-color;
    color: #fff;
    border-color: $primary-color;
    
    &:hover:not(.common-button--disabled) {
      background-color: $primary-dark;
      border-color: $primary-dark;
    }
    
    &:active:not(.common-button--disabled) {
      background-color: $primary-dark;
      transform: translateY(1px);
    }
  }
  
  &--secondary {
    background-color: $secondary-color;
    color: #fff;
    border-color: $secondary-color;
    
    &:hover:not(.common-button--disabled) {
      background-color: darken($secondary-color, 10%);
      border-color: darken($secondary-color, 10%);
    }
  }
  
  &--outline {
    background-color: transparent;
    color: $primary-color;
    border-color: $primary-color;
    
    &:hover:not(.common-button--disabled) {
      background-color: $primary-color;
      color: #fff;
    }
  }
  
  &--text {
    background-color: transparent;
    color: $primary-color;
    border: none;
    
    &:hover:not(.common-button--disabled) {
      background-color: rgba($primary-color, 0.1);
    }
  }
  
  // 状态样式
  &--disabled {
    opacity: 0.6;
    cursor: not-allowed;
    
    &:hover,
    &:active {
      transform: none !important;
    }
  }
  
  &--loading {
    cursor: not-allowed;
    
    .loading-icon {
      animation: spin 1s linear infinite;
    }
  }
  
  // 特殊样式
  &--block {
    width: 100%;
    display: flex;
  }
  
  &--round {
    border-radius: 20px;
  }
}

@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
</style> 