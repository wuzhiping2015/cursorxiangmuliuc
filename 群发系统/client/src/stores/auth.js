import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { userApi } from '@/api'
import { ElMessage } from 'element-plus'

export const useAuthStore = defineStore('auth', () => {
    const router = useRouter()
    const user = ref(null)
    const token = ref(null)
    const loading = ref(false)
    const error = ref(null)

    // 计算属性：是否已认证
    const isAuthenticated = computed(() => !!token.value)

    // 登录
    const login = async(username, password) => {
        loading.value = true
        error.value = null

        try {
            const response = await userApi.login(username, password)
            user.value = response.user
            token.value = response.token
            localStorage.setItem('token', response.token)
            ElMessage.success('登录成功')
            router.push('/')
        } catch (err) {
            error.value = '用户名或密码错误'
            ElMessage.error(error.value)
            throw err
        } finally {
            loading.value = false
        }
    }

    // 登出
    const logout = () => {
        user.value = null
        token.value = null
        localStorage.removeItem('token')
        router.push('/login')
        ElMessage.success('已退出登录')
    }

    // 检查登录状态
    const checkAuth = async() => {
        const savedToken = localStorage.getItem('token')
        if (savedToken) {
            token.value = savedToken
            try {
                // 获取当前用户信息
                const users = await userApi.getUsers()
                const currentUser = users.find(u => `mock-jwt-token-for-${u.username}` === savedToken)
                if (currentUser) {
                    user.value = currentUser
                    return true
                }
            } catch (err) {
                console.error('验证登录状态失败:', err)
            }
            // 验证失败，清除token
            token.value = null
            localStorage.removeItem('token')
        }
        return false
    }

    return {
        user,
        token,
        loading,
        error,
        isAuthenticated,
        login,
        logout,
        checkAuth
    }
})