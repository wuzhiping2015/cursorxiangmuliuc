import { createApp } from 'vue'
import App from './App.vue'
import './assets/tailwind.css'

// 导入路由配置
import router from './router'

// 创建Vue应用
const app = createApp(App)

// 使用路由
app.use(router)

// 挂载应用
app.mount('#app')