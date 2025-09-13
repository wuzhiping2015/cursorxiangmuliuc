<template>
  <div class="blog-page">
    <!-- 页面头部 -->
    <section class="blog-hero">
      <div class="container mx-auto px-4 py-16">
        <div class="max-w-4xl mx-auto text-center">
          <h1 class="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            AI 前端开发实践
          </h1>
          <p class="text-xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
            深度探索 AI 如何重塑前端开发，分享最前沿的开发实践和工具使用心得
          </p>
          
          <!-- 搜索框 -->
          <div class="relative max-w-md mx-auto mb-8">
            <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Icon name="heroicons:magnifying-glass" class="h-5 w-5 text-gray-400" />
            </div>
            <input
              v-model="searchQuery"
              type="search"
              placeholder="搜索文章..."
              class="block w-full pl-10 pr-3 py-3 border border-gray-300 dark:border-gray-600 rounded-lg leading-5 bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
          </div>
          
          <!-- 标签筛选 -->
          <div class="flex flex-wrap gap-2 justify-center">
            <button
              v-for="tag in allTags"
              :key="tag"
              @click="toggleTag(tag)"
              :class="[
                'px-4 py-2 rounded-full text-sm font-medium transition-colors duration-200',
                selectedTags.includes(tag)
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
              ]"
            >
              {{ tag }}
            </button>
          </div>
        </div>
      </div>
    </section>

    <!-- 文章列表 -->
    <section class="blog-list">
      <div class="container mx-auto px-4 py-12">
        <div class="max-w-4xl mx-auto">
          <!-- 筛选结果提示 -->
          <div v-if="searchQuery || selectedTags.length > 0" class="mb-8">
            <p class="text-gray-600 dark:text-gray-400">
              找到 {{ filteredArticles.length }} 篇文章
              <span v-if="searchQuery">包含 "{{ searchQuery }}"</span>
              <span v-if="selectedTags.length > 0">
                标签：{{ selectedTags.join(', ') }}
              </span>
            </p>
            <button
              @click="clearFilters"
              class="text-blue-600 dark:text-blue-400 hover:underline text-sm"
            >
              清除筛选条件
            </button>
          </div>

          <!-- 文章网格 -->
          <div class="grid gap-8 md:gap-12">
            <article
              v-for="article in filteredArticles"
              :key="article._path"
              class="group cursor-pointer"
              @click="navigateTo(article._path)"
            >
              <div class="flex flex-col md:flex-row gap-6 p-6 rounded-2xl bg-white dark:bg-gray-800 hover:shadow-xl transition-all duration-300 border border-gray-200 dark:border-gray-700">
                <!-- 文章封面 -->
                <div class="md:w-80 flex-shrink-0">
                  <div class="aspect-video rounded-xl overflow-hidden bg-gradient-to-br from-blue-500 to-purple-600">
                    <img
                      v-if="article.image"
                      :src="article.image"
                      :alt="article.title"
                      class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    >
                    <div v-else class="w-full h-full flex items-center justify-center">
                      <Icon name="heroicons:document-text" class="w-12 h-12 text-white/80" />
                    </div>
                  </div>
                </div>

                <!-- 文章内容 -->
                <div class="flex-1 min-w-0">
                  <!-- 元信息 -->
                  <div class="flex flex-wrap items-center gap-3 mb-3 text-sm text-gray-500 dark:text-gray-400">
                    <time :datetime="article.publishedAt">
                      {{ formatDate(article.publishedAt) }}
                    </time>
                    <span>•</span>
                    <span>{{ article.readTime }}</span>
                    <span v-if="article.category" class="px-2 py-1 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 text-xs font-medium">
                      {{ article.category }}
                    </span>
                  </div>

                  <!-- 标题和描述 -->
                  <h2 class="text-xl md:text-2xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-200">
                    {{ article.title }}
                  </h2>
                  <p class="text-gray-600 dark:text-gray-300 mb-4 line-clamp-2 leading-relaxed">
                    {{ article.description }}
                  </p>

                  <!-- 标签 -->
                  <div class="flex flex-wrap gap-2 mb-4">
                    <span
                      v-for="tag in article.tags"
                      :key="tag"
                      class="px-2 py-1 text-xs font-medium text-gray-600 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 rounded-md"
                    >
                      {{ tag }}
                    </span>
                  </div>

                  <!-- 阅读更多 -->
                  <div class="flex items-center text-blue-600 dark:text-blue-400 font-medium group-hover:gap-2 transition-all duration-200">
                    <span>阅读更多</span>
                    <Icon name="heroicons:arrow-right" class="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
                  </div>
                </div>
              </div>
            </article>
          </div>

          <!-- 空状态 -->
          <div v-if="filteredArticles.length === 0" class="text-center py-16">
            <Icon name="heroicons:document-text" class="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 class="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              暂无相关文章
            </h3>
            <p class="text-gray-600 dark:text-gray-400">
              尝试调整搜索条件或查看所有文章
            </p>
          </div>

          <!-- 加载更多 -->
          <div v-if="hasMore && filteredArticles.length > 0" class="text-center mt-12">
            <button
              @click="loadMore"
              :disabled="isLoading"
              class="px-8 py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white rounded-lg font-medium transition-colors duration-200"
            >
              <span v-if="isLoading">加载中...</span>
              <span v-else>加载更多文章</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
/**
 * 博客列表页面
 * 展示所有博客文章，支持搜索、标签筛选和分页
 */

// 页面元数据
useHead({
  title: 'AI 前端开发实践博客 - 最新文章列表',
  meta: [
    { 
      name: 'description', 
      content: '探索AI如何重塑前端开发，分享最前沿的开发实践、工具使用心得和技术洞察。包含Vue3、Nuxt3、TypeScript等现代前端技术的AI应用实践。' 
    },
    { 
      name: 'keywords', 
      content: 'AI前端开发,Vue3,Nuxt3,TypeScript,开发实践,技术博客,前端工具,AI工具' 
    }
  ]
})

// 状态管理
const searchQuery = ref('')
const selectedTags = ref<string[]>([])
const currentPage = ref(1)
const pageSize = 10
const isLoading = ref(false)

// 获取所有文章
const { data: articles } = await queryContent('/blog')
  .where({ draft: { $ne: true } })
  .sort({ publishedAt: -1 })
  .find()

// 计算属性
const allTags = computed(() => {
  const tags = new Set<string>()
  articles.value?.forEach(article => {
    article.tags?.forEach((tag: string) => tags.add(tag))
  })
  return Array.from(tags).sort()
})

const filteredArticles = computed(() => {
  let filtered = articles.value || []
  
  // 搜索筛选
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase()
    filtered = filtered.filter(article => 
      article.title?.toLowerCase().includes(query) ||
      article.description?.toLowerCase().includes(query) ||
      article.tags?.some((tag: string) => tag.toLowerCase().includes(query))
    )
  }
  
  // 标签筛选
  if (selectedTags.value.length > 0) {
    filtered = filtered.filter(article =>
      selectedTags.value.some(tag => article.tags?.includes(tag))
    )
  }
  
  // 分页
  return filtered.slice(0, currentPage.value * pageSize)
})

const hasMore = computed(() => {
  const totalFiltered = searchQuery.value || selectedTags.value.length > 0 
    ? filteredArticles.value.length
    : articles.value?.length || 0
  return filteredArticles.value.length < totalFiltered
})

// 方法
const toggleTag = (tag: string) => {
  const index = selectedTags.value.indexOf(tag)
  if (index > -1) {
    selectedTags.value.splice(index, 1)
  } else {
    selectedTags.value.push(tag)
  }
  currentPage.value = 1
}

const clearFilters = () => {
  searchQuery.value = ''
  selectedTags.value = []
  currentPage.value = 1
}

const loadMore = async () => {
  isLoading.value = true
  await new Promise(resolve => setTimeout(resolve, 500)) // 模拟加载
  currentPage.value++
  isLoading.value = false
}

const formatDate = (dateString: string) => {
  const date = new Date(dateString)
  return date.toLocaleDateString('zh-CN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

// SEO 结构化数据
useJsonld({
  '@context': 'https://schema.org',
  '@type': 'Blog',
  name: 'AI 前端开发实践博客',
  description: '专注于AI辅助前端开发的技术博客',
  url: 'https://ai-frontend-engineer.com/blog',
  author: {
    '@type': 'Person',
    name: 'Frontend AI Engineer'
  },
  blogPost: articles.value?.slice(0, 5).map(article => ({
    '@type': 'BlogPosting',
    headline: article.title,
    description: article.description,
    datePublished: article.publishedAt,
    url: `https://ai-frontend-engineer.com${article._path}`
  }))
})

// 监听搜索查询变化
watch(searchQuery, () => {
  currentPage.value = 1
})
</script>

<style scoped>
/**
 * 博客列表页面样式
 */

/* 页面容器 */
.blog-page {
  @apply min-h-screen bg-gray-50 dark:bg-gray-900;
}

/* 英雄区块 */
.blog-hero {
  @apply bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-800 dark:to-gray-700;
}

/* 文章卡片悬停效果 */
.blog-list article:hover {
  transform: translateY(-2px);
}

/* 文本截断 */
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

/* 自定义滚动条 */
::-webkit-scrollbar {
  @apply w-2;
}

::-webkit-scrollbar-track {
  @apply bg-gray-100 dark:bg-gray-800;
}

::-webkit-scrollbar-thumb {
  @apply bg-gray-300 dark:bg-gray-600 rounded-full;
}

::-webkit-scrollbar-thumb:hover {
  @apply bg-gray-400 dark:bg-gray-500;
}

/* 响应式优化 */
@media (max-width: 768px) {
  .blog-hero h1 {
    @apply text-3xl;
  }
  
  .blog-list article {
    @apply p-4;
  }
}
</style>