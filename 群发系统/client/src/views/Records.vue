<template>
  <div class="records-container">
    <div class="header">
      <h2>发送记录</h2>
      <div class="search-bar">
        <el-date-picker
          v-model="dateRange"
          type="daterange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          :shortcuts="dateShortcuts"
          @change="handleDateChange"
        />
        <el-select
          v-model="status"
          placeholder="发送状态"
          clearable
          @change="handleStatusChange"
        >
          <el-option label="发送成功" value="success" />
          <el-option label="发送失败" value="failed" />
        </el-select>
        <el-button type="primary" @click="handleSearch">
          搜索
        </el-button>
      </div>
    </div>

    <el-table
      v-loading="loading"
      :data="records"
      border
      style="width: 100%"
    >
      <el-table-column prop="messageTitle" label="消息标题" />
      <el-table-column prop="messageContent" label="消息内容" show-overflow-tooltip />
      <el-table-column prop="recipients" label="接收人">
        <template #default="{ row }">
          {{ Array.isArray(row.recipients) ? row.recipients.join(', ') : row.recipients }}
        </template>
      </el-table-column>
      <el-table-column prop="status" label="状态">
        <template #default="{ row }">
          <el-tag :type="row.status === 'success' ? 'success' : 'danger'">
            {{ row.status === 'success' ? '发送成功' : '发送失败' }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="sendTime" label="发送时间">
        <template #default="{ row }">
          {{ new Date(row.sendTime).toLocaleString() }}
        </template>
      </el-table-column>
      <el-table-column label="操作" width="120">
        <template #default="{ row }">
          <el-button
            type="primary"
            link
            @click="handleViewDetail(row)"
          >
            查看详情
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-pagination
      v-model:current-page="currentPage"
      v-model:page-size="pageSize"
      :total="total"
      :page-sizes="[10, 20, 50, 100]"
      layout="total, sizes, prev, pager, next"
      class="pagination"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    />

    <el-dialog
      v-model="dialogVisible"
      title="发送详情"
      width="600px"
    >
      <div v-if="currentRecord" class="record-detail">
        <div class="detail-item">
          <span class="label">消息标题：</span>
          <span>{{ currentRecord.messageTitle }}</span>
        </div>
        <div class="detail-item">
          <span class="label">消息内容：</span>
          <span>{{ currentRecord.messageContent }}</span>
        </div>
        <div class="detail-item">
          <span class="label">接收人：</span>
          <span>{{ Array.isArray(currentRecord.recipients) ? currentRecord.recipients.join(', ') : currentRecord.recipients }}</span>
        </div>
        <div class="detail-item">
          <span class="label">发送状态：</span>
          <el-tag :type="currentRecord.status === 'success' ? 'success' : 'danger'">
            {{ currentRecord.status === 'success' ? '发送成功' : '发送失败' }}
          </el-tag>
        </div>
        <div class="detail-item">
          <span class="label">发送时间：</span>
          <span>{{ new Date(currentRecord.sendTime).toLocaleString() }}</span>
        </div>
        <div v-if="currentRecord.error" class="detail-item">
          <span class="label">错误信息：</span>
          <span class="error-message">{{ currentRecord.error }}</span>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue'
import { ElMessage } from 'element-plus'
import { useMessageStore } from '@/stores/message'

const messageStore = useMessageStore()
const loading = ref(false)
const dialogVisible = ref(false)
const currentRecord = ref(null)

// 搜索条件
const dateRange = ref(null)
const status = ref('')

// 分页
const currentPage = ref(1)
const pageSize = ref(10)
const total = ref(0)
const records = ref([])

// 日期快捷选项
const dateShortcuts = [
  {
    text: '最近一周',
    value: () => {
      const end = new Date()
      const start = new Date()
      start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
      return [start, end]
    }
  },
  {
    text: '最近一个月',
    value: () => {
      const end = new Date()
      const start = new Date()
      start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
      return [start, end]
    }
  },
  {
    text: '最近三个月',
    value: () => {
      const end = new Date()
      const start = new Date()
      start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
      return [start, end]
    }
  }
]

const loadRecords = async () => {
  loading.value = true
  try {
    const params = {
      page: currentPage.value,
      pageSize: pageSize.value,
      startDate: dateRange.value?.[0]?.toISOString(),
      endDate: dateRange.value?.[1]?.toISOString(),
      status: status.value || undefined
    }
    
    const response = await messageStore.getRecords(params)
    records.value = response.records
    total.value = response.total
  } catch (error) {
    ElMessage.error('获取发送记录失败')
  } finally {
    loading.value = false
  }
}

const handleSearch = () => {
  currentPage.value = 1
  loadRecords()
}

const handleDateChange = () => {
  handleSearch()
}

const handleStatusChange = () => {
  handleSearch()
}

const handleSizeChange = (val) => {
  pageSize.value = val
  loadRecords()
}

const handleCurrentChange = (val) => {
  currentPage.value = val
  loadRecords()
}

const handleViewDetail = (row) => {
  currentRecord.value = row
  dialogVisible.value = true
}

onMounted(() => {
  loadRecords()
})
</script>

<style scoped>
.records-container {
  padding: 20px;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.header h2 {
  margin: 0;
}

.search-bar {
  display: flex;
  gap: 10px;
}

.pagination {
  margin-top: 20px;
  display: flex;
  justify-content: flex-end;
}

.record-detail {
  padding: 10px;
}

.detail-item {
  margin-bottom: 15px;
  line-height: 1.5;
}

.detail-item .label {
  font-weight: bold;
  margin-right: 10px;
  color: #606266;
}

.error-message {
  color: #f56c6c;
}
</style> 