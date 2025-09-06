// 初始化时间显示
function updateTime() {
    const now = new Date();
    const timeStr = now.toLocaleTimeString('zh-CN', {
        hour12: false,
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
    });
    document.getElementById('currentTime').textContent = timeStr;
}

// 更新运行时间
function updateRunningTime() {
    const startTime = new Date('2024-03-28').getTime();
    const now = new Date().getTime();
    const diff = now - startTime;

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));

    document.getElementById('runningTime').textContent = `${days}天${hours}小时${minutes}分`;
}

// 初始化销售业绩图表
function initSalesChart() {
    const chart = echarts.init(document.getElementById('salesChart'));
    const option = {
        grid: {
            top: 30,
            right: 30,
            bottom: 30,
            left: 60
        },
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'shadow'
            }
        },
        xAxis: {
            type: 'category',
            data: ['1月', '2月', '3月', '4月', '5月', '6月'],
            axisLine: {
                lineStyle: {
                    color: 'rgba(255, 255, 255, 0.3)'
                }
            },
            axisLabel: {
                color: 'rgba(255, 255, 255, 0.7)'
            }
        },
        yAxis: {
            type: 'value',
            axisLine: {
                lineStyle: {
                    color: 'rgba(255, 255, 255, 0.3)'
                }
            },
            axisLabel: {
                color: 'rgba(255, 255, 255, 0.7)'
            },
            splitLine: {
                lineStyle: {
                    color: 'rgba(255, 255, 255, 0.1)'
                }
            }
        },
        series: [{
            data: [150, 230, 224, 218, 135, 147],
            type: 'line',
            smooth: true,
            symbolSize: 8,
            itemStyle: {
                color: '#E4A9AF'
            },
            areaStyle: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                    offset: 0,
                    color: 'rgba(228, 169, 175, 0.3)'
                }, {
                    offset: 1,
                    color: 'rgba(228, 169, 175, 0.1)'
                }])
            }
        }]
    };
    chart.setOption(option);
    window.addEventListener('resize', () => chart.resize());
}

// 初始化地区分布图表
function initRegionChart() {
    const chart = echarts.init(document.getElementById('regionChart'));
    const option = {
        tooltip: {
            trigger: 'item'
        },
        legend: {
            top: '5%',
            left: 'center',
            textStyle: {
                color: 'rgba(255, 255, 255, 0.7)'
            }
        },
        series: [{
            name: '地区分布',
            type: 'pie',
            radius: ['40%', '70%'],
            avoidLabelOverlap: false,
            itemStyle: {
                borderRadius: 10,
                borderColor: '#1a1c25',
                borderWidth: 2
            },
            label: {
                show: false,
                position: 'center'
            },
            emphasis: {
                label: {
                    show: true,
                    fontSize: '18',
                    fontWeight: 'bold',
                    color: '#fff'
                }
            },
            labelLine: {
                show: false
            },
            data: [
                { value: 1048, name: '华东' },
                { value: 735, name: '华北' },
                { value: 580, name: '华南' },
                { value: 484, name: '西南' },
                { value: 300, name: '西北' }
            ],
            color: ['#E4A9AF', '#D4646A', '#FF9999', '#FFB5B5', '#FFD1D1']
        }]
    };
    chart.setOption(option);
    window.addEventListener('resize', () => chart.resize());
}

// 初始化产品分类图表
function initCategoryChart() {
    const chart = echarts.init(document.getElementById('categoryChart'));
    const option = {
        grid: {
            top: 30,
            right: 30,
            bottom: 30,
            left: 60
        },
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'shadow'
            }
        },
        xAxis: {
            type: 'value',
            axisLine: {
                lineStyle: {
                    color: 'rgba(255, 255, 255, 0.3)'
                }
            },
            axisLabel: {
                color: 'rgba(255, 255, 255, 0.7)'
            },
            splitLine: {
                lineStyle: {
                    color: 'rgba(255, 255, 255, 0.1)'
                }
            }
        },
        yAxis: {
            type: 'category',
            data: ['类别A', '类别B', '类别C', '类别D', '类别E'],
            axisLine: {
                lineStyle: {
                    color: 'rgba(255, 255, 255, 0.3)'
                }
            },
            axisLabel: {
                color: 'rgba(255, 255, 255, 0.7)'
            }
        },
        series: [{
            name: '销量',
            type: 'bar',
            data: [320, 302, 301, 334, 390],
            itemStyle: {
                color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [{
                    offset: 0,
                    color: '#E4A9AF'
                }, {
                    offset: 1,
                    color: '#D4646A'
                }])
            }
        }]
    };
    chart.setOption(option);
    window.addEventListener('resize', () => chart.resize());
}

// 更新数字
function updateNumbers() {
    const totalSales = document.getElementById('totalSales');
    const orderCount = document.getElementById('orderCount');
    const customerCount = document.getElementById('customerCount');

    // 模拟数据更新
    const currentSales = parseInt(totalSales.textContent);
    const currentOrders = parseInt(orderCount.textContent);
    const currentCustomers = parseInt(customerCount.textContent);

    totalSales.textContent = currentSales + Math.floor(Math.random() * 10);
    orderCount.textContent = currentOrders + Math.floor(Math.random() * 5);
    customerCount.textContent = currentCustomers + Math.floor(Math.random() * 3);
}

// 添加实时订单
function addRealtimeOrder() {
    const orderList = document.getElementById('orderList');
    const order = document.createElement('div');
    order.className = 'order-item';
    order.style.padding = '10px';
    order.style.borderBottom = '1px solid rgba(255, 255, 255, 0.1)';
    order.style.animation = 'fadeIn 0.5s ease-out';

    const now = new Date();
    const timeStr = now.toLocaleTimeString('zh-CN', {
        hour12: false,
        hour: '2-digit',
        minute: '2-digit'
    });

    order.innerHTML = `
        <div style="display: flex; justify-content: space-between; margin-bottom: 5px;">
            <span style="color: var(--plum-primary);">订单 #${Math.floor(Math.random() * 10000)}</span>
            <span style="color: var(--text-secondary);">${timeStr}</span>
        </div>
        <div style="color: var(--text-secondary);">
            金额: ¥${Math.floor(Math.random() * 10000)}
        </div>
    `;

    orderList.insertBefore(order, orderList.firstChild);
    if (orderList.children.length > 10) {
        orderList.removeChild(orderList.lastChild);
    }
}

// 初始化函数
function init() {
    // 初始化时间显示
    updateTime();
    setInterval(updateTime, 1000);

    // 初始化运行时间
    updateRunningTime();
    setInterval(updateRunningTime, 60000);

    // 初始化图表
    initSalesChart();
    initRegionChart();
    initCategoryChart();

    // 定时更新数据
    setInterval(updateNumbers, 5000);
    setInterval(addRealtimeOrder, 3000);
}

// 页面加载完成后初始化
document.addEventListener('DOMContentLoaded', init);