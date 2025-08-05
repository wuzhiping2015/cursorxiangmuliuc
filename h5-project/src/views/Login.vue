<template>
  <div class="login-page">
    <!-- 顶部装饰 -->
    <div class="login-header">
      <div class="header-bg">
        <div class="bg-circle circle-1"></div>
        <div class="bg-circle circle-2"></div>
        <div class="bg-circle circle-3"></div>
      </div>
      <div class="header-content">
        <h1 class="app-title">邀请拉新</h1>
        <p class="app-subtitle">邀请好友，共享收益</p>
      </div>
    </div>
    
    <!-- 登录表单 -->
    <div class="login-form-container">
      <div class="form-card">
        <!-- 标题 -->
        <div class="form-header">
          <h2 class="form-title">{{ isRegister ? '注册账号' : '登录账号' }}</h2>
          <p class="form-subtitle">{{ isRegister ? '创建新账号开始赚钱之旅' : '登录继续您的赚钱之旅' }}</p>
        </div>
        
        <!-- 表单内容 -->
        <form class="login-form" @submit.prevent="handleSubmit">
          <!-- 手机号输入 -->
          <FormInput
            v-model="formData.mobile"
            type="tel"
            label="手机号"
            placeholder="请输入手机号"
            prefix-icon="📱"
            :rules="rules.mobile"
            :error="errors.mobile"
            required
            clearable
            @input="clearError('mobile')"
          />
          
          <!-- 验证码输入 -->
          <FormInput
            v-model="formData.code"
            type="sms"
            label="验证码"
            placeholder="请输入验证码"
            prefix-icon="🔒"
            :rules="rules.code"
            :error="errors.code"
            :sms-countdown="smsCountdown"
            required
            clearable
            @input="clearError('code')"
            @sms-click="handleSendSms"
          />
          
          <!-- 邀请码输入（注册时显示） -->
          <FormInput
            v-if="isRegister"
            v-model="formData.inviteCode"
            type="text"
            label="邀请码"
            placeholder="请输入邀请码（可选）"
            prefix-icon="🎁"
            :error="errors.inviteCode"
            clearable
            @input="clearError('inviteCode')"
          />
          
          <!-- 同意条款（注册时显示） -->
          <div v-if="isRegister" class="agreement-section">
            <label class="agreement-checkbox">
              <input
                v-model="formData.agreed"
                type="checkbox"
                :class="{ error: errors.agreed }"
              />
              <span class="checkbox-mark"></span>
              <span class="agreement-text">
                我已阅读并同意
                <a href="#" class="agreement-link" @click.prevent="showAgreement('user')">《用户协议》</a>
                和
                <a href="#" class="agreement-link" @click.prevent="showAgreement('privacy')">《隐私政策》</a>
              </span>
            </label>
            <div v-if="errors.agreed" class="agreement-error">{{ errors.agreed }}</div>
          </div>
          
          <!-- 自动登录 -->
          <div v-if="!isRegister" class="auto-login-section">
            <label class="auto-login-checkbox">
              <input v-model="formData.autoLogin" type="checkbox" />
              <span class="checkbox-mark"></span>
              <span class="checkbox-text">7天内自动登录</span>
            </label>
          </div>
          
          <!-- 提交按钮 -->
          <button
            type="submit"
            class="submit-button"
            :disabled="submitting"
            :class="{ loading: submitting }"
          >
            <span v-if="submitting" class="loading-icon">⏳</span>
            {{ submitting ? '处理中...' : (isRegister ? '注册' : '登录') }}
          </button>
        </form>
        
        <!-- 切换登录/注册 -->
        <div class="form-footer">
          <span class="switch-text">
            {{ isRegister ? '已有账号？' : '还没有账号？' }}
            <a href="#" class="switch-link" @click.prevent="toggleMode">
              {{ isRegister ? '立即登录' : '立即注册' }}
            </a>
          </span>
        </div>
      </div>
    </div>
    
    <!-- 快速登录（可选） -->
    <div v-if="!isRegister" class="quick-login">
      <div class="quick-login-title">快速登录</div>
      <div class="quick-login-methods">
        <button class="quick-login-btn wechat" @click="handleWechatLogin">
          <span class="method-icon">💬</span>
          <span class="method-text">微信登录</span>
        </button>
        <button class="quick-login-btn demo" @click="handleDemoLogin">
          <span class="method-icon">🎮</span>
          <span class="method-text">演示登录</span>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
/**
 * 登录/注册页面
 * 支持手机号验证码登录和用户注册
 * @author 前端工程师团队
 * @date 2024-12-XX
 */
import { ref, reactive, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/stores/user'
import FormInput from '@/components/common/FormInput.vue'
import { Rules, createValidator } from '@/utils/validator'
import { showSuccess, showError, showLoading } from '@/utils/toast'
import api from '@/utils/request'

// 路由和状态管理
const router = useRouter()
const userStore = useUserStore()

// 响应式数据
const isRegister = ref(false)
const submitting = ref(false)
const smsCountdown = ref(0)
const smsTimer = ref(null)

// 表单数据
const formData = reactive({
  mobile: '',
  code: '',
  inviteCode: '',
  agreed: false,
  autoLogin: true
})

// 验证规则
const rules = {
  mobile: [
    Rules.required('请输入手机号'),
    Rules.mobile('请输入正确的手机号')
  ],
  code: [
    Rules.required('请输入验证码'),
    Rules.verifyCode('请输入正确的验证码')
  ]
}

// 创建验证器
const validator = createValidator({
  mobile: rules.mobile,
  code: rules.code,
  agreed: isRegister.value ? [Rules.required('请同意用户协议和隐私政策')] : []
})

// 错误状态
const errors = reactive({
  mobile: '',
  code: '',
  inviteCode: '',
  agreed: ''
})

/**
 * 清除字段错误
 * @param {string} field 字段名
 */
const clearError = (field) => {
  errors[field] = ''
}

/**
 * 切换登录/注册模式
 */
const toggleMode = () => {
  isRegister.value = !isRegister.value
  
  // 清空表单数据
  Object.keys(formData).forEach(key => {
    if (key === 'autoLogin') {
      formData[key] = true
    } else if (key === 'agreed') {
      formData[key] = false
    } else {
      formData[key] = ''
    }
  })
  
  // 清空错误
  Object.keys(errors).forEach(key => {
    errors[key] = ''
  })
  
  // 重置短信倒计时
  resetSmsCountdown()
}

/**
 * 发送短信验证码
 */
const handleSendSms = async () => {
  // 验证手机号
  if (!validator.validateField('mobile', formData.mobile)) {
    errors.mobile = validator.getError('mobile')
    return
  }
  
  try {
    const loadingToast = showLoading('发送中...')
    
    await api.post('/api/auth/send-sms', {
      mobile: formData.mobile,
      type: isRegister.value ? 'register' : 'login'
    })
    
    loadingToast()
    showSuccess('验证码发送成功')
    
    // 开始倒计时
    startSmsCountdown()
    
  } catch (error) {
    showError(error.message || '验证码发送失败')
  }
}

/**
 * 开始短信倒计时
 */
const startSmsCountdown = () => {
  smsCountdown.value = 60
  smsTimer.value = setInterval(() => {
    smsCountdown.value--
    if (smsCountdown.value <= 0) {
      resetSmsCountdown()
    }
  }, 1000)
}

/**
 * 重置短信倒计时
 */
const resetSmsCountdown = () => {
  smsCountdown.value = 0
  if (smsTimer.value) {
    clearInterval(smsTimer.value)
    smsTimer.value = null
  }
}

/**
 * 处理表单提交
 */
const handleSubmit = async () => {
  // 验证表单
  const validationRules = {
    mobile: rules.mobile,
    code: rules.code
  }
  
  if (isRegister.value) {
    validationRules.agreed = [Rules.required('请同意用户协议和隐私政策')]
  }
  
  const currentValidator = createValidator(validationRules)
  const isValid = currentValidator.validate(formData)
  
  if (!isValid) {
    const validatorErrors = currentValidator.getErrors()
    Object.keys(validatorErrors).forEach(key => {
      errors[key] = validatorErrors[key]
    })
    return
  }
  
  // 注册时验证协议同意
  if (isRegister.value && !formData.agreed) {
    errors.agreed = '请同意用户协议和隐私政策'
    return
  }
  
  try {
    submitting.value = true
    
    let response
    if (isRegister.value) {
      // 注册
      response = await api.post('/api/auth/register', {
        mobile: formData.mobile,
        code: formData.code,
        inviteCode: formData.inviteCode || undefined
      })
    } else {
      // 登录
      response = await api.post('/api/auth/login', {
        mobile: formData.mobile,
        code: formData.code,
        autoLogin: formData.autoLogin
      })
    }
    
    // 保存用户信息和token
    userStore.setToken(response.token)
    userStore.setUserInfo(response.userInfo)
    
    showSuccess(isRegister.value ? '注册成功' : '登录成功')
    
    // 跳转到首页
    setTimeout(() => {
      router.push('/')
    }, 1000)
    
  } catch (error) {
    showError(error.message || (isRegister.value ? '注册失败' : '登录失败'))
  } finally {
    submitting.value = false
  }
}

/**
 * 微信登录
 */
const handleWechatLogin = async () => {
  try {
    showLoading('跳转微信登录...')
    
    // 获取微信登录URL
    const response = await api.get('/api/auth/wechat-login-url')
    
    // 跳转到微信登录
    window.location.href = response.url
    
  } catch (error) {
    showError('微信登录暂时不可用')
  }
}

/**
 * 演示登录
 */
const handleDemoLogin = () => {
  userStore.mockLogin()
  showSuccess('演示登录成功')
  setTimeout(() => {
    router.push('/')
  }, 1000)
}

/**
 * 显示协议内容
 * @param {string} type 协议类型
 */
const showAgreement = (type) => {
  // 这里可以打开协议页面或弹窗
  router.push(`/agreement?type=${type}`)
}
</script>

<style lang="scss" scoped>
@use "@/assets/styles/variables.scss" as *;
@use "@/assets/styles/mixins.scss" as *;
.login-page {
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  display: flex;
  flex-direction: column;
}

// 顶部装饰
.login-header {
  position: relative;
  padding: $spacing-xxl $spacing-base $spacing-xl;
  overflow: hidden;
  
  .header-bg {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    
    .bg-circle {
      position: absolute;
      border-radius: 50%;
      background: rgba(255, 255, 255, 0.1);
      
      &.circle-1 {
        width: 100px;
        height: 100px;
        top: -20px;
        right: 20px;
        animation: float 6s ease-in-out infinite;
      }
      
      &.circle-2 {
        width: 60px;
        height: 60px;
        top: 40px;
        left: 30px;
        animation: float 8s ease-in-out infinite reverse;
      }
      
      &.circle-3 {
        width: 80px;
        height: 80px;
        bottom: 20px;
        right: 60px;
        animation: float 7s ease-in-out infinite;
      }
    }
  }
  
  .header-content {
    position: relative;
    z-index: 1;
    text-align: center;
    color: white;
    
    .app-title {
      font-size: $font-size-title;
      font-weight: $font-weight-bold;
      margin-bottom: $spacing-xs;
      text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
    }
    
    .app-subtitle {
      font-size: $font-size-base;
      opacity: 0.9;
    }
  }
}

// 表单容器
.login-form-container {
  flex: 1;
  padding: 0 $spacing-base $spacing-xl;
}

.form-card {
  background: $background-color;
  border-radius: $border-radius-xl;
  padding: $spacing-xl $spacing-lg;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
  margin-top: -$spacing-lg;
  position: relative;
  z-index: 2;
}

.form-header {
  text-align: center;
  margin-bottom: $spacing-xl;
  
  .form-title {
    font-size: $font-size-xl;
    font-weight: $font-weight-bold;
    color: $text-color-primary;
    margin-bottom: $spacing-xs;
  }
  
  .form-subtitle {
    font-size: $font-size-sm;
    color: $text-color-secondary;
  }
}

.login-form {
  .submit-button {
    width: 100%;
    @include button-base($primary-color, white, $border-radius-lg);
    padding: $spacing-base;
    font-size: $font-size-base;
    font-weight: $font-weight-medium;
    margin-top: $spacing-lg;
    position: relative;
    
    &:hover:not(:disabled) {
      background-color: $primary-dark;
      transform: translateY(-1px);
      box-shadow: 0 4px 12px rgba($primary-color, 0.4);
    }
    
    &:disabled {
      opacity: 0.7;
      cursor: not-allowed;
    }
    
    &.loading {
      color: transparent;
    }
    
    .loading-icon {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      color: white;
      animation: spin 1s linear infinite;
    }
  }
}

// 同意条款
.agreement-section {
  margin: $spacing-base 0;
  
  .agreement-checkbox {
    display: flex;
    align-items: flex-start;
    cursor: pointer;
    
    input[type="checkbox"] {
      display: none;
      
      &:checked + .checkbox-mark {
        background-color: $primary-color;
        border-color: $primary-color;
        
        &::after {
          opacity: 1;
        }
      }
      
      &.error + .checkbox-mark {
        border-color: $error-color;
      }
    }
    
    .checkbox-mark {
      width: 18px;
      height: 18px;
      border: 2px solid $border-color;
      border-radius: $border-radius-sm;
      margin-right: $spacing-sm;
      flex-shrink: 0;
      position: relative;
      @include transition(all);
      
      &::after {
        content: '✓';
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        color: white;
        font-size: 12px;
        font-weight: bold;
        opacity: 0;
        @include transition(opacity);
      }
    }
    
    .agreement-text {
      font-size: $font-size-sm;
      color: $text-color-secondary;
      line-height: 1.4;
      
      .agreement-link {
        color: $primary-color;
        text-decoration: none;
        
        &:hover {
          text-decoration: underline;
        }
      }
    }
  }
  
  .agreement-error {
    margin-top: $spacing-xs;
    font-size: $font-size-sm;
    color: $error-color;
  }
}

// 自动登录
.auto-login-section {
  margin: $spacing-base 0;
  
  .auto-login-checkbox {
    display: flex;
    align-items: center;
    cursor: pointer;
    
    input[type="checkbox"] {
      display: none;
      
      &:checked + .checkbox-mark {
        background-color: $primary-color;
        border-color: $primary-color;
        
        &::after {
          opacity: 1;
        }
      }
    }
    
    .checkbox-mark {
      width: 16px;
      height: 16px;
      border: 2px solid $border-color;
      border-radius: $border-radius-sm;
      margin-right: $spacing-sm;
      position: relative;
      @include transition(all);
      
      &::after {
        content: '✓';
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        color: white;
        font-size: 10px;
        font-weight: bold;
        opacity: 0;
        @include transition(opacity);
      }
    }
    
    .checkbox-text {
      font-size: $font-size-sm;
      color: $text-color-secondary;
    }
  }
}

// 表单底部
.form-footer {
  text-align: center;
  margin-top: $spacing-lg;
  
  .switch-text {
    font-size: $font-size-sm;
    color: $text-color-secondary;
    
    .switch-link {
      color: $primary-color;
      text-decoration: none;
      font-weight: $font-weight-medium;
      
      &:hover {
        text-decoration: underline;
      }
    }
  }
}

// 快速登录
.quick-login {
  padding: 0 $spacing-base $spacing-xl;
  
  .quick-login-title {
    text-align: center;
    color: white;
    font-size: $font-size-sm;
    margin-bottom: $spacing-base;
    opacity: 0.9;
  }
  
  .quick-login-methods {
    display: flex;
    justify-content: center;
    gap: $spacing-base;
  }
  
  .quick-login-btn {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: $spacing-base;
    background: rgba(255, 255, 255, 0.1);
    border: none;
    border-radius: $border-radius-lg;
    color: white;
    cursor: pointer;
    @include transition(all);
    backdrop-filter: blur(10px);
    
    &:hover {
      background: rgba(255, 255, 255, 0.2);
      transform: translateY(-2px);
    }
    
    .method-icon {
      font-size: 24px;
      margin-bottom: $spacing-xs;
    }
    
    .method-text {
      font-size: $font-size-sm;
    }
  }
}

// 动画
@keyframes float {
  0%, 100% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-10px);
  }
}

@keyframes spin {
  from {
    transform: translate(-50%, -50%) rotate(0deg);
  }
  to {
    transform: translate(-50%, -50%) rotate(360deg);
  }
}

// 移动端适配
@include respond-to(xs) {
  .login-header {
    padding: $spacing-xl $spacing-base $spacing-lg;
    
    .header-content {
      .app-title {
        font-size: $font-size-xxl;
      }
    }
  }
  
  .form-card {
    padding: $spacing-lg $spacing-base;
    margin-top: -$spacing-base;
  }
  
  .quick-login {
    padding: 0 $spacing-base $spacing-lg;
  }
}
</style>