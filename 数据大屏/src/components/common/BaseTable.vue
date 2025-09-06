<template>
  <div class="base-table">
    <!-- 表格工具栏 -->
    <div class="table-toolbar" v-if="$slots.toolbar">
      <slot name="toolbar"></slot>
    </div>

    <!-- 表格主体 -->
    <el-table
      v-loading="loading"
      :data="tableData"
      :border="border"
      :stripe="stripe"
      :size="size"
      :height="height"
      :max-height="maxHeight"
      :highlight-current-row="highlightCurrentRow"
      :row-key="rowKey"
      :tree-props="treeProps"
      :row-class-name="rowClassName"
      :cell-class-name="cellClassName"
      :header-row-class-name="headerRowClassName"
      :header-cell-class-name="headerCellClassName"
      :row-style="rowStyle"
      :cell-style="cellStyle"
      :header-row-style="headerRowStyle"
      :header-cell-style="headerCellStyle"
      @selection-change="handleSelectionChange"
      @current-change="handleCurrentChange"
      @sort-change="handleSortChange"
      @filter-change="handleFilterChange"
    >
      <!-- 选择列 -->
      <el-table-column
        v-if="showSelection"
        type="selection"
        width="55"
        align="center"
      />

      <!-- 序号列 -->
      <el-table-column
        v-if="showIndex"
        type="index"
        label="序号"
        width="60"
        align="center"
      />

      <!-- 数据列 -->
      <el-table-column
        v-for="(column, index) in columns"
        :key="index"
        v-bind="column"
        :prop="column.prop"
        :label="column.label"
        :width="column.width"
        :min-width="column.minWidth"
        :fixed="column.fixed"
        :sortable="column.sortable"
        :sort-method="column.sortMethod"
        :sort-by="column.sortBy"
        :filters="column.filters"
        :filter-placement="column.filterPlacement"
        :filter-multiple="column.filterMultiple"
        :filter-method="column.filterMethod"
        :filtered-value="column.filteredValue"
        :show-overflow-tooltip="column.showOverflowTooltip"
        :align="column.align || 'left'"
        :header-align="column.headerAlign || 'left'"
        :class-name="column.className"
        :label-class-name="column.labelClassName"
        :reserve-selection="column.reserveSelection"
        :formatter="column.formatter"
      >
        <!-- 自定义列模板 -->
        <template #default="scope" v-if="column.slot">
          <slot :name="column.slot" :row="scope.row" :column="scope.column" :index="scope.$index"></slot>
        </template>
      </el-table-column>

      <!-- 操作列 -->
      <el-table-column
        v-if="showOperation"
        :label="operationLabel"
        :width="operationWidth"
        :fixed="operationFixed"
        align="center"
      >
        <template #default="scope">
          <slot name="operation" :row="scope.row" :column="scope.column" :index="scope.$index"></slot>
        </template>
      </el-table-column>
    </el-table>

    <!-- 分页器 -->
    <div class="table-pagination" v-if="showPagination">
      <el-pagination
        :current-page="currentPage"
        :page-size="pageSize"
        :page-sizes="pageSizes"
        :total="total"
        :layout="paginationLayout"
        @size-change="handleSizeChange"
        @current-change="handlePageChange"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import type { TableColumnCtx } from 'element-plus'

interface Props {
  // 表格数据
  data: any[]
  // 列配置
  columns: TableColumnCtx[]
  // 是否显示选择列
  showSelection?: boolean
  // 是否显示序号列
  showIndex?: boolean
  // 是否显示操作列
  showOperation?: boolean
  // 操作列配置
  operationLabel?: string
  operationWidth?: number | string
  operationFixed?: boolean | string
  // 表格配置
  border?: boolean
  stripe?: boolean
  size?: 'large' | 'default' | 'small'
  height?: number | string
  maxHeight?: number | string
  highlightCurrentRow?: boolean
  rowKey?: string
  treeProps?: {
    hasChildren: string
    children: string
  }
  // 分页配置
  showPagination?: boolean
  total?: number
  currentPage?: number
  pageSize?: number
  pageSizes?: number[]
  paginationLayout?: string
}

const props = withDefaults(defineProps<Props>(), {
  showSelection: false,
  showIndex: false,
  showOperation: false,
  operationLabel: '操作',
  operationWidth: 150,
  operationFixed: 'right',
  border: true,
  stripe: true,
  size: 'default',
  showPagination: true,
  total: 0,
  currentPage: 1,
  pageSize: 10,
  pageSizes: () => [10, 20, 50, 100],
  paginationLayout: 'total, sizes, prev, pager, next, jumper'
})

// 事件
const emit = defineEmits([
  'selection-change',
  'current-change',
  'sort-change',
  'filter-change',
  'size-change',
  'current-change'
])

// 表格数据
const tableData = computed(() => props.data)

// 加载状态
const loading = ref(false)

// 选择项
const selection = ref<any[]>([])

// 当前行
const currentRow = ref<any>(null)

// 排序
const sort = ref<{
  prop: string
  order: 'ascending' | 'descending' | null
}>({
  prop: '',
  order: null
})

// 筛选
const filters = ref<Record<string, any[]>>({})

// 方法
const handleSelectionChange = (selection: any[]) => {
  emit('selection-change', selection)
}

const handleCurrentChange = (currentRow: any) => {
  emit('current-change', currentRow)
}

const handleSortChange = (sort: any) => {
  emit('sort-change', sort)
}

const handleFilterChange = (filters: any) => {
  emit('filter-change', filters)
}

const handleSizeChange = (val: number) => {
  emit('size-change', val)
}

const handlePageChange = (val: number) => {
  emit('current-change', val)
}

// 暴露方法
defineExpose({
  // 设置加载状态
  setLoading: (val: boolean) => {
    loading.value = val
  },
  // 清除选择
  clearSelection: () => {
    selection.value = []
  },
  // 切换行选中状态
  toggleRowSelection: (row: any, selected?: boolean) => {
    // 实现切换行选中状态的方法
  },
  // 切换全选状态
  toggleAllSelection: () => {
    // 实现切换全选状态的方法
  },
  // 设置当前行
  setCurrentRow: (row: any) => {
    currentRow.value = row
  },
  // 清除排序
  clearSort: () => {
    sort.value = {
      prop: '',
      order: null
    }
  },
  // 清除筛选
  clearFilter: (columnKey?: string) => {
    if (columnKey) {
      filters.value[columnKey] = []
    } else {
      filters.value = {}
    }
  },
  // 刷新表格
  refresh: () => {
    // 实现刷新表格的方法
  }
})
</script>

<style lang="scss" scoped>
.base-table {
  .table-toolbar {
    margin-bottom: $spacing-md;
  }

  .table-pagination {
    margin-top: $spacing-md;
    display: flex;
    justify-content: flex-end;
  }
}
</style> 