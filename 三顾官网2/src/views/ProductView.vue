<template>
  <div class="product-view">
    <!-- 如果没有子路由，显示产品列表 -->
    <div v-if="!hasChild">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 class="text-4xl font-bold text-center text-gray-900 mb-12">我们的解决方案</h1>
        
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
          <!-- Digital Trident System -->
          <div class="bg-white overflow-hidden shadow-lg rounded-lg transition-all duration-300 hover:shadow-xl">
            <router-link to="/solutions/digital-trident">
              <img class="h-64 w-full object-cover" :src="placeholderImage" alt="Digital Trident System" />
              <div class="p-6">
                <h3 class="text-2xl font-semibold text-gray-900 mb-2">Digital Trident System</h3>
                <p class="text-gray-700">全船数据采集、存储、同步和基于KPI的数据分析，同时确保网络安全。</p>
                <div class="mt-4 flex items-center text-primary">
                  <span>了解更多</span>
                  <svg class="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </div>
              </div>
            </router-link>
          </div>
          
          <!-- Smart Trident System -->
          <div class="bg-white overflow-hidden shadow-lg rounded-lg transition-all duration-300 hover:shadow-xl">
            <router-link to="/solutions/smart-trident">
              <img class="h-64 w-full object-cover" :src="placeholderImage" alt="Smart Trident System" />
              <div class="p-6">
                <h3 class="text-2xl font-semibold text-gray-900 mb-2">Smart Trident System</h3>
                <p class="text-gray-700">使用AI算法跟踪和评估船舶的整体生命周期健康状态，并提供信息服务。</p>
                <div class="mt-4 flex items-center text-primary">
                  <span>了解更多</span>
                  <svg class="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </div>
              </div>
            </router-link>
          </div>
          
          <!-- Cyber Trident System -->
          <div class="bg-white overflow-hidden shadow-lg rounded-lg transition-all duration-300 hover:shadow-xl">
            <router-link to="/solutions/cyber-trident">
              <img class="h-64 w-full object-cover" :src="placeholderImage" alt="Cyber Trident System" />
              <div class="p-6">
                <h3 class="text-2xl font-semibold text-gray-900 mb-2">Cyber Trident System</h3>
                <p class="text-gray-700">全面的船舶网络安全解决方案，保护关键系统免受网络威胁。</p>
                <div class="mt-4 flex items-center text-primary">
                  <span>了解更多</span>
                  <svg class="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </div>
              </div>
            </router-link>
          </div>
          
          <!-- Central Monitoring System -->
          <div class="bg-white overflow-hidden shadow-lg rounded-lg transition-all duration-300 hover:shadow-xl">
            <router-link to="/solutions/central-monitoring">
              <img class="h-64 w-full object-cover" :src="placeholderImage" alt="Central Monitoring System" />
              <div class="p-6">
                <h3 class="text-2xl font-semibold text-gray-900 mb-2">Central Monitoring System</h3>
                <p class="text-gray-700">集中式船舶监控系统，提供实时数据和警报，确保船舶安全运行。</p>
                <div class="mt-4 flex items-center text-primary">
                  <span>了解更多</span>
                  <svg class="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </div>
              </div>
            </router-link>
          </div>
        </div>
      </div>
    </div>
    
    <!-- 子路由出口 -->
    <router-view></router-view>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import { placeholderImage } from '@/assets/placeholder.js';

const route = useRoute();

// 检查是否有子路由
const hasChild = computed(() => {
  return route.path !== '/solutions';
});
</script>

<style scoped>
/* 组件样式 */
</style>