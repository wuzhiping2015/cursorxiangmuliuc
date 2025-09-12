<template>
  <section class="py-20 bg-gradient-to-br from-blue-600 via-purple-600 to-cyan-600 text-white relative overflow-hidden">
    <!-- 背景装饰 -->
    <div class="absolute inset-0">
      <!-- 动态网格背景 -->
      <div class="absolute inset-0 bg-mesh-pattern opacity-20"></div>
      
      <!-- 浮动几何形状 -->
      <div class="absolute top-20 left-20 w-32 h-32 bg-white/10 rounded-full blur-xl animate-float"></div>
      <div class="absolute top-40 right-32 w-24 h-24 bg-cyan-300/20 rounded-lg rotate-45 animate-float" style="animation-delay: 1s;"></div>
      <div class="absolute bottom-32 left-32 w-40 h-40 bg-purple-400/15 rounded-full blur-2xl animate-float" style="animation-delay: 2s;"></div>
      <div class="absolute bottom-20 right-20 w-28 h-28 bg-blue-300/25 rounded-lg rotate-12 animate-float" style="animation-delay: 3s;"></div>

      <!-- 光效渐变 -->
      <div class="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent transform skew-y-3"></div>
    </div>

    <div class="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- 主要CTA区域 -->
      <div class="text-center mb-16 animate-on-scroll">
        <div class="inline-flex items-center space-x-2 bg-white/20 backdrop-blur-sm text-blue-100 px-4 py-2 rounded-full text-sm font-medium mb-6">
          <Icon name="heroicons:rocket-launch" class="w-4 h-4" />
          <span>开启AI协作之旅</span>
        </div>
        
        <h2 class="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
          准备好让AI<br/>
          <span class="text-gradient-light">改变你的开发方式</span>了吗？
        </h2>
        
        <p class="text-xl sm:text-2xl text-blue-100 mb-8 max-w-4xl mx-auto leading-relaxed">
          加入<strong class="text-cyan-300">25,000+</strong>名前端工程师，
          开始你的AI辅助开发实践，体验<strong class="text-cyan-300">68%</strong>的效率提升！
        </p>

        <!-- 主要行动按钮 -->
        <div class="flex flex-col sm:flex-row gap-4 justify-center mb-12">
          <Button 
            @click="startJourney"
            size="large"
            class="btn-cta-primary !px-10 !py-5 !text-xl !font-bold transform hover:scale-105 transition-all duration-300"
          >
            <Icon name="heroicons:play" class="w-6 h-6 mr-3" />
            立即开始AI工作流
            <Icon name="heroicons:arrow-right" class="w-5 h-5 ml-3" />
          </Button>
          
          <Button 
            @click="watchDemo"
            outlined
            size="large"
            class="btn-cta-secondary !px-10 !py-5 !text-xl !font-bold !border-2 !border-white/50 !text-white hover:!bg-white/10 transform hover:scale-105 transition-all duration-300"
          >
            <Icon name="heroicons:play-circle" class="w-6 h-6 mr-3" />
            观看演示视频
          </Button>
        </div>

        <!-- 信任指标 -->
        <div class="flex flex-wrap justify-center items-center gap-8 text-blue-100">
          <div class="flex items-center space-x-2">
            <Icon name="heroicons:star" class="w-5 h-5 text-yellow-300" />
            <span class="font-semibold">4.9/5.0 评分</span>
          </div>
          <div class="flex items-center space-x-2">
            <Icon name="heroicons:users" class="w-5 h-5 text-green-300" />
            <span class="font-semibold">25,000+ 用户</span>
          </div>
          <div class="flex items-center space-x-2">
            <Icon name="heroicons:shield-check" class="w-5 h-5 text-blue-300" />
            <span class="font-semibold">滴滴工程师验证</span>
          </div>
        </div>
      </div>

      <!-- 多种参与方式 -->
      <div class="grid md:grid-cols-3 gap-8 mb-16">
        <div
          v-for="(option, index) in ctaOptions"
          :key="option.id"
          class="group animate-on-scroll bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-8 hover:bg-white/15 transition-all duration-300 text-center"
          :style="{ animationDelay: `${index * 200}ms` }"
        >
          <!-- 选项图标 -->
          <div :class="[
            'w-16 h-16 mx-auto mb-6 rounded-2xl flex items-center justify-center relative group-hover:scale-110 transition-transform duration-300',
            option.iconBg
          ]">
            <Icon :name="option.icon" class="w-8 h-8 text-white" />
            
            <!-- 图标光效 -->
            <div class="absolute inset-0 rounded-2xl bg-gradient-to-r from-transparent via-white/30 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
          </div>

          <!-- 选项标题和描述 -->
          <h3 class="text-xl font-bold mb-4 group-hover:text-cyan-300 transition-colors">
            {{ option.title }}
          </h3>
          <p class="text-blue-100 mb-6 leading-relaxed">
            {{ option.description }}
          </p>

          <!-- 特色亮点 -->
          <div class="space-y-2 mb-6">
            <div
              v-for="feature in option.features"
              :key="feature"
              class="flex items-center justify-center space-x-2 text-sm"
            >
              <Icon name="heroicons:check" class="w-4 h-4 text-green-300 flex-shrink-0" />
              <span class="text-blue-100">{{ feature }}</span>
            </div>
          </div>

          <!-- 行动按钮 -->
          <Button 
            @click="selectOption(option)"
            :class="[
              'w-full !py-3 !text-sm !font-semibold transition-all duration-300',
              option.primary 
                ? 'btn-cta-primary hover:scale-105' 
                : 'btn-cta-outline hover:!bg-white/20'
            ]"
          >
            <Icon :name="option.buttonIcon" class="w-4 h-4 mr-2" />
            {{ option.buttonText }}
          </Button>
        </div>
      </div>

      <!-- 紧迫感和最终推动 -->
      <div class="text-center animate-on-scroll">
        <div class="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-8 max-w-4xl mx-auto">
          <div class="flex items-center justify-center space-x-4 mb-6">
            <Icon name="heroicons:clock" class="w-6 h-6 text-yellow-300" />
            <span class="text-lg font-semibold text-yellow-300">限时机会</span>
          </div>
          
          <h3 class="text-2xl sm:text-3xl font-bold mb-4">
            抢先体验AI开发革命
          </h3>
          <p class="text-blue-100 mb-6 text-lg">
            前<strong class="text-cyan-300">1000</strong>名用户可免费获得价值<strong class="text-cyan-300">¥2,999</strong>的
            《AI前端开发完整实践手册》和专属社群邀请！
          </p>

          <!-- 倒计时或进度条 -->
          <div class="mb-6">
            <div class="flex items-center justify-between text-sm text-blue-200 mb-2">
              <span>已有 {{ currentUsers }} 人加入</span>
              <span>仅剩 {{ remainingSlots }} 个名额</span>
            </div>
            <div class="w-full bg-white/20 rounded-full h-3">
              <div 
                class="bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 h-3 rounded-full transition-all duration-500 relative overflow-hidden"
                :style="{ width: `${progressPercent}%` }"
              >
                <div class="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent transform skew-x-12 animate-shimmer"></div>
              </div>
            </div>
          </div>

          <!-- 最终CTA -->
          <div class="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              @click="claimOffer"
              size="large"
              class="btn-cta-urgent !px-12 !py-5 !text-xl !font-bold transform hover:scale-105 transition-all duration-300 relative overflow-hidden"
            >
              <div class="relative z-10 flex items-center">
                <Icon name="heroicons:gift" class="w-6 h-6 mr-3" />
                立即领取限时福利
                <Icon name="heroicons:sparkles" class="w-5 h-5 ml-3" />
              </div>
              <div class="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
            </Button>
            
            <Button 
              @click="learnMore"
              text
              size="large"
              class="!text-blue-200 hover:!text-white !px-6 !py-5 !text-lg underline-offset-4 hover:underline"
            >
              了解更多详情
            </Button>
          </div>

          <!-- 保证说明 -->
          <div class="flex flex-wrap justify-center items-center gap-6 mt-8 text-sm text-blue-200">
            <div class="flex items-center space-x-2">
              <Icon name="heroicons:shield-check" class="w-4 h-4 text-green-300" />
              <span>30天无条件退款</span>
            </div>
            <div class="flex items-center space-x-2">
              <Icon name="heroicons:lock-closed" class="w-4 h-4 text-blue-300" />
              <span>数据安全保证</span>
            </div>
            <div class="flex items-center space-x-2">
              <Icon name="heroicons:heart" class="w-4 h-4 text-red-300" />
              <span>用户满意度98%</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
/**
 * 行动号召区块组件
 * 引导用户采取行动，开始AI辅助开发之旅
 */

// 响应式数据
const currentUsers = ref(24156)
const totalSlots = ref(25000)

// 计算属性
const remainingSlots = computed(() => totalSlots.value - currentUsers.value)
const progressPercent = computed(() => (currentUsers.value / totalSlots.value) * 100)

// CTA选项数据
const ctaOptions = [
  {
    id: 'beginner',
    title: '新手入门',
    description: '零基础开始学习AI辅助开发，从基础概念到实战应用的完整路径。',
    icon: 'heroicons:academic-cap',
    iconBg: 'bg-gradient-to-br from-green-500 to-emerald-600',
    features: [
      '7天免费试用期',
      '新手专属教程',
      '24/7 在线支持'
    ],
    buttonText: '开始免费学习',
    buttonIcon: 'heroicons:play',
    primary: false
  },
  {
    id: 'professional',
    title: '专业提升',
    description: '适合有经验的开发者，深度学习AI工作流，掌握高级应用技巧。',
    icon: 'heroicons:rocket-launch',
    iconBg: 'bg-gradient-to-br from-blue-500 to-indigo-600',
    features: [
      '完整工具库访问',
      '实战项目案例',
      '专家一对一指导'
    ],
    buttonText: '立即升级',
    buttonIcon: 'heroicons:arrow-up',
    primary: true
  },
  {
    id: 'enterprise',
    title: '团队合作',
    description: '为团队和企业提供定制化AI开发解决方案，批量培训和实施指导。',
    icon: 'heroicons:users',
    iconBg: 'bg-gradient-to-br from-purple-500 to-pink-600',
    features: [
      '团队协作工具',
      '定制化培训',
      '企业级技术支持'
    ],
    buttonText: '咨询方案',
    buttonIcon: 'heroicons:chat-bubble-left-right',
    primary: false
  }
]

// 方法
const startJourney = () => {
  navigateTo('/get-started')
}

const watchDemo = () => {
  // 打开演示视频
  window.open('https://youtube.com/watch?v=demo', '_blank')
}

const selectOption = (option: any) => {
  console.log('选择方案:', option.title)
  
  switch (option.id) {
    case 'beginner':
      navigateTo('/get-started/beginner')
      break
    case 'professional':
      navigateTo('/get-started/professional')
      break
    case 'enterprise':
      navigateTo('/contact/enterprise')
      break
    default:
      navigateTo('/get-started')
  }
}

const claimOffer = () => {
  console.log('领取限时福利')
  navigateTo('/claim-offer')
}

const learnMore = () => {
  navigateTo('/about')
}

// 模拟用户数增长
onMounted(() => {
  const interval = setInterval(() => {
    if (currentUsers.value < totalSlots.value - 100) {
      currentUsers.value += Math.floor(Math.random() * 3) + 1
    }
  }, 5000)

  onUnmounted(() => {
    clearInterval(interval)
  })
})
</script>

<style scoped>
/**
 * 行动号召区块组件样式
 */

/* 渐变文字效果 - 适用于深色背景 */
.text-gradient-light {
  background: linear-gradient(135deg, #fbbf24 0%, #f59e0b 50%, #d97706 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  animation: textShine 2s ease-in-out infinite alternate;
}

@keyframes textShine {
  0% { filter: brightness(1); }
  100% { filter: brightness(1.2); }
}

/* 主要CTA按钮样式 */
.btn-cta-primary {
  background: linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%);
  @apply text-gray-900 font-bold shadow-2xl;
  position: relative;
  overflow: hidden;
}

.btn-cta-primary:hover {
  background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%);
  box-shadow: 0 25px 50px -12px rgba(251, 191, 36, 0.5);
}

.btn-cta-primary::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent);
  transition: left 0.7s;
}

.btn-cta-primary:hover::before {
  left: 100%;
}

/* 次要CTA按钮样式 */
.btn-cta-secondary {
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
}

/* 轮廓CTA按钮样式 */
.btn-cta-outline {
  @apply !border-white/50 !text-white;
  backdrop-filter: blur(10px);
}

/* 紧急CTA按钮样式 */
.btn-cta-urgent {
  background: linear-gradient(135deg, #ef4444 0%, #dc2626 50%, #b91c1c 100%);
  @apply text-white font-bold shadow-2xl;
  animation: urgentPulse 2s ease-in-out infinite;
}

@keyframes urgentPulse {
  0%, 100% { 
    box-shadow: 0 25px 50px -12px rgba(239, 68, 68, 0.5); 
  }
  50% { 
    box-shadow: 0 25px 50px -12px rgba(239, 68, 68, 0.8); 
    transform: translateY(-2px);
  }
}

/* 浮动动画 */
.animate-float {
  animation: ctaFloat 6s ease-in-out infinite;
}

@keyframes ctaFloat {
  0%, 100% { 
    transform: translate(0, 0) rotate(0deg); 
  }
  25% { 
    transform: translate(15px, -20px) rotate(5deg); 
  }
  50% { 
    transform: translate(-10px, -35px) rotate(-3deg); 
  }
  75% { 
    transform: translate(-20px, -15px) rotate(2deg); 
  }
}

/* 滚动动画 */
.animate-on-scroll {
  opacity: 0;
  transform: translateY(50px);
  transition: all 1s ease-out;
}

.animate-on-scroll.animate-fade-in {
  opacity: 1;
  transform: translateY(0);
}

/* 闪光动画 */
.animate-shimmer {
  animation: shimmer 2s infinite;
}

@keyframes shimmer {
  0% { transform: translateX(-100%) skewX(45deg); }
  100% { transform: translateX(200%) skewX(45deg); }
}

/* 网格背景 */
.bg-mesh-pattern {
  background-image: radial-gradient(circle at 30px 30px, rgba(255,255,255,0.3) 2px, transparent 0);
  background-size: 60px 60px;
}

/* 毛玻璃效果 */
.backdrop-blur-sm {
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
}

/* 渐变动画背景 */
.bg-gradient-to-br {
  background-size: 300% 300%;
  animation: gradientShift 10s ease infinite;
}

@keyframes gradientShift {
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}

/* 进度条光效 */
.bg-gradient-to-r {
  position: relative;
  overflow: hidden;
}

/* 响应式优化 */
@media (max-width: 1024px) {
  .grid.md\:grid-cols-3 {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
}

@media (max-width: 768px) {
  .text-4xl.sm\:text-5xl.lg\:text-6xl {
    font-size: 2.5rem;
    line-height: 1.1;
  }
  
  .text-xl.sm\:text-2xl {
    font-size: 1.25rem;
  }
  
  .flex.flex-col.sm\:flex-row {
    flex-direction: column;
    gap: 1rem;
  }
  
  .p-8 {
    padding: 1.5rem;
  }
  
  .!px-10 {
    padding-left: 2rem !important;
    padding-right: 2rem !important;
  }
  
  .!text-xl {
    font-size: 1.125rem !important;
  }
  
  .flex.flex-wrap {
    flex-direction: column;
    gap: 1rem;
  }
}

@media (max-width: 640px) {
  .!px-12 {
    padding-left: 1.5rem !important;
    padding-right: 1.5rem !important;
  }
}

/* 无障碍优化 */
button:focus {
  outline: 3px solid #fbbf24;
  outline-offset: 2px;
}

/* 高对比度优化 */
@media (prefers-contrast: high) {
  .bg-white\/10 {
    background-color: rgba(255, 255, 255, 0.2);
  }
  
  .border-white\/20 {
    border-color: rgba(255, 255, 255, 0.4);
  }
  
  .text-blue-100 {
    color: #ffffff;
  }
}

/* 减少动画对于偏好减少动效的用户 */
@media (prefers-reduced-motion: reduce) {
  .animate-float,
  .animate-shimmer,
  .text-gradient-light,
  .btn-cta-urgent,
  .animate-on-scroll,
  .transition-all,
  .transition-transform,
  .bg-gradient-to-br,
  .btn-cta-primary::before,
  .btn-cta-primary:hover::before {
    animation: none !important;
    transition: none !important;
    transform: none !important;
  }
}

/* 打印样式优化 */
@media print {
  .bg-gradient-to-br {
    background: #3b82f6 !important;
    color: white !important;
  }
  
  button {
    border: 2px solid #000 !important;
    background: white !important;
    color: #000 !important;
  }
}
</style>