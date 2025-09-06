// DeepSeek API配置
const DEEPSEEK_API_KEY = 'sk-66a161e3c0684c17a5f143b8193b7456';
const DEEPSEEK_API_URL = 'https://api.deepseek.com/v1/chat/completions';

// 调用DeepSeek API获取分析结果
async function getAIAnalysis(data) {
    try {
        // 由于API可能不稳定，这里先返回模拟数据
        return generateLocalAnalysis(data);

        // 实际API调用代码保留，等API配置完善后可以启用
        /*
        const response = await wx.request({
            url: DEEPSEEK_API_URL,
            method: 'POST',
            header: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${DEEPSEEK_API_KEY}`
            },
            data: {
                messages: [{
                    role: "user",
                    content: `请根据以下命理信息生成个性化分析报告（100-200字）：
                    农历日期：${data.lunarDate}
                    天干地支：${data.ganzhi}
                    五行分布：${data.wuxing}
                    五行缺失：${data.missingWuxing}
                    生肖：${data.zodiac}`
                }],
                model: "deepseek-chat",
                temperature: 0.7
            }
        });

        if (response.data && response.data.choices && response.data.choices[0]) {
            return response.data.choices[0].message.content;
        }
        return '暂时无法生成分析报告，请稍后重试。';
        */
    } catch (error) {
        console.error('AI分析请求失败：', error);
        return generateLocalAnalysis(data);
    }
}

// 生成本地分析结果
function generateLocalAnalysis(data) {
    const { zodiac, ganzhi, wuxing, missingWuxing } = data;

    // 基于输入数据生成个性化分析
    const analysis = `根据您的命理信息：
    
您属${zodiac}，天干地支为${ganzhi}。从五行分布来看，${wuxing}，${missingWuxing}。

从整体格局来看，您的命盘显示出较为独特的特征。${missingWuxing}说明您在相关领域可能需要适当补充和平衡。建议在日常生活中多关注与${missingWuxing.replace('缺', '')}相关的事物，以达到五行平衡。

您的生肖${zodiac}与${ganzhi}相合，显示出良好的潜力和发展空间。建议您在人际交往和事业发展中，充分发挥自身优势，注意把握机遇。`;

    return analysis;
}

module.exports = {
    getAIAnalysis
};