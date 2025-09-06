<template>
    <view class="detail-container">
        <u-navbar
            title="习惯详情"
            :border="false"
            :autoBack="true"
        ></u-navbar>

        <!-- 习惯信息 -->
        <view class="habit-header">
            <view class="habit-icon" :style="{background: habit.iconBg}">
                <u-icon :name="habit.icon" :color="habit.iconColor" size="32"></u-icon>
            </view>
            <text class="habit-name">{{habit.name}}</text>
            <text class="habit-desc">{{habit.description}}</text>
        </view>

        <!-- 统计数据 -->
        <view class="stats-grid">
            <view class="stat-item">
                <text class="value">{{habit.totalCheckins}}</text>
                <text class="label">总打卡</text>
            </view>
            <view class="stat-item">
                <text class="value">{{habit.currentStreak}}</text>
                <text class="label">当前连续</text>
            </view>
            <view class="stat-item">
                <text class="value">{{habit.longestStreak}}</text>
                <text class="label">最长连续</text>
            </view>
        </view>

        <!-- 打卡日历 -->
        <view class="calendar-card">
            <view class="card-header">
                <text class="title">打卡记录</text>
                <view class="month-select">
                    <u-icon name="arrow-left" size="20" @click="prevMonth"></u-icon>
                    <text>{{currentMonth}}月</text>
                    <u-icon name="arrow-right" size="20" @click="nextMonth"></u-icon>
                </view>
            </view>

            <view class="calendar-header">
                <text v-for="day in ['一','二','三','四','五','六','日']" :key="day">{{day}}</text>
            </view>

            <view class="calendar-body">
                <view 
                    class="calendar-day" 
                    v-for="day in calendarDays" 
                    :key="day.date"
                    :class="{
                        'completed': day.status === 'completed',
                        'missed': day.status === 'missed',
                        'empty': !day.date
                    }"
                >
                    <text>{{day.date}}</text>
                </view>
            </view>
        </view>

        <!-- 习惯详情 -->
        <view class="detail-card">
            <view class="detail-item">
                <text class="label">重复</text>
                <text class="value">{{habit.frequency}}</text>
            </view>
            <view class="detail-item">
                <text class="label">提醒时间</text>
                <text class="value">{{habit.reminderTime || '未设置'}}</text>
            </view>
            <view class="detail-item" v-if="habit.stackHabit">
                <text class="label">习惯叠加</text>
                <text class="value">{{habit.stackHabit}}</text>
            </view>
            <view class="detail-item">
                <text class="label">创建时间</text>
                <text class="value">{{habit.createdAt}}</text>
            </view>
        </view>

        <!-- 底部操作按钮 -->
        <view class="bottom-actions">
            <u-button 
                type="primary" 
                text="今日打卡" 
                :disabled="habit.todayChecked"
                @click="handleCheckin"
            ></u-button>
            <u-button 
                text="编辑习惯" 
                plain
                @click="handleEdit"
            ></u-button>
        </view>
    </view>
</template>

<script>
export default {
    data() {
        return {
            habit: {
                id: 1,
                name: '晨间步行',
                description: '每天清晨步行30分钟，保持健康活力',
                icon: 'man-add',
                iconBg: '#eef3ff',
                iconColor: '#3f7afd',
                totalCheckins: 28,
                currentStreak: 5,
                longestStreak: 12,
                frequency: '每天',
                reminderTime: '07:00',
                stackHabit: '起床后',
                createdAt: '2024-03-15',
                todayChecked: false
            },
            currentMonth: new Date().getMonth() + 1,
            calendarDays: []
        }
    },
    created() {
        this.generateCalendar()
    },
    methods: {
        generateCalendar() {
            // 生成日历数据
            const days = []
            for (let i = 1; i <= 31; i++) {
                days.push({
                    date: i,
                    status: Math.random() > 0.3 ? 'completed' : 
                           Math.random() > 0.5 ? 'missed' : ''
                })
            }
            this.calendarDays = days
        },
        prevMonth() {
            if (this.currentMonth > 1) {
                this.currentMonth--
                this.generateCalendar()
            }
        },
        nextMonth() {
            if (this.currentMonth < 12) {
                this.currentMonth++
                this.generateCalendar()
            }
        },
        handleCheckin() {
            // TODO: 调用打卡接口
            this.habit.todayChecked = true
            uni.showToast({
                title: '打卡成功',
                icon: 'success'
            })
        },
        handleEdit() {
            uni.navigateTo({
                url: `/pages/habit/edit?id=${this.habit.id}`
            })
        }
    }
}
</script>

<style lang="scss" scoped>
.detail-container {
    min-height: 100vh;
    background: var(--background-color);
    padding-bottom: 180rpx;

    .habit-header {
        padding: 40rpx;
        background: #ffffff;
        display: flex;
        flex-direction: column;
        align-items: center;
        text-align: center;

        .habit-icon {
            width: 120rpx;
            height: 120rpx;
            border-radius: 60rpx;
            display: flex;
            align-items: center;
            justify-content: center;
            margin-bottom: 20rpx;
        }

        .habit-name {
            font-size: 36rpx;
            font-weight: bold;
            color: var(--text-color);
            margin-bottom: 10rpx;
        }

        .habit-desc {
            font-size: 26rpx;
            color: var(--text-color-secondary);
            max-width: 80%;
        }
    }

    .stats-grid {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        background: #ffffff;
        padding: 30rpx 0;
        margin-bottom: 20rpx;

        .stat-item {
            text-align: center;
            border-right: 1px solid var(--border-color);

            &:last-child {
                border-right: none;
            }

            .value {
                display: block;
                font-size: 40rpx;
                font-weight: bold;
                color: var(--primary-color);
                margin-bottom: 8rpx;
            }

            .label {
                font-size: 24rpx;
                color: var(--text-color-secondary);
            }
        }
    }

    .calendar-card {
        background: #ffffff;
        margin: 20rpx;
        padding: 30rpx;
        border-radius: 16rpx;

        .card-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 30rpx;

            .title {
                font-size: 28rpx;
                font-weight: bold;
                color: var(--text-color);
            }

            .month-select {
                display: flex;
                align-items: center;
                gap: 20rpx;
                font-size: 26rpx;
                color: var(--text-color);
            }
        }

        .calendar-header {
            display: grid;
            grid-template-columns: repeat(7, 1fr);
            text-align: center;
            margin-bottom: 20rpx;

            text {
                font-size: 24rpx;
                color: var(--text-color-secondary);
            }
        }

        .calendar-body {
            display: grid;
            grid-template-columns: repeat(7, 1fr);
            gap: 10rpx;

            .calendar-day {
                aspect-ratio: 1;
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 24rpx;
                background: #f5f7fa;
                border-radius: 50%;
                color: var(--text-color);

                &.completed {
                    background: var(--success-color);
                    color: #ffffff;
                }

                &.missed {
                    background: var(--error-color);
                    color: #ffffff;
                }

                &.empty {
                    background: transparent;
                }
            }
        }
    }

    .detail-card {
        background: #ffffff;
        margin: 20rpx;
        padding: 30rpx;
        border-radius: 16rpx;

        .detail-item {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 20rpx 0;
            border-bottom: 1px solid var(--border-color);

            &:last-child {
                border-bottom: none;
            }

            .label {
                font-size: 28rpx;
                color: var(--text-color);
            }

            .value {
                font-size: 28rpx;
                color: var(--text-color-secondary);
            }
        }
    }

    .bottom-actions {
        position: fixed;
        left: 0;
        right: 0;
        bottom: 0;
        padding: 20rpx 30rpx;
        background: #ffffff;
        box-shadow: 0 -2rpx 10rpx rgba(0, 0, 0, 0.05);
        display: flex;
        gap: 20rpx;

        :deep(.u-button) {
            flex: 1;
        }
    }
}
</style> 