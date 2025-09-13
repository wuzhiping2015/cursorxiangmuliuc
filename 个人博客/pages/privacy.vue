<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-900">
    <!-- Header -->
    <section class="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 py-12">
      <div class="container mx-auto px-4">
        <div class="max-w-4xl mx-auto">
          <h1 class="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            隐私政策
          </h1>
          <p class="text-lg text-gray-600 dark:text-gray-300">
            最后更新时间：2024年1月1日
          </p>
        </div>
      </div>
    </section>

    <!-- Content -->
    <section class="py-12">
      <div class="container mx-auto px-4">
        <div class="max-w-4xl mx-auto">
          <div class="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-sm">
            <div class="prose prose-lg dark:prose-invert max-w-none">
              <h2>隐私保护承诺</h2>
              <p>
                AI Frontend Engineer 博客（以下简称"本站"）非常重视用户隐私保护。
                本隐私政策说明了我们如何收集、使用、存储和保护您的个人信息。
              </p>

              <h2>信息收集</h2>
              <h3>自动收集的信息</h3>
              <ul>
                <li>访问日志（IP地址、浏览器类型、访问时间等）</li>
                <li>使用 Google Analytics 收集的匿名统计数据</li>
                <li>Cookies 和类似技术收集的信息</li>
              </ul>

              <h3>主动提供的信息</h3>
              <ul>
                <li>通过评论系统提供的信息</li>
                <li>通过联系表单提供的信息</li>
                <li>订阅邮件列表时提供的邮箱地址</li>
              </ul>

              <h2>信息使用</h2>
              <p>我们收集和使用您的信息用于以下目的：</p>
              <ul>
                <li>提供和改进网站服务</li>
                <li>分析网站使用情况</li>
                <li>回应您的询问和请求</li>
                <li>发送技术更新和相关信息（如果您订阅了我们的服务）</li>
              </ul>

              <h2>信息共享</h2>
              <p>
                我们不会向第三方出售、交易或转让您的个人信息，除非：
              </p>
              <ul>
                <li>获得您的明确同意</li>
                <li>法律要求或法律程序需要</li>
                <li>保护我们的权利、财产或安全</li>
              </ul>

              <h2>Cookies 使用</h2>
              <p>
                本站使用 Cookies 来改善用户体验。您可以通过浏览器设置管理 Cookies，
                但禁用 Cookies 可能影响网站的某些功能。
              </p>

              <h2>第三方服务</h2>
              <p>本站使用以下第三方服务：</p>
              <ul>
                <li><strong>Google Analytics</strong>：用于网站分析</li>
                <li><strong>Cloudflare</strong>：用于内容分发和安全</li>
                <li><strong>GitHub</strong>：用于代码托管和评论系统</li>
              </ul>
              <p>这些服务有各自的隐私政策，我们建议您查阅相关政策。</p>

              <h2>数据安全</h2>
              <p>
                我们采取适当的技术和组织措施来保护您的个人信息，
                包括但不限于加密传输、访问控制和定期安全审查。
              </p>

              <h2>您的权利</h2>
              <p>根据适用的隐私法律，您有权：</p>
              <ul>
                <li>访问我们持有的关于您的个人信息</li>
                <li>要求更正不准确的信息</li>
                <li>要求删除您的个人信息</li>
                <li>反对或限制信息处理</li>
              </ul>

              <h2>未成年人隐私</h2>
              <p>
                本站不会故意收集13岁以下儿童的个人信息。
                如果我们发现收集了此类信息，将尽快删除。
              </p>

              <h2>政策更新</h2>
              <p>
                我们可能会不时更新本隐私政策。重大变更将在网站上公布，
                并通过适当方式通知用户。
              </p>

              <h2>联系我们</h2>
              <p>
                如果您对本隐私政策有任何疑问或建议，请通过以下方式联系我们：
              </p>
              <ul>
                <li>邮箱：privacy@ai-frontend-engineer.com</li>
                <li>GitHub Issues：在我们的仓库中提交问题</li>
              </ul>
            </div>
          </div>

          <div class="mt-8 text-center">
            <Button 
              label="返回首页" 
              icon="pi pi-home"
              @click="$router.push('/')"
              class="mr-4"
            />
            <Button 
              label="服务条款" 
              icon="pi pi-file-text"
              severity="secondary"
              @click="$router.push('/terms')"
            />
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
/**
 * 隐私政策页面
 */

// 页面元数据
useHead({
  title: '隐私政策 - AI Frontend Engineer',
  meta: [
    { name: 'description', content: 'AI Frontend Engineer 博客的隐私政策，了解我们如何收集、使用和保护您的个人信息。' },
    { name: 'robots', content: 'noindex, nofollow' }
  ]
})
</script>

<style scoped>
/**
 * 隐私政策页面样式
 */
.prose h2 {
  @apply text-2xl font-bold text-gray-900 dark:text-white mt-8 mb-4;
}

.prose h3 {
  @apply text-xl font-semibold text-gray-800 dark:text-gray-200 mt-6 mb-3;
}

.prose ul {
  @apply list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300;
}

.prose p {
  @apply text-gray-700 dark:text-gray-300 mb-4 leading-relaxed;
}
</style>