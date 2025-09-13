<template>
  <section class="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-purple-900">
    <!-- 背景装饰 -->
    <div class="absolute inset-0 overflow-hidden">
      <!-- 动态网格背景 -->
      <div class="absolute inset-0 bg-mesh-pattern opacity-30"></div>
      
      <!-- 浮动元素 -->
      <div class="absolute top-20 left-10 w-20 h-20 bg-blue-500/20 rounded-full animate-float"></div>
      <div class="absolute top-40 right-20 w-16 h-16 bg-purple-500/20 rounded-full animate-float" style="animation-delay: 1s;"></div>
      <div class="absolute bottom-40 left-20 w-12 h-12 bg-cyan-500/20 rounded-full animate-float" style="animation-delay: 2s;"></div>
      
      <!-- AI 线条装饰 -->
      <div class="absolute inset-0 opacity-10">
        <svg class="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" style="stop-color:#3b82f6;stop-opacity:1" />
              <stop offset="100%" style="stop-color:#8b5cf6;stop-opacity:1" />
            </linearGradient>
          </defs>
          <path 
            d="M0,300 Q200,200 400,250 T800,200 L800,0 L0,0 Z" 
            fill="url(#lineGradient)" 
            class="animate-pulse-slow"
          />
        </svg>
      </div>
    </div>

    <!-- 主要内容 -->
    <div class="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="grid lg:grid-cols-2 gap-12 items-center">
        <!-- 左侧文字内容 -->
        <div class="text-center lg:text-left space-y-8 animate-fade-in">
          <!-- 标签 -->
          <div class="inline-flex items-center space-x-2 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-200 px-4 py-2 rounded-full text-sm font-medium">
            <Icon name="mdi:robot" class="w-4 h-4" />
            <span>AI驱动的前端工程师</span>
          </div>

          <!-- 主标题 -->
          <h1 class="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white leading-tight">
            将
            <span class="text-gradient-ai">AI融入</span>
            <br />
            前端开发工作流
          </h1>

          <!-- 副标题 -->
          <p class="text-xl text-gray-600 dark:text-gray-300 max-w-2xl">
            从<strong>"代码实现者"</strong>转变为<strong>"AI协作者"</strong>，
            基于滴滴工程师实践经验，分享
            <span class="text-blue-600 dark:text-blue-400 font-semibold">308+精选AI工具</span>
            和工作流优化方法，让开发效率倍增。
          </p>

          <!-- 核心数据展示 -->
          <div class="flex flex-wrap justify-center lg:justify-start gap-6 text-center">
            <div class="bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-lg p-4 min-w-[120px]">
              <div class="text-2xl font-bold text-blue-600 dark:text-blue-400">308+</div>
              <div class="text-sm text-gray-600 dark:text-gray-400">AI工具</div>
            </div>
            <div class="bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-lg p-4 min-w-[120px]">
              <div class="text-2xl font-bold text-purple-600 dark:text-purple-400">6大</div>
              <div class="text-sm text-gray-600 dark:text-gray-400">应用场景</div>
            </div>
            <div class="bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-lg p-4 min-w-[120px]">
              <div class="text-2xl font-bold text-cyan-600 dark:text-cyan-400">3倍+</div>
              <div class="text-sm text-gray-600 dark:text-gray-400">效率提升</div>
            </div>
          </div>

          <!-- 行动按钮 -->
          <div class="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
            <Button 
              @click="scrollToWorkflow"
              class="btn-ai-gradient !px-8 !py-4 !text-lg !font-semibold"
              size="large"
            >
              <Icon name="heroicons:play" class="w-5 h-5 mr-2" />
              探索AI工作流
            </Button>
            
            <Button 
              @click="navigateToTools"
              severity="secondary"
              outlined
              class="!px-8 !py-4 !text-lg !font-semibold !border-2"
              size="large"
            >
              <Icon name="mdi:robot" class="w-5 h-5 mr-2" />
              查看AI工具库
            </Button>
          </div>

          <!-- 滴滴实践标识 -->
          <div class="flex items-center justify-center lg:justify-start space-x-2 text-sm text-gray-500 dark:text-gray-400">
            <Icon name="heroicons:check-badge" class="w-5 h-5 text-green-500" />
            <span>基于滴滴前端工程师实践经验</span>
          </div>
        </div>

        <!-- 右侧可视化内容 -->
        <div class="relative animate-slide-up">
          <!-- AI 工作流可视化 -->
          <div class="relative">
            <!-- 中心 AI 大脑 -->
            <div class="relative z-10 w-48 h-48 mx-auto">
              <div class="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full animate-pulse-slow"></div>
              <div class="absolute inset-2 bg-white dark:bg-gray-800 rounded-full flex items-center justify-center">
                <Icon name="mdi:brain" class="w-20 h-20 text-gradient-ai" />
              </div>
              
              <!-- 围绕的工具图标 -->
              <div 
                v-for="(tool, index) in aiTools" 
                :key="tool.name"
                class="absolute w-12 h-12 bg-white dark:bg-gray-700 rounded-full shadow-lg flex items-center justify-center animate-float"
                :style="getToolPosition(index, aiTools.length)"
                :class="`animation-delay-${index}`"
              >
                <Icon :name="tool.icon" class="w-6 h-6 text-blue-600 dark:text-blue-400" />
              </div>
            </div>

            <!-- 连接线动画 -->
            <div class="absolute inset-0 opacity-30">
              <svg class="w-full h-full" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <linearGradient id="connectionGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" style="stop-color:#3b82f6;stop-opacity:0.8" />
                    <stop offset="100%" style="stop-color:#8b5cf6;stop-opacity:0.8" />
                  </linearGradient>
                </defs>
                <circle 
                  cx="50%" 
                  cy="50%" 
                  r="100" 
                  fill="none" 
                  stroke="url(#connectionGradient)" 
                  stroke-width="2" 
                  stroke-dasharray="10,5"
                  class="animate-spin-slow"
                />
              </svg>
            </div>
          </div>

          <!-- 效率提升指示器 -->
          <div class="mt-8 text-center">
            <div class="inline-flex items-center space-x-2 bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-200 px-4 py-2 rounded-full text-sm font-medium">
              <Icon name="heroicons:arrow-trending-up" class="w-4 h-4" />
              <span>开发效率提升 300%+</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 滚动提示 -->
    <div class="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
      <Button 
        @click="scrollToNext"
        text
        rounded
        class="!p-3"
        v-tooltip.top="'向下滚动了解更多'"
      >
        <Icon name="heroicons:chevron-down" class="w-6 h-6 text-gray-500 dark:text-gray-400" />
      </Button>
    </div>
  </section>
</template>

<script setup lang="ts">
/**
 * 首页英雄区块组件
 * 展示个人介绍、AI工作流理念和核心价值
 */

// AI 工具数据
const aiTools = [
  { name: 'ChatGPT', icon: 'simple-icons:openai' },
  { name: 'Claude', icon: 'simple-icons:anthropic' },
  { name: 'Cursor', icon: 'mdi:cursor-default' },
  { name: 'GitHub Copilot', icon: 'mdi:github' },
  { name: 'Perplexity', icon: 'mdi:magnify' },
  { name: 'AI Search', icon: 'mdi:robot' }
]

// 计算工具图标位置
const getToolPosition = (index: number, total: number) => {
  const angle = (360 / total) * index
  const radius = 120
  const x = 50 + radius * Math.cos((angle * Math.PI) / 180)
  const y = 50 + radius * Math.sin((angle * Math.PI) / 180)
  
  return {
    left: `${x}%`,
    top: `${y}%`,
    transform: 'translate(-50%, -50%)',
    animationDelay: `${index * 0.2}s`
  }
}

// 方法
const scrollToWorkflow = () => {
  const workflowSection = document.querySelector('#workflow-section')
  if (workflowSection) {
    workflowSection.scrollIntoView({ behavior: 'smooth' })
  }
}

const scrollToNext = () => {
  const nextSection = document.querySelector('section:nth-child(2)')
  if (nextSection) {
    nextSection.scrollIntoView({ behavior: 'smooth' })
  }
}

const navigateToTools = () => {
  navigateTo('/tools')
}

// 动画延迟样式
const animationDelayClasses = computed(() => {
  const classes: Record<string, string> = {}
  for (let i = 0; i < aiTools.length; i++) {
    classes[`animation-delay-${i}`] = `animation-delay: ${i * 200}ms;`
  }
  return classes
})
</script>

<style scoped>
/**
 * 英雄区块样式
 */

/* 动画延迟类 */
.animation-delay-0 { animation-delay: 0ms; }
.animation-delay-1 { animation-delay: 200ms; }
.animation-delay-2 { animation-delay: 400ms; }
.animation-delay-3 { animation-delay: 600ms; }
.animation-delay-4 { animation-delay: 800ms; }
.animation-delay-5 { animation-delay: 1000ms; }

/* 渐变文字效果 */
.text-gradient-ai {
  background: linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

/* AI 按钮渐变效果 */
.btn-ai-gradient {
  background: linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%);
  @apply text-white font-semibold transform hover:scale-105 transition-all duration-300 hover:shadow-xl;
}

.btn-ai-gradient:hover {
  background: linear-gradient(135deg, #2563eb 0%, #7c3aed 100%);
  box-shadow: 0 20px 25px -5px rgba(59, 130, 246, 0.4);
}

/* 浮动动画 */
@keyframes float {
  0%, 100% { 
    transform: translateY(0px) translate(-50%, -50%); 
  }
  50% { 
    transform: translateY(-10px) translate(-50%, -50%); 
  }
}

/* 脉冲动画 */
@keyframes pulse-slow {
  0%, 100% { 
    opacity: 1; 
  }
  50% { 
    opacity: 0.7; 
  }
}

/* 旋转动画 */
@keyframes spin-slow {
  from { 
    transform: rotate(0deg); 
  }
  to { 
    transform: rotate(360deg); 
  }
}

.animate-pulse-slow {
  animation: pulse-slow 3s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}

.animate-spin-slow {
  animation: spin-slow 10s linear infinite;
}

/* 响应式优化 */
@media (max-width: 1024px) {
  .grid {
    grid-template-columns: 1fr;
    gap: 3rem;
  }
}

@media (max-width: 640px) {
  h1 {
    font-size: 2.5rem;
    line-height: 1.2;
  }
  
  .btn-ai-gradient,
  .btn-secondary {
    width: 100%;
    justify-content: center;
  }
}

/* 深色模式优化 */
.dark .bg-mesh-pattern {
  opacity: 0.1;
}

/* 可访问性优化 */
@media (prefers-reduced-motion: reduce) {
  .animate-float,
  .animate-pulse-slow,
  .animate-spin-slow,
  .animate-bounce {
    animation: none;
  }
}

/* 渐变背景动画 */
.gradient-bg {
  background-size: 400% 400%;
  animation: gradientShift 8s ease infinite;
}

@keyframes gradientShift {
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}
</style>
