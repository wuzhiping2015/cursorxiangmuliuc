<template>
    <view class="add-habit-container">
        <u-navbar
            title="添加新习惯"
            :border="false"
            :autoBack="true"
        >
            <template #right>
                <u-button 
                    type="primary" 
                    size="mini" 
                    text="保存"
                    @click="handleSave"
                ></u-button>
            </template>
        </u-navbar>

        <view class="form-content">
            <!-- 基本信息 -->
            <view class="form-section">
                <view class="section-title">基本信息</view>
                <u-form :model="formData" ref="uForm">
                    <u-form-item label="习惯名称" required>
                        <u-input 
                            v-model="formData.name"
                            placeholder="例如：晨间步行、冥想、读书..."
                        ></u-input>
                    </u-form-item>

                    <u-form-item label="选择图标" required>
                        <view class="icon-grid">
                            <view 
                                class="icon-item" 
                                v-for="icon in icons" 
                                :key="icon.name"
                                :class="{'active': formData.icon === icon.name}"
                                @click="selectIcon(icon)"
                            >
                                <u-icon 
                                    :name="icon.name"
                                    :color="formData.icon === icon.name ? '#ffffff' : icon.color"
                                    size="24"
                                ></u-icon>
                            </view>
                        </view>
                    </u-form-item>

                    <u-form-item label="选择颜色" required>
                        <view class="color-grid">
                            <view 
                                class="color-item" 
                                v-for="color in colors" 
                                :key="color.value"
                                :style="{background: color.value}"
                                :class="{'active': formData.color === color.value}"
                                @click="selectColor(color)"
                            ></view>
                        </view>
                    </u-form-item>
                </u-form>
            </view>

            <!-- 习惯设置 -->
            <view class="form-section">
                <view class="section-title">习惯设置</view>
                <u-form :model="formData" ref="uForm2">
                    <u-form-item label="重复频率" required>
                        <u-radio-group v-model="formData.frequency">
                            <u-radio 
                                v-for="item in frequencies" 
                                :key="item.value"
                                :name="item.value"
                                :label="item.label"
                            ></u-radio>
                        </u-radio-group>

                        <view class="week-select" v-if="formData.frequency === 'weekly'">
                            <view 
                                class="week-item" 
                                v-for="(day, index) in weekDays" 
                                :key="index"
                                :class="{'active': formData.weekDays.includes(index)}"
                                @click="toggleWeekDay(index)"
                            >{{day}}</view>
                        </view>
                    </u-form-item>

                    <u-form-item label="提醒">
                        <u-switch v-model="formData.reminder"></u-switch>
                    </u-form-item>

                    <u-form-item label="提醒时间" v-if="formData.reminder">
                        <u-time-picker
                            v-model="formData.reminderTime"
                            mode="time"
                            :show="false"
                            @confirm="timeConfirm"
                        ></u-time-picker>
                        <view class="time-select" @click="showTimePicker">
                            {{formData.reminderTime || '请选择时间'}}
                        </view>
                    </u-form-item>
                </u-form>
            </view>

            <!-- 习惯叠加 -->
            <view class="form-section">
                <view class="section-title">习惯叠加</view>
                <view class="stacking-info">
                    将新习惯与已有习惯关联，提高养成成功率。例如："晨跑后，我会冥想10分钟"
                </view>
                <u-select
                    v-model="formData.stackHabit"
                    :list="existingHabits"
                    placeholder="选择已有习惯"
                ></u-select>
            </view>
        </view>
    </view>
</template>

<script>
export default {
    data() {
        return {
            formData: {
                name: '',
                icon: '',
                color: '',
                frequency: 'daily',
                weekDays: [],
                reminder: false,
                reminderTime: '',
                stackHabit: ''
            },
            icons: [
                { name: 'man-add', color: '#3f7afd' },
                { name: 'book', color: '#ff9800' },
                { name: 'cup', color: '#4caf50' },
                { name: 'heart', color: '#e91e63' },
                { name: 'edit-pen', color: '#9c27b0' },
                { name: 'star', color: '#ff9800' }
            ],
            colors: [
                { value: '#3f7afd' },
                { value: '#4cd137' },
                { value: '#ff9800' },
                { value: '#e91e63' },
                { value: '#9c27b0' }
            ],
            frequencies: [
                { label: '每天', value: 'daily' },
                { label: '每周', value: 'weekly' },
                { label: '自定义', value: 'custom' }
            ],
            weekDays: ['一', '二', '三', '四', '五', '六', '日'],
            existingHabits: [
                { label: '晨间步行', value: '1' },
                { label: '阅读', value: '2' },
                { label: '喝水', value: '3' }
            ]
        }
    },
    methods: {
        selectIcon(icon) {
            this.formData.icon = icon.name
        },
        selectColor(color) {
            this.formData.color = color.value
        },
        toggleWeekDay(index) {
            const position = this.formData.weekDays.indexOf(index)
            if (position > -1) {
                this.formData.weekDays.splice(position, 1)
            } else {
                this.formData.weekDays.push(index)
            }
        },
        showTimePicker() {
            this.$refs.uTimePicker.open()
        },
        timeConfirm(time) {
            this.formData.reminderTime = time
        },
        async handleSave() {
            try {
                await this.$refs.uForm.validate()
                // TODO: 调用保存接口
                uni.showToast({
                    title: '保存成功',
                    icon: 'success'
                })
                setTimeout(() => {
                    uni.navigateBack()
                }, 1500)
            } catch (error) {
                console.log(error)
            }
        }
    }
}
</script>

<style lang="scss" scoped>
.add-habit-container {
    min-height: 100vh;
    background: var(--background-color);
    padding-bottom: 40rpx;

    .form-content {
        padding: 20rpx 30rpx;
    }

    .form-section {
        background: #ffffff;
        border-radius: 16rpx;
        padding: 30rpx;
        margin-bottom: 20rpx;

        .section-title {
            font-size: 28rpx;
            font-weight: bold;
            color: var(--text-color);
            margin-bottom: 30rpx;
        }
    }

    .icon-grid {
        display: grid;
        grid-template-columns: repeat(6, 1fr);
        gap: 20rpx;
        margin-top: 20rpx;

        .icon-item {
            width: 80rpx;
            height: 80rpx;
            background: #f5f7fa;
            border-radius: 40rpx;
            display: flex;
            align-items: center;
            justify-content: center;
            transition: all 0.3s;

            &.active {
                background: var(--primary-color);
            }
        }
    }

    .color-grid {
        display: flex;
        gap: 20rpx;
        margin-top: 20rpx;

        .color-item {
            width: 60rpx;
            height: 60rpx;
            border-radius: 30rpx;
            border: 4rpx solid transparent;
            transition: all 0.3s;

            &.active {
                border-color: var(--text-color);
                transform: scale(1.1);
            }
        }
    }

    .week-select {
        display: flex;
        justify-content: space-between;
        margin-top: 20rpx;

        .week-item {
            width: 80rpx;
            height: 80rpx;
            border-radius: 40rpx;
            background: #f5f7fa;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 28rpx;
            color: var(--text-color);
            transition: all 0.3s;

            &.active {
                background: var(--primary-color);
                color: #ffffff;
            }
        }
    }

    .time-select {
        height: 80rpx;
        background: #f5f7fa;
        border-radius: 12rpx;
        display: flex;
        align-items: center;
        padding: 0 20rpx;
        font-size: 28rpx;
        color: var(--text-color);
    }

    .stacking-info {
        font-size: 24rpx;
        color: var(--text-color-secondary);
        line-height: 1.5;
        margin-bottom: 20rpx;
        padding: 20rpx;
        background: #f8f9fa;
        border-radius: 12rpx;
    }
}
</style> 