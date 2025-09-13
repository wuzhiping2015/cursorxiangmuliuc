<template>
  <Dialog
    v-model:visible="isVisible"
    modal
    :closable="false"
    class="search-modal"
    :style="{ width: '90vw', maxWidth: '600px' }"
    :content-style="{ padding: 0 }"
  >
    <template #container="{ closeCallback }">
      <div class="flex flex-col bg-white dark:bg-gray-900 rounded-xl shadow-2xl overflow-hidden">
        <!-- 搜索头部 -->
        <div class="flex items-center border-b border-gray-200 dark:border-gray-700 p-4">
          <Icon name="heroicons:magnifying-glass" class="w-5 h-5 text-gray-400 mr-3" />
          <input
            ref="searchInput"
            v-model="searchQuery"
            type="text"
            placeholder="搜索AI工具、文章、技术内容..."
            class="flex-1 bg-transparent text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 border-0 focus:ring-0 focus:outline-none text-lg"
            @keydown.enter="performSearch"
            @keydown.escape="closeCallback()"
            @keydown.down.prevent="navigateResults(1)"
            @keydown.up.prevent="navigateResults(-1)"
          />
          <div class="flex items-center space-x-2 text-xs text-gray-400">
            <kbd class="px-2 py-1 bg-gray-100 dark:bg-gray-800 rounded">Enter</kbd>
            <span>搜索</span>
            <kbd class="px-2 py-1 bg-gray-100 dark:bg-gray-800 rounded">Esc</kbd>
            <span>关闭</span>
          </div>
        </div>

        <!-- 搜索结果 -->
        <div class="max-h-96 overflow-y-auto">
          <!-- 加载状态 -->
          <div v-if="isSearching" class="flex items-center justify-center py-8">
            <ProgressSpinner class="w-6 h-6" />
            <span class="ml-3 text-gray-600 dark:text-gray-400">搜索中...</span>
          </div>

          <!-- 搜索结果 -->
          <div v-else-if="searchResults.length > 0" class="divide-y divide-gray-200 dark:divide-gray-700">
            <div
              v-for="(result, index) in searchResults"
              :key="result.id"
              :class="[
                'flex items-start p-4 hover:bg-gray-50 dark:hover:bg-gray-800 cursor-pointer transition-colors',
                index === selectedIndex && 'bg-blue-50 dark:bg-blue-900/20'
              ]"
              @click="selectResult(result)"
              @mouseenter="selectedIndex = index"
            >
              <!-- 结果图标 -->
              <div class="flex-shrink-0 mr-3 mt-1">
                <div :class="[
                  'w-8 h-8 rounded-lg flex items-center justify-center',
                  result.type === 'tool' && 'bg-blue-100 dark:bg-blue-900/30',
                  result.type === 'blog' && 'bg-green-100 dark:bg-green-900/30',
                  result.type === 'page' && 'bg-purple-100 dark:bg-purple-900/30'
                ]">
                  <Icon 
                    :name="getResultIcon(result.type)" 
                    :class="[
                      'w-4 h-4',
                      result.type === 'tool' && 'text-blue-600 dark:text-blue-400',
                      result.type === 'blog' && 'text-green-600 dark:text-green-400',
                      result.type === 'page' && 'text-purple-600 dark:text-purple-400'
                    ]"
                  />
                </div>
              </div>

              <!-- 结果内容 -->
              <div class="flex-1 min-w-0">
                <div class="flex items-center space-x-2 mb-1">
                  <h4 class="text-sm font-medium text-gray-900 dark:text-white truncate">
                    {{ result.title }}
                  </h4>
                  <span :class="[
                    'px-2 py-0.5 text-xs rounded-full',
                    result.type === 'tool' && 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300',
                    result.type === 'blog' && 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300',
                    result.type === 'page' && 'bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300'
                  ]">
                    {{ getTypeLabel(result.type) }}
                  </span>
                </div>
                <p class="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
                  {{ result.description }}
                </p>
                <div v-if="result.tags" class="flex items-center space-x-1 mt-2">
                  <Tag
                    v-for="tag in result.tags.slice(0, 3)"
                    :key="tag"
                    :value="tag"
                    severity="secondary"
                    rounded
                    class="!text-xs !py-1 !px-2"
                  />
                </div>
              </div>

              <!-- 操作提示 -->
              <div class="flex-shrink-0 ml-3">
                <Icon name="heroicons:arrow-right" class="w-4 h-4 text-gray-400" />
              </div>
            </div>
          </div>

          <!-- 空状态 -->
          <div v-else-if="searchQuery && !isSearching" class="text-center py-8">
            <Icon name="heroicons:magnifying-glass" class="w-12 h-12 text-gray-400 mx-auto mb-3" />
            <h3 class="text-sm font-medium text-gray-900 dark:text-white mb-1">
              没有找到相关结果
            </h3>
            <p class="text-sm text-gray-600 dark:text-gray-400">
              尝试使用不同的关键词搜索
            </p>
          </div>

          <!-- 默认建议 -->
          <div v-else class="p-4">
            <h3 class="text-sm font-medium text-gray-900 dark:text-white mb-3">热门搜索</h3>
            <div class="space-y-2">
              <button
                v-for="suggestion in popularSearches"
                :key="suggestion"
                @click="searchQuery = suggestion; performSearch()"
                class="flex items-center w-full text-left p-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
              >
                <Icon name="heroicons:clock" class="w-4 h-4 text-gray-400 mr-2" />
                {{ suggestion }}
              </button>
            </div>
          </div>
        </div>

        <!-- 搜索提示 -->
        <div class="border-t border-gray-200 dark:border-gray-700 p-3 bg-gray-50 dark:bg-gray-800">
          <div class="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
            <div class="flex items-center space-x-4">
              <div class="flex items-center space-x-1">
                <kbd class="px-1.5 py-0.5 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded">↑</kbd>
                <kbd class="px-1.5 py-0.5 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded">↓</kbd>
                <span>导航</span>
              </div>
              <div class="flex items-center space-x-1">
                <kbd class="px-1.5 py-0.5 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded">Enter</kbd>
                <span>选择</span>
              </div>
            </div>
            <span>{{ searchResults.length }} 个结果</span>
          </div>
        </div>
      </div>
    </template>
  </Dialog>
</template>

<script setup lang="ts">
import { watchDebounced } from '@vueuse/core'
/**
 * 搜索模态框组件
 * 提供全站搜索功能，支持工具、文章、页面搜索
 */

interface SearchResult {
  id: string
  title: string
  description: string
  url: string
  type: 'tool' | 'blog' | 'page'
  tags?: string[]
  category?: string
}

interface Props {
  visible: boolean
}

interface Emits {
  (e: 'update:visible', value: boolean): void
}

const props = defineProps<Props>()
const emit = defineEmits<Emits>()

// 响应式数据
const searchQuery = ref('')
const isSearching = ref(false)
const searchResults = ref<SearchResult[]>([])
const selectedIndex = ref(0)
const searchInput = ref<HTMLInputElement>()

// 计算属性
const isVisible = computed({
  get: () => props.visible,
  set: (value) => emit('update:visible', value)
})

// 热门搜索建议
const popularSearches = [
  'ChatGPT',
  'Cursor AI编程',
  'Claude',
  'AI工作流',
  '前端开发',
  'GitHub Copilot',
  'Perplexity搜索',
  'AI工具推荐'
]

// 方法
const getResultIcon = (type: string) => {
  switch (type) {
    case 'tool': return 'mdi:robot'
    case 'blog': return 'heroicons:document-text'
    case 'page': return 'heroicons:globe-alt'
    default: return 'heroicons:document'
  }
}

const getTypeLabel = (type: string) => {
  switch (type) {
    case 'tool': return 'AI工具'
    case 'blog': return '博客'
    case 'page': return '页面'
    default: return '其他'
  }
}

const performSearch = async () => {
  if (!searchQuery.value.trim()) return

  isSearching.value = true
  selectedIndex.value = 0

  try {
    // 模拟搜索延迟
    await new Promise(resolve => setTimeout(resolve, 300))

    // 这里应该调用实际的搜索API
    // 现在使用模拟数据
    const mockResults: SearchResult[] = [
      {
        id: '1',
        title: 'ChatGPT - OpenAI的智能对话AI',
        description: 'OpenAI开发的强大对话AI，擅长代码生成、问题解答和创意协作',
        url: '/tools/chatgpt',
        type: 'tool',
        tags: ['对话AI', '代码生成', '问题解答'],
        category: 'ai-chat'
      },
      {
        id: '2',
        title: 'Cursor - 最强AI编程IDE',
        description: '集成AI的现代代码编辑器，支持智能代码生成和重构',
        url: '/tools/cursor',
        type: 'tool',
        tags: ['IDE', '代码生成', '重构'],
        category: 'ai-coding'
      },
      {
        id: '3',
        title: '深度解读：滴滴工程师的AI工作流实践',
        description: '基于滴滴前端工程师实践经验，深度解析AI融入开发工作流的6大应用场景',
        url: '/blog/ai-workflow-analysis',
        type: 'blog',
        tags: ['AI工作流', '开发效率', '最佳实践']
      }
    ]

    // 根据搜索词过滤结果
    const query = searchQuery.value.toLowerCase()
    searchResults.value = mockResults.filter(result =>
      result.title.toLowerCase().includes(query) ||
      result.description.toLowerCase().includes(query) ||
      result.tags?.some(tag => tag.toLowerCase().includes(query))
    )

  } catch (error) {
    console.error('搜索失败:', error)
    searchResults.value = []
  } finally {
    isSearching.value = false
  }
}

const navigateResults = (direction: number) => {
  if (searchResults.value.length === 0) return

  selectedIndex.value = Math.max(
    0,
    Math.min(searchResults.value.length - 1, selectedIndex.value + direction)
  )
}

const selectResult = (result: SearchResult) => {
  // 关闭搜索模态框
  isVisible.value = false

  // 导航到结果页面
  if (result.url.startsWith('http')) {
    window.open(result.url, '_blank')
  } else {
    navigateTo(result.url)
  }

  // 重置搜索状态
  searchQuery.value = ''
  searchResults.value = []
  selectedIndex.value = 0
}

// 监听搜索查询变化
watchDebounced(
  searchQuery,
  () => {
    if (searchQuery.value.trim()) {
      performSearch()
    } else {
      searchResults.value = []
    }
  },
  { debounce: 300 }
)

// 监听可见性变化
watch(isVisible, (visible) => {
  if (visible) {
    // 模态框打开时聚焦输入框
    nextTick(() => {
      searchInput.value?.focus()
    })
  } else {
    // 模态框关闭时重置状态
    searchQuery.value = ''
    searchResults.value = []
    selectedIndex.value = 0
  }
})

// 键盘事件处理
onMounted(() => {
  const handleKeydown = (event: KeyboardEvent) => {
    if (!isVisible.value) return

    switch (event.key) {
      case 'Enter':
        if (searchResults.value[selectedIndex.value]) {
          selectResult(searchResults.value[selectedIndex.value])
        }
        break
      case 'ArrowDown':
        event.preventDefault()
        navigateResults(1)
        break
      case 'ArrowUp':
        event.preventDefault()
        navigateResults(-1)
        break
    }
  }

  document.addEventListener('keydown', handleKeydown)
  
  return () => {
    document.removeEventListener('keydown', handleKeydown)
  }
})
</script>

<style scoped>
/**
 * 搜索模态框样式
 */

/* 自定义滚动条 */
.max-h-96::-webkit-scrollbar {
  width: 6px;
}

.max-h-96::-webkit-scrollbar-track {
  background: #f1f5f9;
}

.dark .max-h-96::-webkit-scrollbar-track {
  background: #1e293b;
}

.max-h-96::-webkit-scrollbar-thumb {
  background: #cbd5e1;
  border-radius: 3px;
}

.dark .max-h-96::-webkit-scrollbar-thumb {
  background: #475569;
}

/* 行高限制 */
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

/* 键盘提示样式 */
kbd {
  font-family: inherit;
  font-size: inherit;
}

/* 搜索结果悬停效果 */
.hover\:bg-gray-50:hover {
  transition: background-color 0.15s ease;
}

/* 无障碍优化 */
.cursor-pointer:focus {
  outline: 2px solid #3b82f6;
  outline-offset: -2px;
}

/* 减少动画对于偏好减少动效的用户 */
@media (prefers-reduced-motion: reduce) {
  * {
    transition: none !important;
  }
}
</style>
