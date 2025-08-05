<template>
  <div class="rules-page">
    <!-- 页面头部 -->
    <div class="page-header">
      <button class="back-btn" @click="goBack">←</button>
      <h1 class="page-title">奖励规则</h1>
      <div class="header-placeholder"></div>
    </div>
    
    <!-- 规则导航 -->
    <div class="rules-nav">
      <div class="nav-tabs">
        <button
          v-for="tab in ruleTabs"
          :key="tab.key"
          :class="['nav-tab', { active: activeTab === tab.key }]"
          @click="switchTab(tab.key)"
        >
          <span class="tab-icon">{{ tab.icon }}</span>
          <span class="tab-text">{{ tab.label }}</span>
        </button>
      </div>
    </div>
    
    <!-- 基础奖励规则 -->
    <div v-if="activeTab === 'basic'" class="rules-section">
      <div class="section-card">
        <div class="card-header">
          <h3 class="card-title">基础邀请奖励</h3>
          <div class="card-subtitle">邀请好友注册，双方都有奖励</div>
        </div>
        
        <div class="reward-showcase">
          <div class="showcase-item primary">
            <div class="showcase-icon">🎁</div>
            <div class="showcase-info">
              <div class="showcase-title">邀请奖励</div>
              <div class="showcase-amount">¥20</div>
              <div class="showcase-desc">好友完成注册即可获得</div>
            </div>
          </div>
          
          <div class="showcase-item success">
            <div class="showcase-icon">💝</div>
            <div class="showcase-info">
              <div class="showcase-title">新人奖励</div>
              <div class="showcase-amount">¥10</div>
              <div class="showcase-desc">新用户注册即可获得</div>
            </div>
          </div>
        </div>
        
        <div class="rules-steps">
          <div class="step-item">
            <div class="step-number">1</div>
            <div class="step-content">
              <div class="step-title">分享邀请链接</div>
              <div class="step-desc">将您的专属邀请链接分享给好友</div>
            </div>
          </div>
          
          <div class="step-item">
            <div class="step-number">2</div>
            <div class="step-content">
              <div class="step-title">好友注册成功</div>
              <div class="step-desc">好友通过链接完成注册和实名认证</div>
            </div>
          </div>
          
          <div class="step-item">
            <div class="step-number">3</div>
            <div class="step-content">
              <div class="step-title">获得奖励</div>
              <div class="step-desc">系统自动发放奖励到您的账户</div>
            </div>
          </div>
        </div>
      </div>
    </div>
    
    <!-- 等级奖励规则 -->
    <div v-if="activeTab === 'level'" class="rules-section">
      <div class="section-card">
        <div class="card-header">
          <h3 class="card-title">等级奖励体系</h3>
          <div class="card-subtitle">邀请越多，等级越高，奖励越丰厚</div>
        </div>
        
        <div class="level-system">
          <div
            v-for="level in levelRules"
            :key="level.name"
            class="level-item"
            :class="{ current: level.name === currentUserLevel }"
          >
            <div class="level-badge" :class="level.class">
              <span class="level-icon">{{ level.icon }}</span>
              <span class="level-name">{{ level.name }}</span>
            </div>
            
            <div class="level-info">
              <div class="level-requirement">
                <span class="requirement-label">邀请要求:</span>
                <span class="requirement-value">{{ level.requirement }}</span>
              </div>
              
              <div class="level-rewards">
                <div class="reward-item">
                  <span class="reward-label">单次奖励:</span>
                  <span class="reward-value">¥{{ level.baseReward }}</span>
                </div>
                <div class="reward-item">
                  <span class="reward-label">额外奖励:</span>
                  <span class="reward-value">{{ level.extraReward }}</span>
                </div>
              </div>
              
              <div class="level-privileges">
                <div class="privilege-title">专属特权:</div>
                <div class="privilege-list">
                  <div
                    v-for="privilege in level.privileges"
                    :key="privilege"
                    class="privilege-item"
                  >
                    <span class="privilege-icon">✓</span>
                    <span class="privilege-text">{{ privilege }}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    
    <!-- 活动奖励规则 -->
    <div v-if="activeTab === 'activity'" class="rules-section">
      <div class="section-card">
        <div class="card-header">
          <h3 class="card-title">活动奖励</h3>
          <div class="card-subtitle">限时活动，更多奖励等你来拿</div>
        </div>
        
        <div class="activity-list">
          <div
            v-for="activity in activityRules"
            :key="activity.id"
            class="activity-item"
            :class="{ active: activity.status === 'active' }"
          >
            <div class="activity-header">
              <div class="activity-title">{{ activity.title }}</div>
              <div :class="getActivityStatusClass(activity.status)">
                {{ getActivityStatusText(activity.status) }}
              </div>
            </div>
            
            <div class="activity-content">
              <div class="activity-desc">{{ activity.description }}</div>
              
              <div class="activity-rewards">
                <div class="reward-grid">
                  <div
                    v-for="reward in activity.rewards"
                    :key="reward.condition"
                    class="reward-card"
                  >
                    <div class="reward-condition">{{ reward.condition }}</div>
                    <div class="reward-amount">¥{{ reward.amount }}</div>
                  </div>
                </div>
              </div>
              
              <div class="activity-time">
                <div class="time-item">
                  <span class="time-label">活动时间:</span>
                  <span class="time-value">{{ activity.startTime }} - {{ activity.endTime }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    
    <!-- 常见问题 -->
    <div v-if="activeTab === 'faq'" class="rules-section">
      <div class="section-card">
        <div class="card-header">
          <h3 class="card-title">常见问题</h3>
          <div class="card-subtitle">解答您关心的问题</div>
        </div>
        
        <div class="faq-list">
          <div
            v-for="(faq, index) in faqList"
            :key="index"
            class="faq-item"
            :class="{ expanded: expandedFaq === index }"
            @click="toggleFaq(index)"
          >
            <div class="faq-question">
              <span class="question-icon">❓</span>
              <span class="question-text">{{ faq.question }}</span>
              <span class="expand-icon">{{ expandedFaq === index ? '▲' : '▼' }}</span>
            </div>
            
            <transition name="fade-slide">
              <div v-if="expandedFaq === index" class="faq-answer">
                <div class="answer-content" v-html="faq.answer"></div>
              </div>
            </transition>
          </div>
        </div>
      </div>
    </div>
    
    <!-- 重要提示 -->
    <div class="important-notice">
      <div class="notice-header">
        <span class="notice-icon">⚠️</span>
        <span class="notice-title">重要提示</span>
      </div>
      <div class="notice-content">
        <div class="notice-item">• 每个手机号只能注册一次，多次注册无效</div>
        <div class="notice-item">• 奖励将在好友完成实名认证后3个工作日内发放</div>
        <div class="notice-item">• 发现恶意刷邀请行为，将取消所有奖励</div>
        <div class="notice-item">• 活动最终解释权归平台所有</div>
      </div>
    </div>
    
    <!-- 快捷操作 -->
    <div class="quick-actions">
      <button class="action-btn primary" @click="goToInvite">
        <span class="btn-icon">🎁</span>
        <span class="btn-text">立即邀请</span>
      </button>
      <button class="action-btn secondary" @click="goToRewards">
        <span class="btn-icon">💰</span>
        <span class="btn-text">查看奖励</span>
      </button>
    </div>
  </div>
</template>

<script setup>
/**
 * 奖励规则页面
 * 展示详细的奖励规则、等级体系和常见问题
 * @author 前端工程师团队
 * @date 2024-12-XX
 */
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/stores/user'

// 路由和状态管理
const router = useRouter()
const userStore = useUserStore()

// 响应式数据
const activeTab = ref('basic')
const expandedFaq = ref(null)
const currentUserLevel = ref('新手') // 从用户信息获取

// 规则导航标签
const ruleTabs = [
  { key: 'basic', label: '基础奖励', icon: '🎁' },
  { key: 'level', label: '等级体系', icon: '🏆' },
  { key: 'activity', label: '活动奖励', icon: '🎉' },
  { key: 'faq', label: '常见问题', icon: '❓' }
]

// 等级规则配置
const levelRules = [
  {
    name: '新手',
    class: 'level-newbie',
    icon: '🌱',
    requirement: '0-9人',
    baseReward: '20',
    extraReward: '无',
    privileges: ['基础邀请奖励', '新手指导']
  },
  {
    name: '铜牌',
    class: 'level-bronze',
    icon: '🥉',
    requirement: '10-19人',
    baseReward: '25',
    extraReward: '+5元奖励',
    privileges: ['提升奖励金额', '优先客服支持', '月度抽奖资格']
  },
  {
    name: '银牌',
    class: 'level-silver',
    icon: '🥈',
    requirement: '20-49人',
    baseReward: '30',
    extraReward: '+10元奖励',
    privileges: ['更高奖励金额', '专属客服群', '季度福利活动', '提现优先处理']
  },
  {
    name: '金牌',
    class: 'level-gold',
    icon: '🥇',
    requirement: '50-99人',
    baseReward: '40',
    extraReward: '+20元奖励',
    privileges: ['最高邀请奖励', '专属客户经理', '年度颁奖典礼', '独家活动邀请']
  },
  {
    name: 'VIP',
    class: 'level-vip',
    icon: '👑',
    requirement: '100人以上',
    baseReward: '50',
    extraReward: '+30元奖励',
    privileges: ['顶级邀请奖励', '一对一专属服务', '年度分成奖励', '平台股权激励']
  }
]

// 活动规则配置
const activityRules = [
  {
    id: 1,
    title: '新年狂欢邀请赛',
    description: '新年期间邀请好友，额外奖励翻倍！邀请越多，奖励越高！',
    status: 'active',
    rewards: [
      { condition: '邀请1-5人', amount: '10' },
      { condition: '邀请6-10人', amount: '30' },
      { condition: '邀请11-20人', amount: '100' },
      { condition: '邀请21人以上', amount: '300' }
    ],
    startTime: '2024-01-01',
    endTime: '2024-01-31'
  },
  {
    id: 2,
    title: '春季邀请挑战',
    description: '春季特别活动，完成挑战任务获得超额奖励',
    status: 'upcoming',
    rewards: [
      { condition: '邀请3人', amount: '15' },
      { condition: '邀请8人', amount: '50' },
      { condition: '邀请15人', amount: '150' }
    ],
    startTime: '2024-03-01',
    endTime: '2024-03-31'
  },
  {
    id: 3,
    title: '周年庆邀请节',
    description: '平台周年庆典，邀请奖励史上最高！',
    status: 'ended',
    rewards: [
      { condition: '邀请1人', amount: '50' },
      { condition: '邀请5人', amount: '200' },
      { condition: '邀请10人', amount: '500' }
    ],
    startTime: '2023-12-01',
    endTime: '2023-12-31'
  }
]

// 常见问题配置
const faqList = [
  {
    question: '邀请奖励什么时候到账？',
    answer: '好友完成注册和实名认证后，奖励将在<strong>3个工作日内</strong>自动发放到您的账户余额中。您可以在"我的奖励"页面查看详细记录。'
  },
  {
    question: '为什么我邀请的好友没有奖励？',
    answer: '可能的原因包括：<br>• 好友未完成实名认证<br>• 好友之前已经注册过<br>• 好友未通过您的邀请链接注册<br>• 系统正在审核中，请耐心等待'
  },
  {
    question: '邀请人数有上限吗？',
    answer: '没有上限！您可以邀请无限多的好友，邀请越多，获得的奖励越多。同时您的等级也会不断提升，享受更高的单次奖励。'
  },
  {
    question: '如何提升我的邀请等级？',
    answer: '等级根据您的<strong>有效邀请人数</strong>自动提升：<br>• 新手：0-9人<br>• 铜牌：10-19人<br>• 银牌：20-49人<br>• 金牌：50-99人<br>• VIP：100人以上'
  },
  {
    question: '奖励可以提现吗？',
    answer: '当然可以！账户余额达到<strong>10元</strong>即可申请提现，支持提现到银行卡和支付宝。提现申请后1-3个工作日内到账。'
  },
  {
    question: '邀请码会过期吗？',
    answer: '邀请码和邀请链接<strong>永不过期</strong>！您可以随时分享给好友，好友任何时候通过您的链接注册都能获得奖励。'
  },
  {
    question: '发现作弊行为会怎么处理？',
    answer: '我们严厉打击各种作弊行为，包括但不限于：<br>• 虚假注册<br>• 恶意刷邀请<br>• 使用技术手段作弊<br><br>一经发现，将<strong>取消所有奖励</strong>并可能封禁账户。'
  }
]

/**
 * 切换标签
 * @param {string} tab 标签键
 */
const switchTab = (tab) => {
  activeTab.value = tab
  expandedFaq.value = null // 重置FAQ展开状态
}

/**
 * 获取活动状态样式类
 * @param {string} status 活动状态
 */
const getActivityStatusClass = (status) => {
  return [
    'activity-status',
    {
      'status-active': status === 'active',
      'status-upcoming': status === 'upcoming',
      'status-ended': status === 'ended'
    }
  ]
}

/**
 * 获取活动状态文本
 * @param {string} status 活动状态
 */
const getActivityStatusText = (status) => {
  const statusMap = {
    'active': '进行中',
    'upcoming': '即将开始',
    'ended': '已结束'
  }
  return statusMap[status] || '未知'
}

/**
 * 切换FAQ展开状态
 * @param {number} index FAQ索引
 */
const toggleFaq = (index) => {
  expandedFaq.value = expandedFaq.value === index ? null : index
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

const goToRewards = () => {
  router.push('/rewards')
}

// 生命周期
onMounted(() => {
  console.log('📋 奖励规则页面初始化')
  
  // 可以根据用户等级高亮当前等级
  // const userInfo = userStore.userInfo
  // if (userInfo?.level) {
  //   currentUserLevel.value = userInfo.level
  // }
})
</script>

<style lang="scss" scoped>
@use "@/assets/styles/variables.scss" as *;
@use "@/assets/styles/mixins.scss" as *;

.rules-page {
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

// 规则导航
.rules-nav {
  margin: $spacing-base;
  background-color: $background-color;
  border-radius: $border-radius-lg;
  padding: $spacing-xs;
  box-shadow: $box-shadow-base;
}

.nav-tabs {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: $spacing-xs;
}

.nav-tab {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: $spacing-xs;
  padding: $spacing-sm $spacing-xs;
  border: none;
  border-radius: $border-radius-base;
  background: none;
  color: $text-color-secondary;
  cursor: pointer;
  @include transition(all);
  
  &:hover {
    background-color: $background-color-light;
  }
  
  &.active {
    background-color: $primary-color;
    color: white;
  }
  
  .tab-icon {
    font-size: $font-size-lg;
  }
  
  .tab-text {
    font-size: $font-size-xs;
    font-weight: $font-weight-medium;
  }
}

// 规则区域
.rules-section {
  margin: 0 $spacing-base $spacing-base;
}

.section-card {
  background-color: $background-color;
  border-radius: $border-radius-lg;
  overflow: hidden;
  box-shadow: $box-shadow-base;
}

.card-header {
  padding: $spacing-lg;
  background: linear-gradient(135deg, $primary-color, $primary-light);
  color: white;
  text-align: center;
  
  .card-title {
    font-size: $font-size-xl;
    font-weight: $font-weight-bold;
    margin-bottom: $spacing-xs;
  }
  
  .card-subtitle {
    font-size: $font-size-sm;
    opacity: 0.9;
  }
}

// 奖励展示
.reward-showcase {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: $spacing-base;
  padding: $spacing-lg;
}

.showcase-item {
  display: flex;
  align-items: center;
  gap: $spacing-base;
  padding: $spacing-base;
  border-radius: $border-radius-lg;
  
  &.primary {
    background: linear-gradient(135deg, rgba($primary-color, 0.1), rgba($primary-color, 0.05));
    border: 1px solid rgba($primary-color, 0.2);
  }
  
  &.success {
    background: linear-gradient(135deg, rgba($success-color, 0.1), rgba($success-color, 0.05));
    border: 1px solid rgba($success-color, 0.2);
  }
  
  .showcase-icon {
    font-size: 32px;
  }
  
  .showcase-info {
    flex: 1;
    
    .showcase-title {
      font-size: $font-size-base;
      font-weight: $font-weight-medium;
      color: $text-color-primary;
      margin-bottom: $spacing-xs;
    }
    
    .showcase-amount {
      font-size: $font-size-xl;
      font-weight: $font-weight-bold;
      color: $primary-color;
      margin-bottom: $spacing-xs;
    }
    
    .showcase-desc {
      font-size: $font-size-sm;
      color: $text-color-secondary;
    }
  }
}

// 步骤流程
.rules-steps {
  padding: 0 $spacing-lg $spacing-lg;
}

.step-item {
  display: flex;
  align-items: flex-start;
  gap: $spacing-base;
  margin-bottom: $spacing-lg;
  
  &:last-child {
    margin-bottom: 0;
  }
  
  .step-number {
    width: 32px;
    height: 32px;
    @include center;
    background-color: $primary-color;
    color: white;
    border-radius: 50%;
    font-size: $font-size-sm;
    font-weight: $font-weight-bold;
    flex-shrink: 0;
  }
  
  .step-content {
    flex: 1;
    padding-top: $spacing-xs;
    
    .step-title {
      font-size: $font-size-base;
      font-weight: $font-weight-medium;
      color: $text-color-primary;
      margin-bottom: $spacing-xs;
    }
    
    .step-desc {
      font-size: $font-size-sm;
      color: $text-color-secondary;
      line-height: $line-height-base;
    }
  }
}

// 等级系统
.level-system {
  padding: $spacing-lg;
}

.level-item {
  margin-bottom: $spacing-xl;
  padding: $spacing-lg;
  border: 2px solid $border-color-light;
  border-radius: $border-radius-lg;
  @include transition(all);
  
  &:last-child {
    margin-bottom: 0;
  }
  
  &.current {
    border-color: $primary-color;
    background-color: rgba($primary-color, 0.05);
    box-shadow: 0 0 20px rgba($primary-color, 0.1);
  }
  
  .level-badge {
    display: flex;
    align-items: center;
    gap: $spacing-sm;
    margin-bottom: $spacing-base;
    
    .level-icon {
      font-size: 32px;
    }
    
    .level-name {
      font-size: $font-size-xl;
      font-weight: $font-weight-bold;
      
      .level-newbie & { color: $text-color-secondary; }
      .level-bronze & { color: #cd7f32; }
      .level-silver & { color: #c0c0c0; }
      .level-gold & { color: #ffd700; }
      .level-vip & { color: #ff6b35; }
    }
  }
  
  .level-info {
    .level-requirement {
      display: flex;
      justify-content: space-between;
      margin-bottom: $spacing-base;
      
      .requirement-label {
        color: $text-color-secondary;
      }
      
      .requirement-value {
        font-weight: $font-weight-medium;
        color: $text-color-primary;
      }
    }
    
    .level-rewards {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: $spacing-base;
      margin-bottom: $spacing-base;
      
      .reward-item {
        display: flex;
        justify-content: space-between;
        padding: $spacing-sm;
        background-color: $background-color-light;
        border-radius: $border-radius-base;
        
        .reward-label {
          font-size: $font-size-sm;
          color: $text-color-secondary;
        }
        
        .reward-value {
          font-size: $font-size-sm;
          font-weight: $font-weight-medium;
          color: $success-color;
        }
      }
    }
    
    .level-privileges {
      .privilege-title {
        font-size: $font-size-base;
        font-weight: $font-weight-medium;
        color: $text-color-primary;
        margin-bottom: $spacing-sm;
      }
      
      .privilege-list {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        gap: $spacing-xs;
        
        .privilege-item {
          display: flex;
          align-items: center;
          gap: $spacing-xs;
          
          .privilege-icon {
            color: $success-color;
            font-weight: $font-weight-bold;
          }
          
          .privilege-text {
            font-size: $font-size-sm;
            color: $text-color-secondary;
          }
        }
      }
    }
  }
}

// 活动列表
.activity-list {
  padding: $spacing-lg;
}

.activity-item {
  margin-bottom: $spacing-lg;
  padding: $spacing-lg;
  border: 1px solid $border-color-light;
  border-radius: $border-radius-lg;
  @include transition(all);
  
  &:last-child {
    margin-bottom: 0;
  }
  
  &.active {
    border-color: $success-color;
    background-color: rgba($success-color, 0.05);
  }
  
  .activity-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: $spacing-base;
    
    .activity-title {
      font-size: $font-size-lg;
      font-weight: $font-weight-bold;
      color: $text-color-primary;
    }
  }
  
  .activity-content {
    .activity-desc {
      font-size: $font-size-base;
      color: $text-color-secondary;
      line-height: $line-height-base;
      margin-bottom: $spacing-base;
    }
    
    .activity-rewards {
      margin-bottom: $spacing-base;
      
      .reward-grid {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        gap: $spacing-sm;
        
        .reward-card {
          padding: $spacing-sm;
          background-color: $background-color-light;
          border-radius: $border-radius-base;
          text-align: center;
          
          .reward-condition {
            font-size: $font-size-sm;
            color: $text-color-secondary;
            margin-bottom: $spacing-xs;
          }
          
          .reward-amount {
            font-size: $font-size-base;
            font-weight: $font-weight-bold;
            color: $primary-color;
          }
        }
      }
    }
    
    .activity-time {
      .time-item {
        display: flex;
        justify-content: space-between;
        
        .time-label {
          font-size: $font-size-sm;
          color: $text-color-secondary;
        }
        
        .time-value {
          font-size: $font-size-sm;
          color: $text-color-primary;
        }
      }
    }
  }
}

.activity-status {
  padding: $spacing-xs $spacing-sm;
  border-radius: $border-radius-base;
  font-size: $font-size-sm;
  font-weight: $font-weight-medium;
  
  &.status-active {
    background-color: rgba($success-color, 0.1);
    color: $success-color;
  }
  
  &.status-upcoming {
    background-color: rgba($warning-color, 0.1);
    color: $warning-color;
  }
  
  &.status-ended {
    background-color: rgba($text-color-disabled, 0.1);
    color: $text-color-disabled;
  }
}

// FAQ列表
.faq-list {
  padding: $spacing-lg;
}

.faq-item {
  margin-bottom: $spacing-base;
  border: 1px solid $border-color-light;
  border-radius: $border-radius-lg;
  overflow: hidden;
  @include transition(all);
  
  &:last-child {
    margin-bottom: 0;
  }
  
  &.expanded {
    border-color: $primary-color;
    box-shadow: 0 0 10px rgba($primary-color, 0.1);
  }
  
  .faq-question {
    display: flex;
    align-items: center;
    gap: $spacing-sm;
    padding: $spacing-base $spacing-lg;
    cursor: pointer;
    @include transition(background-color);
    
    &:hover {
      background-color: $background-color-light;
    }
    
    .question-icon {
      font-size: $font-size-lg;
    }
    
    .question-text {
      flex: 1;
      font-size: $font-size-base;
      font-weight: $font-weight-medium;
      color: $text-color-primary;
    }
    
    .expand-icon {
      color: $text-color-disabled;
      @include transition(transform);
    }
  }
  
  .faq-answer {
    padding: 0 $spacing-lg $spacing-base;
    
    .answer-content {
      font-size: $font-size-sm;
      color: $text-color-secondary;
      line-height: $line-height-lg;
      
      :deep(strong) {
        color: $text-color-primary;
        font-weight: $font-weight-bold;
      }
      
      :deep(br) {
        margin-bottom: $spacing-xs;
      }
    }
  }
}

// 重要提示
.important-notice {
  margin: $spacing-base;
  padding: $spacing-lg;
  background-color: rgba($warning-color, 0.05);
  border: 1px solid rgba($warning-color, 0.2);
  border-radius: $border-radius-lg;
  
  .notice-header {
    display: flex;
    align-items: center;
    gap: $spacing-sm;
    margin-bottom: $spacing-base;
    
    .notice-title {
      font-size: $font-size-base;
      font-weight: $font-weight-bold;
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

// 动画
.fade-slide-enter-active,
.fade-slide-leave-active {
  transition: all 0.3s ease;
}

.fade-slide-enter-from,
.fade-slide-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}

// 移动端适配
@include respond-to(xs) {
  .nav-tabs {
    grid-template-columns: repeat(2, 1fr);
    gap: $spacing-xs;
  }
  
  .nav-tab {
    .tab-icon {
      font-size: $font-size-base;
    }
    
    .tab-text {
      font-size: 10px;
    }
  }
  
  .reward-showcase {
    grid-template-columns: 1fr;
    gap: $spacing-sm;
  }
  
  .showcase-item {
    .showcase-icon {
      font-size: 24px;
    }
    
    .showcase-amount {
      font-size: $font-size-lg;
    }
  }
  
  .level-rewards {
    grid-template-columns: 1fr !important;
  }
  
  .level-privileges {
    .privilege-list {
      grid-template-columns: 1fr !important;
    }
  }
  
  .reward-grid {
    grid-template-columns: 1fr !important;
  }
  
  .quick-actions {
    flex-direction: column;
    gap: $spacing-sm;
  }
}
</style>