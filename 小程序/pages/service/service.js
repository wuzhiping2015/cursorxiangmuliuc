Page({
  data: {
    services: [
      {
        id: 1,
        title: '技术咨询',
        icon: '/pages/index/images/service1.png',
        description: '提供专业的技术咨询服务，帮助企业解决技术难题',
        details: [
          '需求分析与规划',
          '技术可行性评估',
          '解决方案设计',
          '技术架构优化'
        ]
      },
      {
        id: 2,
        title: '系统开发',
        icon: '/pages/index/images/service2.png',
        description: '专业的系统开发服务，打造稳定高效的企业系统',
        details: [
          '定制化开发',
          '系统集成',
          '性能优化',
          '安全加固'
        ]
      },
      {
        id: 3,
        title: '运维服务',
        icon: '/pages/index/images/service3.png',
        description: '全方位的运维服务，保障系统稳定运行',
        details: [
          '7*24小时监控',
          '故障快速响应',
          '定期系统巡检',
          '性能监控分析'
        ]
      }
    ],
    advantages: [
      {
        title: '专业团队',
        value: '10+',
        unit: '年经验'
      },
      {
        title: '服务客户',
        value: '1000+',
        unit: '家'
      },
      {
        title: '成功案例',
        value: '500+',
        unit: '个'
      }
    ]
  },

  onLoad() {
    this.animate('.service-card', [
      { opacity: 0, transform: 'translateY(50px)' },
      { opacity: 1, transform: 'translateY(0)' }
    ], 1000, function () {
      // 动画结束回调
    })
  }
})