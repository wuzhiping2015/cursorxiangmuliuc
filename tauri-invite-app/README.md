# 邀请拉新助手 - Tauri 桌面版

基于 Tauri + Vue 3 构建的邀请拉新管理桌面应用，提供完整的邀请管理、收益统计和数据分析功能。

## 🚀 项目特点

### 技术优势
- **轻量高效**：相比 Electron 体积更小，性能更优
- **安全可靠**：Rust 后端提供企业级安全保障
- **跨平台**：支持 Windows、macOS、Linux
- **原生集成**：深度系统集成，提供原生桌面体验

### 核心功能
- 🎁 **邀请管理**：生成邀请链接、二维码，支持多渠道分享
- 💰 **收益统计**：实时收益计算、详细记录管理
- 📊 **数据分析**：完整的数据中心和统计分析
- 💾 **本地存储**：SQLite 数据库，数据安全可靠
- 🔔 **系统通知**：原生通知提醒，重要事件不错过
- ⚙️ **系统集成**：系统托盘、文件操作、剪贴板等

## 📋 功能清单

### 用户管理
- [x] 用户注册登录
- [x] 个人资料管理
- [x] 本地身份验证

### 邀请功能
- [x] 邀请链接生成
- [x] 二维码生成和保存
- [x] 多渠道分享（微信、QQ、微博等）
- [x] 邀请记录管理
- [x] 分享统计追踪

### 奖励系统
- [x] 收益计算和统计
- [x] 奖励记录管理
- [x] 多种奖励类型支持
- [x] 提现申请处理

### 桌面特色
- [x] 系统托盘集成
- [x] 文件操作（保存到桌面）
- [x] 系统通知
- [x] 数据备份和恢复
- [x] 应用设置管理

### 数据中心
- [x] 数据统计分析
- [x] 图表展示（开发中）
- [x] 数据导出（CSV、JSON）
- [x] 数据清理和维护

## 🛠️ 开发环境

### 前置要求
- **Node.js** >= 16.0.0
- **Rust** >= 1.60.0
- **npm** 或 **yarn**

### 环境搭建

1. **安装 Rust**
```bash
# Windows
curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh

# macOS/Linux
curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh
```

2. **安装 Tauri CLI**
```bash
cargo install tauri-cli
```

3. **克隆项目**
```bash
git clone <repository-url>
cd tauri-invite-app
```

4. **安装依赖**
```bash
npm install
```

## 🚀 开发命令

### 开发模式
```bash
# 启动开发服务器
npm run tauri:dev

# 或者使用 tauri 命令
npm run tauri dev
```

### 构建应用
```bash
# 构建生产版本
npm run tauri:build

# 仅构建前端
npm run build

# 预览构建结果
npm run preview
```

### 代码质量
```bash
# ESLint 检查
npm run lint

# 代码格式化
npm run format

# Rust 代码检查
cd src-tauri && cargo clippy
```

## 📦 构建和打包

### 开发构建
```bash
npm run tauri:build
```

### 多平台构建
```bash
# Windows (x64)
npm run tauri build -- --target x86_64-pc-windows-msvc

# macOS (Intel)
npm run tauri build -- --target x86_64-apple-darwin

# macOS (Apple Silicon)
npm run tauri build -- --target aarch64-apple-darwin

# Linux (x64)
npm run tauri build -- --target x86_64-unknown-linux-gnu
```

### 构建产物
构建完成后，可执行文件位于：
- **Windows**: `src-tauri/target/release/tauri-invite-app.exe`
- **macOS**: `src-tauri/target/release/bundle/macos/邀请拉新助手.app`
- **Linux**: `src-tauri/target/release/tauri-invite-app`

## 🗂️ 项目结构

```
tauri-invite-app/
├── src/                          # Vue 3 前端代码
│   ├── assets/                   # 静态资源
│   │   └── styles/              # 样式文件
│   ├── components/              # Vue 组件
│   │   ├── common/              # 通用组件
│   │   └── business/            # 业务组件
│   ├── views/                   # 页面组件
│   ├── stores/                  # Pinia 状态管理
│   ├── utils/                   # 工具函数
│   │   └── tauri-api.js        # Tauri API 封装
│   ├── router/                  # 路由配置
│   ├── App.vue                  # 根组件
│   └── main.js                  # 入口文件
├── src-tauri/                   # Rust 后端代码
│   ├── src/
│   │   ├── main.rs             # 主入口
│   │   ├── commands.rs         # Tauri 命令
│   │   ├── database.rs         # 数据库操作
│   │   ├── models.rs           # 数据模型
│   │   ├── utils.rs            # 工具函数
│   │   └── system_tray.rs      # 系统托盘
│   ├── Cargo.toml              # Rust 依赖
│   ├── tauri.conf.json         # Tauri 配置
│   └── build.rs                # 构建脚本
├── public/                      # 公共资源
├── package.json                 # 项目配置
├── vite.config.js              # Vite 配置
└── README.md                   # 项目说明
```

## ⚙️ 配置说明

### Tauri 配置 (`src-tauri/tauri.conf.json`)
- 应用元信息和图标
- 权限和安全设置
- 窗口配置
- 系统托盘设置
- 构建和打包选项

### Vue 配置 (`vite.config.js`)
- 开发服务器设置
- 路径别名配置
- SCSS 预处理器
- 构建优化选项

## 🔧 开发指南

### 添加新的 Tauri 命令

1. **在 `src-tauri/src/commands.rs` 中定义命令**
```rust
#[command]
pub async fn my_new_command(param: String) -> Result<String, String> {
    // 实现逻辑
    Ok("success".to_string())
}
```

2. **在 `main.rs` 中注册命令**
```rust
.invoke_handler(tauri::generate_handler![
    // ... 其他命令
    my_new_command
])
```

3. **在前端调用命令**
```javascript
import { TauriApiService } from '@/utils/tauri-api'

const result = await TauriApiService.invoke('my_new_command', { param: 'value' })
```

### 数据库操作

数据库操作都封装在 `database.rs` 中，使用 SQLite 作为本地数据库：

```rust
// 示例：保存邀请记录
let record = InviteRecord {
    invite_code: "ABC123".to_string(),
    // ... 其他字段
};
let id = db.save_invite_record(&record)?;
```

### 系统托盘菜单

系统托盘功能在 `system_tray.rs` 中实现，支持：
- 左键点击显示/隐藏窗口
- 右键菜单快捷操作
- 通知提醒

## 🎨 界面说明

### 主要页面
1. **首页** - 数据概览和快捷操作
2. **邀请页面** - 生成链接、二维码、多渠道分享
3. **奖励页面** - 收益统计和记录管理
4. **数据中心** - 数据分析和导出
5. **设置页面** - 应用配置和偏好设置

### 桌面特色功能
- **系统托盘** - 常驻后台，快捷访问
- **原生通知** - 系统级通知提醒
- **文件操作** - 直接保存到桌面
- **键盘快捷键** - 提高操作效率

## 📊 数据管理

### 数据存储
- 使用 SQLite 本地数据库
- 数据文件位置：`%APPDATA%/InviteApp/invite_data.db`
- 支持数据备份和恢复

### 数据导出
支持多种格式导出：
- **CSV** - 适合表格软件打开
- **JSON** - 适合程序处理
- **数据库备份** - 完整数据备份

## 🛡️ 安全特性

### 权限控制
- 最小权限原则
- 明确的权限声明
- 安全的文件系统访问

### 数据安全
- 本地数据加密存储
- 安全的网络请求
- 用户数据隐私保护

## 🐛 故障排除

### 常见问题

1. **应用启动失败**
   - 检查 Rust 环境是否正确安装
   - 确认依赖是否完整安装

2. **构建失败**
   - 检查 Node.js 和 Rust 版本
   - 清理缓存：`npm run clean` 或删除 `node_modules`

3. **数据库错误**
   - 检查数据库文件权限
   - 尝试重新创建数据库

4. **系统托盘不显示**
   - 检查系统托盘设置
   - 重启应用

### 日志查看
- 开发模式：控制台输出
- 生产模式：系统日志

## 📝 更新日志

### v1.0.0 (2024-12-25)
- ✨ 初始版本发布
- ✨ 完整的邀请管理功能
- ✨ 桌面特色功能集成
- ✨ 数据中心和统计分析
- ✨ 系统托盘和通知功能

## 🤝 贡献指南

1. Fork 项目
2. 创建功能分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 创建 Pull Request

## 📄 许可证

本项目采用 MIT 许可证 - 查看 [LICENSE](LICENSE) 文件了解详情。

## 📞 支持

如果您遇到问题或有建议，请：
1. 查看文档和 FAQ
2. 搜索现有的 Issues
3. 创建新的 Issue 描述问题

---

**邀请拉新助手** - 让推广变得更简单、更高效！ 🚀