# 🚀 部署指南

本指南将帮助您将AI前端工程师博客部署到各种平台。

## 📋 部署前准备

### 1. 构建项目
```bash
# 安装依赖
pnpm install

# 构建静态文件
pnpm run generate

# 或构建SSR版本
pnpm run build
```

### 2. 环境变量配置
复制 `env.example` 为 `.env` 并配置必要的环境变量：

```bash
cp env.example .env
```

## 🌐 静态部署（推荐）

### Vercel（推荐）

**优势：**
- 零配置部署
- 自动CI/CD
- 全球CDN
- 完美支持Nuxt 3

**部署步骤：**

1. **GitHub集成部署**
   ```bash
   # 1. 将代码推送到GitHub
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin https://github.com/username/ai-frontend-blog
   git push -u origin main
   
   # 2. 在Vercel中导入GitHub仓库
   # 3. Vercel会自动检测Nuxt项目并部署
   ```

2. **Vercel CLI部署**
   ```bash
   # 安装Vercel CLI
   npm i -g vercel
   
   # 登录并部署
   vercel login
   vercel
   ```

3. **环境变量设置**
   在Vercel仪表板中设置环境变量：
   - `SITE_URL`: 您的域名
   - `GTAG_ID`: Google Analytics ID（可选）

**自定义域名配置：**
1. 在Vercel项目设置中添加自定义域名
2. 按照提示配置DNS记录

### Netlify

**部署配置文件 `netlify.toml`：**
```toml
[build]
  command = "pnpm run generate"
  publish = ".output/public"

[build.environment]
  NODE_VERSION = "18"
  PNPM_VERSION = "8"

[[headers]]
  for = "/*"
  [headers.values]
    X-Frame-Options = "DENY"
    X-XSS-Protection = "1; mode=block"
    X-Content-Type-Options = "nosniff"

[[headers]]
  for = "/assets/*"
  [headers.values]
    Cache-Control = "public, max-age=31536000, immutable"
```

**部署步骤：**
1. 连接GitHub仓库
2. 设置构建命令：`pnpm run generate`
3. 设置发布目录：`.output/public`
4. 配置环境变量

### GitHub Pages

**GitHub Actions配置 `.github/workflows/deploy.yml`：**
```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [ main ]
  workflow_dispatch:

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    
    steps:
    - name: Checkout
      uses: actions/checkout@v4
      
    - name: Setup Node.js
      uses: actions/setup-node@v4
      with:
        node-version: '18'
        
    - name: Setup pnpm
      uses: pnpm/action-setup@v2
      with:
        version: 8
        
    - name: Install dependencies
      run: pnpm install
      
    - name: Generate static files
      run: pnpm run generate
      env:
        SITE_URL: https://username.github.io/ai-frontend-blog
        
    - name: Deploy to GitHub Pages
      uses: peaceiris/actions-gh-pages@v3
      with:
        github_token: ${{ secrets.GITHUB_TOKEN }}
        publish_dir: ./.output/public
```

## 🖥️ 服务器部署

### VPS/云服务器（Ubuntu）

**1. 环境准备**
```bash
# 更新系统
sudo apt update && sudo apt upgrade -y

# 安装Node.js 18
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# 安装pnpm
npm install -g pnpm

# 安装PM2（进程管理）
npm install -g pm2
```

**2. 部署应用**
```bash
# 克隆代码
git clone https://github.com/username/ai-frontend-blog.git
cd ai-frontend-blog

# 安装依赖
pnpm install

# 构建项目
pnpm run build

# 配置环境变量
cp env.example .env
nano .env

# 使用PM2启动应用
pm2 start ecosystem.config.js
pm2 save
pm2 startup
```

**3. PM2配置文件 `ecosystem.config.js`：**
```javascript
module.exports = {
  apps: [{
    name: 'ai-frontend-blog',
    port: '3000',
    exec_mode: 'cluster',
    instances: 'max',
    script: './.output/server/index.mjs',
    env: {
      NODE_ENV: 'production',
      NITRO_PORT: 3000,
      NITRO_HOST: '0.0.0.0'
    }
  }]
}
```

**4. Nginx反向代理配置：**
```nginx
server {
    listen 80;
    server_name yourdomain.com;
    
    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }
    
    # 静态资源缓存
    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
        proxy_pass http://localhost:3000;
    }
}
```

## 🔒 SSL证书（HTTPS）

### Let's Encrypt（免费）
```bash
# 安装Certbot
sudo apt install certbot python3-certbot-nginx

# 获取SSL证书
sudo certbot --nginx -d yourdomain.com

# 自动续期
sudo crontab -e
# 添加：0 12 * * * /usr/bin/certbot renew --quiet
```

## 📊 监控和分析

### 1. Google Analytics
在 `.env` 中设置：
```bash
GTAG_ID=G-XXXXXXXXXX
```

### 2. 错误监控（Sentry）
```bash
SENTRY_DSN=https://xxx@xxx.ingest.sentry.io/xxx
```

### 3. 性能监控
- 使用Lighthouse CI进行性能监控
- 配置Uptime Robot监控网站可用性

## 🛠️ 部署优化

### 1. 构建优化
```bash
# 分析包大小
pnpm run build:analyze

# 预渲染静态页面
pnpm run generate
```

### 2. CDN配置
在 `.env` 中配置CDN：
```bash
CDN_URL=https://cdn.yourdomain.com
```

### 3. 缓存策略
```javascript
// nuxt.config.ts
export default defineNuxtConfig({
  nitro: {
    routeRules: {
      '/': { prerender: true },
      '/blog/**': { prerender: true },
      '/tools': { prerender: true },
      '/api/**': { cors: true }
    }
  }
})
```

## 🔧 故障排除

### 常见问题

**1. 构建失败**
```bash
# 清除缓存
rm -rf .nuxt .output node_modules
pnpm install
```

**2. 环境变量未生效**
- 检查 `.env` 文件格式
- 确保没有额外空格
- 重启应用

**3. 静态资源404**
- 检查publicPath配置
- 确认静态文件路径正确

**4. SEO相关问题**
- 检查meta标签生成
- 验证sitemap.xml
- 确认robots.txt配置

## 📈 部署后检查清单

- [ ] 网站能正常访问
- [ ] 所有页面渲染正常
- [ ] 图片资源加载正常
- [ ] SEO标签正确生成
- [ ] 表单功能正常
- [ ] 移动端适配良好
- [ ] 网站速度测试通过
- [ ] SSL证书配置正确
- [ ] 分析工具正常工作

## 🚀 持续集成/持续部署

### GitHub Actions自动部署
```yaml
name: CI/CD Pipeline

on:
  push:
    branches: [ main ]
  pull_request:
    branches: [ main ]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
    - uses: actions/checkout@v4
    - name: Setup Node.js
      uses: actions/setup-node@v4
      with:
        node-version: '18'
    - name: Install dependencies
      run: pnpm install
    - name: Run tests
      run: pnpm run test
    - name: Run linting
      run: pnpm run lint

  deploy:
    needs: test
    runs-on: ubuntu-latest
    if: github.ref == 'refs/heads/main'
    steps:
    - name: Deploy to production
      run: echo "Deploy to production server"
```

---

选择最适合您需求的部署方案，开始您的AI博客之旅！🎉

如果遇到问题，请参考各平台的官方文档或联系技术支持。
