/**
 * 应用程序主入口文件
 * 配置和启动Vue应用
 * @author 前端工程师团队
 * @date 2024-12-XX
 */

import { createApp } from 'vue'
import App from './App.vue'

// 路由和状态管理
import router from './router'
import pinia from './stores'

// 全局样式
import './assets/styles/base.scss'

/**
 * 创建Vue应用实例
 */
const app = createApp(App)

// 使用插件
app.use(router)
app.use(pinia)

// 全局配置
app.config.globalProperties.$env =
    import.meta.env

// 开发环境配置
if (
    import.meta.env.DEV) {
    app.config.globalProperties.$log = console.log
        // 启用性能追踪
    app.config.performance = true
}

// 全局错误处理
app.config.errorHandler = (error, instance, info) => {
    console.error('[Global Error]', error, info)

    // 这里可以集成错误上报服务
    if (
        import.meta.env.PROD) {
        // 生产环境错误上报
        // reportError(error, instance, info)
    }
}

// 全局警告处理
app.config.warnHandler = (msg, instance, trace) => {
    if (
        import.meta.env.DEV) {
        console.warn('[Global Warning]', msg, trace)
    }
}

// 挂载应用
app.mount('#app')

// 全局样式注入
document.documentElement.style.setProperty('--primary-color', '#FF6B35')
document.documentElement.style.setProperty('--secondary-color', '#4CAF50')

// 移动端优化
if (typeof window !== 'undefined') {
    // 防止页面缩放
    document.addEventListener('gesturestart', function(e) {
        e.preventDefault()
    })

    // 设置viewport
    const viewport = document.querySelector('meta[name=viewport]')
    if (viewport) {
        viewport.setAttribute('content', 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no, viewport-fit=cover')
    }
}

console.log('🚀 H5 邀请项目启动成功！')
console.log('📱 移动端优化已启用')
console.log('🎨 样式系统已加载')
console.log('🛣️ 路由系统已配置')
console.log('📦 状态管理已就绪')

export default app