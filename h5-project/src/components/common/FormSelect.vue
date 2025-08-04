<template>
  <div :class="selectWrapperClass">
    <!-- 标签 -->
    <label v-if="label" class="form-select-label">
      {{ label }}
      <span v-if="required" class="required-mark">*</span>
    </label>
    
    <!-- 选择器容器 -->
    <div class="form-select-container" @click="handleToggle">
      <!-- 前缀图标 -->
      <div v-if="prefixIcon || $slots.prefix" class="select-prefix">
        <slot name="prefix">
          <span class="prefix-icon" v-html="prefixIcon"></span>
        </slot>
      </div>
      
      <!-- 显示区域 -->
      <div class="form-select-display">
        <span v-if="displayText" class="select-text">{{ displayText }}</span>
        <span v-else class="select-placeholder">{{ placeholder }}</span>
      </div>
      
      <!-- 箭头图标 -->
      <div class="select-arrow">
        <span :class="arrowClass">▼</span>
      </div>
    </div>
    
    <!-- 下拉选项 -->
    <transition name="select-dropdown">
      <div v-if="dropdownVisible" class="select-dropdown">
        <div class="dropdown-content">
          <!-- 搜索框 -->
          <div v-if="searchable" class="dropdown-search">
            <input
              ref="searchInputRef"
              v-model="searchKeyword"
              type="text"
              class="search-input"
              placeholder="搜索选项..."
              @click.stop
            />
          </div>
          
          <!-- 选项列表 -->
          <div class="dropdown-options">
            <div
              v-for="option in filteredOptions"
              :key="getOptionValue(option)"
              :class="getOptionClass(option)"
              @click="handleOptionClick(option)"
            >
              <slot name="option" :option="option">
                <span class="option-label">{{ getOptionLabel(option) }}</span>
                <span v-if="multiple && isSelected(option)" class="option-check">✓</span>
              </slot>
            </div>
            
            <!-- 无选项提示 -->
            <div v-if="filteredOptions.length === 0" class="no-options">
              {{ searchKeyword ? '无匹配选项' : '暂无选项' }}
            </div>
          </div>
        </div>
      </div>
    </transition>
    
    <!-- 错误消息 -->
    <div v-if="errorMessage" class="form-select-error">
      {{ errorMessage }}
    </div>
    
    <!-- 帮助文本 -->
    <div v-if="helpText && !errorMessage" class="form-select-help">
      {{ helpText }}
    </div>
  </div>
</template>

<script setup>
/**
 * 表单选择器组件
 * 支持单选、多选、搜索、分组等功能
 * @author 前端工程师团队
 * @date 2024-12-XX
 */
import { ref, computed, watch, onMounted, onUnmounted, nextTick } from 'vue'

// Props 定义
const props = defineProps({
  /** 选中值 */
  modelValue: {
    type: [String, Number, Array],
    default: null
  },
  /** 选项数据 */
  options: {
    type: Array,
    default: () => []
  },
  /** 标签文本 */
  label: {
    type: String,
    default: ''
  },
  /** 占位符 */
  placeholder: {
    type: String,
    default: '请选择'
  },
  /** 是否必填 */
  required: {
    type: Boolean,
    default: false
  },
  /** 是否禁用 */
  disabled: {
    type: Boolean,
    default: false
  },
  /** 是否可搜索 */
  searchable: {
    type: Boolean,
    default: false
  },
  /** 是否多选 */
  multiple: {
    type: Boolean,
    default: false
  },
  /** 是否可清除 */
  clearable: {
    type: Boolean,
    default: false
  },
  /** 前缀图标 */
  prefixIcon: {
    type: String,
    default: ''
  },
  /** 选择器尺寸 */
  size: {
    type: String,
    default: 'medium',
    validator: value => ['small', 'medium', 'large'].includes(value)
  },
  /** 错误消息 */
  error: {
    type: String,
    default: ''
  },
  /** 帮助文本 */
  helpText: {
    type: String,
    default: ''
  },
  /** 选项值字段名 */
  valueKey: {
    type: String,
    default: 'value'
  },
  /** 选项标签字段名 */
  labelKey: {
    type: String,
    default: 'label'
  },
  /** 验证规则 */
  rules: {
    type: Array,
    default: () => []
  }
})

// Events 定义
const emit = defineEmits(['update:modelValue', 'change', 'focus', 'blur'])

// 响应式数据
const dropdownVisible = ref(false)
const searchKeyword = ref('')
const searchInputRef = ref(null)
const errorMessage = ref(props.error)
const selectedValue = ref(props.modelValue)

/**
 * 显示文本
 */
const displayText = computed(() => {
  if (props.multiple) {
    if (Array.isArray(selectedValue.value) && selectedValue.value.length > 0) {
      const labels = selectedValue.value.map(val => {
        const option = props.options.find(opt => getOptionValue(opt) === val)
        return option ? getOptionLabel(option) : val
      })
      return labels.join(', ')
    }
    return ''
  } else {
    if (selectedValue.value !== null && selectedValue.value !== undefined) {
      const option = props.options.find(opt => getOptionValue(opt) === selectedValue.value)
      return option ? getOptionLabel(option) : selectedValue.value
    }
    return ''
  }
})

/**
 * 过滤后的选项
 */
const filteredOptions = computed(() => {
  if (!searchKeyword.value || !props.searchable) {
    return props.options
  }
  
  const keyword = searchKeyword.value.toLowerCase()
  return props.options.filter(option => {
    const label = getOptionLabel(option).toLowerCase()
    return label.includes(keyword)
  })
})

/**
 * 选择器容器样式类
 */
const selectWrapperClass = computed(() => {
  return [
    'form-select-wrapper',
    `form-select-wrapper--${props.size}`,
    {
      'form-select-wrapper--disabled': props.disabled,
      'form-select-wrapper--error': errorMessage.value,
      'form-select-wrapper--open': dropdownVisible.value
    }
  ]
})

/**
 * 箭头样式类
 */
const arrowClass = computed(() => {
  return [
    'arrow-icon',
    {
      'arrow-icon--open': dropdownVisible.value
    }
  ]
})

/**
 * 获取选项值
 * @param {Object} option 选项对象
 */
const getOptionValue = (option) => {
  if (typeof option === 'object' && option !== null) {
    return option[props.valueKey]
  }
  return option
}

/**
 * 获取选项标签
 * @param {Object} option 选项对象
 */
const getOptionLabel = (option) => {
  if (typeof option === 'object' && option !== null) {
    return option[props.labelKey] || option[props.valueKey]
  }
  return option
}

/**
 * 获取选项样式类
 * @param {Object} option 选项对象
 */
const getOptionClass = (option) => {
  return [
    'dropdown-option',
    {
      'dropdown-option--selected': isSelected(option),
      'dropdown-option--disabled': option.disabled
    }
  ]
}

/**
 * 判断选项是否被选中
 * @param {Object} option 选项对象
 */
const isSelected = (option) => {
  const value = getOptionValue(option)
  if (props.multiple) {
    return Array.isArray(selectedValue.value) && selectedValue.value.includes(value)
  } else {
    return selectedValue.value === value
  }
}

/**
 * 处理下拉框切换
 */
const handleToggle = () => {
  if (props.disabled) return
  
  dropdownVisible.value = !dropdownVisible.value
  
  if (dropdownVisible.value) {
    emit('focus')
    // 如果可搜索，聚焦搜索框
    if (props.searchable) {
      nextTick(() => {
        if (searchInputRef.value) {
          searchInputRef.value.focus()
        }
      })
    }
  } else {
    emit('blur')
    searchKeyword.value = ''
  }
}

/**
 * 处理选项点击
 * @param {Object} option 选项对象
 */
const handleOptionClick = (option) => {
  if (option.disabled) return
  
  const value = getOptionValue(option)
  
  if (props.multiple) {
    let newValue = Array.isArray(selectedValue.value) ? [...selectedValue.value] : []
    const index = newValue.indexOf(value)
    
    if (index > -1) {
      newValue.splice(index, 1)
    } else {
      newValue.push(value)
    }
    
    selectedValue.value = newValue
    emit('update:modelValue', newValue)
    emit('change', newValue)
  } else {
    selectedValue.value = value
    emit('update:modelValue', value)
    emit('change', value)
    dropdownVisible.value = false
    searchKeyword.value = ''
  }
  
  // 清除错误消息
  if (errorMessage.value) {
    errorMessage.value = ''
  }
}

/**
 * 验证选择
 */
const validateSelect = () => {
  if (!props.rules || props.rules.length === 0) {
    return true
  }
  
  for (const rule of props.rules) {
    if (typeof rule === 'function') {
      const result = rule(selectedValue.value)
      if (result !== true) {
        errorMessage.value = result
        return false
      }
    } else if (rule.required && (
      selectedValue.value === null ||
      selectedValue.value === undefined ||
      (Array.isArray(selectedValue.value) && selectedValue.value.length === 0)
    )) {
      errorMessage.value = rule.message || '请选择选项'
      return false
    }
  }
  
  errorMessage.value = ''
  return true
}

/**
 * 处理外部点击
 * @param {Event} event 点击事件
 */
const handleOutsideClick = (event) => {
  if (!event.target.closest('.form-select-wrapper')) {
    dropdownVisible.value = false
    searchKeyword.value = ''
  }
}

// 监听外部值变化
watch(() => props.modelValue, (newVal) => {
  selectedValue.value = newVal
})

// 监听外部错误变化
watch(() => props.error, (newVal) => {
  errorMessage.value = newVal
})

// 生命周期
onMounted(() => {
  document.addEventListener('click', handleOutsideClick)
})

onUnmounted(() => {
  document.removeEventListener('click', handleOutsideClick)
})

// 暴露方法
defineExpose({
  validate: validateSelect
})
</script>

<style lang="scss" scoped>
@use "@/assets/styles/variables.scss" as *;
@use "@/assets/styles/mixins.scss" as *;
.form-select-wrapper {
  position: relative;
  margin-bottom: $spacing-base;
  
  // 尺寸变体
  &--small {
    .form-select-container {
      padding: $spacing-xs $spacing-sm;
      font-size: $font-size-sm;
    }
  }
  
  &--medium {
    .form-select-container {
      padding: $spacing-sm $spacing-base;
      font-size: $font-size-base;
    }
  }
  
  &--large {
    .form-select-container {
      padding: $spacing-base $spacing-lg;
      font-size: $font-size-lg;
    }
  }
  
  // 状态样式
  &--open {
    .form-select-container {
      border-color: $primary-color;
      box-shadow: 0 0 0 2px rgba($primary-color, 0.1);
    }
  }
  
  &--error {
    .form-select-container {
      border-color: $error-color;
    }
    
    .form-select-label {
      color: $error-color;
    }
  }
  
  &--disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
}

.form-select-label {
  display: block;
  font-size: $font-size-sm;
  font-weight: $font-weight-medium;
  color: $text-color-primary;
  margin-bottom: $spacing-xs;
  
  .required-mark {
    color: $error-color;
    margin-left: 2px;
  }
}

.form-select-container {
  display: flex;
  align-items: center;
  border: 1px solid $border-color;
  border-radius: $border-radius-base;
  background-color: $background-color;
  cursor: pointer;
  @include transition(all);
  
  &:hover:not(.form-select-wrapper--disabled &) {
    border-color: $primary-light;
  }
}

.select-prefix {
  display: flex;
  align-items: center;
  color: $text-color-disabled;
  margin-right: $spacing-xs;
  
  .prefix-icon {
    font-size: $font-size-lg;
  }
}

.form-select-display {
  flex: 1;
  min-width: 0;
}

.select-text {
  color: $text-color-primary;
  @include text-ellipsis();
}

.select-placeholder {
  color: $text-color-disabled;
}

.select-arrow {
  margin-left: $spacing-xs;
  
  .arrow-icon {
    color: $text-color-disabled;
    font-size: 12px;
    @include transition(transform);
    
    &--open {
      transform: rotate(180deg);
    }
  }
}

.select-dropdown {
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  z-index: $z-index-dropdown;
  margin-top: 4px;
  
  .dropdown-content {
    background-color: $background-color;
    border: 1px solid $border-color;
    border-radius: $border-radius-base;
    box-shadow: $box-shadow-lg;
    max-height: 200px;
    overflow: hidden;
  }
}

.dropdown-search {
  padding: $spacing-sm;
  border-bottom: 1px solid $border-color-light;
  
  .search-input {
    width: 100%;
    padding: $spacing-xs $spacing-sm;
    border: 1px solid $border-color;
    border-radius: $border-radius-sm;
    font-size: $font-size-sm;
    outline: none;
    
    &:focus {
      border-color: $primary-color;
    }
  }
}

.dropdown-options {
  max-height: 160px;
  overflow-y: auto;
}

.dropdown-option {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: $spacing-sm $spacing-base;
  cursor: pointer;
  @include transition(background-color);
  
  &:hover:not(&--disabled) {
    background-color: $background-color-light;
  }
  
  &--selected {
    background-color: rgba($primary-color, 0.1);
    color: $primary-color;
  }
  
  &--disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
  
  .option-label {
    flex: 1;
    @include text-ellipsis();
  }
  
  .option-check {
    color: $primary-color;
    font-weight: bold;
  }
}

.no-options {
  padding: $spacing-base;
  text-align: center;
  color: $text-color-disabled;
  font-size: $font-size-sm;
}

.form-select-error {
  margin-top: $spacing-xs;
  font-size: $font-size-sm;
  color: $error-color;
}

.form-select-help {
  margin-top: $spacing-xs;
  font-size: $font-size-sm;
  color: $text-color-disabled;
}

// 下拉动画
.select-dropdown-enter-active,
.select-dropdown-leave-active {
  transition: all $animation-duration-base ease;
}

.select-dropdown-enter-from,
.select-dropdown-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}

// 移动端适配
@include respond-to(xs) {
  .form-select-wrapper--small .form-select-container {
    padding: 6px $spacing-xs;
  }
  
  .form-select-wrapper--medium .form-select-container {
    padding: $spacing-xs $spacing-sm;
  }
  
  .form-select-wrapper--large .form-select-container {
    padding: $spacing-sm $spacing-base;
  }
  
  .dropdown-content {
    max-height: 40vh;
  }
  
  .dropdown-options {
    max-height: calc(40vh - 60px);
  }
}
</style>