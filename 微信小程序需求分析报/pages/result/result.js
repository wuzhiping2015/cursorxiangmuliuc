const { solarToLunar, getZodiac, getGanZhi, getWuxing } = require('../../utils/lunar');
const { getAIAnalysis } = require('../../utils/api');

Page({
    data: {
        lunarDate: '',
        ganzhi: '',
        wuxing: '',
        missingWuxing: '',
        zodiac: '',
        aiAnalysis: '正在生成分析报告...',
        loading: true
    },
    onLoad: async function(options) {
        console.log('Result Page Loaded');
        const { date, time } = options;
        await this.calculateResult(date, time);
    },
    calculateResult: async function(date, time) {
        try {
            // 计算农历日期和生肖
            const lunarDate = solarToLunar(new Date(date));
            const zodiac = getZodiac(new Date(date).getFullYear());

            // 计算天干地支
            const ganzhi = getGanZhi(new Date(date).getFullYear());

            // 计算五行分布
            const wuxingResult = getWuxing(ganzhi);

            // 更新状态
            this.setData({
                lunarDate: `${lunarDate.month}月${lunarDate.day}`,
                zodiac,
                ganzhi,
                wuxing: wuxingResult.distribution,
                missingWuxing: wuxingResult.missing
            });

            // 调用AI分析
            const analysisData = {
                lunarDate: this.data.lunarDate,
                ganzhi,
                wuxing: wuxingResult.distribution,
                missingWuxing: wuxingResult.missing,
                zodiac
            };

            const aiAnalysis = await getAIAnalysis(analysisData);
            this.setData({
                aiAnalysis,
                loading: false
            });

        } catch (error) {
            console.error('计算结果出错：', error);
            wx.showToast({
                title: '计算出错，请重试',
                icon: 'none'
            });
        }
    },
    onShare: function() {
        wx.showShareMenu({
            withShareTicket: true,
            menus: ['shareAppMessage', 'shareTimeline']
        });
    }
});