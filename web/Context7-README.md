# Context7 MCP 服务器配置说明

## 概述
Context7 是一个 MCP (Model Context Protocol) 服务器，由 Upstash 开发，为 AI 编程助手提供实时的、版本特定的文档支持。

## 安装状态
✅ 已通过全局 npm 安装成功
✅ 可通过 `npx @upstash/context7-mcp` 访问

## 配置文件
项目根目录下的 `mcp.config.json` 包含了 Context7 的配置信息：

```json
{
  "mcpServers": {
    "context7": {
      "command": "npx",
      "args": ["@upstash/context7-mcp"],
      "env": {}
    }
  }
}
```

## 使用方法

### 基础命令
```bash
# 查看帮助
npx @upstash/context7-mcp --help

# 启动 stdio 传输模式
npx @upstash/context7-mcp --transport stdio

# 启动 HTTP 传输模式（端口 3000）
npx @upstash/context7-mcp --transport http --port 3000
```

### 功能特性
- 📚 支持 14,000+ 库的实时文档
- 🔄 版本特定的文档支持
- 🛠️ 与 AI 编程助手集成
- 📖 手动更新功能
- 🌐 多种传输协议支持（stdio、http、sse）

## 项目集成
Context7 现已配置到当前 Vue 3 + Vben Admin 项目中，可以为以下技术栈提供文档支持：
- Vue 3.3.4
- Ant Design Vue 4.0.5
- TypeScript 5.1.6
- Vite 4.4.0
- Pinia 2.1.4
- 以及项目中使用的其他依赖库

## 注意事项
- Context7 通过全局安装方式部署，避免了 pnpm workspace 兼容性问题
- 服务器支持多种传输协议，根据需要选择合适的模式
- 建议在开发环境中使用，提供实时的技术文档查询支持