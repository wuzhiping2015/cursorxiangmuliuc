import { createRouter, createWebHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'Dashboard',
    component: () => import('@/views/Dashboard.vue')
  },
  {
    path: '/tool/:id',
    name: 'ToolDetail',
    component: () => import('@/views/ToolDetail.vue')
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router 