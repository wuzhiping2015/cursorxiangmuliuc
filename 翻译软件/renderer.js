const translator = require('./translator');

// DOM 元素
const sourceText = document.getElementById('sourceText');
const targetText = document.getElementById('targetText');
const sourceLang = document.getElementById('sourceLang');
const targetLang = document.getElementById('targetLang');

// 防抖函数
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// 自动翻译
let translateTimer;
document.getElementById('sourceText').addEventListener('input', (e) => {
    clearTimeout(translateTimer);
    translateTimer = setTimeout(async() => {
        const text = e.target.value.trim();
        const targetText = document.getElementById('targetText');

        if (text) {
            targetText.value = '翻译中...';
            try {
                const { success, result, error } = await window.ipcRenderer.invoke('translate', {
                    text,
                    from: sourceLang.value,
                    to: targetLang.value
                });

                if (success) {
                    targetText.value = result;
                    // 自动调整文本框高度
                    targetText.style.height = 'auto';
                    targetText.style.height = targetText.scrollHeight + 'px';
                } else {
                    targetText.value = `❌ ${error}`;
                }
            } catch (error) {
                targetText.value = '⚠️ 翻译失败，请检查网络连接';
            }
        } else {
            targetText.value = '';
        }
    }, 300);
});

// 复制按钮功能
document.querySelectorAll('.tool-button[title="复制"]').forEach(button => {
    button.addEventListener('click', (e) => {
        const textArea = e.target.closest('.text-panel').querySelector('.text-area');
        const text = textArea.value || textArea.textContent;
        if (text) {
            navigator.clipboard.writeText(text).then(() => {
                // 显示复制成功提示
                const tooltip = document.createElement('div');
                tooltip.className = 'tooltip';
                tooltip.textContent = '复制成功';
                tooltip.style.cssText = `
                    position: fixed;
                    background: rgba(0,0,0,0.7);
                    color: white;
                    padding: 5px 10px;
                    border-radius: 4px;
                    font-size: 12px;
                    z-index: 1000;
                `;

                const rect = button.getBoundingClientRect();
                tooltip.style.left = rect.left + 'px';
                tooltip.style.top = (rect.top - 30) + 'px';

                document.body.appendChild(tooltip);
                setTimeout(() => tooltip.remove(), 1500);
            });
        }
    });
});

// 清空按钮功能
document.querySelector('.tool-button[title="清空"]').addEventListener('click', () => {
    sourceText.value = '';
    targetText.textContent = '';
});

// 语言切换功能
document.querySelector('.switch-lang').addEventListener('click', () => {
    const sourceValue = sourceLang.value;
    const targetValue = targetLang.value;

    if (sourceValue !== 'auto') {
        sourceLang.value = targetValue;
        targetLang.value = sourceValue;

        // 如果有已翻译的文本，自动重新翻译
        if (sourceText.value.trim()) {
            translate();
        }
    }
});

// 监听输入变化，使用防抖进行实时翻译
sourceText.addEventListener('input', debounce(() => {
    translate();
}, 300));

// 监听语言选择变化
sourceLang.addEventListener('change', () => {
    if (sourceText.value.trim()) {
        translate();
    }
});

targetLang.addEventListener('change', () => {
    if (sourceText.value.trim()) {
        translate();
    }
});

// 定期更新服务状态
async function updateServiceStatus() {
    try {
        const status = await window.ipcRenderer.invoke('get-service-status');
        const stats = await window.ipcRenderer.invoke('get-stats');

        // TODO: 更新UI显示翻译服务状态和统计信息
        console.log('服务状态:', status);
        console.log('翻译统计:', stats);
    } catch (error) {
        console.error('获取服务状态失败:', error);
    }
}

// 每30秒更新一次服务状态
setInterval(updateServiceStatus, 30000);
updateServiceStatus(); // 初始化时更新一次

// 窗口控制
document.getElementById('minimize').addEventListener('click', () => {
    window.ipcRenderer.send('window-min');
});
document.getElementById('maximize').addEventListener('click', () => {
    window.ipcRenderer.send('window-max');
});
document.getElementById('close').addEventListener('click', () => {
    window.ipcRenderer.send('window-close');
});

// 朗读按钮功能
document.querySelectorAll('.tool-button[title="朗读"]').forEach(button => {
    button.addEventListener('click', async(e) => {
        const textArea = e.target.closest('.text-panel').querySelector('.text-area');
        const text = textArea.value || textArea.textContent;
        const lang = e.target.closest('.text-panel').querySelector('.text-area').id === 'sourceText' ?
            sourceLang.value :
            targetLang.value;

        if (text) {
            try {
                await translator.textToSpeech(text, lang);
            } catch (error) {
                console.error('朗读失败:', error);
                // TODO: 显示错误提示
            }
        }
    });
});

// 工具卡片功能
document.querySelectorAll('.tool-card').forEach(card => {
    card.addEventListener('click', async() => {
        const toolName = card.querySelector('.tool-name').textContent;

        try {
            switch (toolName) {
                case '语音输入':
                    // TODO: 实现语音输入
                    break;
                case '图片翻译':
                    // TODO: 实现图片翻译
                    break;
                case '文档翻译':
                    // TODO: 实现文档翻译
                    break;
                case '实时对话':
                    // TODO: 实现实时对话
                    break;
                case '词典查询':
                    // TODO: 实现词典查询
                    break;
            }
        } catch (error) {
            console.error('功能执行失败:', error);
            // TODO: 显示错误提示
        }
    });
});

// 注册快捷键
document.addEventListener('keydown', (e) => {
    if (e.ctrlKey) {
        switch (e.key.toLowerCase()) {
            case 'm': // 语音输入
                e.preventDefault();
                document.querySelector('.tool-card:nth-child(1)').click();
                break;
            case 'i': // 图片翻译
                e.preventDefault();
                document.querySelector('.tool-card:nth-child(2)').click();
                break;
            case 'd': // 文档翻译
                e.preventDefault();
                document.querySelector('.tool-card:nth-child(3)').click();
                break;
            case 't': // 实时对话
                e.preventDefault();
                document.querySelector('.tool-card:nth-child(4)').click();
                break;
            case 'l': // 词典查询
                e.preventDefault();
                document.querySelector('.tool-card:nth-child(5)').click();
                break;
        }
    }
});