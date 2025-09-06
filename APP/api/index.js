import { formatDate } from '../utils/date'

// API基础URL
const BASE_URL = process.env.VUE_APP_API_BASE_URL || 'http://localhost:3000'

/**
 * 处理API响应
 * @param {Response} response Fetch API响应对象
 * @returns {Promise} 处理后的响应数据
 */
async function handleResponse(response) {
    const data = await response.json()
    if (!response.ok) {
        throw new Error(data.message || '请求失败')
    }
    return data
}

/**
 * 创建请求头
 * @returns {Object} 请求头对象
 */
function createHeaders() {
    const headers = {
        'Content-Type': 'application/json'
    }

    const token = uni.getStorageSync('token')
    if (token) {
        headers['Authorization'] = `Bearer ${token}`
    }

    return headers
}

/**
 * 用户相关API
 */
export const userApi = {
    // 用户登录
    async login(email, password) {
        const response = await uni.request({
            url: `${BASE_URL}/api/auth/login`,
            method: 'POST',
            data: { email, password },
            header: createHeaders()
        })
        return handleResponse(response)
    },

    // 用户注册
    async register(userData) {
        const response = await uni.request({
            url: `${BASE_URL}/api/auth/register`,
            method: 'POST',
            data: userData,
            header: createHeaders()
        })
        return handleResponse(response)
    },

    // 获取用户信息
    async getUserInfo() {
        const response = await uni.request({
            url: `${BASE_URL}/api/user/profile`,
            method: 'GET',
            header: createHeaders()
        })
        return handleResponse(response)
    },

    // 更新用户信息
    async updateUserInfo(userData) {
        const response = await uni.request({
            url: `${BASE_URL}/api/user/profile`,
            method: 'PUT',
            data: userData,
            header: createHeaders()
        })
        return handleResponse(response)
    },

    // 修改密码
    async changePassword(oldPassword, newPassword) {
        const response = await uni.request({
            url: `${BASE_URL}/api/user/password`,
            method: 'PUT',
            data: { oldPassword, newPassword },
            header: createHeaders()
        })
        return handleResponse(response)
    }
}

/**
 * 习惯相关API
 */
export const habitApi = {
    // 获取习惯列表
    async getHabits() {
        const response = await uni.request({
            url: `${BASE_URL}/api/habits`,
            method: 'GET',
            header: createHeaders()
        })
        return handleResponse(response)
    },

    // 创建新习惯
    async createHabit(habitData) {
        const response = await uni.request({
            url: `${BASE_URL}/api/habits`,
            method: 'POST',
            data: habitData,
            header: createHeaders()
        })
        return handleResponse(response)
    },

    // 更新习惯
    async updateHabit(habitId, habitData) {
        const response = await uni.request({
            url: `${BASE_URL}/api/habits/${habitId}`,
            method: 'PUT',
            data: habitData,
            header: createHeaders()
        })
        return handleResponse(response)
    },

    // 删除习惯
    async deleteHabit(habitId) {
        const response = await uni.request({
            url: `${BASE_URL}/api/habits/${habitId}`,
            method: 'DELETE',
            header: createHeaders()
        })
        return handleResponse(response)
    },

    // 打卡
    async checkIn(habitId, checkInData) {
        const response = await uni.request({
            url: `${BASE_URL}/api/habits/${habitId}/checkin`,
            method: 'POST',
            data: {
                ...checkInData,
                date: formatDate(new Date())
            },
            header: createHeaders()
        })
        return handleResponse(response)
    },

    // 获取习惯统计数据
    async getHabitStats(habitId, startDate, endDate) {
        const response = await uni.request({
            url: `${BASE_URL}/api/habits/${habitId}/stats`,
            method: 'GET',
            data: {
                startDate: formatDate(startDate),
                endDate: formatDate(endDate)
            },
            header: createHeaders()
        })
        return handleResponse(response)
    },

    // 获取打卡记录
    async getCheckInRecords(habitId, startDate, endDate) {
        const response = await uni.request({
            url: `${BASE_URL}/api/habits/${habitId}/checkins`,
            method: 'GET',
            data: {
                startDate: formatDate(startDate),
                endDate: formatDate(endDate)
            },
            header: createHeaders()
        })
        return handleResponse(response)
    }
}

/**
 * 系统配置相关API
 */
export const configApi = {
    // 获取系统配置
    async getConfig() {
        const response = await uni.request({
            url: `${BASE_URL}/api/config`,
            method: 'GET',
            header: createHeaders()
        })
        return handleResponse(response)
    },

    // 更新用户设置
    async updateSettings(settings) {
        const response = await uni.request({
            url: `${BASE_URL}/api/user/settings`,
            method: 'PUT',
            data: settings,
            header: createHeaders()
        })
        return handleResponse(response)
    }
}

/**
 * 文件上传相关API
 */
export const uploadApi = {
    // 上传文件
    async uploadFile(filePath, fileType = 'image') {
        const response = await uni.uploadFile({
            url: `${BASE_URL}/api/upload`,
            filePath,
            name: 'file',
            header: createHeaders(),
            formData: {
                type: fileType
            }
        })
        return handleResponse(response)
    }
}

/**
 * 反馈相关API
 */
export const feedbackApi = {
    // 提交反馈
    async submitFeedback(feedbackData) {
        const response = await uni.request({
            url: `${BASE_URL}/api/feedback`,
            method: 'POST',
            data: feedbackData,
            header: createHeaders()
        })
        return handleResponse(response)
    }
}