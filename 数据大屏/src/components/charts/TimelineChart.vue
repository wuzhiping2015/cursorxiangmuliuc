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
  dates: [
    '2023-01', '2023-02', '2023-03', '2023-04', '2023-05', '2023-06',
    '2023-07', '2023-08', '2023-09', '2023-10', '2023-11', '2023-12'
  ],
  tools: [
    { name: 'GPT-4', date: '2023-03', value: 95 },
    { name: 'Claude 2', date: '2023-07', value: 85 },
    { name: 'DALL-E 3', date: '2023-09', value: 80 },
    { name: 'Midjourney V6', date: '2023-11', value: 90 }
  ]
}

const initChart = () => {
  if (!chartRef.value) return
  
  chart = echarts.init(chartRef.value)
  
  const option: EChartsOption = {
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'line',
        lineStyle: {
          color: 'rgba(255, 255, 255, 0.2)',
          width: 1,
          type: 'solid'
        }
      }
    },
    xAxis: {
      type: 'category',
      data: chartData.dates,
      axisLine: {
        lineStyle: {
          color: 'rgba(255, 255, 255, 0.1)'
        }
      },
      axisLabel: {
        color: 'rgba(255, 255, 255, 0.7)',
        rotate: 45
      }
    },
    yAxis: {
      type: 'value',
      splitLine: {
        lineStyle: {
          color: 'rgba(255, 255, 255, 0.1)'
        }
      },
      axisLabel: {
        color: 'rgba(255, 255, 255, 0.7)'
      }
    },
    series: [
      {
        type: 'scatter',
        data: chartData.tools.map(tool => ({
          name: tool.name,
          value: [
            chartData.dates.indexOf(tool.date),
            tool.value
          ],
          label: {
            show: true,
            position: 'top',
            formatter: tool.name,
            color: 'rgba(255, 255, 255, 0.7)'
          },
          itemStyle: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              { offset: 0, color: '#00ffd8' },
              { offset: 1, color: '#01bfec' }
            ])
          }
        })),
        symbolSize: 20
      },
      {
        type: 'line',
        data: chartData.dates.map(date => {
          const tool = chartData.tools.find(t => t.date === date)
          return tool ? tool.value : '-'
        }),
        smooth: true,
        showSymbol: false,
        lineStyle: {
          width: 2,
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            { offset: 0, color: 'rgba(0, 255, 216, 0.3)' },
            { offset: 1, color: 'rgba(1, 191, 236, 0.1)' }
          ])
        },
        areaStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            { offset: 0, color: 'rgba(0, 255, 216, 0.1)' },
            { offset: 1, color: 'rgba(1, 191, 236, 0.02)' }
          ])
        }
      }
    ]
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