<template>
  <section id="workflow-section" class="py-20 bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-purple-900">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- 章节标题 -->
      <div class="text-center mb-16 animate-on-scroll">
        <div class="inline-flex items-center space-x-2 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-200 px-4 py-2 rounded-full text-sm font-medium mb-4">
          <Icon name="mdi:workflow" class="w-4 h-4" />
          <span>AI工作流</span>
        </div>
        <h2 class="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
          从<span class="text-gradient-ai">"代码实现者"</span>到<span class="text-gradient-ai">"AI协作者"</span>
        </h2>
        <p class="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
          基于滴滴工程师实践经验，探索AI融入前端开发工作流的6大应用场景，
          实现<strong class="text-blue-600 dark:text-blue-400">68%效率提升</strong>。
        </p>
      </div>

      <!-- 工作流概览 -->
      <div class="grid lg:grid-cols-2 gap-12 items-center mb-20">
        <!-- 左侧：核心理念 -->
        <div class="animate-on-scroll">
          <h3 class="text-2xl font-bold text-gray-900 dark:text-white mb-6">
            🎯 核心理念：分治实现 + 迭代优化
          </h3>
          
          <div class="space-y-6">
            <!-- 分治实现 -->
            <div class="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
              <div class="flex items-start space-x-4">
                <div class="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Icon name="mdi:puzzle" class="w-6 h-6 text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <h4 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">分治实现</h4>
                  <ul class="text-gray-600 dark:text-gray-400 space-y-1">
                    <li>• 复杂需求拆解为独立小任务</li>
                    <li>• AI负责代码实现，人负责架构决策</li>
                    <li>• 多任务并行处理，效率倍增</li>
                  </ul>
                </div>
              </div>
            </div>

            <!-- 迭代优化 -->
            <div class="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
              <div class="flex items-start space-x-4">
                <div class="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Icon name="mdi:refresh" class="w-6 h-6 text-purple-600 dark:text-purple-400" />
                </div>
                <div>
                  <h4 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">迭代优化</h4>
                  <ul class="text-gray-600 dark:text-gray-400 space-y-1">
                    <li>• AI快速生成初始代码版本</li>
                    <li>• 基于反馈持续改进完善</li>
                    <li>• 成功模式固化为可复用流程</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- 右侧：效率对比图 -->
        <div class="animate-on-scroll">
          <div class="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg border border-gray-200 dark:border-gray-700">
            <h4 class="text-xl font-bold text-gray-900 dark:text-white mb-6 text-center">
              开发效率对比
            </h4>
            
            <!-- 传统开发 vs AI辅助开发 -->
            <div class="space-y-6">
              <div>
                <div class="flex justify-between items-center mb-2">
                  <span class="text-sm font-medium text-gray-700 dark:text-gray-300">传统开发流程</span>
                  <span class="text-sm text-gray-500 dark:text-gray-400">31小时</span>
                </div>
                <div class="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
                  <div class="bg-gray-400 h-3 rounded-full" style="width: 100%"></div>
                </div>
              </div>
              
              <div>
                <div class="flex justify-between items-center mb-2">
                  <span class="text-sm font-medium text-gray-700 dark:text-gray-300">AI辅助开发</span>
                  <span class="text-sm text-green-600 dark:text-green-400 font-semibold">9.9小时</span>
                </div>
                <div class="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
                  <div class="bg-gradient-to-r from-green-500 to-blue-500 h-3 rounded-full animate-pulse" style="width: 32%"></div>
                </div>
              </div>
              
              <div class="text-center pt-4 border-t border-gray-200 dark:border-gray-700">
                <div class="text-3xl font-bold text-green-600 dark:text-green-400 mb-1">68%</div>
                <div class="text-sm text-gray-600 dark:text-gray-400">效率提升</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 六大应用场景 -->
      <div class="animate-on-scroll">
        <h3 class="text-2xl font-bold text-gray-900 dark:text-white text-center mb-12">
          🛠️ 六大应用场景深度实践
        </h3>
        
        <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <WorkflowCard
            v-for="(scenario, index) in workflowScenarios"
            :key="scenario.id"
            :scenario="scenario"
            :index="index"
            @click="openScenarioDetail"
          />
        </div>
      </div>

      <!-- 数据统计 -->
      <div class="mt-20 animate-on-scroll">
        <div class="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg border border-gray-200 dark:border-gray-700">
          <h3 class="text-xl font-bold text-gray-900 dark:text-white text-center mb-8">
            📊 量化效果展示
          </h3>
          
          <div class="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div
              v-for="stat in efficiencyStats"
              :key="stat.label"
              class="text-center"
            >
              <div :class="[
                'text-3xl font-bold mb-2',
                stat.color
              ]">
                {{ stat.value }}
              </div>
              <div class="text-sm text-gray-600 dark:text-gray-400">
                {{ stat.label }}
              </div>
              <div class="text-xs text-gray-500 dark:text-gray-500 mt-1">
                {{ stat.description }}
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 行动号召 -->
      <div class="text-center mt-16 animate-on-scroll">
        <h3 class="text-2xl font-bold text-gray-900 dark:text-white mb-4">
          准备好开始你的AI工作流之旅了吗？
        </h3>
        <p class="text-lg text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
          深入了解每个应用场景的具体实践，获取详细的实施指南和最佳实践经验。
        </p>
        <div class="flex flex-col sm:flex-row gap-4 justify-center">
          <Button 
            @click="navigateToBlog"
            class="btn-ai-gradient !px-8 !py-4 !text-lg !font-semibold"
            size="large"
          >
            <Icon name="heroicons:document-text" class="w-5 h-5 mr-2" />
            阅读深度解析文章
          </Button>
          
          <Button 
            @click="navigateToTools"
            severity="secondary"
            outlined
            class="!px-8 !py-4 !text-lg !font-semibold !border-2"
            size="large"
          >
            <Icon name="mdi:robot" class="w-5 h-5 mr-2" />
            探索AI工具库
          </Button>
        </div>
      </div>
    </div>

    <!-- 场景详情模态框 -->
    <ScenarioDetailModal 
      v-model:visible="scenarioDetailVisible"
      :scenario="selectedScenario"
    />
  </section>
</template>

<script setup lang="ts">
/**
 * AI工作流展示组件
 * 展示滴滴工程师的AI工作流实践和六大应用场景
 */

// 响应式数据
const scenarioDetailVisible = ref(false)
const selectedScenario = ref(null)

// 六大应用场景数据
const workflowScenarios = [
  {
    id: 'requirement-analysis',
    title: '智能需求分析',
    icon: 'heroicons:document-magnifying-glass',
    color: 'blue',
    efficiency: '70%',
    description: 'AI辅助PRD文档解析，自动提取关键信息和风险点',
    benefits: [
      '需求理解时间减少70%',
      '需求遗漏率降低85%',
      '方案评估效率提升3倍'
    ],
    tools: ['ChatGPT', 'Claude', 'Perplexity'],
    example: 'AI分析产品需求文档，自动生成结构化需求清单和技术可行性评估'
  },
  {
    id: 'tech-design',
    title: '智能技术方案',
    icon: 'heroicons:cog-6-tooth',
    color: 'purple',
    efficiency: '67%',
    description: 'AI作为资深技术顾问，提供架构设计和技术选型建议',
    benefits: [
      '方案设计时间减少67%',
      '技术选型准确率提升',
      '架构风险预警机制'
    ],
    tools: ['ChatGPT', 'Claude', 'GitHub Copilot'],
    example: 'AI协助选择微前端架构，分析技术栈优劣势和迁移策略'
  },
  {
    id: 'ui-development',
    title: 'UI开发自动化',
    icon: 'heroicons:paint-brush',
    color: 'green',
    efficiency: '60%',
    description: '设计稿转代码，自动生成响应式UI组件',
    benefits: [
      'UI开发时间减少60%',
      '设计还原度90%+',
      '自动适配暗黑模式'
    ],
    tools: ['v0.dev', 'Cursor', 'Figma AI'],
    example: '从设计稿直接生成Vue组件代码，包含完整的样式和交互逻辑'
  },
  {
    id: 'code-refactor',
    title: '代码重构优化',
    icon: 'heroicons:arrow-path',
    color: 'orange',
    efficiency: '70%',
    description: 'AI驱动的代码重构，提升代码质量和可维护性',
    benefits: [
      '重构时间减少70%',
      '代码复用性提升80%',
      'Bug数量减少60%'
    ],
    tools: ['Cursor', 'GitHub Copilot', 'Claude'],
    example: 'AI识别代码重复模式，自动提取公共逻辑并生成优雅的抽象'
  },
  {
    id: 'auto-testing',
    title: '自动化测试',
    icon: 'heroicons:bug-ant',
    color: 'red',
    efficiency: '75%',
    description: 'AI生成单元测试和E2E测试用例，提升代码覆盖率',
    benefits: [
      '测试编写时间减少75%',
      '测试覆盖率提升到85%',
      '测试场景增加200%'
    ],
    tools: ['GitHub Copilot', 'ChatGPT', 'Cursor'],
    example: 'AI分析函数逻辑，自动生成完整的Jest测试用例和边界条件测试'
  },
  {
    id: 'quality-check',
    title: '代码质量检测',
    icon: 'heroicons:shield-check',
    color: 'cyan',
    efficiency: '75%',
    description: 'AI驱动的代码审查，自动检测问题并提供优化建议',
    benefits: [
      '代码审查时间减少75%',
      '安全问题检测率提升',
      '自动生成改进建议'
    ],
    tools: ['GitHub Copilot', 'Cursor', 'ESLint AI'],
    example: 'AI自动检测性能问题、安全漏洞和代码异味，并提供具体修复建议'
  }
]

// 效率统计数据
const efficiencyStats = [
  {
    label: '平均效率提升',
    value: '68%',
    description: '综合各开发阶段',
    color: 'text-green-600 dark:text-green-400'
  },
  {
    label: '开发时间节省',
    value: '21小时',
    description: '单个项目周期',
    color: 'text-blue-600 dark:text-blue-400'
  },
  {
    label: 'Bug减少',
    value: '60%',
    description: '代码质量提升',
    color: 'text-purple-600 dark:text-purple-400'
  },
  {
    label: '测试覆盖率',
    value: '85%',
    description: '从40%提升',
    color: 'text-orange-600 dark:text-orange-400'
  }
]

// 方法
const openScenarioDetail = (scenario: any) => {
  selectedScenario.value = scenario
  scenarioDetailVisible.value = true
}

const navigateToBlog = () => {
  navigateTo('/blog/ai-workflow-analysis')
}

const navigateToTools = () => {
  navigateTo('/tools')
}
</script>

<style scoped>
/**
 * AI工作流展示组件样式
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

/* 卡片悬停效果 */
.bg-white:hover,
.dark .bg-gray-800:hover {
  transform: translateY(-2px);
  transition: all 0.3s ease;
}

/* 进度条动画 */
.animate-pulse {
  animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}

/* 响应式优化 */
@media (max-width: 768px) {
  .grid {
    gap: 1rem;
  }
  
  .flex-col.sm\:flex-row {
    flex-direction: column;
    gap: 1rem;
  }
}

/* 滚动动画 */
.animate-on-scroll {
  opacity: 0;
  transform: translateY(20px);
  transition: all 0.6s ease-out;
}

.animate-on-scroll.animate-fade-in {
  opacity: 1;
  transform: translateY(0);
}

/* 数据统计数字动画 */
@keyframes countUp {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.text-3xl {
  animation: countUp 0.8s ease-out;
}

/* 背景装饰 */
.bg-gradient-to-br {
  background-size: 400% 400%;
  animation: gradientShift 8s ease infinite;
}

@keyframes gradientShift {
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}
</style>
