<template>
  <div class="profile-page">
    <!-- 页面头部 -->
    <div class="page-header">
      <button class="back-btn" @click="goBack">←</button>
      <h1 class="page-title">个人中心</h1>
      <button class="edit-btn" @click="toggleEdit">
        {{ isEditing ? '保存' : '编辑' }}
      </button>
    </div>
    
    <!-- 用户信息卡片 -->
    <div class="user-info-card">
      <div class="user-avatar-section">
        <div class="avatar-container">
          <img v-if="userInfo?.avatar" :src="userInfo.avatar" alt="头像" class="user-avatar" />
          <div v-else class="avatar-placeholder">👤</div>
          <button v-if="isEditing" class="avatar-edit-btn" @click="handleAvatarChange">
            📷
          </button>
        </div>
        <div class="user-basic-info">
          <div class="user-name-section">
            <input
              v-if="isEditing"
              v-model="editForm.name"
              class="edit-input name-input"
              placeholder="请输入昵称"
            />
            <h2 v-else class="user-name">{{ userInfo?.name || '未设置昵称' }}</h2>
          </div>
          <div class="user-mobile">{{ formatMobile(userInfo?.mobile) }}</div>
          <div class="user-level">
            <span class="level-badge" :class="levelClass">{{ userLevel }}</span>
            <span class="level-text">等级</span>
          </div>
        </div>
      </div>
    </div>
    
    <!-- 统计概览 -->
    <div class="stats-overview">
      <div class="stats-grid">
        <div class="stat-item">
          <div class="stat-value">{{ userStats.totalEarnings }}</div>
          <div class="stat-label">累计收益</div>
        </div>
        <div class="stat-item">
          <div class="stat-value">{{ userStats.inviteCount }}</div>
          <div class="stat-label">邀请人数</div>
        </div>
        <div class="stat-item">
          <div class="stat-value">{{ userStats.todayEarnings }}</div>
          <div class="stat-label">今日收益</div>
        </div>
        <div class="stat-item">
          <div class="stat-value">{{ userStats.pendingWithdraw }}</div>
          <div class="stat-label">待提现</div>
        </div>
      </div>
    </div>
    
    <!-- 个人信息 -->
    <div class="profile-section">
      <h3 class="section-title">个人信息</h3>
      <div class="info-list">
        <div class="info-item">
          <div class="info-label">邀请码</div>
          <div class="info-value">
            <span class="invite-code">{{ userInfo?.inviteCode }}</span>
            <button class="copy-btn" @click="copyInviteCode">复制</button>
          </div>
        </div>
        <div class="info-item">
          <div class="info-label">注册时间</div>
          <div class="info-value">{{ formatDate(userInfo?.createTime) }}</div>
        </div>
        <div class="info-item">
          <div class="info-label">最后登录</div>
          <div class="info-value">{{ formatDate(userInfo?.lastLoginTime) }}</div>
        </div>
      </div>
    </div>
    
    <!-- 快捷功能 -->
    <div class="quick-functions">
      <h3 class="section-title">快捷功能</h3>
      <div class="function-list">
        <div class="function-item" @click="goToRewards">
          <div class="function-icon">💎</div>
          <div class="function-info">
            <div class="function-name">我的奖励</div>
            <div class="function-desc">查看收益明细</div>
          </div>
          <div class="function-arrow">→</div>
        </div>
        <div class="function-item" @click="goToInviteList">
          <div class="function-icon">👥</div>
          <div class="function-info">
            <div class="function-name">邀请记录</div>
            <div class="function-desc">查看邀请明细</div>
          </div>
          <div class="function-arrow">→</div>
        </div>
        <div class="function-item" @click="goToWithdraw">
          <div class="function-icon">💰</div>
          <div class="function-info">
            <div class="function-name">我要提现</div>
            <div class="function-desc">申请提现到账</div>
          </div>
          <div class="function-arrow">→</div>
        </div>
        <div class="function-item" @click="goToSettings">
          <div class="function-icon">⚙️</div>
          <div class="function-info">
            <div class="function-name">账户设置</div>
            <div class="function-desc">安全与隐私设置</div>
          </div>
          <div class="function-arrow">→</div>
        </div>
      </div>
    </div>
    
    <!-- 其他功能 -->
    <div class="other-functions">
      <h3 class="section-title">其他</h3>
      <div class="function-list">
        <div class="function-item" @click="goToRules">
          <div class="function-icon">📋</div>
          <div class="function-info">
            <div class="function-name">邀请规则</div>
            <div class="function-desc">了解奖励规则</div>
          </div>
          <div class="function-arrow">→</div>
        </div>
        <div class="function-item" @click="goToFeedback">
          <div class="function-icon">💬</div>
          <div class="function-info">
            <div class="function-name">意见反馈</div>
            <div class="function-desc">提出建议和问题</div>
          </div>
          <div class="function-arrow">→</div>
        </div>
        <div class="function-item" @click="goToAbout">
          <div class="function-icon">ℹ️</div>
          <div class="function-info">
            <div class="function-name">关于我们</div>
            <div class="function-desc">应用版本信息</div>
          </div>
          <div class="function-arrow">→</div>
        </div>
      </div>
    </div>
    
    <!-- 退出登录 -->
    <div class="logout-section">
      <button class="logout-btn" @click="handleLogout">
        退出登录
      </button>
    </div>
  </div>
</template>

<script setup>
/**
 * 个人中心页面
 * 展示用户信息、统计数据和快捷功能入口
 * @author 前端工程师团队
 * @date 2024-12-XX
 */
import { ref, reactive, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/stores/user'
import { useInviteStore } from '@/stores/invite'
import { showSuccess, showError, showConfirm, showCopySuccess } from '@/utils/toast'
import api from '@/utils/request'

// 路由和状态管理
const router = useRouter()
const userStore = useUserStore()
const inviteStore = useInviteStore()

// 响应式数据
const isEditing = ref(false)
const editForm = reactive({
  name: '',
  avatar: ''
})

const userStats = reactive({
  totalEarnings: '¥2,680.30',
  inviteCount: 15,
  todayEarnings: '¥128.50',
  pendingWithdraw: '¥560.80'
})

// 计算属性
const userInfo = computed(() => userStore.userInfo)

const userLevel = computed(() => {
  const count = userStats.inviteCount
  if (count >= 100) return 'VIP'
  if (count >= 50) return '金牌'
  if (count >= 20) return '银牌'
  if (count >= 10) return '铜牌'
  return '新手'
})

const levelClass = computed(() => {
  const level = userLevel.value
  return {
    'level-vip': level === 'VIP',
    'level-gold': level === '金牌',
    'level-silver': level === '银牌',
    'level-bronze': level === '铜牌',
    'level-newbie': level === '新手'
  }
})

/**
 * 格式化手机号
 * @param {string} mobile 手机号
 */
const formatMobile = (mobile) => {
  if (!mobile) return ''
  return mobile.replace(/(\d{3})\d{4}(\d{4})/, '$1****$2')
}

/**
 * 格式化日期
 * @param {string} dateStr 日期字符串
 */
const formatDate = (dateStr) => {
  if (!dateStr) return '暂无'
  const date = new Date(dateStr)
  return date.toLocaleDateString()
}

/**
 * 切换编辑模式
 */
const toggleEdit = async () => {
  if (isEditing.value) {
    // 保存编辑
    try {
      await api.put('/api/user/profile', {
        name: editForm.name,
        avatar: editForm.avatar
      })
      
      // 更新用户信息
      userStore.setUserInfo({
        ...userInfo.value,
        name: editForm.name,
        avatar: editForm.avatar
      })
      
      showSuccess('保存成功')
      isEditing.value = false
    } catch (error) {
      showError('保存失败')
    }
  } else {
    // 进入编辑模式
    editForm.name = userInfo.value?.name || ''
    editForm.avatar = userInfo.value?.avatar || ''
    isEditing.value = true
  }
}

/**
 * 处理头像更改
 */
const handleAvatarChange = () => {
  // 这里可以打开图片选择器
  showSuccess('头像上传功能开发中')
}

/**
 * 复制邀请码
 */
const copyInviteCode = async () => {
  try {
    await navigator.clipboard.writeText(userInfo.value?.inviteCode || '')
    showCopySuccess()
  } catch (error) {
    showError('复制失败')
  }
}

/**
 * 处理退出登录
 */
const handleLogout = async () => {
  const confirmed = await showConfirm('确定要退出登录吗？')
  if (confirmed) {
    userStore.logout()
    showSuccess('已退出登录')
    router.push('/login')
  }
}

/**
 * 加载用户统计数据
 */
const loadUserStats = async () => {
  try {
    const [inviteResult, rewardResult] = await Promise.all([
      inviteStore.fetchInviteList(),
      inviteStore.fetchRewardList()
    ])
    
    if (inviteResult.success) {
      userStats.inviteCount = inviteStore.validInviteCount
    }
    
    // 模拟统计数据
    userStats.totalEarnings = '¥2,680.30'
    userStats.todayEarnings = '¥128.50'
    userStats.pendingWithdraw = '¥560.80'
    
  } catch (error) {
    console.error('加载统计数据失败:', error)
  }
}

/**
 * 路由跳转方法
 */
const goBack = () => {
  router.back()
}

const goToRewards = () => {
  router.push('/rewards')
}

const goToInviteList = () => {
  router.push('/invite-list')
}

const goToWithdraw = () => {
  router.push('/withdraw')
}

const goToSettings = () => {
  router.push('/settings')
}

const goToRules = () => {
  router.push('/rules')
}

const goToFeedback = () => {
  router.push('/feedback')
}

const goToAbout = () => {
  router.push('/about')
}

// 生命周期
onMounted(() => {
  console.log('👤 个人中心页面初始化')
  loadUserStats()
})
</script>

<style lang="scss" scoped>
@use "@/assets/styles/variables.scss" as *;
@use "@/assets/styles/mixins.scss" as *;

.profile-page {
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
  
  .edit-btn {
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

// 用户信息卡片
.user-info-card {
  margin: $spacing-base;
  padding: $spacing-lg;
  background: linear-gradient(135deg, $primary-color, $primary-light);
  border-radius: $border-radius-lg;
  color: white;
}

.user-avatar-section {
  display: flex;
  align-items: center;
  gap: $spacing-base;
}

.avatar-container {
  position: relative;
  
  .user-avatar,
  .avatar-placeholder {
    width: 80px;
    height: 80px;
    border-radius: 50%;
    border: 3px solid rgba(255, 255, 255, 0.3);
  }
  
  .user-avatar {
    object-fit: cover;
  }
  
  .avatar-placeholder {
    @include center;
    background-color: rgba(255, 255, 255, 0.2);
    font-size: 32px;
  }
  
  .avatar-edit-btn {
    position: absolute;
    bottom: 0;
    right: 0;
    width: 24px;
    height: 24px;
    border: none;
    border-radius: 50%;
    background-color: $primary-dark;
    color: white;
    font-size: 12px;
    cursor: pointer;
    @include transition(all);
    
    &:hover {
      transform: scale(1.1);
    }
  }
}

.user-basic-info {
  flex: 1;
  
  .user-name-section {
    margin-bottom: $spacing-xs;
    
    .user-name {
      font-size: $font-size-xl;
      font-weight: $font-weight-bold;
      margin: 0;
    }
    
    .edit-input {
      background: rgba(255, 255, 255, 0.2);
      border: 1px solid rgba(255, 255, 255, 0.3);
      border-radius: $border-radius-base;
      padding: $spacing-xs $spacing-sm;
      color: white;
      font-size: $font-size-lg;
      font-weight: $font-weight-medium;
      
      &::placeholder {
        color: rgba(255, 255, 255, 0.7);
      }
    }
  }
  
  .user-mobile {
    font-size: $font-size-base;
    opacity: 0.9;
    margin-bottom: $spacing-sm;
  }
  
  .user-level {
    display: flex;
    align-items: center;
    gap: $spacing-xs;
    
    .level-badge {
      padding: 2px $spacing-xs;
      border-radius: $border-radius-sm;
      font-size: $font-size-xs;
      font-weight: $font-weight-bold;
      
      &.level-vip {
        background-color: #ff6b35;
      }
      
      &.level-gold {
        background-color: #ffd700;
        color: #333;
      }
      
      &.level-silver {
        background-color: #c0c0c0;
        color: #333;
      }
      
      &.level-bronze {
        background-color: #cd7f32;
      }
      
      &.level-newbie {
        background-color: rgba(255, 255, 255, 0.3);
      }
    }
    
    .level-text {
      font-size: $font-size-sm;
      opacity: 0.8;
    }
  }
}

// 统计概览
.stats-overview {
  margin: 0 $spacing-base $spacing-base;
  padding: $spacing-base;
  background-color: $background-color;
  border-radius: $border-radius-lg;
  box-shadow: $box-shadow-base;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: $spacing-base;
}

.stat-item {
  text-align: center;
  
  .stat-value {
    font-size: $font-size-lg;
    font-weight: $font-weight-bold;
    color: $primary-color;
    margin-bottom: $spacing-xs;
  }
  
  .stat-label {
    font-size: $font-size-sm;
    color: $text-color-secondary;
  }
}

// 通用区域样式
.profile-section,
.quick-functions,
.other-functions {
  margin: 0 $spacing-base $spacing-base;
  padding: $spacing-base;
  background-color: $background-color;
  border-radius: $border-radius-lg;
  box-shadow: $box-shadow-base;
}

.section-title {
  font-size: $font-size-lg;
  font-weight: $font-weight-medium;
  color: $text-color-primary;
  margin-bottom: $spacing-base;
}

// 信息列表
.info-list {
  .info-item {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: $spacing-sm 0;
    border-bottom: 1px solid $border-color-light;
    
    &:last-child {
      border-bottom: none;
    }
    
    .info-label {
      font-size: $font-size-base;
      color: $text-color-secondary;
    }
    
    .info-value {
      display: flex;
      align-items: center;
      gap: $spacing-sm;
      font-size: $font-size-base;
      color: $text-color-primary;
      
      .invite-code {
        font-family: monospace;
        background-color: $background-color-light;
        padding: 2px $spacing-xs;
        border-radius: $border-radius-sm;
      }
      
      .copy-btn {
        padding: 2px $spacing-xs;
        border: 1px solid $primary-color;
        border-radius: $border-radius-sm;
        background: none;
        color: $primary-color;
        font-size: $font-size-xs;
        cursor: pointer;
        @include transition(all);
        
        &:hover {
          background-color: $primary-color;
          color: white;
        }
      }
    }
  }
}

// 功能列表
.function-list {
  .function-item {
    display: flex;
    align-items: center;
    padding: $spacing-base 0;
    cursor: pointer;
    @include transition(background-color);
    border-bottom: 1px solid $border-color-light;
    
    &:last-child {
      border-bottom: none;
    }
    
    &:hover {
      background-color: $background-color-light;
    }
    
    .function-icon {
      width: 40px;
      height: 40px;
      @include center;
      background-color: rgba($primary-color, 0.1);
      border-radius: $border-radius-lg;
      font-size: $font-size-lg;
      margin-right: $spacing-base;
    }
    
    .function-info {
      flex: 1;
      
      .function-name {
        font-size: $font-size-base;
        font-weight: $font-weight-medium;
        color: $text-color-primary;
        margin-bottom: $spacing-xs;
      }
      
      .function-desc {
        font-size: $font-size-sm;
        color: $text-color-secondary;
      }
    }
    
    .function-arrow {
      color: $text-color-disabled;
      font-size: $font-size-lg;
    }
  }
}

// 退出登录
.logout-section {
  margin: $spacing-lg $spacing-base;
  
  .logout-btn {
    width: 100%;
    padding: $spacing-base;
    border: 1px solid $error-color;
    border-radius: $border-radius-lg;
    background: none;
    color: $error-color;
    font-size: $font-size-base;
    font-weight: $font-weight-medium;
    cursor: pointer;
    @include transition(all);
    
    &:hover {
      background-color: $error-color;
      color: white;
    }
  }
}

// 移动端适配
@include respond-to(xs) {
  .user-avatar-section {
    flex-direction: column;
    text-align: center;
    gap: $spacing-sm;
  }
  
  .stats-grid {
    grid-template-columns: repeat(4, 1fr);
    gap: $spacing-sm;
  }
  
  .stat-item {
    .stat-value {
      font-size: $font-size-base;
    }
    
    .stat-label {
      font-size: $font-size-xs;
    }
  }
  
  .info-item {
    flex-direction: column;
    align-items: flex-start;
    gap: $spacing-xs;
    
    .info-value {
      justify-content: flex-start;
    }
  }
}
</style>