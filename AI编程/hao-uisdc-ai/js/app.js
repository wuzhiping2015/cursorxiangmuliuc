// 工具数据渲染和交互功能
document.addEventListener('DOMContentLoaded', function() {
    // 获取DOM元素
    const toolsContainer = document.getElementById('tools-container');
    const searchInput = document.getElementById('search-input');
    const searchBtn = document.getElementById('search-btn');
    const categoryLinks = document.querySelectorAll('.category-nav a');
    const hotTagsContainer = document.getElementById('hot-tags-container');
    
    // 渲染热门标签
    function renderHotTags() {
        if (!hotTagsContainer) return;
        
        // 收集所有标签并计算出现次数
        const tagsCount = {};
        toolsData.forEach(tool => {
            if (tool.tags && tool.tags.length) {
                tool.tags.forEach(tag => {
                    if (tagsCount[tag]) {
                        tagsCount[tag]++;
                    } else {
                        tagsCount[tag] = 1;
                    }
                });
            }
        });
        
        // 转换为数组并排序
        const sortedTags = Object.keys(tagsCount)
            .map(tag => ({ name: tag, count: tagsCount[tag] }))
            .sort((a, b) => b.count - a.count)
            .slice(0, 10); // 只显示前10个热门标签
        
        // 渲染标签
        hotTagsContainer.innerHTML = '';
        sortedTags.forEach(tag => {
            const tagElement = document.createElement('a');
            tagElement.href = '#';
            tagElement.className = 'hot-tag';
            tagElement.textContent = tag.name;
            tagElement.addEventListener('click', function(e) {
                e.preventDefault();
                searchInput.value = tag.name;
                filterTools();
            });
            hotTagsContainer.appendChild(tagElement);
        });
    }
    
    // 渲染工具卡片
    function renderTools(tools) {
        toolsContainer.innerHTML = '';
        
        if (tools.length === 0) {
            toolsContainer.innerHTML = '<div class="no-results">没有找到匹配的工具，请尝试其他关键词</div>';
            return;
        }
        
        tools.forEach(tool => {
            const card = document.createElement('div');
            card.className = 'tool-card';
            
            // 构建标签HTML
            let tagsHtml = '';
            if (tool.tags && tool.tags.length) {
                tagsHtml = `<div class="tool-card-tags">${tool.tags.map(tag => `<span>${tag}</span>`).join('')}</div>`;
            }
            
            // 热门标记
            const hotBadge = tool.isHot ? '<span class="hot-badge">HOT</span>' : '';
            
            card.innerHTML = `
                <div class="tool-card-image">
                    <img src="${tool.image}" alt="${tool.name}" onerror="this.src='./images/placeholder.svg'">
                </div>
                <div class="tool-card-content">
                    <div class="tool-card-title">
                        <a href="${tool.url}" target="_blank">${tool.name}</a>
                        ${hotBadge}
                    </div>
                    <div class="tool-card-description">${tool.description}</div>
                    ${tagsHtml}
                    <a href="${tool.url}" class="tool-card-link" target="_blank">访问网站</a>
                </div>
            `;
            
            toolsContainer.appendChild(card);
        });
    }
    
    // 过滤工具
    function filterTools() {
        const searchTerm = searchInput.value.toLowerCase().trim();
        const activeCategory = document.querySelector('.category-nav a.active').getAttribute('data-category');
        
        let filteredTools = toolsData;
        
        // 按分类筛选
        if (activeCategory !== 'all') {
            filteredTools = filteredTools.filter(tool => 
                tool.category && tool.category.includes(activeCategory)
            );
        }
        
        // 按搜索词筛选
        if (searchTerm) {
            filteredTools = filteredTools.filter(tool => 
                tool.name.toLowerCase().includes(searchTerm) || 
                tool.description.toLowerCase().includes(searchTerm) ||
                (tool.tags && tool.tags.some(tag => tag.toLowerCase().includes(searchTerm)))
            );
        }
        
        renderTools(filteredTools);
    }
    
    // 初始化
    function init() {
        // 渲染所有工具
        renderTools(toolsData);
        
        // 渲染热门标签
        renderHotTags();
        
        // 搜索功能
        searchBtn.addEventListener('click', filterTools);
        searchInput.addEventListener('keyup', function(e) {
            if (e.key === 'Enter') {
                filterTools();
            }
        });
        
        // 分类切换
        categoryLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                
                // 移除所有active类
                categoryLinks.forEach(l => l.classList.remove('active'));
                
                // 添加active类到当前点击的链接
                this.classList.add('active');
                
                // 过滤工具
                filterTools();
            });
        });
    }
    
    // 启动应用
    init();
});