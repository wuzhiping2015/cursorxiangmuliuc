// 模拟数据
const mockVideos = [{
        id: 1,
        title: '流浪地球3',
        coverUrl: 'https://via.placeholder.com/300x200',
        views: '1.2万观看',
        duration: '2:45',
        author: {
            name: '中国电影官方',
            avatar: 'https://via.placeholder.com/50'
        }
    },
    // 更多视频数据...
];

const mockUsers = [{
        id: 1,
        name: '王导演',
        avatar: 'https://via.placeholder.com/50',
        followers: '10万粉丝'
    },
    // 更多用户数据...
];

// 页面管理
class PageManager {
    constructor() {
        this.currentPage = 'home';
        this.pages = document.querySelectorAll('.page');
        this.navItems = document.querySelectorAll('.nav-item');
        this.bindEvents();
    }

    switchPage(pageName) {
        // 隐藏所有页面
        this.pages.forEach(page => {
            page.classList.remove('active');
        });

        // 显示目标页面
        const targetPage = document.querySelector(`.${pageName}-page`);
        if (targetPage) {
            targetPage.classList.add('active');
        }

        // 更新导航状态
        this.navItems.forEach(item => {
            if (item.dataset.page === pageName) {
                item.classList.add('active');
            } else {
                item.classList.remove('active');
            }
        });

        this.currentPage = pageName;
    }

    bindEvents() {
        // 绑定导航点击事件
        this.navItems.forEach(item => {
            item.addEventListener('click', () => {
                const pageName = item.dataset.page;
                this.switchPage(pageName);
            });
        });
    }
}

// 视频流管理
class VideoFeed {
    constructor() {
        this.container = document.querySelector('.video-feed');
        this.videos = mockVideos;
        this.render();
    }

    render() {
        this.container.innerHTML = this.videos.map(video => `
            <div class="video-card">
                <img src="${video.coverUrl}" alt="${video.title}">
                <div class="video-info">
                    <h3>${video.title}</h3>
                    <div class="video-meta">
                        <span>${video.views}</span>
                        <span>${video.duration}</span>
                    </div>
                    <div class="author">
                        <img src="${video.author.avatar}" alt="${video.author.name}">
                        <span>${video.author.name}</span>
                    </div>
                </div>
            </div>
        `).join('');
    }
}

// 用户推荐管理
class UserRecommendation {
    constructor() {
        this.container = document.querySelector('.user-list');
        this.users = mockUsers;
        this.render();
    }

    render() {
        this.container.innerHTML = this.users.map(user => `
            <div class="user-card">
                <img class="user-avatar" src="${user.avatar}" alt="${user.name}">
                <div class="user-info">
                    <div class="user-name">${user.name}</div>
                    <div class="user-followers">${user.followers}</div>
                </div>
                <button class="follow-btn">关注</button>
            </div>
        `).join('');

        // 绑定关注按钮事件
        this.container.querySelectorAll('.follow-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const button = e.target;
                if (button.textContent === '关注') {
                    button.textContent = '已关注';
                    button.style.backgroundColor = '#808080';
                } else {
                    button.textContent = '关注';
                    button.style.backgroundColor = '#E50914';
                }
            });
        });
    }
}

// 初始化应用
document.addEventListener('DOMContentLoaded', () => {
    const pageManager = new PageManager();
    const videoFeed = new VideoFeed();
    const userRecommendation = new UserRecommendation();
});