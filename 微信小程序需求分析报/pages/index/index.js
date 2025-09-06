Page({
    data: {
        date: '请选择日期',
        time: '请选择时辰',
        timeRanges: ['23:00-01:00', '01:00-03:00', '03:00-05:00', '05:00-07:00', '07:00-09:00', '09:00-11:00', '11:00-13:00', '13:00-15:00', '15:00-17:00', '17:00-19:00', '19:00-21:00', '21:00-23:00']
    },
    onLoad: function() {
        console.log('Index Page Loaded');
        // 页面加载时自动弹出日期选择器
        this.showDatePicker();
    },
    showDatePicker: function() {
        if (this.data.date === '请选择日期') {
            const datePickerNode = this.selectComponent('#datePicker');
            if (datePickerNode) {
                datePickerNode.showPicker();
            }
        }
    },
    navigateToResult: function() {
        if (this.data.date === '请选择日期') {
            this.showDatePicker();
            return;
        }
        if (this.data.date !== '请选择日期' && this.data.time !== '请选择时辰') {
            wx.navigateTo({
                url: `/pages/result/result?date=${this.data.date}&time=${this.data.time}`
            });
        }
    },
    onDateChange: function(e) {
        this.setData({
            date: e.detail.value
        });
    },
    onTimeChange: function(e) {
        this.setData({
            time: this.data.timeRanges[e.detail.value]
        });
    },
    onTapDateArea: function() {
        this.showDatePicker();
    }
});