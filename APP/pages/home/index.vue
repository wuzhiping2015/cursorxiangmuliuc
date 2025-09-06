<template>
    <view class="home-container">
        <!-- 顶部用户信息 -->
        <view class="header">
            <view class="user-info">
                <view>
                    <text class="welcome-text">{{greeting}}，</text>
                    <text class="username">{{userInfo.nickname}}</text>
                </view>
                <u-avatar :src="userInfo.avatar" size="40"></u-avatar>
            </view>
        </view>

        <!-- 数据概览 -->
        <view class="stats-card">
            <view class="card-header">
                <text class="title">本周数据</text>
                <text class="link" @click="navigateToStats">查看全部</text>
            </view>
            <view class="stats-grid">
                <view class="stat-item">
                    <text class="value">{{stats.activeHabits}}</text>
                    <text class="label">活跃习惯</text>
                </view>
                <view class="stat-item">
                    <text class="value">{{stats.completionRate}}%</text>
                    <text class="label">完成率</text>
                </view>
                <view class="stat-item">
                    <text class="value">{{stats.maxStreak}}</text>
                    <text class="label">最长连续</text>
                </view>
            </view>
        </view>

        <!-- 今日习惯列表 -->
        <view class="habits-section">
            <view class="section-header">
                <text class="title">今日习惯</text>
                <text class="date">{{currentDate}}</text>
            </view>

            <view class="habit-list">
                <view class="habit-card" v-for="habit in todayHabits" :key="habit.id" @click="navigateToDetail(habit.id)">
                    <view class="habit-icon" :style="{background: habit.iconBg}">
                        <u-icon :name="habit.icon" :color="habit.iconColor" size="24"></u-icon>
                    </view>
                    <view class="habit-info">
                        <text class="habit-name">{{habit.name}}</text>
                        <view class="habit-streak">
                            <u-icon name="fire" color="#ff6b6b" size="14"></u-icon>
                            <text>连续{{habit.streak}}天</text>
                        </view>
                    </view>
                    <u-checkbox v-model="habit.completed" @change="handleCheck(habit)"></u-checkbox>
                </view>
            </view>
        </view>

        <!-- 添加按钮 -->
        <view class="add-button" @click="navigateToAdd">
            <u-icon name="plus" color="#ffffff" size="24"></u-icon>
        </view>
    </view>
</template>

<script>
export default {
    data() {
        return {
            userInfo: {
                nickname: '李明',
                avatar: ''
            },
            stats: {
                activeHabits: 5,
                completionRate: 85,
                maxStreak: 12
            },
            todayHabits: [
                {
                    id: 1,
                    name: '晨间步行',
                    icon: 'man-add',
                    iconBg: '#eef3ff',
                    iconColor: '#3f7afd',
                    streak: 5,
                    completed: true
                },
                {
                    id: 2,
                    name: '阅读30分钟',
                    icon: 'book',
                    iconBg: '#fff4e5',
                    iconColor: '#ff9800',
                    streak: 12,
                    completed: false
                },
                {
                    id: 3,
                    name: '喝水2000ml',
                    icon: 'cup',
                    iconBg: '#e8f5e9',
                    iconColor: '#4caf50',
                    streak: 3,
                    completed: false
                }
            ]
        }
    },
    computed: {
        greeting() {
            const hour = new Date().getHours()
            if (hour < 6) return '凌晨好'
            if (hour < 9) return '早上好'
            if (hour < 12) return '上午好'
            if (hour < 14) return '中午好'
            if (hour < 17) return '下午好'
            if (hour < 19) return '傍晚好'
            return '晚上好'
        },
        currentDate() {
            const date = new Date()
            const month = date.getMonth() + 1
            const day = date.getDate()
            const weekDay = ['日', '一', '二', '三', '四', '五', '六'][date.getDay()]
            return `${month}月${day}日 星期${weekDay}`
        }
    },
    methods: {
        navigateToStats() {
            uni.switchTab({
                url: '/pages/statistics/index'
            })
        },
        navigateToDetail(id) {
            uni.navigateTo({
                url: `/pages/habit/detail?id=${id}`
            })
        },
        navigateToAdd() {
            uni.navigateTo({
                url: '/pages/habit/add'
            })
        },
        handleCheck(habit) {
            // TODO: 调用打卡接口
            uni.showToast({
                title: habit.completed ? '打卡成功' : '取消打卡',
                icon: habit.completed ? 'success' : 'none'
            })
        }
    }
}
</script>

<style lang="scss" scoped>
.home-container {
    min-height: 100vh;
    background: var(--background-color);
    padding-bottom: 120rpx;
    position: relative;

    .header {
        padding: 40rpx 30rpx;
        background: #ffffff;

        .user-info {
            display: flex;
            justify-content: space-between;
            align-items: center;

            .welcome-text {
                font-size: 24rpx;
                color: var(--text-color-secondary);
            }

            .username {
                font-size: 36rpx;
                font-weight: bold;
                color: var(--text-color);
            }
        }
    }

    .stats-card {
        margin: 30rpx;
        padding: 30rpx;
        background: #ffffff;
        border-radius: 20rpx;
        box-shadow: 0 4rpx 20rpx rgba(0, 0, 0, 0.05);

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

            .link {
                font-size: 24rpx;
                color: var(--primary-color);
            }
        }

        .stats-grid {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 20rpx;

            .stat-item {
                text-align: center;

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
    }

    .habits-section {
        padding: 0 30rpx;

        .section-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 20rpx;

            .title {
                font-size: 32rpx;
                font-weight: bold;
                color: var(--text-color);
            }

            .date {
                font-size: 24rpx;
                color: var(--text-color-secondary);
            }
        }

        .habit-card {
            background: #ffffff;
            border-radius: 16rpx;
            padding: 30rpx;
            margin-bottom: 20rpx;
            display: flex;
            align-items: center;
            box-shadow: 0 2rpx 10rpx rgba(0, 0, 0, 0.02);

            .habit-icon {
                width: 80rpx;
                height: 80rpx;
                border-radius: 40rpx;
                display: flex;
                align-items: center;
                justify-content: center;
                margin-right: 20rpx;
            }

            .habit-info {
                flex: 1;

                .habit-name {
                    font-size: 28rpx;
                    font-weight: bold;
                    color: var(--text-color);
                    margin-bottom: 8rpx;
                }

                .habit-streak {
                    display: flex;
                    align-items: center;
                    gap: 8rpx;
                    font-size: 24rpx;
                    color: var(--text-color-secondary);
                }
            }
        }
    }

    .add-button {
        position: fixed;
        right: 40rpx;
        bottom: 140rpx;
        width: 100rpx;
        height: 100rpx;
        background: var(--primary-color);
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        box-shadow: 0 6rpx 20rpx rgba(63, 122, 253, 0.3);
    }
}
</style> 