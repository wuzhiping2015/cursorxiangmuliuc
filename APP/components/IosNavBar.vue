<template>
  <view class="ios-navbar" :style="navbarStyle">
    <!-- 状态栏占位 -->
    <view class="status-bar" :style="{ height: statusBarHeight + 'px' }"></view>
    
    <!-- 导航栏内容 -->
    <view class="navbar-content">
      <!-- 返回按钮 -->
      <view v-if="showBack" class="left-area" @click="handleBack">
        <view class="back-button">
          <u-icon name="arrow-left" :color="themeColors.text" size="20"></u-icon>
          <text class="back-text" :style="{ color: themeColors.text }">返回</text>
        </view>
      </view>
      <view v-else class="left-area">
        <slot name="left"></slot>
      </view>
      
      <!-- 标题 -->
      <view class="title-area">
        <text class="title" :style="{ color: themeColors.text }">{{ title }}</text>
        <text v-if="subtitle" class="subtitle" :style="{ color: themeColors.textSecondary }">{{ subtitle }}</text>
      </view>
      
      <!-- 右侧按钮区域 -->
      <view class="right-area">
        <slot name="right">
          <u-button 
            v-if="rightText"
            type="primary" 
            size="mini" 
            :text="rightText"
            @click="handleRightClick"
          ></u-button>
        </slot>
      </view>
    </view>
  </view>
</template>

<script>
import themeMixin from '../mixins/theme'

export default {
  name: 'IosNavBar',
  
  mixins: [themeMixin],
  
  props: {
    // 标题
    title: {
      type: String,
      default: ''
    },
    // 副标题
    subtitle: {
      type: String,
      default: ''
    },
    // 是否显示返回按钮
    showBack: {
      type: Boolean,
      default: true
    },
    // 右侧按钮文本
    rightText: {
      type: String,
      default: ''
    },
    // 是否透明
    transparent: {
      type: Boolean,
      default: false
    },
    // 是否使用毛玻璃效果
    blur: {
      type: Boolean,
      default: true
    }
  },
  
  data() {
    return {
      // 状态栏高度
      statusBarHeight: 20
    }
  },
  
  computed: {
    // 导航栏样式
    navbarStyle() {
      const style = {}
      
      if (this.transparent) {
        style.backgroundColor = 'transparent'
      } else {
        style.backgroundColor = this.blur ? 'rgba(255, 255, 255, 0.8)' : '#ffffff'
        if (this.blur) {
          style.backdropFilter = 'blur(10px)'
          style.webkitBackdropFilter = 'blur(10px)'
        }
      }
      
      return style
    }
  },
  
  created() {
    // 获取状态栏高度
    const app = getApp()
    if (app.globalData && app.globalData.statusBarHeight) {
      this.statusBarHeight = app.globalData.statusBarHeight
    }
  },
  
  methods: {
    // 返回上一页
    handleBack() {
      uni.navigateBack({
        delta: 1
      })
    },
    
    // 右侧按钮点击事件
    handleRightClick() {
      this.$emit('right-click')
    }
  }
}
</script>

<style lang="scss" scoped>
.ios-navbar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
  
  .navbar-content {
    height: 44px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 16px;
    border-bottom: 0.5px solid var(--border-color);
    
    .left-area {
      min-width: 60px;
      
      .back-button {
        display: flex;
        align-items: center;
        height: 100%;
        
        .back-text {
          font-size: 17px;
          margin-left: 4px;
        }
      }
    }
    
    .title-area {
      flex: 1;
      text-align: center;
      
      .title {
        font-size: 17px;
        font-weight: 600;
      }
      
      .subtitle {
        font-size: 12px;
        margin-top: 2px;
      }
    }
    
    .right-area {
      min-width: 60px;
      display: flex;
      justify-content: flex-end;
    }
  }
}
</style> 