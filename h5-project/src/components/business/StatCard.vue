<template>
  <div :class="cardClass" @click="handleClick">
    <!-- 卡片内容 -->
    <div class="stat-card-content">
      <!-- 左侧图标区域 -->
      <div v-if="icon || $slots.icon" class="stat-card-icon">
        <slot name="icon">
          <span class="icon-text" v-html="icon"></span>
        </slot>
      </div>
      
      <!-- 右侧数据区域 -->
      <div class="stat-card-data">
        <!-- 数值和趋势 -->
        <div class="stat-card-value-row">
          <div class="stat-card-value">
            <span v-if="prefix" class="value-prefix">{{ prefix }}</span>
            <span class="value-number">{{ formattedValue }}</span>
            <span v-if="suffix" class="value-suffix">{{ suffix }}</span>
          </div>
          
          <!-- 趋势指示器 -->
          <div v-if="trend !== null" :class="trendClass">
            <span class="trend-icon">{{ trendIcon }}</span>
            <span class="trend-value">{{ Math.abs(trend) }}%</span>
          </div>
        </div>
        
        <!-- 标题 -->
        <div class="stat-card-title">{{ title }}</div>
        
        <!-- 描述 -->
        <div v-if="description" class="stat-card-description">{{ description }}</div>
        
        <!-- 额外信息 -->
        <div v-if="extra || $slots.extra" class="stat-card-extra">
          <slot name="extra">{{ extra }}</slot>
        </div>
      </div>
    </div>
    
    <!-- 加载状态 -->
    <div v-if="loading" class="stat-card-loading">
      <div class="loading-spinner">⏳</div>
    </div>
  </div>
</template>

<script setup>
/**
 * 统计卡片组件
 * 用于展示数据统计信息，支持图标、趋势、加载状态等
 * @author 前端工程师团队
 * @date 2024-12-XX
 */
import { computed } from 'vue'

// Props 定义
const props = defineProps({
  /** 卡片标题 */
  title: {
    type: String,
    required: true
  },
  /** 数值 */
  value: {
    type: [Number, String],
    default: 0
  },
  /** 数值前缀 */
  prefix: {
    type: String,
    default: ''
  },
  /** 数值后缀 */
  suffix: {
    type: String,
    default: ''
  },
  /** 图标 */
  icon: {
    type: String,
    default: ''
  },
  /** 描述文本 */
  description: {
    type: String,
    default: ''
  },
  /** 额外信息 */
  extra: {
    type: String,
    default: ''
  },
  /** 趋势百分比 */
  trend: {
    type: Number,
    default: null
  },
  /** 卡片主题 */
  theme: {
    type: String,
    default: 'default',
    validator: value => ['default', 'primary', 'success', 'warning', 'error', 'gradient'].includes(value)
  },
  /** 卡片尺寸 */
  size: {
    type: String,
    default: 'medium',
    validator: value => ['small', 'medium', 'large'].includes(value)
  },
  /** 是否显示阴影 */
  shadow: {
    type: Boolean,
    default: true
  },
  /** 是否可点击 */
  clickable: {
    type: Boolean,
    default: false
  },
  /** 加载状态 */
  loading: {
    type: Boolean,
    default: false
  },
  /** 数值格式化函数 */
  formatter: {
    type: Function,
    default: null
  }
})

// Events 定义
const emit = defineEmits(['click'])

/**
 * 格式化后的数值
 */
const formattedValue = computed(() => {
  if (props.formatter && typeof props.formatter === 'function') {
    return props.formatter(props.value)
  }
  
  if (typeof props.value === 'number') {
    // 数字格式化，添加千分位分隔符
    return props.value.toLocaleString()
  }
  
  return props.value
})

/**
 * 趋势样式类
 */
const trendClass = computed(() => {
  if (props.trend === null) return ''
  
  return [
    'stat-card-trend',
    {
      'trend-up': props.trend > 0,
      'trend-down': props.trend < 0,
      'trend-flat': props.trend === 0
    }
  ]
})

/**
 * 趋势图标
 */
const trendIcon = computed(() => {
  if (props.trend === null) return ''
  
  if (props.trend > 0) return '↗'
  if (props.trend < 0) return '↘'
  return '→'
})

/**
 * 卡片样式类
 */
const cardClass = computed(() => {
  return [
    'stat-card',
    `stat-card--${props.theme}`,
    `stat-card--${props.size}`,
    {
      'stat-card--shadow': props.shadow,
      'stat-card--clickable': props.clickable,
      'stat-card--loading': props.loading
    }
  ]
})

/**
 * 处理点击事件
 */
const handleClick = () => {
  if (props.clickable && !props.loading) {
    emit('click')
  }
}
</script>

<style lang="scss" scoped>
@use "@/assets/styles/variables.scss" as *;
@use "@/assets/styles/mixins.scss" as *;

.stat-card {
  position: relative;
  background-color: $background-color;
  border-radius: $border-radius-lg;
  padding: $spacing-base;
  @include transition(all);
  overflow: hidden;
  
  // 阴影
  &--shadow {
    box-shadow: $box-shadow-base;
  }
  
  // 可点击
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
  
  // 加载状态
  &--loading {
    .stat-card-content {
      opacity: 0.6;
    }
  }
  
  // 尺寸变体
  &--small {
    padding: $spacing-sm;
    
    .stat-card-value {
      font-size: $font-size-lg;
    }
    
    .stat-card-title {
      font-size: $font-size-sm;
    }
  }
  
  &--medium {
    padding: $spacing-base;
    
    .stat-card-value {
      font-size: $font-size-xl;
    }
    
    .stat-card-title {
      font-size: $font-size-base;
    }
  }
  
  &--large {
    padding: $spacing-lg;
    
    .stat-card-value {
      font-size: $font-size-xxl;
    }
    
    .stat-card-title {
      font-size: $font-size-lg;
    }
  }
  
  // 主题变体
  &--primary {
    background: linear-gradient(135deg, $primary-color, $primary-light);
    color: white;
    
    .stat-card-title,
    .stat-card-description {
      color: rgba(255, 255, 255, 0.9);
    }
  }
  
  &--success {
    border-left: 4px solid $success-color;
    
    .stat-card-icon {
      color: $success-color;
    }
  }
  
  &--warning {
    border-left: 4px solid $warning-color;
    
    .stat-card-icon {
      color: $warning-color;
    }
  }
  
  &--error {
    border-left: 4px solid $error-color;
    
    .stat-card-icon {
      color: $error-color;
    }
  }
  
  &--gradient {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
    
    .stat-card-title,
    .stat-card-description {
      color: rgba(255, 255, 255, 0.9);
    }
  }
}

.stat-card-content {
  display: flex;
  align-items: flex-start;
  gap: $spacing-base;
}

.stat-card-icon {
  flex-shrink: 0;
  width: 48px;
  height: 48px;
  @include flex(row, center, center);
  background-color: rgba($primary-color, 0.1);
  border-radius: $border-radius-lg;
  color: $primary-color;
  
  .icon-text {
    font-size: 24px;
    font-weight: bold;
  }
}

.stat-card-data {
  flex: 1;
  min-width: 0;
}

.stat-card-value-row {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  margin-bottom: $spacing-xs;
}

.stat-card-value {
  font-size: $font-size-xl;
  font-weight: $font-weight-bold;
  color: $text-color-primary;
  line-height: 1.2;
  
  .value-prefix,
  .value-suffix {
    font-size: 0.8em;
    font-weight: $font-weight-medium;
    color: $text-color-secondary;
  }
  
  .value-number {
    font-family: $font-family-base;
  }
}

.stat-card-trend {
  display: flex;
  align-items: center;
  gap: 2px;
  font-size: $font-size-sm;
  font-weight: $font-weight-medium;
  
  &.trend-up {
    color: $success-color;
  }
  
  &.trend-down {
    color: $error-color;
  }
  
  &.trend-flat {
    color: $text-color-disabled;
  }
  
  .trend-icon {
    font-size: 1.2em;
  }
}

.stat-card-title {
  font-size: $font-size-base;
  font-weight: $font-weight-medium;
  color: $text-color-primary;
  margin-bottom: $spacing-xs;
  @include text-ellipsis();
}

.stat-card-description {
  font-size: $font-size-sm;
  color: $text-color-secondary;
  line-height: $line-height-base;
  margin-bottom: $spacing-xs;
  @include text-ellipsis(2);
}

.stat-card-extra {
  font-size: $font-size-sm;
  color: $text-color-disabled;
}

.stat-card-loading {
  position: absolute;
  top: 50%;
  right: $spacing-base;
  transform: translateY(-50%);
  
  .loading-spinner {
    font-size: $font-size-lg;
    animation: spin 1s linear infinite;
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

// 移动端适配
@include respond-to(xs) {
  .stat-card {
    padding: $spacing-sm $spacing-base;
  }
  
  .stat-card-content {
    gap: $spacing-sm;
  }
  
  .stat-card-icon {
    width: 40px;
    height: 40px;
    
    .icon-text {
      font-size: 20px;
    }
  }
  
  .stat-card--small .stat-card-value {
    font-size: $font-size-base;
  }
  
  .stat-card--medium .stat-card-value {
    font-size: $font-size-lg;
  }
  
  .stat-card--large .stat-card-value {
    font-size: $font-size-xl;
  }
}
</style>