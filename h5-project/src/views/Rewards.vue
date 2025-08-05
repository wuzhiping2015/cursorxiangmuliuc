<template>
  <div class="rewards-page">
    <!-- 页面头部 -->
    <div class="page-header">
      <button class="back-btn" @click="goBack">←</button>
      <h1 class="page-title">我的奖励</h1>
      <button class="filter-btn" @click="showFilterModal = true">筛选</button>
    </div>
    
    <!-- 收益概览 -->
    <div class="earnings-overview">
      <div class="overview-card">
        <div class="card-header">
          <h3 class="card-title">总收益概览</h3>
          <div class="refresh-btn" @click="refreshData">🔄</div>
        </div>
        <div class="earnings-stats">
          <div class="stat-item primary">
            <div class="stat-icon">💰</div>
            <div class="stat-info">
              <div class="stat-value">¥{{ totalEarnings }}</div>
              <div class="stat-label">累计收益</div>
            </div>
          </div>
          <div class="stat-item success">
            <div class="stat-icon">✅</div>
            <div class="stat-info">
              <div class="stat-value">¥{{ availableEarnings }}</div>
              <div class="stat-label">可提现金额</div>
            </div>
          </div>
          <div class="stat-item warning">
            <div class="stat-icon">⏳</div>
            <div class="stat-info">
              <div class="stat-value">¥{{ pendingEarnings }}</div>
              <div class="stat-label">审核中金额</div>
            </div>
          </div>
        </div>
      </div>
    </div>
    
    <!-- 今日收益 -->
    <div class="today-earnings">
      <div class="today-card">
        <div class="today-header">
          <div class="today-title">
            <span class="title-icon">📊</span>
            <span class="title-text">今日收益</span>
          </div>
          <div class="today-amount">+¥{{ todayEarnings }}</div>
        </div>
        <div class="today-details">
          <div class="detail-item">
            <span class="detail-label">邀请奖励</span>
            <span class="detail-value">+¥{{ todayInviteReward }}</span>
          </div>
          <div class="detail-item">
            <span class="detail-label">活动奖励</span>
            <span class="detail-value">+¥{{ todayActivityReward }}</span>
          </div>
        </div>
      </div>
    </div>
    
    <!-- 筛选标签 -->
    <div class="filter-tabs">
      <div class="tabs-container">
        <button
          v-for="tab in filterTabs"
          :key="tab.key"
          :class="['tab-item', { active: activeTab === tab.key }]"
          @click="switchTab(tab.key)"
        >
          {{ tab.label }}
        </button>
      </div>
    </div>
    
    <!-- 奖励记录列表 -->
    <div class="rewards-list">
      <div v-if="loading" class="loading-state">
        <Loading :visible="true" text="加载中..." />
      </div>
      
      <div v-else-if="rewardsList.length === 0" class="empty-state">
        <div class="empty-icon">💰</div>
        <div class="empty-text">暂无奖励记录</div>
        <div class="empty-tip">邀请好友注册即可获得奖励</div>
        <button class="empty-action" @click="goToInvite">立即邀请</button>
      </div>
      
      <div v-else class="records-container">
        <div
          v-for="reward in rewardsList"
          :key="reward.id"
          class="reward-item"
          @click="showRewardDetail(reward)"
        >
          <div class="reward-icon">
            <span :class="getRewardIconClass(reward.type)">{{ getRewardIcon(reward.type) }}</span>
          </div>
          <div class="reward-content">
            <div class="reward-title">{{ reward.title }}</div>
            <div class="reward-desc">{{ reward.description }}</div>
            <div class="reward-time">{{ formatTime(reward.createTime) }}</div>
          </div>
          <div class="reward-amount">
            <div :class="getAmountClass(reward.amount)">
              {{ formatAmount(reward.amount) }}
            </div>
            <div :class="getStatusClass(reward.status)">
              {{ getStatusText(reward.status) }}
            </div>
          </div>
        </div>
      </div>
      
      <!-- 加载更多 -->
      <div v-if="hasMore && !loading" class="load-more">
        <button class="load-more-btn" @click="loadMoreRewards">
          加载更多
        </button>
      </div>
    </div>
    
    <!-- 快捷操作 -->
    <div class="quick-actions">
      <button class="action-btn primary" @click="goToWithdraw">
        <span class="btn-icon">💳</span>
        <span class="btn-text">申请提现</span>
      </button>
      <button class="action-btn secondary" @click="goToInvite">
        <span class="btn-icon">🎁</span>
        <span class="btn-text">邀请好友</span>
      </button>
    </div>
    
    <!-- 筛选弹窗 -->
    <div v-if="showFilterModal" class="filter-modal" @click="showFilterModal = false">
      <div class="modal-content" @click.stop>
        <div class="modal-header">
          <h3 class="modal-title">筛选条件</h3>
          <button class="modal-close" @click="showFilterModal = false">×</button>
        </div>
        <div class="modal-body">
          <div class="filter-group">
            <div class="filter-label">时间范围</div>
            <div class="filter-options">
              <button
                v-for="period in timePeriods"
                :key="period.key"
                :class="['filter-option', { active: selectedPeriod === period.key }]"
                @click="selectedPeriod = period.key"
              >
                {{ period.label }}
              </button>
            </div>
          </div>
          <div class="filter-group">
            <div class="filter-label">奖励类型</div>
            <div class="filter-options">
              <button
                v-for="type in rewardTypes"
                :key="type.key"
                :class="['filter-option', { active: selectedTypes.includes(type.key) }]"
                @click="toggleRewardType(type.key)"
              >
                {{ type.label }}
              </button>
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <button class="modal-btn reset" @click="resetFilter">重置</button>
          <button class="modal-btn confirm" @click="applyFilter">确定</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
/**
 * 奖励页面
 * 展示用户的收益明细和奖励记录
 * @author 前端工程师团队
 * @date 2024-12-XX
 */
import { ref, reactive, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/stores/user'
import { useInviteStore } from '@/stores/invite'
import Loading from '@/components/common/Loading.vue'
import { showSuccess, showError } from '@/utils/toast'
import api from '@/utils/request'

// 路由和状态管理
const router = useRouter()
const userStore = useUserStore()
const inviteStore = useInviteStore()

// 响应式数据
const loading = ref(false)
const hasMore = ref(true)
const activeTab = ref('all')
const showFilterModal = ref(false)
const selectedPeriod = ref('all')
const selectedTypes = ref([])

// 收益统计数据
const totalEarnings = ref('2,680.30')
const availableEarnings = ref('2,119.50')
const pendingEarnings = ref('560.80')
const todayEarnings = ref('128.50')
const todayInviteReward = ref('100.00')
const todayActivityReward = ref('28.50')

// 奖励记录列表
const rewardsList = ref([])

// 筛选标签配置
const filterTabs = [
  { key: 'all', label: '全部' },
  { key: 'invite', label: '邀请奖励' },
  { key: 'activity', label: '活动奖励' },
  { key: 'bonus', label: '额外奖励' }
]

// 时间筛选选项
const timePeriods = [
  { key: 'all', label: '全部时间' },
  { key: 'today', label: '今天' },
  { key: 'week', label: '本周' },
  { key: 'month', label: '本月' },
  { key: 'quarter', label: '本季度' }
]

// 奖励类型选项
const rewardTypes = [
  { key: 'invite', label: '邀请奖励' },
  { key: 'activity', label: '活动奖励' },
  { key: 'bonus', label: '额外奖励' },
  { key: 'referral', label: '推荐奖励' }
]

/**
 * 切换标签
 * @param {string} tabKey 标签键
 */
const switchTab = (tabKey) => {
  activeTab.value = tabKey
  loadRewardsList(true)
}

/**
 * 获取奖励图标
 * @param {string} type 奖励类型
 */
const getRewardIcon = (type) => {
  const iconMap = {
    'invite': '🎁',
    'activity': '🎉',
    'bonus': '⭐',
    'referral': '💫',
    'default': '💰'
  }
  return iconMap[type] || iconMap.default
}

/**
 * 获取奖励图标样式类
 * @param {string} type 奖励类型
 */
const getRewardIconClass = (type) => {
  return [
    'icon-badge',
    {
      'icon-invite': type === 'invite',
      'icon-activity': type === 'activity',
      'icon-bonus': type === 'bonus',
      'icon-referral': type === 'referral'
    }
  ]
}

/**
 * 获取金额样式类
 * @param {number} amount 金额
 */
const getAmountClass = (amount) => {
  return [
    'amount-value',
    {
      'amount-positive': amount > 0,
      'amount-negative': amount < 0,
      'amount-zero': amount === 0
    }
  ]
}

/**
 * 格式化金额
 * @param {number} amount 金额
 */
const formatAmount = (amount) => {
  const prefix = amount > 0 ? '+' : ''
  return `${prefix}¥${Math.abs(amount).toFixed(2)}`
}

/**
 * 获取状态样式类
 * @param {string} status 状态
 */
const getStatusClass = (status) => {
  return [
    'status-badge',
    {
      'status-completed': status === 'completed',
      'status-pending': status === 'pending',
      'status-failed': status === 'failed'
    }
  ]
}

/**
 * 获取状态文本
 * @param {string} status 状态
 */
const getStatusText = (status) => {
  const statusMap = {
    'completed': '已到账',
    'pending': '审核中',
    'failed': '失败'
  }
  return statusMap[status] || '未知'
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
 * 显示奖励详情
 * @param {Object} reward 奖励记录
 */
const showRewardDetail = (reward) => {
  // 这里可以打开详情弹窗或跳转详情页面
  showSuccess(`查看奖励详情: ${reward.title}`)
}

/**
 * 切换奖励类型筛选
 * @param {string} type 奖励类型
 */
const toggleRewardType = (type) => {
  const index = selectedTypes.value.indexOf(type)
  if (index > -1) {
    selectedTypes.value.splice(index, 1)
  } else {
    selectedTypes.value.push(type)
  }
}

/**
 * 重置筛选条件
 */
const resetFilter = () => {
  selectedPeriod.value = 'all'
  selectedTypes.value = []
}

/**
 * 应用筛选条件
 */
const applyFilter = () => {
  showFilterModal.value = false
  loadRewardsList(true)
}

/**
 * 刷新数据
 */
const refreshData = async () => {
  await loadRewardsList(true)
  await loadEarningsStats()
  showSuccess('数据已刷新')
}

/**
 * 加载收益统计
 */
const loadEarningsStats = async () => {
  try {
    // 这里应该调用实际的API
    // const stats = await api.get('/api/rewards/stats')
    
    // 模拟数据
    totalEarnings.value = '2,680.30'
    availableEarnings.value = '2,119.50'
    pendingEarnings.value = '560.80'
    todayEarnings.value = '128.50'
    todayInviteReward.value = '100.00'
    todayActivityReward.value = '28.50'
    
  } catch (error) {
    console.error('加载收益统计失败:', error)
  }
}

/**
 * 加载奖励记录列表
 * @param {boolean} reset 是否重置列表
 */
const loadRewardsList = async (reset = false) => {
  try {
    loading.value = true
    
    if (reset) {
      rewardsList.value = []
    }
    
    // 构建请求参数
    const params = {
      page: reset ? 1 : Math.ceil(rewardsList.value.length / 20) + 1,
      limit: 20,
      type: activeTab.value === 'all' ? undefined : activeTab.value,
      period: selectedPeriod.value === 'all' ? undefined : selectedPeriod.value,
      types: selectedTypes.value.length > 0 ? selectedTypes.value : undefined
    }
    
    // 这里应该调用实际的API
    // const result = await api.get('/api/rewards/list', { params })
    
    // 模拟数据
    const mockData = generateMockRewards(20)
    
    if (reset) {
      rewardsList.value = mockData
    } else {
      rewardsList.value.push(...mockData)
    }
    
    hasMore.value = mockData.length === 20
    
  } catch (error) {
    showError('加载失败')
    console.error('加载奖励记录失败:', error)
  } finally {
    loading.value = false
  }
}

/**
 * 加载更多奖励记录
 */
const loadMoreRewards = () => {
  loadRewardsList(false)
}

/**
 * 生成模拟奖励数据
 * @param {number} count 数量
 */
const generateMockRewards = (count) => {
  const types = ['invite', 'activity', 'bonus', 'referral']
  const statuses = ['completed', 'pending', 'failed']
  const titles = [
    '邀请好友注册奖励',
    '每日签到奖励',
    '分享活动奖励',
    '推荐用户奖励',
    '完成任务奖励'
  ]
  
  return Array.from({ length: count }, (_, index) => {
    const type = types[Math.floor(Math.random() * types.length)]
    const status = statuses[Math.floor(Math.random() * statuses.length)]
    const amount = (Math.random() * 100 + 10).toFixed(2)
    const title = titles[Math.floor(Math.random() * titles.length)]
    
    return {
      id: Date.now() + index,
      type,
      status,
      amount: parseFloat(amount),
      title,
      description: `通过${title}获得收益`,
      createTime: new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000).toISOString()
    }
  })
}

/**
 * 路由跳转方法
 */
const goBack = () => {
  router.back()
}

const goToWithdraw = () => {
  router.push('/withdraw')
}

const goToInvite = () => {
  router.push('/invite')
}

// 生命周期
onMounted(() => {
  console.log('💎 奖励页面初始化')
  loadEarningsStats()
  loadRewardsList(true)
})
</script>

<style lang="scss" scoped>
@use "@/assets/styles/variables.scss" as *;
@use "@/assets/styles/mixins.scss" as *;

.rewards-page {
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
  
  .filter-btn {
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

// 收益概览
.earnings-overview {
  margin: $spacing-base;
}

.overview-card {
  background: linear-gradient(135deg, $primary-color, $primary-light);
  border-radius: $border-radius-lg;
  padding: $spacing-lg;
  color: white;
  
  .card-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: $spacing-base;
    
    .card-title {
      font-size: $font-size-lg;
      font-weight: $font-weight-medium;
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
}

.earnings-stats {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: $spacing-base;
}

.stat-item {
  display: flex;
  align-items: center;
  gap: $spacing-sm;
  padding: $spacing-sm;
  background-color: rgba(255, 255, 255, 0.1);
  border-radius: $border-radius-base;
  
  .stat-icon {
    font-size: 24px;
  }
  
  .stat-info {
    flex: 1;
    min-width: 0;
    
    .stat-value {
      font-size: $font-size-base;
      font-weight: $font-weight-bold;
      margin-bottom: 2px;
      @include text-ellipsis();
    }
    
    .stat-label {
      font-size: $font-size-xs;
      opacity: 0.9;
    }
  }
}

// 今日收益
.today-earnings {
  margin: 0 $spacing-base $spacing-base;
}

.today-card {
  background-color: $background-color;
  border-radius: $border-radius-lg;
  padding: $spacing-base;
  box-shadow: $box-shadow-base;
  
  .today-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: $spacing-sm;
    
    .today-title {
      display: flex;
      align-items: center;
      gap: $spacing-xs;
      
      .title-text {
        font-size: $font-size-base;
        font-weight: $font-weight-medium;
        color: $text-color-primary;
      }
    }
    
    .today-amount {
      font-size: $font-size-lg;
      font-weight: $font-weight-bold;
      color: $success-color;
    }
  }
  
  .today-details {
    display: flex;
    justify-content: space-between;
    
    .detail-item {
      display: flex;
      flex-direction: column;
      align-items: center;
      
      .detail-label {
        font-size: $font-size-sm;
        color: $text-color-secondary;
        margin-bottom: $spacing-xs;
      }
      
      .detail-value {
        font-size: $font-size-base;
        font-weight: $font-weight-medium;
        color: $primary-color;
      }
    }
  }
}

// 筛选标签
.filter-tabs {
  margin: 0 $spacing-base $spacing-base;
  
  .tabs-container {
    display: flex;
    background-color: $background-color;
    border-radius: $border-radius-lg;
    padding: $spacing-xs;
    box-shadow: $box-shadow-base;
  }
  
  .tab-item {
    flex: 1;
    padding: $spacing-sm;
    border: none;
    background: none;
    color: $text-color-secondary;
    font-size: $font-size-sm;
    border-radius: $border-radius-base;
    cursor: pointer;
    @include transition(all);
    
    &:hover {
      background-color: $background-color-light;
    }
    
    &.active {
      background-color: $primary-color;
      color: white;
    }
  }
}

// 奖励记录列表
.rewards-list {
  margin: 0 $spacing-base;
}

.loading-state {
  padding: $spacing-xl;
  text-align: center;
}

.empty-state {
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
    font-size: $font-size-lg;
    font-weight: $font-weight-medium;
    color: $text-color-primary;
    margin-bottom: $spacing-xs;
  }
  
  .empty-tip {
    font-size: $font-size-sm;
    color: $text-color-secondary;
    margin-bottom: $spacing-base;
  }
  
  .empty-action {
    @include button-base($primary-color, white, $border-radius-base);
    padding: $spacing-sm $spacing-base;
  }
}

.records-container {
  background-color: $background-color;
  border-radius: $border-radius-lg;
  overflow: hidden;
  box-shadow: $box-shadow-base;
}

.reward-item {
  display: flex;
  align-items: center;
  padding: $spacing-base;
  cursor: pointer;
  @include transition(background-color);
  border-bottom: 1px solid $border-color-light;
  
  &:last-child {
    border-bottom: none;
  }
  
  &:hover {
    background-color: $background-color-light;
  }
  
  .reward-icon {
    margin-right: $spacing-base;
    
    .icon-badge {
      width: 40px;
      height: 40px;
      @include center;
      border-radius: 50%;
      font-size: $font-size-lg;
      
      &.icon-invite {
        background-color: rgba($primary-color, 0.1);
      }
      
      &.icon-activity {
        background-color: rgba($success-color, 0.1);
      }
      
      &.icon-bonus {
        background-color: rgba($warning-color, 0.1);
      }
      
      &.icon-referral {
        background-color: rgba($info-color, 0.1);
      }
    }
  }
  
  .reward-content {
    flex: 1;
    min-width: 0;
    
    .reward-title {
      font-size: $font-size-base;
      font-weight: $font-weight-medium;
      color: $text-color-primary;
      margin-bottom: $spacing-xs;
      @include text-ellipsis();
    }
    
    .reward-desc {
      font-size: $font-size-sm;
      color: $text-color-secondary;
      margin-bottom: $spacing-xs;
      @include text-ellipsis();
    }
    
    .reward-time {
      font-size: $font-size-xs;
      color: $text-color-disabled;
    }
  }
  
  .reward-amount {
    text-align: right;
    
    .amount-value {
      font-size: $font-size-base;
      font-weight: $font-weight-bold;
      margin-bottom: $spacing-xs;
      
      &.amount-positive {
        color: $success-color;
      }
      
      &.amount-negative {
        color: $error-color;
      }
      
      &.amount-zero {
        color: $text-color-disabled;
      }
    }
    
    .status-badge {
      font-size: $font-size-xs;
      padding: 2px $spacing-xs;
      border-radius: $border-radius-sm;
      
      &.status-completed {
        background-color: rgba($success-color, 0.1);
        color: $success-color;
      }
      
      &.status-pending {
        background-color: rgba($warning-color, 0.1);
        color: $warning-color;
      }
      
      &.status-failed {
        background-color: rgba($error-color, 0.1);
        color: $error-color;
      }
    }
  }
}

// 加载更多
.load-more {
  text-align: center;
  padding: $spacing-base;
  
  .load-more-btn {
    padding: $spacing-sm $spacing-base;
    border: 1px solid $border-color;
    border-radius: $border-radius-base;
    background-color: $background-color;
    color: $text-color-secondary;
    cursor: pointer;
    @include transition(all);
    
    &:hover {
      border-color: $primary-color;
      color: $primary-color;
    }
  }
}

// 快捷操作
.quick-actions {
  position: fixed;
  bottom: $spacing-base;
  left: $spacing-base;
  right: $spacing-base;
  display: flex;
  gap: $spacing-base;
  z-index: 10;
  
  .action-btn {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: $spacing-xs;
    padding: $spacing-base;
    border: none;
    border-radius: $border-radius-lg;
    font-size: $font-size-base;
    font-weight: $font-weight-medium;
    cursor: pointer;
    @include transition(all);
    box-shadow: $box-shadow-lg;
    
    &.primary {
      background-color: $primary-color;
      color: white;
      
      &:hover {
        background-color: $primary-dark;
      }
    }
    
    &.secondary {
      background-color: $background-color;
      color: $text-color-primary;
      border: 1px solid $border-color;
      
      &:hover {
        border-color: $primary-color;
        color: $primary-color;
      }
    }
    
    .btn-icon {
      font-size: $font-size-lg;
    }
  }
}

// 筛选弹窗
.filter-modal {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  @include center;
  z-index: 1000;
  
  .modal-content {
    width: 90%;
    max-width: 400px;
    background-color: $background-color;
    border-radius: $border-radius-lg;
    overflow: hidden;
    box-shadow: $box-shadow-lg;
  }
  
  .modal-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: $spacing-base $spacing-lg;
    border-bottom: 1px solid $border-color-light;
    
    .modal-title {
      font-size: $font-size-lg;
      font-weight: $font-weight-medium;
      color: $text-color-primary;
    }
    
    .modal-close {
      width: 32px;
      height: 32px;
      border: none;
      background: none;
      font-size: $font-size-xl;
      color: $text-color-disabled;
      cursor: pointer;
      @include transition(color);
      
      &:hover {
        color: $text-color-primary;
      }
    }
  }
  
  .modal-body {
    padding: $spacing-lg;
  }
  
  .filter-group {
    margin-bottom: $spacing-lg;
    
    &:last-child {
      margin-bottom: 0;
    }
    
    .filter-label {
      font-size: $font-size-base;
      font-weight: $font-weight-medium;
      color: $text-color-primary;
      margin-bottom: $spacing-sm;
    }
    
    .filter-options {
      display: flex;
      flex-wrap: wrap;
      gap: $spacing-xs;
    }
    
    .filter-option {
      padding: $spacing-xs $spacing-sm;
      border: 1px solid $border-color;
      border-radius: $border-radius-base;
      background-color: $background-color;
      color: $text-color-secondary;
      font-size: $font-size-sm;
      cursor: pointer;
      @include transition(all);
      
      &:hover {
        border-color: $primary-color;
        color: $primary-color;
      }
      
      &.active {
        background-color: $primary-color;
        border-color: $primary-color;
        color: white;
      }
    }
  }
  
  .modal-footer {
    display: flex;
    gap: $spacing-base;
    padding: $spacing-base $spacing-lg;
    border-top: 1px solid $border-color-light;
    
    .modal-btn {
      flex: 1;
      padding: $spacing-sm;
      border: 1px solid $border-color;
      border-radius: $border-radius-base;
      font-size: $font-size-base;
      cursor: pointer;
      @include transition(all);
      
      &.reset {
        background-color: $background-color;
        color: $text-color-secondary;
        
        &:hover {
          border-color: $text-color-secondary;
        }
      }
      
      &.confirm {
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

// 移动端适配
@include respond-to(xs) {
  .earnings-stats {
    grid-template-columns: 1fr;
    gap: $spacing-sm;
  }
  
  .stat-item {
    .stat-info {
      .stat-value {
        font-size: $font-size-sm;
      }
      
      .stat-label {
        font-size: 10px;
      }
    }
  }
  
  .today-details {
    gap: $spacing-base;
  }
  
  .reward-item {
    padding: $spacing-sm;
    
    .reward-icon {
      .icon-badge {
        width: 32px;
        height: 32px;
        font-size: $font-size-base;
      }
    }
  }
  
  .quick-actions {
    flex-direction: column;
    gap: $spacing-sm;
    
    .action-btn {
      padding: $spacing-sm;
    }
  }
}
</style>