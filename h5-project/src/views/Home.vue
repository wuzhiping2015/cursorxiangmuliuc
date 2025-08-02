<template>
  <div class="home">
    <h1>欢迎来到拉新邀请</h1>
    <p>邀请好友，共享收益</p>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '../stores/user'

const router = useRouter()
const userStore = useUserStore()

onMounted(() => {
  console.log('Home page mounted')
})
</script>

<style lang="scss" scoped>
.home {
  padding: 20px;
  text-align: center;
  
  h1 {
    font-size: 24px;
    color: #333;
    margin-bottom: 10px;
  }
  
  p {
    font-size: 16px;
    color: #666;
  }
}
</style> 