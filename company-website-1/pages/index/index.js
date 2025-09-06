// index.js
const defaultAvatarUrl = 'https://mmbiz.qpic.cn/mmbiz/icTdbqWNOwNRna42FI242Lcia07jQodd2FJGIYQfG0LAJGFxM4FbnQP6yfMxBgJ0F3YRqJCJ1aPAK2dQagdusBZg/0'

Page({
  data: {
    motto: 'Hello World',
    userInfo: {
      avatarUrl: defaultAvatarUrl,
      nickName: '',
    },
    hasUserInfo: false,
    canIUseGetUserProfile: wx.canIUse('getUserProfile'),
    canIUseNicknameComp: wx.canIUse('input.type.nickname'),
    bannerList: [
      { 
        id: 1, 
        imageUrl: './images/banner1.jpg'  // 使用相对路径
      },
      { 
        id: 2, 
        imageUrl: './images/banner2.jpg'
      },
      { 
        id: 3, 
        imageUrl: './images/banner3.jpg'
      }
    ],
    navItems: [
      { id: 1, icon: './images/service1.png', title: '技术服务' },
      { id: 2, icon: './images/service2.png', title: '产品方案' },
      { id: 3, icon: './images/service3.png', title: '售后支持' },
      { id: 4, icon: './images/service3.png', title: '联系我们' }
    ],
    companyImage: './images/banner1.jpg',
    companyIntro: '我们是一家专注于技术创新的企业，致力于为客户提供最优质的产品和服务...',
    products: [
      {
        id: 1,
        image: './images/banner1.jpg',
        name: '产品一',
        description: '创新科技产品'
      },
      {
        id: 2,
        image: './images/banner2.jpg',
        name: '产品二',
        description: '智能解决方案'
      },
      {
        id: 3,
        image: './images/banner3.jpg',
        name: '产品三',
        description: '专业技术服务'
      }
    ],
    newsList: [
      {
        id: 1,
        image: './images/banner2.jpg',
        title: '公司最新动态',
        date: '2024-03-20'
      },
      {
        id: 2,
        image: './images/banner3.jpg',
        title: '技术创新突破',
        date: '2024-03-18'
      }
    ],
    contactPhone: '400-123-4567',
    contactEmail: 'contact@company.com',
    contactAddress: '北京市朝阳区xxx街道xxx号'
  },
  onLoad() {
    // 检查图片是否存在
    this.data.bannerList.forEach(banner => {
      console.log('检查图片路径:', banner.imageUrl)
    })
  },
  bindViewTap() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onChooseAvatar(e) {
    const { avatarUrl } = e.detail
    const { nickName } = this.data.userInfo
    this.setData({
      "userInfo.avatarUrl": avatarUrl,
      hasUserInfo: nickName && avatarUrl && avatarUrl !== defaultAvatarUrl,
    })
  },
  onInputChange(e) {
    const nickName = e.detail.value
    const { avatarUrl } = this.data.userInfo
    this.setData({
      "userInfo.nickName": nickName,
      hasUserInfo: nickName && avatarUrl && avatarUrl !== defaultAvatarUrl,
    })
  },
  getUserProfile(e) {
    // 推荐使用wx.getUserProfile获取用户信息，开发者每次通过该接口获取用户个人信息均需用户确认，开发者妥善保管用户快速填写的头像昵称，避免重复弹窗
    wx.getUserProfile({
      desc: '展示用户信息', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
      success: (res) => {
        console.log(res)
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    })
  },
  navigateToService(e) {
    const id = e.currentTarget.dataset.id
    wx.navigateTo({
      url: `/pages/service/service?id=${id}`
    })
  },
  showProduct(e) {
    const id = e.currentTarget.dataset.id
    wx.navigateTo({
      url: `/pages/product/detail?id=${id}`
    })
  },
  showNews(e) {
    const id = e.currentTarget.dataset.id
    wx.navigateTo({
      url: `/pages/news/detail?id=${id}`
    })
  }
})
