// Main JavaScript for ABB website

document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle functionality
    const mobileMenuToggle = document.createElement('button');
    mobileMenuToggle.classList.add('mobile-menu-toggle');
    mobileMenuToggle.innerHTML = '<span></span><span></span><span></span>';

    const headerActions = document.querySelector('.header-actions');
    const mainNav = document.querySelector('.main-nav');

    if (headerActions && mainNav) {
        headerActions.parentNode.insertBefore(mobileMenuToggle, headerActions);

        mobileMenuToggle.addEventListener('click', function() {
            mainNav.classList.toggle('active');
        });
    }

    // Add smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');

            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 100,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Sticky header behavior
    const header = document.querySelector('.header');
    let lastScrollTop = 0;

    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

        if (scrollTop > lastScrollTop) {
            // Scrolling down
            header.style.transform = 'translateY(-100%)';
        } else {
            // Scrolling up
            header.style.transform = 'translateY(0)';
        }

        if (scrollTop <= 0) {
            // At the top of the page
            header.style.transform = 'translateY(0)';
        }

        lastScrollTop = scrollTop;
    });

    // Simulate search functionality
    const searchBtn = document.querySelector('.search-btn');

    if (searchBtn) {
        searchBtn.addEventListener('click', function() {
            alert('Search functionality would be implemented here.');
        });
    }

    // Simulate language selector functionality
    const languageBtn = document.querySelector('.language-btn');

    if (languageBtn) {
        languageBtn.addEventListener('click', function() {
            alert('Language selection would be implemented here.');
        });
    }

    // Add active class to current page in navigation
    const currentPage = window.location.pathname;
    const navLinks = document.querySelectorAll('.nav-item a');

    navLinks.forEach(link => {
        const linkPath = link.getAttribute('href');

        if (currentPage.includes(linkPath) ||
            (currentPage === '/' && linkPath === 'index.html')) {
            link.parentElement.classList.add('active');
        }
    });

    // 初始化产品轮播
    const productSlider = document.querySelector('.product-slider');
    if (productSlider) {
        new ProductSlider(productSlider);
    }

    // 初始化产品筛选
    const productCategories = document.querySelector('.product-categories');
    if (productCategories) {
        new ProductFilter(productCategories);
    }

    // 初始化搜索功能
    new ProductSearch();
});

// 产品轮播功能
class ProductSlider {
    constructor(container) {
        this.container = container;
        this.items = container.querySelectorAll('.product-item');
        this.currentIndex = 0;
        this.totalItems = this.items.length;

        this.init();
    }

    init() {
        // 创建导航按钮
        this.createNavButtons();

        // 创建指示器
        this.createIndicators();

        // 初始化显示
        this.showItem(0);

        // 自动播放
        this.startAutoPlay();
    }

    createNavButtons() {
        const prevBtn = document.createElement('button');
        prevBtn.className = 'slider-nav prev';
        prevBtn.innerHTML = '&lt;';

        const nextBtn = document.createElement('button');
        nextBtn.className = 'slider-nav next';
        nextBtn.innerHTML = '&gt;';

        this.container.appendChild(prevBtn);
        this.container.appendChild(nextBtn);

        prevBtn.addEventListener('click', () => this.prev());
        nextBtn.addEventListener('click', () => this.next());
    }

    createIndicators() {
        const indicators = document.createElement('div');
        indicators.className = 'slider-indicators';

        for (let i = 0; i < this.totalItems; i++) {
            const dot = document.createElement('span');
            dot.className = 'indicator-dot';
            dot.addEventListener('click', () => this.showItem(i));
            indicators.appendChild(dot);
        }

        this.container.appendChild(indicators);
        this.indicators = indicators.children;
    }

    showItem(index) {
        // 隐藏所有项目
        this.items.forEach(item => item.style.display = 'none');

        // 移除所有指示器的激活状态
        Array.from(this.indicators).forEach(dot => dot.classList.remove('active'));

        // 显示当前项目
        this.items[index].style.display = 'block';
        this.indicators[index].classList.add('active');

        this.currentIndex = index;
    }

    next() {
        const nextIndex = (this.currentIndex + 1) % this.totalItems;
        this.showItem(nextIndex);
    }

    prev() {
        const prevIndex = (this.currentIndex - 1 + this.totalItems) % this.totalItems;
        this.showItem(prevIndex);
    }

    startAutoPlay() {
        setInterval(() => this.next(), 5000);
    }
}

// 产品筛选功能
class ProductFilter {
    constructor(container) {
        this.container = container;
        this.filters = {};

        this.init();
    }

    init() {
        // 创建筛选器UI
        this.createFilterUI();

        // 添加事件监听
        this.addEventListeners();
    }

    createFilterUI() {
        const filterContainer = document.createElement('div');
        filterContainer.className = 'product-filters';

        // 添加类别筛选
        const categoryFilter = document.createElement('select');
        categoryFilter.innerHTML = `
            <option value="">所有类别</option>
            <option value="electrification">电气化</option>
            <option value="motion">运动控制</option>
            <option value="process">过程自动化</option>
            <option value="robotics">机器人与自动化</option>
        `;

        filterContainer.appendChild(categoryFilter);
        this.container.insertBefore(filterContainer, this.container.firstChild);
    }

    addEventListeners() {
        const filters = this.container.querySelectorAll('select');
        filters.forEach(filter => {
            filter.addEventListener('change', (e) => {
                this.filters[e.target.name] = e.target.value;
                this.applyFilters();
            });
        });
    }

    applyFilters() {
        const products = this.container.querySelectorAll('.product-item');
        products.forEach(product => {
            let show = true;

            // 检查每个筛选条件
            for (let key in this.filters) {
                if (this.filters[key] && product.dataset[key] !== this.filters[key]) {
                    show = false;
                    break;
                }
            }

            product.style.display = show ? 'block' : 'none';
        });
    }
}

// 搜索功能增强
class ProductSearch {
    constructor() {
        this.searchInput = document.querySelector('.search-btn');
        this.searchResults = null;

        this.init();
    }

    init() {
        this.createSearchUI();
        this.addEventListeners();
    }

    createSearchUI() {
        // 创建搜索框
        const searchBox = document.createElement('div');
        searchBox.className = 'search-box';
        searchBox.innerHTML = `
            <input type="text" placeholder="搜索产品...">
            <div class="search-results"></div>
        `;

        document.body.appendChild(searchBox);
        this.searchResults = searchBox.querySelector('.search-results');
    }

    addEventListeners() {
        const input = document.querySelector('.search-box input');

        input.addEventListener('input', (e) => {
            this.handleSearch(e.target.value);
        });
    }

    handleSearch(query) {
        if (!query) {
            this.searchResults.style.display = 'none';
            return;
        }

        // 模拟搜索结果
        const results = [
            { title: 'Terra AC 壁挂式充电桩', category: '电气化' },
            { title: 'IRB 6700 工业机器人', category: '机器人与自动化' },
            { title: 'ACS880 变频器', category: '运动控制' }
        ].filter(item =>
            item.title.toLowerCase().includes(query.toLowerCase()) ||
            item.category.toLowerCase().includes(query.toLowerCase())
        );

        this.displayResults(results);
    }

    displayResults(results) {
        if (results.length === 0) {
            this.searchResults.innerHTML = '<p>未找到相关产品</p>';
        } else {
            this.searchResults.innerHTML = results.map(item => `
                <div class="search-result-item">
                    <h4>${item.title}</h4>
                    <span>${item.category}</span>
                </div>
            `).join('');
        }

        this.searchResults.style.display = 'block';
    }
}