<template>
  <div class="invite-list-page">
    <!-- 页面头部 -->
    <div class="page-header">
      <button class="back-btn" @click="goBack">←</button>
      <h1 class="page-title">邀请记录</h1>
      <button class="share-btn" @click="goToInvite">邀请</button>
    </div>
    
    <!-- 邀请统计 -->
    <div class="invite-stats">
      <div class="stats-card">
        <div class="stats-header">
          <h3 class="stats-title">邀请统计</h3>
          <div class="refresh-btn" @click="refreshData">🔄</div>
        </div>
        <div class="stats-grid">
          <div class="stat-item">
            <div class="stat-icon">👥</div>
            <div class="stat-info">
              <div class="stat-value">{{ inviteStats.totalCount }}</div>
              <div class="stat-label">累计邀请</div>
            </div>
          </div>
          <div class="stat-item">
            <div class="stat-icon">✅</div>
            <div class="stat-info">
              <div class="stat-value">{{ inviteStats.validCount }}</div>
              <div class="stat-label">有效邀请</div>
            </div>
          </div>
          <div class="stat-item">
            <div class="stat-icon">💰</div>
            <div class="stat-info">
              <div class="stat-value">¥{{ inviteStats.totalReward }}</div>
              <div class="stat-label">总奖励</div>
            </div>
          </div>
          <div class="stat-item">
            <div class="stat-icon">📅</div>
            <div class="stat-info">
              <div class="stat-value">{{ inviteStats.todayCount }}</div>
              <div class="stat-label">今日邀请</div>
            </div>
          </div>
        </div>
      </div>
    </div>
    
    <!-- 筛选选项 -->
    <div class="filter-section">
      <div class="filter-tabs">
        <button
          v-for="tab in filterTabs"
          :key="tab.key"
          :class="['filter-tab', { active: activeFilter === tab.key }]"
          @click="switchFilter(tab.key)"
        >
          {{ tab.label }}
          <span v-if="tab.count" class="tab-count">{{ tab.count }}</span>
        </button>
      </div>
      
      <div class="filter-actions">
        <button class="sort-btn" @click="toggleSort">
          {{ sortOrder === 'desc' ? '最新' : '最早' }} {{ sortOrder === 'desc' ? '↓' : '↑' }}
        </button>
        <button class="search-btn" @click="showSearchModal = true">🔍</button>
      </div>
    </div>
    
    <!-- 邀请记录列表 -->
    <div class="invite-records">
      <div v-if="loading" class="loading-state">
        <Loading :visible="true" text="加载中..." />
      </div>
      
      <div v-else-if="inviteList.length === 0" class="empty-state">
        <div class="empty-icon">👥</div>
        <div class="empty-text">暂无邀请记录</div>
        <div class="empty-tip">邀请好友注册即可获得丰厚奖励</div>
        <button class="empty-action" @click="goToInvite">立即邀请</button>
      </div>
      
      <div v-else class="records-list">
        <div
          v-for="invite in inviteList"
          :key="invite.id"
          class="record-item"
          @click="showInviteDetail(invite)"
        >
          <div class="record-avatar">
            <img v-if="invite.avatar" :src="invite.avatar" alt="头像" />
            <div v-else class="avatar-placeholder">{{ getAvatarText(invite.inviteeMobile) }}</div>
          </div>
          
          <div class="record-content">
            <div class="record-header">
              <div class="invitee-info">
                <span class="invitee-name">{{ formatMobile(invite.inviteeMobile) }}</span>
                <span :class="getStatusClass(invite.status)">{{ getStatusText(invite.status) }}</span>
              </div>
              <div class="invite-time">{{ formatTime(invite.createTime) }}</div>
            </div>
            
            <div class="record-details">
              <div class="detail-item">
                <span class="detail-label">注册时间:</span>
                <span class="detail-value">{{ formatDate(invite.registerTime) }}</span>
              </div>
              
              <div v-if="invite.status === 'valid'" class="detail-item">
                <span class="detail-label">审核通过:</span>
                <span class="detail-value">{{ formatDate(invite.auditTime) }}</span>
              </div>
              
              <div class="detail-item">
                <span class="detail-label">邀请奖励:</span>
                <span :class="getRewardClass(invite.reward)">
                  {{ invite.reward > 0 ? `+¥${invite.reward}` : '待发放' }}
                </span>
              </div>
            </div>
          </div>
          
          <div class="record-actions">
            <div :class="getStatusIconClass(invite.status)">
              {{ getStatusIcon(invite.status) }}
            </div>
          </div>
        </div>
      </div>
      
      <!-- 加载更多 -->
      <div v-if="hasMore && !loading" class="load-more">
        <button class="load-more-btn" @click="loadMoreInvites">
          加载更多
        </button>
      </div>
    </div>
    
    <!-- 快捷操作 -->
    <div class="floating-actions">
      <button class="fab-btn" @click="goToInvite">
        <span class="fab-icon">➕</span>
        <span class="fab-text">邀请好友</span>
      </button>
    </div>
    
    <!-- 搜索弹窗 -->
    <div v-if="showSearchModal" class="search-modal" @click="showSearchModal = false">
      <div class="modal-content" @click.stop>
        <div class="modal-header">
          <h3 class="modal-title">搜索邀请记录</h3>
          <button class="modal-close" @click="showSearchModal = false">×</button>
        </div>
        <div class="modal-body">
          <FormInput
            v-model="searchKeyword"
            placeholder="输入手机号搜索"
            prefix-icon="🔍"
            clearable
            @enter="handleSearch"
          />
        </div>
        <div class="modal-footer">
          <button class="modal-btn cancel" @click="showSearchModal = false">取消</button>
          <button class="modal-btn confirm" @click="handleSearch">搜索</button>
        </div>
      </div>
    </div>
    
    <!-- 邀请详情弹窗 -->
    <div v-if="showDetailModal" class="detail-modal" @click="showDetailModal = false">
      <div class="modal-content" @click.stop>
        <div class="modal-header">
          <h3 class="modal-title">邀请详情</h3>
          <button class="modal-close" @click="showDetailModal = false">×</button>
        </div>
        <div v-if="selectedInvite" class="modal-body">
          <div class="detail-section">
            <div class="section-title">被邀请人信息</div>
            <div class="info-grid">
              <div class="info-item">
                <span class="info-label">手机号</span>
                <span class="info-value">{{ formatMobile(selectedInvite.inviteeMobile) }}</span>
              </div>
              <div class="info-item">
                <span class="info-label">注册时间</span>
                <span class="info-value">{{ formatDate(selectedInvite.registerTime) }}</span>
              </div>
              <div class="info-item">
                <span class="info-label">邀请状态</span>
                <span :class="getStatusClass(selectedInvite.status)">
                  {{ getStatusText(selectedInvite.status) }}
                </span>
              </div>
            </div>
          </div>
          
          <div class="detail-section">
            <div class="section-title">奖励信息</div>
            <div class="reward-info">
              <div class="reward-amount">
                <span class="amount-label">奖励金额</span>
                <span class="amount-value">¥{{ selectedInvite.reward || '0.00' }}</span>
              </div>
              <div class="reward-status">
                <span :class="getRewardStatusClass(selectedInvite.rewardStatus)">
                  {{ getRewardStatusText(selectedInvite.rewardStatus) }}
                </span>
              </div>
            </div>
          </div>
          
          <div v-if="selectedInvite.remark" class="detail-section">
            <div class="section-title">备注信息</div>
            <div class="remark-content">{{ selectedInvite.remark }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
/**
 * 邀请记录页面
 * 展示用户的邀请记录和统计信息
 * @author 前端工程师团队
 * @date 2024-12-XX
 */
import { ref, reactive, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/stores/user'
import { useInviteStore } from '@/stores/invite'
import Loading from '@/components/common/Loading.vue'
import FormInput from '@/components/common/FormInput.vue'
import { showSuccess, showError } from '@/utils/toast'
import api from '@/utils/request'

// 路由和状态管理
const router = useRouter()
const userStore = useUserStore()
const inviteStore = useInviteStore()

// 响应式数据
const loading = ref(false)
const hasMore = ref(true)
const activeFilter = ref('all')
const sortOrder = ref('desc')
const showSearchModal = ref(false)
const showDetailModal = ref(false)
const searchKeyword = ref('')
const selectedInvite = ref(null)

// 邀请统计数据
const inviteStats = reactive({
  totalCount: 0,
  validCount: 0,
  totalReward: '0.00',
  todayCount: 0
})

// 邀请记录列表
const inviteList = ref([])

// 筛选标签配置
const filterTabs = computed(() => [
  { key: 'all', label: '全部', count: inviteStats.totalCount },
  { key: 'valid', label: '有效', count: inviteStats.validCount },
  { key: 'pending', label: '待审核', count: inviteStats.totalCount - inviteStats.validCount },
  { key: 'invalid', label: '无效', count: 0 }
])

/**
 * 格式化手机号
 * @param {string} mobile 手机号
 */
const formatMobile = (mobile) => {
  if (!mobile) return ''
  return mobile.replace(/(\d{3})\d{4}(\d{4})/, '$1****$2')
}

/**
 * 获取头像文字
 * @param {string} mobile 手机号
 */
const getAvatarText = (mobile) => {
  if (!mobile) return '?'
  return mobile.slice(-2)
}

/**
 * 获取状态样式类
 * @param {string} status 状态
 */
const getStatusClass = (status) => {
  return [
    'status-badge',
    {
      'status-valid': status === 'valid',
      'status-pending': status === 'pending',
      'status-invalid': status === 'invalid'
    }
  ]
}

/**
 * 获取状态文本
 * @param {string} status 状态
 */
const getStatusText = (status) => {
  const statusMap = {
    'valid': '有效',
    'pending': '待审核',
    'invalid': '无效'
  }
  return statusMap[status] || '未知'
}

/**
 * 获取状态图标样式类
 * @param {string} status 状态
 */
const getStatusIconClass = (status) => {
  return [
    'status-icon',
    {
      'icon-valid': status === 'valid',
      'icon-pending': status === 'pending',
      'icon-invalid': status === 'invalid'
    }
  ]
}

/**
 * 获取状态图标
 * @param {string} status 状态
 */
const getStatusIcon = (status) => {
  const iconMap = {
    'valid': '✅',
    'pending': '⏳',
    'invalid': '❌'
  }
  return iconMap[status] || '❓'
}

/**
 * 获取奖励样式类
 * @param {number} reward 奖励金额
 */
const getRewardClass = (reward) => {
  return [
    'reward-amount',
    {
      'reward-paid': reward > 0,
      'reward-pending': reward === 0
    }
  ]
}

/**
 * 获取奖励状态样式类
 * @param {string} status 奖励状态
 */
const getRewardStatusClass = (status) => {
  return [
    'reward-status-badge',
    {
      'reward-paid': status === 'paid',
      'reward-pending': status === 'pending',
      'reward-failed': status === 'failed'
    }
  ]
}

/**
 * 获取奖励状态文本
 * @param {string} status 奖励状态
 */
const getRewardStatusText = (status) => {
  const statusMap = {
    'paid': '已发放',
    'pending': '待发放',
    'failed': '发放失败'
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
 * 格式化日期
 * @param {string} dateStr 日期字符串
 */
const formatDate = (dateStr) => {
  if (!dateStr) return '暂无'
  const date = new Date(dateStr)
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')} ${String(date.getHours()).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')}`
}

/**
 * 切换筛选条件
 * @param {string} filter 筛选类型
 */
const switchFilter = (filter) => {
  activeFilter.value = filter
  loadInviteList(true)
}

/**
 * 切换排序方式
 */
const toggleSort = () => {
  sortOrder.value = sortOrder.value === 'desc' ? 'asc' : 'desc'
  loadInviteList(true)
}

/**
 * 处理搜索
 */
const handleSearch = () => {
  showSearchModal.value = false
  loadInviteList(true)
}

/**
 * 显示邀请详情
 * @param {Object} invite 邀请记录
 */
const showInviteDetail = (invite) => {
  selectedInvite.value = invite
  showDetailModal.value = true
}

/**
 * 刷新数据
 */
const refreshData = async () => {
  await loadInviteStats()
  await loadInviteList(true)
  showSuccess('数据已刷新')
}

/**
 * 加载邀请统计
 */
const loadInviteStats = async () => {
  try {
    // 这里应该调用实际的API
    // const stats = await api.get('/api/invite/stats')
    
    // 模拟数据
    inviteStats.totalCount = 15
    inviteStats.validCount = 12
    inviteStats.totalReward = '240.00'
    inviteStats.todayCount = 3
    
  } catch (error) {
    console.error('加载邀请统计失败:', error)
  }
}

/**
 * 加载邀请记录列表
 * @param {boolean} reset 是否重置列表
 */
const loadInviteList = async (reset = false) => {
  try {
    loading.value = true
    
    if (reset) {
      inviteList.value = []
    }
    
    // 构建请求参数
    const params = {
      page: reset ? 1 : Math.ceil(inviteList.value.length / 20) + 1,
      limit: 20,
      status: activeFilter.value === 'all' ? undefined : activeFilter.value,
      sort: sortOrder.value,
      keyword: searchKeyword.value || undefined
    }
    
    // 这里应该调用实际的API
    // const result = await api.get('/api/invite/list', { params })
    
    // 模拟数据
    const mockData = generateMockInvites(20)
    
    if (reset) {
      inviteList.value = mockData
    } else {
      inviteList.value.push(...mockData)
    }
    
    hasMore.value = mockData.length === 20
    
  } catch (error) {
    showError('加载失败')
    console.error('加载邀请记录失败:', error)
  } finally {
    loading.value = false
  }
}

/**
 * 加载更多邀请记录
 */
const loadMoreInvites = () => {
  loadInviteList(false)
}

/**
 * 生成模拟邀请数据
 * @param {number} count 数量
 */
const generateMockInvites = (count) => {
  const statuses = ['valid', 'pending', 'invalid']
  const rewardStatuses = ['paid', 'pending', 'failed']
  
  return Array.from({ length: count }, (_, index) => {
    const status = statuses[Math.floor(Math.random() * statuses.length)]
    const rewardStatus = rewardStatuses[Math.floor(Math.random() * rewardStatuses.length)]
    const mobile = `1${Math.floor(Math.random() * 9) + 1}${Math.random().toString().slice(2, 11)}`
    const reward = status === 'valid' && rewardStatus === 'paid' ? 20 : 0
    
    return {
      id: Date.now() + index,
      inviteeMobile: mobile,
      status,
      reward,
      rewardStatus,
      createTime: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString(),
      registerTime: new Date(Date.now() - Math.random() * 29 * 24 * 60 * 60 * 1000).toISOString(),
      auditTime: status === 'valid' ? new Date(Date.now() - Math.random() * 28 * 24 * 60 * 60 * 1000).toISOString() : null,
      avatar: Math.random() > 0.7 ? `https://api.dicebear.com/7.x/avataaars/svg?seed=${mobile}` : null,
      remark: Math.random() > 0.8 ? '通过朋友圈分享注册' : null
    }
  })
}

/**
 * 路由跳转方法
 */
const goBack = () => {
  router.back()
}

const goToInvite = () => {
  router.push('/invite')
}

// 生命周期
onMounted(() => {
  console.log('👥 邀请记录页面初始化')
  loadInviteStats()
  loadInviteList(true)
})
</script>

<style lang="scss" scoped>
@use "@/assets/styles/variables.scss" as *;
@use "@/assets/styles/mixins.scss" as *;

.invite-list-page {
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
  
  .share-btn {
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

// 邀请统计
.invite-stats {
  margin: $spacing-base;
}

.stats-card {
  background: linear-gradient(135deg, $primary-color, $primary-light);
  border-radius: $border-radius-lg;
  padding: $spacing-lg;
  color: white;
  
  .stats-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: $spacing-base;
    
    .stats-title {
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

.stats-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
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

// 筛选区域
.filter-section {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 0 $spacing-base $spacing-base;
  padding: $spacing-base;
  background-color: $background-color;
  border-radius: $border-radius-lg;
  box-shadow: $box-shadow-base;
}

.filter-tabs {
  display: flex;
  gap: $spacing-sm;
  
  .filter-tab {
    position: relative;
    padding: $spacing-xs $spacing-sm;
    border: none;
    border-radius: $border-radius-base;
    background: none;
    color: $text-color-secondary;
    font-size: $font-size-sm;
    cursor: pointer;
    @include transition(all);
    
    &:hover {
      background-color: $background-color-light;
    }
    
    &.active {
      background-color: $primary-color;
      color: white;
    }
    
    .tab-count {
      margin-left: $spacing-xs;
      font-size: $font-size-xs;
      opacity: 0.8;
    }
  }
}

.filter-actions {
  display: flex;
  gap: $spacing-sm;
  
  .sort-btn,
  .search-btn {
    padding: $spacing-xs $spacing-sm;
    border: 1px solid $border-color;
    border-radius: $border-radius-base;
    background-color: $background-color-light;
    color: $text-color-secondary;
    font-size: $font-size-sm;
    cursor: pointer;
    @include transition(all);
    
    &:hover {
      border-color: $primary-color;
      color: $primary-color;
    }
  }
}

// 邀请记录列表
.invite-records {
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

.records-list {
  background-color: $background-color;
  border-radius: $border-radius-lg;
  overflow: hidden;
  box-shadow: $box-shadow-base;
}

.record-item {
  display: flex;
  align-items: flex-start;
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
  
  .record-avatar {
    margin-right: $spacing-base;
    
    img,
    .avatar-placeholder {
      width: 48px;
      height: 48px;
      border-radius: 50%;
    }
    
    img {
      object-fit: cover;
    }
    
    .avatar-placeholder {
      @include center;
      background-color: $primary-light;
      color: white;
      font-size: $font-size-base;
      font-weight: $font-weight-bold;
    }
  }
  
  .record-content {
    flex: 1;
    min-width: 0;
    
    .record-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: $spacing-sm;
      
      .invitee-info {
        display: flex;
        align-items: center;
        gap: $spacing-sm;
        
        .invitee-name {
          font-size: $font-size-base;
          font-weight: $font-weight-medium;
          color: $text-color-primary;
        }
      }
      
      .invite-time {
        font-size: $font-size-xs;
        color: $text-color-disabled;
      }
    }
    
    .record-details {
      .detail-item {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-bottom: $spacing-xs;
        
        &:last-child {
          margin-bottom: 0;
        }
        
        .detail-label {
          font-size: $font-size-sm;
          color: $text-color-secondary;
        }
        
        .detail-value {
          font-size: $font-size-sm;
          color: $text-color-primary;
        }
      }
    }
  }
  
  .record-actions {
    margin-left: $spacing-sm;
    
    .status-icon {
      width: 32px;
      height: 32px;
      @include center;
      border-radius: 50%;
      font-size: $font-size-base;
      
      &.icon-valid {
        background-color: rgba($success-color, 0.1);
        color: $success-color;
      }
      
      &.icon-pending {
        background-color: rgba($warning-color, 0.1);
        color: $warning-color;
      }
      
      &.icon-invalid {
        background-color: rgba($error-color, 0.1);
        color: $error-color;
      }
    }
  }
}

// 状态标记
.status-badge {
  padding: 2px $spacing-xs;
  border-radius: $border-radius-sm;
  font-size: $font-size-xs;
  font-weight: $font-weight-medium;
  
  &.status-valid {
    background-color: rgba($success-color, 0.1);
    color: $success-color;
  }
  
  &.status-pending {
    background-color: rgba($warning-color, 0.1);
    color: $warning-color;
  }
  
  &.status-invalid {
    background-color: rgba($error-color, 0.1);
    color: $error-color;
  }
}

// 奖励金额
.reward-amount {
  font-weight: $font-weight-medium;
  
  &.reward-paid {
    color: $success-color;
  }
  
  &.reward-pending {
    color: $text-color-disabled;
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

// 浮动操作按钮
.floating-actions {
  position: fixed;
  bottom: $spacing-base;
  right: $spacing-base;
  z-index: 10;
  
  .fab-btn {
    display: flex;
    align-items: center;
    gap: $spacing-xs;
    padding: $spacing-sm $spacing-base;
    background-color: $primary-color;
    color: white;
    border: none;
    border-radius: $border-radius-xl;
    font-size: $font-size-sm;
    font-weight: $font-weight-medium;
    cursor: pointer;
    @include transition(all);
    box-shadow: $box-shadow-lg;
    
    &:hover {
      background-color: $primary-dark;
      transform: translateY(-2px);
    }
    
    .fab-icon {
      font-size: $font-size-lg;
    }
  }
}

// 弹窗样式
.search-modal,
.detail-modal {
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
    max-height: 80vh;
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
    max-height: 60vh;
    overflow-y: auto;
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
      
      &.cancel {
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

// 详情弹窗特有样式
.detail-modal {
  .detail-section {
    margin-bottom: $spacing-lg;
    
    &:last-child {
      margin-bottom: 0;
    }
    
    .section-title {
      font-size: $font-size-base;
      font-weight: $font-weight-medium;
      color: $text-color-primary;
      margin-bottom: $spacing-base;
      padding-bottom: $spacing-xs;
      border-bottom: 1px solid $border-color-light;
    }
  }
  
  .info-grid {
    .info-item {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: $spacing-xs 0;
      
      .info-label {
        font-size: $font-size-sm;
        color: $text-color-secondary;
      }
      
      .info-value {
        font-size: $font-size-sm;
        color: $text-color-primary;
      }
    }
  }
  
  .reward-info {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: $spacing-base;
    background-color: $background-color-light;
    border-radius: $border-radius-base;
    
    .reward-amount {
      .amount-label {
        display: block;
        font-size: $font-size-sm;
        color: $text-color-secondary;
        margin-bottom: $spacing-xs;
      }
      
      .amount-value {
        font-size: $font-size-lg;
        font-weight: $font-weight-bold;
        color: $success-color;
      }
    }
  }
  
  .reward-status-badge {
    padding: $spacing-xs $spacing-sm;
    border-radius: $border-radius-base;
    font-size: $font-size-sm;
    font-weight: $font-weight-medium;
    
    &.reward-paid {
      background-color: rgba($success-color, 0.1);
      color: $success-color;
    }
    
    &.reward-pending {
      background-color: rgba($warning-color, 0.1);
      color: $warning-color;
    }
    
    &.reward-failed {
      background-color: rgba($error-color, 0.1);
      color: $error-color;
    }
  }
  
  .remark-content {
    padding: $spacing-base;
    background-color: $background-color-light;
    border-radius: $border-radius-base;
    font-size: $font-size-sm;
    color: $text-color-secondary;
    line-height: $line-height-base;
  }
}

// 移动端适配
@include respond-to(xs) {
  .stats-grid {
    grid-template-columns: repeat(4, 1fr);
    gap: $spacing-sm;
  }
  
  .stat-item {
    flex-direction: column;
    text-align: center;
    padding: $spacing-xs;
    
    .stat-icon {
      font-size: 20px;
      margin-bottom: $spacing-xs;
    }
    
    .stat-info {
      .stat-value {
        font-size: $font-size-sm;
      }
      
      .stat-label {
        font-size: 10px;
      }
    }
  }
  
  .filter-section {
    flex-direction: column;
    gap: $spacing-sm;
    align-items: stretch;
  }
  
  .filter-tabs {
    justify-content: center;
  }
  
  .filter-actions {
    justify-content: center;
  }
  
  .record-item {
    .record-avatar {
      img,
      .avatar-placeholder {
        width: 40px;
        height: 40px;
      }
    }
  }
  
  .fab-btn {
    .fab-text {
      display: none;
    }
  }
}
</style>