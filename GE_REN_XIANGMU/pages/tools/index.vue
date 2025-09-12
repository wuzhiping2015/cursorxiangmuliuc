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
            class="bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-lg transition-shadow p-6 cursor-pointer"
            @click="openToolDetail(tool)"
          >
            <div class="flex items-start justify-between mb-3">
              <h3 class="text-lg font-semibold text-gray-900 dark:text-white">
                {{ tool.name }}
              </h3>
              <div class="flex items-center">
                <span v-if="tool.free" class="px-2 py-1 text-xs bg-green-100 text-green-800 rounded-full mr-2">
                  免费
                </span>
                <div class="flex items-center">
                  <Icon name="heroicons:star" class="w-4 h-4 text-yellow-400" />
                  <span class="text-sm text-gray-600 dark:text-gray-400 ml-1">{{ tool.rating }}</span>
                </div>
              </div>
            </div>
            <p class="text-gray-600 dark:text-gray-300 text-sm mb-4">
              {{ tool.description }}
            </p>
            <div class="flex flex-wrap gap-2">
              <span
                v-for="tag in tool.tags.slice(0, 3)"
                :key="tag"
                class="px-2 py-1 text-xs bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full"
              >
                {{ tag }}
              </span>
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
    
  </div>
</template>

<script setup lang="ts">
/**
 * AI工具展示页面
 * 展示308+精选AI工具，支持搜索、筛选和分类浏览
 */

// 模拟工具数据 (实际项目中应从 API 或 JSON 文件获取)
const mockToolsData = {
  stats: { totalTools: 308 },
  categories: [
    {
      id: 'ai-chat',
      name: 'AI对话',
      icon: 'mdi:chat',
      color: 'blue',
      tools: [
        {
          id: 'chatgpt',
          name: 'ChatGPT',
          description: 'OpenAI开发的强大对话AI，擅长代码生成、问题解答和创意协作',
          url: 'https://chat.openai.com',
          rating: 4.8,
          free: true,
          featured: true,
          category: 'ai-chat',
          tags: ['对话AI', '代码生成', '问题解答']
        }
      ]
    },
    {
      id: 'ai-coding',
      name: 'AI编程',
      icon: 'mdi:code-tags',
      color: 'green',
      tools: [
        {
          id: 'cursor',
          name: 'Cursor',
          description: '集成AI的现代代码编辑器，支持智能代码生成和重构',
          url: 'https://cursor.sh',
          rating: 4.9,
          free: false,
          featured: true,
          category: 'ai-coding',
          tags: ['IDE', '代码生成', '重构']
        }
      ]
    }
  ]
}

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
const toolsDatabase = ref(mockToolsData)
const searchQuery = ref('')
const selectedCategory = ref<string | null>(null)
const selectedTags = ref<string[]>([])
const selectedRating = ref<number | null>(null)
const freeOnly = ref(false)

// 分页相关
const first = ref(0)
const pageSize = ref(12)

// 计算属性
const categories = computed(() => toolsDatabase.value.categories)

const allTags = computed(() => {
  const tags = new Set<string>()
  categories.value.forEach(category => {
    category.tools.forEach(tool => {
      tool.tags.forEach(tag => tags.add(tag))
    })
  })
  return Array.from(tags).sort()
})

const allTools = computed(() => {
  return categories.value.flatMap(category => 
    category.tools.map(tool => ({
      ...tool,
      categoryName: category.name,
      categoryColor: category.color
    }))
  )
})

const featuredTools = computed(() => 
  allTools.value.filter(tool => tool.featured)
)

const freeTools = computed(() => 
  allTools.value.filter(tool => tool.free)
)

const filteredTools = computed(() => {
  let tools = allTools.value
  
  // 搜索筛选
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase()
    tools = tools.filter(tool => 
      tool.name.toLowerCase().includes(query) ||
      tool.description.toLowerCase().includes(query) ||
      tool.tags.some(tag => tag.toLowerCase().includes(query))
    )
  }
  
  // 分类筛选
  if (selectedCategory.value) {
    tools = tools.filter(tool => tool.category === selectedCategory.value)
  }
  
  // 标签筛选
  if (selectedTags.value.length > 0) {
    tools = tools.filter(tool => 
      selectedTags.value.some(tag => tool.tags.includes(tag))
    )
  }
  
  // 评分筛选
  if (selectedRating.value !== null) {
    tools = tools.filter(tool => tool.rating >= (selectedRating.value as number))
  }
  
  // 免费筛选
  if (freeOnly.value) {
    tools = tools.filter(tool => tool.free)
  }
  
  // 按评分和是否精选排序
  return tools.sort((a, b) => {
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
const openToolDetail = (tool: any) => {
  // 在新窗口打开工具链接
  window.open(tool.url, '_blank')
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
    itemListElement: allTools.value.slice(0, 10).map((tool, index) => ({
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
