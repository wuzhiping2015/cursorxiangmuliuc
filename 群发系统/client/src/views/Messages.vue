<template>
  <div class="messages-container">
    <div class="header">
      <h2>消息管理</h2>
      <el-button type="primary" @click="handleAdd">
        新建消息
      </el-button>
    </div>

    <el-table
      v-loading="loading"
      :data="messages"
      border
      style="width: 100%"
    >
      <el-table-column prop="title" label="标题" min-width="150">
        <template #default="{ row }">
          <span class="message-title">{{ row.title }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="content" label="内容" min-width="300">
        <template #default="{ row }">
          <span class="message-content">{{ row.content }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="status" label="状态" width="100">
        <template #default="{ row }">
          <el-tag :type="getStatusType(row.status)" class="status-tag">
            {{ getStatusText(row.status) }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="createdAt" label="创建时间">
        <template #default="{ row }">
          {{ new Date(row.createdAt).toLocaleString() }}
        </template>
      </el-table-column>
      <el-table-column label="操作" width="250">
        <template #default="{ row }">
          <el-button
            type="primary"
            link
            @click="handleEdit(row)"
          >
            编辑
          </el-button>
          <el-button
            v-if="row.status === 'draft'"
            type="success"
            link
            @click="handlePublish(row)"
          >
            发布
          </el-button>
          <el-button
            type="danger"
            link
            @click="handleDelete(row)"
          >
            删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog
      v-model="dialogVisible"
      :title="form.id ? '编辑消息' : '新建消息'"
      width="600px"
    >
      <el-form
        ref="formRef"
        :model="form"
        :rules="rules"
        label-width="80px"
      >
        <el-form-item label="标题" prop="title">
          <el-input v-model="form.title" />
        </el-form-item>
        <el-form-item label="内容" prop="content">
          <el-input
            v-model="form.content"
            type="textarea"
            :rows="4"
          />
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogVisible = false">取消</el-button>
          <el-button
            v-if="!form.id"
            @click="handleSaveAsDraft"
          >
            保存草稿
          </el-button>
          <el-button type="primary" @click="handleSubmit">
            {{ form.id ? '保存' : '保存并发布' }}
          </el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import { useMessageStore } from '@/stores/message'

const messageStore = useMessageStore()
const loading = ref(false)
const dialogVisible = ref(false)
const formRef = ref(null)

const form = reactive({
  id: '',
  title: '',
  content: '',
  status: 'draft'
})

const rules = {
  title: [
    { required: true, message: '请输入标题', trigger: 'blur' }
  ],
  content: [
    { required: true, message: '请输入内容', trigger: 'blur' }
  ]
}

const messages = ref([])

const loadMessages = async () => {
  loading.value = true
  try {
    messages.value = await messageStore.getMessages()
  } catch (error) {
    ElMessage.error('获取消息列表失败')
  } finally {
    loading.value = false
  }
}

const resetForm = () => {
  form.id = ''
  form.title = ''
  form.content = ''
  form.status = 'draft'
}

const handleAdd = () => {
  resetForm()
  dialogVisible.value = true
}

const handleEdit = (row) => {
  Object.assign(form, row)
  dialogVisible.value = true
}

const handleDelete = async (row) => {
  try {
    await ElMessageBox.confirm(
      '确定要删除该消息吗？',
      '警告',
      {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }
    )
    await messageStore.deleteMessage(row.id)
    ElMessage.success('删除成功')
    loadMessages()
  } catch (error) {
    if (error !== 'cancel') {
      ElMessage.error('删除失败')
    }
  }
}

const handlePublish = async (row) => {
  try {
    await messageStore.publishMessage(row.id)
    ElMessage.success('发布成功')
    loadMessages()
  } catch (error) {
    ElMessage.error('发布失败')
  }
}

const handleSaveAsDraft = async () => {
  if (!formRef.value) return
  
  try {
    await formRef.value.validate()
    await messageStore.createMessage({
      title: form.title,
      content: form.content,
      status: 'draft'
    })
    ElMessage.success('保存草稿成功')
    dialogVisible.value = false
    loadMessages()
  } catch (error) {
    if (error.response?.data?.error) {
      ElMessage.error(error.response.data.error)
    }
  }
}

const handleSubmit = async () => {
  if (!formRef.value) return
  
  try {
    await formRef.value.validate()
    if (form.id) {
      await messageStore.updateMessage(form.id, {
        title: form.title,
        content: form.content
      })
      ElMessage.success('更新成功')
    } else {
      await messageStore.createMessage({
        title: form.title,
        content: form.content,
        status: 'published'
      })
      ElMessage.success('创建并发布成功')
    }
    dialogVisible.value = false
    loadMessages()
  } catch (error) {
    if (error.response?.data?.error) {
      ElMessage.error(error.response.data.error)
    }
  }
}

// 获取状态类型
const getStatusType = (status) => {
  const types = {
    'draft': 'info',
    'sent': 'success',
    'scheduled': 'warning'
  }
  return types[status] || 'info'
}

// 获取状态文本
const getStatusText = (status) => {
  const texts = {
    'draft': '草稿',
    'sent': '已发布',
    'scheduled': '待发送'
  }
  return texts[status] || status
}

onMounted(() => {
  loadMessages()
})
</script>

<style scoped>
.messages-container {
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

.dialog-footer {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
}

/* 标题样式 */
.message-title {
  color: #303133;
  font-weight: 500;
  font-size: 15px;
}

/* 内容样式 */
.message-content {
  color: #606266;
  font-size: 14px;
}

/* 状态标签样式 */
.status-tag {
  border-radius: 4px;
  padding: 0 10px;
  height: 24px;
  line-height: 24px;
}

:deep(.el-table) {
  /* 表头样式 */
  .el-table__header th {
    background-color: #f5f7fa;
    color: #303133;
    font-weight: 600;
  }
  
  /* 单元格样式 */
  .el-table__row td {
    padding: 12px 0;
  }
}

/* 状态标签颜色定制 */
:deep(.el-tag--success) {
  background-color: #f0f9eb;
  border-color: #e1f3d8;
  color: #67c23a;
}

:deep(.el-tag--warning) {
  background-color: #fdf6ec;
  border-color: #faecd8;
  color: #e6a23c;
}

:deep(.el-tag--info) {
  background-color: #f4f4f5;
  border-color: #e9e9eb;
  color: #909399;
}
</style> 