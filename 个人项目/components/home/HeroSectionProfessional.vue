<template>
  <section class="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-gray-900 dark:via-slate-800 dark:to-indigo-900">
    <!-- 专业背景装饰 -->
    <div class="absolute inset-0 overflow-hidden">
      <!-- 代码网格背景 -->
      <div class="absolute inset-0 bg-code-pattern opacity-5"></div>
      
      <!-- 技术栈浮动图标 -->
      <div class="absolute inset-0">
        <div 
          v-for="(tech, index) in techStack" 
          :key="tech.name"
          class="absolute opacity-10 animate-float"
          :style="getTechPosition(index)"
        >
          <Icon :name="tech.icon" :class="`w-${tech.size} h-${tech.size} text-${tech.color}`" />
        </div>
      </div>
      
      <!-- 专业光效 -->
      <div class="absolute inset-0 bg-gradient-to-r from-transparent via-blue-500/5 to-transparent transform skew-y-1"></div>
    </div>

    <!-- 主要内容 -->
    <div class="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="grid lg:grid-cols-12 gap-8 items-center">
        <!-- 左侧：专业介绍 (8列) -->
        <div class="lg:col-span-8 space-y-8">
          <!-- 专业标识 -->
          <div class="flex flex-wrap items-center gap-3">
            <div class="inline-flex items-center space-x-2 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-200 px-4 py-2 rounded-lg text-sm font-medium">
              <Icon name="heroicons:code-bracket" class="w-4 h-4" />
              <span>Senior Frontend Engineer</span>
            </div>
            <div class="inline-flex items-center space-x-2 bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-200 px-4 py-2 rounded-lg text-sm font-medium">
              <Icon name="heroicons:cpu-chip" class="w-4 h-4" />
              <span>AI Integration Specialist</span>
            </div>
          </div>

          <!-- 核心价值主标题 -->
          <div class="space-y-4">
            <h1 class="text-5xl sm:text-6xl lg:text-7xl font-bold text-slate-900 dark:text-white leading-tight">
              构建
              <span class="text-gradient-tech">企业级</span>
              <br />
              前端解决方案
            </h1>
            <div class="flex items-center space-x-2 text-2xl text-slate-600 dark:text-slate-300">
              <Icon name="heroicons:plus" class="w-6 h-6" />
              <span class="font-semibold text-gradient-ai">AI工作流优化</span>
            </div>
          </div>

          <!-- 专业描述 -->
          <p class="text-xl text-slate-600 dark:text-slate-300 max-w-3xl leading-relaxed">
            <strong class="text-slate-800 dark:text-slate-200">8年+企业级前端开发经验</strong>，专注于高性能Web应用架构设计与AI工具深度整合。
            曾在滴滴等大型互联网公司<strong class="text-blue-600 dark:text-blue-400">主导多个千万级用户产品</strong>的前端技术架构。
          </p>

          <!-- 核心技能矩阵 -->
          <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div 
              v-for="skill in coreSkills" 
              :key="skill.name"
              class="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-xl p-4 border border-slate-200 dark:border-slate-700 hover:shadow-lg transition-all duration-300"
            >
              <div class="flex items-center space-x-3">
                <Icon :name="skill.icon" :class="`w-8 h-8 text-${skill.color}-500`" />
                <div>
                  <div class="font-semibold text-slate-800 dark:text-slate-200 text-sm">{{ skill.name }}</div>
                  <div class="text-xs text-slate-500 dark:text-slate-400">{{ skill.level }}</div>
                </div>
              </div>
            </div>
          </div>

          <!-- 企业价值指标 -->
          <div class="bg-gradient-to-r from-slate-50 to-blue-50 dark:from-slate-800/50 dark:to-blue-900/20 rounded-2xl p-6 border border-slate-200 dark:border-slate-700">
            <h3 class="text-lg font-semibold text-slate-800 dark:text-slate-200 mb-4 flex items-center">
              <Icon name="heroicons:chart-bar-square" class="w-5 h-5 mr-2 text-blue-600" />
              企业价值指标
            </h3>
            <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div v-for="metric in businessMetrics" :key="metric.label" class="text-center">
                <div :class="`text-3xl font-bold text-${metric.color}-600 dark:text-${metric.color}-400`">
                  {{ metric.value }}
                </div>
                <div class="text-sm text-slate-600 dark:text-slate-400">{{ metric.label }}</div>
              </div>
            </div>
          </div>

          <!-- 行动按钮 -->
          <div class="flex flex-col sm:flex-row gap-4">
            <Button 
              @click="viewProjects"
              class="btn-enterprise-primary !px-8 !py-4 !text-lg !font-semibold"
              size="large"
            >
              <Icon name="heroicons:rectangle-stack" class="w-5 h-5 mr-2" />
              查看项目作品
            </Button>
            
            <Button 
              @click="downloadResume"
              severity="secondary"
              outlined
              class="!px-8 !py-4 !text-lg !font-semibold !border-2"
              size="large"
            >
              <Icon name="heroicons:document-arrow-down" class="w-5 h-5 mr-2" />
              下载简历
            </Button>
            
            <Button 
              @click="scheduleCall"
              text
              class="!px-8 !py-4 !text-lg !font-semibold text-blue-600 dark:text-blue-400"
              size="large"
            >
              <Icon name="heroicons:phone" class="w-5 h-5 mr-2" />
              预约技术面试
            </Button>
          </div>
        </div>

        <!-- 右侧：技术架构图 (4列) -->
        <div class="lg:col-span-4 relative">
          <!-- 技术架构可视化 -->
          <div class="relative bg-white/10 dark:bg-slate-800/20 backdrop-blur-xl rounded-3xl p-8 border border-white/20">
            <h3 class="text-xl font-bold text-slate-800 dark:text-white mb-6 text-center">
              技术架构体系
            </h3>
            
            <!-- 分层架构图 -->
            <div class="space-y-4">
              <!-- 前端层 -->
              <div class="relative">
                <div class="bg-blue-500/20 rounded-lg p-4 border-l-4 border-blue-500">
                  <div class="font-semibold text-blue-800 dark:text-blue-200 mb-2">前端技术栈</div>
                  <div class="flex flex-wrap gap-2">
                    <span v-for="tech in frontendStack" :key="tech" 
                          class="text-xs bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300 px-2 py-1 rounded">
                      {{ tech }}
                    </span>
                  </div>
                </div>
              </div>
              
              <!-- 工程化层 -->
              <div class="relative">
                <div class="bg-purple-500/20 rounded-lg p-4 border-l-4 border-purple-500">
                  <div class="font-semibold text-purple-800 dark:text-purple-200 mb-2">工程化工具</div>
                  <div class="flex flex-wrap gap-2">
                    <span v-for="tool in engineeringTools" :key="tool" 
                          class="text-xs bg-purple-100 dark:bg-purple-900/50 text-purple-700 dark:text-purple-300 px-2 py-1 rounded">
                      {{ tool }}
                    </span>
                  </div>
                </div>
              </div>
              
              <!-- AI工具层 -->
              <div class="relative">
                <div class="bg-emerald-500/20 rounded-lg p-4 border-l-4 border-emerald-500">
                  <div class="font-semibold text-emerald-800 dark:text-emerald-200 mb-2">AI工具集成</div>
                  <div class="flex flex-wrap gap-2">
                    <span v-for="ai in aiTools" :key="ai" 
                          class="text-xs bg-emerald-100 dark:bg-emerald-900/50 text-emerald-700 dark:text-emerald-300 px-2 py-1 rounded">
                      {{ ai }}
                    </span>
                  </div>
                </div>
              </div>
            </div>
            
            <!-- 实时状态指示器 -->
            <div class="mt-6 pt-4 border-t border-slate-200 dark:border-slate-600">
              <div class="flex items-center justify-between text-sm">
                <div class="flex items-center space-x-2">
                  <div class="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  <span class="text-slate-600 dark:text-slate-400">在线状态</span>
                </div>
                <div class="text-slate-500 dark:text-slate-400">
                  可接受新项目
                </div>
              </div>
            </div>
          </div>
          
          <!-- 认证标识 -->
          <div class="absolute -bottom-4 -right-4 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full p-3 shadow-lg">
            <Icon name="heroicons:shield-check" class="w-8 h-8 text-white" />
          </div>
        </div>
      </div>
    </div>

    <!-- 联系方式悬浮 -->
    <div class="absolute top-8 right-8">
      <div class="flex space-x-3">
        <Button 
          @click="openGithub"
          text
          rounded
          class="!p-3 bg-white/10 backdrop-blur-sm hover:bg-white/20"
          v-tooltip.bottom="'GitHub'"
        >
          <Icon name="mdi:github" class="w-5 h-5 text-slate-700 dark:text-slate-300" />
        </Button>
        <Button 
          @click="openLinkedIn"
          text
          rounded
          class="!p-3 bg-white/10 backdrop-blur-sm hover:bg-white/20"
          v-tooltip.bottom="'LinkedIn'"
        >
          <Icon name="mdi:linkedin" class="w-5 h-5 text-slate-700 dark:text-slate-300" />
        </Button>
        <Button 
          @click="sendEmail"
          text
          rounded
          class="!p-3 bg-white/10 backdrop-blur-sm hover:bg-white/20"
          v-tooltip.bottom="'邮件联系'"
        >
          <Icon name="heroicons:envelope" class="w-5 h-5 text-slate-700 dark:text-slate-300" />
        </Button>
      </div>
    </div>

    <!-- 滚动提示 -->
    <div class="absolute bottom-8 left-1/2 transform -translate-x-1/2">
      <div class="flex flex-col items-center space-y-2 animate-bounce">
        <div class="text-sm text-slate-500 dark:text-slate-400">查看更多技术细节</div>
        <Icon name="heroicons:chevron-down" class="w-6 h-6 text-slate-400" />
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
/**
 * 专业级英雄区块组件
 * 面向企业招聘者的技术实力展示
 */

// 技术栈数据
const techStack = [
  { name: 'Vue', icon: 'logos:vue', size: 12, color: 'green' },
  { name: 'React', icon: 'logos:react', size: 10, color: 'blue' },
  { name: 'TypeScript', icon: 'logos:typescript-icon', size: 8, color: 'blue' },
  { name: 'Node.js', icon: 'logos:nodejs-icon', size: 10, color: 'green' },
  { name: 'Docker', icon: 'logos:docker-icon', size: 8, color: 'blue' },
  { name: 'AWS', icon: 'logos:aws', size: 10, color: 'orange' }
]

// 核心技能
const coreSkills = [
  { name: 'Vue/Nuxt', icon: 'logos:vue', color: 'green', level: 'Expert' },
  { name: 'React/Next', icon: 'logos:react', color: 'blue', level: 'Expert' },
  { name: 'TypeScript', icon: 'logos:typescript-icon', color: 'blue', level: 'Expert' },
  { name: 'Node.js', icon: 'logos:nodejs-icon', color: 'green', level: 'Advanced' },
  { name: 'Microservices', icon: 'heroicons:cube', color: 'purple', level: 'Advanced' },
  { name: 'AI Tools', icon: 'heroicons:cpu-chip', color: 'indigo', level: 'Expert' },
  { name: 'DevOps', icon: 'heroicons:cog-8-tooth', color: 'orange', level: 'Advanced' },
  { name: 'Architecture', icon: 'heroicons:building-library', color: 'slate', level: 'Expert' }
]

// 企业价值指标
const businessMetrics = [
  { value: '8+', label: '年经验', color: 'blue' },
  { value: '50+', label: '企业项目', color: 'green' },
  { value: '300%', label: '效率提升', color: 'purple' },
  { value: '1000万+', label: '用户覆盖', color: 'orange' }
]

// 前端技术栈
const frontendStack = ['Vue 3', 'Nuxt 3', 'React 18', 'Next.js', 'TypeScript', 'Tailwind CSS']

// 工程化工具
const engineeringTools = ['Vite', 'Webpack', 'Docker', 'K8s', 'Jenkins', 'AWS']

// AI工具
const aiTools = ['ChatGPT', 'Claude', 'Copilot', 'Cursor', 'V0', 'Perplexity']

// 计算技术栈位置
const getTechPosition = (index: number) => {
  const positions = [
    { top: '10%', left: '15%' },
    { top: '20%', right: '20%' },
    { top: '40%', left: '10%' },
    { top: '60%', right: '15%' },
    { top: '75%', left: '20%' },
    { top: '85%', right: '25%' }
  ]
  
  return {
    ...positions[index % positions.length],
    animationDelay: `${index * 0.5}s`
  }
}

// 方法
const viewProjects = () => {
  navigateTo('/projects')
}

const downloadResume = () => {
  // 下载简历文件
  const link = document.createElement('a')
  link.href = '/resume/frontend-engineer-resume.pdf'
  link.download = 'Frontend-Engineer-Resume.pdf'
  link.click()
}

const scheduleCall = () => {
  // 跳转到Calendly或其他预约系统
  window.open('https://calendly.com/frontend-engineer', '_blank')
}

const openGithub = () => {
  window.open('https://github.com/your-username', '_blank')
}

const openLinkedIn = () => {
  window.open('https://linkedin.com/in/your-profile', '_blank')
}

const sendEmail = () => {
  window.location.href = 'mailto:your.email@example.com?subject=合作咨询&body=您好，我对您的前端技术能力很感兴趣...'
}
</script>

<style scoped>
/**
 * 专业级英雄区块样式
 */

/* 渐变效果 */
.text-gradient-tech {
  background: linear-gradient(135deg, #1e40af 0%, #3b82f6 50%, #06b6d4 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.text-gradient-ai {
  background: linear-gradient(135deg, #8b5cf6 0%, #a855f7 50%, #c084fc 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

/* 企业级按钮样式 */
.btn-enterprise-primary {
  background: linear-gradient(135deg, #1e40af 0%, #3b82f6 100%);
  @apply text-white font-semibold transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-2xl;
}

.btn-enterprise-primary:hover {
  background: linear-gradient(135deg, #1d4ed8 0%, #2563eb 100%);
  box-shadow: 0 25px 50px -12px rgba(59, 130, 246, 0.5);
}

/* 代码背景图案 */
.bg-code-pattern {
  background-image: radial-gradient(circle at 25px 25px, rgba(59, 130, 246, 0.1) 2px, transparent 0);
  background-size: 50px 50px;
}

/* 浮动动画 */
.animate-float {
  animation: float 6s ease-in-out infinite;
}

@keyframes float {
  0%, 100% { 
    transform: translateY(0px); 
  }
  50% { 
    transform: translateY(-20px); 
  }
}

/* 响应式优化 */
@media (max-width: 1024px) {
  h1 {
    font-size: 3rem;
    line-height: 1.1;
  }
}

@media (max-width: 640px) {
  h1 {
    font-size: 2.5rem;
  }
  
  .grid.grid-cols-2 {
    grid-template-columns: 1fr;
    gap: 1rem;
  }
}

/* 无障碍优化 */
@media (prefers-reduced-motion: reduce) {
  .animate-float,
  .animate-bounce {
    animation: none;
  }
}

/* 高对比度模式 */
@media (prefers-contrast: high) {
  .bg-white\/10 {
    background-color: rgba(255, 255, 255, 0.3);
  }
  
  .text-slate-600 {
    color: #374151;
  }
}
</style>