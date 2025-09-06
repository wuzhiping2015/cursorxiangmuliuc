Page({
    data: {
        weekData: {
            total: 5,
            completion: 85,
            streak: 12
        },
        todayDate: '',
        habits: [{
                id: 1,
                name: '晨间步行',
                time: '连续5天',
                completed: true,
                icon: 'https://images.unsplash.com/photo-1470299568568-d4e1c9e1193a?w=100&h=100&fit=crop',
                iconBg: '#4080FF'
            },
            {
                id: 2,
                name: '阅读30分钟',
                time: '连续3天',
                completed: false,
                icon: 'https://images.unsplash.com/photo-1495446815901-a7297e633e8d?w=100&h=100&fit=crop',
                iconBg: '#F5A623'
            },
            {
                id: 3,
                name: '喝水2000ml',
                time: '连续2天',
                completed: false,
                icon: 'https://images.unsplash.com/photo-1523362628745-0c100150b504?w=100&h=100&fit=crop',
                iconBg: '#49D2C2'
            }
        ]
    },

    onLoad() {
        this.setTodayDate()
    },

    onShow() {
        // 从缓存或服务器获取最新数据
        // this.loadHabits()
    },

    setTodayDate() {
        const today = new Date()
        const year = today.getFullYear()
        const month = today.getMonth() + 1
        const date = today.getDate()
        const day = ['日', '一', '二', '三', '四', '五', '六'][today.getDay()]

        this.setData({
            todayDate: `${month}月${date}日 星期${day}`
        })
    },

    toggleComplete(e) {
        const habitId = e.currentTarget.dataset.id
        const habits = this.data.habits.map(habit => {
            if (habit.id === habitId) {
                return {
                    ...habit,
                    completed: !habit.completed
                }
            }
            return habit
        })

        this.setData({ habits })

        // 更新数据到服务器或缓存
        // this.saveHabits(habits)
    },

    goToDetail(e) {
        const habitId = e.currentTarget.dataset.id
        wx.navigateTo({
            url: `/pages/habit/detail?id=${habitId}`
        })
    },

    goToProfile() {
        wx.navigateTo({
            url: '/pages/mine/index'
        })
    },

    showAllData() {
        wx.switchTab({
            url: '/pages/statistics/index'
        })
    },

    addHabit() {
        wx.navigateTo({
            url: '/pages/habit/setting'
        })
    }
})