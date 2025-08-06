/**
 * 开发脚本
 * 启动开发环境
 */

const { spawn, execSync } = require('child_process')
const fs = require('fs')
const path = require('path')

// 颜色输出
const colors = {
  reset: '\x1b[0m',
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  cyan: '\x1b[36m'
}

const log = (message, color = 'reset') => {
  console.log(`${colors[color]}${message}${colors.reset}`)
}

// 获取命令行参数
const args = process.argv.slice(2)
const port = args.find(arg => arg.startsWith('--port='))?.split('=')[1] || '1420'
const host = args.find(arg => arg.startsWith('--host='))?.split('=')[1] || 'localhost'

async function main() {
  try {
    log('🚀 启动 Tauri 开发环境...', 'cyan')
    
    // 检查环境
    log('🔍 检查开发环境...', 'blue')
    checkDevelopmentEnvironment()
    
    // 检查依赖
    log('📦 检查依赖...', 'blue')
    await checkDependencies()
    
    // 启动开发服务器
    log(`🌐 启动前端开发服务器 (http://${host}:${port})...`, 'blue')
    
    // 设置环境变量
    process.env.TAURI_DEBUG = '1'
    process.env.RUST_LOG = 'tauri=debug'
    
    // 启动 Tauri 开发模式
    log('🦀 启动 Tauri 开发模式...', 'blue')
    const tauriProcess = spawn('npm', ['run', 'tauri:dev'], {
      stdio: 'inherit',
      shell: true,
      env: {
        ...process.env,
        VITE_DEV_SERVER_URL: `http://${host}:${port}`,
      }
    })
    
    // 处理进程退出
    tauriProcess.on('close', (code) => {
      if (code !== 0) {
        log(`❌ Tauri 进程退出，代码: ${code}`, 'red')
        process.exit(code)
      }
    })
    
    // 处理中断信号
    process.on('SIGINT', () => {
      log('\n🛑 正在关闭开发服务器...', 'yellow')
      tauriProcess.kill('SIGINT')
      process.exit(0)
    })
    
    process.on('SIGTERM', () => {
      log('\n🛑 正在关闭开发服务器...', 'yellow')
      tauriProcess.kill('SIGTERM')
      process.exit(0)
    })
    
    log('✅ 开发环境启动成功！', 'green')
    log(`🌍 前端地址: http://${host}:${port}`, 'cyan')
    log('💡 使用 Ctrl+C 停止服务器', 'yellow')
    
  } catch (error) {
    log(`❌ 启动失败: ${error.message}`, 'red')
    process.exit(1)
  }
}

function checkDevelopmentEnvironment() {
  try {
    // 检查 Node.js
    const nodeVersion = execSync('node --version', { encoding: 'utf8' }).trim()
    const nodeMajorVersion = parseInt(nodeVersion.slice(1).split('.')[0])
    
    if (nodeMajorVersion < 16) {
      throw new Error(`Node.js 版本过低 (${nodeVersion})，需要 >= 16.0.0`)
    }
    log(`✅ Node.js: ${nodeVersion}`, 'green')
    
    // 检查 Rust
    const rustVersion = execSync('rustc --version', { encoding: 'utf8' }).trim()
    log(`✅ Rust: ${rustVersion}`, 'green')
    
    // 检查 Cargo
    const cargoVersion = execSync('cargo --version', { encoding: 'utf8' }).trim()
    log(`✅ Cargo: ${cargoVersion}`, 'green')
    
    // 检查端口是否被占用
    checkPort(port)
    
  } catch (error) {
    log(`❌ 环境检查失败: ${error.message}`, 'red')
    throw error
  }
}

async function checkDependencies() {
  // 检查 package.json
  if (!fs.existsSync('package.json')) {
    throw new Error('package.json 文件不存在')
  }
  
  // 检查 node_modules
  if (!fs.existsSync('node_modules')) {
    log('📦 安装前端依赖...', 'yellow')
    execSync('npm install', { stdio: 'inherit' })
  }
  
  // 检查 Tauri 配置
  if (!fs.existsSync('src-tauri/tauri.conf.json')) {
    throw new Error('Tauri 配置文件不存在')
  }
  
  // 检查 Cargo.toml
  if (!fs.existsSync('src-tauri/Cargo.toml')) {
    throw new Error('Cargo.toml 文件不存在')
  }
  
  log('✅ 依赖检查完成', 'green')
}

function checkPort(port) {
  const net = require('net')
  
  const server = net.createServer()
  
  server.listen(port, (err) => {
    if (err) {
      throw new Error(`端口 ${port} 已被占用`)
    }
    server.close()
  })
  
  server.on('error', (err) => {
    if (err.code === 'EADDRINUSE') {
      throw new Error(`端口 ${port} 已被占用，请使用 --port=其他端口 指定其他端口`)
    }
    throw err
  })
}

// 显示帮助信息
function showUsage() {
  log('\n📖 使用方法:', 'cyan')
  log('  npm run dev                    # 启动开发服务器', 'white')
  log('  npm run dev -- --port=3000    # 指定端口', 'white')
  log('  npm run dev -- --host=0.0.0.0 # 指定主机', 'white')
  log('\n📋 可用选项:', 'cyan')
  log('  --port=PORT    指定端口号 (默认: 1420)', 'white')
  log('  --host=HOST    指定主机地址 (默认: localhost)', 'white')
  log('  --help         显示帮助信息', 'white')
}

// 检查是否需要显示帮助
if (args.includes('--help') || args.includes('-h')) {
  showUsage()
  process.exit(0)
}

// 运行开发服务器
main()