import { defineStore } from 'pinia'
import { ref } from 'vue'
import { messageApi, recordApi } from '@/api'
import { ElMessage } from 'element-plus'

export const useMessageStore = defineStore('message', () => {
    const messages = ref([])
    const records = ref([])
    const loading = ref(false)
    const error = ref(null)

    // 获取消息列表
    const getMessages = async() => {
        loading.value = true
        error.value = null

        try {
            const response = await messageApi.getMessages()
            messages.value = response
            return response
        } catch (err) {
            error.value = '获取消息列表失败'
            ElMessage.error(error.value)
            console.error('获取消息列表失败:', err)
            throw err
        } finally {
            loading.value = false
        }
    }

    // 创建消息
    const createMessage = async(messageData) => {
        loading.value = true
        error.value = null

        try {
            const response = await messageApi.createMessage({
                ...messageData,
                createdAt: new Date().toISOString(),
                status: 'draft',
                sendTime: null
            })
            messages.value.unshift(response)
            ElMessage.success('创建消息成功')
            return response
        } catch (err) {
            error.value = '创建消息失败'
            ElMessage.error(error.value)
            console.error('创建消息失败:', err)
            throw err
        } finally {
            loading.value = false
        }
    }

    // 更新消息
    const updateMessage = async(id, messageData) => {
        loading.value = true
        error.value = null

        try {
            const response = await messageApi.updateMessage(id, messageData)
            const index = messages.value.findIndex(msg => msg.id === id)
            if (index !== -1) {
                messages.value[index] = response
            }
            ElMessage.success('更新消息成功')
            return response
        } catch (err) {
            error.value = '更新消息失败'
            ElMessage.error(error.value)
            console.error('更新消息失败:', err)
            throw err
        } finally {
            loading.value = false
        }
    }

    // 删除消息
    const deleteMessage = async(id) => {
        loading.value = true
        error.value = null

        try {
            await messageApi.deleteMessage(id)
            messages.value = messages.value.filter(msg => msg.id !== id)
            ElMessage.success('删除消息成功')
        } catch (err) {
            error.value = '删除消息失败'
            ElMessage.error(error.value)
            console.error('删除消息失败:', err)
            throw err
        } finally {
            loading.value = false
        }
    }

    // 发送消息
    const sendMessage = async(id) => {
        loading.value = true
        error.value = null

        try {
            const { message, record } = await messageApi.sendMessage(id)
                // 更新消息状态
            const index = messages.value.findIndex(msg => msg.id === id)
            if (index !== -1) {
                messages.value[index] = message
            }
            // 添加发送记录
            records.value.unshift(record)
            ElMessage.success('发送消息成功')
            return { message, record }
        } catch (err) {
            error.value = '发送消息失败'
            ElMessage.error(error.value)
            console.error('发送消息失败:', err)
            throw err
        } finally {
            loading.value = false
        }
    }

    // 获取发送记录
    const getRecords = async() => {
        loading.value = true
        error.value = null

        try {
            const response = await recordApi.getRecords()
            records.value = response
            return response
        } catch (err) {
            error.value = '获取发送记录失败'
            ElMessage.error(error.value)
            console.error('获取发送记录失败:', err)
            throw err
        } finally {
            loading.value = false
        }
    }

    return {
        messages,
        records,
        loading,
        error,
        getMessages,
        createMessage,
        updateMessage,
        deleteMessage,
        sendMessage,
        getRecords
    }
})