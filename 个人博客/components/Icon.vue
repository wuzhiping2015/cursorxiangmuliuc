<template>
  <Icon :icon="icon" :class="className" />
</template>

<script setup lang="ts">
/**
 * 通用图标组件
 * 基于 @iconify/vue 实现
 */

import { Icon } from '@iconify/vue'

interface Props {
  /** 图标名称，格式：collection:icon-name */
  name: string
  /** 自定义类名 */
  class?: string
}

const props = withDefaults(defineProps<Props>(), {
  class: ''
})

// 解析图标名称
const icon = computed(() => {
  if (props.name.includes(':')) {
    return props.name
  }
  // 如果没有指定集合，默认使用 heroicons
  return `heroicons:${props.name}`
})

// 合并类名
const className = computed(() => {
  return props.class || ''
})
</script>
