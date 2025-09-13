<template>
  <div class="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
    <!-- 导航栏 -->
    <AppHeader />
    
    <!-- 主要内容区域 -->
    <main class="flex-1 pt-16">
      <!-- 页面内容插槽 -->
      <slot />
    </main>
    
    <!-- 页脚 -->
    <AppFooter />
  </div>
</template>

<script setup lang="ts">
/**
 * 默认布局组件
 * 包含导航栏、主内容区域和页脚
 */

// 引入布局组件
// 这些组件将在 components/layout/ 目录中定义
</script>

<style scoped>
/**
 * 布局特定样式
 */

/* 确保主内容区域占满剩余空间 */
main {
  min-height: calc(100vh - 64px - 200px); /* 视口高度 - 导航栏高度 - 页脚高度 */
}

/* 平滑滚动 */
html {
  scroll-behavior: smooth;
}

/* 为固定导航栏预留空间 */
main {
  scroll-margin-top: 64px;
}
</style>
