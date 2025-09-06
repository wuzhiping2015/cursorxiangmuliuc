import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const router = createRouter({
    history: createWebHistory(
        import.meta.env.BASE_URL),
    routes: [{
            path: '/login',
            name: 'login',
            component: () =>
                import ('@/views/Login.vue'),
            meta: { requiresAuth: false }
        },
        {
            path: '/',
            component: () =>
                import ('@/layouts/MainLayout.vue'),
            meta: { requiresAuth: true },
            children: [{
                    path: '',
                    redirect: '/messages'
                },
                {
                    path: 'users',
                    name: 'users',
                    component: () =>
                        import ('@/views/Users.vue')
                },
                {
                    path: 'messages',
                    name: 'messages',
                    component: () =>
                        import ('@/views/Messages.vue')
                },
                {
                    path: 'records',
                    name: 'records',
                    component: () =>
                        import ('@/views/Records.vue')
                }
            ]
        }
    ]
})

router.beforeEach(async(to, from, next) => {
    const authStore = useAuthStore()

    if (!authStore.isAuthenticated) {
        await authStore.checkAuth()
    }

    if (to.meta.requiresAuth === false) {
        if (authStore.isAuthenticated) {
            next({ path: '/' })
        } else {
            next()
        }
    } else {
        if (authStore.isAuthenticated) {
            next()
        } else {
            next({ path: '/login' })
        }
    }
})

export default router