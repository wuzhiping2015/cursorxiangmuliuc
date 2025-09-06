import axios from 'axios'
import { useAuthStore } from '@/stores/auth'

// 创建axios实例
const api = axios.create({
    baseURL: 'http://localhost:3000', // json-server默认端口
    timeout: 5000
})

// 请求拦截器
api.interceptors.request.use(
    config => {
        const authStore = useAuthStore()
        if (authStore.token) {
            config.headers.Authorization = `Bearer ${authStore.token}`
        }
        return config
    },
    error => {
        console.error('请求错误:', error)
        return Promise.reject(error)
    }
)

// 响应拦截器
api.interceptors.response.use(
    response => response.data,
    error => {
        console.error('响应错误:', error)
        return Promise.reject(error)
    }
)

// 用户相关API
export const userApi = {
    // 登录
    login: (username, password) => {
        return api.get(`/users?username=${username}&password=${password}`)
            .then(users => {
                if (users.length > 0) {
                    const user = users[0]
                    return {
                        user,
                        token: `mock-jwt-token-for-${user.username}`
                    }
                }
                throw new Error('用户名或密码错误')
            })
    },

    // 获取用户列表
    getUsers: () => api.get('/users'),

    // 创建用户
    createUser: (userData) => api.post('/users', userData),

    // 更新用户
    updateUser: (id, userData) => api.put(`/users/${id}`, userData),

    // 删除用户
    deleteUser: (id) => api.delete(`/users/${id}`)
}

// 消息相关API
export const messageApi = {
    // 获取消息列表
    getMessages: () => api.get('/messages'),

    // 创建消息
    createMessage: (messageData) => api.post('/messages', messageData),

    // 更新消息
    updateMessage: (id, messageData) => api.put(`/messages/${id}`, messageData),

    // 删除消息
    deleteMessage: (id) => api.delete(`/messages/${id}`),

    // 发送消息
    sendMessage: async(id) => {
        // 1. 获取消息详情
        const message = await api.get(`/messages/${id}`).then(res => res)

        // 2. 更新消息状态
        const updatedMessage = await api.put(`/messages/${id}`, {
            ...message,
            status: 'sent',
            sendTime: new Date().toISOString()
        })

        // 3. 创建发送记录
        const record = await api.post('/records', {
            messageId: id,
            recipient: Array.isArray(message.recipients) ? message.recipients.join(',') : message.recipients,
            status: 'success',
            sendTime: updatedMessage.sendTime
        })

        return { message: updatedMessage, record }
    }
}

// 记录相关API
export const recordApi = {
    // 获取发送记录
    getRecords: () => api.get('/records')
}