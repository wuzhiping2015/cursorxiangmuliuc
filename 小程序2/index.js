Page({
    data: {
        currentCommunity: '幸福花园小区',
        activeTab: 'all',
        feedList: [],
        isLoading: false,
        refreshing: false,
        noMore: false,
        page: 1,
        pageSize: 10,
        unreadCount: 3, // 未读消息数量
        showBackToTop: false,
        // 轮播图数据
        bannerList: [{
                id: 1,
                imageUrl: '/images/banner1.jpg',
                linkUrl: '/pages/activity/detail?id=1001'
            },
            {
                id: 2,
                imageUrl: '/images/banner2.jpg',
                linkUrl: '/pages/notice/detail?id=2001'
            },
            {
                id: 3,
                imageUrl: '/images/banner3.jpg',
                linkUrl: '/pages/resource/list?category=new'
            }
        ],
        // 社区活动数据
        activityList: [{
                id: 'act_1',
                title: '社区插花活动',
                time: '2023-11-21 14:00',
                image: '/images/activity1.jpg'
            },
            {
                id: 'act_2',
                title: '暑期亲子阅读会',
                time: '2023-11-25 09:30',
                image: '/images/activity2.jpg'
            },
            {
                id: 'act_3',
                title: '居民健康讲座',
                time: '2023-11-28 19:00',
                image: '/images/activity3.jpg'
            }
        ]
    },

    onLoad: function(options) {
        // 获取位置信息
        this.getUserLocation();
        // 加载初始数据
        this.loadFeedData();
        // 获取未读消息数
        this.getUnreadCount();
    },

    // 页面显示时触发
    onShow: function() {
        // 如果从其他页面返回，可能需要刷新数据
        this.getUnreadCount();
    },

    // 监听页面滚动
    onPageScroll: function(e) {
        // 滚动超过一定距离显示返回顶部按钮
        if (e.scrollTop > 300 && !this.data.showBackToTop) {
            this.setData({
                showBackToTop: true
            });
        } else if (e.scrollTop <= 300 && this.data.showBackToTop) {
            this.setData({
                showBackToTop: false
            });
        }
    },

    // 返回顶部
    scrollToTop: function() {
        wx.pageScrollTo({
            scrollTop: 0,
            duration: 300
        });
    },

    // 下拉刷新
    onRefresh: function() {
        if (this.data.isLoading) return;

        this.setData({
            refreshing: true,
            feedList: [],
            page: 1,
            noMore: false
        });

        this.loadFeedData().then(() => {
            this.setData({
                refreshing: false
            });
        });
    },

    // 获取用户位置
    getUserLocation: function() {
        const that = this;
        wx.getLocation({
            type: 'gcj02',
            success(res) {
                // 根据经纬度获取附近小区信息
                that.getNearestCommunity(res.latitude, res.longitude);
            },
            fail() {
                wx.showToast({
                    title: '获取位置信息失败，请检查权限设置',
                    icon: 'none'
                });
            }
        });
    },

    // 获取附近小区信息
    getNearestCommunity: function(latitude, longitude) {
        // 此处应调用后端API获取附近小区信息
        // 模拟数据
        const community = '幸福花园小区';
        this.setData({
            currentCommunity: community
        });
    },

    // 切换小区
    switchCommunity: function() {
        wx.navigateTo({
            url: '/pages/community/community'
        });
    },

    // 获取未读消息数
    getUnreadCount: function() {
        // 此处应调用后端API获取未读消息数
        // 模拟数据
        const unreadCount = Math.floor(Math.random() * 5);
        this.setData({
            unreadCount: unreadCount
        });
    },

    // 加载信息流数据
    loadFeedData: function() {
        if (this.data.isLoading || this.data.noMore) return Promise.resolve();

        const that = this;
        this.setData({ isLoading: true });

        // 返回Promise以支持链式调用
        return new Promise((resolve) => {
            // 模拟API请求获取数据
            setTimeout(() => {
                // 模拟数据
                const newData = this.getMockData();

                if (newData.length < that.data.pageSize) {
                    that.setData({ noMore: true });
                }

                // 追加数据
                that.setData({
                    feedList: [...that.data.feedList, ...newData],
                    page: that.data.page + 1,
                    isLoading: false
                });

                resolve();
            }, 1000);
        });
    },

    // 模拟数据生成
    getMockData: function() {
        const categories = ['互助', '资源共享', '通知', '活动'];
        const mockData = [];

        for (let i = 0; i < this.data.pageSize; i++) {
            const id = this.data.feedList.length + i;
            // 只生成到id=30的数据，用于测试加载完成状态
            if (id >= 30) break;

            const imageCount = Math.floor(Math.random() * 4);
            const images = [];
            for (let j = 0; j < imageCount; j++) {
                images.push(`/images/sample${(j % 5) + 1}.jpg`);
            }

            mockData.push({
                id: `post_${id}`,
                userId: `user_${id % 10 + 1}`,
                username: `用户${id % 10 + 1}`,
                avatar: `/images/avatar${id % 5 + 1}.png`,
                time: '10分钟前',
                category: categories[id % categories.length],
                content: `这是一条示例${id+1}的社区信息分享，可以包含很多内容，比如闲置物品、求助信息、社区活动等。`,
                images: images,
                location: Math.random() > 0.5 ? '幸福花园小区3栋' : '',
                likes: Math.floor(Math.random() * 50),
                comments: Math.floor(Math.random() * 20),
                hasLiked: Math.random() > 0.7 // 随机模拟用户是否已点赞
            });
        }

        return mockData;
    },

    // 切换分类标签
    switchTab: function(e) {
        const tab = e.currentTarget.dataset.tab;
        if (tab === this.data.activeTab) return;

        this.setData({
            activeTab: tab,
            feedList: [],
            page: 1,
            noMore: false
        });

        this.loadFeedData();
    },

    // 搜索输入处理
    onSearchInput: function(e) {
        // 实时搜索逻辑
        const keyword = e.detail.value;
        if (keyword.length > 1) {
            // 可以实现实时搜索提示
            console.log('搜索关键词:', keyword);
        }
    },

    // 搜索确认
    onSearchConfirm: function(e) {
        const keyword = e.detail.value;
        if (keyword.trim()) {
            wx.navigateTo({
                url: `/pages/search/search?keyword=${encodeURIComponent(keyword)}`
            });
        }
    },

    // 查看用户主页
    viewUserProfile: function(e) {
        // 阻止冒泡，避免触发整个feed-item的点击
        const userId = e.currentTarget.dataset.userid;
        wx.navigateTo({
            url: `/pages/user/profile?id=${userId}`
        });
    },

    // 图片预览
    previewImage: function(e) {
        const urls = e.currentTarget.dataset.urls;
        const current = e.currentTarget.dataset.current;
        wx.previewImage({
            urls: urls,
            current: current
        });
    },

    // 切换点赞状态
    toggleLike: function(e) {
        // 阻止冒泡，避免触发整个feed-item的点击
        const id = e.currentTarget.dataset.id;
        const feedList = this.data.feedList;
        const index = feedList.findIndex(item => item.id === id);

        if (index !== -1) {
            const hasLiked = feedList[index].hasLiked;
            const newLikes = hasLiked ?
                Math.max(0, feedList[index].likes - 1) :
                feedList[index].likes + 1;

            const key = `feedList[${index}].hasLiked`;
            const likesKey = `feedList[${index}].likes`;

            this.setData({
                [key]: !hasLiked,
                [likesKey]: newLikes
            });

            // 这里应该调用后端API更新点赞状态
            console.log(`用户${hasLiked ? '取消点赞' : '点赞'}帖子:`, id);
        }
    },

    // 查看评论
    navigateToComment: function(e) {
        // 阻止冒泡，避免触发整个feed-item的点击
        const id = e.currentTarget.dataset.id;
        wx.navigateTo({
            url: `/pages/detail/detail?id=${id}&tab=comment`
        });
    },

    // 分享帖子
    shareFeed: function(e) {
        // 阻止冒泡，避免触发整个feed-item的点击
        const id = e.currentTarget.dataset.id;
        wx.showActionSheet({
            itemList: ['分享给好友', '分享到朋友圈', '复制链接'],
            success: function(res) {
                console.log(`用户选择分享方式:`, res.tapIndex);
                // 根据选择执行不同的分享逻辑
            }
        });
    },

    // 查看帖子详情
    viewDetail: function(e) {
        const id = e.currentTarget.dataset.id;
        wx.navigateTo({
            url: `/pages/detail/detail?id=${id}`
        });
    },

    // 查看活动详情
    viewActivity: function(e) {
        const id = e.currentTarget.dataset.id;
        wx.navigateTo({
            url: `/pages/activity/detail?id=${id}`
        });
    },

    // 加载更多
    loadMore: function() {
        this.loadFeedData();
    },

    // 页面导航
    navigateTo: function(e) {
        const url = e.currentTarget.dataset.url;
        wx.navigateTo({ url });
    },

    onPullDownRefresh: function() {
        // 内置下拉刷新
        this.setData({
            feedList: [],
            page: 1,
            noMore: false
        });
        this.loadFeedData().then(() => {
            wx.stopPullDownRefresh();
        });
    },

    onShareAppMessage: function(res) {
        if (res.from === 'button') {
            // 来自页面内转发按钮
            const id = res.target.dataset.id;
            const feed = this.data.feedList.find(item => item.id === id);

            if (feed) {
                return {
                    title: feed.content.slice(0, 30) + (feed.content.length > 30 ? '...' : ''),
                    path: `/pages/detail/detail?id=${id}&share=true`,
                    imageUrl: feed.images.length > 0 ? feed.images[0] : '/images/share-default.jpg'
                };
            }
        }

        // 默认分享
        return {
            title: '社区信息共享平台',
            path: '/pages/index/index',
            imageUrl: '/images/share-default.jpg'
        };
    },

    onShareTimeline: function() {
        // 分享到朋友圈
        return {
            title: '社区信息共享平台',
            query: '',
            imageUrl: '/images/share-default.jpg'
        };
    }
});