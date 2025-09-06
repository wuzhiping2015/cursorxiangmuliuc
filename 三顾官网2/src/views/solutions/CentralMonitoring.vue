<template>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
    <div class="max-w-3xl mx-auto">
      <h1 class="text-3xl font-bold text-primary mb-6">Central Monitoring System</h1>
      
      <div class="w-full h-64 bg-gray-300 rounded-lg flex items-center justify-center mb-6">
        <span class="text-gray-600 text-xl">Central Monitoring System 图片</span>
      </div>

      <section class="mb-12">
        <h2 class="text-2xl font-semibold text-gray-900 mb-4">系统概述</h2>
        <p class="text-lg text-gray-700 leading-relaxed mb-6">
          中央监控系统是一套全面的船舶实时监控管理平台，集成全船数据，提供统一监控界面，帮助船员和陆地支持团队实时了解船舶状态，确保安全高效运行。
        </p>
        <div class="w-full h-64 bg-gray-300 rounded-lg flex items-center justify-center mb-6">
          <span class="text-gray-600 text-xl">Central Monitoring System 详情图片</span>
        </div>
      </section>

      <section class="mb-12">
        <h2 class="text-2xl font-semibold text-gray-900 mb-4">主要功能</h2>
        <ul class="space-y-4">
          <li class="flex items-start">
            <svg class="h-6 w-6 text-primary mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
            </svg>
            <span class="text-gray-700">统一监控仪表盘</span>
          </li>
          <li class="flex items-start">
            <svg class="h-6 w-6 text-primary mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
            </svg>
            <span class="text-gray-700">多级预警告警系统</span>
          </li>
          <li class="flex items-start">
            <svg class="h-6 w-6 text-primary mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
            </svg>
            <span class="text-gray-700">船岸实时数据同步</span>
          </li>
          <li class="flex items-start">
            <svg class="h-6 w-6 text-primary mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
            </svg>
            <span class="text-gray-700">历史数据分析与趋势报告</span>
          </li>
        </ul>
      </section>

      <section class="mb-12">
        <h2 class="text-2xl font-semibold text-gray-900 mb-4">监控模块</h2>
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div class="bg-white overflow-hidden shadow-lg rounded-lg">
            <div class="p-6">
              <div class="flex items-center justify-center h-12 w-12 rounded-md bg-primary text-white mb-4">
                <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 class="text-lg font-medium text-gray-900 mb-2">动力系统监控</h3>
              <p class="text-sm text-gray-500">
                实时监控主机、发电机组、辅机等动力系统的运行状态、效率和健康状况。
              </p>
            </div>
          </div>
          
          <div class="bg-white overflow-hidden shadow-lg rounded-lg">
            <div class="p-6">
              <div class="flex items-center justify-center h-12 w-12 rounded-md bg-primary text-white mb-4">
                <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
                </svg>
              </div>
              <h3 class="text-lg font-medium text-gray-900 mb-2">环境系统监控</h3>
              <p class="text-sm text-gray-500">
                监控船舶内部环境、外部气象条件、舱室状态，确保船舶安全运行。
              </p>
            </div>
          </div>
          
          <div class="bg-white overflow-hidden shadow-lg rounded-lg">
            <div class="p-6">
              <div class="flex items-center justify-center h-12 w-12 rounded-md bg-primary text-white mb-4">
                <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <h3 class="text-lg font-medium text-gray-900 mb-2">性能指标监控</h3>
              <p class="text-sm text-gray-500">
                追踪关键性能指标(KPI)，包括燃油消耗、排放、设备效率等，提供优化建议。
              </p>
            </div>
          </div>
          
          <div class="bg-white overflow-hidden shadow-lg rounded-lg">
            <div class="p-6">
              <div class="flex items-center justify-center h-12 w-12 rounded-md bg-primary text-white mb-4">
                <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
              </div>
              <h3 class="text-lg font-medium text-gray-900 mb-2">告警管理</h3>
              <p class="text-sm text-gray-500">
                多级告警系统，支持优先级分级、告警过滤、智能预警，确保关键信息及时传达。
              </p>
            </div>
          </div>
        </div>
      </section>

      <section class="mb-12">
        <h2 class="text-2xl font-semibold text-gray-900 mb-4">系统架构</h2>
        <div class="bg-white shadow overflow-hidden sm:rounded-lg">
          <div class="px-4 py-5 sm:p-6">
            <h3 class="text-lg font-medium text-gray-900 mb-4">三层分布式架构</h3>
            <div class="grid grid-cols-1 gap-6">
              <div class="border border-gray-200 rounded-lg p-4">
                <div class="font-medium text-primary mb-2">数据采集层</div>
                <p class="text-sm text-gray-600">
                  分布式传感器网络实时采集船舶各系统数据，通过边缘计算进行初步处理，确保数据完整性。
                </p>
              </div>
              <div class="border border-gray-200 rounded-lg p-4">
                <div class="font-medium text-primary mb-2">数据处理层</div>
                <p class="text-sm text-gray-600">
                  中央处理单元对数据进行深度分析、关联处理、趋势识别，转化为可用信息。
                </p>
              </div>
              <div class="border border-gray-200 rounded-lg p-4">
                <div class="font-medium text-primary mb-2">信息展示层</div>
                <p class="text-sm text-gray-600">
                  多终端可视化平台，支持PC、移动设备、大屏展示，提供直观、可操作的信息界面。
                </p>
              </div>
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
                <dt class="text-sm font-medium text-gray-500">数据刷新率</dt>
                <dd class="mt-1 text-sm text-gray-900">最快100ms/次</dd>
              </div>
              <div class="sm:col-span-1">
                <dt class="text-sm font-medium text-gray-500">监控点数量</dt>
                <dd class="mt-1 text-sm text-gray-900">最多10,000点/船</dd>
              </div>
              <div class="sm:col-span-1">
                <dt class="text-sm font-medium text-gray-500">数据存储周期</dt>
                <dd class="mt-1 text-sm text-gray-900">实时数据30天，汇总数据5年</dd>
              </div>
              <div class="sm:col-span-1">
                <dt class="text-sm font-medium text-gray-500">支持终端</dt>
                <dd class="mt-1 text-sm text-gray-900">船舶工作站、Web、iOS/Android</dd>
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
          申请系统演示
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