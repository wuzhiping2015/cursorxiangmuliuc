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
  hours: Array.from({ length: 24 }, (_, i) => i),
  days: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
  data: Array.from({ length: 24 * 7 }, () => Math.floor(Math.random() * 100))
}

const initChart = () => {
  if (!chartRef.value) return
  
  chart = echarts.init(chartRef.value)
  
  const option: EChartsOption = {
    tooltip: {
      position: 'top',
      formatter: (params: any) => {
        const value = params.value
        return `${params.marker}${chartData.days[value[1]]} ${value[0]}:00<br/>使用量: ${value[2]}`
      }
    },
    grid: {
      top: '10%',
      left: '3%',
      right: '3%',
      bottom: '10%',
      containLabel: true
    },
    xAxis: {
      type: 'category',
      data: chartData.hours,
      splitArea: {
        show: true
      },
      axisLine: {
        show: false
      },
      axisLabel: {
        color: 'rgba(255, 255, 255, 0.7)',
        formatter: (value: number) => `${value}:00`
      }
    },
    yAxis: {
      type: 'category',
      data: chartData.days,
      splitArea: {
        show: true
      },
      axisLine: {
        show: false
      },
      axisLabel: {
        color: 'rgba(255, 255, 255, 0.7)'
      }
    },
    visualMap: {
      min: 0,
      max: 100,
      calculable: true,
      orient: 'horizontal',
      left: 'center',
      bottom: '0%',
      textStyle: {
        color: 'rgba(255, 255, 255, 0.7)'
      },
      inRange: {
        color: ['#313695', '#4575b4', '#74add1', '#abd9e9', '#e0f3f8', '#ffffbf',
               '#fee090', '#fdae61', '#f46d43', '#d73027', '#a50026']
      }
    },
    series: [{
      name: '使用频率',
      type: 'heatmap',
      data: chartData.data.map((value, index) => [
        index % 24,
        Math.floor(index / 24),
        value
      ]),
      label: {
        show: false
      },
      emphasis: {
        itemStyle: {
          shadowBlur: 10,
          shadowColor: 'rgba(0, 0, 0, 0.5)'
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