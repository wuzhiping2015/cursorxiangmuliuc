document.addEventListener('DOMContentLoaded', function() {
  // 获取DOM元素
  const textInput = document.getElementById('text-input');
  const styleOptions = document.querySelectorAll('.style-option');
  const previewArea = document.getElementById('preview-area');
  const generateBtn = document.getElementById('generate-btn');
  const downloadBtn = document.getElementById('download-btn');
  
  // 当前选中的样式
  let currentStyle = 'simple';
  // 生成的图片URL
  let generatedImageUrl = null;
  
  // 初始化样式选择
  styleOptions.forEach(option => {
    option.addEventListener('click', function() {
      // 移除所有active类
      styleOptions.forEach(opt => opt.classList.remove('active'));
      // 添加active类到当前选中项
      this.classList.add('active');
      // 更新当前样式
      currentStyle = this.getAttribute('data-style');
      
      // 如果有文本，更新预览
      if (textInput.value.trim()) {
        updatePreview();
      }
    });
  });
  
  // 默认选中第一个样式
  styleOptions[0].classList.add('active');
  
  // 文本输入事件
  textInput.addEventListener('input', function() {
    // 如果文本为空，显示占位符
    if (!this.value.trim()) {
      previewArea.innerHTML = '<p class="preview-placeholder">输入文字并选择样式后显示预览</p>';
      downloadBtn.disabled = true;
      return;
    }
    
    // 更新预览
    updatePreview();
  });
  
  // 生成图片按钮点击事件
  generateBtn.addEventListener('click', function() {
    if (!textInput.value.trim()) {
      alert('请先输入文字内容');
      return;
    }
    
    generateImage();
  });
  
  // 下载图片按钮点击事件
  downloadBtn.addEventListener('click', function() {
    if (!generatedImageUrl) {
      alert('请先生成图片');
      return;
    }
    
    downloadImage();
  });
  
  // 更新预览区域
  function updatePreview() {
    const text = textInput.value.trim();
    if (!text) return;
    
    // 根据当前样式更新预览
    previewArea.innerHTML = '';
    const previewContent = document.createElement('div');
    previewContent.className = `preview-content ${currentStyle}-preview`;
    
    // 处理文本，支持换行
    const paragraphs = text.split('\n').filter(p => p.trim());
    paragraphs.forEach(paragraph => {
      const p = document.createElement('p');
      p.textContent = paragraph;
      previewContent.appendChild(p);
    });
    
    previewArea.appendChild(previewContent);
  }
  
  // 生成图片
  function generateImage() {
    const text = textInput.value.trim();
    if (!text) return;
    
    // 创建一个临时的画布元素
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    
    // 设置画布尺寸 - 竖版，固定宽度，高度自适应
    const width = 300;
    let height = 0;
    
    // 设置字体和样式
    ctx.font = '14px "Microsoft YaHei", sans-serif';
    ctx.textAlign = 'center';
    
    // 计算所需高度
    const lineHeight = 24;
    const padding = 40;
    const maxWidth = width - (padding * 2);
    
    // 分割文本为行
    const lines = [];
    const paragraphs = text.split('\n');
    
    paragraphs.forEach(paragraph => {
      if (!paragraph.trim()) return;
      
      let line = '';
      const words = paragraph.split(' ');
      
      for (let i = 0; i < words.length; i++) {
        const testLine = line + words[i] + ' ';
        const metrics = ctx.measureText(testLine);
        const testWidth = metrics.width;
        
        if (testWidth > maxWidth && i > 0) {
          lines.push(line);
          line = words[i] + ' ';
        } else {
          line = testLine;
        }
      }
      
      lines.push(line);
      // 段落之间添加空行
      if (paragraphs.length > 1) lines.push('');
    });
    
    // 计算总高度
    height = (lines.length * lineHeight) + (padding * 2);
    
    // 设置画布尺寸
    canvas.width = width;
    canvas.height = height;
    
    // 重新设置字体，因为画布尺寸改变后字体设置会重置
    ctx.font = '14px "Microsoft YaHei", sans-serif';
    ctx.textAlign = 'center';
    
    // 应用样式
    applyStyle(ctx, canvas.width, canvas.height);
    
    // 绘制文本
    ctx.fillStyle = getTextColor();
    let y = padding + (lineHeight / 2);
    
    lines.forEach(line => {
      ctx.fillText(line, width / 2, y);
      y += lineHeight;
    });
    
    // 转换为图片URL
    generatedImageUrl = canvas.toDataURL('image/png');
    
    // 显示生成的图片
    previewArea.innerHTML = '';
    const img = document.createElement('img');
    img.src = generatedImageUrl;
    img.className = 'generated-image';
    previewArea.appendChild(img);
    
    // 启用下载按钮
    downloadBtn.disabled = false;
  }
  
  // 根据当前样式应用背景
  function applyStyle(ctx, width, height) {
    switch (currentStyle) {
      case 'simple':
        // 简约风格 - 浅灰渐变背景
        const simpleGradient = ctx.createLinearGradient(0, 0, 0, height);
        simpleGradient.addColorStop(0, '#f5f7fa');
        simpleGradient.addColorStop(1, '#c3cfe2');
        ctx.fillStyle = simpleGradient;
        ctx.fillRect(0, 0, width, height);
        break;
        
      case 'literary':
        // 文艺风格 - 紫蓝渐变背景
        const literaryGradient = ctx.createLinearGradient(0, 0, 0, height);
        literaryGradient.addColorStop(0, '#e0c3fc');
        literaryGradient.addColorStop(1, '#8ec5fc');
        ctx.fillStyle = literaryGradient;
        ctx.fillRect(0, 0, width, height);
        break;
        
      case 'business':
        // 商务风格 - 青紫渐变背景
        const businessGradient = ctx.createLinearGradient(0, 0, 0, height);
        businessGradient.addColorStop(0, '#5ee7df');
        businessGradient.addColorStop(1, '#b490ca');
        ctx.fillStyle = businessGradient;
        ctx.fillRect(0, 0, width, height);
        break;
        
      default:
        // 默认白色背景
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(0, 0, width, height);
    }
  }
  
  // 根据当前样式获取文本颜色
  function getTextColor() {
    switch (currentStyle) {
      case 'simple':
        return '#333333';
      case 'literary':
      case 'business':
        return '#ffffff';
      default:
        return '#333333';
    }
  }
  
  // 下载图片
  function downloadImage() {
    if (!generatedImageUrl) return;
    
    const link = document.createElement('a');
    link.href = generatedImageUrl;
    link.download = `网页金句_${new Date().getTime()}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
});