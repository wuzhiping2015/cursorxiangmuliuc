<template>
  <div 
    class="tool-card group cursor-pointer"
    @click="$emit('click', tool)"
  >
    <Card class="h-full hover:shadow-lg transition-all duration-300 transform group-hover:-translate-y-1">
      <template #content>
        <div class="p-0">
          <!-- 卡片头部 -->
          <div class="flex items-start justify-between mb-4">
            <div class="flex items-center space-x-3">
              <!-- 工具图标 -->
              <div :class="[
                'w-12 h-12 rounded-xl flex items-center justify-center',
                'bg-gradient-to-br shadow-sm',
                getIconBackground(tool.categoryColor)
              ]">
                <Icon 
                  :name="tool.icon" 
                  class="w-6 h-6 text-white"
                />
              </div>
              
              <!-- 工具名称和类别 -->
              <div class="flex-1 min-w-0">
                <h3 class="text-lg font-semibold text-gray-900 dark:text-white truncate group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                  {{ tool.name }}
                </h3>
                <p class="text-sm text-gray-500 dark:text-gray-400">
                  {{ tool.categoryName }}
                </p>
              </div>
            </div>

            <!-- 评分和标签 -->
            <div class="flex flex-col items-end space-y-2">
              <!-- 评分 -->
              <div class="flex items-center space-x-1">
                <Icon
                  v-for="star in 5"
                  :key="star"
                  name="heroicons:star"
                  :class="[
                    'w-4 h-4',
                    star <= tool.rating 
                      ? 'text-yellow-400' 
                      : 'text-gray-300 dark:text-gray-600'
                  ]"
                  :filled="star <= tool.rating"
                />
                <span class="text-sm font-medium text-gray-600 dark:text-gray-400 ml-1">
                  {{ tool.rating }}
                </span>
              </div>
              
              <!-- 特色和免费标签 -->
              <div class="flex items-center space-x-1">
                <Badge
                  v-if="tool.featured"
                  value="精选"
                  severity="success"
                  class="!text-xs"
                />
                <Badge
                  v-if="tool.free"
                  value="免费"
                  severity="info"
                  class="!text-xs"
                />
              </div>
            </div>
          </div>

          <!-- 工具描述 -->
          <p class="text-gray-600 dark:text-gray-400 text-sm leading-relaxed mb-4 line-clamp-2">
            {{ tool.description }}
          </p>

          <!-- 标签列表 -->
          <div class="flex flex-wrap gap-2 mb-4">
            <Tag
              v-for="tag in tool.tags.slice(0, 3)"
              :key="tag"
              :value="tag"
              severity="secondary"
              rounded
              class="!text-xs !py-1 !px-2"
            />
            <span 
              v-if="tool.tags.length > 3"
              class="text-xs text-gray-500 dark:text-gray-400 self-center"
            >
              +{{ tool.tags.length - 3 }}更多
            </span>
          </div>

          <!-- 个人评价（如果有） -->
          <div v-if="tool.personalNote" class="mb-4">
            <div class="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-3 border-l-4 border-blue-500">
              <div class="flex items-start space-x-2">
                <Icon name="heroicons:user" class="w-4 h-4 text-blue-600 dark:text-blue-400 mt-0.5 flex-shrink-0" />
                <p class="text-sm text-blue-800 dark:text-blue-200 italic line-clamp-2">
                  "{{ tool.personalNote }}"
                </p>
              </div>
            </div>
          </div>

          <!-- 卡片底部 -->
          <div class="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-gray-700">
            <!-- 使用场景 -->
            <div class="flex items-center space-x-1 text-xs text-gray-500 dark:text-gray-400">
              <Icon name="heroicons:light-bulb" class="w-3 h-3" />
              <span>{{ tool.useCases ? tool.useCases.length : 0 }} 个使用场景</span>
            </div>

            <!-- 操作按钮 -->
            <div class="flex items-center space-x-2">
              <!-- 收藏按钮 -->
              <Button
                @click.stop="toggleFavorite"
                text
                rounded
                size="small"
                class="!p-2"
                v-tooltip.top="isFavorited ? '取消收藏' : '添加到收藏'"
              >
                <Icon 
                  name="heroicons:heart" 
                  :class="[
                    'w-4 h-4 transition-colors',
                    isFavorited ? 'text-red-500' : 'text-gray-400 hover:text-red-500'
                  ]"
                  :filled="isFavorited"
                />
              </Button>

              <!-- 外部链接按钮 -->
              <Button
                @click.stop="openExternalLink"
                severity="secondary"
                outlined
                size="small"
                class="!px-3 !py-1.5"
              >
                <Icon name="heroicons:arrow-top-right-on-square" class="w-3 h-3 mr-1" />
                <span class="text-xs">访问</span>
              </Button>
            </div>
          </div>
        </div>
      </template>
    </Card>

    <!-- 悬停时的详细信息预览 -->
    <div 
      v-if="showPreview"
      class="absolute inset-0 bg-white dark:bg-gray-800 rounded-xl shadow-2xl border border-gray-200 dark:border-gray-700 p-6 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
    >
      <div class="h-full flex flex-col">
        <!-- 预览头部 -->
        <div class="flex items-center justify-between mb-4">
          <div class="flex items-center space-x-3">
            <div :class="[
              'w-10 h-10 rounded-lg flex items-center justify-center',
              'bg-gradient-to-br',
              getIconBackground(tool.categoryColor)
            ]">
              <Icon :name="tool.icon" class="w-5 h-5 text-white" />
            </div>
            <div>
              <h4 class="font-semibold text-gray-900 dark:text-white">{{ tool.name }}</h4>
              <p class="text-sm text-gray-500 dark:text-gray-400">{{ tool.categoryName }}</p>
            </div>
          </div>
          <Button
            @click.stop="closePreview"
            text
            rounded
            size="small"
            class="!p-1"
          >
            <Icon name="heroicons:x-mark" class="w-4 h-4" />
          </Button>
        </div>

        <!-- 预览内容 -->
        <div class="flex-1 overflow-y-auto">
          <p class="text-sm text-gray-600 dark:text-gray-400 mb-4">
            {{ tool.description }}
          </p>

          <!-- 优缺点 -->
          <div v-if="tool.pros || tool.cons" class="space-y-3 mb-4">
            <div v-if="tool.pros">
              <h5 class="text-sm font-medium text-green-700 dark:text-green-400 mb-2">优点</h5>
              <ul class="text-xs text-gray-600 dark:text-gray-400 space-y-1">
                <li v-for="pro in tool.pros" :key="pro" class="flex items-start space-x-1">
                  <Icon name="heroicons:check" class="w-3 h-3 text-green-500 mt-0.5 flex-shrink-0" />
                  <span>{{ pro }}</span>
                </li>
              </ul>
            </div>

            <div v-if="tool.cons">
              <h5 class="text-sm font-medium text-orange-700 dark:text-orange-400 mb-2">注意事项</h5>
              <ul class="text-xs text-gray-600 dark:text-gray-400 space-y-1">
                <li v-for="con in tool.cons" :key="con" class="flex items-start space-x-1">
                  <Icon name="heroicons:exclamation-triangle" class="w-3 h-3 text-orange-500 mt-0.5 flex-shrink-0" />
                  <span>{{ con }}</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <!-- 预览底部 -->
        <div class="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-gray-700">
          <div class="text-xs text-gray-500 dark:text-gray-400">
            点击查看详细信息
          </div>
          <Button
            @click.stop="openExternalLink"
            class="btn-ai-gradient !px-4 !py-2 !text-sm"
            size="small"
          >
            立即使用
          </Button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
/**
 * AI工具卡片组件
 * 展示单个AI工具的信息，支持收藏、预览和外部链接跳转
 */

interface Tool {
  id: string
  name: string
  description: string
  url: string
  icon: string
  tags: string[]
  rating: number
  free: boolean
  featured: boolean
  category: string
  categoryName: string
  categoryColor: string
  pros?: string[]
  cons?: string[]
  useCases?: string[]
  personalNote?: string
}

interface Props {
  tool: Tool
  showPreview?: boolean
}

interface Emits {
  (e: 'click', tool: Tool): void
}

const props = withDefaults(defineProps<Props>(), {
  showPreview: false
})

const emit = defineEmits<Emits>()

// 响应式数据
const isFavorited = ref(false)

// 方法
const getIconBackground = (color: string) => {
  const colorMap = {
    blue: 'from-blue-500 to-blue-600',
    purple: 'from-purple-500 to-purple-600',
    green: 'from-green-500 to-green-600',
    yellow: 'from-yellow-500 to-yellow-600',
    red: 'from-red-500 to-red-600',
    pink: 'from-pink-500 to-pink-600',
    cyan: 'from-cyan-500 to-cyan-600',
    orange: 'from-orange-500 to-orange-600'
  }
  return colorMap[color as keyof typeof colorMap] || 'from-gray-500 to-gray-600'
}

const toggleFavorite = () => {
  isFavorited.value = !isFavorited.value
  
  // 这里可以调用API保存收藏状态
  const toast = useToast()
  toast.add({
    severity: isFavorited.value ? 'success' : 'info',
    summary: isFavorited.value ? '已添加到收藏' : '已取消收藏',
    detail: `${props.tool.name} ${isFavorited.value ? '已添加到' : '已从'}收藏列表`,
    life: 3000
  })
}

const openExternalLink = () => {
  window.open(props.tool.url, '_blank', 'noopener,noreferrer')
  
  // 记录工具访问统计
  console.log(`用户访问工具: ${props.tool.name}`)
}

const closePreview = () => {
  // 关闭预览的逻辑
  console.log('关闭预览')
}

// 组件挂载时检查收藏状态
onMounted(() => {
  // 从localStorage或API获取收藏状态
  const favorites = JSON.parse(localStorage.getItem('favoritedTools') || '[]')
  isFavorited.value = favorites.includes(props.tool.id)
})

// 监听收藏状态变化，同步到localStorage
watch(isFavorited, (newValue) => {
  const favorites = JSON.parse(localStorage.getItem('favoritedTools') || '[]')
  
  if (newValue) {
    if (!favorites.includes(props.tool.id)) {
      favorites.push(props.tool.id)
    }
  } else {
    const index = favorites.indexOf(props.tool.id)
    if (index > -1) {
      favorites.splice(index, 1)
    }
  }
  
  localStorage.setItem('favoritedTools', JSON.stringify(favorites))
})
</script>

<style scoped>
/**
 * 工具卡片样式
 */

.tool-card {
  @apply relative;
}

/* 卡片悬停效果 */
.tool-card:hover .p-card {
  @apply shadow-xl;
  transform: translateY(-4px);
}

/* 限制文本行数 */
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

/* AI 按钮渐变效果 */
.btn-ai-gradient {
  background: linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%);
  @apply text-white font-semibold transition-all duration-300;
}

.btn-ai-gradient:hover {
  background: linear-gradient(135deg, #2563eb 0%, #7c3aed 100%);
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(59, 130, 246, 0.3);
}

/* 星级评分样式 */
.heroicons\:star[filled="true"] {
  fill: currentColor;
}

/* 收藏按钮动画 */
.heroicons\:heart[filled="true"] {
  fill: currentColor;
  animation: heartBeat 0.3s ease;
}

@keyframes heartBeat {
  0% { transform: scale(1); }
  50% { transform: scale(1.2); }
  100% { transform: scale(1); }
}

/* 预览浮层样式 */
.absolute.inset-0 {
  backdrop-filter: blur(10px);
}

/* 标签样式覆盖 */
:deep(.p-tag) {
  @apply bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300;
}

/* 徽章样式覆盖 */
:deep(.p-badge.p-badge-success) {
  @apply bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300;
}

:deep(.p-badge.p-badge-info) {
  @apply bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300;
}

/* 响应式优化 */
@media (max-width: 640px) {
  .tool-card {
    @apply mx-2;
  }
  
  .flex.items-center.justify-between {
    @apply flex-col items-start space-y-2;
  }
  
  .flex.items-center.space-x-2 {
    @apply w-full justify-between;
  }
}

/* 无障碍优化 */
.tool-card:focus {
  outline: 2px solid #3b82f6;
  outline-offset: 2px;
}

/* 减少动画对于偏好减少动效的用户 */
@media (prefers-reduced-motion: reduce) {
  .tool-card,
  .tool-card:hover .p-card,
  .btn-ai-gradient,
  .absolute.inset-0 {
    transition: none;
    transform: none;
  }
  
  .heroicons\:heart[filled="true"] {
    animation: none;
  }
}
</style>
