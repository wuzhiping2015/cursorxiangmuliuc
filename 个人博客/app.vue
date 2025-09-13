<template>
  <div id="app" class="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
    <!-- 全局 Toast 组件 -->
    <Toast />
    
    <!-- 页面布局 -->
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
    
    <!-- 返回顶部按钮 -->
    <ScrollTop 
      target="window" 
      :threshold="300"
      class="!bg-blue-600 hover:!bg-blue-700 !text-white !rounded-full !shadow-lg transition-all duration-300"
      icon="pi pi-chevron-up"
    />
    
    <!-- 全局加载指示器 -->
    <div 
      v-if="pending" 
      class="fixed inset-0 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm z-50 flex items-center justify-center"
    >
      <div class="text-center">
        <ProgressSpinner 
          style-class="w-12 h-12"
          stroke-width="3"
          animation-duration="1s"
        />
        <p class="mt-4 text-gray-600 dark:text-gray-400">
          正在加载<span class="loading-dots"></span>
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
/**
 * 应用根组件
 * AI驱动的前端工程师个人博客
 */

// 页面元数据
useHead({
  htmlAttrs: {
    lang: 'zh-CN'
  },
  title: 'AI Frontend Engineer - 将AI融入前端开发工作流',
  meta: [
    { 
      name: 'description', 
      content: '分享AI驱动的前端开发实践，308+精选AI工具，提升开发效率的最佳实践。基于滴滴工程师AI工作流经验，帮助前端开发者从"代码实现者"转变为"AI协作者"。' 
    },
    { 
      name: 'keywords', 
      content: 'AI工具,前端开发,开发效率,Vue3,Nuxt3,个人博客,工作流优化,滴滴,人工智能,编程助手' 
    },
    { name: 'author', content: 'Frontend AI Engineer' },
    { name: 'robots', content: 'index, follow' },
    
    // Open Graph 元标签
    { property: 'og:title', content: 'AI Frontend Engineer - 将AI融入前端开发工作流' },
    { property: 'og:description', content: '分享AI驱动的前端开发实践，308+精选AI工具，提升开发效率的最佳实践' },
    { property: 'og:type', content: 'website' },
    { property: 'og:locale', content: 'zh_CN' },
    
    // Twitter Card 元标签
    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'twitter:title', content: 'AI Frontend Engineer Blog' },
    { name: 'twitter:description', content: '将AI融入前端开发工作流，提升开发效率' },
    
    // 移动端优化
    { name: 'viewport', content: 'width=device-width, initial-scale=1, viewport-fit=cover' },
    { name: 'format-detection', content: 'telephone=no' },
    { name: 'mobile-web-app-capable', content: 'yes' },
    { name: 'apple-mobile-web-app-capable', content: 'yes' },
    { name: 'apple-mobile-web-app-status-bar-style', content: 'default' },
    
    // 主题色
    { name: 'theme-color', content: '#3b82f6' },
    { name: 'msapplication-navbutton-color', content: '#3b82f6' },
    { name: 'apple-mobile-web-app-status-bar-style', content: '#3b82f6' }
  ],
  link: [
    { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
    { rel: 'apple-touch-icon', sizes: '180x180', href: '/apple-touch-icon.png' },
    { rel: 'icon', type: 'image/png', sizes: '32x32', href: '/favicon-32x32.png' },
    { rel: 'icon', type: 'image/png', sizes: '16x16', href: '/favicon-16x16.png' },
    { rel: 'manifest', href: '/site.webmanifest' },
    { rel: 'canonical', href: 'https://ai-frontend-engineer.com' }
  ]
})

// 全局状态
const pending = ref(false)

// 暗黑模式支持
const colorMode = useColorMode()

// 页面加载状态管理
const route = useRoute()
const router = useRouter()

// 监听路由变化，显示加载状态
router.beforeEach((to, from) => {
  if (to.path !== from.path) {
    pending.value = true
  }
})

router.afterEach(() => {
  // 延迟隐藏加载状态，确保页面渲染完成
  setTimeout(() => {
    pending.value = false
  }, 300)
})

// 页面挂载时初始化
onMounted(() => {
  // 初始化主题
  if (process.client) {
    // 检查用户系统主题偏好
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
    if (!colorMode.value) {
      colorMode.preference = prefersDark ? 'dark' : 'light'
    }
    
    // 监听系统主题变化
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
      if (colorMode.preference === 'system') {
        colorMode.value = e.matches ? 'dark' : 'light'
      }
    })
  }
  
  // 页面加载完成，隐藏加载状态
  pending.value = false
})

// SEO 优化 - 结构化数据
useJsonld({
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'AI Frontend Engineer Blog',
  description: '分享AI驱动的前端开发实践，308+精选AI工具，提升开发效率的最佳实践',
  url: 'https://ai-frontend-engineer.com',
  author: {
    '@type': 'Person',
    name: 'Frontend AI Engineer',
    jobTitle: 'Frontend Developer & AI Enthusiast',
    description: '专注于AI辅助前端开发的工程师，分享AI工具和工作流优化经验'
  },
  publisher: {
    '@type': 'Organization',
    name: 'AI Frontend Engineer Blog',
    logo: {
      '@type': 'ImageObject',
      url: 'https://ai-frontend-engineer.com/logo.png'
    }
  },
  potentialAction: {
    '@type': 'SearchAction',
    target: 'https://ai-frontend-engineer.com/search?q={search_term_string}'
  }
})

// 错误处理
const handleError = (error: any) => {
  console.error('应用错误:', error)
  // 这里可以添加错误上报逻辑
}

// 全局错误捕获
if (process.client) {
  window.addEventListener('error', handleError)
  window.addEventListener('unhandledrejection', (event) => {
    handleError(event.reason)
  })
}
</script>

<style>
/**
 * 全局样式覆盖
 * 这里只放置必要的全局样式，具体样式请放在 assets/css/main.css 中
 */

/* 页面过渡动画 */
.page-enter-active,
.page-leave-active {
  transition: all 0.3s ease;
}

.page-enter-from,
.page-leave-to {
  opacity: 0;
  transform: translateY(10px);
}

/* 布局过渡动画 */
.layout-enter-active,
.layout-leave-active {
  transition: all 0.3s ease;
}

.layout-enter-from,
.layout-leave-to {
  opacity: 0;
  transform: translateX(-10px);
}

/* PrimeVue Toast 样式覆盖 */
.p-toast {
  @apply z-50;
}

.p-toast .p-toast-message {
  @apply backdrop-blur-sm;
}

/* 滚动优化 */
html {
  scroll-padding-top: 80px; /* 为固定导航栏留出空间 */
}

/* 减少动画对于偏好减少动效的用户 */
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
</style>
