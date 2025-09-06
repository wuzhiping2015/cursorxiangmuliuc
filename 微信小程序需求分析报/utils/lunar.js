// 农历月份
const LUNAR_MONTHS = ['正', '二', '三', '四', '五', '六', '七', '八', '九', '十', '冬', '腊'];
const LUNAR_DAYS = ['初一', '初二', '初三', '初四', '初五', '初六', '初七', '初八', '初九', '初十',
    '十一', '十二', '十三', '十四', '十五', '十六', '十七', '十八', '十九', '二十',
    '廿一', '廿二', '廿三', '廿四', '廿五', '廿六', '廿七', '廿八', '廿九', '三十'
];

// 天干
const HEAVENLY_STEMS = ['甲', '乙', '丙', '丁', '戊', '己', '庚', '辛', '壬', '癸'];
// 地支
const EARTHLY_BRANCHES = ['子', '丑', '寅', '卯', '辰', '巳', '午', '未', '申', '酉', '戌', '亥'];
// 生肖
const ZODIAC_SIGNS = ['鼠', '牛', '虎', '兔', '龙', '蛇', '马', '羊', '猴', '鸡', '狗', '猪'];

function solarToLunar(date) {
    // 这里使用简化版的转换逻辑
    // 实际项目中建议使用成熟的农历转换库
    const year = date.getFullYear();
    const month = date.getMonth();
    const day = date.getDate();

    // 简单示例：将公历月日转为农历月日
    // 注意：这只是示例，不是准确的农历转换
    const lunarMonth = LUNAR_MONTHS[month];
    const lunarDay = LUNAR_DAYS[day % 30];

    return {
        year: year,
        month: lunarMonth,
        day: lunarDay
    };
}

function getZodiac(year) {
    return ZODIAC_SIGNS[(year - 4) % 12];
}

function getGanZhi(year) {
    const heavenlyStemIndex = (year - 4) % 10;
    const earthlyBranchIndex = (year - 4) % 12;
    return HEAVENLY_STEMS[heavenlyStemIndex] + EARTHLY_BRANCHES[earthlyBranchIndex];
}

function getWuxing(ganZhi) {
    // 简单示例：根据天干地支计算五行分布
    return {
        distribution: '金2 木1 水1 火2 土1',
        missing: '缺木'
    };
}

module.exports = {
    solarToLunar,
    getZodiac,
    getGanZhi,
    getWuxing
};