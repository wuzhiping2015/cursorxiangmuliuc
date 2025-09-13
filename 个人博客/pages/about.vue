<template>
  <div class="about-page">
    <!-- 英雄区块 -->
    <section class="hero-section">
      <div class="container mx-auto px-4 py-16">
        <div class="max-w-4xl mx-auto text-center">
          <div class="relative inline-block mb-8">
            <!-- 头像 -->
            <div class="w-32 h-32 mx-auto rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center shadow-2xl">
              <Icon name="heroicons:user" class="w-16 h-16 text-white" />
            </div>
            <!-- 状态指示器 -->
            <div class="absolute -bottom-2 -right-2 w-8 h-8 bg-green-500 rounded-full border-4 border-white dark:border-gray-900 flex items-center justify-center">
              <Icon name="heroicons:check" class="w-4 h-4 text-white" />
            </div>
          </div>
          
          <h1 class="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Frontend AI Engineer
          </h1>
          
          <p class="text-xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed max-w-2xl mx-auto">
            专注于 AI 辅助前端开发的工程师，致力于探索 AI 如何重塑前端开发工作流，
            提升开发效率，释放创造力。
          </p>
          
          <!-- 社交链接 -->
          <div class="flex justify-center gap-4">
            <a
              v-for="social in socialLinks"
              :key="social.name"
              :href="social.url"
              target="_blank"
              :class="[
                'flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all duration-200',
                social.class,
                'hover:scale-105 hover:shadow-lg'
              ]"
            >
              <Icon :name="social.icon" class="w-5 h-5" />
              {{ social.name }}
            </a>
          </div>
        </div>
      </div>
    </section>

    <!-- 专业技能 -->
    <section class="skills-section py-16 bg-white dark:bg-gray-900">
      <div class="container mx-auto px-4">
        <div class="max-w-6xl mx-auto">
          <div class="text-center mb-12">
            <h2 class="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              专业技能
            </h2>
            <p class="text-gray-600 dark:text-gray-300">
              深度掌握现代前端技术栈，结合 AI 工具打造高效开发工作流
            </p>
          </div>

          <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div
              v-for="skill in skills"
              :key="skill.category"
              class="bg-gray-50 dark:bg-gray-800 rounded-2xl p-6 hover:shadow-lg transition-shadow"
            >
              <div class="flex items-center gap-3 mb-4">
                <div :class="['w-10 h-10 rounded-lg flex items-center justify-center', skill.color]">
                  <Icon :name="skill.icon" class="w-5 h-5 text-white" />
                </div>
                <h3 class="text-lg font-semibold text-gray-900 dark:text-white">
                  {{ skill.category }}
                </h3>
              </div>
              <div class="space-y-3">
                <div
                  v-for="tech in skill.technologies"
                  :key="tech.name"
                  class="flex items-center justify-between"
                >
                  <span class="text-gray-700 dark:text-gray-300 text-sm font-medium">
                    {{ tech.name }}
                  </span>
                  <div class="flex items-center gap-2">
                    <div class="w-20 h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                      <div
                        :class="['h-full rounded-full', tech.color]"
                        :style="{ width: `${tech.level}%` }"
                      ></div>
                    </div>
                    <span class="text-xs text-gray-500 dark:text-gray-400 w-8">
                      {{ tech.level }}%
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 工作经历 -->
    <section class="experience-section py-16 bg-gray-50 dark:bg-gray-800">
      <div class="container mx-auto px-4">
        <div class="max-w-4xl mx-auto">
          <div class="text-center mb-12">
            <h2 class="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              职业历程
            </h2>
            <p class="text-gray-600 dark:text-gray-300">
              在前端开发领域的成长轨迹，以及 AI 协作的实践探索
            </p>
          </div>

          <div class="space-y-8">
            <div
              v-for="(exp, index) in experiences"
              :key="exp.company"
              class="relative"
            >
              <!-- 时间线 -->
              <div class="absolute left-4 top-8 bottom-0 w-0.5 bg-blue-200 dark:bg-blue-800" v-if="index !== experiences.length - 1"></div>
              
              <div class="flex gap-6">
                <!-- 时间节点 -->
                <div class="flex-shrink-0">
                  <div class="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center shadow-lg">
                    <Icon name="heroicons:briefcase" class="w-4 h-4 text-white" />
                  </div>
                </div>
                
                <!-- 内容 -->
                <div class="flex-1 bg-white dark:bg-gray-900 rounded-2xl p-6 shadow-md hover:shadow-lg transition-shadow">
                  <div class="flex flex-col md:flex-row md:items-center md:justify-between mb-3">
                    <div>
                      <h3 class="text-lg font-semibold text-gray-900 dark:text-white">
                        {{ exp.position }}
                      </h3>
                      <p class="text-blue-600 dark:text-blue-400 font-medium">
                        {{ exp.company }}
                      </p>
                    </div>
                    <span class="text-sm text-gray-500 dark:text-gray-400 mt-1 md:mt-0">
                      {{ exp.period }}
                    </span>
                  </div>
                  
                  <p class="text-gray-600 dark:text-gray-300 mb-4 leading-relaxed">
                    {{ exp.description }}
                  </p>
                  
                  <div class="flex flex-wrap gap-2">
                    <span
                      v-for="tech in exp.technologies"
                      :key="tech"
                      class="px-2 py-1 text-xs bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-full"
                    >
                      {{ tech }}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- AI 工作流理念 -->
    <section class="philosophy-section py-16 bg-white dark:bg-gray-900">
      <div class="container mx-auto px-4">
        <div class="max-w-4xl mx-auto">
          <div class="text-center mb-12">
            <h2 class="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              AI 协作理念
            </h2>
            <p class="text-gray-600 dark:text-gray-300">
              从"代码实现者"到"AI 协作者"的思维转变
            </p>
          </div>

          <div class="grid md:grid-cols-2 gap-8">
            <div
              v-for="principle in principles"
              :key="principle.title"
              class="relative group"
            >
              <div class="bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-800 dark:to-gray-700 rounded-2xl p-6 h-full hover:shadow-xl transition-all duration-300">
                <div class="flex items-center gap-3 mb-4">
                  <div :class="['w-10 h-10 rounded-lg flex items-center justify-center', principle.color]">
                    <Icon :name="principle.icon" class="w-5 h-5 text-white" />
                  </div>
                  <h3 class="text-xl font-semibold text-gray-900 dark:text-white">
                    {{ principle.title }}
                  </h3>
                </div>
                <p class="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                  {{ principle.description }}
                </p>
                <ul class="space-y-2">
                  <li
                    v-for="point in principle.points"
                    :key="point"
                    class="flex items-start gap-2 text-sm text-gray-600 dark:text-gray-400"
                  >
                    <Icon name="heroicons:check" class="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                    {{ point }}
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 项目成果 -->
    <section class="achievements-section py-16 bg-gray-50 dark:bg-gray-800">
      <div class="container mx-auto px-4">
        <div class="max-w-6xl mx-auto">
          <div class="text-center mb-12">
            <h2 class="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              项目成果
            </h2>
            <p class="text-gray-600 dark:text-gray-300">
              AI 辅助开发带来的实际效果和价值
            </p>
          </div>

          <div class="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div
              v-for="stat in statistics"
              :key="stat.label"
              class="text-center bg-white dark:bg-gray-900 rounded-2xl p-6 shadow-md hover:shadow-lg transition-shadow"
            >
              <div :class="['w-12 h-12 mx-auto mb-4 rounded-lg flex items-center justify-center', stat.color]">
                <Icon :name="stat.icon" class="w-6 h-6 text-white" />
              </div>
              <div class="text-2xl font-bold text-gray-900 dark:text-white mb-1">
                {{ stat.value }}
              </div>
              <div class="text-sm text-gray-600 dark:text-gray-400">
                {{ stat.label }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 联系方式 -->
    <section class="contact-section py-16 bg-white dark:bg-gray-900">
      <div class="container mx-auto px-4">
        <div class="max-w-4xl mx-auto text-center">
          <h2 class="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            让我们交流
          </h2>
          <p class="text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
            如果你对 AI 辅助前端开发感兴趣，或者想要交流相关经验，
            欢迎与我联系！我很乐意分享和学习。
          </p>
          
          <div class="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="mailto:frontend.ai.engineer@example.com"
              class="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors"
            >
              <Icon name="heroicons:envelope" class="w-5 h-5" />
              发送邮件
            </a>
            <button
              @click="copyWechat"
              class="inline-flex items-center gap-2 px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg font-medium transition-colors"
            >
              <Icon name="simple-icons:wechat" class="w-5 h-5" />
              微信交流
            </button>
          </div>
          
          <div class="mt-8 pt-8 border-t border-gray-200 dark:border-gray-700">
            <p class="text-gray-500 dark:text-gray-400 text-sm">
              "AI 不会取代程序员，但会 AI 的程序员会取代不会 AI 的程序员"
            </p>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
/**
 * 关于页面
 * 展示个人信息、技能、经历和 AI 协作理念
 */

// 页面元数据
useHead({
  title: '关于我 - AI 前端工程师的成长之路',
  meta: [
    { 
      name: 'description', 
      content: '了解一位专注于 AI 辅助前端开发的工程师，他的技能、经历、理念以及如何将 AI 融入日常开发工作流程中。' 
    },
    { 
      name: 'keywords', 
      content: '前端工程师,AI开发,个人简历,技能展示,工作经历,开发理念' 
    }
  ]
})

// 社交链接
const socialLinks = [
  {
    name: 'GitHub',
    icon: 'simple-icons:github',
    url: 'https://github.com/ai-frontend-engineer',
    class: 'bg-gray-800 hover:bg-gray-900 text-white'
  },
  {
    name: 'Twitter',
    icon: 'simple-icons:twitter',
    url: 'https://twitter.com/ai_frontend_eng',
    class: 'bg-blue-500 hover:bg-blue-600 text-white'
  },
  {
    name: 'LinkedIn',
    icon: 'simple-icons:linkedin',
    url: 'https://linkedin.com/in/ai-frontend-engineer',
    class: 'bg-blue-700 hover:bg-blue-800 text-white'
  }
]

// 技能数据
const skills = [
  {
    category: '前端框架',
    icon: 'mdi:vue',
    color: 'bg-green-500',
    technologies: [
      { name: 'Vue.js', level: 95, color: 'bg-green-500' },
      { name: 'React', level: 85, color: 'bg-blue-500' },
      { name: 'Nuxt.js', level: 90, color: 'bg-green-600' },
      { name: 'Next.js', level: 80, color: 'bg-gray-800' }
    ]
  },
  {
    category: '开发语言',
    icon: 'mdi:language-typescript',
    color: 'bg-blue-600',
    technologies: [
      { name: 'TypeScript', level: 90, color: 'bg-blue-600' },
      { name: 'JavaScript', level: 95, color: 'bg-yellow-500' },
      { name: 'HTML/CSS', level: 90, color: 'bg-orange-500' },
      { name: 'Node.js', level: 75, color: 'bg-green-600' }
    ]
  },
  {
    category: '工程化工具',
    icon: 'mdi:cog',
    color: 'bg-purple-600',
    technologies: [
      { name: 'Vite', level: 85, color: 'bg-purple-500' },
      { name: 'Webpack', level: 80, color: 'bg-blue-500' },
      { name: 'ESLint', level: 90, color: 'bg-indigo-600' },
      { name: 'Git', level: 95, color: 'bg-red-500' }
    ]
  },
  {
    category: 'AI 工具',
    icon: 'mdi:robot',
    color: 'bg-indigo-600',
    technologies: [
      { name: 'ChatGPT', level: 95, color: 'bg-green-500' },
      { name: 'Cursor', level: 90, color: 'bg-blue-500' },
      { name: 'GitHub Copilot', level: 85, color: 'bg-gray-800' },
      { name: 'Claude', level: 88, color: 'bg-orange-500' }
    ]
  },
  {
    category: 'UI/UX 设计',
    icon: 'mdi:palette',
    color: 'bg-pink-600',
    technologies: [
      { name: 'Tailwind CSS', level: 95, color: 'bg-teal-500' },
      { name: 'Figma', level: 75, color: 'bg-purple-500' },
      { name: 'Design System', level: 80, color: 'bg-blue-500' },
      { name: 'Responsive Design', level: 90, color: 'bg-green-500' }
    ]
  },
  {
    category: '云服务',
    icon: 'mdi:cloud',
    color: 'bg-blue-500',
    technologies: [
      { name: 'Vercel', level: 85, color: 'bg-black' },
      { name: 'Netlify', level: 80, color: 'bg-teal-500' },
      { name: 'AWS', level: 70, color: 'bg-orange-500' },
      { name: 'Docker', level: 65, color: 'bg-blue-600' }
    ]
  }
]

// 工作经历
const experiences = [
  {
    company: '科技公司 - 前端团队',
    position: '高级前端工程师',
    period: '2021 - 至今',
    description: '负责公司核心产品的前端架构设计与开发，引入 AI 工具提升团队开发效率 68%，建立了完善的 AI 辅助开发工作流程。',
    technologies: ['Vue 3', 'TypeScript', 'Nuxt 3', 'AI Tools', 'Microservices']
  },
  {
    company: '互联网公司 - 产品部',
    position: '前端工程师',
    period: '2019 - 2021',
    description: '参与多个 ToB 产品的前端开发，从零搭建组件库和开发规范，积累了丰富的工程化经验。',
    technologies: ['React', 'Vue 2', 'Ant Design', 'Webpack', 'Git']
  },
  {
    company: '创业公司 - 技术部',
    position: '初级前端工程师',
    period: '2018 - 2019',
    description: '初入职场，参与公司官网和管理后台开发，培养了扎实的前端基础技能和问题解决能力。',
    technologies: ['HTML', 'CSS', 'JavaScript', 'jQuery', 'Bootstrap']
  }
]

// AI 协作理念
const principles = [
  {
    title: '效率至上',
    icon: 'heroicons:lightning-bolt',
    color: 'bg-yellow-500',
    description: 'AI 工具的核心价值在于解放重复性劳动，让开发者专注于更有创造性的工作。',
    points: [
      '自动化代码生成和重构',
      '智能错误检测和修复',
      '快速原型开发和验证',
      '文档和测试自动生成'
    ]
  },
  {
    title: '质量保证',
    icon: 'heroicons:shield-check',
    color: 'bg-green-600',
    description: 'AI 辅助开发不意味着降低代码质量，而是通过更好的工具提升质量标准。',
    points: [
      '代码审查和优化建议',
      '性能分析和改进方案',
      '安全漏洞检测预防',
      '最佳实践指导推荐'
    ]
  },
  {
    title: '持续学习',
    icon: 'heroicons:academic-cap',
    color: 'bg-blue-600',
    description: 'AI 技术发展迅速，需要持续关注和学习新工具，不断优化工作流程。',
    points: [
      '跟进 AI 工具发展动态',
      '实践验证工具实用性',
      '分享交流使用心得',
      '建立个人 AI 工具库'
    ]
  },
  {
    title: '人机协作',
    icon: 'heroicons:users',
    color: 'bg-purple-600',
    description: 'AI 是工具而非替代，关键在于找到最佳的人机协作模式。',
    points: [
      'AI 负责执行，人负责决策',
      '保持对代码的理解和控制',
      '建立有效的质量检查机制',
      '培养 AI 时代的核心竞争力'
    ]
  }
]

// 统计数据
const statistics = [
  {
    label: 'AI工具使用',
    value: '50+',
    icon: 'heroicons:cpu-chip',
    color: 'bg-blue-600'
  },
  {
    label: '效率提升',
    value: '68%',
    icon: 'heroicons:arrow-trending-up',
    color: 'bg-green-600'
  },
  {
    label: '项目经验',
    value: '100+',
    icon: 'heroicons:briefcase',
    color: 'bg-purple-600'
  },
  {
    label: '开发年限',
    value: '6年',
    icon: 'heroicons:clock',
    color: 'bg-orange-600'
  }
]

// 方法
const copyWechat = () => {
  const wechatId = 'ai_frontend_engineer'
  if (navigator.clipboard) {
    navigator.clipboard.writeText(wechatId)
    alert(`微信号已复制：${wechatId}`)
  } else {
    alert(`微信号：${wechatId}`)
  }
}

// SEO 结构化数据
useJsonld({
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Frontend AI Engineer',
  jobTitle: 'Senior Frontend Developer',
  description: '专注于AI辅助前端开发的工程师',
  url: 'https://ai-frontend-engineer.com/about',
  sameAs: [
    'https://github.com/ai-frontend-engineer',
    'https://twitter.com/ai_frontend_eng',
    'https://linkedin.com/in/ai-frontend-engineer'
  ],
  knowsAbout: [
    'Vue.js',
    'React',
    'TypeScript',
    'AI Tools',
    'Frontend Development',
    'Web Performance',
    'User Experience'
  ],
  hasOccupation: {
    '@type': 'Occupation',
    name: 'Frontend Developer',
    occupationLocation: {
      '@type': 'City',
      name: 'China'
    },
    skills: 'Vue.js, React, TypeScript, AI-assisted Development'
  }
})
</script>

<style scoped>
/**
 * 关于页面样式
 */

/* 页面容器 */
.about-page {
  @apply min-h-screen;
}

/* 英雄区块 */
.hero-section {
  @apply bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-800 dark:to-gray-700;
}

/* 技能进度条动画 */
@keyframes fillProgress {
  from { width: 0%; }
  to { width: var(--progress); }
}

.skills-section .technologies div[style*="width"] {
  animation: fillProgress 1s ease-in-out;
}

/* 时间线效果 */
.experience-section .absolute::before {
  content: '';
  position: absolute;
  top: -4px;
  left: -2px;
  width: 4px;
  height: 4px;
  background: theme('colors.blue.600');
  border-radius: 50%;
}

/* 悬停效果 */
.group:hover {
  transform: translateY(-2px);
}

/* 响应式优化 */
@media (max-width: 768px) {
  .hero-section h1 {
    @apply text-3xl;
  }
  
  .about-page .container {
    @apply px-4;
  }
  
  .grid.grid-cols-2 {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (max-width: 640px) {
  .skills-section .grid {
    @apply grid-cols-1;
  }
  
  .experience-section .flex.gap-6 {
    @apply flex-col gap-4;
  }
}
</style>