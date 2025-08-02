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
        path: '/invite',
        name: 'Invite',
        component: () =>
            import ('../views/Invite.vue'),
        meta: {
            title: '邀请好友',
            keepAlive: true
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

export default router