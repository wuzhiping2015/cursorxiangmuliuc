<template>
  <div class="dashboard">
    <nav class="navbar">
      <div class="logo">
        <h1>AI工具导航</h1>
      </div>
      <div class="search">
        <input type="text" placeholder="搜索AI工具..." v-model="searchQuery">
      </div>
      <div class="actions">
        <button class="theme-toggle" @click="toggleTheme">
          <i class="icon" :class="isDark ? 'icon-sun' : 'icon-moon'"></i>
        </button>
      </div>
    </nav>

    <main class="content">
      <div class="grid-container">
        <!-- 工具分类占比 -->
        <div class="chart-card">
          <h3>工具分类占比</h3>
          <RadarChart />
        </div>

        <!-- 工具关联网络 -->
        <div class="chart-card">
          <h3>工具关联网络</h3>
          <NetworkChart />
        </div>

        <!-- 新工具时间线 -->
        <div class="chart-card">
          <h3>新工具时间线</h3>
          <TimelineChart />
        </div>

        <!-- 使用频率热力图 -->
        <div class="chart-card">
          <h3>使用频率分布</h3>
          <HeatmapChart />
        </div>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import RadarChart from '@/components/charts/RadarChart.vue'
import NetworkChart from '@/components/charts/NetworkChart.vue'
import TimelineChart from '@/components/charts/TimelineChart.vue'
import HeatmapChart from '@/components/charts/HeatmapChart.vue'

const searchQuery = ref('')
const isDark = ref(true)

const toggleTheme = () => {
  isDark.value = !isDark.value
  document.documentElement.classList.toggle('light-theme')
}
</script>

<style lang="scss" scoped>
@use '@/styles/variables' as *;
@use '@/styles/mixins' as *;

.dashboard {
  min-height: 100vh;
  @include flex(column);
}

.navbar {
  @include glassmorphism;
  @include flex(row, space-between, center);
  padding: $spacing-md $spacing-xl;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;

  .logo {
    h1 {
      @include gradient-text;
      font-size: $font-size-xl;
      font-weight: 300;
    }
  }

  .search {
    input {
      @include glassmorphism;
      padding: $spacing-sm $spacing-md;
      border-radius: $border-radius-md;
      width: 300px;
      color: $text-primary;
      font-size: $font-size-md;

      &::placeholder {
        color: $text-secondary;
      }
    }
  }

  .actions {
    .theme-toggle {
      @include glassmorphism;
      width: 40px;
      height: 40px;
      border-radius: 50%;
      cursor: pointer;
      @include transition(transform, background-color);

      &:hover {
        transform: scale(1.1);
      }
    }
  }
}

.content {
  margin-top: 80px;
  padding: $spacing-xl;
  width: 100%;
}

.grid-container {
  @include grid(2, $spacing-xl);
  max-width: 1400px;
  margin: 0 auto;

  @include respond-to(md) {
    grid-template-columns: repeat(2, 1fr);
  }

  @include respond-to(sm) {
    grid-template-columns: 1fr;
  }
}

.chart-card {
  @include glassmorphism;
  padding: $spacing-lg;
  border-radius: $border-radius-lg;
  @include hover-shadow;

  h3 {
    font-size: $font-size-lg;
    font-weight: 300;
    margin-bottom: $spacing-md;
    color: $text-primary;
  }
}
</style> 