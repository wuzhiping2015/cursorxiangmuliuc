const { app, BrowserWindow, ipcMain, globalShortcut } = require('electron');
const path = require('path');
const Store = require('electron-store');
const translator = require('./translator');

// 初始化配置存储
const store = new Store();

function createWindow() {
    // 创建浏览器窗口
    const mainWindow = new BrowserWindow({
        width: 900,
        height: 600,
        minWidth: 800,
        minHeight: 500,
        frame: false, // 无边框窗口
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
            enableRemoteModule: true
        }
    });

    // 加载index.html
    mainWindow.loadFile('index.html');

    // 注册全局快捷键
    // 显示/隐藏窗口
    globalShortcut.register('CommandOrControl+Shift+T', () => {
        mainWindow.show();
    });

    // 开发者工具
    globalShortcut.register('CommandOrControl+Alt+L', () => {
        mainWindow.webContents.openDevTools();
    });

    // 刷新页面
    globalShortcut.register('CommandOrControl+Alt+R', () => {
        mainWindow.webContents.reload();
    });

    // 最小化窗口
    globalShortcut.register('CommandOrControl+Alt+-', () => {
        mainWindow.minimize();
    });

    // 窗口控制
    ipcMain.on('window-min', () => mainWindow.minimize());
    ipcMain.on('window-max', () => {
        if (mainWindow.isMaximized()) {
            mainWindow.restore();
        } else {
            mainWindow.maximize();
        }
    });
    ipcMain.on('window-close', () => mainWindow.close());

    // 翻译相关IPC通信
    ipcMain.handle('translate', async(event, { text, from, to }) => {
        try {
            const result = await translator.translate(text, from, to);
            return { success: true, result };
        } catch (error) {
            return { success: false, error: error.message };
        }
    });

    // 获取翻译服务状态
    ipcMain.handle('get-service-status', () => {
        return translator.getServiceStatus();
    });

    // 获取翻译统计
    ipcMain.handle('get-stats', () => {
        return translator.getStats();
    });
}

// 应用程序准备就绪时创建窗口
app.whenReady().then(() => {
    // 配置翻译服务API密钥
    translator.setApiKeys('baidu', {
        appid: '20240331001994594',
        key: 'YOUR_BAIDU_KEY'
    });

    translator.setApiKeys('youdao', {
        appid: 'YOUR_YOUDAO_APP_ID',
        key: 'YOUR_YOUDAO_KEY'
    });

    // 默认使用免费的LibreTranslate服务
    createWindow();
});

// 所有窗口关闭时退出应用
app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
        createWindow();
    }
});

// 注销所有快捷键
app.on('will-quit', () => {
    globalShortcut.unregisterAll();
});