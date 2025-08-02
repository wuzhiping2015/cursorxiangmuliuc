<template>
  <div :class="cardClass" @click="handleClick">
    <!-- 卡片头部 -->
    <div v-if="$slots.header || title" class="card-header">
      <slot name="header">
        <h3 class="card-title">{{ title }}</h3>
        <span v-if="subtitle" class="card-subtitle">{{ subtitle }}</span>
      </slot>
    </div>
    
    <!-- 卡片内容 -->
    <div class="card-body">
      <slot />
    </div>
    
    <!-- 卡片底部 -->
    <div v-if="$slots.footer" class="card-footer">
      <slot name="footer" />
    </div>
  </div>
</template>

<script>
/**
 * 业务卡片组件
 * 用于展示信息卡片，支持多种样式和交互
 * @author 前端工程师团队
 * @date 2024-12-XX
 */
export default {
  name: 'BusinessCard',
  props: {
    /** 卡片标题 */
    title: {
      type: String,
      default: ''
    },
    /** 卡片副标题 */
    subtitle: {
      type: String,
      default: ''
    },
    /** 卡片类型 */
    type: {
      type: String,
      default: 'default',
      validator: value => ['default', 'primary', 'success', 'warning', 'error'].includes(value)
    },
    /** 是否有阴影 */
    shadow: {
      type: Boolean,
      default: true
    },
    /** 是否可点击 */
    clickable: {
      type: Boolean,
      default: false
    },
    /** 是否显示边框 */
    bordered: {
      type: Boolean,
      default: false
    },
    /** 圆角大小 */
    radius: {
      type: String,
      default: 'normal',
      validator: value => ['none', 'small', 'normal', 'large', 'round'].includes(value)
    }
  },
  emits: ['click'],
  computed: {
    cardClass() {
      return [
        'business-card',
        `business-card--${this.type}`,
        `business-card--radius-${this.radius}`,
        {
          'business-card--shadow': this.shadow,
          'business-card--clickable': this.clickable,
          'business-card--bordered': this.bordered
        }
      ]
    }
  },
  methods: {
    /**
     * 处理卡片点击事件
     * @param {Event} event 点击事件
     */
    handleClick(event) {
      if (this.clickable) {
        this.$emit('click', event)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.business-card {
  background-color: $background-color;
  overflow: hidden;
  @include transition(all);
  
  // 圆角样式
  &--radius-none {
    border-radius: 0;
  }
  
  &--radius-small {
    border-radius: $border-radius-sm;
  }
  
  &--radius-normal {
    border-radius: $border-radius-base;
  }
  
  &--radius-large {
    border-radius: $border-radius-lg;
  }
  
  &--radius-round {
    border-radius: $border-radius-xl;
  }
  
  // 阴影样式
  &--shadow {
    box-shadow: $box-shadow-base;
  }
  
  // 边框样式
  &--bordered {
    border: 1px solid $border-color;
  }
  
  // 可点击样式
  &--clickable {
    cursor: pointer;
    
    &:hover {
      transform: translateY(-2px);
      box-shadow: $box-shadow-lg;
    }
    
    &:active {
      transform: translateY(0);
    }
  }
  
  // 卡片类型样式
  &--primary {
    border-left: 4px solid $primary-color;
  }
  
  &--success {
    border-left: 4px solid $success-color;
  }
  
  &--warning {
    border-left: 4px solid $warning-color;
  }
  
  &--error {
    border-left: 4px solid $error-color;
  }
}

.card-header {
  padding: $spacing-base $spacing-base $spacing-sm;
  @include border-1px(bottom);
  
  .card-title {
    font-size: $font-size-lg;
    font-weight: $font-weight-medium;
    color: $text-color-primary;
    margin: 0;
  }
  
  .card-subtitle {
    font-size: $font-size-sm;
    color: $text-color-secondary;
    margin-top: $spacing-xs;
    display: block;
  }
}

.card-body {
  padding: $spacing-base;
}

.card-footer {
  padding: $spacing-sm $spacing-base $spacing-base;
  @include border-1px(top);
  
  &:empty {
    display: none;
  }
}
</style> 