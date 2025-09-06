# 智能翻译助手

一款免费、强大的多功能翻译软件，支持多种翻译服务和丰富的辅助功能。

## 主要功能

- 文本翻译：支持多种语言之间的即时翻译
- 语音输入：支持多语言语音识别
- 图片翻译：识别图片中的文字并翻译
- 文档翻译：支持多种文档格式的批量翻译
- 实时对话：支持双语实时对话翻译
- 词典查询：提供详细的词义解释和例句

## 快捷键

- `Ctrl + M`: 语音输入
- `Ctrl + I`: 图片翻译
- `Ctrl + D`: 文档翻译
- `Ctrl + T`: 实时对话
- `Ctrl + L`: 词典查询
- `Ctrl + Shift + T`: 显示/隐藏主窗口

## 安装说明

1. 确保已安装 Node.js (推荐版本 14.x 或更高)
2. 克隆或下载本项目
3. 在项目目录中运行以下命令：

```bash
# 安装依赖
npm install

# 启动应用
npm start

# 打包应用
npm run build
```

## 配置翻译API

在使用软件之前，需要配置翻译API的密钥。请在 `translator.js` 文件中填入您的API密钥：

```javascript
const appid = 'YOUR_APP_ID';
const key = 'YOUR_SECRET_KEY';
```

您可以使用以下翻译服务：
- 百度翻译开放平台
- 有道智云
- Google Cloud Translation API

## 技术栈

- Electron
- HTML/CSS/JavaScript
- Node.js
- Electron Store

## 注意事项

- 首次使用需要配置翻译API密钥
- 部分功能需要联网使用
- 建议定期更新软件以获取最新功能

## 许可证

MIT License 