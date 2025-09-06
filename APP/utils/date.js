/**
 * 格式化日期
 * @param {Date} date 日期对象
 * @param {string} format 格式字符串
 * @returns {string} 格式化后的日期字符串
 */
export function formatDate(date, format = 'YYYY-MM-DD') {
    const year = date.getFullYear()
    const month = date.getMonth() + 1
    const day = date.getDate()
    const hour = date.getHours()
    const minute = date.getMinutes()
    const second = date.getSeconds()

    const padZero = (num) => String(num).padStart(2, '0')

    return format
        .replace('YYYY', year)
        .replace('MM', padZero(month))
        .replace('DD', padZero(day))
        .replace('HH', padZero(hour))
        .replace('mm', padZero(minute))
        .replace('ss', padZero(second))
}

/**
 * 获取日期范围
 * @param {string} type 范围类型：'week'|'month'|'year'
 * @returns {{start: Date, end: Date}} 日期范围
 */
export function getDateRange(type) {
    const now = new Date()
    const start = new Date()
    const end = new Date()

    switch (type) {
        case 'week':
            start.setDate(now.getDate() - now.getDay())
            end.setDate(start.getDate() + 6)
            break
        case 'month':
            start.setDate(1)
            end.setMonth(start.getMonth() + 1)
            end.setDate(0)
            break
        case 'year':
            start.setMonth(0, 1)
            end.setMonth(11, 31)
            break
        default:
            break
    }

    return { start, end }
}

/**
 * 计算两个日期之间的天数
 * @param {Date} date1 日期1
 * @param {Date} date2 日期2
 * @returns {number} 天数
 */
export function getDaysBetween(date1, date2) {
    const oneDay = 24 * 60 * 60 * 1000
    const diffTime = Math.abs(date2.getTime() - date1.getTime())
    return Math.round(diffTime / oneDay)
}

/**
 * 检查日期是否为今天
 * @param {Date} date 日期对象
 * @returns {boolean} 是否为今天
 */
export function isToday(date) {
    const today = new Date()
    return date.getDate() === today.getDate() &&
        date.getMonth() === today.getMonth() &&
        date.getFullYear() === today.getFullYear()
}

/**
 * 获取一周中的日期数组
 * @param {Date} date 日期对象
 * @returns {Date[]} 日期数组
 */
export function getWeekDays(date) {
    const result = []
    const current = new Date(date)
    current.setDate(current.getDate() - current.getDay())

    for (let i = 0; i < 7; i++) {
        result.push(new Date(current))
        current.setDate(current.getDate() + 1)
    }

    return result
}

/**
 * 获取月份的天数
 * @param {number} year 年份
 * @param {number} month 月份（0-11）
 * @returns {number} 天数
 */
export function getDaysInMonth(year, month) {
    return new Date(year, month + 1, 0).getDate()
}

/**
 * 检查是否为闰年
 * @param {number} year 年份
 * @returns {boolean} 是否为闰年
 */
export function isLeapYear(year) {
    return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0
}