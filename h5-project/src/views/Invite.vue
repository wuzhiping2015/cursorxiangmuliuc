<template>
  <div class="invite-page">
    <!-- 页面头部 -->
    <div class="page-header">
      <button class="back-btn" @click="goBack">←</button>
      <h1 class="page-title">邀请好友</h1>
      <div class="header-placeholder"></div>
    </div>
    
    <!-- 邀请收益展示 -->
    <div class="reward-banner">
      <div class="banner-content">
        <div class="reward-info">
          <h3 class="reward-title">邀请一位好友获得</h3>
          <div class="reward-amount">¥{{ rewardAmount }}</div>
          <p class="reward-desc">好友完成注册即可获得奖励</p>
        </div>
        <div class="reward-icon">🎁</div>
      </div>
    </div>
    
    <!-- 邀请链接卡片 -->
    <div class="invite-link-card">
      <div class="card-header">
        <h3 class="card-title">我的邀请链接</h3>
        <div class="invite-stats">
          <span class="stats-item">今日分享 {{ shareStats.todayShares }} 次</span>
        </div>
      </div>
      
      <div class="link-container">
        <div class="link-display">
          <input
            ref="linkInputRef"
            v-model="inviteLink"
            type="text"
            class="link-input"
            readonly
            @click="selectAll"
          />
          <button class="copy-btn" @click="handleCopyLink">
            {{ copyButtonText }}
          </button>
        </div>
      </div>
      
      <!-- 二维码 -->
      <div class="qrcode-section">
        <div class="qrcode-container">
          <div v-if="!qrCodeLoading" class="qrcode">
            <canvas ref="qrCodeCanvasRef" class="qrcode-canvas"></canvas>
          </div>
          <div v-else class="qrcode-loading">
            <Loading :visible="true" text="生成中..." size="small" />
          </div>
        </div>
        <p class="qrcode-tip">长按保存二维码分享给好友</p>
      </div>
    </div>
    
    <!-- 分享方式 -->
    <div class="share-methods">
      <h3 class="section-title">选择分享方式</h3>
      <div class="methods-grid">
        <div class="method-item" @click="shareToWechat">
          <div class="method-icon wechat">💬</div>
          <span class="method-name">微信好友</span>
        </div>
        <div class="method-item" @click="shareToMoments">
          <div class="method-icon moments">🌟</div>
          <span class="method-name">朋友圈</span>
        </div>
        <div class="method-item" @click="shareToQQ">
          <div class="method-icon qq">🐧</div>
          <span class="method-name">QQ好友</span>
        </div>
        <div class="method-item" @click="shareToWeibo">
          <div class="method-icon weibo">📱</div>
          <span class="method-name">新浪微博</span>
        </div>
        <div class="method-item" @click="shareToSystem">
          <div class="method-icon system">📤</div>
          <span class="method-name">更多方式</span>
        </div>
        <div class="method-item" @click="downloadQRCode">
          <div class="method-icon download">💾</div>
          <span class="method-name">保存图片</span>
        </div>
      </div>
    </div>
    
    <!-- 邀请规则 -->
    <div class="invite-rules">
      <div class="rules-header">
        <h3 class="section-title">邀请规则</h3>
        <button class="rules-toggle" @click="toggleRules">
          {{ showRules ? '收起' : '展开' }} {{ showRules ? '▲' : '▼' }}
        </button>
      </div>
      
      <transition name="rules-collapse">
        <div v-if="showRules" class="rules-content">
          <div class="rule-item">
            <div class="rule-icon">✅</div>
            <div class="rule-text">
              <div class="rule-title">邀请成功</div>
              <div class="rule-desc">好友通过您的链接注册成功</div>
            </div>
          </div>
          <div class="rule-item">
            <div class="rule-icon">💰</div>
            <div class="rule-text">
              <div class="rule-title">获得奖励</div>
              <div class="rule-desc">系统自动发放邀请奖励到账户</div>
            </div>
          </div>
          <div class="rule-item">
            <div class="rule-icon">🎯</div>
            <div class="rule-text">
              <div class="rule-title">无限邀请</div>
              <div class="rule-desc">邀请人数不限，多邀请多收益</div>
            </div>
          </div>
          <div class="rule-item">
            <div class="rule-icon">⚡</div>
            <div class="rule-text">
              <div class="rule-title">实时到账</div>
              <div class="rule-desc">奖励实时到账，可立即提现</div>
            </div>
          </div>
        </div>
      </transition>
    </div>
    
    <!-- 邀请记录快捷入口 -->
    <div class="quick-entry">
      <div class="entry-item" @click="goToInviteList">
        <div class="entry-icon">📋</div>
        <div class="entry-content">
          <div class="entry-title">邀请记录</div>
          <div class="entry-desc">查看我的邀请明细</div>
        </div>
        <div class="entry-arrow">→</div>
      </div>
      <div class="entry-item" @click="goToRewards">
        <div class="entry-icon">💎</div>
        <div class="entry-content">
          <div class="entry-title">我的奖励</div>
          <div class="entry-desc">查看奖励收益</div>
        </div>
        <div class="entry-arrow">→</div>
      </div>
    </div>
  </div>
</template>

<script setup>
/**
 * 邀请页面
 * 支持链接分享、二维码生成、多种分享方式
 * @author 前端工程师团队
 * @date 2024-12-XX
 */
import { ref, reactive, computed, onMounted, nextTick } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/stores/user'
import { useInviteStore } from '@/stores/invite'
import Loading from '@/components/common/Loading.vue'
import { showSuccess, showError, showCopySuccess } from '@/utils/toast'

// 路由和状态管理
const router = useRouter()
const userStore = useUserStore()
const inviteStore = useInviteStore()

// DOM 引用
const linkInputRef = ref(null)
const qrCodeCanvasRef = ref(null)

// 响应式数据
const inviteLink = ref('')
const qrCodeLoading = ref(false)
const copyButtonText = ref('复制')
const showRules = ref(false)

// 配置数据
const rewardAmount = ref(20) // 邀请奖励金额

const shareStats = reactive({
  todayShares: 0,
  totalShares: 0
})

// 计算属性
const userInfo = computed(() => userStore.userInfo)

/**
 * 生成邀请链接
 */
const generateInviteLink = async () => {
  try {
    const result = await inviteStore.generateInviteLink(userInfo.value?.inviteCode || 'DEFAULT')
    if (result.success) {
      inviteLink.value = result.data.inviteLink
      await generateQRCode()
    }
  } catch (error) {
    console.error('生成邀请链接失败:', error)
    showError('邀请链接生成失败')
  }
}

/**
 * 生成二维码
 */
const generateQRCode = async () => {
  if (!inviteLink.value || !qrCodeCanvasRef.value) return
  
  try {
    qrCodeLoading.value = true
    
    // 这里应该使用 QR Code 生成库，如 qrcode
    // 为了简化演示，使用简单的模拟
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    const canvas = qrCodeCanvasRef.value
    const ctx = canvas.getContext('2d')
    
    // 设置画布大小
    canvas.width = 200
    canvas.height = 200
    
    // 绘制简单的二维码占位符
    ctx.fillStyle = '#333'
    ctx.fillRect(0, 0, 200, 200)
    
    // 绘制白色方块模拟二维码
    ctx.fillStyle = '#fff'
    for (let i = 0; i < 10; i++) {
      for (let j = 0; j < 10; j++) {
        if ((i + j) % 2 === 0) {
          ctx.fillRect(i * 20, j * 20, 18, 18)
        }
      }
    }
    
    // 在中心绘制Logo区域
    ctx.fillStyle = '#fff'
    ctx.fillRect(70, 70, 60, 60)
    ctx.fillStyle = '#ff6b35'
    ctx.fillRect(75, 75, 50, 50)
    
  } catch (error) {
    console.error('生成二维码失败:', error)
  } finally {
    qrCodeLoading.value = false
  }
}

/**
 * 选中全部链接文本
 */
const selectAll = () => {
  if (linkInputRef.value) {
    linkInputRef.value.select()
  }
}

/**
 * 复制邀请链接
 */
const handleCopyLink = async () => {
  const result = await inviteStore.copyInviteLink()
  if (result.success) {
    copyButtonText.value = '已复制'
    showCopySuccess()
    
    // 2秒后恢复按钮文本
    setTimeout(() => {
      copyButtonText.value = '复制'
    }, 2000)
  } else {
    showError(result.message)
  }
}

/**
 * 微信好友分享
 */
const shareToWechat = () => {
  if (typeof window.wx !== 'undefined') {
    const result = inviteStore.shareToWechat({
      title: '邀请你加入我们，一起赚取丰厚奖励！',
      desc: `通过我的邀请链接注册，你我都能获得¥${rewardAmount.value}奖励`,
      link: inviteLink.value
    })
    
    if (result.success) {
      updateShareStats('wechat')
    }
  } else {
    // 非微信环境，复制链接
    handleCopyLink()
    showSuccess('链接已复制，请在微信中分享给好友')
  }
}

/**
 * 朋友圈分享
 */
const shareToMoments = () => {
  if (typeof window.wx !== 'undefined') {
    inviteStore.shareToWechat({
      title: `邀请好友注册，获得¥${rewardAmount.value}奖励！`,
      link: inviteLink.value
    })
    updateShareStats('moments')
  } else {
    handleCopyLink()
    showSuccess('链接已复制，请在微信朋友圈中分享')
  }
}

/**
 * QQ分享
 */
const shareToQQ = () => {
  handleCopyLink()
  showSuccess('链接已复制，请在QQ中分享给好友')
  updateShareStats('qq')
}

/**
 * 微博分享
 */
const shareToWeibo = () => {
  const text = `邀请好友注册，获得¥${rewardAmount.value}奖励！${inviteLink.value}`
  const url = `https://service.weibo.com/share/share.php?url=${encodeURIComponent(inviteLink.value)}&title=${encodeURIComponent(text)}`
  
  window.open(url, '_blank')
  updateShareStats('weibo')
}

/**
 * 系统分享
 */
const shareToSystem = () => {
  if (navigator.share) {
    navigator.share({
      title: '邀请你加入我们',
      text: `通过我的邀请链接注册，你我都能获得¥${rewardAmount.value}奖励`,
      url: inviteLink.value
    }).then(() => {
      updateShareStats('system')
    }).catch(error => {
      console.error('分享失败:', error)
      handleCopyLink()
    })
  } else {
    handleCopyLink()
  }
}

/**
 * 下载二维码
 */
const downloadQRCode = () => {
  if (!qrCodeCanvasRef.value) return
  
  try {
    const canvas = qrCodeCanvasRef.value
    const link = document.createElement('a')
    link.download = '邀请二维码.png'
    link.href = canvas.toDataURL()
    link.click()
    
    showSuccess('二维码已保存')
    updateShareStats('download')
  } catch (error) {
    showError('保存失败')
  }
}

/**
 * 更新分享统计
 * @param {string} platform 分享平台
 */
const updateShareStats = (platform) => {
  shareStats.todayShares += 1
  shareStats.totalShares += 1
  
  // 调用 store 方法记录分享
  inviteStore.shareInvite(platform, {
    inviteLink: inviteLink.value
  })
}

/**
 * 切换规则显示
 */
const toggleRules = () => {
  showRules.value = !showRules.value
}

/**
 * 返回上一页
 */
const goBack = () => {
  router.back()
}

/**
 * 跳转到邀请记录
 */
const goToInviteList = () => {
  router.push('/invite-list')
}

/**
 * 跳转到奖励页面
 */
const goToRewards = () => {
  router.push('/rewards')
}

/**
 * 加载分享统计
 */
const loadShareStats = async () => {
  try {
    const result = await inviteStore.fetchShareStats()
    if (result.success) {
      shareStats.todayShares = inviteStore.shareStats.todayShares
      shareStats.totalShares = inviteStore.shareStats.totalShares
    }
  } catch (error) {
    console.error('加载分享统计失败:', error)
  }
}

// 生命周期
onMounted(async () => {
  console.log('🎁 邀请页面初始化')
  
  // 生成邀请链接
  await generateInviteLink()
  
  // 加载分享统计
  await loadShareStats()
  
  // 生成二维码
  nextTick(() => {
    if (inviteLink.value) {
      generateQRCode()
    }
  })
})
</script>

<style lang="scss" scoped>
@use "@/assets/styles/variables.scss" as *;
@use "@/assets/styles/mixins.scss" as *;
.invite-page {
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
  
  .header-placeholder {
    width: 40px;
  }
}

// 奖励横幅
.reward-banner {
  margin: $spacing-base;
  padding: $spacing-lg;
  background: linear-gradient(135deg, $primary-color, $primary-light);
  border-radius: $border-radius-lg;
  color: white;
  
  .banner-content {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  
  .reward-info {
    flex: 1;
    
    .reward-title {
      font-size: $font-size-base;
      margin-bottom: $spacing-xs;
      opacity: 0.9;
    }
    
    .reward-amount {
      font-size: $font-size-title;
      font-weight: $font-weight-bold;
      margin-bottom: $spacing-xs;
    }
    
    .reward-desc {
      font-size: $font-size-sm;
      opacity: 0.8;
    }
  }
  
  .reward-icon {
    font-size: 48px;
    opacity: 0.8;
  }
}

// 邀请链接卡片
.invite-link-card {
  margin: $spacing-base;
  padding: $spacing-lg;
  background-color: $background-color;
  border-radius: $border-radius-lg;
  box-shadow: $box-shadow-base;
  
  .card-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: $spacing-base;
    
    .card-title {
      font-size: $font-size-lg;
      font-weight: $font-weight-medium;
      color: $text-color-primary;
    }
    
    .invite-stats {
      .stats-item {
        font-size: $font-size-sm;
        color: $text-color-secondary;
      }
    }
  }
  
  .link-container {
    margin-bottom: $spacing-lg;
  }
  
  .link-display {
    display: flex;
    align-items: center;
    gap: $spacing-sm;
    
    .link-input {
      flex: 1;
      padding: $spacing-sm;
      border: 1px solid $border-color;
      border-radius: $border-radius-base;
      background-color: $background-color-light;
      font-size: $font-size-sm;
      color: $text-color-primary;
      outline: none;
      cursor: pointer;
      
      &:focus {
        border-color: $primary-color;
      }
    }
    
    .copy-btn {
      @include button-base($primary-color, white, $border-radius-base);
      padding: $spacing-sm $spacing-base;
      white-space: nowrap;
      
      &:hover {
        background-color: $primary-dark;
      }
    }
  }
  
  .qrcode-section {
    text-align: center;
    
    .qrcode-container {
      margin-bottom: $spacing-sm;
      
      .qrcode {
        display: inline-block;
        padding: $spacing-base;
        background-color: white;
        border-radius: $border-radius-lg;
        box-shadow: $box-shadow-base;
        
        .qrcode-canvas {
          display: block;
          border-radius: $border-radius-base;
        }
      }
      
      .qrcode-loading {
        width: 232px;
        height: 232px;
        margin: 0 auto;
        @include center;
        background-color: $background-color-light;
        border-radius: $border-radius-lg;
      }
    }
    
    .qrcode-tip {
      font-size: $font-size-sm;
      color: $text-color-disabled;
    }
  }
}

// 分享方式
.share-methods {
  margin: $spacing-base;
  
  .section-title {
    font-size: $font-size-lg;
    font-weight: $font-weight-medium;
    color: $text-color-primary;
    margin-bottom: $spacing-base;
  }
  
  .methods-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: $spacing-base;
  }
  
  .method-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: $spacing-base;
    background-color: $background-color;
    border-radius: $border-radius-lg;
    cursor: pointer;
    @include transition(all);
    box-shadow: $box-shadow-base;
    
    &:hover {
      transform: translateY(-2px);
      box-shadow: $box-shadow-lg;
    }
    
    .method-icon {
      width: 48px;
      height: 48px;
      @include center;
      font-size: 24px;
      border-radius: 50%;
      margin-bottom: $spacing-sm;
      
      &.wechat {
        background-color: rgba(#1aad19, 0.1);
        color: #1aad19;
      }
      
      &.moments {
        background-color: rgba(#ff9500, 0.1);
        color: #ff9500;
      }
      
      &.qq {
        background-color: rgba(#1296db, 0.1);
        color: #1296db;
      }
      
      &.weibo {
        background-color: rgba(#e6162d, 0.1);
        color: #e6162d;
      }
      
      &.system {
        background-color: rgba($primary-color, 0.1);
        color: $primary-color;
      }
      
      &.download {
        background-color: rgba($success-color, 0.1);
        color: $success-color;
      }
    }
    
    .method-name {
      font-size: $font-size-sm;
      color: $text-color-secondary;
      text-align: center;
    }
  }
}

// 邀请规则
.invite-rules {
  margin: $spacing-base;
  background-color: $background-color;
  border-radius: $border-radius-lg;
  overflow: hidden;
  box-shadow: $box-shadow-base;
  
  .rules-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: $spacing-base $spacing-lg;
    border-bottom: 1px solid $border-color-light;
  }
  
  .rules-toggle {
    background: none;
    border: none;
    color: $primary-color;
    font-size: $font-size-sm;
    cursor: pointer;
    @include transition(color);
    
    &:hover {
      color: $primary-dark;
    }
  }
  
  .rules-content {
    padding: $spacing-base $spacing-lg;
  }
  
  .rule-item {
    display: flex;
    align-items: flex-start;
    margin-bottom: $spacing-base;
    
    &:last-child {
      margin-bottom: 0;
    }
    
    .rule-icon {
      width: 32px;
      height: 32px;
      @include center;
      background-color: rgba($primary-color, 0.1);
      border-radius: 50%;
      margin-right: $spacing-base;
      font-size: $font-size-sm;
      flex-shrink: 0;
    }
    
    .rule-text {
      flex: 1;
      
      .rule-title {
        font-size: $font-size-base;
        font-weight: $font-weight-medium;
        color: $text-color-primary;
        margin-bottom: $spacing-xs;
      }
      
      .rule-desc {
        font-size: $font-size-sm;
        color: $text-color-secondary;
        line-height: $line-height-base;
      }
    }
  }
}

// 快捷入口
.quick-entry {
  margin: $spacing-base;
  background-color: $background-color;
  border-radius: $border-radius-lg;
  overflow: hidden;
  box-shadow: $box-shadow-base;
  
  .entry-item {
    display: flex;
    align-items: center;
    padding: $spacing-base $spacing-lg;
    cursor: pointer;
    @include transition(background-color);
    border-bottom: 1px solid $border-color-light;
    
    &:last-child {
      border-bottom: none;
    }
    
    &:hover {
      background-color: $background-color-light;
    }
    
    .entry-icon {
      width: 40px;
      height: 40px;
      @include center;
      background-color: rgba($primary-color, 0.1);
      border-radius: $border-radius-lg;
      font-size: $font-size-lg;
      margin-right: $spacing-base;
    }
    
    .entry-content {
      flex: 1;
      
      .entry-title {
        font-size: $font-size-base;
        font-weight: $font-weight-medium;
        color: $text-color-primary;
        margin-bottom: $spacing-xs;
      }
      
      .entry-desc {
        font-size: $font-size-sm;
        color: $text-color-secondary;
      }
    }
    
    .entry-arrow {
      color: $text-color-disabled;
      font-size: $font-size-lg;
    }
  }
}

// 规则展开动画
.rules-collapse-enter-active,
.rules-collapse-leave-active {
  transition: all $animation-duration-base ease;
  overflow: hidden;
}

.rules-collapse-enter-from,
.rules-collapse-leave-to {
  max-height: 0;
  opacity: 0;
}

.rules-collapse-enter-to,
.rules-collapse-leave-from {
  max-height: 300px;
  opacity: 1;
}

// 移动端适配
@include respond-to(xs) {
  .reward-banner {
    margin: $spacing-sm;
    padding: $spacing-base;
    
    .banner-content {
      gap: $spacing-base;
    }
    
    .reward-icon {
      font-size: 36px;
    }
  }
  
  .invite-link-card {
    margin: $spacing-sm;
    padding: $spacing-base;
  }
  
  .share-methods {
    margin: $spacing-sm;
    
    .methods-grid {
      grid-template-columns: repeat(2, 1fr);
      gap: $spacing-sm;
    }
    
    .method-item {
      padding: $spacing-sm;
      
      .method-icon {
        width: 40px;
        height: 40px;
        font-size: 20px;
      }
    }
  }
  
  .invite-rules,
  .quick-entry {
    margin: $spacing-sm;
  }
}
</style> 