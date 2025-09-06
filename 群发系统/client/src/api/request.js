import axios from 'axios'
import { ElMessage } from 'element-plus'
import router from '@/router'

const service = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL || '/api',
    timeout: 10000
})

// 请求拦截器
service.interceptors.request.use(
    config => {
        const token = localStorage.getItem('token')
        if (token) {
            config.headers.Authorization = `Bearer ${token}`
        }
        return config
    },
    error => {
        console.error('请求错误:', error)
        return Promise.reject(error)
    }
)

// 响应拦截器
service.interceptors.response.use(
    response => {
        const res = response.data

        if (res.code !== 0) {
            ElMessage.error(res.message || '请求失败')

            if (res.code === 401) {
                localStorage.removeItem('token')
                localStorage.removeItem('user')
                router.push('/login')
            }

            return Promise.reject(new Error(res.message || '请求失败'))
        }

        return res.data
    },
    error => {
        console.error('响应错误:', error)
        let message = '请求失败'

        if (error.response && error.response.data && error.response.data.message) {
            message = error.response.data.message
        } else if (error.message) {
            message = error.message
        }

        ElMessage.error(message)

        if (error.response && error.response.status === 401) {
            localStorage.removeItem('token')
            localStorage.removeItem('user')
            router.push('/login')
        }

        return Promise.reject(error)
    }
)

export default service