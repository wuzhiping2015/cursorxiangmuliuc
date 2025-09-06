<template>
  <view class="calendar" :style="themeStyles.card">
    <!-- 日历头部 -->
    <view class="calendar-header">
      <view class="month-selector">
        <u-icon 
          name="arrow-left" 
          :color="themeColors.icon" 
          size="20"
          @click="prevMonth"
        ></u-icon>
        <text class="month-text" :style="themeStyles.text.primary">
          {{ currentYear }}年{{ currentMonth + 1 }}月
        </text>
        <u-icon 
          name="arrow-right" 
          :color="themeColors.icon" 
          size="20"
          @click="nextMonth"
        ></u-icon>
      </view>
      <view class="week-days">
        <text 
          v-for="day in weekDays" 
          :key="day"
          class="week-day"
          :style="themeStyles.text.secondary"
        >{{ day }}</text>
      </view>
    </view>

    <!-- 日历主体 -->
    <view class="calendar-body">
      <view 
        v-for="(week, weekIndex) in calendar" 
        :key="weekIndex"
        class="week"
      >
        <view 
          v-for="(day, dayIndex) in week" 
          :key="dayIndex"
          class="day"
          :class="{
            'current-month': day.currentMonth,
            'today': day.isToday,
            'selected': isSelected(day.date),
            'checked': isChecked(day.date)
          }"
          :style="getDayStyle(day)"
          @click="selectDate(day)"
        >
          <text class="day-text">{{ day.dayOfMonth }}</text>
          <view 
            v-if="isChecked(day.date)"
            class="check-mark"
          >
            <u-icon name="checkmark" color="#ffffff" size="12"></u-icon>
          </view>
        </view>
      </view>
    </view>

    <!-- 日历底部 -->
    <view v-if="showLegend" class="calendar-footer">
      <view class="legend-item">
        <view 
          class="legend-dot"
          :style="{ backgroundColor: themeColors.success }"
        ></view>
        <text class="legend-text" :style="themeStyles.text.secondary">已完成</text>
      </view>
      <view class="legend-item">
        <view 
          class="legend-dot"
          :style="{ backgroundColor: themeColors.warning }"
        ></view>
        <text class="legend-text" :style="themeStyles.text.secondary">今天</text>
      </view>
      <view class="legend-item">
        <view 
          class="legend-dot"
          :style="{ backgroundColor: themeColors.info }"
        ></view>
        <text class="legend-text" :style="themeStyles.text.secondary">已选择</text>
      </view>
    </view>
  </view>
</template>

<script>
import themeMixin from '../mixins/theme'
import { formatDate } from '../utils/date'

export default {
  name: 'Calendar',
  
  mixins: [themeMixin],
  
  props: {
    // 选中的日期
    value: {
      type: Date,
      default: () => new Date()
    },
    // 打卡记录
    checkInDates: {
      type: Array,
      default: () => []
    },
    // 是否显示图例
    showLegend: {
      type: Boolean,
      default: true
    }
  },
  
  data() {
    return {
      currentDate: new Date(this.value),
      weekDays: ['日', '一', '二', '三', '四', '五', '六']
    }
  },
  
  computed: {
    // 当前年份
    currentYear() {
      return this.currentDate.getFullYear()
    },
    
    // 当前月份
    currentMonth() {
      return this.currentDate.getMonth()
    },
    
    // 日历数据
    calendar() {
      const calendar = []
      const firstDay = new Date(this.currentYear, this.currentMonth, 1)
      const lastDay = new Date(this.currentYear, this.currentMonth + 1, 0)
      
      // 获取当前月第一天是星期几
      const firstDayOfWeek = firstDay.getDay()
      
      // 获取上个月的最后几天
      const prevMonthLastDay = new Date(this.currentYear, this.currentMonth, 0)
      const prevMonthDays = []
      for (let i = firstDayOfWeek - 1; i >= 0; i--) {
        const date = new Date(prevMonthLastDay)
        date.setDate(prevMonthLastDay.getDate() - i)
        prevMonthDays.push({
          date,
          dayOfMonth: date.getDate(),
          currentMonth: false,
          isToday: this.isToday(date)
        })
      }
      
      // 获取当前月的天数
      const currentMonthDays = []
      for (let i = 1; i <= lastDay.getDate(); i++) {
        const date = new Date(this.currentYear, this.currentMonth, i)
        currentMonthDays.push({
          date,
          dayOfMonth: i,
          currentMonth: true,
          isToday: this.isToday(date)
        })
      }
      
      // 获取下个月的前几天
      const nextMonthDays = []
      const remainingDays = 42 - (prevMonthDays.length + currentMonthDays.length)
      for (let i = 1; i <= remainingDays; i++) {
        const date = new Date(this.currentYear, this.currentMonth + 1, i)
        nextMonthDays.push({
          date,
          dayOfMonth: i,
          currentMonth: false,
          isToday: this.isToday(date)
        })
      }
      
      // 组合日历数据
      const days = [...prevMonthDays, ...currentMonthDays, ...nextMonthDays]
      for (let i = 0; i < 6; i++) {
        calendar.push(days.slice(i * 7, (i + 1) * 7))
      }
      
      return calendar
    }
  },
  
  methods: {
    // 上个月
    prevMonth() {
      const date = new Date(this.currentDate)
      date.setMonth(date.getMonth() - 1)
      this.currentDate = date
    },
    
    // 下个月
    nextMonth() {
      const date = new Date(this.currentDate)
      date.setMonth(date.getMonth() + 1)
      this.currentDate = date
    },
    
    // 选择日期
    selectDate(day) {
      if (!day.currentMonth) {
        if (day.date < new Date(this.currentYear, this.currentMonth, 1)) {
          this.prevMonth()
        } else {
          this.nextMonth()
        }
      }
      this.$emit('input', day.date)
      this.$emit('change', day.date)
    },
    
    // 检查是否为今天
    isToday(date) {
      const today = new Date()
      return date.toDateString() === today.toDateString()
    },
    
    // 检查是否被选中
    isSelected(date) {
      return date.toDateString() === this.value.toDateString()
    },
    
    // 检查是否已打卡
    isChecked(date) {
      return this.checkInDates.some(checkInDate => 
        new Date(checkInDate).toDateString() === date.toDateString()
      )
    },
    
    // 获取日期样式
    getDayStyle(day) {
      const style = {
        color: this.themeColors.text
      }
      
      if (!day.currentMonth) {
        style.color = this.themeColors.textSecondary
      }
      
      if (day.isToday) {
        style.backgroundColor = this.themeColors.warning
        style.color = '#ffffff'
      }
      
      if (this.isSelected(day.date)) {
        style.backgroundColor = this.themeColors.info
        style.color = '#ffffff'
      }
      
      if (this.isChecked(day.date)) {
        style.backgroundColor = this.themeColors.success
        style.color = '#ffffff'
      }
      
      return style
    }
  }
}
</script>

<style lang="scss" scoped>
.calendar {
  padding: 16px;
  border-radius: 12px;
  
  .calendar-header {
    margin-bottom: 16px;
    
    .month-selector {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 16px;
      
      .month-text {
        font-size: 16px;
        font-weight: 500;
      }
    }
    
    .week-days {
      display: flex;
      justify-content: space-around;
      
      .week-day {
        width: 36px;
        text-align: center;
        font-size: 12px;
      }
    }
  }
  
  .calendar-body {
    .week {
      display: flex;
      justify-content: space-around;
      margin-bottom: 8px;
      
      .day {
        width: 36px;
        height: 36px;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 18px;
        position: relative;
        
        .day-text {
          font-size: 14px;
        }
        
        .check-mark {
          position: absolute;
          bottom: 2px;
          right: 2px;
          width: 16px;
          height: 16px;
          border-radius: 8px;
          background-color: rgba(255, 255, 255, 0.3);
          display: flex;
          align-items: center;
          justify-content: center;
        }
      }
    }
  }
  
  .calendar-footer {
    margin-top: 16px;
    display: flex;
    justify-content: center;
    
    .legend-item {
      display: flex;
      align-items: center;
      margin: 0 8px;
      
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