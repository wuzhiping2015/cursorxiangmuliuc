<template>
  <div class="projects-page bg-slate-50 dark:bg-gray-900 min-h-screen">
    <!-- 页面头部 -->
    <section class="relative bg-gradient-to-br from-blue-600 via-indigo-700 to-purple-800 text-white py-20">
      <div class="absolute inset-0 bg-mesh-pattern opacity-20"></div>
      <div class="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h1 class="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
          企业级项目作品集
        </h1>
        <p class="text-xl text-blue-100 max-w-3xl mx-auto">
          8年+前端开发经验，主导过多个千万级用户产品的技术架构设计与实现
        </p>
        <div class="flex justify-center items-center space-x-8 mt-8 text-blue-200">
          <div class="text-center">
            <div class="text-3xl font-bold">50+</div>
            <div class="text-sm">企业项目</div>
          </div>
          <div class="text-center">
            <div class="text-3xl font-bold">1000万+</div>
            <div class="text-sm">用户覆盖</div>
          </div>
          <div class="text-center">
            <div class="text-3xl font-bold">95%</div>
            <div class="text-sm">项目成功率</div>
          </div>
        </div>
      </div>
    </section>

    <!-- 项目筛选 -->
    <section class="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 sticky top-0 z-40">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div class="flex flex-wrap items-center justify-between gap-4">
          <div class="flex items-center space-x-4">
            <span class="font-semibold text-gray-700 dark:text-gray-300">筛选项目：</span>
            <div class="flex flex-wrap gap-2">
              <Button
                v-for="category in categories"
                :key="category.id"
                :severity="selectedCategory === category.id ? 'primary' : 'secondary'"
                :outlined="selectedCategory !== category.id"
                size="small"
                @click="filterProjects(category.id)"
                class="!px-4 !py-2"
              >
                <Icon :name="category.icon" class="w-4 h-4 mr-2" />
                {{ category.name }}
              </Button>
            </div>
          </div>
          <div class="flex items-center space-x-2">
            <Icon name="heroicons:view-columns" class="w-5 h-5 text-gray-500" />
            <span class="text-sm text-gray-500">{{ filteredProjects.length }} 个项目</span>
          </div>
        </div>
      </div>
    </section>

    <!-- 核心项目展示 -->
    <section class="py-16">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="space-y-16">
          <!-- 特色项目 -->
          <div
            v-for="(project, index) in filteredProjects"
            :key="project.id"
            class="relative"
          >
            <!-- 大型项目卡片 -->
            <div class="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl overflow-hidden border border-gray-100 dark:border-gray-700">
              <div class="grid lg:grid-cols-12 gap-0">
                <!-- 项目信息 (7列) -->
                <div class="lg:col-span-7 p-8 lg:p-12">
                  <!-- 项目标签 -->
                  <div class="flex flex-wrap items-center gap-3 mb-6">
                    <div :class="`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-${project.category.color}-100 text-${project.category.color}-800 dark:bg-${project.category.color}-900/30 dark:text-${project.category.color}-300`">
                      <Icon :name="project.category.icon" class="w-4 h-4 mr-2" />
                      {{ project.category.name }}
                    </div>
                    <div v-if="project.featured" class="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300">
                      <Icon name="heroicons:star" class="w-4 h-4 mr-2" />
                      核心项目
                    </div>
                  </div>

                  <!-- 项目标题 -->
                  <h2 class="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                    {{ project.title }}
                  </h2>
                  <p class="text-lg text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
                    {{ project.description }}
                  </p>

                  <!-- 业务价值 -->
                  <div class="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-2xl p-6 mb-8">
                    <h3 class="font-semibold text-gray-800 dark:text-gray-200 mb-4 flex items-center">
                      <Icon name="heroicons:chart-bar-square" class="w-5 h-5 mr-2 text-blue-600" />
                      业务价值
                    </h3>
                    <div class="grid grid-cols-2 lg:grid-cols-4 gap-4">
                      <div v-for="metric in project.metrics" :key="metric.label" class="text-center">
                        <div class="text-2xl font-bold text-blue-600 dark:text-blue-400">
                          {{ metric.value }}
                        </div>
                        <div class="text-sm text-gray-600 dark:text-gray-400">
                          {{ metric.label }}
                        </div>
                      </div>
                    </div>
                  </div>

                  <!-- 技术栈 -->
                  <div class="mb-8">
                    <h3 class="font-semibold text-gray-800 dark:text-gray-200 mb-4 flex items-center">
                      <Icon name="heroicons:code-bracket" class="w-5 h-5 mr-2 text-purple-600" />
                      技术架构
                    </h3>
                    <div class="flex flex-wrap gap-2">
                      <span
                        v-for="tech in project.techStack"
                        :key="tech"
                        class="inline-flex items-center px-3 py-1 rounded-lg text-sm font-medium bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200"
                      >
                        {{ tech }}
                      </span>
                    </div>
                  </div>

                  <!-- 我的角色 -->
                  <div class="mb-8">
                    <h3 class="font-semibold text-gray-800 dark:text-gray-200 mb-3 flex items-center">
                      <Icon name="heroicons:user-circle" class="w-5 h-5 mr-2 text-green-600" />
                      项目角色
                    </h3>
                    <p class="text-gray-600 dark:text-gray-300">{{ project.role }}</p>
                  </div>

                  <!-- 项目亮点 -->
                  <div class="mb-8">
                    <h3 class="font-semibold text-gray-800 dark:text-gray-200 mb-4 flex items-center">
                      <Icon name="heroicons:sparkles" class="w-5 h-5 mr-2 text-yellow-600" />
                      技术亮点
                    </h3>
                    <ul class="space-y-2">
                      <li
                        v-for="highlight in project.highlights"
                        :key="highlight"
                        class="flex items-start space-x-3"
                      >
                        <Icon name="heroicons:check-circle" class="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                        <span class="text-gray-600 dark:text-gray-300">{{ highlight }}</span>
                      </li>
                    </ul>
                  </div>

                  <!-- 行动按钮 -->
                  <div class="flex flex-wrap gap-4">
                    <Button
                      v-if="project.liveUrl"
                      @click="openProject(project.liveUrl)"
                      class="btn-primary !px-6 !py-3"
                    >
                      <Icon name="heroicons:globe-alt" class="w-5 h-5 mr-2" />
                      查看项目
                    </Button>
                    <Button
                      v-if="project.githubUrl"
                      @click="openProject(project.githubUrl)"
                      severity="secondary"
                      outlined
                      class="!px-6 !py-3"
                    >
                      <Icon name="mdi:github" class="w-5 h-5 mr-2" />
                      源代码
                    </Button>
                    <Button
                      @click="viewDetails(project.id)"
                      text
                      class="!px-6 !py-3 text-blue-600 dark:text-blue-400"
                    >
                      <Icon name="heroicons:document-text" class="w-5 h-5 mr-2" />
                      技术详情
                    </Button>
                  </div>
                </div>

                <!-- 项目预览 (5列) -->
                <div class="lg:col-span-5 relative bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-700 dark:to-gray-800">
                  <!-- 项目截图/架构图 -->
                  <div class="p-8 h-full flex items-center justify-center">
                    <div class="relative w-full max-w-md">
                      <!-- 浏览器窗口框架 -->
                      <div class="bg-white dark:bg-gray-800 rounded-lg shadow-2xl overflow-hidden">
                        <div class="bg-gray-200 dark:bg-gray-700 px-4 py-3 flex items-center space-x-2">
                          <div class="w-3 h-3 bg-red-400 rounded-full"></div>
                          <div class="w-3 h-3 bg-yellow-400 rounded-full"></div>
                          <div class="w-3 h-3 bg-green-400 rounded-full"></div>
                          <div class="flex-1 bg-white dark:bg-gray-600 rounded-sm h-6 mx-4"></div>
                        </div>
                        <!-- 项目预览内容 -->
                        <div class="aspect-video bg-gradient-to-br from-blue-400 via-purple-500 to-pink-500 flex items-center justify-center">
                          <div class="text-center text-white">
                            <Icon :name="project.category.icon" class="w-16 h-16 mx-auto mb-4 opacity-80" />
                            <div class="font-semibold">{{ project.title }}</div>
                            <div class="text-sm opacity-80 mt-1">{{ project.category.name }}</div>
                          </div>
                        </div>
                      </div>
                      
                      <!-- 技术标签浮动 -->
                      <div class="absolute -top-4 -right-4 bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-semibold transform rotate-12">
                        {{ project.period }}
                      </div>
                      
                      <!-- 性能指标 -->
                      <div class="absolute -bottom-4 -left-4 bg-white dark:bg-gray-800 rounded-lg shadow-lg p-3 border border-gray-200 dark:border-gray-700">
                        <div class="text-xs text-gray-500 dark:text-gray-400 mb-1">性能评分</div>
                        <div class="flex items-center space-x-2">
                          <div class="w-8 h-2 bg-green-500 rounded-full"></div>
                          <span class="text-sm font-semibold text-green-600">95+</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 更多项目展示 -->
    <section class="bg-gray-50 dark:bg-gray-800 py-16">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-12">
          <h2 class="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            更多项目经验
          </h2>
          <p class="text-lg text-gray-600 dark:text-gray-300">
            涵盖电商、金融、社交、工具等多个领域的前端解决方案
          </p>
        </div>

        <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div
            v-for="project in additionalProjects"
            :key="project.id"
            class="bg-white dark:bg-gray-700 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden group cursor-pointer"
            @click="viewDetails(project.id)"
          >
            <!-- 项目预览 -->
            <div class="aspect-video bg-gradient-to-br from-blue-400 to-purple-500 relative overflow-hidden">
              <div class="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-all duration-300"></div>
              <div class="absolute inset-0 flex items-center justify-center">
                <Icon :name="project.category.icon" class="w-12 h-12 text-white/80" />
              </div>
              <div class="absolute top-4 right-4">
                <div :class="`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-white/20 text-white backdrop-blur-sm`">
                  {{ project.category.name }}
                </div>
              </div>
            </div>

            <!-- 项目信息 -->
            <div class="p-6">
              <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                {{ project.title }}
              </h3>
              <p class="text-gray-600 dark:text-gray-300 text-sm mb-4 line-clamp-2">
                {{ project.description }}
              </p>
              
              <!-- 技术栈 -->
              <div class="flex flex-wrap gap-1 mb-4">
                <span
                  v-for="tech in project.techStack.slice(0, 3)"
                  :key="tech"
                  class="inline-block px-2 py-1 bg-gray-100 dark:bg-gray-600 text-gray-700 dark:text-gray-300 text-xs rounded"
                >
                  {{ tech }}
                </span>
                <span v-if="project.techStack.length > 3" class="inline-block px-2 py-1 bg-gray-100 dark:bg-gray-600 text-gray-500 dark:text-gray-400 text-xs rounded">
                  +{{ project.techStack.length - 3 }}
                </span>
              </div>

              <!-- 项目指标 -->
              <div class="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
                <div class="flex items-center space-x-4">
                  <span class="flex items-center">
                    <Icon name="heroicons:calendar-days" class="w-4 h-4 mr-1" />
                    {{ project.period }}
                  </span>
                </div>
                <Icon name="heroicons:arrow-right" class="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 联系CTA -->
    <section class="bg-gradient-to-br from-blue-600 via-indigo-700 to-purple-800 text-white py-16">
      <div class="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
        <h2 class="text-3xl font-bold mb-4">
          对这些项目感兴趣？
        </h2>
        <p class="text-xl text-blue-100 mb-8">
          让我们聊聊如何为您的企业构建类似的高质量前端解决方案
        </p>
        <div class="flex flex-col sm:flex-row gap-4 justify-center">
          <Button
            @click="scheduleCall"
            size="large"
            class="bg-white text-blue-600 hover:bg-blue-50 !px-8 !py-4 !text-lg !font-semibold"
          >
            <Icon name="heroicons:phone" class="w-5 h-5 mr-2" />
            预约技术面试
          </Button>
          <Button
            @click="downloadResume"
            outlined
            size="large"
            class="border-white text-white hover:bg-white/10 !px-8 !py-4 !text-lg !font-semibold"
          >
            <Icon name="heroicons:document-arrow-down" class="w-5 h-5 mr-2" />
            下载详细简历
          </Button>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
/**
 * 项目作品集页面
 * 展示企业级项目经验和技术能力
 */

// 页面元数据
useHead({
  title: '项目作品集 | Senior Frontend Engineer',
  meta: [
    { 
      name: 'description', 
      content: '8年+企业级前端开发经验，主导过多个千万级用户产品的技术架构设计与实现。涵盖电商、金融、社交等多个领域的前端解决方案。' 
    }
  ]
})

// 项目分类
const categories = ref([
  { id: 'all', name: '全部项目', icon: 'heroicons:rectangle-stack' },
  { id: 'enterprise', name: '企业级应用', icon: 'heroicons:building-office' },
  { id: 'ecommerce', name: '电商平台', icon: 'heroicons:shopping-cart' },
  { id: 'fintech', name: '金融科技', icon: 'heroicons:banknotes' },
  { id: 'ai', name: 'AI应用', icon: 'heroicons:cpu-chip' }
])

// 当前选中的分类
const selectedCategory = ref('all')

// 核心项目数据
const projects = ref([
  {
    id: 1,
    title: '滴滴出行前端架构重构',
    description: '主导滴滴出行App前端架构的微前端改造，实现多团队并行开发，提升开发效率300%，支撑千万级用户的稳定服务。',
    category: { name: '企业级应用', icon: 'heroicons:building-office', color: 'blue', id: 'enterprise' },
    featured: true,
    role: '前端架构师 & 技术负责人 - 负责整体架构设计、技术方案制定、团队协作流程优化',
    period: '2022-2023',
    liveUrl: 'https://www.didiglobal.com',
    techStack: ['Vue 3', 'Micro Frontends', 'TypeScript', 'Webpack 5', 'Docker', 'K8s'],
    metrics: [
      { label: '日活用户', value: '1000万+' },
      { label: '性能提升', value: '40%' },
      { label: '开发效率', value: '+300%' },
      { label: '故障率', value: '-90%' }
    ],
    highlights: [
      '设计并实现基于qiankun的微前端架构，支持10+子应用独立部署',
      '建立完整的前端监控体系，实现99.9%的服务可用性',
      '优化首屏加载时间从3.2s降至1.1s，用户体验显著提升',
      '建立前端工程化流程，CI/CD自动化部署，代码质量提升80%'
    ]
  },
  {
    id: 2,
    title: 'AI驱动的智能客服系统',
    description: '为大型企业客户构建的智能客服平台，集成多模态AI能力，支持文本、语音、图像的智能识别与回复，客户满意度提升85%。',
    category: { name: 'AI应用', icon: 'heroicons:cpu-chip', color: 'purple', id: 'ai' },
    featured: true,
    role: '全栈技术负责人 - 负责前端架构、AI集成、后端API设计及团队管理',
    period: '2023-2024',
    liveUrl: 'https://demo-ai-customer-service.com',
    githubUrl: 'https://github.com/example/ai-customer-service',
    techStack: ['React 18', 'Next.js 14', 'WebRTC', 'TensorFlow.js', 'WebSocket', 'Node.js'],
    metrics: [
      { label: '响应时间', value: '<100ms' },
      { label: '识别准确率', value: '96%' },
      { label: '满意度', value: '+85%' },
      { label: '成本节约', value: '60%' }
    ],
    highlights: [
      '实现实时语音转文本和情感分析，准确率达96%',
      '构建多语言智能对话系统，支持15种语言',
      '集成OCR和图像识别，支持证件、发票等文档自动处理',
      '设计可扩展的插件系统，支持企业定制化业务场景'
    ]
  },
  {
    id: 3,
    title: '跨境电商管理平台',
    description: '为跨境电商企业打造的一站式管理平台，整合商品管理、订单处理、库存同步、财务结算等核心功能，支持多平台、多站点统一管理。',
    category: { name: '电商平台', icon: 'heroicons:shopping-cart', color: 'green', id: 'ecommerce' },
    featured: false,
    role: '前端技术专家 - 负责前端技术架构、核心功能开发、性能优化',
    period: '2021-2022',
    liveUrl: 'https://demo-ecommerce-platform.com',
    techStack: ['Vue 3', 'Nuxt 3', 'Element Plus', 'ECharts', 'WebSocket', 'PWA'],
    metrics: [
      { label: '处理订单', value: '10万+/日' },
      { label: '响应速度', value: '0.8s' },
      { label: '用户增长', value: '+200%' },
      { label: '转化率', value: '+45%' }
    ],
    highlights: [
      '实现大数据量表格虚拟滚动，支持10万+商品流畅展示',
      '构建实时库存同步系统，多平台数据一致性99.95%',
      '集成多种支付网关和物流接口，支持全球化业务',
      '实现PWA离线功能，提升移动端用户体验'
    ]
  }
])

// 更多项目数据
const additionalProjects = ref([
  {
    id: 4,
    title: '企业级数据可视化平台',
    description: '为大型制造企业打造的生产数据可视化平台',
    category: { name: '企业级应用', icon: 'heroicons:building-office', id: 'enterprise' },
    period: '2021',
    techStack: ['Vue 3', 'D3.js', 'Three.js', 'WebGL']
  },
  {
    id: 5,
    title: '金融风控监控系统',
    description: '实时监控金融交易风险的前端监控系统',
    category: { name: '金融科技', icon: 'heroicons:banknotes', id: 'fintech' },
    period: '2020',
    techStack: ['React', 'WebSocket', 'ECharts', 'AntD']
  },
  {
    id: 6,
    title: 'AI图像处理工具',
    description: '基于深度学习的在线图像智能处理平台',
    category: { name: 'AI应用', icon: 'heroicons:cpu-chip', id: 'ai' },
    period: '2023',
    techStack: ['Vue 3', 'Canvas API', 'WebAssembly', 'TensorFlow.js']
  }
])

// 计算过滤后的项目
const filteredProjects = computed(() => {
  if (selectedCategory.value === 'all') {
    return projects.value
  }
  return projects.value.filter(project => project.category.id === selectedCategory.value)
})

// 方法
const filterProjects = (categoryId: string) => {
  selectedCategory.value = categoryId
}

const openProject = (url: string) => {
  window.open(url, '_blank')
}

const viewDetails = (projectId: number) => {
  // 跳转到项目详情页
  navigateTo(`/projects/${projectId}`)
}

const scheduleCall = () => {
  window.open('https://calendly.com/frontend-engineer', '_blank')
}

const downloadResume = () => {
  const link = document.createElement('a')
  link.href = '/resume/frontend-engineer-resume.pdf'
  link.download = 'Frontend-Engineer-Resume.pdf'
  link.click()
}
</script>

<style scoped>
/**
 * 项目作品集样式
 */

/* 网格背景 */
.bg-mesh-pattern {
  background-image: radial-gradient(circle at 25px 25px, rgba(255, 255, 255, 0.3) 2px, transparent 0);
  background-size: 50px 50px;
}

/* 按钮样式 */
.btn-primary {
  @apply bg-blue-600 text-white hover:bg-blue-700 shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300;
}

/* 文本截断 */
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

/* 响应式优化 */
@media (max-width: 1024px) {
  .grid.lg\\:grid-cols-12 {
    grid-template-columns: 1fr;
  }
  
  .lg\\:col-span-7,
  .lg\\:col-span-5 {
    grid-column: span 1;
  }
}

@media (max-width: 640px) {
  .text-4xl.sm\\:text-5xl.lg\\:text-6xl {
    font-size: 2.5rem;
    line-height: 1.1;
  }
}

/* 动画效果 */
.hover\\:shadow-2xl {
  transition: box-shadow 0.3s ease;
}

.hover\\:scale-105 {
  transition: transform 0.3s ease;
}

.group:hover .group-hover\\:translate-x-1 {
  transform: translateX(0.25rem);
}

.group:hover .group-hover\\:text-blue-600 {
  color: #2563eb;
}

.group:hover .group-hover\\:bg-black\\/10 {
  background-color: rgba(0, 0, 0, 0.1);
}

/* 深色模式优化 */
.dark .group:hover .group-hover\\:text-blue-400 {
  color: #60a5fa;
}
</style>