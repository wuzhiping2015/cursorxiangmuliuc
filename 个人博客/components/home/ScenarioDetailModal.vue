<template>
  <Dialog
    v-model:visible="isVisible"
    modal
    :closable="true"
    class="scenario-detail-modal"
    :style="{ width: '90vw', maxWidth: '800px' }"
    :content-style="{ padding: 0 }"
  >
    <template #header>
      <div v-if="scenario" class="flex items-center space-x-3">
        <div :class="[
          'w-10 h-10 rounded-lg flex items-center justify-center',
          getIconBackground(scenario.color)
        ]">
          <Icon :name="scenario.icon" :class="[
            'w-5 h-5',
            getIconColor(scenario.color)
          ]" />
        </div>
        <div>
          <h3 class="text-xl font-bold text-gray-900 dark:text-white">
            {{ scenario.title }}
          </h3>
          <p class="text-sm text-gray-600 dark:text-gray-400">
            {{ scenario.description }}
          </p>
        </div>
      </div>
    </template>

    <div v-if="scenario" class="p-6 space-y-6">
      <!-- 效率统计 -->
      <div class="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-xl p-6">
        <div class="text-center">
          <div :class="[
            'text-4xl font-bold mb-2',
            getTextColor(scenario.color)
          ]">
            {{ scenario.efficiency }}
          </div>
          <div class="text-lg font-semibold text-gray-900 dark:text-white mb-1">
            效率提升
          </div>
          <p class="text-sm text-gray-600 dark:text-gray-400">
            相比传统开发流程的时间节省
          </p>
        </div>
      </div>

      <!-- 核心收益详解 -->
      <div>
        <h4 class="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
          <Icon name="heroicons:check-badge" class="w-5 h-5 text-green-500 mr-2" />
          核心收益
        </h4>
        <div class="grid gap-3">
          <div
            v-for="(benefit, index) in scenario.benefits"
            :key="index"
            class="flex items-start space-x-3 bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700"
          >
            <div class="w-6 h-6 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
              <Icon name="heroicons:check" class="w-4 h-4 text-green-600 dark:text-green-400" />
            </div>
            <div class="flex-1">
              <p class="text-sm text-gray-800 dark:text-gray-200 font-medium">
                {{ benefit }}
              </p>
            </div>
          </div>
        </div>
      </div>

      <!-- 推荐工具详解 -->
      <div>
        <h4 class="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
          <Icon name="mdi:robot" class="w-5 h-5 text-blue-500 mr-2" />
          推荐工具
        </h4>
        <div class="flex flex-wrap gap-3">
          <div
            v-for="tool in scenario.tools"
            :key="tool"
            class="bg-white dark:bg-gray-800 rounded-lg p-3 border border-gray-200 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-600 transition-colors cursor-pointer"
            @click="openToolLink(tool)"
          >
            <div class="flex items-center space-x-2">
              <Icon :name="getToolIcon(tool)" class="w-5 h-5 text-blue-600 dark:text-blue-400" />
              <span class="text-sm font-medium text-gray-900 dark:text-white">{{ tool }}</span>
            </div>
            <p class="text-xs text-gray-600 dark:text-gray-400 mt-1">
              {{ getToolDescription(tool) }}
            </p>
          </div>
        </div>
      </div>

      <!-- 实践案例详解 -->
      <div>
        <h4 class="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
          <Icon name="heroicons:light-bulb" class="w-5 h-5 text-yellow-500 mr-2" />
          实践案例
        </h4>
        <div class="bg-yellow-50 dark:bg-yellow-900/20 rounded-xl p-6 border border-yellow-200 dark:border-yellow-800">
          <div class="flex items-start space-x-3">
            <div class="w-8 h-8 bg-yellow-100 dark:bg-yellow-900/30 rounded-lg flex items-center justify-center flex-shrink-0">
              <Icon name="heroicons:sparkles" class="w-4 h-4 text-yellow-600 dark:text-yellow-400" />
            </div>
            <div class="flex-1">
              <h5 class="font-semibold text-gray-900 dark:text-white mb-2">滴滴实践场景</h5>
              <p class="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
                {{ scenario.example }}
              </p>
            </div>
          </div>
        </div>
      </div>

      <!-- 实施步骤 -->
      <div>
        <h4 class="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
          <Icon name="heroicons:list-bullet" class="w-5 h-5 text-purple-500 mr-2" />
          实施步骤
        </h4>
        <div class="space-y-4">
          <div
            v-for="(step, index) in getImplementationSteps(scenario.id)"
            :key="index"
            class="flex items-start space-x-4"
          >
            <div class="w-8 h-8 bg-purple-100 dark:bg-purple-900/30 rounded-full flex items-center justify-center flex-shrink-0">
              <span class="text-sm font-bold text-purple-600 dark:text-purple-400">
                {{ index + 1 }}
              </span>
            </div>
            <div class="flex-1">
              <h6 class="font-medium text-gray-900 dark:text-white mb-1">
                {{ step.title }}
              </h6>
              <p class="text-sm text-gray-600 dark:text-gray-400">
                {{ step.description }}
              </p>
            </div>
          </div>
        </div>
      </div>

      <!-- 相关资源 -->
      <div>
        <h4 class="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
          <Icon name="heroicons:link" class="w-5 h-5 text-cyan-500 mr-2" />
          相关资源
        </h4>
        <div class="grid md:grid-cols-2 gap-3">
          <button
            v-for="resource in getRelatedResources(scenario.id)"
            :key="resource.title"
            @click="openResource(resource.url)"
            class="text-left bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-600 transition-colors"
          >
            <div class="flex items-center space-x-2 mb-2">
              <Icon :name="resource.icon" class="w-4 h-4 text-blue-600 dark:text-blue-400" />
              <span class="text-sm font-medium text-gray-900 dark:text-white">{{ resource.title }}</span>
            </div>
            <p class="text-xs text-gray-600 dark:text-gray-400">
              {{ resource.description }}
            </p>
          </button>
        </div>
      </div>

      <!-- 行动号召 -->
      <div class="bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl p-6 text-white text-center">
        <h4 class="text-lg font-bold mb-2">开始你的AI工作流实践</h4>
        <p class="text-blue-100 mb-4">
          立即应用这些实践经验，体验AI辅助开发的效率提升
        </p>
        <div class="flex flex-col sm:flex-row gap-3 justify-center">
          <Button 
            @click="navigateToBlog"
            severity="secondary"
            class="!bg-white !text-blue-600 !border-white hover:!bg-blue-50"
          >
            <Icon name="heroicons:document-text" class="w-4 h-4 mr-2" />
            阅读详细文章
          </Button>
          <Button 
            @click="navigateToTools"
            outlined
            class="!border-white !text-white hover:!bg-white/10"
          >
            <Icon name="mdi:robot" class="w-4 h-4 mr-2" />
            探索AI工具
          </Button>
        </div>
      </div>
    </div>
  </Dialog>
</template>

<script setup lang="ts">
/**
 * 场景详情模态框组件
 * 展示AI工作流场景的详细信息和实施指南
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
  visible: boolean
  scenario: Scenario | null
}

interface Emits {
  (e: 'update:visible', value: boolean): void
}

const props = defineProps<Props>()
const emit = defineEmits<Emits>()

// 计算属性
const isVisible = computed({
  get: () => props.visible,
  set: (value) => emit('update:visible', value)
})

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

// 工具相关方法
const getToolIcon = (tool: string) => {
  const icons: Record<string, string> = {
    'ChatGPT': 'simple-icons:openai',
    'Claude': 'simple-icons:anthropic',
    'Cursor': 'mdi:cursor-default',
    'GitHub Copilot': 'mdi:github',
    'Perplexity': 'mdi:magnify',
    'v0.dev': 'mdi:web',
    'Figma AI': 'mdi:figma',
    'ESLint AI': 'mdi:eslint'
  }
  return icons[tool] || 'mdi:robot'
}

const getToolDescription = (tool: string) => {
  const descriptions: Record<string, string> = {
    'ChatGPT': '强大的对话AI，擅长代码生成和问题解答',
    'Claude': 'Anthropic的AI助手，专业的编程协作伙伴',
    'Cursor': 'AI驱动的现代代码编辑器',
    'GitHub Copilot': '微软的AI编程助手',
    'Perplexity': 'AI搜索引擎，快速获取准确信息',
    'v0.dev': 'Vercel的UI生成AI工具',
    'Figma AI': '设计到代码的AI转换工具',
    'ESLint AI': 'AI增强的代码质量检测工具'
  }
  return descriptions[tool] || 'AI辅助开发工具'
}

// 实施步骤数据
const getImplementationSteps = (scenarioId: string) => {
  const steps: Record<string, Array<{ title: string; description: string }>> = {
    'requirement-analysis': [
      { title: '准备PRD文档', description: '整理产品需求文档，确保信息完整清晰' },
      { title: '选择AI工具', description: '根据文档复杂度选择合适的AI分析工具' },
      { title: '结构化分析', description: '让AI提取关键需求点和潜在风险' },
      { title: '验证结果', description: '与产品经理确认AI分析的准确性' }
    ],
    'tech-design': [
      { title: '明确技术需求', description: '整理功能需求和非功能需求' },
      { title: 'AI方案咨询', description: '向AI咨询技术方案和架构设计' },
      { title: '方案评估', description: '对比AI建议的多个技术方案' },
      { title: '决策确认', description: '结合实际情况做最终技术决策' }
    ],
    'ui-development': [
      { title: '设计稿准备', description: '整理设计稿和UI规范文档' },
      { title: 'AI代码生成', description: '使用AI工具将设计转换为代码' },
      { title: '样式调优', description: '根据实际需求调整生成的代码' },
      { title: '响应式适配', description: '确保在不同设备上的显示效果' }
    ],
    'code-refactor': [
      { title: '识别重构目标', description: '分析需要重构的代码模块' },
      { title: 'AI重构建议', description: '让AI分析代码问题并提供改进方案' },
      { title: '逐步重构', description: '按照AI建议逐步重构代码' },
      { title: '测试验证', description: '确保重构后功能正常运行' }
    ],
    'auto-testing': [
      { title: '分析测试需求', description: '明确需要测试的功能和场景' },
      { title: 'AI生成测试用例', description: '让AI生成全面的测试代码' },
      { title: '完善测试覆盖', description: '补充边界条件和异常场景测试' },
      { title: '集成CI/CD', description: '将自动化测试集成到持续集成流程' }
    ],
    'quality-check': [
      { title: '配置检测工具', description: '设置代码质量检测工具和规则' },
      { title: 'AI代码审查', description: '使用AI工具进行自动化代码审查' },
      { title: '问题修复', description: '根据AI建议修复发现的问题' },
      { title: '质量监控', description: '建立持续的代码质量监控机制' }
    ]
  }
  return steps[scenarioId] || []
}

// 相关资源数据
const getRelatedResources = (scenarioId: string) => {
  const resources: Record<string, Array<{ title: string; description: string; icon: string; url: string }>> = {
    'requirement-analysis': [
      { title: 'PRD模板', description: '标准化需求文档模板', icon: 'heroicons:document', url: '#' },
      { title: 'AI分析脚本', description: '需求分析的AI提示词', icon: 'mdi:robot', url: '#' }
    ],
    'tech-design': [
      { title: '架构设计指南', description: '技术架构设计最佳实践', icon: 'heroicons:building-library', url: '#' },
      { title: 'AI技术咨询模板', description: '与AI讨论技术方案的模板', icon: 'mdi:chat', url: '#' }
    ]
  }
  return resources[scenarioId] || [
    { title: '最佳实践文档', description: '该场景的详细实践指南', icon: 'heroicons:document-text', url: '#' },
    { title: 'AI工具推荐', description: '相关AI工具的使用指南', icon: 'mdi:robot', url: '#' }
  ]
}

// 方法
const openToolLink = (tool: string) => {
  // 这里可以打开对应工具的详细介绍页面
  console.log('打开工具:', tool)
}

const openResource = (url: string) => {
  if (url !== '#') {
    window.open(url, '_blank')
  }
}

const navigateToBlog = () => {
  isVisible.value = false
  navigateTo('/blog/ai-workflow-analysis')
}

const navigateToTools = () => {
  isVisible.value = false
  navigateTo('/tools')
}
</script>

<style scoped>
/**
 * 场景详情模态框样式
 */

/* 自定义滚动条 */
:deep(.p-dialog-content) {
  max-height: 80vh;
  overflow-y: auto;
}

:deep(.p-dialog-content)::-webkit-scrollbar {
  width: 6px;
}

:deep(.p-dialog-content)::-webkit-scrollbar-track {
  background: #f1f5f9;
}

.dark :deep(.p-dialog-content)::-webkit-scrollbar-track {
  background: #1e293b;
}

:deep(.p-dialog-content)::-webkit-scrollbar-thumb {
  background: #cbd5e1;
  border-radius: 3px;
}

.dark :deep(.p-dialog-content)::-webkit-scrollbar-thumb {
  background: #475569;
}

/* 模态框样式优化 */
:deep(.p-dialog-header) {
  border-bottom: 1px solid #e5e7eb;
  padding: 1.5rem;
}

.dark :deep(.p-dialog-header) {
  border-bottom-color: #374151;
}

/* 按钮悬停效果 */
button:hover {
  transform: translateY(-1px);
  transition: all 0.2s ease;
}

/* 卡片悬停效果 */
.bg-white:hover,
.dark .bg-gray-800:hover {
  transform: translateY(-1px);
  transition: all 0.2s ease;
}

/* 渐变背景 */
.bg-gradient-to-r {
  background-size: 200% 200%;
  animation: gradientShift 3s ease infinite;
}

@keyframes gradientShift {
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}

/* 响应式优化 */
@media (max-width: 640px) {
  .grid.md\:grid-cols-2 {
    grid-template-columns: 1fr;
  }
  
  .flex.flex-col.sm\:flex-row {
    flex-direction: column;
    gap: 0.75rem;
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
  *,
  button:hover,
  .bg-white:hover,
  .dark .bg-gray-800:hover {
    transition: none !important;
    transform: none !important;
    animation: none !important;
  }
}
</style>