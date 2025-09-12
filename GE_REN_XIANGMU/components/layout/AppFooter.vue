<template>
  <footer class="bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        <!-- 品牌信息 -->
        <div class="lg:col-span-1">
          <div class="flex items-center space-x-3 mb-4">
            <div class="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
              <Icon name="mdi:robot" class="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 class="text-lg font-bold text-gray-900 dark:text-white">
                <span class="text-gradient-ai">AI</span> Frontend
              </h3>
              <p class="text-sm text-gray-500 dark:text-gray-400">Engineer Blog</p>
            </div>
          </div>
          <p class="text-gray-600 dark:text-gray-400 mb-4">
            将AI融入前端开发工作流，从"代码实现者"转变为"AI协作者"，分享AI工具和最佳实践。
          </p>
          <div class="flex space-x-4">
            <a 
              href="https://github.com/username" 
              target="_blank"
              class="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
              aria-label="GitHub"
            >
              <Icon name="mdi:github" class="w-6 h-6" />
            </a>
            <a 
              href="https://twitter.com/username" 
              target="_blank"
              class="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
              aria-label="Twitter"
            >
              <Icon name="mdi:twitter" class="w-6 h-6" />
            </a>
            <a 
              href="mailto:contact@ai-frontend-engineer.com"
              class="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
              aria-label="Email"
            >
              <Icon name="heroicons:envelope" class="w-6 h-6" />
            </a>
            <a 
              href="/rss.xml"
              class="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
              aria-label="RSS订阅"
            >
              <Icon name="heroicons:rss" class="w-6 h-6" />
            </a>
          </div>
        </div>

        <!-- 快速链接 -->
        <div>
          <h4 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">快速导航</h4>
          <ul class="space-y-3">
            <li>
              <NuxtLink 
                to="/blog" 
                class="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              >
                博客文章
              </NuxtLink>
            </li>
            <li>
              <NuxtLink 
                to="/tools" 
                class="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              >
                AI工具库
              </NuxtLink>
            </li>
            <li>
              <NuxtLink 
                to="/cases" 
                class="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              >
                实践案例
              </NuxtLink>
            </li>
            <li>
              <NuxtLink 
                to="/about" 
                class="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              >
                关于我
              </NuxtLink>
            </li>
          </ul>
        </div>

        <!-- 热门工具 -->
        <div>
          <h4 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">热门AI工具</h4>
          <ul class="space-y-3">
            <li>
              <a 
                href="https://cursor.sh/" 
                target="_blank"
                class="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors flex items-center space-x-2"
              >
                <Icon name="mdi:cursor-default" class="w-4 h-4" />
                <span>Cursor AI编程</span>
              </a>
            </li>
            <li>
              <a 
                href="https://chatgpt.com/" 
                target="_blank"
                class="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors flex items-center space-x-2"
              >
                <Icon name="simple-icons:openai" class="w-4 h-4" />
                <span>ChatGPT</span>
              </a>
            </li>
            <li>
              <a 
                href="https://claude.ai/" 
                target="_blank"
                class="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors flex items-center space-x-2"
              >
                <Icon name="simple-icons:anthropic" class="w-4 h-4" />
                <span>Claude</span>
              </a>
            </li>
            <li>
              <a 
                href="https://www.perplexity.ai/" 
                target="_blank"
                class="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors flex items-center space-x-2"
              >
                <Icon name="mdi:magnify" class="w-4 h-4" />
                <span>Perplexity搜索</span>
              </a>
            </li>
          </ul>
        </div>

        <!-- 订阅和联系 -->
        <div>
          <h4 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">保持联系</h4>
          <p class="text-gray-600 dark:text-gray-400 mb-4">
            订阅我的博客，获取最新的AI工具和前端开发技巧。
          </p>
          <form @submit.prevent="handleSubscribe" class="space-y-3">
            <div>
              <input
                v-model="email"
                type="email"
                placeholder="输入您的邮箱地址"
                class="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>
            <Button 
              type="submit"
              :loading="isSubscribing"
              class="w-full btn-ai-gradient"
              :disabled="!email"
            >
              <Icon name="heroicons:envelope" class="w-4 h-4 mr-2" />
              订阅更新
            </Button>
          </form>
          <p class="text-xs text-gray-500 dark:text-gray-400 mt-2">
            我们尊重您的隐私，不会发送垃圾邮件。
          </p>
        </div>
      </div>

      <!-- 分割线 -->
      <div class="border-t border-gray-200 dark:border-gray-700 mt-8 pt-8">
        <div class="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <!-- 版权信息 -->
          <div class="text-gray-600 dark:text-gray-400 text-sm">
            <p>
              © {{ currentYear }} AI Frontend Engineer Blog. 
              <span class="hidden sm:inline">用 ❤️ 和 AI 构建</span>
            </p>
          </div>

          <!-- 技术栈标识 -->
          <div class="flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-400">
            <span class="flex items-center space-x-1">
              <Icon name="mdi:vuejs" class="w-4 h-4 text-green-500" />
              <span>Vue 3</span>
            </span>
            <span class="flex items-center space-x-1">
              <Icon name="simple-icons:nuxtdotjs" class="w-4 h-4 text-green-400" />
              <span>Nuxt 3</span>
            </span>
            <span class="flex items-center space-x-1">
              <Icon name="simple-icons:typescript" class="w-4 h-4 text-blue-500" />
              <span>TypeScript</span>
            </span>
            <span class="flex items-center space-x-1">
              <Icon name="mdi:robot" class="w-4 h-4 text-purple-500" />
              <span>AI助力开发</span>
            </span>
          </div>

          <!-- 额外链接 -->
          <div class="flex items-center space-x-6 text-sm">
            <NuxtLink 
              to="/privacy" 
              class="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
            >
              隐私政策
            </NuxtLink>
            <NuxtLink 
              to="/terms" 
              class="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
            >
              使用条款
            </NuxtLink>
            <NuxtLink 
              to="/sitemap.xml" 
              class="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
            >
              网站地图
            </NuxtLink>
          </div>
        </div>
      </div>
    </div>

    <!-- 返回顶部按钮 -->
    <div class="fixed bottom-6 right-6 z-50">
      <Button
        @click="scrollToTop"
        v-show="showScrollTop"
        rounded
        class="!p-3 shadow-lg bg-blue-600 hover:bg-blue-700 text-white"
        v-tooltip.left="'返回顶部'"
      >
        <Icon name="heroicons:chevron-up" class="w-5 h-5" />
      </Button>
    </div>
  </footer>
</template>

<script setup lang="ts">
/**
 * 应用页脚组件
 * 包含导航链接、社交媒体、订阅表单和版权信息
 */

// 响应式数据
const email = ref('')
const isSubscribing = ref(false)
const showScrollTop = ref(false)

// 计算属性
const currentYear = computed(() => new Date().getFullYear())

// 方法
const handleSubscribe = async () => {
  if (!email.value) return
  
  isSubscribing.value = true
  
  try {
    // 这里可以集成实际的邮件订阅服务
    // 比如 Mailchimp、ConvertKit 等
    console.log('订阅邮箱:', email.value)
    
    // 模拟API调用
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    // 显示成功消息
    const toast = useToast()
    toast.add({
      severity: 'success',
      summary: '订阅成功',
      detail: '感谢您的订阅！我们会定期发送最新的AI工具和技术内容。',
      life: 5000
    })
    
    // 清空邮箱输入
    email.value = ''
    
  } catch (error) {
    console.error('订阅失败:', error)
    
    const toast = useToast()
    toast.add({
      severity: 'error',
      summary: '订阅失败',
      detail: '抱歉，订阅过程中出现了错误，请稍后重试。',
      life: 5000
    })
  } finally {
    isSubscribing.value = false
  }
}

const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  })
}

// 监听滚动显示返回顶部按钮
onMounted(() => {
  const handleScroll = () => {
    showScrollTop.value = window.scrollY > 300
  }
  
  window.addEventListener('scroll', handleScroll)
  
  return () => {
    window.removeEventListener('scroll', handleScroll)
  }
})
</script>

<style scoped>
/**
 * 页脚组件样式
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
  @apply text-white font-semibold transform hover:scale-105 transition-all duration-300;
}

.btn-ai-gradient:hover {
  background: linear-gradient(135deg, #2563eb 0%, #7c3aed 100%);
  box-shadow: 0 10px 25px -5px rgba(59, 130, 246, 0.4);
}

/* 链接悬停效果 */
a {
  transition: color 0.2s ease;
}

/* 输入框聚焦效果 */
input:focus {
  outline: none;
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
}

/* 响应式优化 */
@media (max-width: 768px) {
  .grid {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
}

/* 返回顶部按钮动画 */
.fixed button {
  transition: all 0.3s ease;
}

.fixed button:hover {
  transform: translateY(-2px);
}

/* 社交媒体图标悬停效果 */
.flex.space-x-4 a {
  transition: all 0.2s ease;
}

.flex.space-x-4 a:hover {
  transform: translateY(-1px);
}
</style>
