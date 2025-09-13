<template>
  <div
    class="group relative bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700 hover:shadow-lg hover:border-blue-300 dark:hover:border-blue-600 transition-all duration-300 cursor-pointer"
    @click="$emit('click', scenario)"
  >
    <!-- 场景图标和效率提升 -->
    <div class="flex items-center justify-between mb-4">
      <div :class="[
        'w-12 h-12 rounded-lg flex items-center justify-center',
        getIconBackground(scenario.color)
      ]">
        <Icon :name="scenario.icon" :class="[
          'w-6 h-6',
          getIconColor(scenario.color)
        ]" />
      </div>
      
      <div class="text-right">
        <div :class="[
          'text-2xl font-bold',
          getTextColor(scenario.color)
        ]">
          {{ scenario.efficiency }}
        </div>
        <div class="text-xs text-gray-500 dark:text-gray-400">效率提升</div>
      </div>
    </div>

    <!-- 场景标题和描述 -->
    <div class="mb-4">
      <h4 class="text-lg font-semibold text-gray-900 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
        {{ scenario.title }}
      </h4>
      <p class="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
        {{ scenario.description }}
      </p>
    </div>

    <!-- 主要收益 -->
    <div class="mb-4">
      <div class="flex items-center space-x-1 mb-2">
        <Icon name="heroicons:check-badge" class="w-4 h-4 text-green-500" />
        <span class="text-xs font-medium text-gray-700 dark:text-gray-300">核心收益</span>
      </div>
      <ul class="space-y-1">
        <li 
          v-for="benefit in scenario.benefits.slice(0, 2)" 
          :key="benefit"
          class="text-xs text-gray-600 dark:text-gray-400 flex items-start"
        >
          <span class="text-green-500 mr-1">•</span>
          <span class="flex-1">{{ benefit }}</span>
        </li>
      </ul>
    </div>

    <!-- 推荐工具 -->
    <div class="mb-4">
      <div class="flex items-center space-x-1 mb-2">
        <Icon name="mdi:robot" class="w-4 h-4 text-blue-500" />
        <span class="text-xs font-medium text-gray-700 dark:text-gray-300">推荐工具</span>
      </div>
      <div class="flex items-center space-x-1 flex-wrap gap-1">
        <Tag
          v-for="tool in scenario.tools.slice(0, 3)"
          :key="tool"
          :value="tool"
          severity="secondary"
          rounded
          class="!text-xs !py-1 !px-2"
        />
        <span v-if="scenario.tools.length > 3" class="text-xs text-gray-400">
          +{{ scenario.tools.length - 3 }}
        </span>
      </div>
    </div>

    <!-- 实际案例预览 -->
    <div class="text-xs text-gray-500 dark:text-gray-400 mb-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg p-3">
      <div class="flex items-center space-x-1 mb-1">
        <Icon name="heroicons:light-bulb" class="w-3 h-3" />
        <span class="font-medium">实践案例</span>
      </div>
      <p class="line-clamp-2">{{ scenario.example }}</p>
    </div>

    <!-- 查看详情按钮 -->
    <div class="flex items-center justify-between">
      <div class="text-xs text-gray-400">
        点击查看详细实现
      </div>
      <Icon 
        name="heroicons:arrow-right" 
        class="w-4 h-4 text-gray-400 group-hover:text-blue-500 group-hover:translate-x-1 transition-all duration-200" 
      />
    </div>

    <!-- 悬停效果装饰 -->
    <div class="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-500/0 via-purple-500/0 to-cyan-500/0 group-hover:from-blue-500/5 group-hover:via-purple-500/5 group-hover:to-cyan-500/5 transition-all duration-300 pointer-events-none"></div>
    
    <!-- 活跃状态指示器 -->
    <div :class="[
      'absolute top-2 right-2 w-2 h-2 rounded-full transition-all duration-300',
      'opacity-0 group-hover:opacity-100',
      getIndicatorColor(scenario.color)
    ]"></div>
  </div>
</template>

<script setup lang="ts">
/**
 * 工作流场景卡片组件
 * 展示AI工作流的单个应用场景
 */

interface Scenario {
  id: string
  title: string
  icon: string
  color: string
  efficiency: string
  description: string
  benefits: string[]
  tools: string[]
  example: string
}

interface Props {
  scenario: Scenario
  index: number
}

interface Emits {
  (e: 'click', scenario: Scenario): void
}

defineProps<Props>()
defineEmits<Emits>()

// 样式辅助方法
const getIconBackground = (color: string) => {
  const backgrounds: Record<string, string> = {
    blue: 'bg-blue-100 dark:bg-blue-900/30',
    purple: 'bg-purple-100 dark:bg-purple-900/30',
    green: 'bg-green-100 dark:bg-green-900/30',
    orange: 'bg-orange-100 dark:bg-orange-900/30',
    red: 'bg-red-100 dark:bg-red-900/30',
    cyan: 'bg-cyan-100 dark:bg-cyan-900/30'
  }
  return backgrounds[color] || backgrounds.blue
}

const getIconColor = (color: string) => {
  const colors: Record<string, string> = {
    blue: 'text-blue-600 dark:text-blue-400',
    purple: 'text-purple-600 dark:text-purple-400',
    green: 'text-green-600 dark:text-green-400',
    orange: 'text-orange-600 dark:text-orange-400',
    red: 'text-red-600 dark:text-red-400',
    cyan: 'text-cyan-600 dark:text-cyan-400'
  }
  return colors[color] || colors.blue
}

const getTextColor = (color: string) => {
  const colors: Record<string, string> = {
    blue: 'text-blue-600 dark:text-blue-400',
    purple: 'text-purple-600 dark:text-purple-400',
    green: 'text-green-600 dark:text-green-400',
    orange: 'text-orange-600 dark:text-orange-400',
    red: 'text-red-600 dark:text-red-400',
    cyan: 'text-cyan-600 dark:text-cyan-400'
  }
  return colors[color] || colors.blue
}

const getIndicatorColor = (color: string) => {
  const colors: Record<string, string> = {
    blue: 'bg-blue-500',
    purple: 'bg-purple-500',
    green: 'bg-green-500',
    orange: 'bg-orange-500',
    red: 'bg-red-500',
    cyan: 'bg-cyan-500'
  }
  return colors[color] || colors.blue
}
</script>

<style scoped>
/**
 * 工作流卡片样式
 */

/* 行高限制 */
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

/* 卡片悬停效果 */
.group:hover {
  transform: translateY(-2px);
}

/* 图标悬停动画 */
.group:hover .w-6.h-6 {
  transform: scale(1.1);
  transition: transform 0.2s ease;
}

/* 标签样式微调 */
:deep(.p-tag) {
  font-size: 0.75rem;
  padding: 0.25rem 0.5rem;
}

/* 渐变悬停背景 */
.absolute.inset-0 {
  z-index: -1;
}

/* 无障碍优化 */
.cursor-pointer:focus {
  outline: 2px solid #3b82f6;
  outline-offset: 2px;
}

/* 响应式优化 */
@media (max-width: 640px) {
  .p-6 {
    padding: 1rem;
  }
  
  .text-lg {
    font-size: 1rem;
  }
  
  .w-12.h-12 {
    width: 2.5rem;
    height: 2.5rem;
  }
}

/* 减少动画对于偏好减少动效的用户 */
@media (prefers-reduced-motion: reduce) {
  .group,
  .group:hover,
  .transition-all,
  .group:hover .w-6.h-6,
  .group-hover\:translate-x-1 {
    transition: none !important;
    transform: none !important;
  }
}

/* 深色模式优化 */
.dark .bg-gray-50 {
  background-color: rgba(55, 65, 81, 0.5);
}

/* 边框悬停动画 */
.border {
  transition: border-color 0.3s ease;
}

/* 阴影过渡 */
.shadow-sm {
  transition: box-shadow 0.3s ease;
}
</style>