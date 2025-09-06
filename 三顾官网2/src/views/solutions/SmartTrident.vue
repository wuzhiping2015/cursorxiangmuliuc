<template>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
    <div class="max-w-3xl mx-auto">
      <h1 class="text-3xl font-bold text-primary mb-6">Smart Trident System</h1>
      
      <div class="w-full h-64 bg-gray-300 rounded-lg flex items-center justify-center mb-6">
        <span class="text-gray-600 text-xl">Smart Trident System 图片</span>
      </div>

      <section class="mb-12">
        <h2 class="text-2xl font-semibold text-gray-900 mb-4">系统概述</h2>
        <p class="text-lg text-gray-700 leading-relaxed mb-6">
          智能三叉戟系统使用先进的AI算法跟踪和评估船舶的整体生命周期健康状态，为您提供全面的信息服务和智能决策支持。
        </p>
        <div class="w-full h-64 bg-gray-300 rounded-lg flex items-center justify-center mb-6">
          <span class="text-gray-600 text-xl">Smart Trident System 详情图片</span>
        </div>
      </section>

      <section class="mb-12">
        <h2 class="text-2xl font-semibold text-gray-900 mb-4">主要功能</h2>
        <ul class="space-y-4">
          <li class="flex items-start">
            <svg class="h-6 w-6 text-primary mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
            </svg>
            <span class="text-gray-700">AI驱动的健康状态评估</span>
          </li>
          <li class="flex items-start">
            <svg class="h-6 w-6 text-primary mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
            </svg>
            <span class="text-gray-700">预测性维护与故障预警</span>
          </li>
          <li class="flex items-start">
            <svg class="h-6 w-6 text-primary mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
            </svg>
            <span class="text-gray-700">智能性能优化建议</span>
          </li>
          <li class="flex items-start">
            <svg class="h-6 w-6 text-primary mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
            </svg>
            <span class="text-gray-700">自适应学习与持续进化</span>
          </li>
        </ul>
      </section>

      <section class="mb-12">
        <h2 class="text-2xl font-semibold text-gray-900 mb-4">AI能力</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div class="bg-white shadow overflow-hidden rounded-lg">
            <div class="px-4 py-5 sm:p-6">
              <h3 class="text-lg font-medium text-primary mb-3">异常检测</h3>
              <p class="text-sm text-gray-700">
                实时监测运行数据，自动识别异常模式，提前预警潜在故障。
              </p>
            </div>
          </div>
          <div class="bg-white shadow overflow-hidden rounded-lg">
            <div class="px-4 py-5 sm:p-6">
              <h3 class="text-lg font-medium text-primary mb-3">寿命预测</h3>
              <p class="text-sm text-gray-700">
                基于历史数据和使用模式，精确预测设备剩余使用寿命。
              </p>
            </div>
          </div>
          <div class="bg-white shadow overflow-hidden rounded-lg">
            <div class="px-4 py-5 sm:p-6">
              <h3 class="text-lg font-medium text-primary mb-3">能耗优化</h3>
              <p class="text-sm text-gray-700">
                智能分析能源消耗模式，提供节能优化建议。
              </p>
            </div>
          </div>
          <div class="bg-white shadow overflow-hidden rounded-lg">
            <div class="px-4 py-5 sm:p-6">
              <h3 class="text-lg font-medium text-primary mb-3">自动决策</h3>
              <p class="text-sm text-gray-700">
                依据多维度数据分析，提供智能化运营决策支持。
              </p>
            </div>
          </div>
        </div>
      </section>

      <section class="mb-12">
        <h2 class="text-2xl font-semibold text-gray-900 mb-4">技术规格</h2>
        <div class="bg-white shadow overflow-hidden sm:rounded-lg">
          <div class="px-4 py-5 sm:p-6">
            <dl class="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2">
              <div class="sm:col-span-1">
                <dt class="text-sm font-medium text-gray-500">AI算法</dt>
                <dd class="mt-1 text-sm text-gray-900">深度学习、强化学习</dd>
              </div>
              <div class="sm:col-span-1">
                <dt class="text-sm font-medium text-gray-500">预测准确率</dt>
                <dd class="mt-1 text-sm text-gray-900">≥95%</dd>
              </div>
              <div class="sm:col-span-1">
                <dt class="text-sm font-medium text-gray-500">模型更新频率</dt>
                <dd class="mt-1 text-sm text-gray-900">每24小时自动优化</dd>
              </div>
              <div class="sm:col-span-1">
                <dt class="text-sm font-medium text-gray-500">兼容性</dt>
                <dd class="mt-1 text-sm text-gray-900">支持多种品牌船舶设备</dd>
              </div>
            </dl>
          </div>
        </div>
      </section>

      <div class="mt-8 flex justify-center">
        <router-link
          to="/contact/form"
          class="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
        >
          申请演示
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
// 组件逻辑
</script>

<style scoped>
/* 组件样式 */
</style> 