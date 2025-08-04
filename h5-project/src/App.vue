<script setup>
/**
 * 根组件
 * 应用程序的主要容器和全局状态管理
 * @author 前端工程师团队
 * @date 2024-12-XX
 */
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/stores/user'
import Toast from '@/components/common/Toast.vue'
import GlobalLoading from '@/components/common/GlobalLoading.vue'
import { setToastInstance } from '@/utils/toast'
import { setLoadingInstance } from '@/utils/loading'

// 响应式数据
const isGlobalLoading = ref(false)
const toastRef = ref(null)
const loadingRef = ref(null)
const router = useRouter()
const userStore = useUserStore()

/**
 * 应用初始化
 */
const initApp = () => {
  console.log('🎉 拉新邀请H5应用初始化')
  
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
  document.title = '拉新邀请 - 邀请好友共享收益'
  
  // 添加页面描述
  const metaDescription = document.querySelector('meta[name="description"]')
  if (metaDescription) {
    metaDescription.setAttribute('content', '邀请好友注册，获得丰厚奖励！分享越多，收益越高。立即开始你的赚钱之旅！')
  }
  
  // 移动端适配
  setupMobileOptimization()
}

/**
 * 移动端优化设置
 */
const setupMobileOptimization = () => {
  // 禁止选择文本
  document.addEventListener('selectstart', (e) => {
    if (e.target.tagName !== 'INPUT' && e.target.tagName !== 'TEXTAREA') {
      e.preventDefault()
    }
  })
  
  // 禁止长按弹出菜单
  document.addEventListener('contextmenu', (e) => {
    e.preventDefault()
  })
  
  // 检测设备类型
  const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
  if (isMobile) {
    document.body.classList.add('mobile-device')
  }
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
</script>

<template>
  <div id="app" class="app-container">
    <!-- 路由视图 -->
    <router-view v-slot="{ Component }">
      <transition name="fade" mode="out-in">
        <keep-alive>
          <component :is="Component" />
        </keep-alive>
      </transition>
    </router-view>
    
    <!-- 全局加载提示 -->
    <div v-if="isGlobalLoading" class="global-loading">
      <div class="loading-spinner">⏳</div>
      <div class="loading-text">加载中...</div>
    </div>
    
    <!-- Toast 消息提示 -->
    <Toast ref="toastRef" />
    
    <!-- 全局 Loading -->
    <GlobalLoading ref="loadingRef" />
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
}

.app-container {
  position: relative;
  min-height: 100vh;
  overflow-x: hidden;
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

// 移动端特定样式
.mobile-device {
  .app-container {
    -webkit-overflow-scrolling: touch;
  }
  
  // 优化触摸反馈
  * {
    -webkit-tap-highlight-color: transparent;
    -webkit-touch-callout: none;
    -webkit-user-select: none;
    user-select: none;
  }
  
  // 允许输入框选择
  input,
  textarea {
    -webkit-user-select: text;
    user-select: text;
  }
}

// 滚动条样式
::-webkit-scrollbar {
  width: 6px;
  height: 6px;
}

::-webkit-scrollbar-track {
  background: $background-color-light;
}

::-webkit-scrollbar-thumb {
  background: $border-color;
  border-radius: 3px;
  
  &:hover {
    background: #d0d0d0;
  }
}

// 响应式断点
@include respond-to(xs) {
  .app-container {
    font-size: $font-size-sm;
  }
}

@include respond-to(lg) {
  .app-container {
    max-width: 500px;
    margin: 0 auto;
    box-shadow: $box-shadow-lg;
  }
}
</style>
