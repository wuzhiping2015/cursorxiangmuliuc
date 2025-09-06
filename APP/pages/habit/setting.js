Page({
    data: {
        habitName: '',
        selectedTime: '07:00',
        repeatDays: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
        selectedDays: [],
        customRepeat: false
    },

    onLoad() {
        // 默认选中所有天数
        this.setData({
            selectedDays: this.data.repeatDays.map((_, index) => index)
        })
    },

    onNameInput(e) {
        this.setData({
            habitName: e.detail.value
        })
    },

    onTimeChange(e) {
        this.setData({
            selectedTime: e.detail.value
        })
    },

    toggleDay(e) {
        const { index } = e.currentTarget.dataset
        const { selectedDays } = this.data
        const dayIndex = selectedDays.indexOf(index)

        if (dayIndex > -1) {
            selectedDays.splice(dayIndex, 1)
        } else {
            selectedDays.push(index)
        }

        this.setData({
            selectedDays: selectedDays.sort((a, b) => a - b)
        })
    },

    toggleCustomRepeat() {
        this.setData({
            customRepeat: !this.data.customRepeat
        })
    },

    saveHabit() {
        const { habitName, selectedTime, selectedDays, customRepeat } = this.data

        if (!habitName.trim()) {
            wx.showToast({
                title: '请输入习惯名称',
                icon: 'none'
            })
            return
        }

        if (selectedDays.length === 0) {
            wx.showToast({
                title: '请选择重复周期',
                icon: 'none'
            })
            return
        }

        const habit = {
            name: habitName,
            time: selectedTime,
            days: selectedDays,
            customRepeat
        }

        // TODO: 保存到云数据库

        wx.navigateBack()
    }
})