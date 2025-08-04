/**
 * 表单验证工具函数
 * 提供常用的验证规则和验证方法
 * @author 前端工程师团队
 * @date 2024-12-XX
 */

/**
 * 常用正则表达式
 */
export const REGEX = {
  // 手机号
  mobile: /^1[3-9]\d{9}$/,
  // 电子邮箱
  email: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
  // 身份证号
  idCard: /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/,
  // 银行卡号
  bankCard: /^\d{16,19}$/,
  // 中文姓名
  chineseName: /^[\u4e00-\u9fa5]{2,8}$/,
  // 密码（6-20位，包含字母和数字）
  password: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*?&]{6,20}$/,
  // 验证码（4-6位数字）
  verifyCode: /^\d{4,6}$/,
  // URL
  url: /^https?:\/\/(([a-zA-Z0-9_-])+(\.)?)*(:\d+)?(\/((\.)?(\?)?=?&?[a-zA-Z0-9_-](\?)?)*)*$/i,
  // IP地址
  ip: /^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/
}

/**
 * 验证规则生成器
 */
export const Rules = {
  /**
   * 必填验证
   * @param {string} message 错误消息
   * @returns {Function} 验证函数
   */
  required(message = '此项为必填项') {
    return (value) => {
      if (value === null || value === undefined || value === '') {
        return message
      }
      if (Array.isArray(value) && value.length === 0) {
        return message
      }
      return true
    }
  },

  /**
   * 最小长度验证
   * @param {number} min 最小长度
   * @param {string} message 错误消息
   * @returns {Function} 验证函数
   */
  minLength(min, message) {
    return (value) => {
      if (!value) return true
      const length = typeof value === 'string' ? value.length : String(value).length
      if (length < min) {
        return message || `最少需要${min}个字符`
      }
      return true
    }
  },

  /**
   * 最大长度验证
   * @param {number} max 最大长度
   * @param {string} message 错误消息
   * @returns {Function} 验证函数
   */
  maxLength(max, message) {
    return (value) => {
      if (!value) return true
      const length = typeof value === 'string' ? value.length : String(value).length
      if (length > max) {
        return message || `最多只能输入${max}个字符`
      }
      return true
    }
  },

  /**
   * 长度范围验证
   * @param {number} min 最小长度
   * @param {number} max 最大长度
   * @param {string} message 错误消息
   * @returns {Function} 验证函数
   */
  lengthRange(min, max, message) {
    return (value) => {
      if (!value) return true
      const length = typeof value === 'string' ? value.length : String(value).length
      if (length < min || length > max) {
        return message || `长度应该在${min}-${max}个字符之间`
      }
      return true
    }
  },

  /**
   * 正则表达式验证
   * @param {RegExp} pattern 正则表达式
   * @param {string} message 错误消息
   * @returns {Function} 验证函数
   */
  pattern(pattern, message = '格式不正确') {
    return (value) => {
      if (!value) return true
      if (!pattern.test(value)) {
        return message
      }
      return true
    }
  },

  /**
   * 手机号验证
   * @param {string} message 错误消息
   * @returns {Function} 验证函数
   */
  mobile(message = '请输入正确的手机号') {
    return Rules.pattern(REGEX.mobile, message)
  },

  /**
   * 邮箱验证
   * @param {string} message 错误消息
   * @returns {Function} 验证函数
   */
  email(message = '请输入正确的邮箱地址') {
    return Rules.pattern(REGEX.email, message)
  },

  /**
   * 身份证号验证
   * @param {string} message 错误消息
   * @returns {Function} 验证函数
   */
  idCard(message = '请输入正确的身份证号') {
    return Rules.pattern(REGEX.idCard, message)
  },

  /**
   * 银行卡号验证
   * @param {string} message 错误消息
   * @returns {Function} 验证函数
   */
  bankCard(message = '请输入正确的银行卡号') {
    return Rules.pattern(REGEX.bankCard, message)
  },

  /**
   * 中文姓名验证
   * @param {string} message 错误消息
   * @returns {Function} 验证函数
   */
  chineseName(message = '请输入正确的中文姓名') {
    return Rules.pattern(REGEX.chineseName, message)
  },

  /**
   * 密码强度验证
   * @param {string} message 错误消息
   * @returns {Function} 验证函数
   */
  password(message = '密码需包含字母和数字，长度6-20位') {
    return Rules.pattern(REGEX.password, message)
  },

  /**
   * 验证码验证
   * @param {string} message 错误消息
   * @returns {Function} 验证函数
   */
  verifyCode(message = '请输入正确的验证码') {
    return Rules.pattern(REGEX.verifyCode, message)
  },

  /**
   * 数值范围验证
   * @param {number} min 最小值
   * @param {number} max 最大值
   * @param {string} message 错误消息
   * @returns {Function} 验证函数
   */
  numberRange(min, max, message) {
    return (value) => {
      if (!value) return true
      const num = Number(value)
      if (isNaN(num)) {
        return '请输入有效数字'
      }
      if (num < min || num > max) {
        return message || `数值应该在${min}-${max}之间`
      }
      return true
    }
  },

  /**
   * 确认密码验证
   * @param {string} originalPassword 原密码
   * @param {string} message 错误消息
   * @returns {Function} 验证函数
   */
  confirmPassword(originalPassword, message = '两次输入的密码不一致') {
    return (value) => {
      if (!value) return true
      if (value !== originalPassword) {
        return message
      }
      return true
    }
  },

  /**
   * 自定义验证
   * @param {Function} validator 验证函数
   * @param {string} message 错误消息
   * @returns {Function} 验证函数
   */
  custom(validator, message = '验证失败') {
    return (value) => {
      try {
        const result = validator(value)
        if (result === false) {
          return message
        }
        return result === true ? true : (result || message)
      } catch (error) {
        return message
      }
    }
  }
}

/**
 * 表单验证器类
 */
export class FormValidator {
  constructor() {
    this.rules = {}
    this.errors = {}
  }

  /**
   * 添加字段验证规则
   * @param {string} field 字段名
   * @param {Array} rules 验证规则数组
   */
  addField(field, rules) {
    this.rules[field] = Array.isArray(rules) ? rules : [rules]
    return this
  }

  /**
   * 验证单个字段
   * @param {string} field 字段名
   * @param {any} value 字段值
   * @returns {boolean} 验证结果
   */
  validateField(field, value) {
    const fieldRules = this.rules[field]
    if (!fieldRules || fieldRules.length === 0) {
      delete this.errors[field]
      return true
    }

    for (const rule of fieldRules) {
      if (typeof rule === 'function') {
        const result = rule(value)
        if (result !== true) {
          this.errors[field] = result
          return false
        }
      } else if (rule.validator) {
        const result = rule.validator(value)
        if (result !== true) {
          this.errors[field] = result !== false ? result : rule.message
          return false
        }
      }
    }

    delete this.errors[field]
    return true
  }

  /**
   * 验证所有字段
   * @param {Object} data 表单数据
   * @returns {boolean} 验证结果
   */
  validate(data) {
    let isValid = true
    this.errors = {}

    for (const field in this.rules) {
      const fieldValid = this.validateField(field, data[field])
      if (!fieldValid) {
        isValid = false
      }
    }

    return isValid
  }

  /**
   * 获取字段错误消息
   * @param {string} field 字段名
   * @returns {string} 错误消息
   */
  getError(field) {
    return this.errors[field] || ''
  }

  /**
   * 获取所有错误消息
   * @returns {Object} 错误消息对象
   */
  getErrors() {
    return { ...this.errors }
  }

  /**
   * 清除字段错误
   * @param {string} field 字段名
   */
  clearError(field) {
    delete this.errors[field]
  }

  /**
   * 清除所有错误
   */
  clearErrors() {
    this.errors = {}
  }

  /**
   * 检查是否有错误
   * @returns {boolean} 是否有错误
   */
  hasErrors() {
    return Object.keys(this.errors).length > 0
  }
}

/**
 * 创建表单验证器
 * @param {Object} rules 验证规则配置
 * @returns {FormValidator} 验证器实例
 */
export const createValidator = (rules = {}) => {
  const validator = new FormValidator()
  
  for (const field in rules) {
    validator.addField(field, rules[field])
  }
  
  return validator
}

/**
 * 快速验证工具函数
 */
export const validate = {
  /**
   * 验证手机号
   * @param {string} mobile 手机号
   * @returns {boolean} 验证结果
   */
  mobile: (mobile) => REGEX.mobile.test(mobile),
  
  /**
   * 验证邮箱
   * @param {string} email 邮箱
   * @returns {boolean} 验证结果
   */
  email: (email) => REGEX.email.test(email),
  
  /**
   * 验证身份证号
   * @param {string} idCard 身份证号
   * @returns {boolean} 验证结果
   */
  idCard: (idCard) => REGEX.idCard.test(idCard),
  
  /**
   * 验证银行卡号
   * @param {string} bankCard 银行卡号
   * @returns {boolean} 验证结果
   */
  bankCard: (bankCard) => REGEX.bankCard.test(bankCard),
  
  /**
   * 验证中文姓名
   * @param {string} name 姓名
   * @returns {boolean} 验证结果
   */
  chineseName: (name) => REGEX.chineseName.test(name),
  
  /**
   * 验证密码强度
   * @param {string} password 密码
   * @returns {boolean} 验证结果
   */
  password: (password) => REGEX.password.test(password),
  
  /**
   * 验证验证码
   * @param {string} code 验证码
   * @returns {boolean} 验证结果
   */
  verifyCode: (code) => REGEX.verifyCode.test(code)
}

// 默认导出
export default {
  REGEX,
  Rules,
  FormValidator,
  createValidator,
  validate
}