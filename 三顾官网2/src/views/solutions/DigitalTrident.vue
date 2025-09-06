<template>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
    <div class="max-w-3xl mx-auto">
      <h1 class="text-3xl font-bold text-primary mb-6">Digital Trident System</h1>
      
      <div class="w-full h-64 bg-gray-300 rounded-lg flex items-center justify-center mb-6">
        <span class="text-gray-600 text-xl">Digital Trident System 图片</span>
      </div>

      <section class="mb-12">
        <h2 class="text-2xl font-semibold text-gray-900 mb-4">系统概述</h2>
        <p class="text-lg text-gray-700 leading-relaxed mb-6">
          数字三叉戟系统提供全面的船舶数据采集、存储、同步和基于KPI的数据分析能力，同时确保网络安全。
        </p>
        <div class="w-full h-64 bg-gray-300 rounded-lg flex items-center justify-center mb-6">
          <span class="text-gray-600 text-xl">Digital Trident System 详情图片</span>
        </div>
      </section>

      <section class="mb-12">
        <h2 class="text-2xl font-semibold text-gray-900 mb-4">主要功能</h2>
        <ul class="space-y-4">
          <li class="flex items-start">
            <svg class="h-6 w-6 text-primary mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
            </svg>
            <span class="text-gray-700">实时数据采集与监控</span>
          </li>
          <li class="flex items-start">
            <svg class="h-6 w-6 text-primary mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
            </svg>
            <span class="text-gray-700">高级数据分析与可视化</span>
          </li>
          <li class="flex items-start">
            <svg class="h-6 w-6 text-primary mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
            </svg>
            <span class="text-gray-700">安全的数据存储与传输</span>
          </li>
          <li class="flex items-start">
            <svg class="h-6 w-6 text-primary mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
            </svg>
            <span class="text-gray-700">全周期船舶健康状态追踪</span>
          </li>
        </ul>
      </section>

      <section class="mb-12">
        <h2 class="text-2xl font-semibold text-gray-900 mb-4">技术规格</h2>
        <div class="bg-white shadow overflow-hidden sm:rounded-lg">
          <div class="px-4 py-5 sm:p-6">
            <dl class="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2">
              <div class="sm:col-span-1">
                <dt class="text-sm font-medium text-gray-500">数据采集率</dt>
                <dd class="mt-1 text-sm text-gray-900">最高每秒1000个样本</dd>
              </div>
              <div class="sm:col-span-1">
                <dt class="text-sm font-medium text-gray-500">存储容量</dt>
                <dd class="mt-1 text-sm text-gray-900">无限（基于云）</dd>
              </div>
              <div class="sm:col-span-1">
                <dt class="text-sm font-medium text-gray-500">安全协议</dt>
                <dd class="mt-1 text-sm text-gray-900">AES-256加密</dd>
              </div>
              <div class="sm:col-span-1">
                <dt class="text-sm font-medium text-gray-500">系统兼容性</dt>
                <dd class="mt-1 text-sm text-gray-900">所有主要船舶系统</dd>
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