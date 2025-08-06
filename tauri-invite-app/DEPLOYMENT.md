# 部署指南

本文档详细说明了如何构建、打包和部署邀请拉新助手桌面应用。

## 📋 部署清单

### 构建前准备
- [ ] 确认所有功能测试通过
- [ ] 更新版本号和构建信息
- [ ] 准备应用图标和资源文件
- [ ] 检查配置文件和权限设置
- [ ] 清理调试代码和日志

### 多平台构建
- [ ] Windows (x64) 构建
- [ ] macOS (Intel) 构建
- [ ] macOS (Apple Silicon) 构建
- [ ] Linux (x64) 构建

### 测试验证
- [ ] 安装包完整性测试
- [ ] 基本功能验证
- [ ] 性能和内存检查
- [ ] 不同系统版本兼容性测试

## 🏗️ 构建流程

### 1. 环境准备

#### 开发环境要求
- **Node.js** >= 16.0.0
- **Rust** >= 1.60.0
- **Tauri CLI** >= 1.0.0

#### 安装构建工具
```bash
# 安装 Rust
curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh

# 安装 Tauri CLI
cargo install tauri-cli

# 或者使用 npm
npm install -g @tauri-apps/cli
```

### 2. 项目配置

#### 更新版本信息
更新以下文件中的版本号：
- `package.json` - 前端版本
- `src-tauri/Cargo.toml` - Rust 版本
- `src-tauri/tauri.conf.json` - 应用版本

#### 配置应用图标
将图标文件放置在 `src-tauri/icons/` 目录：
- `icon.ico` - Windows 图标
- `icon.icns` - macOS 图标
- `32x32.png`, `128x128.png` 等 - PNG 图标

### 3. 自动化构建

#### 使用构建脚本
```bash
# 完整构建（推荐）
node scripts/build.js

# 清理后构建
node scripts/build.js --clean

# 指定目标平台
node scripts/build.js --target=x86_64-pc-windows-msvc

# 调试构建
node scripts/build.js --debug
```

#### 手动构建
```bash
# 安装依赖
npm install

# 构建前端
npm run build

# 构建 Tauri 应用
npm run tauri:build
```

### 4. 多平台构建

#### Windows 构建
```bash
# 在 Windows 系统上
npm run tauri build -- --target x86_64-pc-windows-msvc

# 交叉编译（在其他系统上）
rustup target add x86_64-pc-windows-msvc
npm run tauri build -- --target x86_64-pc-windows-msvc
```

#### macOS 构建
```bash
# Intel Mac
npm run tauri build -- --target x86_64-apple-darwin

# Apple Silicon Mac
npm run tauri build -- --target aarch64-apple-darwin

# 通用二进制文件
npm run tauri build -- --target universal-apple-darwin
```

#### Linux 构建
```bash
# Ubuntu/Debian 系统
npm run tauri build -- --target x86_64-unknown-linux-gnu

# 其他发行版可能需要安装额外依赖
sudo apt-get install libwebkit2gtk-4.0-dev \
    build-essential \
    curl \
    wget \
    libssl-dev \
    libgtk-3-dev \
    libayatana-appindicator3-dev \
    librsvg2-dev
```

## 📦 构建产物

### 文件位置
构建完成后，文件位于：
```
src-tauri/target/release/
├── bundle/                    # 安装包和应用包
│   ├── macos/                # macOS 应用包
│   ├── deb/                  # Debian 包
│   ├── msi/                  # Windows 安装包
│   └── appimage/             # Linux AppImage
├── tauri-invite-app.exe      # Windows 可执行文件
├── tauri-invite-app          # Linux 可执行文件
└── deps/                     # 依赖库
```

### 文件说明

#### Windows
- `tauri-invite-app.exe` - 可执行文件
- `bundle/msi/*.msi` - Windows 安装包
- 依赖：Visual C++ Redistributable

#### macOS
- `bundle/macos/邀请拉新助手.app` - 应用包
- `bundle/dmg/*.dmg` - 磁盘映像安装包
- 支持：macOS 10.13+ (High Sierra)

#### Linux
- `tauri-invite-app` - 可执行文件
- `bundle/deb/*.deb` - Debian/Ubuntu 包
- `bundle/appimage/*.AppImage` - 便携应用
- 依赖：WebKit2GTK

## 🚀 部署方式

### 1. 直接分发

#### 优点
- 简单快速
- 无需安装过程
- 便于测试和试用

#### 操作步骤
1. 将可执行文件打包为 ZIP
2. 提供下载链接
3. 用户解压后直接运行

### 2. 安装包分发

#### 优点
- 专业的安装体验
- 自动创建桌面快捷方式
- 支持卸载和更新

#### Windows (.msi)
```bash
# 构建 MSI 安装包
npm run tauri build -- --bundles msi

# 安装包位置
src-tauri/target/release/bundle/msi/邀请拉新助手_1.0.0_x64_zh-CN.msi
```

#### macOS (.dmg)
```bash
# 构建 DMG 安装包
npm run tauri build -- --bundles dmg

# 安装包位置
src-tauri/target/release/bundle/dmg/邀请拉新助手_1.0.0_x64.dmg
```

#### Linux (.deb, .AppImage)
```bash
# 构建 Debian 包
npm run tauri build -- --bundles deb

# 构建 AppImage
npm run tauri build -- --bundles appimage
```

### 3. 应用商店分发

#### Microsoft Store
1. 注册开发者账户
2. 准备 MSIX 包
3. 提交审核

#### Mac App Store
1. 注册 Apple Developer 账户
2. 配置代码签名
3. 准备 .pkg 包
4. 使用 Xcode 提交

## 🔐 代码签名

### Windows 代码签名
```bash
# 获取代码签名证书
# 配置 tauri.conf.json
{
  "tauri": {
    "bundle": {
      "windows": {
        "certificateThumbprint": "YOUR_CERTIFICATE_THUMBPRINT",
        "digestAlgorithm": "sha256",
        "timestampUrl": "http://timestamp.comodoca.com"
      }
    }
  }
}
```

### macOS 代码签名
```bash
# 安装开发者证书
# 配置 tauri.conf.json
{
  "tauri": {
    "bundle": {
      "macOS": {
        "signingIdentity": "Developer ID Application: Your Name",
        "providerShortName": "YOUR_PROVIDER_SHORT_NAME"  
      }
    }
  }
}
```

## 📊 质量保证

### 1. 自动化测试
```bash
# 运行测试套件
npm run test

# 集成测试
npm run test:integration

# 端到端测试
npm run test:e2e
```

### 2. 性能检查
- 启动时间 < 3秒
- 内存占用 < 100MB
- CPU 使用率 < 5%（空闲时）
- 安装包大小 < 50MB

### 3. 兼容性测试

#### Windows
- Windows 10 (1903+)
- Windows 11
- 32位和64位系统

#### macOS  
- macOS 10.13 High Sierra
- macOS 11 Big Sur
- macOS 12 Monterey
- macOS 13 Ventura

#### Linux
- Ubuntu 18.04+
- Debian 10+
- CentOS 7+
- Fedora 30+

## 🔄 持续集成/持续部署

### GitHub Actions 示例
```yaml
name: Build and Release

on:
  push:
    tags: ['v*']

jobs:
  build:
    strategy:
      matrix:
        platform: [windows-latest, macos-latest, ubuntu-latest]
    
    runs-on: ${{ matrix.platform }}
    
    steps:
    - uses: actions/checkout@v3
    
    - name: Setup Node.js
      uses: actions/setup-node@v3
      with:
        node-version: '18'
        
    - name: Setup Rust
      uses: actions-rs/toolchain@v1
      with:
        toolchain: stable
        
    - name: Install dependencies
      run: npm install
      
    - name: Build app
      run: npm run tauri:build
      
    - name: Upload artifacts
      uses: actions/upload-artifact@v3
      with:
        name: app-${{ matrix.platform }}
        path: src-tauri/target/release/bundle/
```

## 📈 监控和分析

### 1. 错误监控
- 集成错误报告系统
- 收集崩溃日志
- 性能指标追踪

### 2. 使用统计
- 功能使用频率
- 用户行为分析
- 反馈收集

### 3. 更新机制
```javascript
// 检查更新
import { checkUpdate, installUpdate } from '@tauri-apps/api/updater'

async function updateApp() {
  try {
    const { shouldUpdate, manifest } = await checkUpdate()
    if (shouldUpdate) {
      // 安装更新
      await installUpdate()
    }
  } catch (error) {
    console.error('更新失败:', error)
  }
}
```

## 🛠️ 故障排除

### 常见构建问题

#### 1. Rust 编译错误
```bash
# 更新 Rust 工具链
rustup update

# 清理构建缓存
cargo clean
```

#### 2. Node.js 依赖问题
```bash
# 清理 npm 缓存
npm cache clean --force

# 删除 node_modules 重新安装
rm -rf node_modules package-lock.json
npm install
```

#### 3. Tauri 配置错误
- 检查 `tauri.conf.json` 语法
- 验证权限配置
- 确认路径设置正确

### 部署问题

#### 1. 应用启动失败
- 检查依赖库是否齐全
- 验证系统兼容性
- 查看错误日志

#### 2. 功能异常
- 检查权限设置
- 验证网络连接
- 确认数据库文件权限

## 📝 发布清单

### 发布前检查
- [ ] 所有功能正常工作
- [ ] 性能指标达标
- [ ] 多平台测试通过
- [ ] 文档更新完成
- [ ] 版本号正确更新

### 发布内容
- [ ] 可执行文件
- [ ] 安装包
- [ ] 用户手册
- [ ] 更新日志
- [ ] 系统要求说明

### 发布后跟踪
- [ ] 下载量统计
- [ ] 用户反馈收集
- [ ] 问题和建议处理
- [ ] 下一版本规划

---

**部署成功！** 🎉

您的邀请拉新助手现在可以分发给用户使用了。记得持续收集用户反馈，不断改进产品体验。