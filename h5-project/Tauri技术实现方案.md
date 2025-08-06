# 邀请拉新平台 - Tauri 技术实现方案

## 项目概述

基于现有 Vue 3 H5 邀请拉新平台，使用 Tauri 技术栈构建跨平台桌面应用，提供更好的用户体验和本地功能集成。

---

## Tauri 技术优势

### 为什么选择 Tauri？

1. **轻量级**：相比 Electron 更小的应用包体积
2. **安全性**：Rust 后端提供更高的安全保障
3. **性能优异**：原生性能，内存占用更少
4. **跨平台**：支持 Windows、macOS、Linux
5. **现代化**：支持现代 Web 技术栈
6. **原生集成**：可访问系统 API 和硬件功能

### 技术架构对比

| 特性 | 当前 H5 版本 | Tauri 桌面版 |
|------|-------------|-------------|
| 平台支持 | 移动端浏览器 | Windows/Mac/Linux 桌面 |
| 性能 | 依赖浏览器 | 原生性能 |
| 离线能力 | 有限 | 完整支持 |
| 系统集成 | 受限 | 完整 API 访问 |
| 分发方式 | Web 部署 | 应用商店/直接下载 |

---

## 技术实现方案

### 1. 项目结构设计

```
tauri-invite-app/
├── src-tauri/                 # Rust 后端
│   ├── src/
│   │   ├── main.rs           # 主入口
│   │   ├── commands.rs       # Tauri 命令
│   │   ├── menu.rs           # 应用菜单
│   │   └── utils.rs          # 工具函数
│   ├── Cargo.toml            # Rust 依赖配置
│   └── tauri.conf.json       # Tauri 配置
├── src/                      # 前端代码（复用现有 Vue 3 代码）
│   ├── components/
│   ├── views/
│   ├── stores/
│   └── utils/
├── public/
├── package.json
└── vite.config.js
```

### 2. 核心技术栈

#### 前端技术栈（保持现有）
- **Vue 3.5** + Composition API
- **Vite 7.0** 构建工具
- **Pinia** 状态管理
- **Vue Router 4** 路由管理
- **Sass/SCSS** 样式方案

#### 后端技术栈（新增）
- **Rust** 系统后端
- **Tauri** 桌面应用框架
- **SQLite** 本地数据库
- **Serde** 数据序列化

### 3. 功能模块实现

#### 3.1 系统集成增强功能

```rust
// src-tauri/src/commands.rs
use tauri::command;

#[command]
pub async fn save_qrcode_to_desktop(image_data: String, filename: String) -> Result<String, String> {
    // 保存二维码到桌面
    let desktop_path = dirs::desktop_dir().unwrap();
    let file_path = desktop_path.join(filename);
    
    // 解码并保存图片
    // 实现图片保存逻辑
    Ok(file_path.to_string_lossy().to_string())
}

#[command]
pub async fn copy_invite_link(link: String) -> Result<(), String> {
    // 系统剪贴板操作
    use clipboard::{ClipboardProvider, ClipboardContext};
    let mut ctx: ClipboardContext = ClipboardProvider::new().unwrap();
    ctx.set_contents(link).map_err(|e| e.to_string())
}

#[command]
pub async fn open_external_link(url: String) -> Result<(), String> {
    // 打开外部链接
    open::that(url).map_err(|e| e.to_string())
}

#[command]
pub async fn get_system_info() -> Result<SystemInfo, String> {
    // 获取系统信息
    Ok(SystemInfo {
        platform: std::env::consts::OS.to_string(),
        arch: std::env::consts::ARCH.to_string(),
    })
}
```

#### 3.2 本地数据存储

```rust
// src-tauri/src/database.rs
use rusqlite::{Connection, Result};
use serde::{Deserialize, Serialize};

#[derive(Serialize, Deserialize)]
pub struct InviteRecord {
    pub id: i32,
    pub invite_code: String,
    pub created_at: String,
    pub status: String,
}

pub struct Database {
    conn: Connection,
}

impl Database {
    pub fn new() -> Result<Self> {
        let conn = Connection::open("invite_data.db")?;
        
        // 创建表结构
        conn.execute(
            "CREATE TABLE IF NOT EXISTS invite_records (
                id INTEGER PRIMARY KEY,
                invite_code TEXT NOT NULL,
                created_at TEXT NOT NULL,
                status TEXT NOT NULL
            )",
            [],
        )?;

        Ok(Database { conn })
    }

    pub fn save_invite_record(&self, record: &InviteRecord) -> Result<()> {
        self.conn.execute(
            "INSERT INTO invite_records (invite_code, created_at, status) VALUES (?1, ?2, ?3)",
            [&record.invite_code, &record.created_at, &record.status],
        )?;
        Ok(())
    }

    pub fn get_invite_records(&self) -> Result<Vec<InviteRecord>> {
        let mut stmt = self.conn.prepare("SELECT * FROM invite_records ORDER BY created_at DESC")?;
        let record_iter = stmt.query_map([], |row| {
            Ok(InviteRecord {
                id: row.get(0)?,
                invite_code: row.get(1)?,
                created_at: row.get(2)?,
                status: row.get(3)?,
            })
        })?;

        let mut records = Vec::new();
        for record in record_iter {
            records.push(record?);
        }
        Ok(records)
    }
}
```

#### 3.3 系统通知功能

```rust
// src-tauri/src/notifications.rs
use tauri::api::notification::Notification;

#[command]
pub async fn send_notification(title: String, body: String) -> Result<(), String> {
    Notification::new("com.invite.app")
        .title(&title)
        .body(&body)
        .show()
        .map_err(|e| e.to_string())
}

#[command]
pub async fn notify_new_invite(invite_info: String) -> Result<(), String> {
    send_notification(
        "新邀请成功".to_string(),
        format!("恭喜！您成功邀请了新用户：{}", invite_info)
    ).await
}
```

### 4. 前端适配改造

#### 4.1 Tauri API 集成

```javascript
// src/utils/tauri-api.js
import { invoke } from '@tauri-apps/api/tauri'
import { message } from '@tauri-apps/api/dialog'
import { sendNotification } from '@tauri-apps/api/notification'

export class TauriApiService {
  /**
   * 保存二维码到桌面
   */
  static async saveQRCodeToDesktop(imageData, filename = 'invite-qrcode.png') {
    try {
      const path = await invoke('save_qrcode_to_desktop', {
        imageData,
        filename
      })
      await message('二维码已保存到桌面！', { title: '保存成功', type: 'info' })
      return { success: true, path }
    } catch (error) {
      await message(`保存失败：${error}`, { title: '错误', type: 'error' })
      return { success: false, error }
    }
  }

  /**
   * 复制邀请链接到剪贴板
   */
  static async copyInviteLink(link) {
    try {
      await invoke('copy_invite_link', { link })
      await sendNotification({
        title: '复制成功',
        body: '邀请链接已复制到剪贴板'
      })
      return { success: true }
    } catch (error) {
      return { success: false, error }
    }
  }

  /**
   * 打开外部链接
   */
  static async openExternalLink(url) {
    try {
      await invoke('open_external_link', { url })
      return { success: true }
    } catch (error) {
      return { success: false, error }
    }
  }

  /**
   * 获取系统信息
   */
  static async getSystemInfo() {
    try {
      const info = await invoke('get_system_info')
      return { success: true, data: info }
    } catch (error) {
      return { success: false, error }
    }
  }

  /**
   * 发送系统通知
   */
  static async sendNotification(title, body) {
    try {
      await invoke('send_notification', { title, body })
      return { success: true }
    } catch (error) {
      return { success: false, error }
    }
  }
}
```

#### 4.2 组件适配示例

```vue
<!-- src/views/Invite.vue 桌面版适配 -->
<template>
  <div class="invite-page desktop-version">
    <!-- 现有内容保持不变 -->
    
    <!-- 桌面版增强功能 -->
    <div class="desktop-features">
      <div class="quick-actions-desktop">
        <button class="desktop-btn" @click="saveQRCodeToDesktop">
          <span class="btn-icon">💾</span>
          <span class="btn-text">保存二维码到桌面</span>
        </button>
        
        <button class="desktop-btn" @click="openInviteFolder">
          <span class="btn-icon">📁</span>
          <span class="btn-text">打开邀请记录</span>
        </button>
        
        <button class="desktop-btn" @click="setupAutoNotification">
          <span class="btn-icon">🔔</span>
          <span class="btn-text">开启自动通知</span>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { TauriApiService } from '@/utils/tauri-api'

// 保存二维码到桌面
const saveQRCodeToDesktop = async () => {
  if (!qrCodeCanvasRef.value) return
  
  const canvas = qrCodeCanvasRef.value
  const imageData = canvas.toDataURL('image/png')
  
  await TauriApiService.saveQRCodeToDesktop(imageData, '我的邀请二维码.png')
}

// 打开邀请记录文件夹
const openInviteFolder = async () => {
  // 调用系统文件管理器
  await TauriApiService.openExternalLink('file://./invite-records')
}

// 设置自动通知
const setupAutoNotification = async () => {
  // 设置邀请成功时的自动通知
  await TauriApiService.sendNotification(
    '通知设置',
    '已开启邀请成功自动通知'
  )
}

onMounted(async () => {
  // 检查系统信息
  const systemInfo = await TauriApiService.getSystemInfo()
  console.log('运行环境:', systemInfo.data)
})
</script>

<style lang="scss" scoped>
.desktop-version {
  // 桌面版特定样式
  .desktop-features {
    margin: $spacing-base;
    
    .quick-actions-desktop {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: $spacing-base;
      
      .desktop-btn {
        display: flex;
        align-items: center;
        gap: $spacing-sm;
        padding: $spacing-base;
        background: linear-gradient(135deg, $primary-color, $primary-light);
        color: white;
        border: none;
        border-radius: $border-radius-lg;
        cursor: pointer;
        transition: all 0.3s ease;
        
        &:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 25px rgba($primary-color, 0.3);
        }
        
        .btn-icon {
          font-size: $font-size-lg;
        }
        
        .btn-text {
          font-weight: $font-weight-medium;
        }
      }
    }
  }
}

// 桌面版窗口样式适配
@media (min-width: 768px) {
  .invite-page {
    max-width: 1200px;
    margin: 0 auto;
    padding: $spacing-lg;
  }
}
</style>
```

### 5. 配置文件

#### 5.1 Tauri 配置

```json
// src-tauri/tauri.conf.json
{
  "package": {
    "productName": "邀请拉新助手",
    "version": "1.0.0"
  },
  "build": {
    "distDir": "../dist",
    "devPath": "http://localhost:3000",
    "beforeDevCommand": "npm run dev",
    "beforeBuildCommand": "npm run build"
  },
  "tauri": {
    "allowlist": {
      "all": false,
      "shell": {
        "all": false,
        "open": true
      },
      "dialog": {
        "all": false,
        "message": true,
        "save": true
      },
      "notification": {
        "all": true
      },
      "clipboard": {
        "all": true
      },
      "fs": {
        "all": false,
        "writeFile": true,
        "readFile": true,
        "createDir": true
      }
    },
    "bundle": {
      "active": true,
      "category": "Productivity",
      "copyright": "©2024 邀请拉新平台",
      "deb": {
        "depends": []
      },
      "externalBin": [],
      "icon": [
        "icons/32x32.png",
        "icons/128x128.png",
        "icons/128x128@2x.png",
        "icons/icon.icns",
        "icons/icon.ico"
      ],
      "identifier": "com.invite.app",
      "longDescription": "专业的邀请拉新管理工具，助您轻松管理推广业务",
      "macOS": {
        "entitlements": null,
        "exceptionDomain": "",
        "frameworks": [],
        "providerShortName": null,
        "signingIdentity": null
      },
      "resources": [],
      "shortDescription": "邀请拉新助手",
      "targets": "all",
      "windows": {
        "certificateThumbprint": null,
        "digestAlgorithm": "sha256",
        "timestampUrl": ""
      }
    },
    "security": {
      "csp": null
    },
    "updater": {
      "active": false
    },
    "windows": [
      {
        "fullscreen": false,
        "height": 800,
        "resizable": true,
        "title": "邀请拉新助手",
        "width": 1200,
        "minWidth": 800,
        "minHeight": 600,
        "center": true
      }
    ]
  }
}
```

#### 5.2 构建配置

```toml
# src-tauri/Cargo.toml
[package]
name = "invite-app"
version = "1.0.0"
description = "邀请拉新桌面应用"
authors = ["开发团队"]
license = "MIT"
repository = ""
default-run = "invite-app"
edition = "2021"
rust-version = "1.57"

[build-dependencies]
tauri-build = { version = "1.0", features = [] }

[dependencies]
serde_json = "1.0"
serde = { version = "1.0", features = ["derive"] }
tauri = { version = "1.0", features = ["api-all", "system-tray"] }
tokio = { version = "1", features = ["full"] }
rusqlite = { version = "0.29", features = ["bundled"] }
clipboard = "0.5"
open = "5.0"
dirs = "5.0"

[features]
default = ["custom-protocol"]
custom-protocol = ["tauri/custom-protocol"]
```

---

## 开发部署流程

### 1. 开发环境搭建

```bash
# 1. 安装 Rust
curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh

# 2. 安装 Tauri CLI
cargo install tauri-cli

# 3. 初始化 Tauri 项目
npm create tauri-app

# 4. 安装依赖
npm install
cd src-tauri && cargo build
```

### 2. 开发命令

```bash
# 开发模式
npm run tauri dev

# 构建应用
npm run tauri build

# 仅构建前端
npm run build

# 代码检查
npm run lint
cargo clippy
```

### 3. 打包分发

```bash
# Windows 平台
npm run tauri build -- --target x86_64-pc-windows-msvc

# macOS 平台
npm run tauri build -- --target x86_64-apple-darwin

# Linux 平台
npm run tauri build -- --target x86_64-unknown-linux-gnu
```

---

## 功能增强对比

### 相比 H5 版本的优势

| 功能 | H5 版本 | Tauri 桌面版 |
|------|---------|-------------|
| 二维码保存 | 浏览器下载 | 直接保存到桌面 |
| 链接复制 | Web API限制 | 系统剪贴板直接操作 |
| 通知提醒 | 浏览器通知 | 系统原生通知 |
| 数据存储 | localStorage | SQLite本地数据库 |
| 离线功能 | 受限 | 完整离线支持 |
| 系统集成 | 无 | 完整系统API访问 |
| 性能表现 | 依赖浏览器 | 原生应用性能 |
| 用户体验 | 网页体验 | 原生桌面体验 |

### 新增桌面特色功能

1. **自动化工具**
   - 定时检查邀请状态
   - 自动生成分享素材
   - 批量操作管理

2. **数据分析增强**
   - 本地数据缓存
   - 离线数据分析
   - 详细统计报表

3. **系统集成**
   - 开机自启动
   - 系统托盘常驻
   - 快捷键操作

4. **文件管理**
   - 邀请记录导出
   - 素材文件管理
   - 自动备份功能

---

## 总结

使用 Tauri 技术实现邀请拉新平台的桌面版本，能够在保持现有 Vue 3 前端代码的基础上，大幅提升用户体验和功能完整性。通过 Rust 后端的加持，应用具备了更好的性能、安全性和系统集成能力。

**推荐实施步骤：**

1. **第一阶段**：基础 Tauri 项目搭建，移植现有 Vue 3 代码
2. **第二阶段**：实现桌面特色功能，如文件操作、系统通知等
3. **第三阶段**：优化用户体验，添加自动化工具和高级功能
4. **第四阶段**：完善打包分发，支持多平台部署

这个方案能够将您的邀请拉新业务从移动端 H5 扩展到桌面端，为用户提供更专业、更便捷的推广工具体验。