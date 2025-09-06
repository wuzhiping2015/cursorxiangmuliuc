Page({
    data: {
        userInfo: {
            nickname: '李明',
            avatar: '/static/images/avatar.png',
            signature: '让每个小习惯成就更好的自己'
        },
        settingList: [{
                id: 'profile',
                icon: '/static/images/profile.png',
                title: '个人资料',
                desc: '修改头像、昵称等信息'
            },
            {
                id: 'notification',
                icon: '/static/images/notification.png',
                title: '通知设置',
                desc: '自定义通知提醒方式'
            },
            {
                id: 'theme',
                icon: '/static/images/theme.png',
                title: '主题设置',
                desc: '切换显示风格'
            },
            {
                id: 'privacy',
                icon: '/static/images/privacy.png',
                title: '隐私设置',
                desc: '管理数据和隐私'
            }
        ]
    },

    onLoad() {
        this.getUserInfo()
    },

    onShow() {
        // 每次页面显示时更新用户信息
    },

    getUserInfo() {
        const app = getApp()
        if (app.globalData.userInfo) {
            this.setData({
                userInfo: app.globalData.userInfo
            })
        }
    },

    onSettingTap(e) {
        const { id } = e.currentTarget.dataset
        wx.navigateTo({
            url: `/pages/mine/${id}/index`
        })
    },

    logout() {
        wx.showModal({
            title: '提示',
            content: '确定要退出登录吗？',
            success: function(res) {
                if (res.confirm) {
                    // 清除登录状态和缓存
                    wx.clearStorageSync();

                    // 返回到登录页
                    wx.reLaunch({
                        url: '/pages/welcome/index'
                    });
                }
            }
        });
    },

    goToProfile() {
        wx.navigateTo({
            url: '/pages/profile/index'
        });
    },

    goToNotifications() {
        wx.navigateTo({
            url: '/pages/notification/settings'
        });
    },

    goToTheme() {
        wx.navigateTo({
            url: '/pages/theme/settings'
        });
    },

    goToPrivacy() {
        wx.navigateTo({
            url: '/pages/privacy/settings'
        });
    }
})