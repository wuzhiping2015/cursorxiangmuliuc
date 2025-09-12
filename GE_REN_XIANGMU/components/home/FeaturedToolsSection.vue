<template>
  <section class="py-20 bg-white dark:bg-gray-900">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- 章节标题 -->
      <div class="text-center mb-16 animate-on-scroll">
        <div class="inline-flex items-center space-x-2 bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-200 px-4 py-2 rounded-full text-sm font-medium mb-4">
          <Icon name="mdi:robot" class="w-4 h-4" />
          <span>精选工具</span>
        </div>
        <h2 class="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
          <span class="text-gradient-ai">308+精选AI工具</span>助力开发
        </h2>
        <p class="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
          精心筛选并深度测评的AI开发工具库，涵盖<strong class="text-green-600 dark:text-green-400">6大应用场景</strong>，
          每个工具都经过实际项目验证，为你的开发工作流提供最佳选择。
        </p>
      </div>

      <!-- 工具分类标签 -->
      <div class="flex flex-wrap justify-center gap-3 mb-12 animate-on-scroll">
        <button
          v-for="category in toolCategories"
          :key="category.id"
          @click="activeCategory = category.id"
          :class="[
            'px-4 py-2 rounded-full text-sm font-medium transition-all duration-300',
            activeCategory === category.id
              ? 'bg-blue-600 text-white shadow-lg scale-105'
              : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-blue-100 dark:hover:bg-blue-900/30 hover:text-blue-600 dark:hover:text-blue-400'
          ]"
        >
          <Icon :name="category.icon" class="w-4 h-4 inline mr-2" />
          {{ category.name }}
          <span class="ml-1 text-xs opacity-75">({{ category.count }})</span>
        </button>
      </div>

      <!-- 精选工具展示 -->
      <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
        <div
          v-for="(tool, index) in filteredTools"
          :key="tool.id"
          class="group animate-on-scroll bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 hover:shadow-xl hover:scale-105 transition-all duration-300 overflow-hidden"
          :style="{ animationDelay: `${index * 100}ms` }"
        >
          <!-- 工具头部 -->
          <div class="relative p-6 pb-4">
            <!-- 热门标签 -->
            <div v-if="tool.isPopular" class="absolute top-4 right-4">
              <div class="bg-gradient-to-r from-orange-400 to-red-500 text-white px-2 py-1 rounded-full text-xs font-semibold flex items-center">
                <Icon name="heroicons:fire" class="w-3 h-3 mr-1" />
                热门
              </div>
            </div>

            <!-- 工具图标和基本信息 -->
            <div class="flex items-start space-x-4 mb-4">
              <div :class="[
                'w-12 h-12 rounded-xl flex items-center justify-center shadow-md group-hover:scale-110 transition-transform duration-300',
                tool.iconBg
              ]">
                <Icon :name="tool.icon" :class="[
                  'w-7 h-7',
                  tool.iconColor
                ]" />
              </div>

              <div class="flex-1 min-w-0">
                <div class="flex items-center space-x-2 mb-1">
                  <h3 class="text-lg font-bold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    {{ tool.name }}
                  </h3>
                  <div v-if="tool.isPro" class="bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-200 px-2 py-0.5 rounded-full text-xs font-medium">
                    Pro
                  </div>
                </div>
                <p class="text-sm text-gray-600 dark:text-gray-400 mb-2">
                  {{ tool.description }}
                </p>
                <div class="flex items-center space-x-4 text-xs text-gray-500 dark:text-gray-400">
                  <div class="flex items-center space-x-1">
                    <Icon name="heroicons:star" class="w-3 h-3 text-yellow-500" />
                    <span>{{ tool.rating }}</span>
                  </div>
                  <div class="flex items-center space-x-1">
                    <Icon name="heroicons:users" class="w-3 h-3" />
                    <span>{{ tool.users }}</span>
                  </div>
                  <div class="flex items-center space-x-1">
                    <Icon :name="tool.pricing === 'free' ? 'heroicons:gift' : 'heroicons:credit-card'" class="w-3 h-3" />
                    <span>{{ tool.pricing === 'free' ? '免费' : '付费' }}</span>
                  </div>
                </div>
              </div>
            </div>

            <!-- 核心功能 -->
            <div class="mb-4">
              <h4 class="text-sm font-semibold text-gray-900 dark:text-white mb-2 flex items-center">
                <Icon name="heroicons:bolt" class="w-4 h-4 text-yellow-500 mr-1" />
                核心功能
              </h4>
              <div class="flex flex-wrap gap-1">
                <Tag
                  v-for="feature in tool.features.slice(0, 3)"
                  :key="feature"
                  :value="feature"
                  severity="secondary"
                  rounded
                  class="!text-xs !py-1 !px-2"
                />
                <span v-if="tool.features.length > 3" class="text-xs text-gray-400">
                  +{{ tool.features.length - 3 }}
                </span>
              </div>
            </div>

            <!-- 适用场景 -->
            <div class="mb-4">
              <h4 class="text-sm font-semibold text-gray-900 dark:text-white mb-2 flex items-center">
                <Icon name="heroicons:puzzle-piece" class="w-4 h-4 text-blue-500 mr-1" />
                适用场景
              </h4>
              <p class="text-xs text-gray-600 dark:text-gray-400 line-clamp-2">
                {{ tool.useCase }}
              </p>
            </div>

            <!-- 效率提升 -->
            <div class="mb-4">
              <div class="flex items-center justify-between text-sm mb-1">
                <span class="text-gray-700 dark:text-gray-300">效率提升</span>
                <span :class="[
                  'font-bold',
                  tool.efficiency >= 70 ? 'text-green-600 dark:text-green-400' :
                  tool.efficiency >= 50 ? 'text-yellow-600 dark:text-yellow-400' :
                  'text-orange-600 dark:text-orange-400'
                ]">
                  +{{ tool.efficiency }}%
                </span>
              </div>
              <div class="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                <div 
                  :class="[
                    'h-2 rounded-full transition-all duration-500',
                    tool.efficiency >= 70 ? 'bg-gradient-to-r from-green-400 to-green-600' :
                    tool.efficiency >= 50 ? 'bg-gradient-to-r from-yellow-400 to-yellow-600' :
                    'bg-gradient-to-r from-orange-400 to-orange-600'
                  ]"
                  :style="{ width: `${Math.min(tool.efficiency, 100)}%` }"
                ></div>
              </div>
            </div>
          </div>

          <!-- 工具操作 -->
          <div class="px-6 pb-6 pt-2 border-t border-gray-100 dark:border-gray-700">
            <div class="flex items-center justify-between">
              <Button 
                @click="tryTool(tool)"
                :class="[
                  '!px-4 !py-2 !text-sm',
                  tool.pricing === 'free' 
                    ? 'btn-ai-gradient' 
                    : '!bg-purple-600 hover:!bg-purple-700 !text-white'
                ]"
              >
                <Icon :name="tool.pricing === 'free' ? 'heroicons:play' : 'heroicons:rocket-launch'" class="w-4 h-4 mr-2" />
                {{ tool.pricing === 'free' ? '立即试用' : '了解Pro版' }}
              </Button>

              <div class="flex items-center space-x-2">
                <Button
                  @click="viewDetails(tool)"
                  text
                  rounded
                  class="!p-2"
                  v-tooltip.top="'查看详情'"
                >
                  <Icon name="heroicons:information-circle" class="w-4 h-4" />
                </Button>

                <Button
                  @click="addToFavorites(tool)"
                  text
                  rounded
                  class="!p-2"
                  v-tooltip.top="'收藏工具'"
                >
                  <Icon name="heroicons:heart" class="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>

          <!-- 悬停时的光效 -->
          <div class="absolute inset-0 bg-gradient-to-r from-blue-500/0 via-purple-500/0 to-cyan-500/0 group-hover:from-blue-500/5 group-hover:via-purple-500/5 group-hover:to-cyan-500/5 transition-all duration-300 pointer-events-none rounded-xl"></div>
        </div>
      </div>

      <!-- 工具统计 -->
      <div class="bg-gradient-to-r from-blue-50 via-purple-50 to-cyan-50 dark:from-blue-900/20 dark:via-purple-900/20 dark:to-cyan-900/20 rounded-2xl p-8 mb-12 animate-on-scroll">
        <div class="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div
            v-for="(stat, index) in toolStats"
            :key="stat.label"
            class="animate-on-scroll"
            :style="{ animationDelay: `${index * 200}ms` }"
          >
            <div :class="[
              'text-3xl font-bold mb-2 animate-count-up',
              stat.color
            ]">
              {{ stat.value }}
            </div>
            <div class="text-sm text-gray-600 dark:text-gray-400 font-medium">
              {{ stat.label }}
            </div>
            <div class="text-xs text-gray-500 dark:text-gray-500 mt-1">
              {{ stat.description }}
            </div>
          </div>
        </div>
      </div>

      <!-- 查看完整工具库 -->
      <div class="text-center animate-on-scroll">
        <div class="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg border border-gray-200 dark:border-gray-700 max-w-2xl mx-auto">
          <Icon name="mdi:treasure-chest" class="w-16 h-16 text-blue-600 dark:text-blue-400 mx-auto mb-4" />
          <h3 class="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            发现更多AI工具
          </h3>
          <p class="text-gray-600 dark:text-gray-400 mb-6">
            浏览完整的308+AI工具库，按场景、功能、价格筛选，找到最适合你的开发助手。
            每个工具都有详细评测和使用指南。
          </p>
          <div class="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              @click="exploreAllTools"
              class="btn-ai-gradient !px-8 !py-4 !text-lg !font-semibold"
              size="large"
            >
              <Icon name="mdi:compass" class="w-5 h-5 mr-2" />
              探索完整工具库
            </Button>
            
            <Button 
              @click="getToolRecommendation"
              outlined
              size="large"
              class="!px-8 !py-4 !text-lg !font-semibold !border-2"
            >
              <Icon name="mdi:magic-staff" class="w-5 h-5 mr-2" />
              获取个性化推荐
            </Button>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
/**
 * 精选AI工具展示组件
 * 展示推荐的AI开发工具和完整工具库入口
 */

// 响应式状态
const activeCategory = ref('all')

// 工具分类数据
const toolCategories = [
  { id: 'all', name: '全部工具', icon: 'mdi:apps', count: 308 },
  { id: 'coding', name: '代码生成', icon: 'mdi:code-tags', count: 45 },
  { id: 'design', name: '设计转换', icon: 'heroicons:paint-brush', count: 28 },
  { id: 'testing', name: '自动测试', icon: 'heroicons:bug-ant', count: 22 },
  { id: 'analysis', name: '需求分析', icon: 'heroicons:document-magnifying-glass', count: 18 },
  { id: 'optimization', name: '性能优化', icon: 'heroicons:bolt', count: 31 }
]

// 精选工具数据
const featuredTools = [
  {
    id: 'cursor',
    name: 'Cursor',
    description: 'AI驱动的现代代码编辑器，智能补全和重构',
    icon: 'mdi:cursor-default',
    iconBg: 'bg-gradient-to-br from-blue-500 to-indigo-600',
    iconColor: 'text-white',
    category: 'coding',
    rating: 4.9,
    users: '500K+',
    pricing: 'free',
    isPro: true,
    isPopular: true,
    efficiency: 85,
    features: ['智能代码生成', 'AI重构', '上下文理解', '多语言支持'],
    useCase: '适用于所有类型的编程项目，特别是大型代码库的开发和维护',
  },
  {
    id: 'chatgpt',
    name: 'ChatGPT',
    description: 'OpenAI的强大对话AI，擅长代码生成和问题解答',
    icon: 'simple-icons:openai',
    iconBg: 'bg-gradient-to-br from-green-500 to-teal-600',
    iconColor: 'text-white',
    category: 'coding',
    rating: 4.8,
    users: '100M+',
    pricing: 'free',
    isPro: true,
    isPopular: true,
    efficiency: 75,
    features: ['对话式编程', '代码解释', '算法优化', '技术问答'],
    useCase: '代码生成、技术学习、算法优化、编程问题解答',
  },
  {
    id: 'claude',
    name: 'Claude',
    description: 'Anthropic的AI助手，专业的编程协作伙伴',
    icon: 'simple-icons:anthropic',
    iconBg: 'bg-gradient-to-br from-purple-500 to-pink-600',
    iconColor: 'text-white',
    category: 'coding',
    rating: 4.7,
    users: '10M+',
    pricing: 'free',
    isPro: true,
    isPopular: false,
    efficiency: 80,
    features: ['长文本处理', '代码审查', '架构设计', '文档生成'],
    useCase: '复杂项目的代码审查、架构讨论、技术文档编写',
  },
  {
    id: 'v0-dev',
    name: 'v0.dev',
    description: 'Vercel的UI生成工具，从描述到React组件',
    icon: 'mdi:react',
    iconBg: 'bg-gradient-to-br from-cyan-500 to-blue-600',
    iconColor: 'text-white',
    category: 'design',
    rating: 4.6,
    users: '200K+',
    pricing: 'paid',
    isPro: false,
    isPopular: true,
    efficiency: 70,
    features: ['UI组件生成', 'React代码', 'Tailwind样式', '响应式设计'],
    useCase: '快速原型开发、UI组件库构建、设计系统实现',
  },
  {
    id: 'github-copilot',
    name: 'GitHub Copilot',
    description: '微软的AI编程助手，智能代码补全',
    icon: 'mdi:github',
    iconBg: 'bg-gradient-to-br from-gray-700 to-gray-900',
    iconColor: 'text-white',
    category: 'coding',
    rating: 4.5,
    users: '1M+',
    pricing: 'paid',
    isPro: false,
    isPopular: true,
    efficiency: 65,
    features: ['实时补全', '函数生成', '注释转代码', 'IDE集成'],
    useCase: '日常编码、函数实现、单元测试生成、代码注释',
  },
  {
    id: 'perplexity',
    name: 'Perplexity AI',
    description: 'AI搜索引擎，快速获取准确的技术信息',
    icon: 'mdi:magnify',
    iconBg: 'bg-gradient-to-br from-orange-500 to-red-600',
    iconColor: 'text-white',
    category: 'analysis',
    rating: 4.4,
    users: '50M+',
    pricing: 'free',
    isPro: true,
    isPopular: false,
    efficiency: 60,
    features: ['实时搜索', '资料整合', '引用来源', '多语言支持'],
    useCase: '技术调研、API文档查找、最佳实践研究、问题排查',
  }
]

// 工具统计数据
const toolStats = [
  {
    label: '精选工具',
    value: '308+',
    description: '经过实战验证',
    color: 'text-blue-600 dark:text-blue-400'
  },
  {
    label: '应用场景',
    value: '6大',
    description: '全流程覆盖',
    color: 'text-green-600 dark:text-green-400'
  },
  {
    label: '平均效率提升',
    value: '68%',
    description: '基于实际测试',
    color: 'text-purple-600 dark:text-purple-400'
  },
  {
    label: '免费工具',
    value: '180+',
    description: '无成本体验',
    color: 'text-orange-600 dark:text-orange-400'
  }
]

// 计算属性
const filteredTools = computed(() => {
  if (activeCategory.value === 'all') {
    return featuredTools
  }
  return featuredTools.filter(tool => tool.category === activeCategory.value)
})

// 方法
const tryTool = (tool: any) => {
  // 打开工具试用页面
  if (tool.pricing === 'free') {
    window.open(`https://${tool.id}.com`, '_blank')
  } else {
    viewDetails(tool)
  }
}

const viewDetails = (tool: any) => {
  navigateTo(`/tools/${tool.id}`)
}

const addToFavorites = (tool: any) => {
  console.log('收藏工具:', tool.name)
  // 实现收藏功能
}

const exploreAllTools = () => {
  navigateTo('/tools')
}

const getToolRecommendation = () => {
  navigateTo('/tools/recommend')
}
</script>

<style scoped>
/**
 * 精选AI工具展示组件样式
 */

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

/* 行高限制 */
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
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

/* 数字计数动画 */
.animate-count-up {
  animation: countUp 1.5s ease-out;
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

/* 进度条动画 */
.h-2 {
  animation: progressBar 1.5s ease-out;
}

@keyframes progressBar {
  from { width: 0%; }
}

/* 分类按钮动画 */
button {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

/* 工具卡片光效 */
.group .absolute.inset-0 {
  transition: all 0.5s ease;
}

/* 渐变背景动画 */
.bg-gradient-to-r,
.bg-gradient-to-br {
  background-size: 200% 200%;
  animation: gradientShift 8s ease infinite;
}

@keyframes gradientShift {
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}

/* 标签样式微调 */
:deep(.p-tag) {
  font-size: 0.75rem;
  padding: 0.25rem 0.5rem;
}

/* 响应式优化 */
@media (max-width: 1024px) {
  .grid.lg\:grid-cols-3 {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 768px) {
  .grid.md\:grid-cols-2 {
    grid-template-columns: 1fr;
  }
  
  .grid.md\:grid-cols-4 {
    grid-template-columns: repeat(2, 1fr);
  }
  
  .flex.flex-wrap {
    flex-direction: column;
    align-items: stretch;
  }
  
  .flex.flex-col.sm\:flex-row {
    flex-direction: column;
    gap: 1rem;
  }
  
  .p-8 {
    padding: 1.5rem;
  }
  
  .p-6 {
    padding: 1rem;
  }
}

/* 无障碍优化 */
button:focus {
  outline: 2px solid #3b82f6;
  outline-offset: 2px;
}

/* 减少动画对于偏好减少动效的用户 */
@media (prefers-reduced-motion: reduce) {
  .animate-on-scroll,
  .group,
  .group:hover,
  .animate-count-up,
  .transition-all,
  .transition-transform,
  .bg-gradient-to-r,
  .bg-gradient-to-br,
  .h-2 {
    animation: none !important;
    transition: none !important;
    transform: none !important;
  }
}

/* Tooltip 样式优化 */
:deep(.p-tooltip) {
  font-size: 0.75rem;
}

/* 深色模式优化 */
.dark .shadow-xl {
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.3), 0 10px 10px -5px rgba(0, 0, 0, 0.1);
}
</style>