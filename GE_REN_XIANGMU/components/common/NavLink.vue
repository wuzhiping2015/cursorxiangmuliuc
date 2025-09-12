<template>
  <component
    :is="external ? 'a' : 'NuxtLink'"
    :to="external ? undefined : to"
    :href="external ? to : undefined"
    :target="external ? '_blank' : undefined"
    :rel="external ? 'noopener noreferrer' : undefined"
    class="nav-link"
    :class="[
      'relative inline-flex items-center space-x-2 px-3 py-2 text-sm font-medium rounded-lg',
      'text-gray-700 dark:text-gray-300',
      'hover:text-blue-600 dark:hover:text-blue-400',
      'hover:bg-gray-100 dark:hover:bg-gray-800',
      'transition-all duration-200',
      'focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50',
      isActive && 'text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20'
    ]"
  >
    <Icon v-if="icon" :name="icon" class="w-4 h-4 flex-shrink-0" />
    <span class="truncate">
      <slot />
    </span>
    <Icon 
      v-if="external" 
      name="heroicons:arrow-top-right-on-square" 
      class="w-3 h-3 flex-shrink-0 opacity-60" 
    />
  </component>
</template>

<script setup lang="ts">
/**
 * 导航链接组件
 * 支持内部链接和外部链接，自动处理活跃状态
 */

interface Props {
  to: string
  icon?: string
  external?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  external: false
})

// 检查链接是否为活跃状态
const route = useRoute()
const isActive = computed(() => {
  if (props.external) return false
  
  // 精确匹配首页
  if (props.to === '/' && route.path === '/') {
    return true
  }
  
  // 其他页面使用 startsWith 匹配
  if (props.to !== '/' && route.path.startsWith(props.to)) {
    return true
  }
  
  return false
})
</script>

<style scoped>
/**
 * 导航链接样式
 */

.nav-link {
  /* 自定义活跃状态指示器 */
  position: relative;
}

.nav-link::after {
  content: '';
  position: absolute;
  bottom: -2px;
  left: 50%;
  width: 0;
  height: 2px;
  background: linear-gradient(90deg, #3b82f6, #8b5cf6);
  transition: all 0.3s ease;
  transform: translateX(-50%);
}

.nav-link:hover::after {
  width: 80%;
}

.nav-link.router-link-active::after {
  width: 80%;
}

/* 外部链接样式 */
.nav-link[target="_blank"] {
  position: relative;
}

.nav-link[target="_blank"]:hover {
  transform: translateY(-1px);
}

/* 响应式优化 */
@media (max-width: 640px) {
  .nav-link {
    @apply w-full justify-start;
  }
  
  .nav-link::after {
    display: none;
  }
}

/* 无障碍优化 */
.nav-link:focus {
  outline: 2px solid #3b82f6;
  outline-offset: 2px;
}

/* 减少动画对于偏好减少动效的用户 */
@media (prefers-reduced-motion: reduce) {
  .nav-link,
  .nav-link::after {
    transition: none;
  }
  
  .nav-link:hover {
    transform: none;
  }
}
</style>
