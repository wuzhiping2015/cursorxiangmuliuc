Page({
    data: {
        motto: '通过改变小习惯，持续积累大改变',
        hasUserInfo: false
    },

    onLoad() {
        const app = getApp()
        if (app.globalData.userInfo) {
            this.setData({
                hasUserInfo: true
            })
        }
    },

    startUse() {
        if (this.data.hasUserInfo) {
            wx.switchTab({
                url: '/pages/home/index'
            })
        } else {
            wx.getUserProfile({
                desc: '用于完善用户资料',
                success: (res) => {
                    getApp().globalData.userInfo = res.userInfo
                    this.setData({
                        hasUserInfo: true
                    }, () => {
                        wx.switchTab({
                            url: '/pages/home/index'
                        })
                    })
                }
            })
        }
    }
})