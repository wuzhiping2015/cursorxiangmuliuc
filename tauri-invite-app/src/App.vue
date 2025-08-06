<script setup>
/**
 * Tauri 桌面版根组件
 * 应用程序的主要容器和全局状态管理（桌面版适配）
 * @author 前端工程师团队
 * @date 2024-12-XX
 */
import { ref, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/stores/user'
import Toast from '@/components/common/Toast.vue'
import GlobalLoading from '@/components/common/GlobalLoading.vue'
import { setToastInstance } from '@/utils/toast'
import { setLoadingInstance } from '@/utils/loading'
import { TauriApiService } from '@/utils/tauri-api'

// 响应式数据
const isGlobalLoading = ref(false)
const toastRef = ref(null)
const loadingRef = ref(null)
const router = useRouter()
const userStore = useUserStore()

// Tauri 环境检测
const isTauriApp = window.__TAURI__ !== undefined

/**
 * 应用初始化
 */
const initApp = async () => {
  console.log('🚀 Tauri 邀请拉新桌面应用初始化')
  
  // 初始化用户数据
  userStore.initUserData()
  
  // 初始化 Toast 实例
  if (toastRef.value) {
    setToastInstance(toastRef.value)
  }
  
  // 初始化 Loading 实例
  if (loadingRef.value) {
    setLoadingInstance(loadingRef.value)
  }
  
  // 设置页面标题
  document.title = '邀请拉新助手 - 桌面版'
  
  // Tauri 特定初始化
  if (isTauriApp) {
    await initTauriFeatures()
  } else {
    console.log('🌐 Web 开发模式运行中')
  }
  
  // 桌面版优化设置
  setupDesktopOptimization()
}

/**
 * 初始化 Tauri 特性
 */
const initTauriFeatures = async () => {
  try {
    // 获取系统信息
    const systemInfo = await TauriApiService.getSystemInfo()
    console.log('系统信息:', systemInfo.data)
    
    // 设置系统托盘通知
    await TauriApiService.sendNotification(
      '邀请拉新助手',
      '应用已启动，可以开始使用了！'
    )
    
    // 监听系统事件
    setupTauriEventListeners()
    
  } catch (error) {
    console.error('Tauri 初始化失败:', error)
  }
}

/**
 * 设置 Tauri 事件监听器
 */
const setupTauriEventListeners = async () => {
  if (!isTauriApp) return
  
  try {
    const { listen } = await import('@tauri-apps/api/event')
    const { appWindow } = await import('@tauri-apps/api/window')
    
    // 监听窗口关闭事件
    const unlistenClose = await listen('tauri://close-requested', () => {
      console.log('应用即将关闭')
    })
    
    // 监听导航事件（来自系统托盘）
    const unlistenNavigate = await listen('navigate-to', (event) => {
      const path = event.payload
      router.push(path)
    })
    
    // 监听复制邀请链接事件（来自系统托盘）
    const unlistenCopyLink = await listen('copy-invite-link', async () => {
      // 触发复制邀请链接功能
      const inviteStore = useInviteStore()
      if (inviteStore.inviteLink) {
        await TauriApiService.copyInviteLink(inviteStore.inviteLink)
      }
    })
    
    // 窗口聚焦时刷新数据
    const unlistenFocus = await appWindow.onFocusChanged(({ payload: focused }) => {
      if (focused) {
        console.log('窗口获得焦点，刷新数据')
        // 可以在这里触发数据刷新
      }
    })
    
    // 保存取消监听函数
    window.tauriUnlisteners = [
      unlistenClose,
      unlistenNavigate,
      unlistenCopyLink,
      unlistenFocus
    ]
    
  } catch (error) {
    console.error('设置 Tauri 事件监听失败:', error)
  }
}

/**
 * 桌面版优化设置
 */
const setupDesktopOptimization = () => {
  // 桌面版允许文本选择
  document.addEventListener('selectstart', (e) => {
    // 桌面版不需要禁止文本选择
  })
  
  // 桌面版允许右键菜单（在某些情况下）
  document.addEventListener('contextmenu', (e) => {
    // 可以根据需要决定是否允许右键菜单
    if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') {
      // 输入框允许右键菜单
      return
    }
    e.preventDefault()
  })
  
  // 添加桌面版特定的 CSS 类
  document.body.classList.add('desktop-app')
  
  // 键盘快捷键支持
  setupKeyboardShortcuts()
}

/**
 * 设置键盘快捷键
 */
const setupKeyboardShortcuts = () => {
  document.addEventListener('keydown', (e) => {
    // Ctrl+R 刷新数据
    if (e.ctrlKey && e.key === 'r') {
      e.preventDefault()
      location.reload()
    }
    
    // Ctrl+N 新建邀请
    if (e.ctrlKey && e.key === 'n') {
      e.preventDefault()
      router.push('/invite')
    }
    
    // Ctrl+H 返回首页
    if (e.ctrlKey && e.key === 'h') {
      e.preventDefault()
      router.push('/')
    }
    
    // F5 刷新
    if (e.key === 'F5') {
      e.preventDefault()
      location.reload()
    }
  })
}

/**
 * 监听路由变化
 */
router.beforeEach((to, from, next) => {
  isGlobalLoading.value = true
  next()
})

router.afterEach(() => {
  isGlobalLoading.value = false
})

// 生命周期
onMounted(() => {
  initApp()
})

onUnmounted(() => {
  // 清理 Tauri 事件监听器
  if (window.tauriUnlisteners) {
    window.tauriUnlisteners.forEach(unlisten => {
      if (typeof unlisten === 'function') {
        unlisten()
      }
    })
  }
})
</script>

<template>
  <div id="app" class="app-container">
    <!-- 桌面版标题栏（可选） -->
    <div v-if="isTauriApp" class="app-titlebar">
      <div class="titlebar-content">
        <div class="app-logo">🎁</div>
        <div class="app-title">邀请拉新助手</div>
      </div>
    </div>
    
    <!-- 路由视图 -->
    <div class="main-content">
      <router-view v-slot="{ Component }">
        <transition name="fade" mode="out-in">
          <keep-alive>
            <component :is="Component" />
          </keep-alive>
        </transition>
      </router-view>
    </div>
    
    <!-- 全局加载提示 -->
    <div v-if="isGlobalLoading" class="global-loading">
      <div class="loading-spinner">⏳</div>
      <div class="loading-text">加载中...</div>
    </div>
    
    <!-- Toast 消息提示 -->
    <Toast ref="toastRef" />
    
    <!-- 全局 Loading -->
    <GlobalLoading ref="loadingRef" />
    
    <!-- 桌面版状态栏（可选） -->
    <div v-if="isTauriApp" class="app-statusbar">
      <div class="status-info">
        <span class="status-text">就绪</span>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
@use "@/assets/styles/variables.scss" as *;
@use "@/assets/styles/mixins.scss" as *;

// 全局样式重置
#app {
  font-family: $font-family-base;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: $text-color-primary;
  background-color: $background-color-light;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.app-container {
  position: relative;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

// 桌面版标题栏
.app-titlebar {
  height: 40px;
  background: linear-gradient(135deg, $primary-color, $primary-light);
  color: white;
  display: flex;
  align-items: center;
  padding: 0 $spacing-base;
  flex-shrink: 0;
  user-select: none;
  -webkit-app-region: drag; // 允许拖拽窗口
  
  .titlebar-content {
    display: flex;
    align-items: center;
    gap: $spacing-sm;
    
    .app-logo {
      font-size: $font-size-lg;
    }
    
    .app-title {
      font-size: $font-size-base;
      font-weight: $font-weight-medium;
    }
  }
}

// 主内容区域
.main-content {
  flex: 1;
  overflow: auto;
  background-color: $background-color-light;
}

// 桌面版状态栏
.app-statusbar {
  height: 24px;
  background-color: $background-color;
  border-top: 1px solid $border-color-light;
  display: flex;
  align-items: center;
  padding: 0 $spacing-base;
  flex-shrink: 0;
  
  .status-info {
    display: flex;
    align-items: center;
    gap: $spacing-sm;
    
    .status-text {
      font-size: $font-size-xs;
      color: $text-color-secondary;
    }
  }
}

// 路由过渡动画
.fade-enter-active,
.fade-leave-active {
  transition: opacity $animation-duration-base ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

// 全局加载提示
.global-loading {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(255, 255, 255, 0.9);
  @include center;
  z-index: $z-index-modal + 10;
  
  .loading-spinner {
    font-size: 24px;
    animation: spin 1s linear infinite;
    margin-bottom: $spacing-sm;
  }
  
  .loading-text {
    font-size: $font-size-base;
    color: $text-color-secondary;
  }
}

@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

// 桌面版特定样式
.desktop-app {
  .app-container {
    // 桌面版特定的滚动行为
    overflow: hidden;
    
    .main-content {
      overflow-y: auto;
      overflow-x: hidden;
    }
  }
  
  // 桌面版允许文本选择
  * {
    -webkit-user-select: text;
    user-select: text;
  }
  
  // 按钮等交互元素不允许选择
  button,
  .btn,
  .clickable {
    -webkit-user-select: none;
    user-select: none;
  }
}

// 桌面版滚动条样式优化
.desktop-app ::-webkit-scrollbar {
  width: 8px;
  height: 8px;
}

.desktop-app ::-webkit-scrollbar-track {
  background: $background-color-light;
  border-radius: 4px;
}

.desktop-app ::-webkit-scrollbar-thumb {
  background: $border-color;
  border-radius: 4px;
  
  &:hover {
    background: #c0c0c0;
  }
  
  &:active {
    background: #a0a0a0;
  }
}

// 响应式适配 - 桌面版
@media (min-width: 768px) {
  .app-container {
    .main-content {
      // 桌面版可以有最大宽度限制
      max-width: none;
    }
  }
}

@media (min-width: 1200px) {
  .main-content {
    // 大屏幕下的优化
    padding: 0 $spacing-base;
  }
}

// 打印样式
@media print {
  .app-titlebar,
  .app-statusbar,
  .global-loading {
    display: none !important;
  }
  
  .main-content {
    height: auto !important;
    overflow: visible !important;
  }
}
</style>