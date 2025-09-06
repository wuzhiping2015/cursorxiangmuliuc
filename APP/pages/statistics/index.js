Page({
    data: {
        trendData: [
            { date: '7/10', walkingRate: 0.8, readingRate: 0.6, waterRate: 0.5 },
            { date: '7/11', walkingRate: 0.7, readingRate: 0.4, waterRate: 0.8 },
            { date: '7/12', walkingRate: 0.9, readingRate: 0.7, waterRate: 0.6 },
            { date: '7/13', walkingRate: 1.0, readingRate: 0.5, waterRate: 0.9 },
            { date: '7/14', walkingRate: 0.8, readingRate: 0.8, waterRate: 0.7 },
            { date: '7/15', walkingRate: 0.9, readingRate: 0.6, waterRate: 0.8 }
        ],
        habitStatus: [{
                id: 1,
                name: '晨间步行',
                icon: 'https://images.unsplash.com/photo-1470299568568-d4e1c9e1193a?w=100&h=100&fit=crop',
                rate: 0.85,
                color: '#4080FF'
            },
            {
                id: 2,
                name: '阅读30分钟',
                icon: 'https://images.unsplash.com/photo-1495446815901-a7297e633e8d?w=100&h=100&fit=crop',
                rate: 0.65,
                color: '#F5A623'
            },
            {
                id: 3,
                name: '喝水2000ml',
                icon: 'https://images.unsplash.com/photo-1523362628745-0c100150b504?w=100&h=100&fit=crop',
                rate: 0.72,
                color: '#49D2C2'
            }
        ]
    },

    onLoad: function() {

    },

    onShow: function() {
        this.renderCompletionChart();
    },

    renderCompletionChart: function() {
        const ctx = wx.createCanvasContext('completionChart');
        const canvasWidth = 300;
        const canvasHeight = 150;
        const centerX = canvasWidth / 2;
        const centerY = canvasHeight / 2;
        const radius = 60;

        // 绘制环形图背景
        ctx.beginPath();
        ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI);
        ctx.setLineWidth(15);
        ctx.setStrokeStyle('#F5F5F5');
        ctx.stroke();

        // 绘制完成率
        const completionRate = 0.75; // 75%完成率
        const endAngle = (-0.5 + 2 * completionRate) * Math.PI;

        ctx.beginPath();
        ctx.arc(centerX, centerY, radius, -0.5 * Math.PI, endAngle);
        ctx.setLineWidth(15);
        ctx.setStrokeStyle('#4080FF');
        ctx.stroke();

        // 绘制中间文字
        ctx.setFontSize(30);
        ctx.setFillStyle('#333333');
        ctx.setTextAlign('center');
        ctx.setTextBaseline('middle');
        ctx.fillText(`${Math.floor(completionRate * 100)}%`, centerX, centerY);

        // 绘制说明文字
        ctx.setFontSize(14);
        ctx.setFillStyle('#999999');
        ctx.fillText('总体完成率', centerX, centerY + 25);

        ctx.draw();
    }
})