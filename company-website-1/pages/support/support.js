// pages/support/support.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    faqList: [
      {
        question: '如何申请售后服务？',
        answer: '您可以通过电话热线、在线客服或填写售后申请表单来申请售后服务。我们的客服团队会在24小时内与您联系。'
      },
      {
        question: '产品保修期是多久？',
        answer: '我们的产品标准保修期为一年，某些特定产品可能会有更长的保修期。具体请查看产品保修卡或联系客服咨询。'
      },
      {
        question: '如何查询维修进度？',
        answer: '您可以通过维修单号在我们的官网或小程序上查询维修进度，也可以直接联系客服查询。'
      }
    ],
    serviceProcess: [
      {
        title: '提交申请',
        icon: '/pages/index/images/service1.png',
        description: '通过线上或电话提交售后服务申请'
      },
      {
        title: '问题诊断',
        icon: '/pages/index/images/service2.png',
        description: '专业工程师远程或现场诊断问题'
      },
      {
        title: '解决方案',
        icon: '/pages/index/images/service3.png',
        description: '制定解决方案并执行维修服务'
      },
      {
        title: '服务反馈',
        icon: '/pages/index/images/service1.png',
        description: '完成服务后进行满意度回访'
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

  toggleFaq(e) {
    const index = e.currentTarget.dataset.index
    const key = `faqList[${index}].show`
    this.setData({
      [key]: !this.data.faqList[index].show
    })
  }
})