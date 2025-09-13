<template>
  <div class="cases-page">
    <div class="container mx-auto px-4 py-16">
      <div class="max-w-4xl mx-auto">
        <h1 class="text-4xl font-bold text-gray-900 dark:text-white mb-8">
          案例展示
        </h1>
        
        <div class="prose prose-lg dark:prose-invert max-w-none">
          <p class="text-gray-600 dark:text-gray-300">
            这里展示一些AI前端开发的实际案例和项目经验。
          </p>
          
          <h2>项目案例</h2>
          <p>我们将持续更新更多实际项目案例，展示AI在前端开发中的应用。</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
/**
 * 案例展示页面
 */

// 页面元数据
useHead({
  title: '案例展示 - AI前端开发实践',
  meta: [
    { name: 'description', content: 'AI前端开发实践案例展示和项目经验分享' }
  ]
})
</script>

<style scoped>
.cases-page {
  @apply min-h-screen bg-gray-50 dark:bg-gray-900;
}
</style>
