<template>
  <div class="min-h-screen bg-slate-50">
    <!-- 页面标题区域 -->
    <div class="bg-gradient-to-r from-blue-900 to-blue-800 text-white">
      <div class="container mx-auto px-4 py-12">
        <h1 class="text-4xl font-bold text-center">联系我们</h1>
        <p class="text-center text-blue-100 mt-4 max-w-2xl mx-auto">
          随时为您提供专业支持和服务
        </p>
      </div>
    </div>

    <!-- 内容区域 -->
    <div class="container mx-auto px-4 py-16">
      <div class="max-w-4xl mx-auto">
        <!-- 联系信息 -->
        <div class="bg-white rounded-lg shadow-lg p-8 mb-12">
          <h2 class="text-2xl font-bold text-blue-900 mb-6">联系方式</h2>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 class="text-lg font-semibold text-blue-900 mb-2">邮箱</h3>
              <p class="text-gray-600">sales@sangoai.com</p>
            </div>
            <div>
              <h3 class="text-lg font-semibold text-blue-900 mb-2">地址</h3>
              <p class="text-gray-600">新加坡</p>
            </div>
          </div>
        </div>

        <!-- 联系表单 -->
        <div class="bg-white rounded-lg shadow-lg p-8">
          <h2 class="text-2xl font-bold text-blue-900 mb-6">发送消息</h2>
          <form @submit.prevent="handleSubmit" class="space-y-6">
            <div>
              <label class="block text-gray-700 mb-2" for="name">姓名</label>
              <input
                type="text"
                id="name"
                v-model="form.name"
                class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                required
              >
            </div>
            <div>
              <label class="block text-gray-700 mb-2" for="email">邮箱</label>
              <input
                type="email"
                id="email"
                v-model="form.email"
                class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                required
              >
            </div>
            <div>
              <label class="block text-gray-700 mb-2" for="message">消息</label>
              <textarea
                id="message"
                v-model="form.message"
                rows="4"
                class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                required
              ></textarea>
            </div>
            <button
              type="submit"
              class="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-300"
            >
              发送
            </button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const form = ref({
  name: '',
  email: '',
  message: ''
})

const handleSubmit = () => {
  // 处理表单提交
  console.log('Form submitted:', form.value)
  // 这里可以添加实际的表单提交逻辑
}
</script> 