<template>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
    <div class="max-w-3xl mx-auto">
      <h1 class="text-3xl font-bold text-gray-900 mb-8">全球合作伙伴分布</h1>
      
      <div class="relative w-full h-96 mb-8">
        <div class="absolute inset-0 bg-gray-300 rounded-lg flex items-center justify-center">
          <span class="text-gray-600 text-xl">全球合作伙伴分布地图</span>
        </div>
      </div>

      <section class="mb-12">
        <h2 class="text-2xl font-semibold text-gray-900 mb-4">全球合作网络</h2>
        <p class="text-lg text-gray-700 leading-relaxed mb-6">
          SANGO AI在全球范围内拥有广泛的合作伙伴网络，我们的产品和服务已覆盖亚洲、欧洲、北美等主要航运市场。
        </p>
        <div class="w-full h-96 bg-gray-200 rounded-lg shadow-lg mb-6 relative overflow-hidden flex items-center justify-center">
          <span class="text-gray-600 text-xl">全球合作伙伴分布地图</span>
        </div>
      </section>

      <section class="mb-12">
        <h2 class="text-2xl font-semibold text-gray-900 mb-4">区域分布</h2>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div class="bg-white rounded-lg shadow-md p-6">
            <h3 class="text-xl font-semibold text-primary mb-3">亚太地区</h3>
            <ul class="list-disc pl-6 space-y-2 text-gray-700">
              <li>中国：上海、香港、深圳</li>
              <li>日本：东京、横滨</li>
              <li>新加坡</li>
              <li>韩国：釜山</li>
            </ul>
          </div>
          
          <div class="bg-white rounded-lg shadow-md p-6">
            <h3 class="text-xl font-semibold text-primary mb-3">欧洲地区</h3>
            <ul class="list-disc pl-6 space-y-2 text-gray-700">
              <li>德国：汉堡</li>
              <li>荷兰：鹿特丹</li>
              <li>英国：伦敦</li>
              <li>希腊：雅典</li>
            </ul>
          </div>
          
          <div class="bg-white rounded-lg shadow-md p-6">
            <h3 class="text-xl font-semibold text-primary mb-3">美洲地区</h3>
            <ul class="list-disc pl-6 space-y-2 text-gray-700">
              <li>美国：纽约、洛杉矶</li>
              <li>加拿大：温哥华</li>
              <li>巴西：里约热内卢</li>
              <li>巴拿马</li>
            </ul>
          </div>
        </div>
      </section>

      <section class="mb-12">
        <h2 class="text-2xl font-semibold text-gray-900 mb-4">合作伙伴类型</h2>
        <div class="bg-white rounded-lg shadow-md p-6">
          <div class="flex flex-col md:flex-row justify-between">
            <div class="mb-6 md:mb-0 md:w-1/3">
              <div class="text-center">
                <div class="inline-block p-4 bg-primary bg-opacity-10 rounded-full mb-4">
                  <svg class="w-10 h-10 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path>
                  </svg>
                </div>
                <h3 class="text-lg font-semibold text-gray-900 mb-2">航运公司</h3>
                <p class="text-gray-700">占比 45%</p>
              </div>
            </div>
            
            <div class="mb-6 md:mb-0 md:w-1/3">
              <div class="text-center">
                <div class="inline-block p-4 bg-primary bg-opacity-10 rounded-full mb-4">
                  <svg class="w-10 h-10 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z"></path>
                  </svg>
                </div>
                <h3 class="text-lg font-semibold text-gray-900 mb-2">技术提供商</h3>
                <p class="text-gray-700">占比 30%</p>
              </div>
            </div>
            
            <div class="md:w-1/3">
              <div class="text-center">
                <div class="inline-block p-4 bg-primary bg-opacity-10 rounded-full mb-4">
                  <svg class="w-10 h-10 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4V10z"></path>
                  </svg>
                </div>
                <h3 class="text-lg font-semibold text-gray-900 mb-2">港口与船厂</h3>
                <p class="text-gray-700">占比 25%</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>