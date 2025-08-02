# 拉新预览H5项目

## 📖 项目简介

基于 **Vue 3 + Vite** 构建的移动端拉新邀请H5应用，实现高保真设计图还原，提供流畅的用户体验和完整的邀请分享功能。

## ✨ 核心功能

- 🎯 **邀请分享** - 生成专属邀请码，支持多平台分享
- 💰 **奖励机制** - 分级奖励系统，实时收益统计
- 📊 **数据统计** - 邀请数据可视化，收益明细查询
- 📱 **移动端优化** - 响应式布局，适配各种屏幕尺寸
- 🚀 **性能优化** - 组件懒加载，图片压缩优化

## 🛠 技术栈

### 核心框架
- **Vue 3.5+** - 使用 Composition API
- **Vite 7.0+** - 快速构建工具
- **Vue Router 4** - 单页面路由管理

### 状态管理
- **Pinia 2.1+** - 轻量级状态管理
- **Axios 1.6+** - HTTP 请求库

### 样式处理
- **Sass/SCSS** - CSS 预处理器
- **PostCSS** - CSS 后处理工具
- **移动端适配** - px转vw自动适配

## 📁 项目结构

```
h5-project/
├── docs/                     # 📚 项目文档
│   ├── README.md            # 项目说明
│   └── DEVELOPMENT.md       # 开发指南
├── src/
│   ├── assets/              # 静态资源
│   │   └── styles/         # 样式系统
│   │       ├── variables.scss
│   │       ├── mixins.scss
│   │       └── base.scss
│   ├── components/          # 组件库
│   │   ├── common/         # 通用组件
│   │   │   └── Button.vue
│   │   └── business/       # 业务组件
│   │       └── Card.vue
│   ├── views/              # 页面组件
│   │   ├── Home.vue        # 首页
│   │   └── Invite.vue      # 邀请页面
│   ├── router/             # 路由配置
│   │   └── index.js
│   ├── stores/             # 状态管理
│   │   ├── index.js        # Pinia主配置
│   │   ├── user.js         # 用户状态
│   │   └── invite.js       # 邀请状态
│   ├── utils/              # 工具函数
│   │   ├── request.js      # HTTP请求封装
│   │   └── storage.js      # 本地存储工具
│   ├── App.vue             # 根组件
│   └── main.js             # 入口文件
├── vite.config.js          # Vite配置
├── postcss.config.js       # PostCSS配置
└── package.json            # 依赖管理
```

## 🚀 快速开始

### 环境要求
- Node.js 16.0+
- npm 8.0+ 或 yarn 1.22+

### 安装依赖
```bash
cd h5-project
npm install
```

### 开发模式
```bash
npm run dev
```
访问 http://localhost:3000

### 构建生产版本
```bash
npm run build
```

### 预览生产版本
```bash
npm run preview
```

## 📱 移动端适配

### 视口配置
- 基准设计稿：375px
- 适配方案：px转vw
- 最小字体：12px

### 兼容性
- iOS Safari 12+
- Android Chrome 70+
- 微信浏览器 7.0+

## 🎨 设计规范

### 色彩系统
- 主色调：#FF6B35 (橙色)
- 辅助色：#4CAF50 (绿色)
- 成功色：#52C41A
- 警告色：#FAAD14
- 错误色：#FF4D4F
- 中性色：#333333, #666666, #999999
- 背景色：#F5F5F5

### 字体规范
- 标题字体：PingFang SC Medium
- 正文字体：PingFang SC Regular
- 字体大小：12px - 24px

### 间距系统
- xs: 4px
- sm: 8px  
- base: 16px
- lg: 24px
- xl: 32px
- xxl: 48px

## 🧩 组件库

### 通用组件
- **Button** - 按钮组件，支持多种样式和状态
- **Card** - 卡片组件，支持标题、内容、底部操作

### 业务组件
- **UserStats** - 用户统计卡片
- **InviteCode** - 邀请码展示
- **SharePanel** - 分享面板

## 📦 状态管理

### User Store
- 用户信息管理
- 登录状态控制
- 用户统计数据

### Invite Store  
- 邀请记录管理
- 分享功能实现
- 奖励数据处理

## 🛠 工具函数

### HTTP 请求
- 统一的请求封装
- 自动token处理
- 错误统一处理

### 本地存储
- 支持过期时间
- 数据加密存储
- 自动清理机制

## 🔧 开发规范

### 组件命名
- 使用 PascalCase：`UserCard.vue`
- 业务组件前缀：`Business`
- 通用组件前缀：`Common`

### 文件命名
- 页面文件：`Home.vue`
- 工具函数：`request.js`
- 样式文件：`base.scss`

### 代码规范
- 100% JSDoc 注释覆盖
- 单个文件不超过 500 行
- 遵循 SOLID 原则

## 📊 性能指标

### 目标指标
- 首屏加载时间：< 2秒
- FCP (首次内容绘制)：< 1.5秒
- LCP (最大内容绘制)：< 2.5秒
- 页面大小：< 500KB

### 优化策略
- 组件懒加载
- 图片压缩与格式优化
- 代码分割与缓存
- CDN 加速

## 🔐 安全规范

### 数据安全
- XSS 防护：输入过滤与输出转义
- CSRF 防护：Token 验证
- 敏感信息加密存储

### 隐私保护
- 用户数据最小化收集
- 数据传输 HTTPS 加密
- 本地存储数据加密

## 📈 监控指标

### 用户行为
- 页面访问量 (PV)
- 独立访客数 (UV)
- 用户停留时间
- 转化率统计

### 技术指标
- 接口响应时间
- 错误率监控
- 性能指标追踪

## 🚀 部署指南

### 环境变量
```bash
# 开发环境
VITE_API_BASE_URL=http://localhost:8080/api

# 生产环境  
VITE_API_BASE_URL=https://api.example.com
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
```

## 🤝 团队协作

### 开发流程
1. 需求评审 → 技术方案设计
2. 功能开发 → 代码评审
3. 测试验证 → 发布上线

### 版本管理
- 主分支：`main`
- 开发分支：`develop`
- 功能分支：`feature/xxx`
- 修复分支：`hotfix/xxx`

### 提交规范
```bash
feat: 新增邀请分享功能
fix: 修复用户登录bug
docs: 更新README文档
style: 优化按钮样式
refactor: 重构状态管理
test: 添加单元测试
chore: 更新构建配置
```

## 📞 技术支持

### 联系方式
- 技术负责人：前端工程师团队
- 邮箱：frontend@company.com
- 文档维护：实时更新

### 问题反馈
- Bug 反馈：GitHub Issues
- 功能建议：产品需求池
- 技术讨论：团队技术群

## 📋 待完成功能

### 高优先级
- [ ] 奖励页面开发
- [ ] 个人中心页面
- [ ] 用户登录注册
- [ ] 数据mock服务

### 中优先级
- [ ] 单元测试覆盖
- [ ] E2E测试
- [ ] 错误监控集成
- [ ] 性能优化

### 低优先级
- [ ] PWA支持
- [ ] 国际化支持
- [ ] 主题切换
- [ ] 离线功能

## 📄 许可证

MIT License - 详见 [LICENSE](LICENSE) 文件

---

**项目创建时间：** 2024年12月
**最后更新：** 2024年12月
**维护状态：** 积极维护中 ✅

**技术栈版本：**
- Vue 3.5.17
- Vite 7.0.4
- Vue Router 4.2.5
- Pinia 2.1.7
- Sass 1.69.5

**开发团队：** 前端工程师团队
**项目状态：** 开发中 🚧 