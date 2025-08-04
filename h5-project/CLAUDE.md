# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## 项目概述

这是一个基于 **Vue 3 + Vite** 构建的移动端 H5 邀请拉新项目，采用现代化前端技术栈，专为移动端体验优化。

### 技术栈
- **Vue 3.5**: 使用 Composition API 和 `<script setup>` 语法
- **Vite 7.0**: 现代化构建工具，支持 HMR 和快速构建
- **Vue Router 4**: 单页面应用路由管理
- **Pinia**: 轻量级状态管理库
- **Sass/SCSS**: CSS 预处理器
- **PostCSS**: 移动端适配（px转vw）
- **Axios**: HTTP 请求库
- **ESLint + Prettier**: 代码质量和格式化

## 开发命令

### 基础命令
```bash
# 启动开发服务器
npm run dev

# 构建生产版本
npm run build

# 预览构建结果
npm run preview

# 代码检查
npm run lint

# 代码格式化
npm run format
```

### 环境变量配置
创建 `.env` 文件配置环境变量：
```bash
# API 基础地址
VITE_API_BASE_URL=http://localhost:8080/api
```

### 开发服务器配置
- 默认端口: `3000`
- 自动打开浏览器
- 支持热更新 (HMR)
- API 代理: `/api` -> `http://localhost:8080`

## 项目架构

### 目录结构
```
src/
├── components/          # 组件库
│   ├── common/         # 通用组件 (Button等)
│   └── business/       # 业务组件 (Card等)
├── views/              # 页面组件
│   ├── Home.vue        # 首页
│   └── Invite.vue      # 邀请页
├── stores/             # Pinia 状态管理
│   ├── index.js        # Store 配置
│   ├── user.js         # 用户状态
│   └── invite.js       # 邀请状态
├── router/             # 路由配置
│   └── index.js        # 路由定义
├── utils/              # 工具函数
│   ├── request.js      # HTTP 请求封装
│   └── storage.js      # 本地存储工具
├── assets/             # 静态资源
│   └── styles/         # 样式文件
│       ├── variables.scss  # 设计变量
│       ├── mixins.scss     # Sass mixins
│       └── base.scss       # 基础样式
├── App.vue             # 根组件
└── main.js             # 应用入口
```

### 核心文件说明

#### 1. 路径别名配置 (vite.config.js:10-18)
```javascript
resolve: {
  alias: {
    '@': resolve(__dirname, 'src'),
    '@components': resolve(__dirname, 'src/components'),
    '@views': resolve(__dirname, 'src/views'),
    '@utils': resolve(__dirname, 'src/utils'),
    '@stores': resolve(__dirname, 'src/stores'),
    '@assets': resolve(__dirname, 'src/assets')
  }
}
```

#### 2. 移动端适配配置
- **开发服务器** (vite.config.js:31-42): 支持移动端调试，API 代理配置
- **PostCSS** (postcss.config.js): 自动添加厂商前缀，支持移动端兼容性
- **样式适配**: 手动使用 vw 单位和 Sass mixins 实现响应式

#### 3. 状态管理架构
- **UserStore**: 用户信息、登录状态、个人数据统计
- **InviteStore**: 邀请记录、分享功能、奖励数据管理

#### 4. HTTP 请求架构 (src/utils/request.js)
- **axios 实例配置**: 基础 URL、超时、请求头设置
- **请求拦截器**: token 注入、请求标识、缓存处理
- **响应拦截器**: 统一错误处理、状态码处理、消息提示
- **API 方法封装**: get/post/put/delete/upload/download

#### 5. 组件设计模式
- **通用组件** (`components/common/`): 跨业务复用
- **业务组件** (`components/business/`): 特定业务逻辑

## 开发规范

### 代码规范
- 所有代码必须添加 JSDoc 注释，注释率 100%
- 遵循 ESLint 配置的代码规范
- 使用 Prettier 统一代码格式
- 变量和函数命名使用 camelCase
- 组件文件名使用 PascalCase

### 注释规范
```javascript
/**
 * 函数功能描述
 * @param {string} param1 - 参数说明
 * @returns {Promise<Object>} 返回值说明
 * @author 前端工程师团队
 * @date 2024-12-XX
 */
```

### Vue 3 开发模式
- 优先使用 `<script setup>` 语法
- 使用 Composition API 和响应式 API
- 组件 props 使用 TypeScript 风格定义
- 样式使用 `<style lang="scss" scoped>`

### 移动端优化要点
1. **视口配置**: 移动端 viewport meta 标签设置
2. **触摸优化**: 禁用文本选择和长按菜单等移动端交互优化
3. **响应式设计**: 使用 vw 单位和 Sass mixins
4. **性能优化**: 路由懒加载、组件缓存
5. **兼容性**: PostCSS autoprefixer 支持 Android 4.1+ 和 iOS 7.1+

## 调试和故障排除

### 常见问题
1. **项目启动卡住**: 检查端口占用，确认依赖安装完整
2. **样式不生效**: 确认 SCSS 变量引用路径正确
3. **API 请求失败**: 检查 proxy 配置和后端服务状态
4. **移动端适配问题**: 确认 PostCSS 配置和 viewport 设置

### 开发工具
- Vue DevTools: 用于状态调试
- Chrome DevTools: 移动端调试使用设备模拟
- Network 面板: API 请求监控

## 构建和部署

### 构建配置 (vite.config.js:43-55)
- 输出目录: `dist/`
- 资源目录: `assets/`
- 代码分割: 按 chunk 和入口分离
- 文件命名: 包含 hash 值用于缓存管理

### 生产环境优化
- 代码压缩使用 Terser
- CSS 提取和压缩
- 静态资源优化
- Source map 在生产环境禁用

## 角色定位与开发指南

### 核心使命
- 使用中文进行技术交流
- 专注于 Vue 3 生态系统开发
- 保证代码质量和移动端性能
- 遵循现代前端开发最佳实践

### 问题解决流程
1. **问题分析**: 完整阅读相关代码文件，理解业务逻辑
2. **根因定位**: 分析错误原因，制定解决方案
3. **迭代优化**: 与用户多次交互，根据反馈调整方案
4. **专注修复**: 只修改问题相关代码，避免影响正确功能

### 质量保证
- 代码修改前必须运行 `npm run lint`
- 确保项目能够正常启动和构建
- 保持已验证功能的稳定性
- 修改后进行功能验证测试


