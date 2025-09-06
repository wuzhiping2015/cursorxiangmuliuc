<template>
    <view class="mine-container">
        <u-navbar
            title="个人中心"
            :border="false"
            :autoBack="false"
        ></u-navbar>

        <!-- 用户信息 -->
        <view class="user-card">
            <view class="user-info">
                <u-avatar
                    :src="userInfo.avatar"
                    size="120"
                    @click="handleAvatarClick"
                ></u-avatar>
                <view class="info-content">
                    <text class="nickname">{{userInfo.nickname}}</text>
                    <text class="bio">{{userInfo.bio}}</text>
                </view>
            </view>
        </view>

        <!-- 账号设置 -->
        <view class="settings-group">
            <view class="group-title">账号设置</view>
            <u-cell-group>
                <u-cell
                    title="个人资料"
                    icon="account"
                    :isLink="true"
                    @click="navigateTo('/pages/mine/profile')"
                >
                    <template #icon>
                        <view class="cell-icon" style="background: #3f7afd;">
                            <u-icon name="account" color="#ffffff" size="24"></u-icon>
                        </view>
                    </template>
                </u-cell>
                <u-cell
                    title="通知设置"
                    icon="bell"
                    :isLink="true"
                    @click="navigateTo('/pages/mine/notification')"
                >
                    <template #icon>
                        <view class="cell-icon" style="background: #4cd137;">
                            <u-icon name="bell" color="#ffffff" size="24"></u-icon>
                        </view>
                    </template>
                </u-cell>
            </u-cell-group>
        </view>

        <!-- 通用设置 -->
        <view class="settings-group">
            <view class="group-title">通用设置</view>
            <u-cell-group>
                <u-cell
                    title="主题设置"
                    icon="photo"
                    :isLink="true"
                    @click="navigateTo('/pages/mine/theme')"
                >
                    <template #icon>
                        <view class="cell-icon" style="background: #ff9800;">
                            <u-icon name="photo" color="#ffffff" size="24"></u-icon>
                        </view>
                    </template>
                </u-cell>
                <u-cell
                    title="隐私设置"
                    icon="lock"
                    :isLink="true"
                    @click="navigateTo('/pages/mine/privacy')"
                >
                    <template #icon>
                        <view class="cell-icon" style="background: #e91e63;">
                            <u-icon name="lock" color="#ffffff" size="24"></u-icon>
                        </view>
                    </template>
                </u-cell>
            </u-cell-group>
        </view>

        <!-- 其他设置 -->
        <view class="settings-group">
            <view class="group-title">其他</view>
            <u-cell-group>
                <u-cell
                    title="关于我们"
                    icon="info"
                    :isLink="true"
                    @click="navigateTo('/pages/mine/about')"
                >
                    <template #icon>
                        <view class="cell-icon" style="background: #9c27b0;">
                            <u-icon name="info" color="#ffffff" size="24"></u-icon>
                        </view>
                    </template>
                </u-cell>
                <u-cell
                    title="意见反馈"
                    icon="edit-pen"
                    :isLink="true"
                    @click="navigateTo('/pages/mine/feedback')"
                >
                    <template #icon>
                        <view class="cell-icon" style="background: #2196f3;">
                            <u-icon name="edit-pen" color="#ffffff" size="24"></u-icon>
                        </view>
                    </template>
                </u-cell>
            </u-cell-group>
        </view>

        <!-- 退出登录 -->
        <view class="logout-button">
            <u-button 
                text="退出登录" 
                type="error"
                :plain="true"
                @click="handleLogout"
            ></u-button>
        </view>
    </view>
</template>

<script>
export default {
    data() {
        return {
            userInfo: {
                nickname: '李明',
                avatar: '',
                bio: '让每一个微小的改变成就更好的自己'
            }
        }
    },
    methods: {
        handleAvatarClick() {
            uni.chooseImage({
                count: 1,
                success: (res) => {
                    // TODO: 上传头像
                    this.userInfo.avatar = res.tempFilePaths[0]
                }
            })
        },
        navigateTo(url) {
            uni.navigateTo({ url })
        },
        handleLogout() {
            uni.showModal({
                title: '提示',
                content: '确定要退出登录吗？',
                success: (res) => {
                    if (res.confirm) {
                        // TODO: 退出登录
                        uni.reLaunch({
                            url: '/pages/welcome/index'
                        })
                    }
                }
            })
        }
    }
}
</script>

<style lang="scss" scoped>
.mine-container {
    min-height: 100vh;
    background: var(--background-color);
    padding-bottom: 40rpx;

    .user-card {
        background: #ffffff;
        padding: 40rpx 30rpx;
        margin-bottom: 20rpx;

        .user-info {
            display: flex;
            align-items: center;
            gap: 30rpx;

            .info-content {
                flex: 1;

                .nickname {
                    display: block;
                    font-size: 36rpx;
                    font-weight: bold;
                    color: var(--text-color);
                    margin-bottom: 10rpx;
                }

                .bio {
                    font-size: 26rpx;
                    color: var(--text-color-secondary);
                }
            }
        }
    }

    .settings-group {
        margin-bottom: 20rpx;

        .group-title {
            padding: 20rpx 30rpx;
            font-size: 26rpx;
            color: var(--text-color-secondary);
        }

        :deep(.u-cell) {
            .cell-icon {
                width: 72rpx;
                height: 72rpx;
                border-radius: 16rpx;
                display: flex;
                align-items: center;
                justify-content: center;
                margin-right: 20rpx;
            }
        }
    }

    .logout-button {
        margin: 60rpx 30rpx;
    }
}
</style> 