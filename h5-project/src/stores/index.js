/**
 * Pinia 状态管理主配置文件
 * 创建和配置Pinia实例
 * @author 前端工程师团队
 * @date 2024-12-XX
 */

import { createPinia } from 'pinia'

const pinia = createPinia()

export default pinia

// 导出所有store
export { useUserStore } from './user'
export { useInviteStore } from './invite'