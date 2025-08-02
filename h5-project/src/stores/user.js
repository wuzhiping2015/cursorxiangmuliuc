/**
 * 用户状态管理
 * 处理用户信息、登录状态、权限等相关数据
 * @author 前端工程师团队
 * @date 2024-12-XX
 */

import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useUserStore = defineStore('user', () => {
    // 状态
    const userInfo = ref(null)
    const token = ref('')

    // 计算属性
    const isLogin = computed(() => !!token.value)

    // 方法
    function setUserInfo(info) {
        userInfo.value = info
    }

    function setToken(newToken) {
        token.value = newToken
        localStorage.setItem('token', newToken)
    }

    function initUserData() {
        const savedToken = localStorage.getItem('token')
        if (savedToken) {
            token.value = savedToken
        }
    }

    function logout() {
        userInfo.value = null
        token.value = ''
        localStorage.removeItem('token')
    }

    return {
        userInfo,
        token,
        isLogin,
        setUserInfo,
        setToken,
        initUserData,
        logout
    }
})