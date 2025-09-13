<template>
  <section class="py-20 bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 text-white relative overflow-hidden">
    <!-- 背景装饰 -->
    <div class="absolute inset-0">
      <!-- 动态网格背景 -->
      <div class="absolute inset-0 bg-mesh-pattern opacity-10"></div>
      
      <!-- 浮动粒子 -->
      <div class="absolute inset-0">
        <div
          v-for="i in 20"
          :key="i"
          class="absolute w-2 h-2 bg-white rounded-full opacity-20 animate-float"
          :style="getParticleStyle(i)"
        ></div>
      </div>

      <!-- 渐变光效 -->
      <div class="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-pulse-slow"></div>
      <div class="absolute bottom-1/4 right-1/4 w-80 h-80 bg-purple-500/20 rounded-full blur-3xl animate-pulse-slow" style="animation-delay: 2s;"></div>
    </div>

    <div class="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- 章节标题 -->
      <div class="text-center mb-16 animate-on-scroll">
        <div class="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-sm text-blue-200 px-4 py-2 rounded-full text-sm font-medium mb-4">
          <Icon name="heroicons:chart-bar" class="w-4 h-4" />
          <span>数据统计</span>
        </div>
        <h2 class="text-3xl sm:text-4xl font-bold mb-4">
          用数据证明<span class="text-gradient-light">AI的力量</span>
        </h2>
        <p class="text-xl text-blue-100 max-w-3xl mx-auto">
          基于滴滴工程师团队一年来的AI辅助开发实践，
          通过真实项目数据展示AI融入开发流程后的<strong class="text-cyan-300">显著效果</strong>。
        </p>
      </div>

      <!-- 核心数据展示 -->
      <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
        <div
          v-for="(stat, index) in coreStats"
          :key="stat.id"
          class="group animate-on-scroll text-center"
          :style="{ animationDelay: `${index * 200}ms` }"
        >
          <div class="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 hover:bg-white/10 transition-all duration-300 relative overflow-hidden">
            <!-- 装饰图标 -->
            <div :class="[
              'w-16 h-16 mx-auto mb-6 rounded-2xl flex items-center justify-center relative',
              stat.iconBg
            ]">
              <Icon :name="stat.icon" class="w-8 h-8 text-white" />
              
              <!-- 图标光效 -->
              <div class="absolute inset-0 rounded-2xl bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
            </div>

            <!-- 数字展示 -->
            <div class="mb-4">
              <div 
                ref="statNumbers"
                :class="[
                  'text-4xl md:text-5xl font-bold mb-2 animate-count-up',
                  stat.color
                ]"
                :data-target="stat.rawValue"
              >
                {{ stat.displayValue }}
              </div>
              <div class="text-lg font-semibold text-white mb-2">
                {{ stat.label }}
              </div>
              <div class="text-sm text-blue-200">
                {{ stat.description }}
              </div>
            </div>

            <!-- 趋势指示器 -->
            <div class="flex items-center justify-center space-x-2">
              <div class="flex items-center space-x-1 text-green-300">
                <Icon name="heroicons:arrow-trending-up" class="w-4 h-4" />
                <span class="text-sm font-medium">{{ stat.trend }}</span>
              </div>
              <div class="text-xs text-blue-300">{{ stat.period }}</div>
            </div>

            <!-- 卡片装饰边框 -->
            <div class="absolute inset-0 rounded-2xl border-2 border-transparent group-hover:border-gradient-to-r group-hover:from-blue-400 group-hover:to-purple-400 transition-all duration-300"></div>
          </div>
        </div>
      </div>

      <!-- 详细统计分析 -->
      <div class="grid lg:grid-cols-3 gap-8 mb-16">
        <!-- 效率提升分析 -->
        <div class="lg:col-span-2 animate-on-scroll">
          <div class="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8">
            <h3 class="text-2xl font-bold mb-6 flex items-center">
              <Icon name="heroicons:bolt" class="w-6 h-6 text-yellow-400 mr-3" />
              效率提升详细分析
            </h3>

            <!-- 各阶段效率对比 -->
            <div class="space-y-6">
              <div
                v-for="(efficiency, index) in efficiencyAnalysis"
                :key="efficiency.stage"
                class="animate-on-scroll"
                :style="{ animationDelay: `${index * 300}ms` }"
              >
                <div class="flex items-center justify-between mb-2">
                  <div class="flex items-center space-x-3">
                    <Icon :name="efficiency.icon" :class="[
                      'w-5 h-5',
                      efficiency.iconColor
                    ]" />
                    <span class="font-semibold">{{ efficiency.stage }}</span>
                  </div>
                  <div class="flex items-center space-x-4">
                    <div class="text-sm text-blue-200">
                      <span class="line-through opacity-60">{{ efficiency.before }}</span>
                      <Icon name="heroicons:arrow-right" class="w-4 h-4 inline mx-2" />
                      <span class="text-green-300 font-semibold">{{ efficiency.after }}</span>
                    </div>
                    <div :class="[
                      'px-2 py-1 rounded-full text-xs font-bold',
                      efficiency.improvement >= 70 ? 'bg-green-500/20 text-green-300' :
                      efficiency.improvement >= 50 ? 'bg-yellow-500/20 text-yellow-300' :
                      'bg-orange-500/20 text-orange-300'
                    ]">
                      +{{ efficiency.improvement }}%
                    </div>
                  </div>
                </div>
                
                <!-- 进度条 -->
                <div class="flex items-center space-x-3">
                  <div class="flex-1">
                    <div class="flex mb-1">
                      <div class="w-1/2 pr-2">
                        <div class="w-full bg-white/10 rounded-full h-2">
                          <div 
                            class="bg-gray-400 h-2 rounded-full transition-all duration-1000"
                            :style="{ width: `${efficiency.beforePercent}%` }"
                          ></div>
                        </div>
                      </div>
                      <div class="w-1/2 pl-2">
                        <div class="w-full bg-white/10 rounded-full h-2">
                          <div 
                            :class="[
                              'h-2 rounded-full transition-all duration-1000',
                              efficiency.improvement >= 70 ? 'bg-gradient-to-r from-green-400 to-green-600' :
                              efficiency.improvement >= 50 ? 'bg-gradient-to-r from-yellow-400 to-yellow-600' :
                              'bg-gradient-to-r from-orange-400 to-orange-600'
                            ]"
                            :style="{ width: `${efficiency.afterPercent}%` }"
                          ></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- 关键指标 -->
        <div class="space-y-8 animate-on-scroll">
          <!-- ROI 分析 -->
          <div class="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6">
            <h3 class="text-lg font-bold mb-4 flex items-center">
              <Icon name="heroicons:currency-dollar" class="w-5 h-5 text-green-400 mr-2" />
              投资回报率
            </h3>
            <div class="text-center">
              <div class="text-4xl font-bold text-green-300 mb-2">320%</div>
              <div class="text-sm text-blue-200 mb-4">年化ROI</div>
              <div class="bg-green-500/20 rounded-lg p-3">
                <div class="text-xs text-green-300">
                  AI工具投入成本：¥24,000/年<br/>
                  效率提升价值：¥100,800/年
                </div>
              </div>
            </div>
          </div>

          <!-- 团队满意度 -->
          <div class="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6">
            <h3 class="text-lg font-bold mb-4 flex items-center">
              <Icon name="heroicons:face-smile" class="w-5 h-5 text-yellow-400 mr-2" />
              团队满意度
            </h3>
            <div class="space-y-4">
              <div
                v-for="satisfaction in teamSatisfaction"
                :key="satisfaction.metric"
                class="flex items-center justify-between"
              >
                <div class="text-sm text-blue-200">{{ satisfaction.metric }}</div>
                <div class="flex items-center space-x-2">
                  <div class="w-16 bg-white/10 rounded-full h-2">
                    <div 
                      class="bg-gradient-to-r from-yellow-400 to-orange-500 h-2 rounded-full transition-all duration-1000"
                      :style="{ width: `${satisfaction.score}%` }"
                    ></div>
                  </div>
                  <div class="text-sm font-semibold text-yellow-300 min-w-[2rem]">
                    {{ satisfaction.score }}%
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- 项目成功率 -->
          <div class="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6">
            <h3 class="text-lg font-bold mb-4 flex items-center">
              <Icon name="heroicons:trophy" class="w-5 h-5 text-purple-400 mr-2" />
              项目成功指标
            </h3>
            <div class="grid grid-cols-2 gap-4">
              <div class="text-center">
                <div class="text-2xl font-bold text-purple-300 mb-1">95%</div>
                <div class="text-xs text-blue-200">按时交付</div>
              </div>
              <div class="text-center">
                <div class="text-2xl font-bold text-cyan-300 mb-1">40%</div>
                <div class="text-xs text-blue-200">Bug减少</div>
              </div>
              <div class="text-center">
                <div class="text-2xl font-bold text-green-300 mb-1">150%</div>
                <div class="text-xs text-blue-200">创新提升</div>
              </div>
              <div class="text-center">
                <div class="text-2xl font-bold text-orange-300 mb-1">85%</div>
                <div class="text-xs text-blue-200">客户满意</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 实践成果展示 -->
      <div class="text-center animate-on-scroll">
        <div class="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
          <Icon name="mdi:trophy-award" class="w-16 h-16 text-yellow-400 mx-auto mb-4" />
          <h3 class="text-2xl font-bold mb-4">AI辅助开发实践成果</h3>
          <p class="text-blue-100 mb-6 max-w-3xl mx-auto">
            通过一年的深度实践，我们不仅在效率上获得了显著提升，
            更重要的是建立了完整的AI辅助开发方法论和最佳实践体系。
          </p>
          <div class="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              @click="downloadReport"
              class="btn-light-gradient !px-8 !py-4 !text-lg !font-semibold"
              size="large"
            >
              <Icon name="heroicons:document-arrow-down" class="w-5 h-5 mr-2" />
              下载完整报告
            </Button>
            
            <Button 
              @click="joinCommunity"
              outlined
              class="!border-white !text-white hover:!bg-white/10 !px-8 !py-4 !text-lg !font-semibold !border-2"
              size="large"
            >
              <Icon name="heroicons:user-group" class="w-5 h-5 mr-2" />
              加入实践社区
            </Button>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
/**
 * 数据统计展示组件
 * 展示AI辅助开发的量化效果和成果
 */

// 核心统计数据
const coreStats = [
  {
    id: 'efficiency',
    displayValue: '68%',
    rawValue: 68,
    label: '平均效率提升',
    description: '各开发阶段综合提升',
    icon: 'heroicons:bolt',
    iconBg: 'bg-gradient-to-br from-yellow-500 to-orange-600',
    color: 'text-yellow-300',
    trend: '+45%',
    period: '较去年同期'
  },
  {
    id: 'time-saved',
    displayValue: '21h',
    rawValue: 21,
    label: '单项目节省时间',
    description: '从31小时缩短至9.9小时',
    icon: 'heroicons:clock',
    iconBg: 'bg-gradient-to-br from-blue-500 to-indigo-600',
    color: 'text-blue-300',
    trend: '+30%',
    period: '相比传统流程'
  },
  {
    id: 'tools-tested',
    displayValue: '308+',
    rawValue: 308,
    label: '测试AI工具数量',
    description: '深度评估和筛选',
    icon: 'mdi:robot',
    iconBg: 'bg-gradient-to-br from-purple-500 to-pink-600',
    color: 'text-purple-300',
    trend: '+156',
    period: '持续更新中'
  },
  {
    id: 'team-members',
    displayValue: '25+',
    rawValue: 25,
    label: '实践团队成员',
    description: '滴滴前端工程师参与',
    icon: 'heroicons:users',
    iconBg: 'bg-gradient-to-br from-green-500 to-teal-600',
    color: 'text-green-300',
    trend: '+12',
    period: '新加入成员'
  }
]

// 效率分析数据
const efficiencyAnalysis = [
  {
    stage: '需求分析',
    icon: 'heroicons:document-magnifying-glass',
    iconColor: 'text-blue-400',
    before: '8小时',
    after: '2.4小时',
    improvement: 70,
    beforePercent: 80,
    afterPercent: 24
  },
  {
    stage: '技术设计',
    icon: 'heroicons:cog-6-tooth',
    iconColor: 'text-purple-400',
    before: '6小时',
    after: '2小时',
    improvement: 67,
    beforePercent: 60,
    afterPercent: 20
  },
  {
    stage: 'UI开发',
    icon: 'heroicons:paint-brush',
    iconColor: 'text-green-400',
    before: '10小时',
    after: '4小时',
    improvement: 60,
    beforePercent: 100,
    afterPercent: 40
  },
  {
    stage: '代码重构',
    icon: 'heroicons:arrow-path',
    iconColor: 'text-orange-400',
    before: '4小时',
    after: '1.2小时',
    improvement: 70,
    beforePercent: 40,
    afterPercent: 12
  },
  {
    stage: '自动化测试',
    icon: 'heroicons:bug-ant',
    iconColor: 'text-red-400',
    before: '3小时',
    after: '0.8小时',
    improvement: 73,
    beforePercent: 30,
    afterPercent: 8
  }
]

// 团队满意度数据
const teamSatisfaction = [
  { metric: '工作满意度', score: 92 },
  { metric: '工具易用性', score: 88 },
  { metric: '学习意愿', score: 95 },
  { metric: '推荐意愿', score: 90 }
]

// 粒子位置生成
const getParticleStyle = (index: number) => {
  const positions = [
    { left: '10%', top: '20%', animationDelay: '0s' },
    { left: '20%', top: '80%', animationDelay: '1s' },
    { left: '80%', top: '10%', animationDelay: '2s' },
    { left: '90%', top: '70%', animationDelay: '3s' },
    { left: '50%', top: '30%', animationDelay: '4s' },
    { left: '30%', top: '60%', animationDelay: '5s' },
    { left: '70%', top: '40%', animationDelay: '6s' },
    { left: '15%', top: '50%', animationDelay: '7s' },
    { left: '85%', top: '85%', animationDelay: '8s' },
    { left: '60%', top: '15%', animationDelay: '9s' }
  ]
  
  return positions[(index - 1) % positions.length] || positions[0]
}

// 方法
const downloadReport = () => {
  console.log('下载完整报告')
  // 实现报告下载功能
}

const joinCommunity = () => {
  console.log('加入实践社区')
  // 打开社区链接
}
</script>

<style scoped>
/**
 * 数据统计展示组件样式
 */

/* 渐变文字效果 - 适用于深色背景 */
.text-gradient-light {
  background: linear-gradient(135deg, #60a5fa 0%, #a78bfa 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

/* 浅色按钮渐变效果 */
.btn-light-gradient {
  background: linear-gradient(135deg, #ffffff 0%, #f3f4f6 100%);
  @apply text-gray-900 font-semibold transform hover:scale-105 transition-all duration-300 hover:shadow-xl;
}

.btn-light-gradient:hover {
  background: linear-gradient(135deg, #f9fafb 0%, #e5e7eb 100%);
  box-shadow: 0 20px 25px -5px rgba(255, 255, 255, 0.1);
}

/* 浮动动画 */
.animate-float {
  animation: float 6s ease-in-out infinite;
}

@keyframes float {
  0%, 100% { 
    transform: translate(0, 0) scale(1); 
    opacity: 0.2;
  }
  25% { 
    transform: translate(10px, -15px) scale(1.2); 
    opacity: 0.4;
  }
  50% { 
    transform: translate(-5px, -25px) scale(0.8); 
    opacity: 0.6;
  }
  75% { 
    transform: translate(-15px, -10px) scale(1.1); 
    opacity: 0.3;
  }
}

/* 脉冲动画 */
.animate-pulse-slow {
  animation: pulse-glow 4s ease-in-out infinite;
}

@keyframes pulse-glow {
  0%, 100% { 
    opacity: 0.4; 
    transform: scale(1);
  }
  50% { 
    opacity: 0.8; 
    transform: scale(1.05);
  }
}

/* 数字计数动画 */
.animate-count-up {
  animation: countUp 2s ease-out;
}

@keyframes countUp {
  from {
    opacity: 0;
    transform: translateY(20px) scale(0.5);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

/* 滚动动画 */
.animate-on-scroll {
  opacity: 0;
  transform: translateY(40px);
  transition: all 1s ease-out;
}

.animate-on-scroll.animate-fade-in {
  opacity: 1;
  transform: translateY(0);
}

/* 网格背景 */
.bg-mesh-pattern {
  background-image: radial-gradient(circle at 25px 25px, rgba(255,255,255,0.15) 2px, transparent 0);
  background-size: 50px 50px;
}

/* 毛玻璃效果增强 */
.backdrop-blur-sm {
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
}

/* 渐变边框效果 */
.border-gradient-to-r {
  border-image: linear-gradient(to right, #60a5fa, #a78bfa) 1;
}

/* 悬停光效 */
.group .absolute.inset-0 {
  background: linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent);
}

/* 响应式优化 */
@media (max-width: 1024px) {
  .grid.lg\:grid-cols-4 {
    grid-template-columns: repeat(2, 1fr);
  }
  
  .grid.lg\:grid-cols-3 {
    grid-template-columns: 1fr;
  }
  
  .lg\:col-span-2 {
    grid-column: span 1;
  }
}

@media (max-width: 768px) {
  .grid.md\:grid-cols-2 {
    grid-template-columns: 1fr;
  }
  
  .text-4xl.md\:text-5xl {
    font-size: 2.5rem;
  }
  
  .p-8 {
    padding: 1.5rem;
  }
  
  .p-6 {
    padding: 1rem;
  }
  
  .flex.flex-col.sm\:flex-row {
    flex-direction: column;
    gap: 1rem;
  }
  
  .space-y-6 {
    margin-top: 0;
  }
  
  .space-y-6 > * + * {
    margin-top: 1.5rem;
  }
}

/* 无障碍优化 */
button:focus {
  outline: 2px solid #60a5fa;
  outline-offset: 2px;
}

/* 减少动画对于偏好减少动效的用户 */
@media (prefers-reduced-motion: reduce) {
  .animate-float,
  .animate-pulse-slow,
  .animate-count-up,
  .animate-on-scroll,
  .transition-all,
  .transition-transform,
  .group .absolute.inset-0 {
    animation: none !important;
    transition: none !important;
    transform: none !important;
  }
}

/* 高对比度模式优化 */
@media (prefers-contrast: high) {
  .bg-white\/5 {
    background-color: rgba(255, 255, 255, 0.1);
  }
  
  .border-white\/10 {
    border-color: rgba(255, 255, 255, 0.3);
  }
}
</style>