// 使用Node.js的fs模块来写入文件
const fs = require('fs');
const path = require('path');

// 创建简单的SVG图标，每个图标设置两种颜色：普通颜色和选中颜色
const icons = {
    // 首页图标 - 房子形状
    home: `<svg xmlns="http://www.w3.org/2000/svg" width="81" height="81" viewBox="0 0 24 24" fill="none" stroke="COLOR" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
    <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/>
    <polyline points="9 22 9 12 15 12 15 22"/>
  </svg>`,

    // 统计图标 - 条形图
    stats: `<svg xmlns="http://www.w3.org/2000/svg" width="81" height="81" viewBox="0 0 24 24" fill="none" stroke="COLOR" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
    <line x1="18" y1="20" x2="18" y2="10"/>
    <line x1="12" y1="20" x2="12" y2="4"/>
    <line x1="6" y1="20" x2="6" y2="14"/>
    <line x1="3" y1="20" x2="21" y2="20"/>
  </svg>`,

    // 我的图标 - 用户
    mine: `<svg xmlns="http://www.w3.org/2000/svg" width="81" height="81" viewBox="0 0 24 24" fill="none" stroke="COLOR" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
    <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/>
    <circle cx="12" cy="7" r="4"/>
  </svg>`
};

// 颜色设置
const colors = {
    normal: '#999999', // 正常状态的颜色
    active: '#4080FF' // 选中状态的颜色
};

// 遍历图标并创建文件
Object.keys(icons).forEach(iconName => {
    // 创建正常状态的图标
    const normalIcon = icons[iconName].replace('COLOR', colors.normal);
    fs.writeFileSync(path.join(__dirname, `${iconName}.svg`), normalIcon);

    // 创建选中状态的图标
    const activeIcon = icons[iconName].replace('COLOR', colors.active);
    fs.writeFileSync(path.join(__dirname, `${iconName}-active.svg`), activeIcon);

    console.log(`Created ${iconName}.svg and ${iconName}-active.svg`);
});

console.log('SVG图标创建完成，请将SVG文件转换为PNG文件。');
console.log('你可以使用在线工具如 https://svgtopng.com/ 或者设计软件来转换。');
console.log('转换后的文件应该保存为：');
console.log('- home.png 和 home-active.png');
console.log('- stats.png 和 stats-active.png');
console.log('- mine.png 和 mine-active.png');