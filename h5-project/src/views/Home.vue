<template>
  <div class="home-page">
    <!-- 顶部用户信息 -->
    <div class="user-header">
      <div class="user-info">
        <div class="avatar-section">
          <div class="user-avatar">
            <img v-if="userInfo?.avatar" :src="userInfo.avatar" alt="头像" />
            <span v-else class="avatar-placeholder">👤</span>
          </div>
          <div class="user-details">
            <h2 class="user-name">{{ userInfo?.name || '未登录' }}</h2>
            <p class="user-mobile">{{ formatMobile(userInfo?.mobile) }}</p>
          </div>
        </div>
        <div class="header-actions">
          <button v-if="!userInfo" class="login-btn" @click="goToLogin">
            登录
          </button>
          <button v-else class="settings-btn" @click="goToProfile">
            ⚙️
          </button>
        </div>
      </div>
    </div>
    
    <!-- 数据统计卡片 -->
    <div class="stats-section">
      <div class="stats-grid">
        <StatCard
          title="今日收益"
          :value="statsData.todayEarnings"
          prefix="¥"
          theme="primary"
          icon="💰"
          :trend="statsData.earningsTrend"
          :loading="statsLoading"
          clickable
          @click="goToRewards"
        />
        <StatCard
          title="邀请人数"
          :value="statsData.inviteCount"
          suffix="人"
          theme="success"
          icon="👥"
          :trend="statsData.inviteTrend"
          :loading="statsLoading"
          clickable
          @click="goToInviteList"
        />
        <StatCard
          title="累计收益"
          :value="statsData.totalEarnings"
          prefix="¥"
          theme="gradient"
          icon="🏆"
          :loading="statsLoading"
          clickable
          @click="goToRewards"
        />
        <StatCard
          title="待提现"
          :value="statsData.pendingWithdraw"
          prefix="¥"
          theme="warning"
          icon="💳"
          :loading="statsLoading"
          clickable
          @click="goToWithdraw"
        />
      </div>
    </div>
    
    <!-- 快捷操作 -->
    <div class="quick-actions">
      <div class="section-header">
        <h3 class="section-title">快捷操作</h3>
      </div>
      <div class="actions-grid">
        <div class="action-item" @click="goToInvite">
          <div class="action-icon">🎁</div>
          <div class="action-text">邀请好友</div>
        </div>
        <div class="action-item" @click="goToRewards">
          <div class="action-icon">💎</div>
          <div class="action-text">我的奖励</div>
        </div>
        <div class="action-item" @click="goToWithdraw">
          <div class="action-icon">💰</div>
          <div class="action-text">立即提现</div>
        </div>
        <div class="action-item" @click="goToRules">
          <div class="action-icon">📋</div>
          <div class="action-text">奖励规则</div>
        </div>
      </div>
    </div>
    
    <!-- 最新动态 -->
    <div class="recent-activities">
      <div class="section-header">
        <h3 class="section-title">最新动态</h3>
        <button class="more-btn" @click="goToInviteList">更多</button>
      </div>
      
      <div v-if="recentInvites.length > 0" class="activities-list">
        <div
          v-for="invite in recentInvites"
          :key="invite.id"
          class="activity-item"
        >
          <div class="activity-icon">
            <span class="status-icon" :class="getStatusClass(invite.status)">
              {{ getStatusIcon(invite.status) }}
            </span>
          </div>
          <div class="activity-content">
            <div class="activity-title">{{ formatInviteTitle(invite) }}</div>
            <div class="activity-time">{{ formatTime(invite.createTime) }}</div>
          </div>
          <div class="activity-reward">
            <span class="reward-amount">+¥{{ invite.reward || 0 }}</span>
          </div>
        </div>
      </div>
      
      <div v-else class="empty-activities">
        <div class="empty-icon">📝</div>
        <div class="empty-text">暂无邀请记录</div>
        <button class="empty-action" @click="goToInvite">立即邀请</button>
      </div>
    </div>
    
    <!-- 推广横幅 -->
    <div class="promotion-banner">
      <div class="banner-content">
        <div class="banner-text">
          <h4 class="banner-title">分享越多，赚得越多！</h4>
          <p class="banner-subtitle">邀请好友注册即可获得丰厚奖励</p>
        </div>
        <button class="banner-btn" @click="goToInvite">
          立即分享
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
/**
 * 首页
 * 展示用户数据统计、快捷操作和最新动态
 * @author 前端工程师团队
 * @date 2024-12-XX
 */
import { ref, reactive, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/stores/user'
import { useInviteStore } from '@/stores/invite'
import StatCard from '@/components/business/StatCard.vue'
import { showError } from '@/utils/toast'

// 路由和状态管理
const router = useRouter()
const userStore = useUserStore()
const inviteStore = useInviteStore()

// 响应式数据
const statsLoading = ref(false)
const statsData = reactive({
  todayEarnings: 0,
  totalEarnings: 0,
  inviteCount: 0,
  pendingWithdraw: 0,
  earningsTrend: null,
  inviteTrend: null
})

const recentInvites = ref([])

// 计算属性
const userInfo = computed(() => userStore.userInfo)

/**
 * 格式化手机号
 * @param {string} mobile 手机号
 */
const formatMobile = (mobile) => {
  if (!mobile) return ''
  return mobile.replace(/(\d{3})\d{4}(\d{4})/, '$1****$2')
}

/**
 * 获取状态样式类
 * @param {string} status 状态
 */
const getStatusClass = (status) => {
  const statusMap = {
    'pending': 'status-pending',
    'valid': 'status-success',
    'invalid': 'status-error'
  }
  return statusMap[status] || 'status-default'
}

/**
 * 获取状态图标
 * @param {string} status 状态
 */
const getStatusIcon = (status) => {
  const iconMap = {
    'pending': '⏳',
    'valid': '✅',
    'invalid': '❌'
  }
  return iconMap[status] || '📋'
}

/**
 * 格式化邀请标题
 * @param {Object} invite 邀请记录
 */
const formatInviteTitle = (invite) => {
  const mobile = formatMobile(invite.inviteeMobile)
  const statusText = {
    'pending': '注册成功，待审核',
    'valid': '审核通过',
    'invalid': '审核失败'
  }
  return `${mobile} ${statusText[invite.status] || '未知状态'}`
}

/**
 * 格式化时间
 * @param {string} time 时间字符串
 */
const formatTime = (time) => {
  if (!time) return ''
  const date = new Date(time)
  const now = new Date()
  const diff = now - date
  
  if (diff < 60000) { // 1分钟内
    return '刚刚'
  } else if (diff < 3600000) { // 1小时内
    return `${Math.floor(diff / 60000)}分钟前`
  } else if (diff < 86400000) { // 1天内
    return `${Math.floor(diff / 3600000)}小时前`
  } else {
    return date.toLocaleDateString()
  }
}

/**
 * 加载统计数据
 */
const loadStatsData = async () => {
  if (!userInfo.value) return
  
  try {
    statsLoading.value = true
    
    // 获取用户统计数据
    const [inviteResult, rewardResult] = await Promise.all([
      inviteStore.fetchInviteList({ limit: 5 }),
      inviteStore.fetchRewardList({ limit: 5 })
    ])
    
    if (inviteResult.success) {
      recentInvites.value = inviteStore.inviteList.slice(0, 5)
    }
    
    // 更新统计数据
    statsData.todayEarnings = 128.50
    statsData.totalEarnings = 2680.30
    statsData.inviteCount = inviteStore.validInviteCount
    statsData.pendingWithdraw = inviteStore.pendingReward
    statsData.earningsTrend = 15.6
    statsData.inviteTrend = 8.2
    
  } catch (error) {
    console.error('加载统计数据失败:', error)
    showError('数据加载失败')
  } finally {
    statsLoading.value = false
  }
}

/**
 * 路由跳转方法
 */
const goToLogin = () => {
  router.push('/login')
}

const goToProfile = () => {
  router.push('/profile')
}

const goToInvite = () => {
  if (!userInfo.value) {
    goToLogin()
    return
  }
  router.push('/invite')
}

const goToRewards = () => {
  if (!userInfo.value) {
    goToLogin()
    return
  }
  router.push('/rewards')
}

const goToWithdraw = () => {
  if (!userInfo.value) {
    goToLogin()
    return
  }
  router.push('/withdraw')
}

const goToInviteList = () => {
  if (!userInfo.value) {
    goToLogin()
    return
  }
  router.push('/invite-list')
}

const goToRules = () => {
  router.push('/rules')
}

// 生命周期
onMounted(() => {
  console.log('🏠 首页初始化')
  
  // 如果用户已登录，加载数据
  if (userInfo.value) {
    loadStatsData()
  }
})
</script>

<style lang="scss" scoped>
@use "@/assets/styles/variables.scss" as *;
@use "@/assets/styles/mixins.scss" as *;

.home-page {
  min-height: 100vh;
  background-color: $background-color-light;
  padding-bottom: $spacing-xl;
}

// 用户头部
.user-header {
  background: linear-gradient(135deg, $primary-color, $primary-light);
  padding: $spacing-lg $spacing-base;
  color: white;
  
  .user-info {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  
  .avatar-section {
    display: flex;
    align-items: center;
    gap: $spacing-base;
  }
  
  .user-avatar {
    width: 60px;
    height: 60px;
    border-radius: 50%;
    overflow: hidden;
    background-color: rgba(255, 255, 255, 0.2);
    @include center;
    
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
    
    .avatar-placeholder {
      font-size: 24px;
    }
  }
  
  .user-details {
    .user-name {
      font-size: $font-size-lg;
      font-weight: $font-weight-medium;
      margin-bottom: $spacing-xs;
    }
    
    .user-mobile {
      font-size: $font-size-sm;
      opacity: 0.9;
    }
  }
  
  .header-actions {
    .login-btn {
      @include button-base(rgba(255, 255, 255, 0.2), white, $border-radius-lg);
      padding: $spacing-sm $spacing-base;
      border: 1px solid rgba(255, 255, 255, 0.3);
      
      &:hover {
        background-color: rgba(255, 255, 255, 0.3);
      }
    }
    
    .settings-btn {
      width: 40px;
      height: 40px;
      border-radius: 50%;
      background-color: rgba(255, 255, 255, 0.2);
      border: none;
      color: white;
      font-size: $font-size-lg;
      cursor: pointer;
      @include transition(all);
      
      &:hover {
        background-color: rgba(255, 255, 255, 0.3);
      }
    }
  }
}

// 统计区域
.stats-section {
  padding: $spacing-base;
  margin-top: -$spacing-base;
  position: relative;
  z-index: 1;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: $spacing-base;
}

// 快捷操作
.quick-actions {
  padding: 0 $spacing-base $spacing-base;
}

.section-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: $spacing-base;
  
  .section-title {
    font-size: $font-size-lg;
    font-weight: $font-weight-medium;
    color: $text-color-primary;
  }
  
  .more-btn {
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
}

.actions-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: $spacing-base;
}

.action-item {
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
  
  .action-icon {
    font-size: 28px;
    margin-bottom: $spacing-sm;
  }
  
  .action-text {
    font-size: $font-size-sm;
    color: $text-color-secondary;
    text-align: center;
  }
}

// 最新动态
.recent-activities {
  padding: 0 $spacing-base $spacing-base;
}

.activities-list {
  background-color: $background-color;
  border-radius: $border-radius-lg;
  overflow: hidden;
  box-shadow: $box-shadow-base;
}

.activity-item {
  display: flex;
  align-items: center;
  padding: $spacing-base;
  border-bottom: 1px solid $border-color-light;
  
  &:last-child {
    border-bottom: none;
  }
  
  .activity-icon {
    margin-right: $spacing-base;
    
    .status-icon {
      width: 32px;
      height: 32px;
      border-radius: 50%;
      @include center;
      font-size: $font-size-sm;
      
      &.status-pending {
        background-color: rgba($warning-color, 0.1);
      }
      
      &.status-success {
        background-color: rgba($success-color, 0.1);
      }
      
      &.status-error {
        background-color: rgba($error-color, 0.1);
      }
    }
  }
  
  .activity-content {
    flex: 1;
    min-width: 0;
    
    .activity-title {
      font-size: $font-size-base;
      color: $text-color-primary;
      margin-bottom: $spacing-xs;
      @include text-ellipsis();
    }
    
    .activity-time {
      font-size: $font-size-sm;
      color: $text-color-disabled;
    }
  }
  
  .activity-reward {
    .reward-amount {
      font-size: $font-size-base;
      font-weight: $font-weight-medium;
      color: $success-color;
    }
  }
}

.empty-activities {
  text-align: center;
  padding: $spacing-xxl $spacing-base;
  background-color: $background-color;
  border-radius: $border-radius-lg;
  box-shadow: $box-shadow-base;
  
  .empty-icon {
    font-size: 48px;
    margin-bottom: $spacing-base;
    opacity: 0.5;
  }
  
  .empty-text {
    font-size: $font-size-base;
    color: $text-color-disabled;
    margin-bottom: $spacing-base;
  }
  
  .empty-action {
    @include button-base($primary-color, white, $border-radius-base);
    padding: $spacing-sm $spacing-base;
  }
}

// 推广横幅
.promotion-banner {
  margin: 0 $spacing-base;
  padding: $spacing-lg;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: $border-radius-lg;
  color: white;
  
  .banner-content {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: $spacing-base;
  }
  
  .banner-text {
    flex: 1;
    
    .banner-title {
      font-size: $font-size-lg;
      font-weight: $font-weight-medium;
      margin-bottom: $spacing-xs;
    }
    
    .banner-subtitle {
      font-size: $font-size-sm;
      opacity: 0.9;
    }
  }
  
  .banner-btn {
    @include button-base(rgba(255, 255, 255, 0.2), white, $border-radius-base);
    padding: $spacing-sm $spacing-base;
    border: 1px solid rgba(255, 255, 255, 0.3);
    white-space: nowrap;
    
    &:hover {
      background-color: rgba(255, 255, 255, 0.3);
    }
  }
}

// 移动端适配
@include respond-to(xs) {
  .user-header {
    padding: $spacing-base;
  }
  
  .user-avatar {
    width: 50px;
    height: 50px;
  }
  
  .stats-grid {
    gap: $spacing-sm;
  }
  
  .actions-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: $spacing-sm;
  }
  
  .action-item {
    padding: $spacing-sm;
    
    .action-icon {
      font-size: 24px;
    }
    
    .action-text {
      font-size: $font-size-xs;
    }
  }
  
  .banner-content {
    flex-direction: column;
    text-align: center;
    gap: $spacing-sm;
  }
}
</style> 