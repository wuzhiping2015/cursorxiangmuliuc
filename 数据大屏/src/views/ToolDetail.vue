<template>
  <div class="tool-detail">
    <div class="header">
      <h2>工具详情</h2>
      <router-link to="/" class="back-btn">返回</router-link>
    </div>
    <div class="content">
      <div class="info-card">
        <h3>基本信息</h3>
        <div class="info-item">
          <span class="label">名称:</span>
          <span class="value">{{ toolName }}</span>
        </div>
        <div class="info-item">
          <span class="label">类别:</span>
          <span class="value">{{ category }}</span>
        </div>
        <div class="info-item">
          <span class="label">发布时间:</span>
          <span class="value">{{ releaseDate }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const toolId = route.params.id

// 模拟数据
const toolName = ref('ChatGPT')
const category = ref('对话AI')
const releaseDate = ref('2022-11-30')
</script>

<style lang="scss" scoped>
.tool-detail {
  padding: $spacing-xl;
  
  .header {
    @include flex(row, space-between, center);
    margin-bottom: $spacing-xl;
    
    h2 {
      @include gradient-text;
      font-size: $font-size-xl;
    }
    
    .back-btn {
      @include glassmorphism;
      padding: $spacing-sm $spacing-md;
      border-radius: $border-radius-md;
      color: $text-primary;
      text-decoration: none;
      @include transition(transform);
      
      &:hover {
        transform: translateX(-4px);
      }
    }
  }
  
  .content {
    .info-card {
      @include glassmorphism;
      padding: $spacing-lg;
      border-radius: $border-radius-lg;
      
      h3 {
        font-size: $font-size-lg;
        margin-bottom: $spacing-md;
      }
      
      .info-item {
        @include flex(row, flex-start, center);
        margin-bottom: $spacing-sm;
        
        .label {
          color: $text-secondary;
          width: 80px;
        }
        
        .value {
          color: $text-primary;
        }
      }
    }
  }
}
</style> 