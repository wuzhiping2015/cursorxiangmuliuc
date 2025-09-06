<template>
  <div class="min-h-screen bg-slate-50">
    <!-- 页面标题区域 -->
    <div class="bg-gradient-to-r from-blue-900 to-blue-800 text-white">
      <div class="container mx-auto px-4 py-12">
        <h1 class="text-4xl font-bold text-center">核心技术</h1>
        <p class="text-center text-blue-100 mt-4 max-w-2xl mx-auto">
          引领海事行业技术创新，打造智能化未来
        </p>
      </div>
    </div>

    <!-- 内容区域 -->
    <div class="container mx-auto px-4 py-16">
      <!-- 子路由视图 - 用于显示子页面内容 -->
      <router-view v-slot="{ Component }">
        <transition name="fade" mode="out-in">
          <component :is="Component" />
        </transition>
      </router-view>
      
      <!-- 当没有子路由时显示的默认内容 -->
      <template v-if="$route.path === '/tech-advantage'">
        <!-- 技术优势卡片 -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-6xl mx-auto">
          <!-- AIoT -->
          <div class="bg-white rounded-xl shadow-lg overflow-hidden">
            <div class="relative">
              <img :src="placeholderImage" alt="AIoT Technology" class="w-full h-64 object-cover" />
              <div class="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
            </div>
            <div class="p-8">
              <h3 class="text-2xl font-bold text-blue-900 mb-4">AIoT</h3>
              <p class="text-gray-600 mb-6">
                开发更强大、灵活、通用和易用的系统，高效控制船舶设备。主要特点：
              </p>
              <ul class="space-y-3 text-gray-600">
                <li class="flex items-start">
                  <svg class="h-6 w-6 text-orange-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  智能设备互联
                </li>
                <li class="flex items-start">
                  <svg class="h-6 w-6 text-orange-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  实时数据分析
                </li>
                <li class="flex items-start">
                  <svg class="h-6 w-6 text-orange-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  自动化控制
                </li>
              </ul>
            </div>
          </div>

          <!-- AI -->
          <div class="bg-white rounded-xl shadow-lg overflow-hidden">
            <div class="relative">
              <img :src="placeholderImage" alt="AI Technology" class="w-full h-64 object-cover" />
              <div class="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
            </div>
            <div class="p-8">
              <h3 class="text-2xl font-bold text-blue-900 mb-4">AI</h3>
              <p class="text-gray-600 mb-6">
                为船舶和机械设备注入智能，降低故障成本并提高效率：
              </p>
              <ul class="space-y-3 text-gray-600">
                <li class="flex items-start">
                  <svg class="h-6 w-6 text-orange-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  故障预测
                </li>
                <li class="flex items-start">
                  <svg class="h-6 w-6 text-orange-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  性能优化
                </li>
                <li class="flex items-start">
                  <svg class="h-6 w-6 text-orange-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  智能决策
                </li>
              </ul>
            </div>
          </div>

          <!-- Digital Twin -->
          <div class="bg-white rounded-xl shadow-lg overflow-hidden">
            <div class="relative">
              <img :src="placeholderImage" alt="Digital Twin" class="w-full h-64 object-cover" />
              <div class="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
            </div>
            <div class="p-8">
              <h3 class="text-2xl font-bold text-blue-900 mb-4">Digital Twin</h3>
              <p class="text-gray-600 mb-6">
                数据驱动的仿真模型，实现船舶和设备的实时可视化：
              </p>
              <ul class="space-y-3 text-gray-600">
                <li class="flex items-start">
                  <svg class="h-6 w-6 text-orange-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  实时监控
                </li>
                <li class="flex items-start">
                  <svg class="h-6 w-6 text-orange-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  状态评估
                </li>
                <li class="flex items-start">
                  <svg class="h-6 w-6 text-orange-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  预测分析
                </li>
              </ul>
            </div>
          </div>

          <!-- Big Data -->
          <div class="bg-white rounded-xl shadow-lg overflow-hidden">
            <div class="relative">
              <img :src="placeholderImage" alt="Big Data" class="w-full h-64 object-cover" />
              <div class="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
            </div>
            <div class="p-8">
              <h3 class="text-2xl font-bold text-blue-900 mb-4">Big Data</h3>
              <p class="text-gray-600 mb-6">
                利用数据驱动的洞察力，实现更安全、更有利可图的航行：
              </p>
              <ul class="space-y-3 text-gray-600">
                <li class="flex items-start">
                  <svg class="h-6 w-6 text-orange-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  数据挖掘
                </li>
                <li class="flex items-start">
                  <svg class="h-6 w-6 text-orange-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  趋势分析
                </li>
                <li class="flex items-start">
                  <svg class="h-6 w-6 text-orange-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  决策支持
                </li>
              </ul>
            </div>
          </div>
        </div>

        <!-- 技术创新成果 -->
        <div class="mt-24 max-w-4xl mx-auto">
          <h2 class="text-3xl font-bold text-blue-900 mb-12 text-center">技术创新成果</h2>
          <div class="bg-white rounded-xl shadow-lg p-8">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div class="text-center p-6 border-b md:border-b-0 md:border-r border-gray-200">
                <div class="text-4xl font-bold text-orange-500 mb-2">50+</div>
                <div class="text-gray-600">专利技术</div>
              </div>
              <div class="text-center p-6 border-b md:border-b-0 border-gray-200">
                <div class="text-4xl font-bold text-orange-500 mb-2">100+</div>
                <div class="text-gray-600">研发人员</div>
              </div>
              <div class="text-center p-6 border-b md:border-b-0 md:border-r border-gray-200">
                <div class="text-4xl font-bold text-orange-500 mb-2">1000+</div>
                <div class="text-gray-600">服务客户</div>
              </div>
              <div class="text-center p-6">
                <div class="text-4xl font-bold text-orange-500 mb-2">20+</div>
                <div class="text-gray-600">国际认证</div>
              </div>
            </div>
          </div>
        </div>
      </template>
    </div>
  </div>
</template>

<script setup>
import { useRoute } from 'vue-router'
import { placeholderImage } from '@/assets/placeholder.js'

const route = useRoute()
</script>