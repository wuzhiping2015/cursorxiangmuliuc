<template>
  <section class="py-20 bg-white dark:bg-gray-900">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- 章节标题 -->
      <div class="text-center mb-16 animate-on-scroll">
        <div class="inline-flex items-center space-x-2 bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-200 px-4 py-2 rounded-full text-sm font-medium mb-4">
          <Icon name="heroicons:star" class="w-4 h-4" />
          <span>核心价值</span>
        </div>
        <h2 class="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
          为什么选择<span class="text-gradient-ai">AI辅助开发</span>？
        </h2>
        <p class="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
          深度解析AI融入前端开发工作流的四大核心价值，
          让你从<strong class="text-purple-600 dark:text-purple-400">"重复劳动者"</strong>升级为<strong class="text-purple-600 dark:text-purple-400">"智能协作者"</strong>。
        </p>
      </div>

      <!-- 核心特性网格 -->
      <div class="grid lg:grid-cols-2 gap-8 mb-16">
        <!-- 特性卡片 -->
        <div
          v-for="(feature, index) in coreFeatures"
          :key="feature.id"
          class="group animate-on-scroll bg-gradient-to-br from-gray-50 to-white dark:from-gray-800 dark:to-gray-700 rounded-2xl p-8 shadow-sm border border-gray-200 dark:border-gray-600 hover:shadow-xl hover:scale-105 transition-all duration-300"
          :class="[
            index % 2 === 0 ? 'lg:translate-y-4' : 'lg:-translate-y-4'
          ]"
        >
          <!-- 特性图标和标签 -->
          <div class="flex items-start justify-between mb-6">
            <div :class="[
              'w-16 h-16 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300',
              feature.iconBg
            ]">
              <Icon :name="feature.icon" :class="[
                'w-8 h-8',
                feature.iconColor
              ]" />
            </div>
            <div :class="[
              'px-3 py-1 rounded-full text-xs font-semibold',
              feature.labelBg,
              feature.labelColor
            ]">
              {{ feature.label }}
            </div>
          </div>

          <!-- 特性标题和描述 -->
          <div class="mb-6">
            <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
              {{ feature.title }}
            </h3>
            <p class="text-gray-600 dark:text-gray-400 leading-relaxed">
              {{ feature.description }}
            </p>
          </div>

          <!-- 核心亮点 -->
          <div class="space-y-3 mb-6">
            <div
              v-for="highlight in feature.highlights"
              :key="highlight"
              class="flex items-center space-x-3"
            >
              <div :class="[
                'w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0',
                feature.highlightBg
              ]">
                <Icon name="heroicons:check" :class="[
                  'w-4 h-4',
                  feature.highlightColor
                ]" />
              </div>
              <span class="text-sm text-gray-700 dark:text-gray-300">
                {{ highlight }}
              </span>
            </div>
          </div>

          <!-- 数据展示 -->
          <div class="grid grid-cols-2 gap-4 mb-6">
            <div
              v-for="stat in feature.stats"
              :key="stat.label"
              class="text-center bg-white dark:bg-gray-800 rounded-lg p-3 border border-gray-200 dark:border-gray-600"
            >
              <div :class="[
                'text-2xl font-bold mb-1',
                feature.statColor
              ]">
                {{ stat.value }}
              </div>
              <div class="text-xs text-gray-600 dark:text-gray-400">
                {{ stat.label }}
              </div>
            </div>
          </div>

          <!-- 实际案例 -->
          <div :class="[
            'rounded-xl p-4 border-l-4',
            feature.caseBg,
            feature.caseBorder
          ]">
            <div class="flex items-start space-x-3">
              <Icon name="heroicons:light-bulb" :class="[
                'w-5 h-5 flex-shrink-0 mt-0.5',
                feature.iconColor
              ]" />
              <div>
                <h4 class="text-sm font-semibold text-gray-900 dark:text-white mb-1">
                  滴滴实践案例
                </h4>
                <p class="text-xs text-gray-700 dark:text-gray-300 leading-relaxed">
                  {{ feature.practiceCase }}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 对比展示 -->
      <div class="animate-on-scroll">
        <div class="bg-gradient-to-r from-blue-50 via-purple-50 to-cyan-50 dark:from-blue-900/20 dark:via-purple-900/20 dark:to-cyan-900/20 rounded-2xl p-8 border border-blue-200 dark:border-blue-800">
          <h3 class="text-2xl font-bold text-gray-900 dark:text-white text-center mb-8">
            🆚 传统开发 vs AI辅助开发对比
          </h3>
          
          <div class="grid md:grid-cols-2 gap-8">
            <!-- 传统开发 -->
            <div class="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
              <div class="flex items-center space-x-3 mb-4">
                <div class="w-10 h-10 bg-gray-100 dark:bg-gray-700 rounded-lg flex items-center justify-center">
                  <Icon name="heroicons:user" class="w-6 h-6 text-gray-600 dark:text-gray-400" />
                </div>
                <h4 class="text-lg font-bold text-gray-900 dark:text-white">传统开发模式</h4>
              </div>
              
              <ul class="space-y-3">
                <li
                  v-for="item in traditionalDev"
                  :key="item"
                  class="flex items-start space-x-3"
                >
                  <Icon name="heroicons:x-mark" class="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                  <span class="text-sm text-gray-700 dark:text-gray-300">{{ item }}</span>
                </li>
              </ul>
            </div>

            <!-- AI辅助开发 -->
            <div class="bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-xl p-6 border-2 border-blue-300 dark:border-blue-600 relative overflow-hidden">
              <div class="flex items-center space-x-3 mb-4">
                <div class="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                  <Icon name="mdi:robot" class="w-6 h-6 text-white" />
                </div>
                <h4 class="text-lg font-bold text-gray-900 dark:text-white">AI辅助开发</h4>
                <div class="px-2 py-1 bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-200 rounded-full text-xs font-semibold">
                  推荐
                </div>
              </div>
              
              <ul class="space-y-3">
                <li
                  v-for="item in aiDev"
                  :key="item"
                  class="flex items-start space-x-3"
                >
                  <Icon name="heroicons:check" class="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <span class="text-sm text-gray-700 dark:text-gray-300">{{ item }}</span>
                </li>
              </ul>

              <!-- 装饰元素 -->
              <div class="absolute top-2 right-2 w-16 h-16 bg-gradient-to-br from-blue-400/20 to-purple-600/20 rounded-full blur-xl"></div>
            </div>
          </div>
          
          <!-- 效率提升总结 -->
          <div class="mt-8 text-center bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
            <div class="text-3xl font-bold text-green-600 dark:text-green-400 mb-2">
              3倍+
            </div>
            <div class="text-lg font-semibold text-gray-900 dark:text-white mb-1">
              平均开发效率提升
            </div>
            <p class="text-sm text-gray-600 dark:text-gray-400">
              从需求分析到代码上线，全流程时间缩短68%
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
/**
 * 核心特性展示组件
 * 展示AI辅助开发的四大核心价值
 */

// 核心特性数据
const coreFeatures = [
  {
    id: 'efficiency',
    title: '开发效率倍增',
    description: '从需求理解到代码实现，AI协助完成重复性工作，让开发者专注于创新和架构设计，平均节省68%的开发时间。',
    icon: 'heroicons:bolt',
    iconBg: 'bg-gradient-to-br from-yellow-400 to-orange-500',
    iconColor: 'text-white',
    label: '效率提升',
    labelBg: 'bg-yellow-100 dark:bg-yellow-900/30',
    labelColor: 'text-yellow-800 dark:text-yellow-200',
    highlights: [
      '代码生成速度提升300%',
      '需求分析时间减少70%',
      '重复工作自动化处理',
      '智能代码补全和纠错'
    ],
    stats: [
      { label: '时间节省', value: '68%' },
      { label: '效率提升', value: '3x' }
    ],
    statColor: 'text-yellow-600 dark:text-yellow-400',
    highlightBg: 'bg-yellow-100 dark:bg-yellow-900/30',
    highlightColor: 'text-yellow-600 dark:text-yellow-400',
    caseBg: 'bg-yellow-50 dark:bg-yellow-900/20',
    caseBorder: 'border-yellow-400',
    practiceCase: '滴滴某功能开发从原本31小时缩短至9.9小时，通过AI辅助需求分析、代码生成和测试用例编写，实现了显著的效率提升。'
  },
  {
    id: 'quality',
    title: '代码质量保障',
    description: 'AI不仅能生成代码，更能审查代码质量、发现潜在问题、优化性能，确保交付的代码符合工程化标准。',
    icon: 'heroicons:shield-check',
    iconBg: 'bg-gradient-to-br from-green-400 to-emerald-500',
    iconColor: 'text-white',
    label: '质量保障',
    labelBg: 'bg-green-100 dark:bg-green-900/30',
    labelColor: 'text-green-800 dark:text-green-200',
    highlights: [
      'Bug数量减少60%',
      '代码规范自动检查',
      '性能问题智能识别',
      '安全漏洞提前预警'
    ],
    stats: [
      { label: 'Bug减少', value: '60%' },
      { label: '测试覆盖', value: '85%' }
    ],
    statColor: 'text-green-600 dark:text-green-400',
    highlightBg: 'bg-green-100 dark:bg-green-900/30',
    highlightColor: 'text-green-600 dark:text-green-400',
    caseBg: 'bg-green-50 dark:bg-green-900/20',
    caseBorder: 'border-green-400',
    practiceCase: '通过AI代码审查，团队的代码质量显著提升，单元测试覆盖率从40%提升到85%，生产环境Bug减少60%。'
  },
  {
    id: 'learning',
    title: '技术学习加速',
    description: 'AI成为你的私人技术导师，实时解答问题、推荐最佳实践、分析新技术趋势，让学习更高效。',
    icon: 'heroicons:academic-cap',
    iconBg: 'bg-gradient-to-br from-blue-400 to-indigo-500',
    iconColor: 'text-white',
    label: '学习加速',
    labelBg: 'bg-blue-100 dark:bg-blue-900/30',
    labelColor: 'text-blue-800 dark:text-blue-200',
    highlights: [
      '即时技术问题解答',
      '最佳实践智能推荐',
      '新技术快速上手',
      '知识体系系统构建'
    ],
    stats: [
      { label: '学习效率', value: '2x' },
      { label: '技能提升', value: '150%' }
    ],
    statColor: 'text-blue-600 dark:text-blue-400',
    highlightBg: 'bg-blue-100 dark:bg-blue-900/30',
    highlightColor: 'text-blue-600 dark:text-blue-400',
    caseBg: 'bg-blue-50 dark:bg-blue-900/20',
    caseBorder: 'border-blue-400',
    practiceCase: '工程师通过与AI的交互学习，在3个月内掌握了React 18新特性、微前端架构等技术，学习效率提升200%。'
  },
  {
    id: 'innovation',
    title: '创新能力释放',
    description: '从繁重的编码工作中解放出来，将更多精力投入到产品创新、用户体验优化和技术架构设计上。',
    icon: 'heroicons:light-bulb',
    iconBg: 'bg-gradient-to-br from-purple-400 to-pink-500',
    iconColor: 'text-white',
    label: '创新释放',
    labelBg: 'bg-purple-100 dark:bg-purple-900/30',
    labelColor: 'text-purple-800 dark:text-purple-200',
    highlights: [
      '专注高价值工作',
      '产品创新时间增加',
      '用户体验深度优化',
      '技术架构深度思考'
    ],
    stats: [
      { label: '创新时间', value: '+40%' },
      { label: '产品迭代', value: '2倍' }
    ],
    statColor: 'text-purple-600 dark:text-purple-400',
    highlightBg: 'bg-purple-100 dark:bg-purple-900/30',
    highlightColor: 'text-purple-600 dark:text-purple-400',
    caseBg: 'bg-purple-50 dark:bg-purple-900/20',
    caseBorder: 'border-purple-400',
    practiceCase: '团队将节省的开发时间用于产品创新和用户体验优化，产品迭代速度提升100%，用户满意度大幅提升。'
  }
]

// 对比数据
const traditionalDev = [
  '大量重复性编码工作',
  '需求理解耗时较长',
  '代码质量依赖个人经验',
  '测试用例编写繁琐',
  '技术学习依靠自主摸索',
  '调试和排错时间较长'
]

const aiDev = [
  'AI自动生成基础代码框架',
  'AI辅助快速理解需求文档',
  'AI自动检测代码质量问题',
  'AI智能生成测试用例',
  'AI即时回答技术问题',
  'AI智能定位和修复Bug'
]
</script>

<style scoped>
/**
 * 核心特性展示组件样式
 */

/* 渐变文字效果 */
.text-gradient-ai {
  background: linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

/* 卡片悬停效果 */
.group:hover {
  transform: translateY(-4px) scale(1.02);
}

/* 滚动动画 */
.animate-on-scroll {
  opacity: 0;
  transform: translateY(30px);
  transition: all 0.8s ease-out;
}

.animate-on-scroll.animate-fade-in {
  opacity: 1;
  transform: translateY(0);
}

/* 统计数字动画 */
.text-2xl,
.text-3xl {
  animation: countUp 1s ease-out;
}

@keyframes countUp {
  from {
    opacity: 0;
    transform: scale(0.5);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

/* 装饰元素动画 */
.blur-xl {
  animation: float 3s ease-in-out infinite;
}

@keyframes float {
  0%, 100% { 
    transform: translateY(0px) rotate(0deg); 
  }
  50% { 
    transform: translateY(-10px) rotate(180deg); 
  }
}

/* 渐变背景动画 */
.bg-gradient-to-r,
.bg-gradient-to-br {
  background-size: 200% 200%;
  animation: gradientShift 5s ease infinite;
}

@keyframes gradientShift {
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}

/* 响应式优化 */
@media (max-width: 1024px) {
  .lg\:translate-y-4,
  .lg\:-translate-y-4 {
    transform: translateY(0) !important;
  }
}

@media (max-width: 768px) {
  .p-8 {
    padding: 1.5rem;
  }
  
  .p-6 {
    padding: 1rem;
  }
  
  .text-xl {
    font-size: 1.125rem;
  }
  
  .grid.md\:grid-cols-2 {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
  
  .w-16.h-16 {
    width: 3rem;
    height: 3rem;
  }
  
  .w-8.h-8 {
    width: 1.5rem;
    height: 1.5rem;
  }
}

/* 无障碍优化 */
.group:focus {
  outline: 2px solid #3b82f6;
  outline-offset: 2px;
}

/* 减少动画对于偏好减少动效的用户 */
@media (prefers-reduced-motion: reduce) {
  .animate-on-scroll,
  .group,
  .group:hover,
  .transition-all,
  .transition-transform,
  .transition-colors,
  .blur-xl,
  .text-2xl,
  .text-3xl {
    animation: none !important;
    transition: none !important;
    transform: none !important;
  }
}

/* 深色模式优化 */
.dark .bg-gradient-to-r {
  opacity: 0.9;
}

.dark .shadow-xl {
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.3), 0 10px 10px -5px rgba(0, 0, 0, 0.1);
}
</style>