/**
 * 邀请功能状态管理
 * 处理邀请相关的数据和业务逻辑
 * @author 前端工程师团队
 * @date 2024-12-XX
 */

import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import request from '@/utils/request'

/**
 * 邀请功能状态管理Store
 */
export const useInviteStore = defineStore('invite', () => {
    // ==================== 状态定义 ====================

    /** 邀请记录列表 */
    const inviteList = ref([])

    /** 奖励记录列表 */
    const rewardList = ref([])

    /** 邀请链接 */
    const inviteLink = ref('')

    /** 奖励规则 */
    const rewardRules = ref([])

    /** 加载状态 */
    const loading = ref(false)

    /** 分享统计 */
    const shareStats = ref({
        totalShares: 0, // 总分享次数
        todayShares: 0, // 今日分享
        shareChannels: {} // 各渠道分享统计
    })

    // ==================== 计算属性 ====================

    /** 有效邀请人数 */
    const validInviteCount = computed(() => {
        return inviteList.value.filter(item => item.status === 'valid').length
    })

    /** 待审核邀请人数 */
    const pendingInviteCount = computed(() => {
        return inviteList.value.filter(item => item.status === 'pending').length
    })

    /** 总奖励金额 */
    const totalReward = computed(() => {
        return rewardList.value
            .filter(item => item.status === 'confirmed')
            .reduce((sum, item) => sum + item.amount, 0)
    })

    /** 待提取奖励 */
    const pendingReward = computed(() => {
        return rewardList.value
            .filter(item => item.status === 'pending')
            .reduce((sum, item) => sum + item.amount, 0)
    })

    // ==================== 操作方法 ====================

    /**
     * 生成邀请链接
     * @param {string} inviteCode 邀请码
     * @returns {Promise} 生成结果
     */
    const generateInviteLink = async(inviteCode) => {
        try {
            loading.value = true
            const response = await request.post('/api/invite/generate', { inviteCode })
            inviteLink.value = response.inviteLink
            return { success: true, data: response }
        } catch (error) {
            console.error('生成邀请链接失败:', error.message)
            return { success: false, message: error.message }
        } finally {
            loading.value = false
        }
    }

    /**
     * 获取邀请记录
     * @param {Object} params 查询参数
     * @returns {Promise} 邀请记录
     */
    const fetchInviteList = async(params = {}) => {
        try {
            loading.value = true
            const response = await request.get('/api/invite/list', { params })
            inviteList.value = response.list || []
            return { success: true, data: response }
        } catch (error) {
            console.error('获取邀请记录失败:', error.message)
            return { success: false, message: error.message }
        } finally {
            loading.value = false
        }
    }

    /**
     * 获取奖励记录
     * @param {Object} params 查询参数
     * @returns {Promise} 奖励记录
     */
    const fetchRewardList = async(params = {}) => {
        try {
            loading.value = true
            const response = await request.get('/api/reward/list', { params })
            rewardList.value = response.list || []
            return { success: true, data: response }
        } catch (error) {
            console.error('获取奖励记录失败:', error.message)
            return { success: false, message: error.message }
        } finally {
            loading.value = false
        }
    }

    /**
     * 获取奖励规则
     * @returns {Promise} 奖励规则
     */
    const fetchRewardRules = async() => {
        try {
            const response = await request.get('/api/reward/rules')
            rewardRules.value = response.rules || []
            return { success: true, data: response }
        } catch (error) {
            console.error('获取奖励规则失败:', error.message)
            return { success: false, message: error.message }
        }
    }

    /**
     * 分享邀请链接
     * @param {string} platform 分享平台
     * @param {Object} shareData 分享数据
     * @returns {Promise} 分享结果
     */
    const shareInvite = async(platform, shareData = {}) => {
        try {
            // 记录分享行为
            const response = await request.post('/api/invite/share', {
                platform,
                inviteLink: inviteLink.value,
                ...shareData
            })

            // 更新分享统计
            shareStats.value.totalShares += 1
            shareStats.value.todayShares += 1
            shareStats.value.shareChannels[platform] =
                (shareStats.value.shareChannels[platform] || 0) + 1

            return { success: true, data: response }
        } catch (error) {
            console.error('分享记录失败:', error.message)
            return { success: false, message: error.message }
        }
    }

    /**
     * 复制邀请链接
     * @returns {Promise} 复制结果
     */
    const copyInviteLink = async() => {
        try {
            if (!inviteLink.value) {
                throw new Error('邀请链接不能为空')
            }

            // 使用现代浏览器API复制文本
            if (navigator.clipboard) {
                await navigator.clipboard.writeText(inviteLink.value)
            } else {
                // 兼容旧浏览器的复制方法
                const textArea = document.createElement('textarea')
                textArea.value = inviteLink.value
                document.body.appendChild(textArea)
                textArea.select()
                document.execCommand('copy')
                document.body.removeChild(textArea)
            }

            // 记录复制行为
            await shareInvite('copy')

            return { success: true, message: '邀请链接已复制到剪贴板' }
        } catch (error) {
            console.error('复制邀请链接失败:', error.message)
            return { success: false, message: error.message }
        }
    }

    /**
     * 申请提现
     * @param {Object} withdrawData 提现数据
     * @returns {Promise} 提现结果
     */
    const applyWithdraw = async(withdrawData) => {
        try {
            loading.value = true
            const response = await request.post('/api/reward/withdraw', withdrawData)

            // 刷新奖励记录
            await fetchRewardList()

            return { success: true, data: response }
        } catch (error) {
            console.error('申请提现失败:', error.message)
            return { success: false, message: error.message }
        } finally {
            loading.value = false
        }
    }

    /**
     * 获取分享统计
     * @returns {Promise} 分享统计
     */
    const fetchShareStats = async() => {
        try {
            const response = await request.get('/api/invite/share-stats')
            shareStats.value = response.stats || shareStats.value
            return { success: true, data: response }
        } catch (error) {
            console.error('获取分享统计失败:', error.message)
            return { success: false, message: error.message }
        }
    }

    /**
     * 微信分享
     * @param {Object} config 分享配置
     */
    const shareToWechat = (config = {}) => {
        const defaultConfig = {
            title: '邀请你加入我们，一起赚取丰厚奖励！',
            desc: '通过我的邀请链接注册，你我都能获得奖励',
            link: inviteLink.value,
            imgUrl: '/images/share-logo.png'
        }

        const shareConfig = {...defaultConfig, ...config }

        // 调用微信分享API
        if (window.wx) {
            window.wx.updateTimelineShareData(shareConfig)
            window.wx.updateAppMessageShareData(shareConfig)
            shareInvite('wechat', shareConfig)
        } else {
            console.warn('微信环境未检测到')
            return { success: false, message: '请在微信中打开' }
        }

        return { success: true, message: '分享配置已设置' }
    }

    /**
     * 清空邀请数据
     */
    const clearInviteData = () => {
        inviteList.value = []
        rewardList.value = []
        inviteLink.value = ''
        shareStats.value = {
            totalShares: 0,
            todayShares: 0,
            shareChannels: {}
        }
    }

    // ==================== 返回值 ====================
    return {
        // 状态
        inviteList,
        rewardList,
        inviteLink,
        rewardRules,
        loading,
        shareStats,

        // 计算属性
        validInviteCount,
        pendingInviteCount,
        totalReward,
        pendingReward,

        // 方法
        generateInviteLink,
        fetchInviteList,
        fetchRewardList,
        fetchRewardRules,
        shareInvite,
        copyInviteLink,
        applyWithdraw,
        fetchShareStats,
        shareToWechat,
        clearInviteData
    }
})