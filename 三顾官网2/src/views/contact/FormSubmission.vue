<template>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
    <div class="max-w-3xl mx-auto">
      <h1 class="text-4xl font-bold text-gray-900 mb-8">联系我们</h1>
      
      <section class="mb-12">
        <h2 class="text-2xl font-semibold text-gray-900 mb-4">填写表单</h2>
        <p class="text-lg text-gray-700 leading-relaxed mb-6">
          如果您对我们的产品和服务有任何疑问，或者希望与我们建立合作关系，请填写以下表单，我们的团队将尽快与您联系。
        </p>
        
        <form class="space-y-6">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label for="name" class="block text-sm font-medium text-gray-700 mb-1">姓名</label>
              <input type="text" id="name" name="name" class="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent" placeholder="请输入您的姓名" />
            </div>
            
            <div>
              <label for="company" class="block text-sm font-medium text-gray-700 mb-1">公司</label>
              <input type="text" id="company" name="company" class="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent" placeholder="请输入您的公司名称" />
            </div>
          </div>
          
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label for="email" class="block text-sm font-medium text-gray-700 mb-1">邮箱</label>
              <input type="email" id="email" name="email" class="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent" placeholder="请输入您的邮箱地址" />
            </div>
            
            <div>
              <label for="phone" class="block text-sm font-medium text-gray-700 mb-1">电话</label>
              <input type="tel" id="phone" name="phone" class="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent" placeholder="请输入您的联系电话" />
            </div>
          </div>
          
          <div>
            <label for="subject" class="block text-sm font-medium text-gray-700 mb-1">主题</label>
            <input type="text" id="subject" name="subject" class="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent" placeholder="请输入主题" />
          </div>
          
          <div>
            <label for="message" class="block text-sm font-medium text-gray-700 mb-1">留言</label>
            <textarea id="message" name="message" rows="5" class="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent" placeholder="请输入您的留言内容"></textarea>
          </div>
          
          <div class="flex justify-center">
            <button type="submit" class="px-6 py-3 bg-primary text-white font-medium rounded-md hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-colors duration-300">
              提交
            </button>
          </div>
        </form>
      </section>

      <section class="mb-12">
        <h2 class="text-2xl font-semibold text-gray-900 mb-4">联系方式</h2>
        <div class="bg-white rounded-lg shadow-md p-6 space-y-4">
          <div class="flex items-start">
            <svg class="w-6 h-6 text-primary mr-3 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
            </svg>
            <div>
              <h3 class="text-lg font-medium text-gray-900">地址</h3>
              <p class="text-gray-700">上海市浦东新区张江高科技园区科苑路88号</p>
            </div>
          </div>
          
          <div class="flex items-start">
            <svg class="w-6 h-6 text-primary mr-3 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
            </svg>
            <div>
              <h3 class="text-lg font-medium text-gray-900">电话</h3>
              <p class="text-gray-700">+86 21 5888 8888</p>
            </div>
          </div>
          
          <div class="flex items-start">
            <svg class="w-6 h-6 text-primary mr-3 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
            </svg>
            <div>
              <h3 class="text-lg font-medium text-gray-900">邮箱</h3>
              <p class="text-gray-700">info@sangoai.com</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>