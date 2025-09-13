<template>
  <div class="terms-page">
    <div class="container mx-auto px-4 py-16">
      <div class="max-w-4xl mx-auto">
        <h1 class="text-4xl font-bold text-gray-900 dark:text-white mb-8">
          服务条款
        </h1>
        
        <div class="prose prose-lg dark:prose-invert max-w-none">
          <p class="text-gray-600 dark:text-gray-300">
            欢迎使用我们的服务。请仔细阅读以下条款。
          </p>
          
          <h2>1. 服务说明</h2>
          <p>本服务提供AI前端开发相关的技术内容和工具推荐。</p>
          
          <h2>2. 用户责任</h2>
          <p>用户应遵守相关法律法规，不得滥用服务。</p>
          
          <h2>3. 免责声明</h2>
          <p>我们不对用户使用本服务产生的任何损失承担责任。</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
/**
 * 服务条款页面
 */

// 页面元数据
useHead({
  title: '服务条款 - AI前端开发实践',
  meta: [
    { name: 'description', content: 'AI前端开发实践平台的服务条款和使用说明' }
  ]
})
</script>

<style scoped>
.terms-page {
  @apply min-h-screen bg-gray-50 dark:bg-gray-900;
}
</style>
