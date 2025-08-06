/**
 * Vue Router 路由配置 - Tauri 桌面版
 * 定义应用程序的路由映射关系（桌面版适配）
 * @author 前端工程师团队
 * @date 2024-12-XX
 */

import { createRouter, createWebHistory } from 'vue-router'

const routes = [
    {
        path: '/',
        name: 'Home',
        component: () => import('../views/Home.vue'),
        meta: {
            title: '首页',
            keepAlive: true,
            icon: '🏠'
        }
    },
    {
        path: '/login',
        name: 'Login',
        component: () => import('../views/Login.vue'),
        meta: {
            title: '登录注册',
            keepAlive: false,
            icon: '🔐'
        }
    },
    {
        path: '/invite',
        name: 'Invite',
        component: () => import('../views/Invite.vue'),
        meta: {
            title: '邀请好友',
            keepAlive: true,
            icon: '🎁'
        }
    },
    {
        path: '/profile',
        name: 'Profile',
        component: () => import('../views/Profile.vue'),
        meta: {
            title: '个人中心',
            keepAlive: true,
            requiresAuth: true,
            icon: '👤'
        }
    },
    {
        path: '/rewards',
        name: 'Rewards',
        component: () => import('../views/Rewards.vue'),
        meta: {
            title: '我的奖励',
            keepAlive: true,
            requiresAuth: true,
            icon: '💎'
        }
    },
    {
        path: '/withdraw',
        name: 'Withdraw',
        component: () => import('../views/Withdraw.vue'),
        meta: {
            title: '申请提现',
            keepAlive: false,
            requiresAuth: true,
            icon: '💳'
        }
    },
    {
        path: '/invite-list',
        name: 'InviteList',
        component: () => import('../views/InviteList.vue'),
        meta: {
            title: '邀请记录',
            keepAlive: true,
            requiresAuth: true,
            icon: '📋'
        }
    },
    {
        path: '/rules',
        name: 'Rules',
        component: () => import('../views/Rules.vue'),
        meta: {
            title: '奖励规则',
            keepAlive: true,
            icon: '📋'
        }
    },
    {
        path: '/agreement',
        name: 'Agreement',
        component: () => import('../views/Agreement.vue'),
        meta: {
            title: '用户协议',
            keepAlive: false,
            icon: '📄'
        }
    },
    {
        path: '/settings',
        name: 'Settings',
        component: () => import('../views/Settings.vue'),
        meta: {
            title: '应用设置',
            keepAlive: true,
            icon: '⚙️'
        }
    },
    {
        path: '/data-center',
        name: 'DataCenter',
        component: () => import('../views/DataCenter.vue'),
        meta: {
            title: '数据中心',
            keepAlive: true,
            requiresAuth: true,
            icon: '📊'
        }
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes,
    scrollBehavior(to, from, savedPosition) {
        if (savedPosition) {
            return savedPosition
        } else {
            return { top: 0 }
        }
    }
})

/**
 * 路由前置守卫
 * 处理页面标题设置和登录验证（桌面版优化）
 */
router.beforeEach(async (to, from, next) => {
    // 设置页面标题（桌面版）
    if (to.meta.title) {
        document.title = `${to.meta.title} - 邀请拉新助手`
        
        // 如果在 Tauri 环境中，更新窗口标题
        if (window.__TAURI__) {
            try {
                const { appWindow } = await import('@tauri-apps/api/window')
                await appWindow.setTitle(`${to.meta.title} - 邀请拉新助手`)
            } catch (error) {
                console.warn('设置窗口标题失败:', error)
            }
        }
    }
    
    // 桌面版的身份验证逻辑
    // 暂时禁用登录验证，允许所有页面访问
    // 桌面版可以考虑使用本地存储或配置文件进行身份验证
    /*
    if (to.meta.requiresAuth) {
        // 检查本地身份验证状态
        const isAuthenticated = await checkLocalAuth()
        
        if (!isAuthenticated) {
            next({
                path: '/login',
                query: { redirect: to.fullPath }
            })
            return
        }
    }
    */
    
    // 桌面版路由变化时可以发送通知
    if (window.__TAURI__ && from.name && to.name !== from.name) {
        try {
            const { TauriApiService } = await import('@/utils/tauri-api')
            // 记录路由访问（可选）
            console.log(`路由跳转: ${from.name} -> ${to.name}`)
        } catch (error) {
            // 忽略错误
        }
    }
    
    next()
})

/**
 * 路由后置守卫
 * 桌面版特定的后处理
 */
router.afterEach((to, from) => {
    // 桌面版可以在这里处理一些额外的逻辑
    // 比如记录用户访问的页面用于分析
    if (window.__TAURI__) {
        // 可以记录用户的页面访问轨迹
        console.log(`页面访问: ${to.path}`)
    }
})

/**
 * 检查本地身份验证状态
 * 桌面版可以使用不同的身份验证机制
 */
async function checkLocalAuth() {
    try {
        // 这里可以检查本地存储的认证信息
        const token = localStorage.getItem('token')
        if (!token) return false
        
        // 如果在 Tauri 环境中，可以使用更安全的存储方式
        if (window.__TAURI__) {
            const { TauriApiService } = await import('@/utils/tauri-api')
            const config = await TauriApiService.getAppConfig()
            if (config.success) {
                // 可以从配置中获取身份验证信息
                return true
            }
        }
        
        return !!token
    } catch (error) {
        console.error('检查身份验证状态失败:', error)
        return false
    }
}

export default router