<template>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
    <div class="max-w-3xl mx-auto">
      <h1 class="text-4xl font-bold text-gray-900 mb-8">Our Products</h1>
      
      <section class="mb-12">
        <h2 class="text-2xl font-semibold text-gray-900 mb-4">产品系列</h2>
        <p class="text-lg text-gray-700 leading-relaxed mb-6">
          SANGO AI提供全面的船舶智能管理解决方案，满足不同客户的需求。
        </p>
      </section>

      <section class="mb-12">
        <h2 class="text-2xl font-semibold text-gray-900 mb-4">核心产品</h2>
        <div class="space-y-8">
          <!-- Digital Trident System -->
          <div class="bg-white rounded-lg shadow-lg overflow-hidden">
            <img class="w-full h-64 object-cover" :src="placeholderImage" alt="Digital Trident System" />
            <div class="p-6">
              <h3 class="text-xl font-semibold text-primary mb-3">Digital Trident System</h3>
              <p class="text-gray-700 mb-4">
                全船数据采集、存储、同步和基于KPI的数据分析，同时确保网络安全。
              </p>
              <router-link to="/solutions/digital-trident" class="text-secondary hover:text-secondary-dark font-medium inline-flex items-center">
                了解更多
                <svg class="w-4 h-4 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
                </svg>
              </router-link>
            </div>
          </div>
          
          <!-- Smart Trident System -->
          <div class="bg-white rounded-lg shadow-lg overflow-hidden">
            <img class="w-full h-64 object-cover" :src="placeholderImage" alt="Smart Trident System" />
            <div class="p-6">
              <h3 class="text-xl font-semibold text-primary mb-3">Smart Trident System</h3>
              <p class="text-gray-700 mb-4">
                使用AI算法跟踪和评估船舶的整体生命周期健康状态，并提供信息服务。
              </p>
              <router-link to="/solutions/smart-trident" class="text-secondary hover:text-secondary-dark font-medium inline-flex items-center">
                了解更多
                <svg class="w-4 h-4 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
                </svg>
              </router-link>
            </div>
          </div>
          
          <!-- Cyber Trident System -->
          <div class="bg-white rounded-lg shadow-lg overflow-hidden">
            <img class="w-full h-64 object-cover" :src="placeholderImage" alt="Cyber Trident System" />
            <div class="p-6">
              <h3 class="text-xl font-semibold text-primary mb-3">Cyber Trident System</h3>
              <p class="text-gray-700 mb-4">
                全面的船舶网络安全解决方案，保护关键系统免受网络威胁。
              </p>
              <router-link to="/solutions/cyber-trident" class="text-secondary hover:text-secondary-dark font-medium inline-flex items-center">
                了解更多
                <svg class="w-4 h-4 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
                </svg>
              </router-link>
            </div>
          </div>
          
          <!-- Central Monitoring System -->
          <div class="bg-white rounded-lg shadow-lg overflow-hidden">
            <img class="w-full h-64 object-cover" :src="placeholderImage" alt="Central Monitoring System" />
            <div class="p-6">
              <h3 class="text-xl font-semibold text-primary mb-3">Central Monitoring System</h3>
              <p class="text-gray-700 mb-4">
                集中式船舶监控系统，提供实时数据和警报，确保船舶安全运行。
              </p>
              <router-link to="/solutions/central-monitoring" class="text-secondary hover:text-secondary-dark font-medium inline-flex items-center">
                了解更多
                <svg class="w-4 h-4 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
                </svg>
              </router-link>
            </div>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>