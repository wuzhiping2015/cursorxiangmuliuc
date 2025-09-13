#!/usr/bin/env node

/**
 * 项目自动化设置脚本
 * 检查环境、安装依赖、初始化配置
 */

const fs = require('fs')
const path = require('path')
const { execSync } = require('child_process')

// 颜色输出
const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m',
  cyan: '\x1b[36m'
}

function colorLog(color, message) {
  console.log(`${colors[color]}${message}${colors.reset}`)
}

function checkRequirements() {
  colorLog('cyan', '🔍 检查系统要求...')
  
  try {
    // 检查 Node.js 版本
    const nodeVersion = execSync('node --version', { encoding: 'utf8' }).trim()
    const majorVersion = parseInt(nodeVersion.slice(1).split('.')[0])
    
    if (majorVersion < 18) {
      colorLog('red', `❌ Node.js 版本过低: ${nodeVersion}`)
      colorLog('yellow', '   请安装 Node.js 18 或更高版本')
      process.exit(1)
    } else {
      colorLog('green', `✅ Node.js 版本: ${nodeVersion}`)
    }
    
    // 检查包管理器
    let packageManager = 'npm'
    try {
      execSync('pnpm --version', { stdio: 'ignore' })
      packageManager = 'pnpm'
      colorLog('green', '✅ 发现 pnpm，使用 pnpm 安装依赖')
    } catch {
      try {
        execSync('yarn --version', { stdio: 'ignore' })
        packageManager = 'yarn'
        colorLog('green', '✅ 发现 yarn，使用 yarn 安装依赖')
      } catch {
        colorLog('yellow', '⚠️  使用 npm 安装依赖')
      }
    }
    
    return packageManager
    
  } catch (error) {
    colorLog('red', '❌ 系统要求检查失败')
    console.error(error.message)
    process.exit(1)
  }
}

function installDependencies(packageManager) {
  colorLog('cyan', '📦 安装项目依赖...')
  
  try {
    const installCmd = packageManager === 'npm' ? 'npm install' 
                    : packageManager === 'yarn' ? 'yarn install'
                    : 'pnpm install'
    
    colorLog('blue', `执行命令: ${installCmd}`)
    execSync(installCmd, { stdio: 'inherit' })
    colorLog('green', '✅ 依赖安装完成')
    
  } catch (error) {
    colorLog('red', '❌ 依赖安装失败')
    console.error(error.message)
    process.exit(1)
  }
}

function createEnvFile() {
  colorLog('cyan', '⚙️  创建环境配置文件...')
  
  const envTemplate = `# AI Frontend Engineer Blog 环境配置

# 网站基本信息
SITE_URL=http://localhost:3000
SITE_NAME=AI Frontend Engineer Blog

# API 配置
API_BASE=/api
API_SECRET=your-secret-key-here

# 第三方服务（可选）
# Google Analytics
GTAG_ID=

# 邮件订阅服务（可选）
# MAILCHIMP_API_KEY=
# CONVERTKIT_API_KEY=

# 开发模式配置
NODE_ENV=development
NUXT_DEBUG=false

# 构建配置
NITRO_PRESET=node-server
`

  const envPath = path.join(process.cwd(), '.env')
  
  if (!fs.existsSync(envPath)) {
    fs.writeFileSync(envPath, envTemplate)
    colorLog('green', '✅ 创建 .env 文件')
  } else {
    colorLog('yellow', '⚠️  .env 文件已存在，跳过创建')
  }
}

function createGitignore() {
  colorLog('cyan', '📝 创建 .gitignore 文件...')
  
  const gitignoreContent = `# Dependencies
node_modules/
pnpm-lock.yaml
yarn.lock
package-lock.json

# Build outputs
.nuxt/
.output/
.vercel/
.netlify/
dist/

# Environment files
.env
.env.local
.env.production

# IDE
.vscode/
.idea/
*.swp
*.swo

# OS
.DS_Store
Thumbs.db

# Logs
logs/
*.log
npm-debug.log*
yarn-debug.log*
yarn-error.log*

# Runtime data
pids/
*.pid
*.seed
*.pid.lock

# Coverage directory used by tools like istanbul
coverage/

# Dependency directories
jspm_packages/

# Optional npm cache directory
.npm

# Optional REPL history
.node_repl_history

# Nuxt generate
.generate/

# Temporary folders
tmp/
temp/
`

  const gitignorePath = path.join(process.cwd(), '.gitignore')
  
  if (!fs.existsSync(gitignorePath)) {
    fs.writeFileSync(gitignorePath, gitignoreContent)
    colorLog('green', '✅ 创建 .gitignore 文件')
  } else {
    colorLog('yellow', '⚠️  .gitignore 文件已存在，跳过创建')
  }
}

function setupVSCodeSettings() {
  colorLog('cyan', '🛠️  配置 VS Code 设置...')
  
  const vscodeDir = path.join(process.cwd(), '.vscode')
  const settingsPath = path.join(vscodeDir, 'settings.json')
  const extensionsPath = path.join(vscodeDir, 'extensions.json')
  
  // 创建 .vscode 目录
  if (!fs.existsSync(vscodeDir)) {
    fs.mkdirSync(vscodeDir)
  }
  
  // VS Code 设置
  const settings = {
    "editor.formatOnSave": true,
    "editor.codeActionsOnSave": {
      "source.fixAll.eslint": true
    },
    "editor.defaultFormatter": "esbenp.prettier-vscode",
    "typescript.preferences.importModuleSpecifier": "relative",
    "vue.codeActions.enabled": true,
    "tailwindCSS.includeLanguages": {
      "vue": "html"
    },
    "files.associations": {
      "*.vue": "vue"
    }
  }
  
  // 推荐扩展
  const extensions = {
    "recommendations": [
      "vue.volar",
      "antfu.unocss",
      "bradlc.vscode-tailwindcss",
      "esbenp.prettier-vscode",
      "dbaeumer.vscode-eslint",
      "ms-vscode.vscode-typescript-next",
      "christian-kohler.path-intellisense",
      "formulahendry.auto-rename-tag",
      "ms-vscode.vscode-json"
    ]
  }
  
  if (!fs.existsSync(settingsPath)) {
    fs.writeFileSync(settingsPath, JSON.stringify(settings, null, 2))
    colorLog('green', '✅ 创建 VS Code 设置文件')
  }
  
  if (!fs.existsSync(extensionsPath)) {
    fs.writeFileSync(extensionsPath, JSON.stringify(extensions, null, 2))
    colorLog('green', '✅ 创建 VS Code 扩展推荐文件')
  }
}

function printSuccessMessage(packageManager) {
  console.log('')
  colorLog('bright', '🎉 项目设置完成！')
  console.log('')
  
  colorLog('cyan', '📚 接下来的步骤:')
  console.log('')
  
  colorLog('yellow', '1. 启动开发服务器:')
  colorLog('blue', `   ${packageManager} run dev`)
  console.log('')
  
  colorLog('yellow', '2. 在浏览器中访问:')
  colorLog('blue', '   http://localhost:3000')
  console.log('')
  
  colorLog('yellow', '3. 开始自定义你的博客:')
  colorLog('blue', '   - 编辑 content/blog/ 目录添加文章')
  colorLog('blue', '   - 编辑 content/tools/ 目录管理AI工具')
  colorLog('blue', '   - 修改 components/ 目录自定义组件')
  console.log('')
  
  colorLog('yellow', '4. 构建生产版本:')
  colorLog('blue', `   ${packageManager} run build`)
  colorLog('blue', `   ${packageManager} run generate  # 静态站点`)
  console.log('')
  
  colorLog('green', '🚀 开始你的AI工作流之旅吧！')
  console.log('')
  
  colorLog('magenta', '📖 更多帮助信息请查看:')
  colorLog('blue', '   - README.md')
  colorLog('blue', '   - GETTING_STARTED.md')
  console.log('')
}

function main() {
  console.log('')
  colorLog('bright', '🤖 AI Frontend Engineer Blog 项目设置')
  colorLog('cyan', '====================================')
  console.log('')
  
  try {
    const packageManager = checkRequirements()
    installDependencies(packageManager)
    createEnvFile()
    createGitignore()
    setupVSCodeSettings()
    printSuccessMessage(packageManager)
    
  } catch (error) {
    colorLog('red', '❌ 设置过程中出现错误')
    console.error(error)
    process.exit(1)
  }
}

// 运行主函数
if (require.main === module) {
  main()
}

module.exports = {
  checkRequirements,
  installDependencies,
  createEnvFile,
  createGitignore,
  setupVSCodeSettings
}
