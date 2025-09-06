<template>
  <div class="min-h-screen flex flex-col bg-slate-50">
    <!-- 导航栏 -->
    <Navigation class="fixed top-0 left-0 right-0 z-50 bg-gradient-to-r from-blue-900 to-blue-800 shadow-lg" />
    
    <!-- 主要内容区 -->
    <main class="flex-grow mt-16 md:mt-20">
      <router-view v-slot="{ Component }">
        <transition name="fade" mode="out-in">
          <component :is="Component" />
        </transition>
      </router-view>
    </main>
    
    <!-- 页脚 -->
    <Footer class="bg-blue-900 text-white" />
  </div>
</template>

<script setup>
import Navigation from '@/components/Navigation.vue'
import Footer from '@/components/Footer.vue'
import { onMounted } from 'vue'

// 全局错误处理，捕获资源加载错误
onMounted(() => {
  window.addEventListener('error', (event) => {
    // 只处理资源加载错误
    if (event.target && (event.target.tagName === 'IMG' || event.target.tagName === 'SCRIPT' || event.target.tagName === 'LINK')) {
      console.warn('资源加载失败:', event.target.src || event.target.href)
      // 阻止错误冒泡
      event.stopPropagation()
      event.preventDefault()
    }
  }, true) // 使用捕获阶段
})
</script>

<style>
:root {
  --primary-dark: #1a365d;  /* 深蓝色 */
  --primary: #2563eb;      /* 亮蓝色 */
  --accent: #f97316;       /* 橙色 */
  --bg-light: #f8fafc;     /* 浅灰背景 */
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

body {
  font-family: 'Inter', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  background-color: var(--bg-light);
}

/* 自定义滚动条样式 */
::-webkit-scrollbar {
  width: 8px;
}

::-webkit-scrollbar-track {
  background: var(--bg-light);
}

::-webkit-scrollbar-thumb {
  background: #94a3b8;
  border-radius: 4px;
}

::-webkit-scrollbar-thumb:hover {
  background: #64748b;
}
</style> 