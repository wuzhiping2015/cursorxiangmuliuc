import { createApp } from 'vue'
import { createPinia } from 'pinia'
import router from './router'
import App from './App.vue'

// 样式文件
import './assets/styles/base.scss'

// Tauri API 检查
const isTauriApp = window.__TAURI__ !== undefined

// 创建应用实例
const app = createApp(App)

// 安装插件
app.use(createPinia())
app.use(router)

// 全局属性
app.config.globalProperties.$isTauriApp = isTauriApp

// 全局错误处理
app.config.errorHandler = (err, vm, info) => {
  console.error('Vue Error:', err)
  console.error('Component:', vm)
  console.error('Info:', info)
  
  // 在 Tauri 环境中可以发送错误通知
  if (isTauriApp && window.__TAURI__) {
    import('@tauri-apps/api/notification').then(({ sendNotification }) => {
      sendNotification({
        title: '应用错误',
        body: '应用发生了一个错误，请查看控制台获取详细信息'
      })
    })
  }
}

// 挂载应用
app.mount('#app')

// Tauri 应用特定初始化
if (isTauriApp) {
  // 阻止默认的右键菜单
  document.addEventListener('contextmenu', e => e.preventDefault())
  
  // 阻止文本选择
  document.addEventListener('selectstart', e => e.preventDefault())
  
  // 阻止拖拽
  document.addEventListener('dragstart', e => e.preventDefault())
  
  console.log('🚀 Tauri 邀请拉新应用启动成功')
} else {
  console.log('🌐 Web 版本运行中（开发模式）')
}