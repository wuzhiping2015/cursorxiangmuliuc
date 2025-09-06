<template>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
    <div class="max-w-3xl mx-auto">
      <h1 class="text-4xl font-bold text-gray-900 mb-8">Digital Twin</h1>
      
      <section class="mb-12">
        <h2 class="text-2xl font-semibold text-gray-900 mb-4">技术概述</h2>
        <p class="text-lg text-gray-700 leading-relaxed mb-6">
          数字孪生技术是通过创建船舶和设备的虚拟副本，实现物理世界与数字世界的实时映射和交互。我们的数字孪生平台提供数据驱动的仿真模型，为船舶运营提供可视化监控、预测性维护和优化决策支持。
        </p>
        <div class="w-full h-64 bg-gray-300 rounded-lg flex items-center justify-center mb-6">
          <span class="text-gray-600 text-xl">Digital Twin技术图片</span>
        </div>
      </section>

      <section class="mb-12">
        <h2 class="text-2xl font-semibold text-gray-900 mb-4">核心优势</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div class="bg-white rounded-lg shadow p-6">
            <div class="flex items-center mb-4">
              <div class="flex-shrink-0 h-12 w-12 bg-primary rounded-md flex items-center justify-center">
                <svg class="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
              </div>
              <h3 class="ml-4 text-lg font-medium text-gray-900">全面可视化</h3>
            </div>
            <p class="text-gray-600">
              提供船舶和设备的3D虚拟模型，实现从整船到零部件的多层次可视化监控，直观展示设备状态和运行参数。
            </p>
          </div>
          
          <div class="bg-white rounded-lg shadow p-6">
            <div class="flex items-center mb-4">
              <div class="flex-shrink-0 h-12 w-12 bg-primary rounded-md flex items-center justify-center">
                <svg class="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <h3 class="ml-4 text-lg font-medium text-gray-900">模拟与预测</h3>
            </div>
            <p class="text-gray-600">
              基于历史数据和物理模型，模拟设备在不同工况下的表现，预测潜在故障和性能变化，提前采取干预措施。
            </p>
          </div>
          
          <div class="bg-white rounded-lg shadow p-6">
            <div class="flex items-center mb-4">
              <div class="flex-shrink-0 h-12 w-12 bg-primary rounded-md flex items-center justify-center">
                <svg class="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </svg>
              </div>
              <h3 class="ml-4 text-lg font-medium text-gray-900">性能优化</h3>
            </div>
            <p class="text-gray-600">
              通过数字孪生模型测试不同的操作策略和配置，找到最优的运行参数，提高能效，降低运营成本。
            </p>
          </div>
          
          <div class="bg-white rounded-lg shadow p-6">
            <div class="flex items-center mb-4">
              <div class="flex-shrink-0 h-12 w-12 bg-primary rounded-md flex items-center justify-center">
                <svg class="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
              </div>
              <h3 class="ml-4 text-lg font-medium text-gray-900">远程诊断</h3>
            </div>
            <p class="text-gray-600">
              通过数字孪生远程访问船舶系统，实时诊断问题，提供远程技术支持，减少现场维修需求。
            </p>
          </div>
        </div>
      </section>

      <section class="mb-12">
        <h2 class="text-2xl font-semibold text-gray-900 mb-4">技术架构</h2>
        <div class="bg-white shadow overflow-hidden sm:rounded-lg">
          <div class="px-4 py-5 sm:p-6">
            <div class="relative py-10">
              <div class="absolute inset-0 flex items-center" aria-hidden="true">
                <div class="w-full border-t border-gray-300"></div>
              </div>
              <div class="relative flex justify-center">
                <span class="px-3 bg-white text-lg font-medium text-primary">数据流向</span>
              </div>
            </div>
            
            <div class="grid grid-cols-1 gap-6 mt-6">
              <div class="border border-gray-200 rounded-lg p-4 bg-gray-50">
                <h3 class="text-lg font-medium text-primary mb-3">1. 数据采集层</h3>
                <p class="text-sm text-gray-600">
                  通过传感器网络和IoT设备采集物理船舶各系统的实时数据，包括运行参数、环境数据和操作记录。
                </p>
              </div>
              
              <div class="flex justify-center my-2">
                <svg class="h-8 w-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                </svg>
              </div>
              
              <div class="border border-gray-200 rounded-lg p-4 bg-gray-50">
                <h3 class="text-lg font-medium text-primary mb-3">2. 模型构建层</h3>
                <p class="text-sm text-gray-600">
                  基于物理模型和机器学习算法，构建设备和系统的数字模型，实现物理世界到数字世界的精确映射。
                </p>
              </div>
              
              <div class="flex justify-center my-2">
                <svg class="h-8 w-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                </svg>
              </div>
              
              <div class="border border-gray-200 rounded-lg p-4 bg-gray-50">
                <h3 class="text-lg font-medium text-primary mb-3">3. 仿真分析层</h3>
                <p class="text-sm text-gray-600">
                  在数字模型上进行各类仿真和分析，包括预测性分析、故障诊断、性能优化和情景模拟。
                </p>
              </div>
              
              <div class="flex justify-center my-2">
                <svg class="h-8 w-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                </svg>
              </div>
              
              <div class="border border-gray-200 rounded-lg p-4 bg-gray-50">
                <h3 class="text-lg font-medium text-primary mb-3">4. 应用服务层</h3>
                <p class="text-sm text-gray-600">
                  将分析结果转化为可操作的信息，通过各类应用为用户提供决策支持、可视化监控和远程操作等服务。
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section class="mb-12">
        <h2 class="text-2xl font-semibold text-gray-900 mb-4">应用场景</h2>
        <div class="bg-white shadow sm:rounded-lg">
          <div class="px-4 py-5 sm:p-6">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div class="bg-gray-50 p-4 rounded-lg">
                <h3 class="text-lg font-medium text-primary mb-2">预测性维护</h3>
                <p class="text-sm text-gray-600">
                  通过数字孪生监测设备磨损和性能退化趋势，预测潜在故障，优化维护计划，减少计划外停机。
                </p>
              </div>
              
              <div class="bg-gray-50 p-4 rounded-lg">
                <h3 class="text-lg font-medium text-primary mb-2">船员培训</h3>
                <p class="text-sm text-gray-600">
                  利用数字孪生创建逼真的模拟环境，进行操作培训和应急演练，提高船员技能和应急反应能力。
                </p>
              </div>
              
              <div class="bg-gray-50 p-4 rounded-lg">
                <h3 class="text-lg font-medium text-primary mb-2">能效管理</h3>
                <p class="text-sm text-gray-600">
                  分析船舶能耗模式，优化航线和操作参数，降低燃料消耗，减少碳排放。
                </p>
              </div>
              
              <div class="bg-gray-50 p-4 rounded-lg">
                <h3 class="text-lg font-medium text-primary mb-2">远程协作</h3>
                <p class="text-sm text-gray-600">
                  借助数字孪生平台，使船岸团队能够实时协作，共同解决技术问题，提供远程支持。
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div class="mt-8 flex justify-center">
        <router-link
          to="/contact/form"
          class="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
        >
          了解更多
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