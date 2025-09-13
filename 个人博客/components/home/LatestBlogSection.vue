<template>
  <section class="py-20 bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50 dark:from-gray-800 dark:via-blue-900/20 dark:to-purple-900/20">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- 章节标题 -->
      <div class="text-center mb-16 animate-on-scroll">
        <div class="inline-flex items-center space-x-2 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-200 px-4 py-2 rounded-full text-sm font-medium mb-4">
          <Icon name="heroicons:document-text" class="w-4 h-4" />
          <span>最新文章</span>
        </div>
        <h2 class="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
          深度技术洞察与<span class="text-gradient-ai">实战经验</span>
        </h2>
        <p class="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
          基于滴滴工程师一线实践，分享AI辅助开发的深度思考、技术选型和踩坑经验，
          助力前端开发者在AI时代的<strong class="text-blue-600 dark:text-blue-400">技能升级</strong>。
        </p>
      </div>

      <!-- 特色文章 -->
      <div class="grid lg:grid-cols-3 gap-8 mb-12">
        <!-- 主要文章 -->
        <div class="lg:col-span-2 animate-on-scroll">
          <article class="group bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden hover:shadow-2xl transition-all duration-300">
            <!-- 文章封面 -->
            <div class="relative overflow-hidden">
              <div class="aspect-video bg-gradient-to-br from-blue-500 via-purple-600 to-cyan-500 relative">
                <!-- 装饰图案 -->
                <div class="absolute inset-0 bg-mesh-pattern opacity-20"></div>
                
                <!-- 文章主题图标 -->
                <div class="absolute inset-0 flex items-center justify-center">
                  <div class="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center">
                    <Icon name="mdi:brain" class="w-12 h-12 text-white" />
                  </div>
                </div>

                <!-- 阅读时间 -->
                <div class="absolute top-4 right-4 bg-black/20 backdrop-blur-sm text-white px-3 py-1 rounded-full text-sm font-medium">
                  <Icon name="heroicons:clock" class="w-4 h-4 inline mr-1" />
                  15 min read
                </div>

                <!-- 文章标签 -->
                <div class="absolute bottom-4 left-4">
                  <div class="flex items-center space-x-2">
                    <Tag value="AI工作流" severity="secondary" rounded class="!bg-white/20 !text-white !border-white/30" />
                    <Tag value="滴滴实践" severity="secondary" rounded class="!bg-white/20 !text-white !border-white/30" />
                  </div>
                </div>
              </div>
            </div>

            <!-- 文章内容 -->
            <div class="p-8">
              <div class="flex items-center space-x-4 mb-4">
                <div class="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                  <Icon name="mdi:account" class="w-6 h-6 text-white" />
                </div>
                <div>
                  <div class="font-semibold text-gray-900 dark:text-white">AI Frontend Engineer</div>
                  <div class="text-sm text-gray-500 dark:text-gray-400">2024年12月11日</div>
                </div>
              </div>

              <h3 class="text-2xl font-bold text-gray-900 dark:text-white mb-4 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors leading-tight">
                深度解读：滴滴工程师的AI工作流实践 - 从"代码实现者"到"AI协作者"的转变
              </h3>

              <p class="text-gray-600 dark:text-gray-400 mb-6 leading-relaxed">
                基于滴滴前端工程师一年来的AI辅助开发实践，深度解析如何将AI融入日常开发工作流的6大应用场景。
                从需求分析到代码上线，探索68%效率提升背后的方法论与最佳实践，分享踩坑经验和成功模式...
              </p>

              <!-- 文章亮点 -->
              <div class="mb-6">
                <h4 class="font-semibold text-gray-900 dark:text-white mb-3 flex items-center">
                  <Icon name="heroicons:star" class="w-4 h-4 text-yellow-500 mr-2" />
                  文章亮点
                </h4>
                <ul class="space-y-2">
                  <li class="flex items-start space-x-2 text-sm text-gray-600 dark:text-gray-400">
                    <Icon name="heroicons:check-circle" class="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                    <span>6大AI应用场景的详细实践指南</span>
                  </li>
                  <li class="flex items-start space-x-2 text-sm text-gray-600 dark:text-gray-400">
                    <Icon name="heroicons:check-circle" class="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                    <span>68%效率提升的量化分析和方法论</span>
                  </li>
                  <li class="flex items-start space-x-2 text-sm text-gray-600 dark:text-gray-400">
                    <Icon name="heroicons:check-circle" class="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                    <span>308+AI工具的筛选和使用经验</span>
                  </li>
                </ul>
              </div>

              <!-- 阅读更多按钮 -->
              <div class="flex items-center justify-between">
                <Button 
                  @click="readMainArticle"
                  class="btn-ai-gradient !px-6 !py-3"
                >
                  <Icon name="heroicons:document-text" class="w-4 h-4 mr-2" />
                  阅读全文
                </Button>

                <div class="flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-400">
                  <div class="flex items-center space-x-1">
                    <Icon name="heroicons:eye" class="w-4 h-4" />
                    <span>2.8k</span>
                  </div>
                  <div class="flex items-center space-x-1">
                    <Icon name="heroicons:heart" class="w-4 h-4" />
                    <span>156</span>
                  </div>
                  <div class="flex items-center space-x-1">
                    <Icon name="heroicons:chat-bubble-left" class="w-4 h-4" />
                    <span>24</span>
                  </div>
                </div>
              </div>
            </div>
          </article>
        </div>

        <!-- 侧边文章列表 -->
        <div class="space-y-6 animate-on-scroll">
          <!-- 最新文章标题 -->
          <div class="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
            <h3 class="text-lg font-bold text-gray-900 dark:text-white mb-4 flex items-center">
              <Icon name="heroicons:fire" class="w-5 h-5 text-orange-500 mr-2" />
              热门推荐
            </h3>

            <div class="space-y-4">
              <article
                v-for="(article, index) in sideArticles"
                :key="article.id"
                class="group cursor-pointer border-b border-gray-200 dark:border-gray-700 last:border-b-0 pb-4 last:pb-0"
                @click="readArticle(article)"
              >
                <div class="flex items-start space-x-3">
                  <div :class="[
                    'w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0',
                    article.iconBg
                  ]">
                    <Icon :name="article.icon" :class="[
                      'w-6 h-6',
                      article.iconColor
                    ]" />
                  </div>

                  <div class="flex-1 min-w-0">
                    <h4 class="font-semibold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors line-clamp-2 mb-2">
                      {{ article.title }}
                    </h4>
                    <p class="text-sm text-gray-600 dark:text-gray-400 line-clamp-2 mb-2">
                      {{ article.excerpt }}
                    </p>
                    
                    <div class="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
                      <span>{{ article.date }}</span>
                      <div class="flex items-center space-x-2">
                        <span>{{ article.readTime }}</span>
                        <div class="flex items-center space-x-1">
                          <Icon name="heroicons:eye" class="w-3 h-3" />
                          <span>{{ article.views }}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </article>
            </div>
          </div>

          <!-- 文章分类 -->
          <div class="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
            <h3 class="text-lg font-bold text-gray-900 dark:text-white mb-4 flex items-center">
              <Icon name="heroicons:folder-open" class="w-5 h-5 text-blue-500 mr-2" />
              热门分类
            </h3>

            <div class="space-y-3">
              <div
                v-for="category in categories"
                :key="category.name"
                class="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer transition-colors"
                @click="viewCategory(category)"
              >
                <div class="flex items-center space-x-3">
                  <Icon :name="category.icon" :class="[
                    'w-5 h-5',
                    category.color
                  ]" />
                  <span class="font-medium text-gray-900 dark:text-white">
                    {{ category.name }}
                  </span>
                </div>
                <div class="bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded-full text-xs font-medium text-gray-600 dark:text-gray-400">
                  {{ category.count }}
                </div>
              </div>
            </div>
          </div>

          <!-- 订阅提醒 -->
          <div class="bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl p-6 text-white">
            <div class="text-center">
              <Icon name="heroicons:bell" class="w-8 h-8 mx-auto mb-3 text-blue-100" />
              <h3 class="text-lg font-bold mb-2">订阅更新</h3>
              <p class="text-blue-100 text-sm mb-4">
                第一时间获取最新的AI开发实践和工具推荐
              </p>
              <Button 
                @click="subscribe"
                class="!bg-white !text-blue-600 hover:!bg-blue-50 !border-white w-full"
              >
                <Icon name="heroicons:envelope" class="w-4 h-4 mr-2" />
                立即订阅
              </Button>
            </div>
          </div>
        </div>
      </div>

      <!-- 查看更多文章 -->
      <div class="text-center animate-on-scroll">
        <Button 
          @click="viewAllArticles"
          outlined
          size="large"
          class="!px-8 !py-4 !text-lg !border-2"
        >
          <Icon name="heroicons:document-text" class="w-5 h-5 mr-2" />
          查看全部文章
          <Icon name="heroicons:arrow-right" class="w-4 h-4 ml-2" />
        </Button>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
/**
 * 最新博客文章展示组件
 * 展示最新的技术文章和热门内容
 */

// 侧边栏文章数据
const sideArticles = [
  {
    id: '2',
    title: 'Cursor IDE深度体验：真正改变开发方式的AI编程工具',
    excerpt: '深度体验Cursor IDE的AI编程功能，对比传统IDE的优势和使用技巧...',
    date: '2024年12月9日',
    readTime: '8 min',
    views: '1.2k',
    icon: 'mdi:cursor-default',
    iconBg: 'bg-blue-100 dark:bg-blue-900/30',
    iconColor: 'text-blue-600 dark:text-blue-400'
  },
  {
    id: '3',
    title: 'ChatGPT vs Claude：前端开发场景下的AI工具选择指南',
    excerpt: '对比分析ChatGPT和Claude在前端开发中的表现，帮助选择最适合的AI助手...',
    date: '2024年12月7日',
    readTime: '12 min',
    views: '956',
    icon: 'simple-icons:openai',
    iconBg: 'bg-green-100 dark:bg-green-900/30',
    iconColor: 'text-green-600 dark:text-green-400'
  },
  {
    id: '4',
    title: '308+AI工具大盘点：前端开发者的完整工具箱',
    excerpt: '精选308个AI工具，涵盖代码生成、设计转换、测试自动化等各个环节...',
    date: '2024年12月5日',
    readTime: '20 min',
    views: '2.1k',
    icon: 'mdi:toolbox',
    iconBg: 'bg-purple-100 dark:bg-purple-900/30',
    iconColor: 'text-purple-600 dark:text-purple-400'
  },
  {
    id: '5',
    title: 'AI辅助代码重构实战：从混乱到优雅的代码进化',
    excerpt: '实际案例展示如何使用AI工具进行代码重构，提升代码质量和可维护性...',
    date: '2024年12月3日',
    readTime: '15 min',
    views: '834',
    icon: 'heroicons:arrow-path',
    iconBg: 'bg-orange-100 dark:bg-orange-900/30',
    iconColor: 'text-orange-600 dark:text-orange-400'
  }
]

// 文章分类数据
const categories = [
  {
    name: 'AI工作流',
    icon: 'mdi:workflow',
    color: 'text-blue-500',
    count: 12
  },
  {
    name: '工具评测',
    icon: 'mdi:hammer-wrench',
    color: 'text-green-500',
    count: 8
  },
  {
    name: '实战案例',
    icon: 'heroicons:light-bulb',
    color: 'text-yellow-500',
    count: 15
  },
  {
    name: '技术深度',
    icon: 'heroicons:cog-6-tooth',
    color: 'text-purple-500',
    count: 6
  }
]

// 方法
const readMainArticle = () => {
  navigateTo('/blog/ai-workflow-analysis')
}

const readArticle = (article: any) => {
  navigateTo(`/blog/${article.id}`)
}

const viewCategory = (category: any) => {
  navigateTo(`/blog/category/${category.name.toLowerCase()}`)
}

const viewAllArticles = () => {
  navigateTo('/blog')
}

const subscribe = () => {
  // 实现订阅逻辑
  console.log('订阅更新')
}
</script>

<style scoped>
/**
 * 最新博客文章展示组件样式
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

/* 文章卡片悬停效果 */
.group:hover {
  transform: translateY(-4px);
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

/* 网格模式装饰 */
.bg-mesh-pattern {
  background-image: url("data:image/svg+xml,%3csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3e%3cg fill='none' fill-rule='evenodd'%3e%3cg fill='%23ffffff' fill-opacity='0.3'%3e%3ccircle cx='30' cy='30' r='1.5'/%3e%3c/g%3e%3c/g%3e%3c/svg%3e");
}

/* 渐变背景动画 */
.bg-gradient-to-br {
  background-size: 200% 200%;
  animation: gradientShift 8s ease infinite;
}

@keyframes gradientShift {
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}

/* 标签样式覆盖 */
:deep(.p-tag) {
  backdrop-filter: blur(10px);
}

/* 响应式优化 */
@media (max-width: 1024px) {
  .lg\:col-span-2 {
    grid-column: span 1;
  }
  
  .grid.lg\:grid-cols-3 {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
}

@media (max-width: 768px) {
  .p-8 {
    padding: 1.5rem;
  }
  
  .p-6 {
    padding: 1rem;
  }
  
  .text-2xl {
    font-size: 1.5rem;
  }
  
  .aspect-video {
    aspect-ratio: 16 / 10;
  }
}

/* 无障碍优化 */
.cursor-pointer:focus,
button:focus {
  outline: 2px solid #3b82f6;
  outline-offset: 2px;
}

/* 减少动画对于偏好减少动效的用户 */
@media (prefers-reduced-motion: reduce) {
  .animate-on-scroll,
  .group,
  .group:hover,
  .transition-all,
  .transition-colors,
  .bg-gradient-to-br {
    animation: none !important;
    transition: none !important;
    transform: none !important;
  }
}

/* 深色模式优化 */
.dark .shadow-2xl {
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.4);
}

.dark .backdrop-blur-sm {
  backdrop-filter: blur(4px);
}
</style>