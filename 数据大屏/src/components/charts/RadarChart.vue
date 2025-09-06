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
  categories: ['生成式AI', '图像处理', '音频处理', '视频编辑', '文本分析', '代码辅助'],
  values: [90, 75, 65, 80, 85, 95]
}

const initChart = () => {
  if (!chartRef.value) return
  
  chart = echarts.init(chartRef.value)
  
  const option: EChartsOption = {
    tooltip: {},
    radar: {
      indicator: chartData.categories.map(name => ({ name, max: 100 })),
      splitArea: {
        areaStyle: {
          color: ['rgba(255, 255, 255, 0.05)', 'rgba(255, 255, 255, 0.02)']
        }
      },
      axisLine: {
        lineStyle: {
          color: 'rgba(255, 255, 255, 0.1)'
        }
      },
      splitLine: {
        lineStyle: {
          color: 'rgba(255, 255, 255, 0.1)'
        }
      }
    },
    series: [{
      name: '工具分类占比',
      type: 'radar',
      data: [{
        value: chartData.values,
        name: '占比',
        areaStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            { offset: 0, color: 'rgba(128, 255, 165, 0.3)' },
            { offset: 1, color: 'rgba(1, 191, 236, 0.1)' }
          ])
        },
        lineStyle: {
          width: 1
        },
        itemStyle: {
          color: '#01bfec'
        }
      }]
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