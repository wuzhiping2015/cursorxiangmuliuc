<template>
  <header class="fixed top-0 left-0 right-0 z-40 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-700">
    <nav class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex items-center justify-between h-16">
        <!-- Logo 和 品牌名 -->
        <div class="flex items-center space-x-3">
          <NuxtLink 
            to="/" 
            class="flex items-center space-x-3 group"
            @click="handleLogoClick"
          >
            <!-- AI 图标 -->
            <div class="relative">
              <div class="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center transform group-hover:scale-110 transition-transform duration-300">
                <Icon 
                  name="mdi:robot" 
                  class="w-6 h-6 text-white" 
                />
              </div>
              <!-- 光效动画 -->
              <div class="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg opacity-75 group-hover:animate-ping"></div>
            </div>
            
            <!-- 品牌文字 -->
            <div class="hidden sm:block">
              <h1 class="text-xl font-bold text-gray-900 dark:text-white">
                <span class="text-gradient-ai">AI</span> Frontend
              </h1>
              <p class="text-xs text-gray-500 dark:text-gray-400">
                Engineer Blog
              </p>
            </div>
          </NuxtLink>
        </div>

        <!-- 桌面端导航菜单 -->
        <div class="hidden md:flex items-center space-x-8">
          <NavLink 
            v-for="item in navigationItems" 
            :key="item.path"
            :to="item.path"
            :icon="item.icon"
            :external="item.external"
            class="nav-link"
          >
            {{ item.label }}
          </NavLink>
        </div>

        <!-- 右侧功能区 -->
        <div class="flex items-center space-x-4">
          <!-- 搜索按钮 -->
          <Button 
            @click="toggleSearch"
            severity="secondary"
            text
            rounded
            class="!p-2"
            v-tooltip.bottom="'搜索 (Ctrl+K)'"
          >
            <Icon name="heroicons:magnifying-glass" class="w-5 h-5" />
          </Button>

          <!-- 主题切换 -->
          <Button 
            @click="toggleDarkMode"
            severity="secondary"
            text
            rounded
            class="!p-2"
            v-tooltip.bottom="darkMode ? '切换到浅色模式' : '切换到深色模式'"
          >
            <Icon 
              :name="darkMode ? 'heroicons:sun' : 'heroicons:moon'" 
              class="w-5 h-5" 
            />
          </Button>

          <!-- GitHub 链接 -->
          <Button 
            @click="openGitHub"
            severity="secondary"
            text
            rounded
            class="!p-2"
            v-tooltip.bottom="'查看源代码'"
          >
            <Icon name="mdi:github" class="w-5 h-5" />
          </Button>

          <!-- 移动端菜单按钮 -->
          <Button 
            @click="toggleMobileMenu"
            severity="secondary"
            text
            rounded
            class="!p-2 md:hidden"
            v-tooltip.bottom="'菜单'"
          >
            <Icon 
              :name="mobileMenuOpen ? 'heroicons:x-mark' : 'heroicons:bars-3'" 
              class="w-5 h-5" 
            />
          </Button>
        </div>
      </div>

      <!-- 移动端导航菜单 -->
      <Transition
        enter-active-class="transition duration-200 ease-out"
        enter-from-class="opacity-0 scale-95"
        enter-to-class="opacity-100 scale-100"
        leave-active-class="transition duration-150 ease-in"
        leave-from-class="opacity-100 scale-100"
        leave-to-class="opacity-0 scale-95"
      >
        <div 
          v-if="mobileMenuOpen" 
          class="md:hidden py-4 border-t border-gray-200 dark:border-gray-700"
        >
          <div class="space-y-2">
            <NuxtLink
              v-for="item in navigationItems"
              :key="item.path"
              :to="item.path"
              @click="closeMobileMenu"
              class="flex items-center space-x-3 px-3 py-2 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200"
            >
              <Icon :name="item.icon" class="w-5 h-5" />
              <span class="font-medium">{{ item.label }}</span>
            </NuxtLink>
          </div>
        </div>
      </Transition>
    </nav>

    <!-- 搜索模态框 -->
    <SearchModal v-model:visible="searchVisible" />
  </header>
</template>

<script setup lang="ts">
/**
 * 应用头部导航组件
 * 包含品牌标识、导航菜单、主题切换等功能
 */

// 响应式状态
const mobileMenuOpen = ref(false)
const searchVisible = ref(false)

// 颜色模式
const colorMode = useColorMode()
const darkMode = computed(() => colorMode.value === 'dark')

// 导航菜单项配置
interface NavItem { label: string; path: string; icon: string; external?: boolean }
const navigationItems: NavItem[] = [
  {
    label: '首页',
    path: '/',
    icon: 'heroicons:home',
    external: false
  },
  {
    label: '博客',
    path: '/blog',
    icon: 'heroicons:document-text',
    external: false
  },
  {
    label: 'AI工具',
    path: '/tools',
    icon: 'mdi:robot',
    external: false
  },
  {
    label: '实践案例',
    path: '/cases',
    icon: 'heroicons:light-bulb',
    external: false
  },
  {
    label: '关于',
    path: '/about',
    icon: 'heroicons:user',
    external: false
  }
]

// 方法定义
const toggleMobileMenu = () => {
  mobileMenuOpen.value = !mobileMenuOpen.value
}

const closeMobileMenu = () => {
  mobileMenuOpen.value = false
}

const toggleSearch = () => {
  searchVisible.value = !searchVisible.value
}

const toggleDarkMode = () => {
  colorMode.preference = darkMode.value ? 'light' : 'dark'
}

const openGitHub = () => {
  window.open('https://github.com/username/ai-frontend-blog', '_blank')
}

const handleLogoClick = () => {
  // 如果已经在首页，则滚动到顶部
  if (useRoute().path === '/') {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }
}

// 键盘快捷键
onMounted(() => {
  const handleKeydown = (event: KeyboardEvent) => {
    // Ctrl+K 或 Cmd+K 打开搜索
    if ((event.ctrlKey || event.metaKey) && event.key === 'k') {
      event.preventDefault()
      toggleSearch()
    }
    
    // Escape 关闭移动菜单和搜索
    if (event.key === 'Escape') {
      mobileMenuOpen.value = false
      searchVisible.value = false
    }
  }

  document.addEventListener('keydown', handleKeydown)
  
  return () => {
    document.removeEventListener('keydown', handleKeydown)
  }
})

// 点击外部区域关闭移动菜单
const handleClickOutside = (event: Event) => {
  const target = event.target as Element
  if (!target.closest('header')) {
    mobileMenuOpen.value = false
  }
}

onMounted(() => {
  document.addEventListener('click', handleClickOutside)
})

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
})

// 路由变化时关闭移动菜单
const route = useRoute()
watch(() => route.path, () => {
  mobileMenuOpen.value = false
})
</script>

<style scoped>
/**
 * 导航组件样式
 */

/* 导航链接悬停效果 */
.nav-link {
  @apply relative text-gray-700 dark:text-gray-300 font-medium transition-all duration-300 hover:text-blue-600 dark:hover:text-blue-400;
}

.nav-link::after {
  content: '';
  @apply absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-600 to-purple-600 transition-all duration-300;
}

.nav-link:hover::after {
  @apply w-full;
}

/* 活跃状态样式 */
.nav-link.router-link-active {
  @apply text-blue-600 dark:text-blue-400;
}

.nav-link.router-link-active::after {
  @apply w-full;
}

/* 品牌文字渐变效果 */
.text-gradient-ai {
  background: linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

/* 导航栏模糊效果 */
header {
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
}

/* 移动端菜单动画 */
.slide-fade-enter-active {
  transition: all 0.3s ease-out;
}

.slide-fade-leave-active {
  transition: all 0.2s ease-in;
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateY(-10px);
  opacity: 0;
}

/* 响应式优化 */
@media (max-width: 640px) {
  .nav-link {
    @apply text-base;
  }
}
</style>
