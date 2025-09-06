import { mapGetters } from 'vuex'

export default {
    computed: {
        ...mapGetters(['userInfo']),

        // 是否已登录
        isAuthenticated() {
            return !!this.userInfo
        }
    },

    methods: {
        // 检查登录状态
        checkAuth() {
            if (!this.isAuthenticated) {
                uni.showToast({
                    title: '请先登录',
                    icon: 'none'
                })

                // 保存当前页面路径
                const currentPage = getCurrentPages().pop()
                const url = `/${currentPage.route}`
                uni.setStorageSync('redirect_url', url)

                // 跳转到登录页
                uni.navigateTo({
                    url: '/pages/login/index'
                })
                return false
            }
            return true
        },

        // 登录成功后的处理
        handleLoginSuccess() {
            const redirectUrl = uni.getStorageSync('redirect_url')
            if (redirectUrl) {
                uni.removeStorageSync('redirect_url')
                uni.redirectTo({
                    url: redirectUrl
                })
            } else {
                uni.switchTab({
                    url: '/pages/index/index'
                })
            }
        },

        // 登出
        async handleLogout() {
            try {
                await this.$store.dispatch('logout')
                uni.showToast({
                    title: '已退出登录',
                    icon: 'success'
                })
                uni.reLaunch({
                    url: '/pages/login/index'
                })
            } catch (error) {
                uni.showToast({
                    title: error.message || '退出失败',
                    icon: 'none'
                })
            }
        }
    }
}