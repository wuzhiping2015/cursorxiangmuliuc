<template>
  <div class="data-list">
    <!-- 搜索栏 -->
    <div v-if="searchable" class="data-list-search">
      <div class="search-input-wrapper">
        <input
          v-model="searchKeyword"
          type="text"
          class="search-input"
          :placeholder="searchPlaceholder"
          @input="handleSearch"
        />
        <span class="search-icon">🔍</span>
      </div>
    </div>
    
    <!-- 筛选器 -->
    <div v-if="filters && filters.length > 0" class="data-list-filters">
      <div class="filter-tags">
        <span
          v-for="filter in filters"
          :key="filter.value"
          :class="getFilterClass(filter)"
          @click="handleFilterClick(filter)"
        >
          {{ filter.label }}
        </span>
      </div>
    </div>
    
    <!-- 列表容器 -->
    <div
      ref="listContainerRef"
      class="data-list-container"
      @scroll="handleScroll"
    >
      <!-- 下拉刷新提示 -->
      <div v-if="refreshable && pullDownStatus" class="pull-down-tip">
        <div class="tip-content">
          <span class="tip-icon">{{ pullDownIcon }}</span>
          <span class="tip-text">{{ pullDownText }}</span>
        </div>
      </div>
      
      <!-- 列表内容 -->
      <div class="data-list-content">
        <!-- 有数据时显示列表 -->
        <template v-if="displayList.length > 0">
          <div
            v-for="(item, index) in displayList"
            :key="getItemKey(item, index)"
            class="data-list-item"
            @click="handleItemClick(item, index)"
          >
            <slot name="item" :item="item" :index="index">
              <!-- 默认列表项 -->
              <div class="default-list-item">
                <div class="item-main">
                  <div class="item-title">{{ getItemTitle(item) }}</div>
                  <div class="item-description">{{ getItemDescription(item) }}</div>
                </div>
                <div class="item-extra">
                  <div class="item-value">{{ getItemValue(item) }}</div>
                  <div class="item-time">{{ getItemTime(item) }}</div>
                </div>
              </div>
            </slot>
          </div>
        </template>
        
        <!-- 空状态 -->
        <div v-else-if="!loading && !initialLoading" class="data-list-empty">
          <slot name="empty">
            <div class="empty-content">
              <div class="empty-icon">📝</div>
              <div class="empty-text">{{ emptyText }}</div>
              <button v-if="emptyButtonText" class="empty-button" @click="handleEmptyButtonClick">
                {{ emptyButtonText }}
              </button>
            </div>
          </slot>
        </div>
      </div>
      
      <!-- 底部加载更多 -->
      <div v-if="loadMoreEnabled" class="data-list-footer">
        <div v-if="loadingMore" class="loading-more">
          <span class="loading-icon">⏳</span>
          <span class="loading-text">加载中...</span>
        </div>
        <div v-else-if="hasMore" class="load-more-button" @click="handleLoadMore">
          点击加载更多
        </div>
        <div v-else-if="displayList.length > 0" class="no-more-data">
          没有更多数据了
        </div>
      </div>
    </div>
    
    <!-- 全局加载状态 -->
    <div v-if="initialLoading" class="data-list-loading">
      <Loading :visible="true" text="数据加载中..." />
    </div>
  </div>
</template>

<script setup>
/**
 * 数据列表组件
 * 支持搜索、筛选、下拉刷新、上拉加载等功能
 * @author 前端工程师团队
 * @date 2024-12-XX
 */
import { ref, computed, watch, onMounted, onUnmounted } from 'vue'
import Loading from './Loading.vue'

// Props 定义
const props = defineProps({
  /** 列表数据 */
  data: {
    type: Array,
    default: () => []
  },
  /** 是否可搜索 */
  searchable: {
    type: Boolean,
    default: false
  },
  /** 搜索占位符 */
  searchPlaceholder: {
    type: String,
    default: '请输入搜索关键词'
  },
  /** 搜索字段 */
  searchFields: {
    type: Array,
    default: () => ['title', 'description']
  },
  /** 筛选器配置 */
  filters: {
    type: Array,
    default: () => []
  },
  /** 是否支持下拉刷新 */
  refreshable: {
    type: Boolean,
    default: false
  },
  /** 是否支持加载更多 */
  loadMoreEnabled: {
    type: Boolean,
    default: false
  },
  /** 是否还有更多数据 */
  hasMore: {
    type: Boolean,
    default: false
  },
  /** 是否正在加载更多 */
  loadingMore: {
    type: Boolean,
    default: false
  },
  /** 初始加载状态 */
  loading: {
    type: Boolean,
    default: false
  },
  /** 空状态文本 */
  emptyText: {
    type: String,
    default: '暂无数据'
  },
  /** 空状态按钮文本 */
  emptyButtonText: {
    type: String,
    default: ''
  },
  /** 列表项键值字段 */
  itemKey: {
    type: String,
    default: 'id'
  }
})

// Events 定义
const emit = defineEmits([
  'search',
  'filter-change',
  'item-click',
  'refresh',
  'load-more',
  'empty-button-click'
])

// 响应式数据
const searchKeyword = ref('')
const activeFilter = ref(null)
const listContainerRef = ref(null)
const pullDownStatus = ref(false)
const pullDownDistance = ref(0)
const initialLoading = ref(props.loading)

// 下拉刷新相关
const pullDownIcon = computed(() => {
  if (pullDownDistance.value > 80) return '↻'
  return '↓'
})

const pullDownText = computed(() => {
  if (pullDownDistance.value > 80) return '释放刷新'
  return '下拉刷新'
})

/**
 * 筛选后的列表数据
 */
const displayList = computed(() => {
  let result = [...props.data]
  
  // 应用筛选器
  if (activeFilter.value) {
    result = result.filter(item => {
      if (typeof activeFilter.value.filter === 'function') {
        return activeFilter.value.filter(item)
      }
      return true
    })
  }
  
  // 应用搜索
  if (searchKeyword.value.trim()) {
    const keyword = searchKeyword.value.toLowerCase()
    result = result.filter(item => {
      return props.searchFields.some(field => {
        const value = item[field]
        return value && value.toString().toLowerCase().includes(keyword)
      })
    })
  }
  
  return result
})

/**
 * 获取筛选器样式类
 * @param {Object} filter 筛选器对象
 */
const getFilterClass = (filter) => {
  return [
    'filter-tag',
    {
      'filter-tag--active': activeFilter.value?.value === filter.value
    }
  ]
}

/**
 * 获取列表项唯一键
 * @param {Object} item 列表项
 * @param {number} index 索引
 */
const getItemKey = (item, index) => {
  return item[props.itemKey] || index
}

/**
 * 获取列表项标题
 * @param {Object} item 列表项
 */
const getItemTitle = (item) => {
  return item.title || item.name || ''
}

/**
 * 获取列表项描述
 * @param {Object} item 列表项
 */
const getItemDescription = (item) => {
  return item.description || item.subtitle || ''
}

/**
 * 获取列表项值
 * @param {Object} item 列表项
 */
const getItemValue = (item) => {
  return item.value || item.amount || ''
}

/**
 * 获取列表项时间
 * @param {Object} item 列表项
 */
const getItemTime = (item) => {
  if (item.time) return item.time
  if (item.createTime) return item.createTime
  if (item.updatedAt) return item.updatedAt
  return ''
}

/**
 * 处理搜索
 */
const handleSearch = () => {
  emit('search', searchKeyword.value)
}

/**
 * 处理筛选器点击
 * @param {Object} filter 筛选器对象
 */
const handleFilterClick = (filter) => {
  if (activeFilter.value?.value === filter.value) {
    activeFilter.value = null
  } else {
    activeFilter.value = filter
  }
  emit('filter-change', activeFilter.value)
}

/**
 * 处理列表项点击
 * @param {Object} item 列表项
 * @param {number} index 索引
 */
const handleItemClick = (item, index) => {
  emit('item-click', item, index)
}

/**
 * 处理滚动事件
 * @param {Event} event 滚动事件
 */
const handleScroll = (event) => {
  const { scrollTop, scrollHeight, clientHeight } = event.target
  
  // 检查是否到达底部，触发加载更多
  if (props.loadMoreEnabled && props.hasMore && !props.loadingMore) {
    if (scrollTop + clientHeight >= scrollHeight - 100) {
      handleLoadMore()
    }
  }
}

/**
 * 处理下拉刷新
 */
const handleRefresh = () => {
  if (props.refreshable) {
    emit('refresh')
  }
}

/**
 * 处理加载更多
 */
const handleLoadMore = () => {
  if (props.loadMoreEnabled && props.hasMore && !props.loadingMore) {
    emit('load-more')
  }
}

/**
 * 处理空状态按钮点击
 */
const handleEmptyButtonClick = () => {
  emit('empty-button-click')
}

// 监听加载状态变化
watch(() => props.loading, (newVal) => {
  if (!newVal) {
    initialLoading.value = false
  }
})

// 组件挂载
onMounted(() => {
  // 可以在这里初始化下拉刷新等功能
})

onUnmounted(() => {
  // 清理工作
})
</script>

<style lang="scss" scoped>
@use "@/assets/styles/variables.scss" as *;
@use "@/assets/styles/mixins.scss" as *;
.data-list {
  position: relative;
  height: 100%;
  display: flex;
  flex-direction: column;
}

// 搜索栏
.data-list-search {
  padding: $spacing-base;
  background-color: $background-color;
  border-bottom: 1px solid $border-color-light;
  
  .search-input-wrapper {
    position: relative;
    
    .search-input {
      width: 100%;
      padding: $spacing-sm $spacing-base;
      padding-right: 40px;
      border: 1px solid $border-color;
      border-radius: $border-radius-lg;
      background-color: $background-color-light;
      font-size: $font-size-base;
      outline: none;
      @include transition(border-color);
      
      &:focus {
        border-color: $primary-color;
      }
      
      &::placeholder {
        color: $text-color-disabled;
      }
    }
    
    .search-icon {
      position: absolute;
      right: $spacing-base;
      top: 50%;
      transform: translateY(-50%);
      color: $text-color-disabled;
    }
  }
}

// 筛选器
.data-list-filters {
  padding: $spacing-base;
  background-color: $background-color;
  border-bottom: 1px solid $border-color-light;
  
  .filter-tags {
    display: flex;
    gap: $spacing-sm;
    flex-wrap: wrap;
  }
  
  .filter-tag {
    padding: $spacing-xs $spacing-sm;
    border: 1px solid $border-color;
    border-radius: $border-radius-base;
    font-size: $font-size-sm;
    color: $text-color-secondary;
    cursor: pointer;
    @include transition(all);
    
    &:hover {
      border-color: $primary-color;
      color: $primary-color;
    }
    
    &--active {
      background-color: $primary-color;
      border-color: $primary-color;
      color: white;
    }
  }
}

// 列表容器
.data-list-container {
  flex: 1;
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
}

// 下拉刷新提示
.pull-down-tip {
  padding: $spacing-base;
  text-align: center;
  background-color: $background-color-light;
  
  .tip-content {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: $spacing-xs;
    color: $text-color-secondary;
    font-size: $font-size-sm;
  }
}

// 列表内容
.data-list-content {
  min-height: 100%;
}

// 列表项
.data-list-item {
  padding: $spacing-base;
  border-bottom: 1px solid $border-color-light;
  cursor: pointer;
  @include transition(background-color);
  
  &:hover {
    background-color: $background-color-light;
  }
  
  &:last-child {
    border-bottom: none;
  }
}

// 默认列表项样式
.default-list-item {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: $spacing-base;
  
  .item-main {
    flex: 1;
    min-width: 0;
  }
  
  .item-title {
    font-size: $font-size-base;
    font-weight: $font-weight-medium;
    color: $text-color-primary;
    margin-bottom: $spacing-xs;
    @include text-ellipsis();
  }
  
  .item-description {
    font-size: $font-size-sm;
    color: $text-color-secondary;
    @include text-ellipsis();
  }
  
  .item-extra {
    flex-shrink: 0;
    text-align: right;
  }
  
  .item-value {
    font-size: $font-size-base;
    font-weight: $font-weight-medium;
    color: $text-color-primary;
    margin-bottom: $spacing-xs;
  }
  
  .item-time {
    font-size: $font-size-sm;
    color: $text-color-disabled;
  }
}

// 空状态
.data-list-empty {
  @include center;
  padding: $spacing-xxl $spacing-base;
  
  .empty-content {
    text-align: center;
    max-width: 240px;
  }
  
  .empty-icon {
    font-size: 48px;
    margin-bottom: $spacing-base;
    opacity: 0.5;
  }
  
  .empty-text {
    font-size: $font-size-base;
    color: $text-color-disabled;
    margin-bottom: $spacing-base;
  }
  
  .empty-button {
    @include button-base($primary-color, white);
    padding: $spacing-sm $spacing-base;
  }
}

// 底部加载
.data-list-footer {
  padding: $spacing-base;
  text-align: center;
  
  .loading-more {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: $spacing-xs;
    color: $text-color-secondary;
    font-size: $font-size-sm;
  }
  
  .load-more-button {
    padding: $spacing-sm $spacing-base;
    color: $primary-color;
    cursor: pointer;
    @include transition(color);
    
    &:hover {
      color: $primary-dark;
    }
  }
  
  .no-more-data {
    font-size: $font-size-sm;
    color: $text-color-disabled;
  }
}

// 全局加载
.data-list-loading {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
}

// 移动端适配
@include respond-to(xs) {
  .data-list-search,
  .data-list-filters {
    padding: $spacing-sm $spacing-base;
  }
  
  .data-list-item {
    padding: $spacing-sm $spacing-base;
  }
  
  .default-list-item {
    gap: $spacing-sm;
  }
  
  .empty-icon {
    font-size: 40px;
  }
}
</style>