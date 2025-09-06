<template>
  <div ref="chartRef" class="chart"></div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import * as echarts from 'echarts'
import type { EChartsOption } from 'echarts'

const chartRef = ref<HTMLElement>()
let chart: echarts.ECharts | null = null

// 模拟数据
const chartData = {
  nodes: [
    { name: 'ChatGPT', value: 80, category: 0 },
    { name: 'Midjourney', value: 70, category: 1 },
    { name: 'Stable Diffusion', value: 65, category: 1 },
    { name: 'Claude', value: 75, category: 0 },
    { name: 'DALL-E', value: 60, category: 1 },
    { name: 'Copilot', value: 85, category: 2 },
    { name: 'Whisper', value: 55, category: 3 }
  ],
  links: [
    { source: 'ChatGPT', target: 'Claude', value: 5 },
    { source: 'Midjourney', target: 'Stable Diffusion', value: 3 },
    { source: 'ChatGPT', target: 'Copilot', value: 4 },
    { source: 'DALL-E', target: 'Midjourney', value: 2 },
    { source: 'Stable Diffusion', target: 'DALL-E', value: 2 },
    { source: 'Claude', target: 'Copilot', value: 3 },
    { source: 'Whisper', target: 'ChatGPT', value: 1 }
  ],
  categories: [
    { name: '对话AI' },
    { name: '图像生成' },
    { name: '代码辅助' },
    { name: '音频处理' }
  ]
}

const initChart = () => {
  if (!chartRef.value) return
  
  chart = echarts.init(chartRef.value)
  
  const option: EChartsOption = {
    tooltip: {
      trigger: 'item',
      formatter: '{b}: {c}'
    },
    legend: {
      data: chartData.categories.map(cat => cat.name),
      textStyle: {
        color: 'rgba(255, 255, 255, 0.7)'
      }
    },
    series: [{
      name: '工具关联网络',
      type: 'graph',
      layout: 'force',
      data: chartData.nodes,
      links: chartData.links,
      categories: chartData.categories,
      roam: true,
      label: {
        show: true,
        position: 'right',
        color: 'rgba(255, 255, 255, 0.7)'
      },
      force: {
        repulsion: 100,
        edgeLength: 100
      },
      draggable: true,
      itemStyle: {
        borderColor: '#fff',
        borderWidth: 1,
        shadowBlur: 10,
        shadowColor: 'rgba(0, 0, 0, 0.3)'
      },
      lineStyle: {
        color: 'source',
        curveness: 0.3,
        width: 2,
        opacity: 0.7
      },
      emphasis: {
        focus: 'adjacency',
        lineStyle: {
          width: 4
        }
      }
    }]
  }

  chart.setOption(option)
}

// 响应式调整
const handleResize = () => {
  chart?.resize()
}

onMounted(() => {
  initChart()
  window.addEventListener('resize', handleResize)
})

onUnmounted(() => {
  chart?.dispose()
  window.removeEventListener('resize', handleResize)
})
</script>

<style lang="scss" scoped>
.chart {
  width: 100%;
  height: 300px;
}
</style> 