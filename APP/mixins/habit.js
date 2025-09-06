import { mapGetters } from 'vuex'
import { shouldCompleteToday, generateHabitStats } from '../utils/habit'
import { formatDate } from '../utils/date'

export default {
    computed: {
        ...mapGetters(['habits']),

        // 今日待完成的习惯
        todayHabits() {
            return this.habits.filter(habit => shouldCompleteToday(habit))
        },

        // 已完成的习惯
        completedHabits() {
            return this.habits.filter(habit => {
                return habit.checkInRecords.some(record =>
                    formatDate(new Date(record.date)) === formatDate(new Date())
                )
            })
        },

        // 完成进度
        completionProgress() {
            if (!this.habits.length) return 0
            return Math.round((this.completedHabits.length / this.todayHabits.length) * 100)
        }
    },

    methods: {
        // 打卡
        async handleCheckIn(habit) {
            try {
                await this.$store.dispatch('checkInHabit', {
                    habitId: habit.id,
                    checkInData: {
                        date: new Date(),
                        note: ''
                    }
                })

                uni.showToast({
                    title: '打卡成功',
                    icon: 'success'
                })
            } catch (error) {
                uni.showToast({
                    title: error.message || '打卡失败',
                    icon: 'none'
                })
            }
        },

        // 获取习惯统计数据
        getHabitStats(habit) {
            return generateHabitStats(habit)
        },

        // 格式化习惯频率
        formatFrequency(frequency) {
            const weekDays = ['周日', '周一', '周二', '周三', '周四', '周五', '周六']

            switch (frequency.type) {
                case 'daily':
                    return '每天'
                case 'weekly':
                    return frequency.days
                        .map(day => weekDays[day])
                        .join('、')
                case 'custom':
                    return `每${frequency.interval}天`
                default:
                    return '未设置'
            }
        },

        // 获取习惯图标
        getHabitIcon(habit) {
            // 根据习惯类型返回对应的图标
            const iconMap = {
                'exercise': 'icon-exercise',
                'study': 'icon-study',
                'diet': 'icon-diet',
                'sleep': 'icon-sleep',
                'other': 'icon-other'
            }
            return iconMap[habit.type] || 'icon-other'
        },

        // 获取习惯颜色
        getHabitColor(habit) {
            // 根据习惯类型返回对应的颜色
            const colorMap = {
                'exercise': '#FF6B6B',
                'study': '#4ECDC4',
                'diet': '#45B7D1',
                'sleep': '#96CEB4',
                'other': '#FFBE0B'
            }
            return colorMap[habit.type] || '#FFBE0B'
        },

        // 编辑习惯
        handleEditHabit(habit) {
            uni.navigateTo({
                url: `/pages/habit/edit?id=${habit.id}`
            })
        },

        // 删除习惯
        async handleDeleteHabit(habit) {
            try {
                await uni.showModal({
                    title: '确认删除',
                    content: '确定要删除这个习惯吗？',
                    confirmText: '删除',
                    confirmColor: '#FF0000'
                })

                await this.$store.dispatch('deleteHabit', habit.id)

                uni.showToast({
                    title: '删除成功',
                    icon: 'success'
                })
            } catch (error) {
                if (error.errMsg !== 'showModal:fail cancel') {
                    uni.showToast({
                        title: error.message || '删除失败',
                        icon: 'none'
                    })
                }
            }
        }
    }
}