<template>
  <view class="trend-chart" :style="themeStyles.card">
    <view class="chart-header">
      <text class="chart-title" :style="themeStyles.text.primary">{{ title }}</text>
      <view class="time-range">
        <u-button-group :value="timeRange" @change="handleTimeRangeChange">
          <u-button 
            v-for="(range, index) in timeRanges" 
            :key="range.value"
            :text="range.label"
            :type="timeRange === index ? 'primary' : 'info'"
            size="mini"
            :style="timeRange === index ? themeStyles.button.primary : themeStyles.button.secondary"
          ></u-button>
        </u-button-group>
      </view>
    </view>

    <view class="chart-content">
      <view 
        class="chart-container"
        :style="{ height: height + 'px' }"
      >
        <!-- 图表Y轴 -->
        <view class="y-axis">
          <text 
            v-for="value in yAxisValues" 
            :key="value"
            class="axis-label"
            :style="themeStyles.text.secondary"
          >{{ value }}%</text>
        </view>

        <!-- 图表主体 -->
        <view class="chart-body">
          <!-- 网格线 -->
          <view 
            v-for="(value, index) in yAxisValues" 
            :key="index"
            class="grid-line"
            :style="{ 
              bottom: (index / (yAxisValues.length - 1)) * 100 + '%',
              borderColor: themeColors.border
            }"
          ></view>

          <!-- 数据点和连线 -->
          <view class="data-line">
            <view 
              v-for="(point, index) in chartData" 
              :key="index"
              class="data-point"
              :style="{ 
                left: (index / (chartData.length - 1)) * 100 + '%',
                bottom: (point.value / maxValue) * 100 + '%'
              }"
            >
              <view 
                class="point"
                :style="{ backgroundColor: themeColors.info }"
              ></view>
              <text 
                class="point-label"
                :style="themeStyles.text.secondary"
              >{{ point.value }}%</text>
            </view>
          </view>
        </view>

        <!-- 图表X轴 -->
        <view class="x-axis">
          <text 
            v-for="(point, index) in chartData" 
            :key="index"
            class="axis-label"
            :style="[
              themeStyles.text.secondary,
              { 
                left: (index / (chartData.length - 1)) * 100 + '%',
                transform: 'translateX(-50%)'
              }
            ]"
          >{{ point.label }}</text>
        </view>
      </view>
    </view>

    <!-- 图表底部说明 -->
    <view v-if="showLegend" class="chart-footer">
      <view class="legend-item">
        <view 
          class="legend-dot"
          :style="{ backgroundColor: themeColors.info }"
        ></view>
        <text class="legend-text" :style="themeStyles.text.secondary">{{ legendText }}</text>
      </view>
    </view>
  </view>
</template>

<script>
import themeMixin from '../mixins/theme'
import { getDateRange, formatDate } from '../utils/date'

export default {
  name: 'TrendChart',
  
  mixins: [themeMixin],
  
  props: {
    // 图表标题
    title: {
      type: String,
      default: '趋势图'
    },
    // 图表数据
    data: {
      type: Array,
      required: true
    },
    // 图表高度
    height: {
      type: Number,
      default: 200
    },
    // 是否显示图例
    showLegend: {
      type: Boolean,
      default: true
    },
    // 图例文本
    legendText: {
      type: String,
      default: '完成率'
    }
  },
  
  data() {
    return {
      timeRange: 1, // 默认显示一周
      timeRanges: [
        { label: '月', value: 'month' },
        { label: '周', value: 'week' },
        { label: '年', value: 'year' }
      ]
    }
  },
  
  computed: {
    // Y轴刻度值
    yAxisValues() {
      const max = Math.ceil(this.maxValue / 20) * 20
      const step = max / 4
      return [0, step, step * 2, step * 3, max]
    },
    
    // 最大值
    maxValue() {
      return Math.max(...this.chartData.map(item => item.value), 100)
    },
    
    // 处理后的图表数据
    chartData() {
      const { start, end } = getDateRange(this.timeRanges[this.timeRange].value)
      
      // 过滤日期范围内的数据
      return this.data
        .filter(item => {
          const date = new Date(item.date)
          return date >= start && date <= end
        })
        .map(item => ({
          value: item.value,
          label: this.formatLabel(new Date(item.date))
        }))
    }
  },
  
  methods: {
    // 切换时间范围
    handleTimeRangeChange(index) {
      this.timeRange = index
      this.$emit('range-change', this.timeRanges[index].value)
    },
    
    // 格式化标签
    formatLabel(date) {
      switch (this.timeRanges[this.timeRange].value) {
        case 'week':
          return ['日', '一', '二', '三', '四', '五', '六'][date.getDay()]
        case 'month':
          return date.getDate() + '日'
        case 'year':
          return (date.getMonth() + 1) + '月'
        default:
          return formatDate(date, 'MM-DD')
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.trend-chart {
  padding: 16px;
  border-radius: 12px;
  
  .chart-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
    
    .chart-title {
      font-size: 16px;
      font-weight: 500;
    }
  }
  
  .chart-content {
    position: relative;
    
    .chart-container {
      display: flex;
      position: relative;
      padding: 20px 40px;
      
      .y-axis {
        position: absolute;
        left: 0;
        top: 0;
        bottom: 20px;
        width: 40px;
        display: flex;
        flex-direction: column-reverse;
        justify-content: space-between;
        
        .axis-label {
          font-size: 12px;
          text-align: right;
        }
      }
      
      .chart-body {
        flex: 1;
        position: relative;
        margin-bottom: 20px;
        
        .grid-line {
          position: absolute;
          left: 0;
          right: 0;
          border-top: 1px dashed;
        }
        
        .data-line {
          position: absolute;
          left: 0;
          right: 0;
          top: 0;
          bottom: 0;
          
          .data-point {
            position: absolute;
            transform: translate(-50%, 50%);
            
            .point {
              width: 8px;
              height: 8px;
              border-radius: 4px;
              margin-bottom: 4px;
            }
            
            .point-label {
              position: absolute;
              left: 50%;
              bottom: 100%;
              transform: translateX(-50%);
              font-size: 12px;
              white-space: nowrap;
            }
          }
        }
      }
      
      .x-axis {
        position: absolute;
        left: 40px;
        right: 0;
        bottom: 0;
        height: 20px;
        
        .axis-label {
          position: absolute;
          font-size: 12px;
        }
      }
    }
  }
  
  .chart-footer {
    margin-top: 16px;
    display: flex;
    justify-content: center;
    
    .legend-item {
      display: flex;
      align-items: center;
      
      .legend-dot {
        width: 8px;
        height: 8px;
        border-radius: 4px;
        margin-right: 4px;
      }
      
      .legend-text {
        font-size: 12px;
      }
    }
  }
}
</style> 