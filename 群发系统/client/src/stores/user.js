import { defineStore } from 'pinia'
import { ref } from 'vue'
import { userApi } from '@/api'
import { ElMessage } from 'element-plus'

export const useUserStore = defineStore('user', () => {
    const users = ref([])
    const loading = ref(false)
    const error = ref(null)

    // 获取用户列表
    const getUsers = async() => {
        loading.value = true
        error.value = null

        try {
            const response = await userApi.getUsers()
            users.value = response
            return response
        } catch (err) {
            error.value = '获取用户列表失败'
            ElMessage.error(error.value)
            console.error('获取用户列表失败:', err)
            throw err
        } finally {
            loading.value = false
        }
    }

    // 创建用户
    const createUser = async(userData) => {
        loading.value = true
        error.value = null

        try {
            const response = await userApi.createUser({
                ...userData,
                createdAt: new Date().toISOString(),
                status: 'active'
            })
            users.value.unshift(response)
            ElMessage.success('创建用户成功')
            return response
        } catch (err) {
            error.value = '创建用户失败'
            ElMessage.error(error.value)
            console.error('创建用户失败:', err)
            throw err
        } finally {
            loading.value = false
        }
    }

    // 更新用户
    const updateUser = async(id, userData) => {
        loading.value = true
        error.value = null

        try {
            const response = await userApi.updateUser(id, userData)
            const index = users.value.findIndex(user => user.id === id)
            if (index !== -1) {
                users.value[index] = response
            }
            ElMessage.success('更新用户成功')
            return response
        } catch (err) {
            error.value = '更新用户失败'
            ElMessage.error(error.value)
            console.error('更新用户失败:', err)
            throw err
        } finally {
            loading.value = false
        }
    }

    // 删除用户
    const deleteUser = async(id) => {
        loading.value = true
        error.value = null

        try {
            await userApi.deleteUser(id)
            users.value = users.value.filter(user => user.id !== id)
            ElMessage.success('删除用户成功')
        } catch (err) {
            error.value = '删除用户失败'
            ElMessage.error(error.value)
            console.error('删除用户失败:', err)
            throw err
        } finally {
            loading.value = false
        }
    }

    return {
        users,
        loading,
        error,
        getUsers,
        createUser,
        updateUser,
        deleteUser
    }
})