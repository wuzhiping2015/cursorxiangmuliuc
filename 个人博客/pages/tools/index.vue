<template>
  <div class="tools-page">
    <!-- 页面头部 -->
    <section class="py-12 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-gray-900 dark:to-gray-800">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h1 class="text-4xl font-bold text-gray-900 dark:text-white mb-4">
          AI工具库
        </h1>
        <p class="text-xl text-gray-600 dark:text-gray-300">
          精选308+款AI工具，助力开发效率提升
        </p>
      </div>
    </section>
    
    <!-- 搜索和筛选区域 -->
    <section class="py-8 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex flex-col lg:flex-row gap-4 items-center justify-between">
          <!-- 搜索框 -->
          <div class="flex-1 max-w-md">
            <input
              v-model="searchQuery"
              type="text"
              placeholder="搜索AI工具..."
              class="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white"
            />
          </div>
          
          <!-- 筛选选项 -->
          <div class="flex gap-4 items-center">
            <select
              v-model="selectedRating"
              class="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-800 dark:text-white"
            >
              <option :value="null">所有评分</option>
              <option :value="4">4星以上</option>
              <option :value="3">3星以上</option>
            </select>
            
            <label class="flex items-center">
              <input
                v-model="freeOnly"
                type="checkbox"
                class="mr-2"
              />
              仅免费工具
            </label>
          </div>
        </div>
      </div>
    </section>
    
    <!-- 工具展示区域 -->
    <section class="py-12">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <!-- 分类标签 -->
        <div class="flex flex-wrap gap-3 mb-8">
          <Button
            @click="selectedCategory = null"
            :severity="selectedCategory === null ? 'primary' : 'secondary'"
            :outlined="selectedCategory !== null"
            class="!px-4 !py-2"
          >
            全部工具 ({{ toolsDatabase.stats.totalTools }})
          </Button>
          
          <Button
            v-for="category in categories"
            :key="category.id"
            @click="selectedCategory = category.id"
            :severity="selectedCategory === category.id ? 'primary' : 'secondary'"
            :outlined="selectedCategory !== category.id"
            class="!px-4 !py-2"
          >
            <Icon :name="category.icon" class="w-4 h-4 mr-2" />
            {{ category.name }} ({{ category.tools.length }})
          </Button>
        </div>
        
        <!-- 工具网格 -->
        <div v-if="filteredTools.length > 0" class="grid-auto-fit">
          <div
            v-for="tool in paginatedTools"
            :key="tool.id"
            class="bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 p-6 cursor-pointer group border border-gray-200 dark:border-gray-700 hover:border-blue-500 dark:hover:border-blue-400"
            @click="openToolDetail(tool)"
          >
            <!-- 工具图标和头部 -->
            <div class="flex items-start justify-between mb-4">
              <div class="flex items-center gap-3">
                <div class="w-12 h-12 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                  <Icon v-if="tool.icon" :name="tool.icon" class="w-6 h-6 text-white" />
                  <Icon v-else name="heroicons:cpu-chip" class="w-6 h-6 text-white" />
                </div>
                <div class="flex-1">
                  <h3 class="text-lg font-semibold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    {{ tool.name }}
                  </h3>
                  <p class="text-sm text-gray-500 dark:text-gray-400">{{ tool.category }}</p>
                </div>
              </div>
              
              <!-- 评分和标签 -->
              <div class="flex flex-col items-end gap-2">
                <div class="flex items-center gap-2">
                  <span v-if="tool.free" class="px-2 py-1 text-xs bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 rounded-full font-medium">
                    免费
                  </span>
                  <span v-if="tool.featured" class="px-2 py-1 text-xs bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400 rounded-full font-medium">
                    推荐
                  </span>
                </div>
                <div class="flex items-center">
                  <div class="flex">
                    <Icon 
                      v-for="i in 5" 
                      :key="i" 
                      name="heroicons:star" 
                      :class="[
                        'w-4 h-4',
                        i <= tool.rating ? 'text-yellow-400' : 'text-gray-300 dark:text-gray-600'
                      ]" 
                    />
                  </div>
                  <span class="text-sm text-gray-600 dark:text-gray-400 ml-1">{{ tool.rating }}</span>
                </div>
              </div>
            </div>
            
            <!-- 描述 -->
            <p class="text-gray-600 dark:text-gray-300 text-sm mb-4 leading-relaxed line-clamp-2">
              {{ tool.description }}
            </p>
            
            <!-- 标签 -->
            <div class="flex flex-wrap gap-2 mb-4">
              <span
                v-for="tag in tool.tags.slice(0, 4)"
                :key="tag"
                class="px-2 py-1 text-xs bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 rounded-full hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-colors"
              >
                {{ tag }}
              </span>
              <span v-if="tool.tags.length > 4" class="px-2 py-1 text-xs text-gray-500 dark:text-gray-400">
                +{{ tool.tags.length - 4 }}
              </span>
            </div>
            
            <!-- 操作按钮 -->
            <div class="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-gray-700">
              <button 
                @click.stop="openToolDetail(tool)"
                class="text-blue-600 dark:text-blue-400 font-medium text-sm hover:underline"
              >
                查看详情
              </button>
              <button 
                @click.stop="visitTool(tool)"
                class="px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white text-sm rounded-lg transition-colors flex items-center gap-1"
              >
                <span>立即使用</span>
                <Icon name="heroicons:arrow-top-right-on-square" class="w-3 h-3" />
              </button>
            </div>
          </div>
        </div>
        
        <!-- 空状态 -->
        <div v-else class="text-center py-16">
          <Icon name="heroicons:magnifying-glass" class="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h3 class="text-xl font-semibold text-gray-900 dark:text-white mb-2">
            没有找到匹配的工具
          </h3>
          <p class="text-gray-600 dark:text-gray-400 mb-6">
            尝试调整搜索条件或清除筛选器
          </p>
          <Button @click="clearFilters" severity="secondary" outlined>
            清除筛选器
          </Button>
        </div>
        
        <!-- 分页 -->
        <div v-if="totalPages > 1" class="flex justify-center mt-12">
          <Paginator
            v-model:first="first"
            :rows="pageSize"
            :total-records="filteredTools.length"
            :rows-per-page-options="[12, 24, 48]"
            template="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown"
          />
        </div>
      </div>
    </section>

    <!-- 工具详情模态框 -->
    <Dialog 
      v-model:visible="showToolDetail" 
      modal 
      :header="selectedTool?.name"
      class="max-w-2xl"
    >
      <div v-if="selectedTool" class="space-y-6">
        <!-- 工具基本信息 -->
        <div class="flex items-start gap-4">
          <div class="w-16 h-16 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center flex-shrink-0">
            <Icon v-if="selectedTool.icon" :name="selectedTool.icon" class="w-8 h-8 text-white" />
            <Icon v-else name="heroicons:cpu-chip" class="w-8 h-8 text-white" />
          </div>
          <div class="flex-1">
            <h3 class="text-2xl font-bold text-gray-900 dark:text-white mb-2">
              {{ selectedTool.name }}
            </h3>
            <p class="text-gray-600 dark:text-gray-300 mb-3">
              {{ selectedTool.description }}
            </p>
            <div class="flex items-center gap-4">
              <div class="flex items-center">
                <div class="flex">
                  <Icon 
                    v-for="i in 5" 
                    :key="i" 
                    name="heroicons:star" 
                    :class="[
                      'w-4 h-4',
                      i <= selectedTool.rating ? 'text-yellow-400' : 'text-gray-300 dark:text-gray-600'
                    ]" 
                  />
                </div>
                <span class="text-sm text-gray-600 dark:text-gray-400 ml-2">{{ selectedTool.rating }}/5</span>
              </div>
              <div class="flex items-center gap-2">
                <span v-if="selectedTool.free" class="px-2 py-1 text-xs bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 rounded-full">
                  免费
                </span>
                <span v-if="selectedTool.featured" class="px-2 py-1 text-xs bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400 rounded-full">
                  推荐
                </span>
              </div>
            </div>
          </div>
        </div>

        <!-- 标签 -->
        <div>
          <h4 class="font-semibold text-gray-900 dark:text-white mb-2">功能标签</h4>
          <div class="flex flex-wrap gap-2">
            <span
              v-for="tag in selectedTool.tags"
              :key="tag"
              class="px-3 py-1 text-sm bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-full"
            >
              {{ tag }}
            </span>
          </div>
        </div>

        <!-- 优缺点 -->
        <div v-if="selectedTool.pros || selectedTool.cons" class="grid md:grid-cols-2 gap-4">
          <div v-if="selectedTool.pros" class="space-y-2">
            <h4 class="font-semibold text-green-600 dark:text-green-400 flex items-center gap-2">
              <Icon name="heroicons:check-circle" class="w-4 h-4" />
              优势
            </h4>
            <ul class="space-y-1 text-sm text-gray-600 dark:text-gray-300">
              <li v-for="pro in selectedTool.pros" :key="pro" class="flex items-start gap-2">
                <Icon name="heroicons:plus" class="w-3 h-3 text-green-500 mt-1 flex-shrink-0" />
                {{ pro }}
              </li>
            </ul>
          </div>
          
          <div v-if="selectedTool.cons" class="space-y-2">
            <h4 class="font-semibold text-red-600 dark:text-red-400 flex items-center gap-2">
              <Icon name="heroicons:x-circle" class="w-4 h-4" />
              不足
            </h4>
            <ul class="space-y-1 text-sm text-gray-600 dark:text-gray-300">
              <li v-for="con in selectedTool.cons" :key="con" class="flex items-start gap-2">
                <Icon name="heroicons:minus" class="w-3 h-3 text-red-500 mt-1 flex-shrink-0" />
                {{ con }}
              </li>
            </ul>
          </div>
        </div>

        <!-- 使用场景 -->
        <div v-if="selectedTool.useCases" class="space-y-2">
          <h4 class="font-semibold text-gray-900 dark:text-white flex items-center gap-2">
            <Icon name="heroicons:light-bulb" class="w-4 h-4" />
            适用场景
          </h4>
          <div class="grid grid-cols-2 gap-2">
            <span
              v-for="useCase in selectedTool.useCases"
              :key="useCase"
              class="px-3 py-2 text-sm bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 rounded-lg text-center"
            >
              {{ useCase }}
            </span>
          </div>
        </div>

        <!-- 个人点评 -->
        <div v-if="selectedTool.personalNote" class="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
          <h4 class="font-semibold text-blue-900 dark:text-blue-400 flex items-center gap-2 mb-2">
            <Icon name="heroicons:user" class="w-4 h-4" />
            个人点评
          </h4>
          <p class="text-blue-800 dark:text-blue-300 text-sm leading-relaxed">
            {{ selectedTool.personalNote }}
          </p>
        </div>

        <!-- 操作按钮 -->
        <div class="flex gap-3 pt-4 border-t border-gray-200 dark:border-gray-700">
          <Button
            @click="visitTool(selectedTool)"
            class="flex-1 flex items-center justify-center gap-2"
          >
            <Icon name="heroicons:arrow-top-right-on-square" class="w-4 h-4" />
            立即使用
          </Button>
          <Button
            @click="shareToolUrl(selectedTool)"
            severity="secondary"
            outlined
            class="flex items-center gap-2"
          >
            <Icon name="heroicons:share" class="w-4 h-4" />
            分享
          </Button>
        </div>
      </div>
    </Dialog>
    
  </div>
</template>

<script setup lang="ts">
/**
 * AI工具展示页面
 * 展示308+精选AI工具，支持搜索、筛选和分类浏览
 */

// 类型定义
interface Tool {
  id: string
  name: string
  description: string
  url: string
  icon?: string
  category: string
  tags: string[]
  rating: number
  free: boolean
  featured: boolean
  pros?: string[]
  cons?: string[]
  useCases?: string[]
  personalNote?: string
}

interface Category {
  id: string
  name: string
  icon: string
  color: string
  tools: Tool[]
}

interface ToolsDatabase {
  categories: Category[]
  stats: {
    totalTools: number
  }
}

// 获取AI工具数据
const toolsData = await import('~/content/tools/ai-tools-database.json').then(m => m.default)

// 页面元数据
useHead({
  title: 'AI工具库 - 308+精选AI工具 | AI Frontend Engineer',
  meta: [
    { 
      name: 'description', 
      content: '精选308+款AI工具，涵盖编程助手、设计工具、搜索引擎等多个类别。每个工具都有详细介绍、使用心得和评分，帮助开发者选择最适合的AI工具。' 
    },
    { 
      name: 'keywords', 
      content: 'AI工具,编程助手,ChatGPT,Claude,Cursor,GitHub Copilot,工具推荐,开发效率' 
    }
  ]
})

// 响应式数据
const toolsDatabase = ref<ToolsDatabase>(toolsData)
const searchQuery = ref('')
const selectedCategory = ref<string | null>(null)
const selectedTags = ref<string[]>([])
const selectedRating = ref<number | null>(null)
const freeOnly = ref(false)

// 工具详情模态框
const showToolDetail = ref(false)
const selectedTool = ref<Tool | null>(null)

// 分页相关
const first = ref(0)
const pageSize = ref(12)

// 计算属性
const categories = computed(() => toolsDatabase.value.categories)

const allTags = computed(() => {
  const tags = new Set<string>()
  categories.value.forEach((category: Category) => {
    category.tools.forEach((tool: Tool) => {
      tool.tags.forEach((tag: string) => tags.add(tag))
    })
  })
  return Array.from(tags).sort()
})

const allTools = computed(() => {
  return categories.value.flatMap((category: Category) => 
    category.tools.map((tool: Tool) => ({
      ...tool,
      categoryName: category.name,
      categoryColor: category.color
    }))
  )
})

const featuredTools = computed(() => 
  allTools.value.filter((tool: Tool) => tool.featured)
)

const freeTools = computed(() => 
  allTools.value.filter((tool: Tool) => tool.free)
)

const filteredTools = computed(() => {
  let tools = allTools.value
  
  // 搜索筛选
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase()
    tools = tools.filter((tool: Tool) => 
      tool.name.toLowerCase().includes(query) ||
      tool.description.toLowerCase().includes(query) ||
      tool.tags.some((tag: string) => tag.toLowerCase().includes(query))
    )
  }
  
  // 分类筛选
  if (selectedCategory.value) {
    tools = tools.filter((tool: Tool) => tool.category === selectedCategory.value)
  }
  
  // 标签筛选
  if (selectedTags.value.length > 0) {
    tools = tools.filter((tool: Tool) => 
      selectedTags.value.some(tag => tool.tags.includes(tag))
    )
  }
  
  // 评分筛选
  if (selectedRating.value !== null) {
    tools = tools.filter((tool: Tool) => tool.rating >= (selectedRating.value as number))
  }
  
  // 免费筛选
  if (freeOnly.value) {
    tools = tools.filter((tool: Tool) => tool.free)
  }
  
  // 按评分和是否精选排序
  return tools.sort((a: Tool, b: Tool) => {
    if (a.featured && !b.featured) return -1
    if (!a.featured && b.featured) return 1
    return b.rating - a.rating
  })
})

const paginatedTools = computed(() => {
  const start = first.value
  const end = start + pageSize.value
  return filteredTools.value.slice(start, end)
})

const totalPages = computed(() => 
  Math.ceil(filteredTools.value.length / pageSize.value)
)

// 方法
const openToolDetail = (tool: Tool) => {
  selectedTool.value = tool
  showToolDetail.value = true
}

const visitTool = (tool: Tool) => {
  // 在新窗口打开工具链接
  window.open(tool.url, '_blank')
}

const shareToolUrl = (tool: Tool) => {
  if (navigator.share) {
    navigator.share({
      title: tool.name,
      text: tool.description,
      url: tool.url
    })
  } else if (navigator.clipboard) {
    navigator.clipboard.writeText(tool.url)
    // 可以添加提示消息
    alert('链接已复制到剪贴板')
  }
}

const clearFilters = () => {
  searchQuery.value = ''
  selectedCategory.value = null
  selectedTags.value = []
  selectedRating.value = null
  freeOnly.value = false
}

// SEO 结构化数据
useJsonld({
  '@context': 'https://schema.org',
  '@type': 'CollectionPage',
  name: 'AI工具库',
  description: '精选308+款AI工具，涵盖编程助手、设计工具、搜索引擎等多个类别',
  url: 'https://ai-frontend-engineer.com/tools',
  mainEntity: {
    '@type': 'ItemList',
    numberOfItems: toolsDatabase.value.stats.totalTools,
    itemListElement: allTools.value.slice(0, 10).map((tool: Tool, index: number) => ({
      '@type': 'ListItem',
      position: index + 1,
      item: {
        '@type': 'SoftwareApplication',
        name: tool.name,
        description: tool.description,
        url: tool.url,
        applicationCategory: 'AI Tool',
        operatingSystem: 'Web',
        offers: {
          '@type': 'Offer',
          price: tool.free ? '0' : 'varies',
          priceCurrency: 'USD'
        },
        aggregateRating: {
          '@type': 'AggregateRating',
          ratingValue: tool.rating,
          ratingCount: 1
        }
      }
    }))
  }
})

// 监听路由查询参数
const route = useRoute()
watch(() => route.query, (query) => {
  if (query.category) {
    selectedCategory.value = query.category as string
  }
  if (query.search) {
    searchQuery.value = query.search as string
  }
  if (query.tags) {
    selectedTags.value = (query.tags as string).split(',')
  }
}, { immediate: true })

// 更新URL查询参数
watch([selectedCategory, searchQuery, selectedTags], () => {
  const query: Record<string, any> = {}
  
  if (selectedCategory.value) {
    query.category = selectedCategory.value
  }
  if (searchQuery.value) {
    query.search = searchQuery.value
  }
  if (selectedTags.value.length > 0) {
    query.tags = selectedTags.value.join(',')
  }
  
  navigateTo({ query }, { replace: true })
})
</script>

<style scoped>
/**
 * 工具页面样式
 */

/* 网格布局 */
.grid-auto-fit {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 1.5rem;
}

/* 响应式优化 */
@media (max-width: 640px) {
  .grid-auto-fit {
    grid-template-columns: 1fr;
    gap: 1rem;
  }
}

/* 分页样式覆盖 */
:deep(.p-paginator) {
  @apply bg-transparent border-0;
}

:deep(.p-paginator .p-paginator-pages .p-paginator-page) {
  @apply text-gray-600 dark:text-gray-400;
}

:deep(.p-paginator .p-paginator-pages .p-paginator-page.p-highlight) {
  @apply bg-blue-600 text-white;
}
</style>
