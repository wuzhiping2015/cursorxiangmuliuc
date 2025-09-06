import { mapGetters } from 'vuex'

export default {
    computed: {
        ...mapGetters(['theme']),

        // 是否为暗色主题
        isDarkTheme() {
            return this.theme === 'dark'
        },

        // 主题颜色
        themeColors() {
            return this.isDarkTheme ? {
                // 暗色主题颜色
                primary: '#1a1a1a',
                secondary: '#2d2d2d',
                text: '#ffffff',
                textSecondary: '#b3b3b3',
                border: '#404040',
                success: '#4CAF50',
                warning: '#FFC107',
                error: '#FF5252',
                info: '#2196F3',
                background: '#121212',
                card: '#1e1e1e',
                divider: '#333333',
                icon: '#ffffff',
                shadow: 'rgba(0, 0, 0, 0.5)'
            } : {
                // 亮色主题颜色
                primary: '#ffffff',
                secondary: '#f5f5f5',
                text: '#333333',
                textSecondary: '#666666',
                border: '#e0e0e0',
                success: '#4CAF50',
                warning: '#FFC107',
                error: '#FF5252',
                info: '#2196F3',
                background: '#f8f8f8',
                card: '#ffffff',
                divider: '#e0e0e0',
                icon: '#333333',
                shadow: 'rgba(0, 0, 0, 0.1)'
            }
        },

        // 主题样式
        themeStyles() {
            return {
                // 页面样式
                page: {
                    backgroundColor: this.themeColors.background,
                    color: this.themeColors.text
                },

                // 卡片样式
                card: {
                    backgroundColor: this.themeColors.card,
                    borderColor: this.themeColors.border,
                    boxShadow: `0 2px 4px ${this.themeColors.shadow}`
                },

                // 输入框样式
                input: {
                    backgroundColor: this.themeColors.secondary,
                    borderColor: this.themeColors.border,
                    color: this.themeColors.text
                },

                // 按钮样式
                button: {
                    primary: {
                        backgroundColor: this.themeColors.info,
                        color: '#ffffff'
                    },
                    secondary: {
                        backgroundColor: this.themeColors.secondary,
                        color: this.themeColors.text,
                        borderColor: this.themeColors.border
                    }
                },

                // 文本样式
                text: {
                    primary: {
                        color: this.themeColors.text
                    },
                    secondary: {
                        color: this.themeColors.textSecondary
                    }
                },

                // 图标样式
                icon: {
                    color: this.themeColors.icon
                },

                // 分割线样式
                divider: {
                    backgroundColor: this.themeColors.divider
                }
            }
        }
    },

    methods: {
        // 切换主题
        async toggleTheme() {
            try {
                const newTheme = this.isDarkTheme ? 'light' : 'dark'
                await this.$store.dispatch('updateSettings', {
                    theme: newTheme
                })

                // 更新状态栏样式
                uni.setNavigationBarColor({
                    frontColor: newTheme === 'dark' ? '#ffffff' : '#000000',
                    backgroundColor: this.themeColors.primary
                })
            } catch (error) {
                uni.showToast({
                    title: error.message || '切换主题失败',
                    icon: 'none'
                })
            }
        },

        // 获取状态栏高度
        getStatusBarHeight() {
            const systemInfo = uni.getSystemInfoSync()
            return systemInfo.statusBarHeight || 0
        }
    }
}