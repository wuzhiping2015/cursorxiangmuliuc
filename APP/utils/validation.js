/**
 * 验证邮箱格式
 * @param {string} email 邮箱地址
 * @returns {boolean} 是否有效
 */
export function isValidEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return regex.test(email)
}

/**
 * 验证密码强度
 * @param {string} password 密码
 * @returns {{isValid: boolean, message: string}} 验证结果
 */
export function validatePassword(password) {
    if (password.length < 8) {
        return {
            isValid: false,
            message: '密码长度至少为8位'
        }
    }

    if (!/[A-Z]/.test(password)) {
        return {
            isValid: false,
            message: '密码必须包含至少一个大写字母'
        }
    }

    if (!/[a-z]/.test(password)) {
        return {
            isValid: false,
            message: '密码必须包含至少一个小写字母'
        }
    }

    if (!/[0-9]/.test(password)) {
        return {
            isValid: false,
            message: '密码必须包含至少一个数字'
        }
    }

    if (!/[!@#$%^&*]/.test(password)) {
        return {
            isValid: false,
            message: '密码必须包含至少一个特殊字符 (!@#$%^&*)'
        }
    }

    return {
        isValid: true,
        message: '密码格式正确'
    }
}

/**
 * 验证手机号格式
 * @param {string} phone 手机号
 * @returns {boolean} 是否有效
 */
export function isValidPhone(phone) {
    const regex = /^1[3456789]\d{9}$/
    return regex.test(phone)
}

/**
 * 验证习惯名称
 * @param {string} name 习惯名称
 * @returns {{isValid: boolean, message: string}} 验证结果
 */
export function validateHabitName(name) {
    if (!name || name.trim().length === 0) {
        return {
            isValid: false,
            message: '习惯名称不能为空'
        }
    }

    if (name.length > 20) {
        return {
            isValid: false,
            message: '习惯名称不能超过20个字符'
        }
    }

    return {
        isValid: true,
        message: '习惯名称格式正确'
    }
}

/**
 * 验证习惯频率设置
 * @param {Object} frequency 频率设置对象
 * @returns {{isValid: boolean, message: string}} 验证结果
 */
export function validateHabitFrequency(frequency) {
    if (!frequency || !frequency.type) {
        return {
            isValid: false,
            message: '请选择习惯频率类型'
        }
    }

    switch (frequency.type) {
        case 'daily':
            return {
                isValid: true,
                message: '频率设置正确'
            }
        case 'weekly':
            if (!frequency.days || frequency.days.length === 0) {
                return {
                    isValid: false,
                    message: '请选择每周执行的天数'
                }
            }
            return {
                isValid: true,
                message: '频率设置正确'
            }
        case 'custom':
            if (!frequency.interval || frequency.interval < 1) {
                return {
                    isValid: false,
                    message: '请设置有效的间隔天数'
                }
            }
            return {
                isValid: true,
                message: '频率设置正确'
            }
        default:
            return {
                isValid: false,
                message: '无效的频率类型'
            }
    }
}

/**
 * 验证目标设置
 * @param {Object} target 目标设置对象
 * @returns {{isValid: boolean, message: string}} 验证结果
 */
export function validateHabitTarget(target) {
    if (!target) {
        return {
            isValid: true,
            message: '未设置目标'
        }
    }

    if (!target.total || target.total < 1) {
        return {
            isValid: false,
            message: '请设置有效的目标数值'
        }
    }

    if (target.current > target.total) {
        return {
            isValid: false,
            message: '当前进度不能超过目标值'
        }
    }

    return {
        isValid: true,
        message: '目标设置正确'
    }
}

/**
 * 验证日期范围
 * @param {Date} startDate 开始日期
 * @param {Date} endDate 结束日期
 * @returns {{isValid: boolean, message: string}} 验证结果
 */
export function validateDateRange(startDate, endDate) {
    if (!startDate || !endDate) {
        return {
            isValid: false,
            message: '请选择完整的日期范围'
        }
    }

    if (endDate < startDate) {
        return {
            isValid: false,
            message: '结束日期不能早于开始日期'
        }
    }

    return {
        isValid: true,
        message: '日期范围有效'
    }
}