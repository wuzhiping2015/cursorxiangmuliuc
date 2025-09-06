<template>
  <view class="habit-form">
    <!-- 基本信息 -->
    <view class="form-section">
      <view class="section-title">
        <text :style="themeStyles.text.primary">基本信息</text>
      </view>
      
      <!-- 习惯名称 -->
      <u-form-item label="习惯名称" required>
        <u-input
          v-model="formData.name"
          placeholder="请输入习惯名称"
          :style="themeStyles.input"
          @change="validateName"
        ></u-input>
        <text v-if="errors.name" class="error-text">{{ errors.name }}</text>
      </u-form-item>
      
      <!-- 习惯类型 -->
      <u-form-item label="习惯类型" required>
        <u-select
          v-model="formData.type"
          :list="habitTypes"
          placeholder="请选择习惯类型"
          :style="themeStyles.input"
        ></u-select>
      </u-form-item>
      
      <!-- 习惯颜色 -->
      <u-form-item label="习惯颜色">
        <view class="color-picker">
          <view
            v-for="color in colors"
            :key="color"
            class="color-item"
            :class="{ active: formData.color === color }"
            :style="{ backgroundColor: color }"
            @click="formData.color = color"
          ></view>
        </view>
      </u-form-item>
    </view>

    <!-- 频率设置 -->
    <view class="form-section">
      <view class="section-title">
        <text :style="themeStyles.text.primary">频率设置</text>
      </view>
      
      <!-- 频率类型 -->
      <u-form-item label="重复类型" required>
        <u-radio-group v-model="formData.frequency.type">
          <u-radio
            v-for="type in frequencyTypes"
            :key="type.value"
            :label="type.label"
            :name="type.value"
          ></u-radio>
        </u-radio-group>
      </u-form-item>
      
      <!-- 每周重复 -->
      <u-form-item v-if="formData.frequency.type === 'weekly'" label="重复日期">
        <u-checkbox-group v-model="formData.frequency.days">
          <u-checkbox
            v-for="(day, index) in weekDays"
            :key="index"
            :label="day"
            :name="index"
          ></u-checkbox>
        </u-checkbox-group>
        <text v-if="errors.days" class="error-text">{{ errors.days }}</text>
      </u-form-item>
      
      <!-- 自定义间隔 -->
      <u-form-item v-if="formData.frequency.type === 'custom'" label="间隔天数">
        <u-number-box
          v-model="formData.frequency.interval"
          :min="1"
          :max="30"
        ></u-number-box>
        <text v-if="errors.interval" class="error-text">{{ errors.interval }}</text>
      </u-form-item>
    </view>

    <!-- 目标设置 -->
    <view class="form-section">
      <view class="section-title">
        <text :style="themeStyles.text.primary">目标设置</text>
      </view>
      
      <!-- 是否设置目标 -->
      <u-form-item>
        <u-switch
          v-model="hasTarget"
          activeColor="#2979ff"
          @change="handleTargetSwitch"
        ></u-switch>
        <text class="switch-label" :style="themeStyles.text.secondary">设置目标</text>
      </u-form-item>
      
      <!-- 目标数值 -->
      <u-form-item v-if="hasTarget" label="目标数值">
        <u-number-box
          v-model="formData.target.total"
          :min="1"
          :max="999"
        ></u-number-box>
        <text v-if="errors.target" class="error-text">{{ errors.target }}</text>
      </u-form-item>
    </view>

    <!-- 提醒设置 -->
    <view class="form-section">
      <view class="section-title">
        <text :style="themeStyles.text.primary">提醒设置</text>
      </view>
      
      <!-- 是否开启提醒 -->
      <u-form-item>
        <u-switch
          v-model="formData.reminder.enabled"
          activeColor="#2979ff"
          @change="handleReminderSwitch"
        ></u-switch>
        <text class="switch-label" :style="themeStyles.text.secondary">开启提醒</text>
      </u-form-item>
      
      <!-- 提醒时间 -->
      <u-form-item v-if="formData.reminder.enabled" label="提醒时间">
        <u-time-picker
          v-model="formData.reminder.time"
          mode="time"
          :params="timeParams"
        ></u-time-picker>
      </u-form-item>
    </view>

    <!-- 备注 -->
    <view class="form-section">
      <view class="section-title">
        <text :style="themeStyles.text.primary">备注</text>
      </view>
      
      <u-form-item>
        <u-textarea
          v-model="formData.note"
          placeholder="添加备注信息"
          :style="themeStyles.input"
          height="100"
        ></u-textarea>
      </u-form-item>
    </view>

    <!-- 按钮 -->
    <view class="form-buttons">
      <u-button
        type="primary"
        :style="themeStyles.button.primary"
        @click="handleSubmit"
      >保存</u-button>
      <u-button
        type="default"
        :style="themeStyles.button.secondary"
        @click="handleCancel"
      >取消</u-button>
    </view>
  </view>
</template>

<script>
import themeMixin from '../mixins/theme'
import { validateHabitName, validateHabitFrequency, validateHabitTarget } from '../utils/validation'

export default {
  name: 'HabitForm',
  
  mixins: [themeMixin],
  
  props: {
    // 编辑模式的习惯数据
    habit: {
      type: Object,
      default: null
    }
  },
  
  data() {
    return {
      // 表单数据
      formData: {
        name: '',
        type: '',
        color: '#2979ff',
        frequency: {
          type: 'daily',
          days: [],
          interval: 1
        },
        target: {
          total: 1,
          current: 0
        },
        reminder: {
          enabled: false,
          time: '08:00'
        },
        note: ''
      },
      
      // 是否设置目标
      hasTarget: false,
      
      // 错误信息
      errors: {
        name: '',
        days: '',
        interval: '',
        target: ''
      },
      
      // 习惯类型选项
      habitTypes: [
        { label: '运动健身', value: 'exercise' },
        { label: '学习进修', value: 'study' },
        { label: '饮食健康', value: 'diet' },
        { label: '作息规律', value: 'sleep' },
        { label: '其他', value: 'other' }
      ],
      
      // 频率类型选项
      frequencyTypes: [
        { label: '每天', value: 'daily' },
        { label: '每周', value: 'weekly' },
        { label: '自定义', value: 'custom' }
      ],
      
      // 星期选项
      weekDays: ['周日', '周一', '周二', '周三', '周四', '周五', '周六'],
      
      // 颜色选项
      colors: [
        '#2979ff',
        '#ff5252',
        '#4caf50',
        '#ffc107',
        '#9c27b0',
        '#ff9800',
        '#795548',
        '#607d8b'
      ],
      
      // 时间选择器参数
      timeParams: {
        hour: {
          list: Array.from({ length: 24 }, (_, i) => i),
          default: 8
        },
        minute: {
          list: Array.from({ length: 60 }, (_, i) => i),
          default: 0
        }
      }
    }
  },
  
  created() {
    // 如果是编辑模式，初始化表单数据
    if (this.habit) {
      this.initFormData()
    }
  },
  
  methods: {
    // 初始化表单数据
    initFormData() {
      this.formData = {
        ...this.formData,
        ...this.habit,
        frequency: { ...this.formData.frequency, ...this.habit.frequency },
        target: { ...this.formData.target, ...this.habit.target },
        reminder: { ...this.formData.reminder, ...this.habit.reminder }
      }
      this.hasTarget = !!this.habit.target
    },
    
    // 验证表单
    validate() {
      let isValid = true
      
      // 验证名称
      const nameValidation = validateHabitName(this.formData.name)
      if (!nameValidation.isValid) {
        this.errors.name = nameValidation.message
        isValid = false
      } else {
        this.errors.name = ''
      }
      
      // 验证频率
      const frequencyValidation = validateHabitFrequency(this.formData.frequency)
      if (!frequencyValidation.isValid) {
        if (this.formData.frequency.type === 'weekly') {
          this.errors.days = frequencyValidation.message
        } else if (this.formData.frequency.type === 'custom') {
          this.errors.interval = frequencyValidation.message
        }
        isValid = false
      } else {
        this.errors.days = ''
        this.errors.interval = ''
      }
      
      // 验证目标
      if (this.hasTarget) {
        const targetValidation = validateHabitTarget(this.formData.target)
        if (!targetValidation.isValid) {
          this.errors.target = targetValidation.message
          isValid = false
        } else {
          this.errors.target = ''
        }
      }
      
      return isValid
    },
    
    // 验证名称
    validateName() {
      const validation = validateHabitName(this.formData.name)
      this.errors.name = validation.isValid ? '' : validation.message
    },
    
    // 处理目标开关
    handleTargetSwitch(value) {
      if (!value) {
        this.formData.target = {
          total: 1,
          current: 0
        }
      }
    },
    
    // 处理提醒开关
    handleReminderSwitch(value) {
      if (!value) {
        this.formData.reminder.time = '08:00'
      }
    },
    
    // 提交表单
    handleSubmit() {
      if (this.validate()) {
        // 如果没有设置目标，删除目标数据
        if (!this.hasTarget) {
          delete this.formData.target
        }
        
        this.$emit('submit', this.formData)
      }
    },
    
    // 取消
    handleCancel() {
      this.$emit('cancel')
    }
  }
}
</script>

<style lang="scss" scoped>
.habit-form {
  padding: 16px;
  
  .form-section {
    margin-bottom: 24px;
    
    .section-title {
      font-size: 16px;
      font-weight: 500;
      margin-bottom: 16px;
    }
  }
  
  .color-picker {
    display: flex;
    flex-wrap: wrap;
    gap: 12px;
    
    .color-item {
      width: 32px;
      height: 32px;
      border-radius: 16px;
      cursor: pointer;
      
      &.active {
        transform: scale(1.2);
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
      }
    }
  }
  
  .switch-label {
    margin-left: 8px;
    font-size: 14px;
  }
  
  .error-text {
    color: #ff5252;
    font-size: 12px;
    margin-top: 4px;
  }
  
  .form-buttons {
    display: flex;
    gap: 16px;
    margin-top: 32px;
    
    .u-button {
      flex: 1;
    }
  }
}
</style> 