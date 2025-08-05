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

    // 模拟登录，用于演示
    function mockLogin() {
        const mockToken = 'mock-token-' + Date.now()
        const mockUserInfo = {
            id: 1,
            mobile: '13800138000',
            nickname: '演示用户',
            avatar: '',
            balance: 1000,
            inviteCode: 'DEMO2024',
            inviteCount: 5
        }
        setToken(mockToken)
        setUserInfo(mockUserInfo)
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
        logout,
        mockLogin
    }
})