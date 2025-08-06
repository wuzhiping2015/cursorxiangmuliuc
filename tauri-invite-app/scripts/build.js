/**
 * 构建脚本
 * 自动化构建和打包流程
 */

const { execSync } = require('child_process')
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
const target = args.find(arg => arg.startsWith('--target='))?.split('=')[1]
const debug = args.includes('--debug')
const clean = args.includes('--clean')

async function main() {
  try {
    log('🚀 开始构建 Tauri 邀请拉新应用...', 'cyan')
    
    // 清理构建文件
    if (clean) {
      log('🧹 清理构建文件...', 'yellow')
      try {
        execSync('rimraf dist src-tauri/target', { stdio: 'inherit' })
        log('✅ 清理完成', 'green')
      } catch (error) {
        log('⚠️ 清理失败，继续构建...', 'yellow')
      }
    }
    
    // 检查环境
    log('🔍 检查构建环境...', 'blue')
    checkEnvironment()
    
    // 安装依赖
    log('📦 检查并安装依赖...', 'blue')
    if (!fs.existsSync('node_modules')) {
      log('安装前端依赖...', 'yellow')
      execSync('npm install', { stdio: 'inherit' })
    }
    
    // 构建前端
    log('🏗️ 构建前端应用...', 'blue')
    execSync('npm run build', { stdio: 'inherit' })
    
    // 构建 Tauri 应用
    log('🦀 构建 Tauri 应用...', 'blue')
    let buildCommand = 'npm run tauri:build'
    
    if (target) {
      buildCommand += ` -- --target ${target}`
      log(`📱 目标平台: ${target}`, 'cyan')
    }
    
    if (debug) {
      log('🐛 调试模式构建', 'yellow')
      // 调试构建的特殊处理
    }
    
    execSync(buildCommand, { stdio: 'inherit' })
    
    // 构建完成
    log('✅ 构建完成！', 'green')
    
    // 显示构建产物信息
    showBuildArtifacts()
    
  } catch (error) {
    log(`❌ 构建失败: ${error.message}`, 'red')
    process.exit(1)
  }
}

function checkEnvironment() {
  try {
    // 检查 Node.js
    const nodeVersion = execSync('node --version', { encoding: 'utf8' }).trim()
    log(`Node.js: ${nodeVersion}`, 'green')
    
    // 检查 npm
    const npmVersion = execSync('npm --version', { encoding: 'utf8' }).trim()
    log(`npm: ${npmVersion}`, 'green')
    
    // 检查 Rust
    const rustVersion = execSync('rustc --version', { encoding: 'utf8' }).trim()
    log(`Rust: ${rustVersion}`, 'green')
    
    // 检查 Tauri CLI
    try {
      const tauriVersion = execSync('npm run tauri --version', { encoding: 'utf8' }).trim()
      log(`Tauri CLI: ${tauriVersion}`, 'green')
    } catch (error) {
      log('⚠️ Tauri CLI 可能未正确安装', 'yellow')
    }
    
  } catch (error) {
    log(`❌ 环境检查失败: ${error.message}`, 'red')
    throw error
  }
}

function showBuildArtifacts() {
  log('\n📋 构建产物信息:', 'cyan')
  
  const targetDir = 'src-tauri/target/release'
  const bundleDir = path.join(targetDir, 'bundle')
  
  try {
    // Windows
    const exePath = path.join(targetDir, 'tauri-invite-app.exe')
    if (fs.existsSync(exePath)) {
      const stats = fs.statSync(exePath)
      log(`Windows 可执行文件: ${exePath} (${formatFileSize(stats.size)})`, 'green')
    }
    
    // macOS
    const appPath = path.join(bundleDir, 'macos/邀请拉新助手.app')
    if (fs.existsSync(appPath)) {
      log(`macOS 应用包: ${appPath}`, 'green')
    }
    
    // Linux
    const linuxPath = path.join(targetDir, 'tauri-invite-app')
    if (fs.existsSync(linuxPath)) {
      const stats = fs.statSync(linuxPath)
      log(`Linux 可执行文件: ${linuxPath} (${formatFileSize(stats.size)})`, 'green')
    }
    
    // 安装包
    if (fs.existsSync(bundleDir)) {
      const bundleFiles = fs.readdirSync(bundleDir, { recursive: true })
      bundleFiles.forEach(file => {
        if (file.endsWith('.msi') || file.endsWith('.dmg') || file.endsWith('.deb') || file.endsWith('.AppImage')) {
          const fullPath = path.join(bundleDir, file)
          const stats = fs.statSync(fullPath)
          log(`安装包: ${fullPath} (${formatFileSize(stats.size)})`, 'green')
        }
      })
    }
    
  } catch (error) {
    log('⚠️ 无法读取构建产物信息', 'yellow')
  }
  
  log('\n🎉 构建完成！可执行文件位于 src-tauri/target/release/ 目录', 'green')
}

function formatFileSize(bytes) {
  const sizes = ['B', 'KB', 'MB', 'GB']
  if (bytes === 0) return '0 B'
  const i = Math.floor(Math.log(bytes) / Math.log(1024))
  return Math.round(bytes / Math.pow(1024, i) * 100) / 100 + ' ' + sizes[i]
}

// 运行构建
main()