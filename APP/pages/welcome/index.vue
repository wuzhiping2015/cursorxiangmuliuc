<template>
    <view class="welcome-container">
        <view class="welcome-content">
            <view class="logo-box">
                <u-icon name="checkmark-circle" color="#ffffff" size="60"></u-icon>
            </view>
            <text class="title">掌控习惯</text>
            <text class="subtitle">通过微小的改变，持续积累，\n实现自我的巨大突破</text>
        </view>
        
        <view class="button-group">
            <u-button type="primary" text="开始使用" @click="handleStart"></u-button>
            <u-button text="已有账号，去登录" plain @click="handleLogin"></u-button>
        </view>
    </view>
</template>

<script>
export default {
    data() {
        return {}
    },
    methods: {
        handleStart() {
            uni.navigateTo({
                url: '/pages/auth/register'
            })
        },
        handleLogin() {
            uni.navigateTo({
                url: '/pages/auth/login'
            })
        }
    }
}
</script>

<style lang="scss" scoped>
.welcome-container {
    min-height: 100vh;
    padding: 60rpx;
    background: linear-gradient(180deg, #f5f7fa 0%, #ffffff 100%);
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    
    .welcome-content {
        display: flex;
        flex-direction: column;
        align-items: center;
        margin-top: 15vh;
        
        .logo-box {
            width: 120rpx;
            height: 120rpx;
            background: var(--primary-color);
            border-radius: 30rpx;
            display: flex;
            align-items: center;
            justify-content: center;
            margin-bottom: 30rpx;
        }
        
        .title {
            font-size: 48rpx;
            font-weight: bold;
            color: var(--text-color);
            margin-bottom: 20rpx;
        }
        
        .subtitle {
            font-size: 28rpx;
            color: var(--text-color-secondary);
            text-align: center;
            line-height: 1.5;
        }
    }
    
    .button-group {
        width: 100%;
        
        :deep(.u-button) {
            margin-bottom: 30rpx;
        }
        
        :deep(.u-button--plain) {
            background: rgba(255, 255, 255, 0.9);
        }
    }
}
</style> 