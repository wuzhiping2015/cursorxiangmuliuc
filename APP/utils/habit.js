import { isToday, formatDate } from './date'

/**
 * 计算习惯完成率
 * @param {Array} checkInRecords 打卡记录
 * @param {Date} startDate 开始日期
 * @param {Date} endDate 结束日期
 * @returns {number} 完成率（0-100）
 */
export function calculateCompletionRate(checkInRecords, startDate, endDate) {
    const totalDays = Math.ceil((endDate - startDate) / (1000 * 60 * 60 * 24)) + 1
    const completedDays = checkInRecords.filter(record => {
        const recordDate = new Date(record.date)
        return recordDate >= startDate && recordDate <= endDate
    }).length
    return Math.round((completedDays / totalDays) * 100)
}

/**
 * 计算当前连续打卡天数
 * @param {Array} checkInRecords 打卡记录
 * @returns {number} 连续天数
 */
export function calculateCurrentStreak(checkInRecords) {
    if (!checkInRecords.length) return 0

    let streak = 0
    const today = new Date()
    today.setHours(0, 0, 0, 0)

    // 按日期降序排序
    const sortedRecords = [...checkInRecords].sort((a, b) =>
        new Date(b.date) - new Date(a.date)
    )

    // 检查最后一次打卡是否是今天或昨天
    const lastCheckIn = new Date(sortedRecords[0].date)
    lastCheckIn.setHours(0, 0, 0, 0)

    const isLastCheckInValid =
        lastCheckIn.getTime() === today.getTime() ||
        lastCheckIn.getTime() === today.getTime() - 86400000

    if (!isLastCheckInValid) return 0

    // 计算连续天数
    let currentDate = lastCheckIn
    for (let i = 0; i < sortedRecords.length; i++) {
        const recordDate = new Date(sortedRecords[i].date)
        recordDate.setHours(0, 0, 0, 0)

        if (currentDate.getTime() === recordDate.getTime()) {
            streak++
            currentDate = new Date(currentDate.getTime() - 86400000)
        } else if (currentDate.getTime() < recordDate.getTime()) {
            continue
        } else {
            break
        }
    }

    return streak
}

/**
 * 计算最长连续打卡天数
 * @param {Array} checkInRecords 打卡记录
 * @returns {number} 最长连续天数
 */
export function calculateLongestStreak(checkInRecords) {
    if (!checkInRecords.length) return 0

    let maxStreak = 0
    let currentStreak = 0
    const sortedRecords = [...checkInRecords].sort((a, b) =>
        new Date(a.date) - new Date(b.date)
    )

    let previousDate = null

    sortedRecords.forEach(record => {
        const currentDate = new Date(record.date)
        currentDate.setHours(0, 0, 0, 0)

        if (!previousDate) {
            currentStreak = 1
        } else {
            const diffDays = (currentDate - previousDate) / (1000 * 60 * 60 * 24)
            if (diffDays === 1) {
                currentStreak++
            } else {
                currentStreak = 1
            }
        }

        maxStreak = Math.max(maxStreak, currentStreak)
        previousDate = currentDate
    })

    return maxStreak
}

/**
 * 检查习惯是否需要今天完成
 * @param {Object} habit 习惯对象
 * @returns {boolean} 是否需要今天完成
 */
export function shouldCompleteToday(habit) {
    const today = new Date()
    const dayOfWeek = today.getDay()

    // 如果今天已经完成，返回false
    if (habit.checkInRecords.some(record => isToday(new Date(record.date)))) {
        return false
    }

    // 检查频率设置
    switch (habit.frequency.type) {
        case 'daily':
            return true
        case 'weekly':
            return habit.frequency.days.includes(dayOfWeek)
        case 'custom':
            // 自定义间隔天数
            if (!habit.lastCompletedDate) return true
            const lastCompleted = new Date(habit.lastCompletedDate)
            const daysSinceLastCompleted = Math.floor(
                (today - lastCompleted) / (1000 * 60 * 60 * 24)
            )
            return daysSinceLastCompleted >= habit.frequency.interval
        default:
            return false
    }
}

/**
 * 生成习惯的统计数据
 * @param {Object} habit 习惯对象
 * @returns {Object} 统计数据
 */
export function generateHabitStats(habit) {
    const checkInRecords = habit.checkInRecords || []
    const startDate = new Date(habit.createdAt)
    const today = new Date()

    return {
        totalDays: checkInRecords.length,
        currentStreak: calculateCurrentStreak(checkInRecords),
        longestStreak: calculateLongestStreak(checkInRecords),
        completionRate: calculateCompletionRate(checkInRecords, startDate, today),
        lastCompletedDate: checkInRecords.length > 0 ?
            formatDate(new Date(checkInRecords[checkInRecords.length - 1].date)) : null
    }
}

/**
 * 检查习惯是否已过期
 * @param {Object} habit 习惯对象
 * @returns {boolean} 是否已过期
 */
export function isHabitExpired(habit) {
    if (!habit.endDate) return false
    const today = new Date()
    const endDate = new Date(habit.endDate)
    return today > endDate
}

/**
 * 计算习惯的进度
 * @param {Object} habit 习惯对象
 * @returns {number} 进度百分比（0-100）
 */
export function calculateHabitProgress(habit) {
    if (!habit.target) return 0

    const { current = 0, total } = habit.target
    return Math.min(Math.round((current / total) * 100), 100)
}