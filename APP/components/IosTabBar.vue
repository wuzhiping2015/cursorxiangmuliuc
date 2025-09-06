<template>
  <view class="ios-tabbar" :style="tabbarStyle">
    <view class="tabbar-content">
      <view 
        v-for="(item, index) in tabs" 
        :key="index"
        class="tab-item"
        :class="{ active: currentTab === index }"
        @click="handleTabClick(index)"
      >
        <u-icon
          :name="currentTab === index ? item.selectedIcon : item.icon"
          :color="currentTab === index ? themeColors.info : themeColors.textSecondary"
          size="24"
        ></u-icon>
        <text 
          class="tab-text"
          :style="{ 
            color: currentTab === index ? themeColors.info : themeColors.textSecondary
          }"
        >{{ item.text }}</text>
      </view>
    </view>
    <!-- 底部安全区域占位 -->
    <view 
      class="safe-area-bottom"
      :style="{ height: safeAreaBottom + 'px' }"
    ></view>
  </view>
</template>

<script>
import themeMixin from '../mixins/theme'

export default {
  name: 'IosTabBar',
  
  mixins: [themeMixin],
  
  props: {
    // 标签页配置
    tabs: {
      type: Array,
      required: true,
      validator: value => {
        return value.every(tab => {
          return typeof tab.text === 'string' &&
                 typeof tab.icon === 'string' &&
                 typeof tab.selectedIcon === 'string' &&
                 typeof tab.pagePath === 'string'
        })
      }
    },
    // 当前选中的标签页
    value: {
      type: Number,
      default: 0
    },
    // 是否使用毛玻璃效果
    blur: {
      type: Boolean,
      default: true
    }
  },
  
  data() {
    return {
      currentTab: this.value,
      safeAreaBottom: 0
    }
  },
  
  computed: {
    // 标签栏样式
    tabbarStyle() {
      const style = {
        backgroundColor: this.blur ? 'rgba(255, 255, 255, 0.8)' : '#ffffff'
      }
      
      if (this.blur) {
        style.backdropFilter = 'blur(10px)'
        style.webkitBackdropFilter = 'blur(10px)'
      }
      
      return style
    }
  },
  
  watch: {
    value: {
      handler(newVal) {
        this.currentTab = newVal
      },
      immediate: true
    }
  },
  
  created() {
    // 获取底部安全区域高度
    const app = getApp()
    if (app.globalData && app.globalData.safeAreaBottom) {
      this.safeAreaBottom = app.globalData.safeAreaBottom
    }
  },
  
  methods: {
    // 处理标签点击
    handleTabClick(index) {
      if (this.currentTab === index) return
      
      this.currentTab = index
      this.$emit('input', index)
      
      // 切换页面
      uni.switchTab({
        url: this.tabs[index].pagePath
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.ios-tabbar {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 100;
  border-top: 0.5px solid var(--border-color);
  
  .tabbar-content {
    height: 49px;
    display: flex;
    align-items: center;
    justify-content: space-around;
    
    .tab-item {
      flex: 1;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      padding: 4px 0;
      
      .tab-text {
        font-size: 10px;
        margin-top: 4px;
        transform: scale(0.9);
      }
      
      &.active {
        .tab-text {
          transform: scale(1);
          transition: transform 0.2s ease;
        }
      }
    }
  }
  
  .safe-area-bottom {
    width: 100%;
    background-color: inherit;
  }
}
</style> 