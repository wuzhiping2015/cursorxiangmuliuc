# 开发指南

## 🎯 开发环境配置

### 系统要求
- Node.js 16.0+
- npm 8.0+ 或 yarn 1.22+
- 现代浏览器 (Chrome 80+, Firefox 75+, Safari 13+)

### IDE 推荐
- **VS Code** + Vue Language Features (Volar)
- **WebStorm** + Vue.js 插件

### 浏览器插件
- Vue.js DevTools 6.0+
- 移动端调试工具

## 📋 开发流程

### 1. 项目初始化
```bash
# 克隆项目
git clone <repository-url>
cd h5-project

# 安装依赖
npm install

# 启动开发服务器
npm run dev
```

### 2. 功能开发
```bash
# 创建功能分支
git checkout -b feature/invite-share

# 开发新功能
# ...编写代码

# 提交代码
git add .
git commit -m "feat: 新增邀请分享功能"

# 推送到远程
git push origin feature/invite-share
```

### 3. 代码审查
- 创建 Pull Request
- 代码审查通过后合并
- 删除功能分支

## 🧩 组件开发规范

### 组件结构
```vue
<template>
  <!-- 模板内容 -->
  <div class="component-name">
    <!-- 内容区域 -->
  </div>
</template>

<script>
import { ref, computed, onMounted } from 'vue'

/**
 * 组件名称 - 组件功能描述
 * @author 开发者姓名
 * @date 2024-12-XX
 */
export default {
  name: 'ComponentName',
  props: {
    // 属性定义
    title: {
      type: String,
      default: '',
      required: true
    }
  },
  emits: ['click', 'change'],
  setup(props, { emit }) {
    // 响应式数据
    const count = ref(0)
    
    // 计算属性
    const displayTitle = computed(() => {
      return props.title || '默认标题'
    })
    
    // 方法定义
    const handleClick = () => {
      emit('click', count.value)
    }
    
    // 生命周期
    onMounted(() => {
      console.log('组件挂载完成')
    })
    
    return {
      count,
      displayTitle,
      handleClick
    }
  }
}
</script>

<style lang="scss" scoped>
.component-name {
  // 样式定义
}
</style>
```

### 命名约定
```javascript
// 组件名：PascalCase
UserProfile.vue
InviteCard.vue

// 文件名：kebab-case
user-profile.vue
invite-card.vue

// 方法名：camelCase
handleSubmit()
fetchUserData()

// 常量：UPPER_SNAKE_CASE
const API_BASE_URL = 'https://api.example.com'
const MAX_RETRY_COUNT = 3
```

## 🎨 样式开发规范

### SCSS 变量定义
```scss
// variables.scss
$primary-color: #FF6B35;
$secondary-color: #4CAF50;
$text-color: #333333;
$border-radius: 8px;
$font-size-base: 14px;
```

### BEM 命名规范
```scss
// 块（Block）
.invite-card { }

// 元素（Element）
.invite-card__title { }
.invite-card__content { }

// 修饰符（Modifier）
.invite-card--premium { }
.invite-card__title--large { }
```

### 响应式断点
```scss
// 移动端优先
.container {
  width: 100%;
  
  // 平板
  @media (min-width: 768px) {
    max-width: 750px;
  }
  
  // 桌面端
  @media (min-width: 1024px) {
    max-width: 1200px;
  }
}
```

## 🔧 工具函数开发

### 请求封装
```javascript
// utils/request.js
import axios from 'axios'

/**
 * 创建 axios 实例
 */
const request = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json'
  }
})

/**
 * 请求拦截器
 */
request.interceptors.request.use(
  config => {
    // 添加 token
    const token = localStorage.getItem('token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  error => {
    return Promise.reject(error)
  }
)

/**
 * 响应拦截器
 */
request.interceptors.response.use(
  response => {
    const { code, data, message } = response.data
    if (code === 200) {
      return data
    } else {
      throw new Error(message || '请求失败')
    }
  },
  error => {
    // 错误处理
    console.error('请求错误:', error.message)
    return Promise.reject(error)
  }
)

export default request
```

### 存储工具
```javascript
// utils/storage.js

/**
 * 本地存储工具类
 */
class Storage {
  /**
   * 设置存储
   * @param {string} key 键名
   * @param {*} value 值
   * @param {number} expire 过期时间（毫秒）
   */
  set(key, value, expire = null) {
    const data = {
      value,
      expire: expire ? Date.now() + expire : null
    }
    localStorage.setItem(key, JSON.stringify(data))
  }
  
  /**
   * 获取存储
   * @param {string} key 键名
   * @returns {*} 存储值
   */
  get(key) {
    const item = localStorage.getItem(key)
    if (!item) return null
    
    try {
      const data = JSON.parse(item)
      if (data.expire && Date.now() > data.expire) {
        this.remove(key)
        return null
      }
      return data.value
    } catch {
      return null
    }
  }
  
  /**
   * 移除存储
   * @param {string} key 键名
   */
  remove(key) {
    localStorage.removeItem(key)
  }
  
  /**
   * 清空存储
   */
  clear() {
    localStorage.clear()
  }
}

export default new Storage()
```

## 🔄 状态管理

### Store 定义
```javascript
// stores/user.js
import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

/**
 * 用户状态管理
 */
export const useUserStore = defineStore('user', () => {
  // 状态
  const userInfo = ref(null)
  const token = ref('')
  const inviteCode = ref('')
  
  // 计算属性
  const isLogin = computed(() => !!token.value)
  const userName = computed(() => userInfo.value?.name || '游客')
  
  // 操作方法
  const setUserInfo = (info) => {
    userInfo.value = info
  }
  
  const setToken = (newToken) => {
    token.value = newToken
    // 同步到本地存储
    if (newToken) {
      localStorage.setItem('token', newToken)
    } else {
      localStorage.removeItem('token')
    }
  }
  
  const logout = () => {
    userInfo.value = null
    token.value = ''
    inviteCode.value = ''
    localStorage.clear()
  }
  
  return {
    // 状态
    userInfo,
    token,
    inviteCode,
    // 计算属性
    isLogin,
    userName,
    // 方法
    setUserInfo,
    setToken,
    logout
  }
})
```

## 📱 移动端开发注意事项

### 触摸优化
```css
/* 优化触摸反馈 */
.button {
  touch-action: manipulation;
  -webkit-tap-highlight-color: transparent;
}

/* 防止双击缩放 */
.no-zoom {
  touch-action: pan-x pan-y;
}
```

### 1px 边框问题
```scss
// mixins.scss
@mixin border-1px($color: #e5e5e5) {
  position: relative;
  
  &::after {
    content: '';
    position: absolute;
    left: 0;
    bottom: 0;
    width: 100%;
    height: 1px;
    background-color: $color;
    transform: scaleY(0.5);
    transform-origin: 0 bottom;
  }
}
```

### 安全区域适配
```css
/* iPhone X 系列适配 */
.container {
  padding-top: env(safe-area-inset-top);
  padding-bottom: env(safe-area-inset-bottom);
  padding-left: env(safe-area-inset-left);
  padding-right: env(safe-area-inset-right);
}
```

## 🧪 测试规范

### 单元测试
```javascript
// tests/components/Button.test.js
import { mount } from '@vue/test-utils'
import Button from '@/components/Button.vue'

describe('Button 组件', () => {
  test('渲染正确的文本', () => {
    const wrapper = mount(Button, {
      props: {
        text: '点击按钮'
      }
    })
    expect(wrapper.text()).toBe('点击按钮')
  })
  
  test('点击事件触发', async () => {
    const wrapper = mount(Button)
    await wrapper.trigger('click')
    expect(wrapper.emitted()).toHaveProperty('click')
  })
})
```

### E2E 测试
```javascript
// tests/e2e/invite.spec.js
describe('邀请功能', () => {
  test('用户可以生成邀请码', () => {
    cy.visit('/invite')
    cy.get('[data-test="generate-code"]').click()
    cy.get('[data-test="invite-code"]').should('contain', 'INV')
  })
})
```

## 🚀 部署指南

### 构建生产版本
```bash
# 构建
npm run build

# 预览构建结果
npm run preview
```

### Nginx 配置
```nginx
server {
    listen 80;
    server_name your-domain.com;
    root /var/www/h5-project/dist;
    index index.html;
    
    # 单页面应用路由
    location / {
        try_files $uri $uri/ /index.html;
    }
    
    # 静态资源缓存
    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }
} 