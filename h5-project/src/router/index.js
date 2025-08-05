/**
 * Vue Router 路由配置
 * 定义应用程序的路由映射关系
 * @author 前端工程师团队
 * @date 2024-12-XX
 */

import { createRouter, createWebHistory } from 'vue-router'

const routes = [{
        path: '/',
        name: 'Home',
        component: () =>
            import ('../views/Home.vue'),
        meta: {
            title: '首页',
            keepAlive: true
        }
    },
    {
        path: '/login',
        name: 'Login',
        component: () =>
            import ('../views/Login.vue'),
        meta: {
            title: '登录注册',
            keepAlive: false
        }
    },
    {
        path: '/invite',
        name: 'Invite',
        component: () =>
            import ('../views/Invite.vue'),
        meta: {
            title: '邀请好友',
            keepAlive: true
        }
    },
    {
        path: '/profile',
        name: 'Profile',
        component: () =>
            import ('../views/Profile.vue'),
        meta: {
            title: '个人中心',
            keepAlive: true,
            requiresAuth: true
        }
    },
    {
        path: '/rewards',
        name: 'Rewards',
        component: () =>
            import ('../views/Rewards.vue'),
        meta: {
            title: '我的奖励',
            keepAlive: true,
            requiresAuth: true
        }
    },
    {
        path: '/withdraw',
        name: 'Withdraw',
        component: () =>
            import ('../views/Withdraw.vue'),
        meta: {
            title: '申请提现',
            keepAlive: false,
            requiresAuth: true
        }
    },
    {
        path: '/invite-list',
        name: 'InviteList',
        component: () =>
            import ('../views/InviteList.vue'),
        meta: {
            title: '邀请记录',
            keepAlive: true,
            requiresAuth: true
        }
    },
    {
        path: '/rules',
        name: 'Rules',
        component: () =>
            import ('../views/Rules.vue'),
        meta: {
            title: '奖励规则',
            keepAlive: true
        }
    },
    {
        path: '/agreement',
        name: 'Agreement',
        component: () =>
            import ('../views/Agreement.vue'),
        meta: {
            title: '用户协议',
            keepAlive: false
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
 * 处理页面标题设置和登录验证
 */
router.beforeEach((to, from, next) => {
    // 设置页面标题
    if (to.meta.title) {
        document.title = `${to.meta.title} - 邀请拉新`
    }
    
    // 暂时禁用登录验证，允许所有页面访问
    // 后续可以根据需要开启
    /*
    if (to.meta.requiresAuth) {
        const token = localStorage.getItem('token')
        
        if (!token) {
            next({
                path: '/login',
                query: { redirect: to.fullPath }
            })
            return
        }
    }
    */
    
    next()
})

export default router