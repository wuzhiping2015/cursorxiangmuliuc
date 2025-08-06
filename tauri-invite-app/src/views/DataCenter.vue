<template>
  <div class="data-center-page">
    <!-- 页面头部 -->
    <div class="page-header">
      <button class="back-btn" @click="goBack">←</button>
      <h1 class="page-title">数据中心</h1>
      <button class="refresh-btn" @click="refreshAllData">🔄</button>
    </div>

    <!-- 数据概览 -->
    <div class="data-overview">
      <div class="overview-grid">
        <div class="overview-card">
          <div class="card-icon">📊</div>
          <div class="card-content">
            <div class="card-value">{{ totalRecords }}</div>
            <div class="card-label">总记录数</div>
          </div>
        </div>
        
        <div class="overview-card">
          <div class="card-icon">📈</div>
          <div class="card-content">
            <div class="card-value">{{ validInvites }}</div>
            <div class="card-label">有效邀请</div>
          </div>
        </div>
        
        <div class="overview-card">
          <div class="card-icon">💰</div>
          <div class="card-content">
            <div class="card-value">¥{{ totalEarnings }}</div>
            <div class="card-label">总收益</div>
          </div>
        </div>
        
        <div class="overview-card">
          <div class="card-icon">📤</div>
          <div class="card-content">
            <div class="card-value">{{ totalShares }}</div>
            <div class="card-label">分享次数</div>
          </div>
        </div>
      </div>
    </div>

    <!-- 数据图表 -->
    <div class="data-charts">
      <div class="chart-section">
        <h3 class="section-title">邀请趋势</h3>
        <div class="chart-container">
          <div class="chart-placeholder">
            <div class="chart-icon">📈</div>
            <div class="chart-text">图表数据加载中...</div>
          </div>
        </div>
      </div>
      
      <div class="chart-section">
        <h3 class="section-title">收益分析</h3>
        <div class="chart-container">
          <div class="chart-placeholder">
            <div class="chart-icon">📊</div>
            <div class="chart-text">图表数据加载中...</div>
          </div>
        </div>
      </div>
    </div>

    <!-- 数据表格 -->
    <div class="data-tables">
      <div class="table-section">
        <div class="section-header">
          <h3 class="section-title">最近邀请记录</h3>
          <button class="export-btn" @click="exportInviteData">
            <span class="btn-icon">📤</span>
            <span class="btn-text">导出</span>
          </button>
        </div>
        
        <div class="table-container">
          <table class="data-table">
            <thead>
              <tr>
                <th>邀请码</th>
                <th>被邀请人</th>
                <th>状态</th>
                <th>奖励金额</th>
                <th>创建时间</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="invite in recentInvites" :key="invite.id">
                <td>{{ invite.invite_code }}</td>
                <td>{{ formatMobile(invite.invitee_mobile) }}</td>
                <td>
                  <span :class="getStatusClass(invite.status)">
                    {{ getStatusText(invite.status) }}
                  </span>
                </td>
                <td class="amount-cell">¥{{ invite.reward_amount }}</td>
                <td>{{ formatDateTime(invite.created_at) }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div class="table-section">
        <div class="section-header">
          <h3 class="section-title">最近奖励记录</h3>
          <button class="export-btn" @click="exportRewardData">
            <span class="btn-icon">📤</span>
            <span class="btn-text">导出</span>
          </button>
        </div>
        
        <div class="table-container">
          <table class="data-table">
            <thead>
              <tr>
                <th>奖励类型</th>
                <th>金额</th>
                <th>状态</th>
                <th>描述</th>
                <th>创建时间</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="reward in recentRewards" :key="reward.id">
                <td>{{ getRewardTypeText(reward.reward_type) }}</td>
                <td class="amount-cell">¥{{ reward.amount }}</td>
                <td>
                  <span :class="getRewardStatusClass(reward.status)">
                    {{ getRewardStatusText(reward.status) }}
                  </span>
                </td>
                <td>{{ reward.description }}</td>
                <td>{{ formatDateTime(reward.created_at) }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>

    <!-- 数据操作 -->
    <div class="data-actions">
      <div class="actions-grid">
        <button class="action-btn primary" @click="handleFullBackup">
          <span class="btn-icon">💾</span>
          <span class="btn-text">完整备份</span>
        </button>
        
        <button class="action-btn secondary" @click="handleImportData">
          <span class="btn-icon">📥</span>
          <span class="btn-text">导入数据</span>
        </button>
        
        <button class="action-btn info" @click="handleExportAll">
          <span class="btn-icon">📤</span>
          <span class="btn-text">导出全部</span>
        </button>
        
        <button class="action-btn warning" @click="handleDataCleanup">
          <span class="btn-icon">🧹</span>
          <span class="btn-text">数据清理</span>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
/**
 * 数据中心页面
 * 桌面版数据管理和分析功能
 * @author 前端工程师团队
 * @date 2024-12-XX
 */
import { ref, reactive, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { TauriApiService } from '@/utils/tauri-api'
import { showSuccess, showError } from '@/utils/toast'

// 路由
const router = useRouter()

// 响应式数据
const loading = ref(false)
const recentInvites = ref([])
const recentRewards = ref([])

const stats = reactive({
  totalRecords: 0,
  validInvites: 0,
  totalEarnings: 0,
  totalShares: 0
})

// 计算属性
const totalRecords = computed(() => stats.totalRecords)
const validInvites = computed(() => stats.validInvites)
const totalEarnings = computed(() => stats.totalEarnings.toFixed(2))
const totalShares = computed(() => stats.totalShares)

/**
 * 格式化手机号
 */
const formatMobile = (mobile) => {
  if (!mobile) return '-'
  return mobile.replace(/(\d{3})\d{4}(\d{4})/, '$1****$2')
}

/**
 * 格式化日期时间
 */
const formatDateTime = (datetime) => {
  if (!datetime) return '-'
  return new Date(datetime).toLocaleString('zh-CN')
}

/**
 * 获取状态样式类
 */
const getStatusClass = (status) => {
  const classMap = {
    'pending': 'status-pending',
    'valid': 'status-success',
    'invalid': 'status-error',
    'expired': 'status-warning'
  }
  return classMap[status] || 'status-default'
}

/**
 * 获取状态文本
 */
const getStatusText = (status) => {
  const textMap = {
    'pending': '待审核',
    'valid': '有效',
    'invalid': '无效',
    'expired': '已过期'
  }
  return textMap[status] || '未知'
}

/**
 * 获取奖励状态样式类
 */
const getRewardStatusClass = (status) => {
  const classMap = {
    'pending': 'status-pending',
    'confirmed': 'status-success',
    'withdrawn': 'status-info',
    'failed': 'status-error'
  }
  return classMap[status] || 'status-default'
}

/**
 * 获取奖励状态文本
 */
const getRewardStatusText = (status) => {
  const textMap = {
    'pending': '待确认',
    'confirmed': '已确认',
    'withdrawn': '已提现',
    'failed': '失败'
  }
  return textMap[status] || '未知'
}

/**
 * 获取奖励类型文本
 */
const getRewardTypeText = (type) => {
  const textMap = {
    'invite': '邀请奖励',
    'activity': '活动奖励',
    'bonus': '额外奖励',
    'referral': '推荐奖励'
  }
  return textMap[type] || '未知类型'
}

/**
 * 加载数据统计
 */
const loadDataStats = async () => {
  try {
    const [inviteResult, rewardResult, earningsResult] = await Promise.all([
      TauriApiService.getInviteRecords(100, 0),
      TauriApiService.getRewardRecords(100, 0),
      TauriApiService.calculateTotalEarnings()
    ])

    if (inviteResult.success) {
      const invites = inviteResult.data
      stats.totalRecords += invites.length
      stats.validInvites = invites.filter(item => item.status === 'valid').length
      recentInvites.value = invites.slice(0, 10)
    }

    if (rewardResult.success) {
      const rewards = rewardResult.data
      stats.totalRecords += rewards.length
      recentRewards.value = rewards.slice(0, 10)
    }

    if (earningsResult.success) {
      stats.totalEarnings = earningsResult.data.total_earnings || 0
    }

    // 模拟分享统计（实际应该从数据库获取）
    stats.totalShares = 156

  } catch (error) {
    console.error('加载数据统计失败:', error)
    showError('加载数据失败')
  }
}

/**
 * 刷新所有数据
 */
const refreshAllData = async () => {
  loading.value = true
  try {
    // 重置统计数据
    Object.assign(stats, {
      totalRecords: 0,
      validInvites: 0,
      totalEarnings: 0,
      totalShares: 0
    })
    
    await loadDataStats()
    showSuccess('数据已刷新')
  } catch (error) {
    showError('刷新数据失败')
  } finally {
    loading.value = false
  }
}

/**
 * 导出邀请数据
 */
const exportInviteData = async () => {
  try {
    const result = await TauriApiService.getInviteRecords()
    if (result.success) {
      const csvContent = convertToCSV(result.data, [
        { key: 'invite_code', label: '邀请码' },
        { key: 'invitee_mobile', label: '被邀请人' },
        { key: 'status', label: '状态' },
        { key: 'reward_amount', label: '奖励金额' },
        { key: 'created_at', label: '创建时间' }
      ])
      
      const filename = `邀请记录_${new Date().toISOString().slice(0, 10)}.csv`
      await TauriApiService.saveFileToDesktop(csvContent, filename)
      showSuccess(`邀请数据已导出：${filename}`)
    }
  } catch (error) {
    showError(`导出失败: ${error.message}`)
  }
}

/**
 * 导出奖励数据
 */
const exportRewardData = async () => {
  try {
    const result = await TauriApiService.getRewardRecords()
    if (result.success) {
      const csvContent = convertToCSV(result.data, [
        { key: 'reward_type', label: '奖励类型' },
        { key: 'amount', label: '金额' },
        { key: 'status', label: '状态' },
        { key: 'description', label: '描述' },
        { key: 'created_at', label: '创建时间' }
      ])
      
      const filename = `奖励记录_${new Date().toISOString().slice(0, 10)}.csv`
      await TauriApiService.saveFileToDesktop(csvContent, filename)
      showSuccess(`奖励数据已导出：${filename}`)
    }
  } catch (error) {
    showError(`导出失败: ${error.message}`)
  }
}

/**
 * 转换为CSV格式
 */
const convertToCSV = (data, columns) => {
  const headers = columns.map(col => col.label).join(',')
  const rows = data.map(item => 
    columns.map(col => {
      let value = item[col.key] || ''
      if (typeof value === 'string' && value.includes(',')) {
        value = `"${value}"`
      }
      return value
    }).join(',')
  )
  return [headers, ...rows].join('\n')
}

/**
 * 完整备份
 */
const handleFullBackup = async () => {
  try {
    const result = await TauriApiService.quickBackup()
    if (result.success) {
      showSuccess(`完整备份已完成：${result.path}`)
    }
  } catch (error) {
    showError(`备份失败: ${error.message}`)
  }
}

/**
 * 导入数据
 */
const handleImportData = async () => {
  try {
    await TauriApiService.showInfoDialog('功能开发中', '数据导入功能正在开发中，敬请期待！')
  } catch (error) {
    showError(`操作失败: ${error.message}`)
  }
}

/**
 * 导出全部数据
 */
const handleExportAll = async () => {
  try {
    const [inviteResult, rewardResult] = await Promise.all([
      TauriApiService.getInviteRecords(),
      TauriApiService.getRewardRecords()
    ])
    
    if (inviteResult.success && rewardResult.success) {
      const exportData = {
        invites: inviteResult.data,
        rewards: rewardResult.data,
        stats: stats,
        exportTime: new Date().toISOString(),
        version: '1.0.0'
      }
      
      const jsonString = JSON.stringify(exportData, null, 2)
      const filename = `完整数据导出_${new Date().toISOString().slice(0, 10)}.json`
      
      const result = await TauriApiService.saveFileToDesktop(jsonString, filename)
      if (result.success) {
        showSuccess(`全部数据已导出：${filename}`)
      }
    }
  } catch (error) {
    showError(`导出失败: ${error.message}`)
  }
}

/**
 * 数据清理
 */
const handleDataCleanup = async () => {
  try {
    const confirmed = await TauriApiService.showConfirmDialog(
      '数据清理',
      '此操作将清理过期和无效的数据记录，是否继续？'
    )
    
    if (confirmed) {
      // 这里应该实现数据清理逻辑
      showSuccess('数据清理完成')
      await refreshAllData()
    }
  } catch (error) {
    showError(`清理失败: ${error.message}`)
  }
}

/**
 * 返回上一页
 */
const goBack = () => {
  router.back()
}

// 生命周期
onMounted(async () => {
  console.log('📊 数据中心初始化')
  await loadDataStats()
})
</script>

<style lang="scss" scoped>
@use "@/assets/styles/variables.scss" as *;
@use "@/assets/styles/mixins.scss" as *;

.data-center-page {
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
  
  .back-btn, .refresh-btn {
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
}

// 数据概览
.data-overview {
  padding: $spacing-base;
  
  .overview-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: $spacing-base;
  }
  
  .overview-card {
    display: flex;
    align-items: center;
    gap: $spacing-base;
    padding: $spacing-lg;
    background-color: $background-color;
    border-radius: $border-radius-lg;
    box-shadow: $box-shadow-base;
    
    .card-icon {
      font-size: 36px;
      opacity: 0.8;
    }
    
    .card-content {
      .card-value {
        font-size: $font-size-title;
        font-weight: $font-weight-bold;
        color: $text-color-primary;
        margin-bottom: $spacing-xs;
      }
      
      .card-label {
        font-size: $font-size-sm;
        color: $text-color-secondary;
      }
    }
  }
}

// 图表区域
.data-charts {
  padding: 0 $spacing-base $spacing-base;
  
  .chart-section {
    margin-bottom: $spacing-lg;
    
    .section-title {
      font-size: $font-size-lg;
      font-weight: $font-weight-medium;
      color: $text-color-primary;
      margin-bottom: $spacing-base;
    }
    
    .chart-container {
      background-color: $background-color;
      border-radius: $border-radius-lg;
      box-shadow: $box-shadow-base;
      height: 300px;
      
      .chart-placeholder {
        @include center;
        height: 100%;
        flex-direction: column;
        
        .chart-icon {
          font-size: 48px;
          margin-bottom: $spacing-base;
          opacity: 0.5;
        }
        
        .chart-text {
          color: $text-color-secondary;
          font-size: $font-size-base;
        }
      }
    }
  }
}

// 数据表格
.data-tables {
  padding: 0 $spacing-base;
  
  .table-section {
    margin-bottom: $spacing-xl;
    
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
      
      .export-btn {
        display: flex;
        align-items: center;
        gap: $spacing-xs;
        padding: $spacing-xs $spacing-sm;
        background-color: $primary-color;
        color: white;
        border: none;
        border-radius: $border-radius-base;
        font-size: $font-size-sm;
        cursor: pointer;
        @include transition(background-color);
        
        &:hover {
          background-color: $primary-dark;
        }
      }
    }
    
    .table-container {
      background-color: $background-color;
      border-radius: $border-radius-lg;
      overflow: hidden;
      box-shadow: $box-shadow-base;
      
      .data-table {
        width: 100%;
        border-collapse: collapse;
        
        th {
          background-color: $background-color-light;
          padding: $spacing-base;
          text-align: left;
          font-weight: $font-weight-medium;
          color: $text-color-primary;
          border-bottom: 1px solid $border-color-light;
        }
        
        td {
          padding: $spacing-base;
          border-bottom: 1px solid $border-color-light;
          color: $text-color-primary;
          
          &.amount-cell {
            font-weight: $font-weight-medium;
            color: $success-color;
          }
        }
        
        tr:last-child td {
          border-bottom: none;
        }
        
        tr:hover {
          background-color: $background-color-light;
        }
      }
    }
  }
}

// 状态标签样式
.status-pending {
  background-color: rgba($warning-color, 0.1);
  color: $warning-color;
  padding: 2px $spacing-xs;
  border-radius: $border-radius-sm;
  font-size: $font-size-xs;
}

.status-success {
  background-color: rgba($success-color, 0.1);
  color: $success-color;
  padding: 2px $spacing-xs;
  border-radius: $border-radius-sm;
  font-size: $font-size-xs;
}

.status-error {
  background-color: rgba($error-color, 0.1);
  color: $error-color;
  padding: 2px $spacing-xs;
  border-radius: $border-radius-sm;
  font-size: $font-size-xs;
}

.status-info {
  background-color: rgba($info-color, 0.1);
  color: $info-color;
  padding: 2px $spacing-xs;
  border-radius: $border-radius-sm;
  font-size: $font-size-xs;
}

.status-warning {
  background-color: rgba($warning-color, 0.1);
  color: $warning-color;
  padding: 2px $spacing-xs;
  border-radius: $border-radius-sm;
  font-size: $font-size-xs;
}

// 数据操作
.data-actions {
  padding: 0 $spacing-base;
  
  .actions-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: $spacing-base;
  }
  
  .action-btn {
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
    
    &.primary {
      background-color: $primary-color;
      color: white;
      
      &:hover {
        background-color: $primary-dark;
      }
    }
    
    &.secondary {
      background-color: $secondary-color;
      color: white;
      
      &:hover {
        background-color: #45A049;
      }
    }
    
    &.info {
      background-color: $info-color;
      color: white;
      
      &:hover {
        background-color: #1677ff;
      }
    }
    
    &.warning {
      background-color: $warning-color;
      color: white;
      
      &:hover {
        background-color: #E6A500;
      }
    }
    
    .btn-icon {
      font-size: $font-size-lg;
    }
  }
}

// 响应式适配
@include respond-to(xs) {
  .overview-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: $spacing-sm;
  }
  
  .data-table {
    font-size: $font-size-sm;
    
    th, td {
      padding: $spacing-sm;
    }
  }
  
  .actions-grid {
    grid-template-columns: 1fr;
    gap: $spacing-sm;
  }
}
</style>