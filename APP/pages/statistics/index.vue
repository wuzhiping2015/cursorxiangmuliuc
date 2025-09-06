<template>
    <view class="stats-container">
        <u-navbar
            title="统计分析"
            :border="false"
            :autoBack="false"
        ></u-navbar>

        <!-- 时间范围选择 -->
        <view class="time-select">
            <u-tabs
                :list="timeRanges"
                :current="currentTimeRange"
                @change="handleTimeRangeChange"
            ></u-tabs>
        </view>

        <!-- 完成趋势 -->
        <view class="trend-card">
            <view class="card-header">
                <text class="title">习惯完成趋势</text>
                <u-dropdown>
                    <u-dropdown-item v-model="trendType" :title="trendTypeText" :options="trendTypes"></u-dropdown-item>
                </u-dropdown>
            </view>
            <view class="chart-container">
                <view class="chart-placeholder">
                    <text>趋势图表区域</text>
                    <!-- 这里可以集成echarts等图表库 -->
                </view>
            </view>
        </view>

        <!-- 习惯完成情况 -->
        <view class="habits-card">
            <view class="card-header">
                <text class="title">习惯完成情况</text>
            </view>
            <view class="habits-list">
                <view class="habit-item" v-for="habit in habits" :key="habit.id">
                    <view class="habit-info">
                        <view class="habit-icon" :style="{background: habit.iconBg}">
                            <u-icon :name="habit.icon" :color="habit.iconColor" size="24"></u-icon>
                        </view>
                        <text class="habit-name">{{habit.name}}</text>
                    </view>
                    <view class="progress-info">
                        <view class="progress-bar">
                            <view 
                                class="progress-fill"
                                :style="{
                                    width: habit.completionRate + '%',
                                    background: habit.color
                                }"
                            ></view>
                        </view>
                        <text class="progress-text">{{habit.completionRate}}%</text>
                    </view>
                </view>
            </view>
        </view>

        <!-- 数据概览 -->
        <view class="overview-card">
            <view class="overview-item">
                <text class="label">总习惯数</text>
                <text class="value">{{overview.totalHabits}}</text>
            </view>
            <view class="overview-item">
                <text class="label">总打卡次数</text>
                <text class="value">{{overview.totalCheckins}}</text>
            </view>
            <view class="overview-item">
                <text class="label">平均完成率</text>
                <text class="value">{{overview.averageRate}}%</text>
            </view>
            <view class="overview-item">
                <text class="label">最长连续天数</text>
                <text class="value">{{overview.maxStreak}}</text>
            </view>
        </view>
    </view>
</template>

<script>
export default {
    data() {
        return {
            timeRanges: [
                { name: '最近7天' },
                { name: '最近30天' },
                { name: '最近90天' }
            ],
            currentTimeRange: 0,
            trendType: 0,
            trendTypes: [
                { label: '完成率', value: 0 },
                { label: '打卡次数', value: 1 }
            ],
            habits: [
                {
                    id: 1,
                    name: '晨间步行',
                    icon: 'man-add',
                    iconBg: '#eef3ff',
                    iconColor: '#3f7afd',
                    color: '#3f7afd',
                    completionRate: 85
                },
                {
                    id: 2,
                    name: '阅读30分钟',
                    icon: 'book',
                    iconBg: '#fff4e5',
                    iconColor: '#ff9800',
                    color: '#ff9800',
                    completionRate: 72
                },
                {
                    id: 3,
                    name: '喝水2000ml',
                    icon: 'cup',
                    iconBg: '#e8f5e9',
                    iconColor: '#4caf50',
                    color: '#4caf50',
                    completionRate: 65
                }
            ],
            overview: {
                totalHabits: 5,
                totalCheckins: 156,
                averageRate: 74,
                maxStreak: 21
            }
        }
    },
    computed: {
        trendTypeText() {
            const type = this.trendTypes.find(t => t.value === this.trendType)
            return type ? type.label : ''
        }
    },
    methods: {
        handleTimeRangeChange(index) {
            this.currentTimeRange = index
            // TODO: 重新加载数据
        }
    }
}
</script>

<style lang="scss" scoped>
.stats-container {
    min-height: 100vh;
    background: var(--background-color);
    padding-bottom: 40rpx;

    .time-select {
        background: #ffffff;
        margin-bottom: 20rpx;
    }

    .trend-card {
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
        }

        .chart-container {
            height: 400rpx;
            
            .chart-placeholder {
                width: 100%;
                height: 100%;
                background: #f8f9fa;
                border-radius: 12rpx;
                display: flex;
                align-items: center;
                justify-content: center;
                color: var(--text-color-secondary);
                font-size: 26rpx;
            }
        }
    }

    .habits-card {
        background: #ffffff;
        margin: 20rpx;
        padding: 30rpx;
        border-radius: 16rpx;

        .card-header {
            margin-bottom: 30rpx;

            .title {
                font-size: 28rpx;
                font-weight: bold;
                color: var(--text-color);
            }
        }

        .habits-list {
            .habit-item {
                display: flex;
                align-items: center;
                justify-content: space-between;
                margin-bottom: 30rpx;

                &:last-child {
                    margin-bottom: 0;
                }

                .habit-info {
                    display: flex;
                    align-items: center;
                    gap: 20rpx;

                    .habit-icon {
                        width: 80rpx;
                        height: 80rpx;
                        border-radius: 40rpx;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                    }

                    .habit-name {
                        font-size: 28rpx;
                        color: var(--text-color);
                    }
                }

                .progress-info {
                    flex: 1;
                    margin-left: 30rpx;
                    display: flex;
                    align-items: center;
                    gap: 20rpx;

                    .progress-bar {
                        flex: 1;
                        height: 12rpx;
                        background: #f5f7fa;
                        border-radius: 6rpx;
                        overflow: hidden;

                        .progress-fill {
                            height: 100%;
                            border-radius: 6rpx;
                            transition: width 0.3s ease;
                        }
                    }

                    .progress-text {
                        font-size: 24rpx;
                        color: var(--text-color-secondary);
                        min-width: 60rpx;
                        text-align: right;
                    }
                }
            }
        }
    }

    .overview-card {
        background: #ffffff;
        margin: 20rpx;
        padding: 30rpx;
        border-radius: 16rpx;
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        gap: 30rpx;

        .overview-item {
            text-align: center;

            .label {
                display: block;
                font-size: 26rpx;
                color: var(--text-color-secondary);
                margin-bottom: 10rpx;
            }

            .value {
                font-size: 40rpx;
                font-weight: bold;
                color: var(--primary-color);
            }
        }
    }
}
</style> 