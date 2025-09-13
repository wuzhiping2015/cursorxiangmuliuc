<template>
  <div class="article-page">
    <div v-if="!data" class="min-h-screen flex items-center justify-center">
      <div class="text-center">
        <ProgressSpinner />
        <p class="mt-4 text-gray-600 dark:text-gray-400">正在加载文章...</p>
      </div>
    </div>

    <div v-else class="min-h-screen bg-gray-50 dark:bg-gray-900">
      <!-- 文章头部 -->
      <header class="article-header">
        <div class="container mx-auto px-4 py-12">
          <div class="max-w-4xl mx-auto">
            <!-- 面包屑导航 -->
            <nav class="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 mb-8">
              <NuxtLink 
                to="/" 
                class="hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              >
                首页
              </NuxtLink>
              <Icon name="heroicons:chevron-right" class="w-4 h-4" />
              <NuxtLink 
                to="/blog" 
                class="hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              >
                博客
              </NuxtLink>
              <Icon name="heroicons:chevron-right" class="w-4 h-4" />
              <span class="text-gray-900 dark:text-white">{{ data.title }}</span>
            </nav>

            <!-- 文章元信息 -->
            <div class="flex flex-wrap items-center gap-4 mb-6 text-sm text-gray-500 dark:text-gray-400">
              <div class="flex items-center gap-2">
                <Icon name="heroicons:calendar-days" class="w-4 h-4" />
                <time :datetime="data.publishedAt">
                  {{ formatDate(data.publishedAt) }}
                </time>
              </div>
              <div class="flex items-center gap-2">
                <Icon name="heroicons:clock" class="w-4 h-4" />
                <span>{{ data.readTime }}</span>
              </div>
              <div class="flex items-center gap-2">
                <Icon name="heroicons:user" class="w-4 h-4" />
                <span>{{ data.author }}</span>
              </div>
              <div v-if="data.category" class="px-3 py-1 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 text-xs font-medium">
                {{ data.category }}
              </div>
            </div>

            <!-- 文章标题 -->
            <h1 class="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-6 leading-tight">
              {{ data.title }}
            </h1>

            <!-- 文章描述 -->
            <p class="text-xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
              {{ data.description }}
            </p>

            <!-- 标签 -->
            <div class="flex flex-wrap gap-2 mb-8">
              <span
                v-for="tag in data.tags"
                :key="tag"
                class="px-3 py-1 text-sm font-medium text-gray-600 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 rounded-full hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors cursor-pointer"
                @click="navigateTo(`/blog?tag=${encodeURIComponent(tag)}`)"
              >
                {{ tag }}
              </span>
            </div>

            <!-- 封面图片 -->
            <div v-if="data.image" class="mb-12">
              <div class="aspect-video rounded-2xl overflow-hidden bg-gradient-to-br from-blue-500 to-purple-600">
                <img
                  :src="data.image"
                  :alt="data.title"
                  class="w-full h-full object-cover"
                >
              </div>
            </div>
          </div>
        </div>
      </header>

      <!-- 文章内容 -->
      <main class="article-content">
        <div class="container mx-auto px-4 pb-16">
          <div class="max-w-4xl mx-auto">
            <div class="flex flex-col lg:flex-row gap-8">
              <!-- 文章正文 -->
              <article class="flex-1 min-w-0">
                <div class="prose prose-lg prose-blue dark:prose-invert max-w-none">
                  <ContentRenderer :value="data" />
                </div>

                <!-- 分享按钮 -->
                <div class="mt-12 pt-8 border-t border-gray-200 dark:border-gray-700">
                  <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                    分享这篇文章
                  </h3>
                  <div class="flex flex-wrap gap-3">
                    <button
                      v-for="social in shareButtons"
                      :key="social.name"
                      @click="shareToSocial(social)"
                      :class="[
                        'flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors',
                        social.class
                      ]"
                    >
                      <Icon :name="social.icon" class="w-4 h-4" />
                      {{ social.name }}
                    </button>
                  </div>
                </div>
              </article>

              <!-- 侧边栏 -->
              <aside class="lg:w-80 flex-shrink-0">
                <div class="sticky top-8 space-y-8">
                  <!-- 目录 -->
                  <div v-if="data.toc" class="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-200 dark:border-gray-700">
                    <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                      <Icon name="heroicons:list-bullet" class="w-5 h-5" />
                      文章目录
                    </h3>
                    <nav class="toc">
                      <ul class="space-y-2">
                        <li 
                          v-for="link in data.toc.links" 
                          :key="link.id"
                          :class="[
                            'text-sm',
                            link.depth === 2 ? 'ml-0' : link.depth === 3 ? 'ml-4' : 'ml-8'
                          ]"
                        >
                          <a 
                            :href="`#${link.id}`" 
                            class="block py-1 text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                          >
                            {{ link.text }}
                          </a>
                        </li>
                      </ul>
                    </nav>
                  </div>

                  <!-- 相关文章 -->
                  <div v-if="relatedArticles.length > 0" class="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-200 dark:border-gray-700">
                    <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                      <Icon name="heroicons:document-text" class="w-5 h-5" />
                      相关文章
                    </h3>
                    <div class="space-y-4">
                      <article
                        v-for="article in relatedArticles"
                        :key="article._path"
                        class="group cursor-pointer"
                        @click="navigateTo(article._path)"
                      >
                        <div class="block">
                          <h4 class="text-sm font-medium text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors mb-1 line-clamp-2">
                            {{ article.title }}
                          </h4>
                          <p class="text-xs text-gray-500 dark:text-gray-400">
                            {{ formatDate(article.publishedAt) }}
                          </p>
                        </div>
                      </article>
                    </div>
                  </div>

                  <!-- 反馈卡片 -->
                  <div class="bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-800 dark:to-gray-700 rounded-2xl p-6 border border-blue-200 dark:border-gray-600">
                    <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                      觉得有用？
                    </h3>
                    <p class="text-sm text-gray-600 dark:text-gray-300 mb-4">
                      如果这篇文章帮助到了你，欢迎分享给更多的开发者！
                    </p>
                    <button
                      @click="showFeedbackModal = true"
                      class="w-full px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium transition-colors"
                    >
                      给我反馈
                    </button>
                  </div>
                </div>
              </aside>
            </div>
          </div>
        </div>
      </main>

      <!-- 导航到其他文章 -->
      <nav class="article-navigation bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
        <div class="container mx-auto px-4 py-8">
          <div class="max-w-4xl mx-auto">
            <div class="grid md:grid-cols-2 gap-6">
              <!-- 上一篇文章 -->
              <div v-if="prev" class="group">
                <p class="text-sm text-gray-500 dark:text-gray-400 mb-2">上一篇</p>
                <NuxtLink 
                  :to="prev._path"
                  class="block p-4 rounded-xl border border-gray-200 dark:border-gray-700 hover:border-blue-500 dark:hover:border-blue-400 transition-all duration-200 hover:shadow-md"
                >
                  <h3 class="font-semibold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    {{ prev.title }}
                  </h3>
                  <p class="text-sm text-gray-600 dark:text-gray-300 mt-1 line-clamp-2">
                    {{ prev.description }}
                  </p>
                </NuxtLink>
              </div>

              <!-- 下一篇文章 -->
              <div v-if="next" class="group md:text-right">
                <p class="text-sm text-gray-500 dark:text-gray-400 mb-2">下一篇</p>
                <NuxtLink 
                  :to="next._path"
                  class="block p-4 rounded-xl border border-gray-200 dark:border-gray-700 hover:border-blue-500 dark:hover:border-blue-400 transition-all duration-200 hover:shadow-md"
                >
                  <h3 class="font-semibold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    {{ next.title }}
                  </h3>
                  <p class="text-sm text-gray-600 dark:text-gray-300 mt-1 line-clamp-2">
                    {{ next.description }}
                  </p>
                </NuxtLink>
              </div>
            </div>

            <!-- 返回列表 -->
            <div class="text-center mt-8">
              <NuxtLink 
                to="/blog"
                class="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors"
              >
                <Icon name="heroicons:arrow-left" class="w-4 h-4" />
                返回博客列表
              </NuxtLink>
            </div>
          </div>
        </div>
      </nav>
    </div>

    <!-- 反馈模态框 -->
    <Dialog v-model:visible="showFeedbackModal" modal header="文章反馈" class="max-w-md">
      <div class="space-y-4">
        <p class="text-gray-600 dark:text-gray-300">
          你的反馈对我很重要，请告诉我这篇文章怎么样：
        </p>
        <div class="flex gap-2">
          <button
            v-for="rating in [1, 2, 3, 4, 5]"
            :key="rating"
            @click="selectedRating = rating"
            :class="[
              'w-10 h-10 rounded-full border-2 transition-all',
              selectedRating >= rating 
                ? 'border-yellow-400 bg-yellow-400 text-white'
                : 'border-gray-300 dark:border-gray-600 hover:border-yellow-400'
            ]"
          >
            ⭐
          </button>
        </div>
        <Textarea
          v-model="feedbackText"
          placeholder="有什么想说的吗？（可选）"
          rows="3"
          class="w-full"
        />
        <div class="flex gap-2 justify-end">
          <Button 
            label="取消" 
            severity="secondary" 
            @click="showFeedbackModal = false"
          />
          <Button 
            label="提交反馈" 
            @click="submitFeedback"
            :disabled="!selectedRating"
          />
        </div>
      </div>
    </Dialog>
  </div>
</template>

<script setup lang="ts">
/**
 * 博客文章详情页面
 * 展示单篇文章的完整内容，包含目录、相关文章等
 */

// 页面参数
const route = useRoute()
const slug = route.params.slug as string

// 获取文章内容
const { data } = await queryContent('/blog', slug).findOne()

// 获取相邻文章
const [prev, next] = await queryContent('/blog')
  .where({ draft: { $ne: true } })
  .sort({ publishedAt: -1 })
  .findSurround(`/blog/${slug}`)

// 获取相关文章
const relatedArticles = ref<any[]>([])
const relatedData = await queryContent('/blog')
  .where({ 
    draft: { $ne: true },
    _path: { $ne: `/blog/${slug}` },
    tags: { $in: data?.tags || [] }
  })
  .limit(3)
  .find()

relatedArticles.value = relatedData as any[]

// 页面元数据
useHead({
  title: data?.title,
  meta: [
    { name: 'description', content: data?.description },
    { name: 'keywords', content: data?.tags?.join(', ') || '' },
    { name: 'author', content: data?.author || 'Frontend AI Engineer' },
    
    // Open Graph
    { property: 'og:title', content: data?.title },
    { property: 'og:description', content: data?.description },
    { property: 'og:type', content: 'article' },
    { property: 'og:image', content: data?.image || '/og-image.png' },
    { property: 'og:url', content: `https://ai-frontend-engineer.com/blog/${slug}` },
    { property: 'article:published_time', content: data?.publishedAt },
    { property: 'article:author', content: data?.author },
    { property: 'article:tag', content: data?.tags?.join(', ') },
    
    // Twitter Card
    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'twitter:title', content: data?.title },
    { name: 'twitter:description', content: data?.description },
    { name: 'twitter:image', content: data?.image || '/twitter-image.png' }
  ]
})

// 状态管理
const showFeedbackModal = ref(false)
const selectedRating = ref(0)
const feedbackText = ref('')

// 获取当前URL的函数
const getCurrentURL = (): string => {
  if (process.client) {
    return window.location.href
  }
  return `https://ai-frontend-engineer.com/blog/${slug}`
}

// 分享按钮配置
const shareButtons = computed(() => [
  {
    name: '微博',
    icon: 'simple-icons:sinaweibo',
    class: 'bg-red-600 hover:bg-red-700 text-white',
    url: `https://service.weibo.com/share/share.php?url=${encodeURIComponent(getCurrentURL())}&title=${encodeURIComponent(data?.title || '')}`
  },
  {
    name: '微信',
    icon: 'simple-icons:wechat',
    class: 'bg-green-600 hover:bg-green-700 text-white',
    url: '' // 微信分享需要特殊处理
  },
  {
    name: 'Twitter',
    icon: 'simple-icons:twitter',
    class: 'bg-blue-500 hover:bg-blue-600 text-white',
    url: `https://twitter.com/intent/tweet?text=${encodeURIComponent(data?.title || '')}&url=${encodeURIComponent(getCurrentURL())}`
  }
])

// 方法
const formatDate = (dateString: string) => {
  const date = new Date(dateString)
  return date.toLocaleDateString('zh-CN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

const shareToSocial = (social: any) => {
  if (social.name === '微信') {
    // 微信分享复制链接到剪贴板
    if (navigator.clipboard) {
      navigator.clipboard.writeText(getCurrentURL())
      // 这里可以添加提示消息
      alert('链接已复制到剪贴板，请在微信中分享')
    }
  } else if (social.url) {
    window.open(social.url, '_blank')
  }
}

const submitFeedback = async () => {
  // 这里可以添加实际的反馈提交逻辑
  console.log('反馈提交:', {
    rating: selectedRating.value,
    text: feedbackText.value,
    article: slug
  })
  
  showFeedbackModal.value = false
  selectedRating.value = 0
  feedbackText.value = ''
  
  // 显示感谢消息（可以使用 toast 组件）
  alert('感谢你的反馈！')
}

// SEO 结构化数据
useJsonld({
  '@context': 'https://schema.org',
  '@type': 'BlogPosting',
  headline: data?.title,
  description: data?.description,
  image: data?.image,
  datePublished: data?.publishedAt,
  dateModified: data?.updatedAt || data?.publishedAt,
  author: {
    '@type': 'Person',
    name: data?.author || 'Frontend AI Engineer'
  },
  publisher: {
    '@type': 'Organization',
    name: 'AI Frontend Engineer Blog'
  },
  mainEntityOfPage: {
    '@type': 'WebPage',
    '@id': `https://ai-frontend-engineer.com/blog/${slug}`
  },
  keywords: data?.tags?.join(', '),
  articleSection: data?.category,
  wordCount: data?.body?.children?.length || 0
})

// 404 处理
if (!data) {
  throw createError({
    statusCode: 404,
    statusMessage: '文章不存在'
  })
}
</script>

<style scoped>
/**
 * 文章详情页面样式
 */

/* 文章头部样式 */
.article-header {
  @apply bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-800 dark:to-gray-700;
}

/* 文章内容区域样式 */
.article-content {
  @apply bg-white dark:bg-gray-900;
}

/* 自定义 prose 样式 */
.prose {
  /* 代码块样式 */
  @apply prose-pre:bg-gray-900 prose-pre:text-gray-100;
  
  /* 引用样式 */
  @apply prose-blockquote:border-l-blue-500 prose-blockquote:bg-blue-50 dark:prose-blockquote:bg-blue-900/20;
  
  /* 链接样式 */
  @apply prose-a:text-blue-600 dark:prose-a:text-blue-400 prose-a:no-underline hover:prose-a:underline;
  
  /* 标题样式 */
  @apply prose-headings:scroll-mt-20;
}

/* 目录样式 */
.toc a.active {
  @apply text-blue-600 dark:text-blue-400 font-medium;
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
  .article-content .container {
    @apply px-4;
  }
}

@media (max-width: 768px) {
  .article-header h1 {
    @apply text-2xl;
  }
  
  .prose {
    @apply prose-base;
  }
}
</style>