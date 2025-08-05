<template>
  <div :class="inputWrapperClass">
    <!-- 标签 -->
    <label v-if="label" class="form-input-label">
      {{ label }}
      <span v-if="required" class="required-mark">*</span>
    </label>
    
    <!-- 输入框容器 -->
    <div class="form-input-container">
      <!-- 前缀图标 -->
      <div v-if="prefixIcon || $slots.prefix" class="input-prefix">
        <slot name="prefix">
          <span class="prefix-icon" v-html="prefixIcon"></span>
        </slot>
      </div>
      
      <!-- 输入框 -->
      <input
        ref="inputRef"
        v-model="inputValue"
        :type="inputType"
        :class="inputClass"
        :placeholder="placeholder"
        :disabled="disabled"
        :readonly="readonly"
        :maxlength="maxlength"
        :autocomplete="autocomplete"
        @input="handleInput"
        @blur="handleBlur"
        @focus="handleFocus"
        @keydown.enter="handleEnter"
      />
      
      <!-- 后缀内容 -->
      <div v-if="showSuffix" class="input-suffix">
        <!-- 清除按钮 -->
        <span
          v-if="clearable && inputValue && !disabled"
          class="clear-icon"
          @click="handleClear"
        >
          ✕
        </span>
        
        <!-- 密码显示切换 -->
        <span
          v-if="type === 'password'"
          class="password-toggle"
          @click="togglePasswordVisible"
        >
          {{ passwordVisible ? '👁' : '🙈' }}
        </span>
        
        <!-- 验证码按钮 -->
        <button
          v-if="type === 'sms'"
          class="sms-button"
          :disabled="smsDisabled"
          @click="handleSmsClick"
        >
          {{ smsButtonText }}
        </button>
        
        <!-- 自定义后缀 -->
        <slot name="suffix">
          <span v-if="suffixIcon" class="suffix-icon" v-html="suffixIcon"></span>
        </slot>
      </div>
    </div>
    
    <!-- 错误消息 -->
    <div v-if="errorMessage" class="form-input-error">
      {{ errorMessage }}
    </div>
    
    <!-- 帮助文本 */ -->
    <div v-if="helpText && !errorMessage" class="form-input-help">
      {{ helpText }}
    </div>
  </div>
</template>

<script setup>
/**
 * 表单输入框组件
 * 支持多种类型、验证、清除、密码显示等功能
 * @author 前端工程师团队
 * @date 2024-12-XX
 */
import { ref, computed, watch } from 'vue'

// Props 定义
const props = defineProps({
  /** 输入值 */
  modelValue: {
    type: [String, Number],
    default: ''
  },
  /** 输入框类型 */
  type: {
    type: String,
    default: 'text',
    validator: value => ['text', 'password', 'email', 'tel', 'number', 'sms'].includes(value)
  },
  /** 标签文本 */
  label: {
    type: String,
    default: ''
  },
  /** 占位符 */
  placeholder: {
    type: String,
    default: ''
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
  /** 是否只读 */
  readonly: {
    type: Boolean,
    default: false
  },
  /** 是否可清除 */
  clearable: {
    type: Boolean,
    default: false
  },
  /** 最大长度 */
  maxlength: {
    type: Number,
    default: null
  },
  /** 前缀图标 */
  prefixIcon: {
    type: String,
    default: ''
  },
  /** 后缀图标 */
  suffixIcon: {
    type: String,
    default: ''
  },
  /** 输入框尺寸 */
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
  /** 验证规则 */
  rules: {
    type: Array,
    default: () => []
  },
  /** 自动完成 */
  autocomplete: {
    type: String,
    default: 'off'
  },
  /** 短信验证码倒计时 */
  smsCountdown: {
    type: Number,
    default: 0
  }
})

// Events 定义
const emit = defineEmits(['update:modelValue', 'input', 'blur', 'focus', 'enter', 'clear', 'sms-click'])

// 响应式数据
const inputRef = ref(null)
const inputValue = ref(props.modelValue)
const passwordVisible = ref(false)
const isFocused = ref(false)
const errorMessage = ref(props.error)

/**
 * 实际输入框类型
 */
const inputType = computed(() => {
  if (props.type === 'password') {
    return passwordVisible.value ? 'text' : 'password'
  }
  if (props.type === 'sms') {
    return 'text'
  }
  return props.type
})

/**
 * 输入框容器样式类
 */
const inputWrapperClass = computed(() => {
  return [
    'form-input-wrapper',
    `form-input-wrapper--${props.size}`,
    {
      'form-input-wrapper--focused': isFocused.value,
      'form-input-wrapper--disabled': props.disabled,
      'form-input-wrapper--error': errorMessage.value,
      'form-input-wrapper--readonly': props.readonly
    }
  ]
})

/**
 * 输入框样式类
 */
const inputClass = computed(() => {
  return [
    'form-input',
    {
      'form-input--has-prefix': props.prefixIcon || props.$slots?.prefix,
      'form-input--has-suffix': showSuffix.value
    }
  ]
})

/**
 * 是否显示后缀
 */
const showSuffix = computed(() => {
  return (
    props.clearable ||
    props.type === 'password' ||
    props.type === 'sms' ||
    props.suffixIcon ||
    props.$slots?.suffix
  )
})

/**
 * 短信按钮是否禁用
 */
const smsDisabled = computed(() => {
  return props.disabled || props.smsCountdown > 0 || !inputValue.value
})

/**
 * 短信按钮文本
 */
const smsButtonText = computed(() => {
  if (props.smsCountdown > 0) {
    return `${props.smsCountdown}s`
  }
  return '获取验证码'
})

/**
 * 处理输入事件
 * @param {Event} event 输入事件
 */
const handleInput = (event) => {
  const value = event.target.value
  inputValue.value = value
  emit('update:modelValue', value)
  emit('input', value)
  
  // 清除错误消息
  if (errorMessage.value) {
    errorMessage.value = ''
  }
}

/**
 * 处理失焦事件
 * @param {Event} event 失焦事件
 */
const handleBlur = (event) => {
  isFocused.value = false
  emit('blur', event)
  
  // 执行验证
  validateInput()
}

/**
 * 处理聚焦事件
 * @param {Event} event 聚焦事件
 */
const handleFocus = (event) => {
  isFocused.value = true
  emit('focus', event)
}

/**
 * 处理回车事件
 * @param {Event} event 键盘事件
 */
const handleEnter = (event) => {
  emit('enter', event)
}

/**
 * 处理清除
 */
const handleClear = () => {
  inputValue.value = ''
  emit('update:modelValue', '')
  emit('clear')
  errorMessage.value = ''
  
  // 聚焦输入框
  if (inputRef.value) {
    inputRef.value.focus()
  }
}

/**
 * 切换密码可见性
 */
const togglePasswordVisible = () => {
  passwordVisible.value = !passwordVisible.value
}

/**
 * 处理短信验证码点击
 */
const handleSmsClick = () => {
  if (!smsDisabled.value) {
    emit('sms-click', inputValue.value)
  }
}

/**
 * 验证输入
 */
const validateInput = () => {
  if (!props.rules || props.rules.length === 0) {
    return true
  }
  
  for (const rule of props.rules) {
    if (typeof rule === 'function') {
      const result = rule(inputValue.value)
      if (result !== true) {
        errorMessage.value = result
        return false
      }
    } else if (rule.pattern && !rule.pattern.test(inputValue.value)) {
      errorMessage.value = rule.message || '格式不正确'
      return false
    } else if (rule.required && !inputValue.value) {
      errorMessage.value = rule.message || '此项为必填项'
      return false
    }
  }
  
  errorMessage.value = ''
  return true
}

/**
 * 聚焦输入框
 */
const focus = () => {
  if (inputRef.value) {
    inputRef.value.focus()
  }
}

/**
 * 失焦输入框
 */
const blur = () => {
  if (inputRef.value) {
    inputRef.value.blur()
  }
}

// 监听外部值变化
watch(() => props.modelValue, (newVal) => {
  inputValue.value = newVal
})

// 监听外部错误变化
watch(() => props.error, (newVal) => {
  errorMessage.value = newVal
})

// 暴露方法
defineExpose({
  focus,
  blur,
  validate: validateInput
})
</script>

<style lang="scss" scoped>
@use "@/assets/styles/variables.scss" as *;
@use "@/assets/styles/mixins.scss" as *;
.form-input-wrapper {
  margin-bottom: $spacing-base;
  
  // 尺寸变体
  &--small {
    .form-input {
      padding: $spacing-xs $spacing-sm;
      font-size: $font-size-sm;
    }
  }
  
  &--medium {
    .form-input {
      padding: $spacing-sm $spacing-base;
      font-size: $font-size-base;
    }
  }
  
  &--large {
    .form-input {
      padding: $spacing-base $spacing-lg;
      font-size: $font-size-lg;
    }
  }
  
  // 状态样式
  &--focused {
    .form-input-container {
      border-color: $primary-color;
      box-shadow: 0 0 0 2px rgba($primary-color, 0.1);
    }
  }
  
  &--error {
    .form-input-container {
      border-color: $error-color;
    }
    
    .form-input-label {
      color: $error-color;
    }
  }
  
  &--disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
}

.form-input-label {
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

.form-input-container {
  position: relative;
  display: flex;
  align-items: center;
  border: 1px solid $border-color;
  border-radius: $border-radius-base;
  background-color: $background-color;
  @include transition(all);
  
  &:hover:not(.form-input-wrapper--disabled &) {
    border-color: $primary-light;
  }
}

.input-prefix {
  display: flex;
  align-items: center;
  padding-left: $spacing-base;
  color: $text-color-disabled;
  
  .prefix-icon {
    font-size: $font-size-lg;
  }
}

.form-input {
  flex: 1;
  border: none;
  outline: none;
  background: transparent;
  color: $text-color-primary;
  font-size: $font-size-base;
  @include transition(all);
  
  &::placeholder {
    color: $text-color-disabled;
  }
  
  &:disabled {
    cursor: not-allowed;
  }
  
  // 有前缀时的样式
  &--has-prefix {
    padding-left: $spacing-xs;
  }
  
  // 有后缀时的样式
  &--has-suffix {
    padding-right: $spacing-xs;
  }
}

.input-suffix {
  display: flex;
  align-items: center;
  gap: $spacing-xs;
  padding-right: $spacing-base;
  
  .clear-icon,
  .password-toggle {
    cursor: pointer;
    color: $text-color-disabled;
    font-size: $font-size-base;
    @include transition(color);
    
    &:hover {
      color: $text-color-secondary;
    }
  }
  
  .suffix-icon {
    color: $text-color-disabled;
    font-size: $font-size-lg;
  }
}

.sms-button {
  padding: $spacing-xs $spacing-sm;
  border: 1px solid $primary-color;
  border-radius: $border-radius-sm;
  background-color: transparent;
  color: $primary-color;
  font-size: $font-size-sm;
  cursor: pointer;
  @include transition(all);
  
  &:hover:not(:disabled) {
    background-color: $primary-color;
    color: white;
  }
  
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
}

.form-input-error {
  margin-top: $spacing-xs;
  font-size: $font-size-sm;
  color: $error-color;
}

.form-input-help {
  margin-top: $spacing-xs;
  font-size: $font-size-sm;
  color: $text-color-disabled;
}

/* 移动端适配 */
@include respond-to(xs) {
  .form-input-wrapper--small .form-input {
    padding: 6px $spacing-xs;
  }
  
  .form-input-wrapper--medium .form-input {
    padding: $spacing-xs $spacing-sm;
  }
  
  .form-input-wrapper--large .form-input {
    padding: $spacing-sm $spacing-base;
  }
  
  .input-prefix,
  .input-suffix {
    padding-left: $spacing-sm;
    padding-right: $spacing-sm;
  }
}
</style>