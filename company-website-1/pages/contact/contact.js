/**
 * 联系我们页面逻辑
 */
Page({
    data: {
      // 公司基本信息
      companyInfo: {
        name: '科技创新企业',
        address: '北京市朝阳区科技园区88号',
        phone: '400-888-9999',
        email: 'contact@tech.com',
        workTime: '周一至周五 09:00-18:00'
      },
      // 地图标记点
      markers: [{
        id: 1,
        latitude: 39.908823,
        longitude: 116.397470,
        name: '科技创新企业',
        width: 32,
        height: 32,
        callout: {
          content: '科技创新企业\n北京市朝阳区科技园区88号',
          color: '#000000',
          fontSize: 14,
          borderRadius: 8,
          bgColor: '#ffffff',
          padding: 10,
          display: 'ALWAYS'
        }
      }],
      // 地图配置
      mapConfig: {
        latitude: 39.908823,
        longitude: 116.397470,
        scale: 14,
        showLocation: true,
        enableZoom: true,
        enableScroll: true
      },
      // 联系方式图标
      contactIcons: {
        phone: '/pages/index/images/service1.png',
        email: '/pages/index/images/service2.png',
        address: '/pages/index/images/service3.png',
        time: '/pages/index/images/service1.png'
      }
    },
    onLoad() {
      this.initAnimation();
      // 获取当前位置
      wx.getLocation({
        type: 'gcj02',
        success: (res) => {
          this.setData({
            'mapConfig.latitude': res.latitude,
            'mapConfig.longitude': res.longitude
          })
        }
      })
    },
    // 初始化动画
    initAnimation() {
      wx.createSelectorQuery()
        .selectAll('.animate-item')
        .boundingClientRect((rects) => {
          rects.forEach((rect, index) => {
            setTimeout(() => {
              this.animate(`.animate-item:nth-child(${index + 1})`, [
                { opacity: 0, transform: 'translateY(30px)' },
                { opacity: 1, transform: 'translateY(0)' }
              ], 500)
            }, index * 200)
          })
        })
        .exec()
    },
    submitForm(e) {
      const formData = e.detail.value;
      
      // 表单验证
      if (!this.validateForm(formData)) {
        return;
      }
      
      wx.showLoading({
        title: '提交中...',
      });
      
      // 模拟提交
      setTimeout(() => {
        wx.hideLoading();
        wx.showToast({
          title: '提交成功',
          icon: 'success',
          duration: 2000,
          success: () => {
            // 重置表单
            this.resetForm();
          }
        });
      }, 1500);
    },
    // 表单验证
    validateForm(formData) {
      const { name, phone, email, message } = formData;
      
      if (!name.trim()) {
        this.showError('请输入您的姓名');
        return false;
      }
      
      if (!phone.trim()) {
        this.showError('请输入您的联系电话');
        return false;
      }
      
      if (!this.isValidPhone(phone)) {
        this.showError('请输入正确的手机号码');
        return false;
      }
      
      if (!email.trim()) {
        this.showError('请输入您的邮箱');
        return false;
      }
      
      if (!this.isValidEmail(email)) {
        this.showError('请输入正确的邮箱格式');
        return false;
      }
      
      if (!message.trim()) {
        this.showError('请输入留言内容');
        return false;
      }
      
      return true;
    },
    // 显示错误提示
    showError(message) {
      wx.showToast({
        title: message,
        icon: 'none',
        duration: 2000
      });
    },
    // 验证手机号
    isValidPhone(phone) {
      return /^1[3-9]\d{9}$/.test(phone);
    },
    // 验证邮箱
    isValidEmail(email) {
      return /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/.test(email);
    },
    // 重置表单
    resetForm() {
      this.setData({
        'form.name': '',
        'form.phone': '',
        'form.email': '',
        'form.message': ''
      });
    },
    openLocation() {
      const { latitude, longitude } = this.data.mapConfig;
      const { name, address } = this.data.companyInfo;
      
      wx.openLocation({
        latitude,
        longitude,
        name,
        address,
        scale: 14
      });
    },
    // 拨打电话
    makePhoneCall() {
      wx.makePhoneCall({
        phoneNumber: this.data.companyInfo.phone
      });
    },
    // 复制文本
    copyText(e) {
      const text = e.currentTarget.dataset.text;
      wx.setClipboardData({
        data: text,
        success: () => {
          wx.showToast({
            title: '复制成功',
            icon: 'success'
          });
        }
      });
    }
  })