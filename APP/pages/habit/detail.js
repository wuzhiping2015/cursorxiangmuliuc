Page({
            data: {
                habit: {
                    id: 1,
                    name: '晨间步行',
                    desc: '每天清晨步行30分钟',
                    icon: 'https://images.unsplash.com/photo-1470299568568-d4e1c9e1193a?w=100&h=100&fit=crop',
                    iconBg: '#4080FF',
                    days: 28,
                    streak: 5,
                    rate: 85,
                    todayChecked: false
                },
                monthDays: []
            },

            onLoad: function(options) {
                const habitId = parseInt(options.id);
                // 根据habitId获取习惯详情
                this.loadHabitDetail(habitId);
                this.generateCalendarDays();
            },

            onShow: function() {
                // 刷新页面数据
            },

            loadHabitDetail: function(habitId) {
                // 此处应该从服务器或本地缓存获取习惯详情
                // 暂时使用默认数据
            },

            generateCalendarDays: function() {
                const days = [];
                const today = new Date();
                const currentMonth = today.getMonth();
                const currentYear = today.getFullYear();
                const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
                const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();

                // 添加月初空白格
                for (let i = 0; i < firstDayOfMonth; i++) {
                    days.push({ day: '', isToday: false, isChecked: false });
                }

                // 添加日期
                for (let i = 1; i <= daysInMonth; i++) {
                    const isToday = i === today.getDate();
                    // 模拟一些已打卡的日期
                    const isChecked = Math.random() > 0.3;
                    days.push({ day: i, isToday, isChecked });
                }

                this.setData({ monthDays: days });
            },

            checkInToday: function() {
                const { habit } = this.data;
                habit.todayChecked = !habit.todayChecked;

                // 更新月历视图中今天的打卡状态
                const monthDays = this.data.monthDays;
                const today = new Date().getDate();
                for (let i = 0; i < monthDays.length; i++) {
                    if (monthDays[i].day === today) {
                        monthDays[i].isChecked = habit.todayChecked;
                        break;
                    }
                }

                this.setData({
                    habit,
                    monthDays
                });

                // 此处应该将打卡状态提交到服务器
                wx.showToast({
                    title: habit.todayChecked ? '打卡成功' : '已取消打卡',
                    icon: 'success'
                });
            },

            editHabit: function() {
                const habitId = this.data.habit.id;
                wx.navigateTo({
                    url: `/pages/habit/setting?id=${habitId}`
                });
            },

            deleteHabit: function() {
                wx.showModal({
                        title: '提示',
                        content: '确定要删除这个习惯吗？',
                        confirmColor: '#FF5252',
                        success: (res) => {
                            if (res.confirm) {
                                // 此处应该向服务器提交删除请求
                                wx.showToast({
                                        title: '已删除',
                                        icon: 'success',
                                        complete: () => {
                                            name: '晨间散步',
                                            icon: '🚶‍♂️',
                                            time: '07:00',
                                            days: [0, 1, 2, 3, 4, 5, 6],
                                            streak: 28,
                                            totalDays: 5,
                                            bestStreak: 12
                                        },
                                        calendar: {
                                            selectedDate: '',
                                            dates: []
                                        },
                                        records: [{
                                                date: '7月15日',
                                                time: '07:05',
                                                status: 1,
                                                note: '今天天气不错，散步很舒服'
                                            },
                                            {
                                                date: '7月14日',
                                                time: '07:10',
                                                status: 1,
                                                note: '按时完成'
                                            },
                                            {
                                                date: '7月13日',
                                                time: '07:00',
                                                status: 1,
                                                note: ''
                                            }
                                        ]
                                    },

                                    onLoad(options) {
                                        const { id } = options
                                        this.loadHabitDetail(id)
                                        this.initCalendar()
                                    },

                                    loadHabitDetail(id) {
                                        // TODO: 从云数据库加载习惯详情
                                    },

                                    initCalendar() {
                                        const now = new Date()
                                        const dates = []

                                        // 生成最近30天的日期
                                        for (let i = 0; i < 30; i++) {
                                            const date = new Date(now)
                                            date.setDate(date.getDate() - i)
                                            dates.push({
                                                date: date.toISOString().split('T')[0],
                                                completed: Math.random() > 0.3 // 模拟完成状态
                                            })
                                        }

                                        this.setData({
                                            'calendar.dates': dates.reverse(),
                                            'calendar.selectedDate': dates[dates.length - 1].date
                                        })
                                    },

                                    onDateSelect(e) {
                                        const { date } = e.currentTarget.dataset
                                        this.setData({
                                                'calendar.selectedDate': date
                                            })
                                            // TODO: 加载选中日期的打卡记录
                                    },

                                    editHabit() {
                                        const { id } = this.data.habit
                                        wx.navigateTo({
                                            url: `/pages/habit/setting?id=${id}`
                                        })
                                    },

                                    onShareAppMessage() {
                                        const { name } = this.data.habit
                                        return {
                                            title: `我在坚持${name}，一起来打卡吧！`,
                                            path: '/pages/welcome/index'
                                        }
                                    }
                                })
                        }
                    }
                })