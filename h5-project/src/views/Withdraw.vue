<template>
  <div class="withdraw-page">
    <!-- 页面头部 -->
    <div class="page-header">
      <button class="back-btn" @click="goBack">←</button>
      <h1 class="page-title">申请提现</h1>
      <button class="history-btn" @click="goToHistory">记录</button>
    </div>
    
    <!-- 账户余额 -->
    <div class="balance-card">
      <div class="balance-header">
        <div class="balance-icon">💰</div>
        <div class="balance-info">
          <div class="balance-label">可提现余额</div>
          <div class="balance-amount">¥{{ availableBalance }}</div>
        </div>
        <div class="refresh-btn" @click="refreshBalance">🔄</div>
      </div>
      <div class="balance-tips">
        <div class="tip-item">
          <span class="tip-icon">ℹ️</span>
          <span class="tip-text">最低提现金额：¥{{ minWithdrawAmount }}</span>
        </div>
        <div class="tip-item">
          <span class="tip-icon">⚡</span>
          <span class="tip-text">预计到账时间：1-3个工作日</span>
        </div>
      </div>
    </div>
    
    <!-- 提现表单 -->
    <div class="withdraw-form">
      <div class="form-section">
        <h3 class="section-title">提现金额</h3>
        <div class="amount-input-container">
          <div class="amount-input-wrapper">
            <span class="currency-symbol">¥</span>
            <input
              v-model="withdrawForm.amount"
              type="number"
              class="amount-input"
              placeholder="请输入提现金额"
              :min="minWithdrawAmount"
              :max="availableBalance"
              @input="validateAmount"
            />
          </div>
          <div v-if="amountError" class="field-error">{{ amountError }}</div>
          
          <!-- 快捷金额选择 -->
          <div class="quick-amounts">
            <button
              v-for="amount in quickAmounts"
              :key="amount"
              class="quick-amount-btn"
              :disabled="amount > parseFloat(availableBalance)"
              @click="selectQuickAmount(amount)"
            >
              {{ amount }}元
            </button>
            <button
              class="quick-amount-btn all"
              @click="selectAllAmount"
            >
              全部
            </button>
          </div>
        </div>
      </div>
      
      <!-- 提现方式 -->
      <div class="form-section">
        <h3 class="section-title">提现方式</h3>
        <div class="withdraw-methods">
          <div
            v-for="method in withdrawMethods"
            :key="method.key"
            :class="['method-item', { active: withdrawForm.method === method.key }]"
            @click="selectMethod(method.key)"
          >
            <div class="method-icon">{{ method.icon }}</div>
            <div class="method-info">
              <div class="method-name">{{ method.name }}</div>
              <div class="method-desc">{{ method.description }}</div>
            </div>
            <div class="method-select">
              <span :class="['radio', { checked: withdrawForm.method === method.key }]"></span>
            </div>
          </div>
        </div>
      </div>
      
      <!-- 银行卡信息 -->
      <div v-if="withdrawForm.method === 'bank'" class="form-section">
        <h3 class="section-title">银行卡信息</h3>
        <div class="bank-form">
          <FormInput
            v-model="withdrawForm.bankCard.holderName"
            label="持卡人姓名"
            placeholder="请输入持卡人姓名"
            prefix-icon="👤"
            :error="errors.holderName"
            required
            @input="clearError('holderName')"
          />
          
          <FormInput
            v-model="withdrawForm.bankCard.cardNumber"
            label="银行卡号"
            placeholder="请输入银行卡号"
            prefix-icon="💳"
            type="text"
            maxlength="19"
            :error="errors.cardNumber"
            required
            @input="formatCardNumber"
          />
          
          <div class="bank-select">
            <label class="field-label">开户银行</label>
            <select v-model="withdrawForm.bankCard.bankName" class="bank-select-input">
              <option value="">请选择银行</option>
              <option v-for="bank in supportedBanks" :key="bank.code" :value="bank.name">
                {{ bank.name }}
              </option>
            </select>
            <div v-if="errors.bankName" class="field-error">{{ errors.bankName }}</div>
          </div>
          
          <FormInput
            v-model="withdrawForm.bankCard.branchName"
            label="开户支行（可选）"
            placeholder="请输入开户支行"
            prefix-icon="🏢"
            @input="clearError('branchName')"
          />
        </div>
      </div>
      
      <!-- 支付宝信息 -->
      <div v-if="withdrawForm.method === 'alipay'" class="form-section">
        <h3 class="section-title">支付宝信息</h3>
        <div class="alipay-form">
          <FormInput
            v-model="withdrawForm.alipay.account"
            label="支付宝账号"
            placeholder="请输入支付宝账号/手机号"
            prefix-icon="📱"
            :error="errors.alipayAccount"
            required
            @input="clearError('alipayAccount')"
          />
          
          <FormInput
            v-model="withdrawForm.alipay.realName"
            label="真实姓名"
            placeholder="请输入支付宝实名认证姓名"
            prefix-icon="👤"
            :error="errors.alipayRealName"
            required
            @input="clearError('alipayRealName')"
          />
        </div>
      </div>
      
      <!-- 手续费说明 -->
      <div class="fee-info">
        <div class="fee-header">
          <span class="fee-title">手续费明细</span>
          <span class="fee-amount">{{ feeAmount > 0 ? `¥${feeAmount.toFixed(2)}` : '免费' }}</span>
        </div>
        <div class="fee-details">
          <div class="fee-item">
            <span class="fee-label">提现金额</span>
            <span class="fee-value">¥{{ withdrawForm.amount || '0.00' }}</span>
          </div>
          <div class="fee-item">
            <span class="fee-label">手续费</span>
            <span class="fee-value">{{ feeAmount > 0 ? `¥${feeAmount.toFixed(2)}` : '免费' }}</span>
          </div>
          <div class="fee-item total">
            <span class="fee-label">实际到账</span>
            <span class="fee-value">¥{{ actualAmount.toFixed(2) }}</span>
          </div>
        </div>
      </div>
      
      <!-- 提现须知 -->
      <div class="withdraw-notice">
        <div class="notice-header">
          <span class="notice-icon">📋</span>
          <span class="notice-title">提现须知</span>
        </div>
        <div class="notice-content">
          <div class="notice-item">• 提现申请提交后，预计1-3个工作日内到账</div>
          <div class="notice-item">• 请确保银行卡/支付宝信息准确，错误信息可能导致提现失败</div>
          <div class="notice-item">• 单次提现最低{{ minWithdrawAmount }}元，最高{{ maxWithdrawAmount }}元</div>
          <div class="notice-item">• 每日最多可申请3次提现</div>
          <div class="notice-item">• 提现记录可在"提现记录"中查看</div>
        </div>
      </div>
      
      <!-- 提交按钮 -->
      <div class="submit-section">
        <button
          class="submit-btn"
          :disabled="!canSubmit"
          :class="{ loading: submitting }"
          @click="handleSubmit"
        >
          <span v-if="submitting" class="loading-icon">⏳</span>
          {{ submitting ? '提交中...' : '立即提现' }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
/**
 * 提现页面
 * 支持银行卡和支付宝提现
 * @author 前端工程师团队
 * @date 2024-12-XX
 */
import { ref, reactive, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/stores/user'
import FormInput from '@/components/common/FormInput.vue'
import { showSuccess, showError, showConfirm } from '@/utils/toast'
import api from '@/utils/request'

// 路由和状态管理
const router = useRouter()
const userStore = useUserStore()

// 响应式数据
const submitting = ref(false)
const availableBalance = ref('2119.50')
const minWithdrawAmount = ref(10)
const maxWithdrawAmount = ref(5000)

// 表单数据
const withdrawForm = reactive({
  amount: '',
  method: 'bank',
  bankCard: {
    holderName: '',
    cardNumber: '',
    bankName: '',
    branchName: ''
  },
  alipay: {
    account: '',
    realName: ''
  }
})

// 错误信息
const errors = reactive({
  holderName: '',
  cardNumber: '',
  bankName: '',
  branchName: '',
  alipayAccount: '',
  alipayRealName: ''
})

const amountError = ref('')

// 提现方式配置
const withdrawMethods = [
  {
    key: 'bank',
    name: '银行卡',
    description: '提现到银行卡，1-3个工作日到账',
    icon: '💳'
  },
  {
    key: 'alipay',
    name: '支付宝',
    description: '提现到支付宝，实时到账',
    icon: '💰'
  }
]

// 快捷金额选项
const quickAmounts = [50, 100, 200, 500, 1000]

// 支持的银行
const supportedBanks = [
  { code: 'ICBC', name: '工商银行' },
  { code: 'ABC', name: '农业银行' },
  { code: 'BOC', name: '中国银行' },
  { code: 'CCB', name: '建设银行' },
  { code: 'COMM', name: '交通银行' },
  { code: 'CMB', name: '招商银行' },
  { code: 'SPDB', name: '浦发银行' },
  { code: 'CIB', name: '兴业银行' },
  { code: 'CMSB', name: '民生银行' },
  { code: 'CGBCHINA', name: '广发银行' },
  { code: 'PINGAN', name: '平安银行' },
  { code: 'CEB', name: '光大银行' }
]

// 计算属性
const feeAmount = computed(() => {
  const amount = parseFloat(withdrawForm.amount) || 0
  if (amount <= 0) return 0
  
  // 银行卡提现手续费规则
  if (withdrawForm.method === 'bank') {
    if (amount <= 1000) return 0 // 1000元以下免手续费
    return Math.min(amount * 0.001, 5) // 0.1%手续费，最高5元
  }
  
  // 支付宝提现免手续费
  return 0
})

const actualAmount = computed(() => {
  const amount = parseFloat(withdrawForm.amount) || 0
  return Math.max(0, amount - feeAmount.value)
})

const canSubmit = computed(() => {
  if (!withdrawForm.amount || parseFloat(withdrawForm.amount) < minWithdrawAmount.value) {
    return false
  }
  
  if (parseFloat(withdrawForm.amount) > parseFloat(availableBalance.value)) {
    return false
  }
  
  if (withdrawForm.method === 'bank') {
    return withdrawForm.bankCard.holderName &&
           withdrawForm.bankCard.cardNumber &&
           withdrawForm.bankCard.bankName
  }
  
  if (withdrawForm.method === 'alipay') {
    return withdrawForm.alipay.account && withdrawForm.alipay.realName
  }
  
  return false
})

/**
 * 验证提现金额
 */
const validateAmount = () => {
  const amount = parseFloat(withdrawForm.amount)
  
  if (!amount || amount <= 0) {
    amountError.value = '请输入有效的提现金额'
    return
  }
  
  if (amount < minWithdrawAmount.value) {
    amountError.value = `最低提现金额为¥${minWithdrawAmount.value}`
    return
  }
  
  if (amount > maxWithdrawAmount.value) {
    amountError.value = `单次最高提现金额为¥${maxWithdrawAmount.value}`
    return
  }
  
  if (amount > parseFloat(availableBalance.value)) {
    amountError.value = '提现金额不能超过可用余额'
    return
  }
  
  amountError.value = ''
}

/**
 * 选择快捷金额
 * @param {number} amount 金额
 */
const selectQuickAmount = (amount) => {
  withdrawForm.amount = amount.toString()
  validateAmount()
}

/**
 * 选择全部金额
 */
const selectAllAmount = () => {
  withdrawForm.amount = availableBalance.value
  validateAmount()
}

/**
 * 选择提现方式
 * @param {string} method 提现方式
 */
const selectMethod = (method) => {
  withdrawForm.method = method
  clearAllErrors()
}

/**
 * 格式化银行卡号
 */
const formatCardNumber = () => {
  let value = withdrawForm.bankCard.cardNumber.replace(/\s/g, '')
  value = value.replace(/(.{4})/g, '$1 ')
  withdrawForm.bankCard.cardNumber = value.trim()
  clearError('cardNumber')
}

/**
 * 清除单个字段错误
 * @param {string} field 字段名
 */
const clearError = (field) => {
  errors[field] = ''
}

/**
 * 清除所有错误
 */
const clearAllErrors = () => {
  Object.keys(errors).forEach(key => {
    errors[key] = ''
  })
  amountError.value = ''
}

/**
 * 验证表单
 */
const validateForm = () => {
  clearAllErrors()
  let isValid = true
  
  // 验证金额
  validateAmount()
  if (amountError.value) {
    isValid = false
  }
  
  // 验证银行卡信息
  if (withdrawForm.method === 'bank') {
    if (!withdrawForm.bankCard.holderName) {
      errors.holderName = '请输入持卡人姓名'
      isValid = false
    }
    
    if (!withdrawForm.bankCard.cardNumber) {
      errors.cardNumber = '请输入银行卡号'
      isValid = false
    } else if (withdrawForm.bankCard.cardNumber.replace(/\s/g, '').length < 16) {
      errors.cardNumber = '银行卡号格式不正确'
      isValid = false
    }
    
    if (!withdrawForm.bankCard.bankName) {
      errors.bankName = '请选择开户银行'
      isValid = false
    }
  }
  
  // 验证支付宝信息
  if (withdrawForm.method === 'alipay') {
    if (!withdrawForm.alipay.account) {
      errors.alipayAccount = '请输入支付宝账号'
      isValid = false
    }
    
    if (!withdrawForm.alipay.realName) {
      errors.alipayRealName = '请输入真实姓名'
      isValid = false
    }
  }
  
  return isValid
}

/**
 * 处理提交
 */
const handleSubmit = async () => {
  if (!validateForm()) {
    return
  }
  
  const confirmed = await showConfirm(
    `确认提现¥${withdrawForm.amount}到${withdrawForm.method === 'bank' ? '银行卡' : '支付宝'}？`
  )
  
  if (!confirmed) {
    return
  }
  
  try {
    submitting.value = true
    
    const submitData = {
      amount: parseFloat(withdrawForm.amount),
      method: withdrawForm.method,
      feeAmount: feeAmount.value,
      actualAmount: actualAmount.value
    }
    
    if (withdrawForm.method === 'bank') {
      submitData.bankCard = {
        holderName: withdrawForm.bankCard.holderName,
        cardNumber: withdrawForm.bankCard.cardNumber.replace(/\s/g, ''),
        bankName: withdrawForm.bankCard.bankName,
        branchName: withdrawForm.bankCard.branchName
      }
    } else {
      submitData.alipay = {
        account: withdrawForm.alipay.account,
        realName: withdrawForm.alipay.realName
      }
    }
    
    await api.post('/api/withdraw/apply', submitData)
    
    showSuccess('提现申请提交成功，请等待审核')
    
    // 刷新余额
    await refreshBalance()
    
    // 重置表单
    resetForm()
    
    // 可以跳转到提现记录页面
    setTimeout(() => {
      goToHistory()
    }, 2000)
    
  } catch (error) {
    showError(error.message || '提现申请失败')
  } finally {
    submitting.value = false
  }
}

/**
 * 重置表单
 */
const resetForm = () => {
  withdrawForm.amount = ''
  withdrawForm.bankCard.holderName = ''
  withdrawForm.bankCard.cardNumber = ''
  withdrawForm.bankCard.bankName = ''
  withdrawForm.bankCard.branchName = ''
  withdrawForm.alipay.account = ''
  withdrawForm.alipay.realName = ''
  clearAllErrors()
}

/**
 * 刷新余额
 */
const refreshBalance = async () => {
  try {
    // 这里应该调用实际的API
    // const result = await api.get('/api/user/balance')
    // availableBalance.value = result.available.toFixed(2)
    
    // 模拟刷新
    showSuccess('余额已刷新')
  } catch (error) {
    showError('刷新失败')
  }
}

/**
 * 路由跳转方法
 */
const goBack = () => {
  router.back()
}

const goToHistory = () => {
  router.push('/withdraw-history')
}

// 生命周期
onMounted(() => {
  console.log('💳 提现页面初始化')
})
</script>

<style lang="scss" scoped>
@use "@/assets/styles/variables.scss" as *;
@use "@/assets/styles/mixins.scss" as *;

.withdraw-page {
  min-height: 100vh;
  background-color: $background-color-light;
  padding-bottom: $spacing-xl;
}

// 页面头部
.page-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: $spacing-base;
  background-color: $background-color;
  border-bottom: 1px solid $border-color-light;
  
  .back-btn {
    width: 40px;
    height: 40px;
    border: none;
    background: none;
    font-size: $font-size-xl;
    color: $text-color-primary;
    cursor: pointer;
    @include transition(color);
    
    &:hover {
      color: $primary-color;
    }
  }
  
  .page-title {
    font-size: $font-size-lg;
    font-weight: $font-weight-medium;
    color: $text-color-primary;
  }
  
  .history-btn {
    padding: $spacing-xs $spacing-sm;
    border: 1px solid $primary-color;
    border-radius: $border-radius-base;
    background: none;
    color: $primary-color;
    font-size: $font-size-sm;
    cursor: pointer;
    @include transition(all);
    
    &:hover {
      background-color: $primary-color;
      color: white;
    }
  }
}

// 账户余额卡片
.balance-card {
  margin: $spacing-base;
  padding: $spacing-lg;
  background: linear-gradient(135deg, $success-color, lighten($success-color, 10%));
  border-radius: $border-radius-lg;
  color: white;
  
  .balance-header {
    display: flex;
    align-items: center;
    gap: $spacing-base;
    margin-bottom: $spacing-base;
    
    .balance-icon {
      font-size: 32px;
    }
    
    .balance-info {
      flex: 1;
      
      .balance-label {
        font-size: $font-size-sm;
        opacity: 0.9;
        margin-bottom: $spacing-xs;
      }
      
      .balance-amount {
        font-size: $font-size-title;
        font-weight: $font-weight-bold;
      }
    }
    
    .refresh-btn {
      cursor: pointer;
      font-size: $font-size-lg;
      opacity: 0.8;
      @include transition(all);
      
      &:hover {
        opacity: 1;
        transform: rotate(180deg);
      }
    }
  }
  
  .balance-tips {
    .tip-item {
      display: flex;
      align-items: center;
      gap: $spacing-xs;
      margin-bottom: $spacing-xs;
      font-size: $font-size-sm;
      opacity: 0.9;
      
      &:last-child {
        margin-bottom: 0;
      }
    }
  }
}

// 提现表单
.withdraw-form {
  margin: 0 $spacing-base;
}

.form-section {
  background-color: $background-color;
  border-radius: $border-radius-lg;
  padding: $spacing-lg;
  margin-bottom: $spacing-base;
  box-shadow: $box-shadow-base;
  
  .section-title {
    font-size: $font-size-lg;
    font-weight: $font-weight-medium;
    color: $text-color-primary;
    margin-bottom: $spacing-base;
  }
}

// 金额输入
.amount-input-container {
  .amount-input-wrapper {
    position: relative;
    display: flex;
    align-items: center;
    border: 2px solid $border-color;
    border-radius: $border-radius-lg;
    background-color: $background-color-light;
    @include transition(border-color);
    
    &:focus-within {
      border-color: $primary-color;
    }
    
    .currency-symbol {
      padding: 0 $spacing-base;
      font-size: $font-size-xl;
      font-weight: $font-weight-bold;
      color: $text-color-secondary;
    }
    
    .amount-input {
      flex: 1;
      padding: $spacing-base $spacing-base $spacing-base 0;
      border: none;
      background: none;
      font-size: $font-size-xl;
      font-weight: $font-weight-bold;
      color: $text-color-primary;
      outline: none;
      
      &::placeholder {
        color: $text-color-disabled;
        font-weight: $font-weight-normal;
      }
    }
  }
  
  .field-error {
    margin-top: $spacing-xs;
    font-size: $font-size-sm;
    color: $error-color;
  }
  
  .quick-amounts {
    display: flex;
    flex-wrap: wrap;
    gap: $spacing-sm;
    margin-top: $spacing-base;
    
    .quick-amount-btn {
      padding: $spacing-xs $spacing-sm;
      border: 1px solid $border-color;
      border-radius: $border-radius-base;
      background-color: $background-color-light;
      color: $text-color-secondary;
      font-size: $font-size-sm;
      cursor: pointer;
      @include transition(all);
      
      &:hover:not(:disabled) {
        border-color: $primary-color;
        color: $primary-color;
      }
      
      &:disabled {
        opacity: 0.5;
        cursor: not-allowed;
      }
      
      &.all {
        background-color: $primary-color;
        border-color: $primary-color;
        color: white;
        
        &:hover {
          background-color: $primary-dark;
        }
      }
    }
  }
}

// 提现方式
.withdraw-methods {
  .method-item {
    display: flex;
    align-items: center;
    padding: $spacing-base;
    margin-bottom: $spacing-sm;
    border: 2px solid $border-color;
    border-radius: $border-radius-lg;
    cursor: pointer;
    @include transition(all);
    
    &:last-child {
      margin-bottom: 0;
    }
    
    &:hover {
      border-color: $primary-light;
    }
    
    &.active {
      border-color: $primary-color;
      background-color: rgba($primary-color, 0.05);
    }
    
    .method-icon {
      font-size: 24px;
      margin-right: $spacing-base;
    }
    
    .method-info {
      flex: 1;
      
      .method-name {
        font-size: $font-size-base;
        font-weight: $font-weight-medium;
        color: $text-color-primary;
        margin-bottom: $spacing-xs;
      }
      
      .method-desc {
        font-size: $font-size-sm;
        color: $text-color-secondary;
      }
    }
    
    .method-select {
      .radio {
        width: 20px;
        height: 20px;
        border: 2px solid $border-color;
        border-radius: 50%;
        position: relative;
        @include transition(all);
        
        &.checked {
          border-color: $primary-color;
          
          &::after {
            content: '';
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            width: 10px;
            height: 10px;
            background-color: $primary-color;
            border-radius: 50%;
          }
        }
      }
    }
  }
}

// 银行选择
.bank-select {
  margin-bottom: $spacing-base;
  
  .field-label {
    display: block;
    font-size: $font-size-sm;
    font-weight: $font-weight-medium;
    color: $text-color-primary;
    margin-bottom: $spacing-xs;
  }
  
  .bank-select-input {
    width: 100%;
    padding: $spacing-sm $spacing-base;
    border: 1px solid $border-color;
    border-radius: $border-radius-base;
    background-color: $background-color;
    color: $text-color-primary;
    font-size: $font-size-base;
    outline: none;
    @include transition(border-color);
    
    &:focus {
      border-color: $primary-color;
    }
  }
}

// 手续费说明
.fee-info {
  background-color: $background-color;
  border-radius: $border-radius-lg;
  padding: $spacing-lg;
  margin-bottom: $spacing-base;
  box-shadow: $box-shadow-base;
  
  .fee-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: $spacing-base;
    
    .fee-title {
      font-size: $font-size-base;
      font-weight: $font-weight-medium;
      color: $text-color-primary;
    }
    
    .fee-amount {
      font-size: $font-size-base;
      font-weight: $font-weight-bold;
      color: $warning-color;
    }
  }
  
  .fee-details {
    .fee-item {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: $spacing-xs 0;
      border-bottom: 1px solid $border-color-light;
      
      &:last-child {
        border-bottom: none;
      }
      
      &.total {
        font-weight: $font-weight-bold;
        color: $primary-color;
        border-top: 1px solid $border-color;
        padding-top: $spacing-sm;
        margin-top: $spacing-xs;
      }
      
      .fee-label {
        font-size: $font-size-sm;
        color: $text-color-secondary;
      }
      
      .fee-value {
        font-size: $font-size-sm;
        color: $text-color-primary;
      }
    }
  }
}

// 提现须知
.withdraw-notice {
  background-color: rgba($info-color, 0.05);
  border: 1px solid rgba($info-color, 0.2);
  border-radius: $border-radius-lg;
  padding: $spacing-lg;
  margin-bottom: $spacing-base;
  
  .notice-header {
    display: flex;
    align-items: center;
    gap: $spacing-xs;
    margin-bottom: $spacing-base;
    
    .notice-title {
      font-size: $font-size-base;
      font-weight: $font-weight-medium;
      color: $text-color-primary;
    }
  }
  
  .notice-content {
    .notice-item {
      font-size: $font-size-sm;
      color: $text-color-secondary;
      line-height: $line-height-base;
      margin-bottom: $spacing-xs;
      
      &:last-child {
        margin-bottom: 0;
      }
    }
  }
}

// 提交按钮
.submit-section {
  .submit-btn {
    width: 100%;
    padding: $spacing-base;
    border: none;
    border-radius: $border-radius-lg;
    background-color: $primary-color;
    color: white;
    font-size: $font-size-lg;
    font-weight: $font-weight-bold;
    cursor: pointer;
    @include transition(all);
    position: relative;
    
    &:hover:not(:disabled) {
      background-color: $primary-dark;
      transform: translateY(-2px);
      box-shadow: $box-shadow-lg;
    }
    
    &:disabled {
      background-color: $text-color-disabled;
      cursor: not-allowed;
      transform: none;
      box-shadow: none;
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
  .balance-header {
    .balance-icon {
      font-size: 24px;
    }
    
    .balance-info {
      .balance-amount {
        font-size: $font-size-xl;
      }
    }
  }
  
  .amount-input-wrapper {
    .currency-symbol {
      font-size: $font-size-lg;
    }
    
    .amount-input {
      padding: $spacing-sm $spacing-sm $spacing-sm 0;
      font-size: $font-size-lg;
    }
  }
  
  .quick-amounts {
    .quick-amount-btn {
      flex: 1;
      min-width: 60px;
    }
  }
  
  .method-item {
    .method-icon {
      font-size: 20px;
    }
  }
}
</style>