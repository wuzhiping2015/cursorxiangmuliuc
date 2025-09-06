<template>
  <view class="habit-card" :style="[themeStyles.card, cardStyle]" @click="handleClick">
    <!-- 习惯图标和名称 -->
    <view class="habit-header">
      <view class="habit-icon" :style="{ backgroundColor: habit.color || getHabitColor(habit) }">
        <u-icon :name="getHabitIcon(habit)" color="#ffffff" size="24"></u-icon>
      </view>
      <view class="habit-info">
        <text class="habit-name" :style="themeStyles.text.primary">{{ habit.name }}</text>
        <text class="habit-frequency" :style="themeStyles.text.secondary">{{ formatFrequency(habit.frequency) }}</text>
      </view>
      <view class="habit-actions">
        <u-icon 
          v-if="!hideActions"
          name="more-dot-fill" 
          :color="themeColors.icon" 
          size="20"
          @click.stop="showActionSheet"
        ></u-icon>
      </view>
    </view>

    <!-- 习惯进度 -->
    <view v-if="showProgress" class="habit-progress">
      <view class="progress-info">
        <text class="progress-text" :style="themeStyles.text.secondary">完成进度</text>
        <text class="progress-value" :style="themeStyles.text.primary">{{ progress }}%</text>
      </view>
      <u-line-progress
        :percentage="progress"
        :activeColor="habit.color || getHabitColor(habit)"
        height="4"
        :inactiveColor="themeColors.border"
      ></u-line-progress>
    </view>

    <!-- 习惯统计 -->
    <view v-if="showStats" class="habit-stats">
      <view class="stat-item">
        <text class="stat-value" :style="themeStyles.text.primary">{{ stats.currentStreak }}</text>
        <text class="stat-label" :style="themeStyles.text.secondary">连续天数</text>
      </view>
      <view class="stat-item">
        <text class="stat-value" :style="themeStyles.text.primary">{{ stats.totalDays }}</text>
        <text class="stat-label" :style="themeStyles.text.secondary">总打卡</text>
      </view>
      <view class="stat-item">
        <text class="stat-value" :style="themeStyles.text.primary">{{ stats.completionRate }}%</text>
        <text class="stat-label" :style="themeStyles.text.secondary">完成率</text>
      </view>
    </view>

    <!-- 打卡按钮 -->
    <view v-if="showCheckIn && !isCheckedIn" class="check-in-button">
      <u-button
        type="primary"
        :style="themeStyles.button.primary"
        @click.stop="handleCheckIn"
      >打卡</u-button>
    </view>
  </view>
</template>

<script>
import { mapGetters } from 'vuex'
import habitMixin from '../mixins/habit'
import themeMixin from '../mixins/theme'

export default {
  name: 'HabitCard',
  
  mixins: [habitMixin, themeMixin],
  
  props: {
    // 习惯数据
    habit: {
      type: Object,
      required: true
    },
    // 是否显示进度
    showProgress: {
      type: Boolean,
      default: true
    },
    // 是否显示统计
    showStats: {
      type: Boolean,
      default: true
    },
    // 是否显示打卡按钮
    showCheckIn: {
      type: Boolean,
      default: true
    },
    // 是否隐藏操作按钮
    hideActions: {
      type: Boolean,
      default: false
    },
    // 卡片样式
    cardStyle: {
      type: Object,
      default: () => ({})
    }
  },
  
  computed: {
    // 习惯统计数据
    stats() {
      return this.getHabitStats(this.habit)
    },
    
    // 习惯进度
    progress() {
      return this.calculateHabitProgress(this.habit)
    },
    
    // 是否已打卡
    isCheckedIn() {
      const today = new Date()
      return this.habit.checkInRecords.some(record => {
        const recordDate = new Date(record.date)
        return recordDate.toDateString() === today.toDateString()
      })
    }
  },
  
  methods: {
    // 点击卡片
    handleClick() {
      this.$emit('click', this.habit)
    },
    
    // 显示操作菜单
    showActionSheet() {
      uni.showActionSheet({
        itemList: ['编辑', '删除'],
        itemColor: this.themeColors.text,
        success: async (res) => {
          switch (res.tapIndex) {
            case 0:
              this.handleEditHabit(this.habit)
              break
            case 1:
              await this.handleDeleteHabit(this.habit)
              break
          }
        }
      })
    },
    
    // 打卡
    async handleCheckIn() {
      await this.handleCheckIn(this.habit)
      this.$emit('check-in', this.habit)
    }
  }
}
</script>

<style lang="scss" scoped>
.habit-card {
  padding: 16px;
  margin: 10px;
  border-radius: 12px;
  
  .habit-header {
    display: flex;
    align-items: center;
    margin-bottom: 16px;
    
    .habit-icon {
      width: 40px;
      height: 40px;
      border-radius: 20px;
      display: flex;
      align-items: center;
      justify-content: center;
      margin-right: 12px;
    }
    
    .habit-info {
      flex: 1;
      
      .habit-name {
        font-size: 16px;
        font-weight: 500;
        margin-bottom: 4px;
      }
      
      .habit-frequency {
        font-size: 12px;
      }
    }
    
    .habit-actions {
      padding: 4px;
    }
  }
  
  .habit-progress {
    margin-bottom: 16px;
    
    .progress-info {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 8px;
      
      .progress-text {
        font-size: 12px;
      }
      
      .progress-value {
        font-size: 14px;
        font-weight: 500;
      }
    }
  }
  
  .habit-stats {
    display: flex;
    justify-content: space-around;
    margin-bottom: 16px;
    
    .stat-item {
      text-align: center;
      
      .stat-value {
        font-size: 20px;
        font-weight: 600;
        margin-bottom: 4px;
      }
      
      .stat-label {
        font-size: 12px;
      }
    }
  }
  
  .check-in-button {
    margin-top: 16px;
  }
}
</style> 