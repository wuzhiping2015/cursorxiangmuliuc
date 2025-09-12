<template>
  <div class="home-page">
    <!-- 英雄区块 -->
    <HeroSection />
    
    <!-- AI 工作流展示 -->
    <WorkflowSection />
    
    <!-- 核心价值展示 -->
    <FeaturesSection />
    
    <!-- 最新博客文章 -->
    <LatestBlogSection />
    
    <!-- 精选 AI 工具 -->
    <FeaturedToolsSection />
    
    <!-- 数据统计 -->
    <StatsSection />
    
    <!-- CTA 行动号召 -->
    <CTASection />
  </div>
</template>

<script setup lang="ts">
/**
 * 首页组件
 * 展示个人介绍、AI工作流、核心功能和精选内容
 */

// 页面元数据
useHead({
  title: 'AI Frontend Engineer - 将AI融入前端开发工作流',
  meta: [
    { 
      name: 'description', 
      content: '专注AI辅助前端开发的工程师，分享308+精选AI工具和工作流优化经验。基于滴滴工程师实践，从"代码实现者"转变为"AI协作者"，提升开发效率。' 
    },
    { 
      name: 'keywords', 
      content: '首页,AI前端工程师,开发效率,工作流优化,AI工具,前端开发,Vue3,Nuxt3' 
    }
  ]
})

// SEO 结构化数据
useJsonld({
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  name: 'AI Frontend Engineer - 首页',
  description: '将AI融入前端开发工作流，提升开发效率的实践分享',
  url: 'https://ai-frontend-engineer.com',
  mainEntity: {
    '@type': 'Person',
    name: 'Frontend AI Engineer',
    jobTitle: 'Frontend Developer & AI Enthusiast',
    description: '专注于AI辅助前端开发的工程师',
    knowsAbout: ['Vue.js', 'Nuxt.js', 'TypeScript', 'AI Tools', 'Frontend Development'],
    alumniOf: {
      '@type': 'Organization',
      name: 'Tech Company'
    }
  }
})

// 页面加载动画
onMounted(() => {
  // 添加页面加载完成的动画效果
  const sections = document.querySelectorAll('.animate-on-scroll')
  
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  }
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate-fade-in')
        observer.unobserve(entry.target)
      }
    })
  }, observerOptions)
  
  sections.forEach(section => {
    observer.observe(section)
  })
})
</script>

<style scoped>
/**
 * 首页特定样式
 */

/* 页面容器 */
.home-page {
  @apply relative overflow-hidden;
}

/* 滚动动画初始状态 */
.animate-on-scroll {
  @apply opacity-0 translate-y-8;
  transition: all 0.6s ease-out;
}

/* 滚动动画激活状态 */
.animate-on-scroll.animate-fade-in {
  @apply opacity-100 translate-y-0;
}

/* 视差滚动效果 */
.parallax-bg {
  background-attachment: fixed;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
}

/* 渐变背景 */
.gradient-bg {
  background: linear-gradient(135deg, 
    rgba(59, 130, 246, 0.1) 0%, 
    rgba(139, 92, 246, 0.1) 50%, 
    rgba(14, 165, 233, 0.1) 100%
  );
}

/* 响应式优化 */
@media (max-width: 768px) {
  .parallax-bg {
    background-attachment: scroll;
  }
}
</style>
