<template>
  <Loading
    :visible="visible"
    :text="text"
    :type="type"
    :fullscreen="true"
    :overlay="overlay"
    :background="background"
    :color="color"
    :closable="closable"
    @close="handleClose"
  />
</template>

<script setup>
/**
 * 全局 Loading 组件
 * 用于全屏加载状态管理
 * @author 前端工程师团队
 * @date 2024-12-XX
 */
import { ref } from 'vue'
import Loading from './Loading.vue'

// 响应式数据
const visible = ref(false)
const text = ref('加载中...')
const type = ref('default')
const overlay = ref(true)
const background = ref('rgba(255, 255, 255, 0.9)')
const color = ref('')
const closable = ref(false)

/**
 * 显示加载
 * @param {Object} options 配置选项
 */
const show = (options = {}) => {
  text.value = options.text || '加载中...'
  type.value = options.type || 'default'
  overlay.value = options.overlay !== undefined ? options.overlay : true
  background.value = options.background || 'rgba(255, 255, 255, 0.9)'
  color.value = options.color || ''
  closable.value = options.closable || false
  visible.value = true
}

/**
 * 隐藏加载
 */
const hide = () => {
  visible.value = false
}

/**
 * 处理关闭事件
 */
const handleClose = () => {
  hide()
}

// 暴露方法
defineExpose({
  show,
  hide
})
</script>

<style lang="scss" scoped>
@use "@/assets/styles/variables.scss" as *;
@use "@/assets/styles/mixins.scss" as *;
/* 样式继承自 Loading 组件 */
</style>