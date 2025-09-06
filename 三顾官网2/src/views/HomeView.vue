<template>
  <div class="home-view">
    <!-- 如果没有子路由，显示首页内容 -->
    <div v-if="!hasChild">
      <!-- 英雄区域 -->
      <section class="hero relative h-screen-90 bg-primary overflow-hidden">
        <div class="absolute inset-0 bg-primary-dark opacity-70">
          <!-- 使用占位符替代视频 -->
          <div class="w-full h-full flex items-center justify-center">
            <span class="text-white text-xl opacity-50">背景视频占位符</span>
          </div>
        </div>
        
        <div class="relative z-10 h-full flex items-center">
          <div class="container mx-auto px-4">
            <div class="max-w-3xl">
              <h1 class="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
                智能船舶管理系统
                <br>
                <span class="text-secondary">引领航运业数字化转型</span>
              </h1>
              <p class="text-xl text-gray-300 mb-8">
                SANGO AI 为您提供全方位的智能船舶管理解决方案，
                <br>
                助力企业实现数字化转型，提升运营效率。
              </p>
              <div class="flex flex-wrap gap-4">
                <router-link
                  to="/products"
                  class="btn-primary text-lg px-8 py-3"
                >
                  了解更多
                </router-link>
                <a
                  href="#contact"
                  class="btn-outline text-lg px-8 py-3"
                >
                  联系我们
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- 解决方案 -->
      <section class="py-20 bg-gray-50">
        <div class="container mx-auto px-4">
          <div class="text-center mb-16">
            <h2 class="text-3xl md:text-4xl font-bold text-primary mb-4">
              核心解决方案
            </h2>
            <p class="text-xl text-gray-600">
              为船舶行业提供全面的智能化管理解决方案
            </p>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div
              v-for="solution in solutions"
              :key="solution.id"
              class="bg-white rounded-lg shadow-lg overflow-hidden transform hover:-translate-y-1 transition-transform duration-300"
            >
              <div class="w-full h-48 bg-gray-300 flex items-center justify-center">
                <span class="text-gray-600">{{ solution.title }} 图片</span>
              </div>
              <div class="p-6">
                <h3 class="text-xl font-semibold text-primary mb-3">
                  {{ solution.title }}
                </h3>
                <p class="text-gray-600 mb-4">
                  {{ solution.description }}
                </p>
                <router-link
                  :to="solution.link"
                  class="text-secondary hover:text-secondary-dark font-medium inline-flex items-center"
                >
                  了解更多
                  <svg class="w-4 h-4 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
                  </svg>
                </router-link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- 技术优势 -->
      <section class="py-20">
        <div class="container mx-auto px-4">
          <div class="text-center mb-16">
            <h2 class="text-3xl md:text-4xl font-bold text-primary mb-4">
              技术优势
            </h2>
            <p class="text-xl text-gray-600">
              依托先进技术，打造智能船舶管理生态
            </p>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div
              v-for="advantage in advantages"
              :key="advantage.id"
              class="text-center"
            >
              <div class="inline-block p-4 bg-primary-light rounded-full mb-6">
                <component
                  :is="advantage.icon"
                  class="w-12 h-12 text-secondary"
                />
              </div>
              <h3 class="text-xl font-semibold text-primary mb-3">
                {{ advantage.title }}
              </h3>
              <p class="text-gray-600">
                {{ advantage.description }}
              </p>
            </div>
          </div>
        </div>
      </section>

      <!-- 数据展示 -->
      <section class="py-20 bg-primary text-white">
        <div class="container mx-auto px-4">
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div
              v-for="stat in stats"
              :key="stat.id"
              class="text-center"
            >
              <div class="text-4xl font-bold mb-2">
                {{ stat.value }}
              </div>
              <div class="text-xl text-gray-300">
                {{ stat.label }}
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- 联系我们 -->
      <section id="contact" class="py-20 bg-gray-50">
        <div class="container mx-auto px-4">
          <div class="max-w-3xl mx-auto text-center">
            <h2 class="text-3xl md:text-4xl font-bold text-primary mb-4">
              联系我们
            </h2>
            <p class="text-xl text-gray-600 mb-8">
              让我们一起探讨如何为您的企业提供最佳的智能化解决方案
            </p>
            <form @submit.prevent="submitContact" class="space-y-6">
              <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <input
                  type="text"
                  v-model="contactForm.name"
                  placeholder="您的姓名"
                  class="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent"
                  required
                >
                <input
                  type="email"
                  v-model="contactForm.email"
                  placeholder="电子邮箱"
                  class="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent"
                  required
                >
              </div>
              <input
                type="text"
                v-model="contactForm.company"
                placeholder="公司名称"
                class="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent"
              >
              <textarea
                v-model="contactForm.message"
                placeholder="请描述您的需求"
                rows="4"
                class="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent"
                required
              ></textarea>
              <button
                type="submit"
                class="btn-primary text-lg px-8 py-3"
              >
                提交
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
    
    <!-- 子路由出口 -->
    <router-view></router-view>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()

// 解决方案数据
const solutions = [
  {
    id: 1,
    title: '智能船舶管理系统',
    description: '基于AI技术的智能船舶管理系统，实现船舶运营全生命周期的数字化管理。',
    link: '/products#management'
  },
  {
    id: 2,
    title: '预测性维护',
    description: '利用机器学习算法，预测设备故障，降低维护成本，提高船舶运营效率。',
    link: '/products#maintenance'
  },
  {
    id: 3,
    title: '智能航行辅助',
    description: '结合气象数据和AI算法，为船舶提供最优航线规划和航行建议。',
    link: '/products#navigation'
  }
]

// 技术优势数据
const advantages = [
  {
    id: 1,
    title: 'AI驱动',
    description: '采用先进的人工智能算法，实现智能决策和预测。',
    icon: 'BrainIcon'
  },
  {
    id: 2,
    title: '实时监控',
    description: '7*24小时实时监控船舶状态，及时发现潜在问题。',
    icon: 'MonitorIcon'
  },
  {
    id: 3,
    title: '数据安全',
    description: '采用多重加密技术，确保数据传输和存储安全。',
    icon: 'ShieldIcon'
  },
  {
    id: 4,
    title: '快速部署',
    description: '模块化设计，支持快速部署和系统扩展。',
    icon: 'RocketIcon'
  }
]

// 数据统计
const stats = [
  {
    id: 1,
    value: '200+',
    label: '服务客户'
  },
  {
    id: 2,
    value: '1000+',
    label: '船舶覆盖'
  },
  {
    id: 3,
    value: '98%',
    label: '客户满意度'
  },
  {
    id: 4,
    value: '24/7',
    label: '技术支持'
  }
]

// 联系表单
const contactForm = ref({
  name: '',
  email: '',
  company: '',
  message: ''
})

const submitContact = () => {
  // 处理表单提交逻辑
  console.log('提交表单:', contactForm.value)
  // 重置表单
  contactForm.value = {
    name: '',
    email: '',
    company: '',
    message: ''
  }
}

// 检查是否有子路由
const hasChild = computed(() => {
  return route.path !== '/'
})
</script>

<style scoped>
.hero {
  background: linear-gradient(rgba(0, 33, 71, 0.9), rgba(0, 33, 71, 0.9));
}

.btn-primary {
  @apply bg-secondary text-white rounded-lg hover:bg-secondary-dark transition-colors;
}

.btn-outline {
  @apply border-2 border-white text-white rounded-lg hover:bg-white hover:text-primary transition-colors;
}
</style> 