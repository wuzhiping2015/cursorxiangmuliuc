<template>
  <div class="invite">
    <h2>邀请好友</h2>
    <div class="invite-code">
      <p>您的邀请码：</p>
      <div class="code">{{ inviteCode }}</div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useUserStore } from '../stores/user'

const userStore = useUserStore()
const inviteCode = ref('INVITE123')
</script>

<style lang="scss" scoped>
.invite {
  padding: 20px;
  
  h2 {
    font-size: 20px;
    color: #333;
    margin-bottom: 20px;
    text-align: center;
  }
  
  .invite-code {
    background: #f5f5f5;
    padding: 15px;
    border-radius: 8px;
    text-align: center;
    
    p {
      color: #666;
      margin-bottom: 10px;
    }
    
    .code {
      font-size: 24px;
      color: #ff6b35;
      font-weight: bold;
    }
  }
}
</style> 