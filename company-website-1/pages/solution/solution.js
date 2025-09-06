// pages/solution/solution.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    products: [
      {
        id: 1,
        title: '智能办公解决方案',
        image: '/pages/index/images/service1.png',
        description: '为企业提供一站式智能办公解决方案',
        features: [
          '智能会议系统',
          '文档协作平台',
          '工作流程自动化',
          '数据分析报表'
        ],
        price: '¥299,999起'
      },
      {
        id: 2,
        title: '企业数字化转型方案',
        image: '/pages/index/images/service2.png',
        description: '助力企业实现数字化转型升级',
        features: [
          '业务流程重构',
          '数据中台建设',
          '智能决策系统',
          '全渠道营销'
        ],
        price: '¥499,999起'
      },
      {
        id: 3,
        title: '云服务解决方案',
        image: '/pages/index/images/service3.png',
        description: '提供安全可靠的云计算服务',
        features: [
          '混合云架构',
          '容器化部署',
          '微服务架构',
          '高可用保障'
        ],
        price: '¥199,999起'
      }
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  },

  showProductDetail(e) {
    const id = e.currentTarget.dataset.id;
    wx.showModal({
      title: '产品详情',
      content: '如需了解更多详情，请联系我们的销售团队',
      confirmText: '立即咨询',
      success(res) {
        if (res.confirm) {
          wx.navigateTo({
            url: '/pages/contact/contact'
          })
        }
      }
    })
  }
})