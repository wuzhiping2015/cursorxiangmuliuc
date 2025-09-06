<template>
  <footer class="bg-primary text-white">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        <!-- 公司信息 -->
        <div>
          <div class="h-8 mb-4 text-xl font-bold">SANGO AI</div>
          <p class="text-gray-300 mb-4">
            SANGO AI致力于为船舶行业提供智能化解决方案，推动行业数字化转型。
          </p>
          <div class="flex space-x-4">
            <a href="#" class="text-gray-300 hover:text-white transition-colors">
              <span class="sr-only">微信</span>
              <svg class="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M21.502 19.525c1.524-1.105 2.498-2.738 2.498-4.554 0-3.326-3.237-6.023-7.229-6.023s-7.229 2.697-7.229 6.023c0 3.327 3.237 6.024 7.229 6.024.825 0 1.621-.117 2.36-.33l.212-.032c.139 0 .265.043.384.111l1.583.924.139.045c.133 0 .241-.108.241-.241l-.039-.176-.326-1.215-.025-.154c0-.162.08-.311.213-.402zm-12.827-17.228c-4.791 0-8.675 3.236-8.675 7.229 0 2.178 1.168 4.139 2.997 5.464.147.104.243.243.243.471l-.03.184-.391 1.458-.047.211c0 .16.13.29.289.29l.168-.054 1.899-1.106c.142-.082.293-.133.46-.133l.255.038c.886.255 1.842.397 2.832.397l.476-.012c-.188-.564-.291-1.158-.291-1.771 0-3.641 3.542-6.593 7.911-6.593l.471.012c-.653-3.453-4.24-6.094-8.567-6.094zm5.686 11.711c-.532 0-.963-.432-.963-.964 0-.533.431-.964.963-.964.533 0 .964.431.964.964 0 .532-.431.964-.964.964zm4.82 0c-.533 0-.964-.432-.964-.964 0-.533.431-.964.964-.964.532 0 .963.431.963.964 0 .532-.431.964-.963.964zm-13.398-5.639c-.639 0-1.156-.518-1.156-1.156 0-.639.517-1.157 1.156-1.157.639 0 1.157.518 1.157 1.157 0 .638-.518 1.156-1.157 1.156zm5.783 0c-.639 0-1.156-.518-1.156-1.156 0-.639.517-1.157 1.156-1.157.639 0 1.157.518 1.157 1.157 0 .638-.518 1.156-1.157 1.156z"/>
              </svg>
            </a>
            <a href="#" class="text-gray-300 hover:text-white transition-colors">
              <span class="sr-only">LinkedIn</span>
              <svg class="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
              </svg>
            </a>
          </div>
        </div>

        <!-- 快速链接 -->
        <div>
          <h3 class="text-lg font-semibold mb-4">快速链接</h3>
          <ul class="space-y-2">
            <li v-for="item in quickLinks" :key="item.path">
              <router-link 
                :to="item.path"
                class="text-gray-300 hover:text-white transition-colors"
              >
                {{ item.name }}
              </router-link>
            </li>
          </ul>
        </div>

        <!-- 联系方式 -->
        <div>
          <h3 class="text-lg font-semibold mb-4">联系我们</h3>
          <ul class="space-y-2 text-gray-300">
            <li class="flex items-start">
              <svg class="h-6 w-6 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
              </svg>
              <span>上海市浦东新区张江高科技园区</span>
            </li>
            <li class="flex items-center">
              <svg class="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
              </svg>
              <a href="mailto:contact@sangoai.com" class="hover:text-white transition-colors">
                contact@sangoai.com
              </a>
            </li>
            <li class="flex items-center">
              <svg class="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
              </svg>
              <a href="tel:+86-021-12345678" class="hover:text-white transition-colors">
                021-12345678
              </a>
            </li>
          </ul>
        </div>

        <!-- 订阅newsletter -->
        <div>
          <h3 class="text-lg font-semibold mb-4">订阅我们的更新</h3>
          <p class="text-gray-300 mb-4">
            订阅我们的newsletter，获取最新的产品更新和行业资讯。
          </p>
          <form @submit.prevent="subscribe" class="space-y-2">
            <input
              type="email"
              v-model="email"
              placeholder="请输入您的邮箱"
              class="w-full px-4 py-2 bg-primary-light text-white placeholder-gray-400 rounded focus:outline-none focus:ring-2 focus:ring-secondary"
            >
            <button
              type="submit"
              class="w-full px-4 py-2 bg-secondary hover:bg-secondary-dark text-white rounded transition-colors"
            >
              订阅
            </button>
          </form>
        </div>
      </div>

      <!-- 版权信息 -->
      <div class="mt-8 pt-8 border-t border-gray-700 text-center text-gray-400">
        <p>&copy; {{ new Date().getFullYear() }} SANGO AI. 保留所有权利。</p>
      </div>
    </div>
  </footer>
</template>

<script setup>
import { ref } from 'vue'

// 快速链接
const quickLinks = [
  { name: '首页', path: '/' },
  { name: '产品介绍', path: '/products' },
  { name: '技术优势', path: '/tech-advantage' },
  { name: '关于我们', path: '/about' },
  { name: '联系我们', path: '/contact' }
]

// 订阅表单
const email = ref('')

const subscribe = () => {
  // 处理订阅逻辑
  console.log('订阅邮箱:', email.value)
  email.value = ''
}
</script>

<style scoped>
.footer-link {
  @apply text-gray-300 hover:text-white transition-colors;
}
</style> 