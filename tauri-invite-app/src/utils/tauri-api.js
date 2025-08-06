/**
 * Tauri API 服务
 * 封装 Tauri 原生功能调用
 * @author 前端工程师团队
 * @date 2024-12-XX
 */

/**
 * Tauri API 服务类
 */
export class TauriApiService {
  
  /**
   * 检查是否在 Tauri 环境中运行
   */
  static get isTauriApp() {
    return window.__TAURI__ !== undefined
  }

  /**
   * 动态导入 Tauri API
   */
  static async importTauriApi(module) {
    if (!this.isTauriApp) {
      throw new Error('当前不在 Tauri 环境中')
    }
    return await import(`@tauri-apps/api/${module}`)
  }

  /**
   * 调用 Tauri 命令
   */
  static async invoke(command, args = {}) {
    if (!this.isTauriApp) {
      console.warn(`模拟 Tauri 命令调用: ${command}`, args)
      return { success: false, error: '非 Tauri 环境' }
    }
    
    try {
      const { invoke } = await this.importTauriApi('tauri')
      return await invoke(command, args)
    } catch (error) {
      console.error(`Tauri 命令调用失败 [${command}]:`, error)
      throw error
    }
  }

  /**
   * 获取系统信息
   */
  static async getSystemInfo() {
    try {
      const result = await this.invoke('get_system_info')
      return { success: true, data: result }
    } catch (error) {
      return { success: false, error: error.message }
    }
  }

  /**
   * 发送系统通知
   */
  static async sendNotification(title, body) {
    try {
      if (this.isTauriApp) {
        await this.invoke('send_notification', { title, body })
      } else {
        // Web 环境下的备用方案
        if ('Notification' in window) {
          if (Notification.permission === 'granted') {
            new Notification(title, { body })
          } else if (Notification.permission !== 'denied') {
            const permission = await Notification.requestPermission()
            if (permission === 'granted') {
              new Notification(title, { body })
            }
          }
        }
      }
      return { success: true }
    } catch (error) {
      return { success: false, error: error.message }
    }
  }

  /**
   * 复制文本到剪贴板
   */
  static async copyToClipboard(text) {
    try {
      if (this.isTauriApp) {
        await this.invoke('copy_to_clipboard', { text })
      } else {
        // Web 环境备用方案
        if (navigator.clipboard) {
          await navigator.clipboard.writeText(text)
        } else {
          // 老浏览器兼容
          const textArea = document.createElement('textarea')
          textArea.value = text
          document.body.appendChild(textArea)
          textArea.select()
          document.execCommand('copy')
          document.body.removeChild(textArea)
        }
      }
      return { success: true }
    } catch (error) {
      return { success: false, error: error.message }
    }
  }

  /**
   * 从剪贴板读取文本
   */
  static async readFromClipboard() {
    try {
      if (this.isTauriApp) {
        const text = await this.invoke('read_from_clipboard')
        return { success: true, data: text }
      } else {
        // Web 环境备用方案
        if (navigator.clipboard) {
          const text = await navigator.clipboard.readText()
          return { success: true, data: text }
        } else {
          throw new Error('剪贴板 API 不支持')
        }
      }
    } catch (error) {
      return { success: false, error: error.message }
    }
  }

  /**
   * 打开外部链接
   */
  static async openExternalLink(url) {
    try {
      if (this.isTauriApp) {
        await this.invoke('open_external_link', { url })
      } else {
        window.open(url, '_blank')
      }
      return { success: true }
    } catch (error) {
      return { success: false, error: error.message }
    }
  }

  /**
   * 在文件管理器中显示文件
   */
  static async showInFolder(path) {
    try {
      await this.invoke('show_in_folder', { path })
      return { success: true }
    } catch (error) {
      return { success: false, error: error.message }
    }
  }

  /**
   * 保存二维码到桌面
   */
  static async saveQRCodeToDesktop(qrData, filename = 'invite-qrcode.png') {
    try {
      const path = await this.invoke('save_qrcode_to_desktop', {
        qrData,
        filename
      })
      
      await this.sendNotification('保存成功', `二维码已保存到桌面：${filename}`)
      return { success: true, path }
    } catch (error) {
      await this.sendNotification('保存失败', `二维码保存失败：${error.message}`)
      return { success: false, error: error.message }
    }
  }

  /**
   * 保存文件到桌面
   */
  static async saveFileToDesktop(content, filename) {
    try {
      const path = await this.invoke('save_file_to_desktop', {
        content,
        filename
      })
      
      await this.sendNotification('文件保存成功', `文件已保存到桌面：${filename}`)
      return { success: true, path }
    } catch (error) {
      return { success: false, error: error.message }
    }
  }

  /**
   * 创建邀请文件夹
   */
  static async createInviteFolder() {
    try {
      const path = await this.invoke('create_invite_folder')
      return { success: true, path }
    } catch (error) {
      return { success: false, error: error.message }
    }
  }

  /**
   * 生成邀请链接
   */
  static async generateInviteLink(inviteCode, baseUrl) {
    try {
      const link = await this.invoke('generate_invite_link', {
        inviteCode,
        baseUrl
      })
      return { success: true, data: link }
    } catch (error) {
      return { success: false, error: error.message }
    }
  }

  /**
   * 生成二维码
   */
  static async generateQRCode(data) {
    try {
      const qrCodeBase64 = await this.invoke('generate_qrcode', { data })
      return { success: true, data: qrCodeBase64 }
    } catch (error) {
      return { success: false, error: error.message }
    }
  }

  /**
   * 保存邀请记录
   */
  static async saveInviteRecord(record) {
    try {
      const id = await this.invoke('save_invite_record', { record })
      return { success: true, data: id }
    } catch (error) {
      return { success: false, error: error.message }
    }
  }

  /**
   * 获取邀请记录列表
   */
  static async getInviteRecords(limit, offset) {
    try {
      const records = await this.invoke('get_invite_records', { limit, offset })
      return { success: true, data: records }
    } catch (error) {
      return { success: false, error: error.message }
    }
  }

  /**
   * 删除邀请记录
   */
  static async deleteInviteRecord(id) {
    try {
      await this.invoke('delete_invite_record', { id })
      return { success: true }
    } catch (error) {
      return { success: false, error: error.message }
    }
  }

  /**
   * 保存奖励记录
   */
  static async saveRewardRecord(record) {
    try {
      const id = await this.invoke('save_reward_record', { record })
      return { success: true, data: id }
    } catch (error) {
      return { success: false, error: error.message }
    }
  }

  /**
   * 获取奖励记录列表
   */
  static async getRewardRecords(limit, offset) {
    try {
      const records = await this.invoke('get_reward_records', { limit, offset })
      return { success: true, data: records }
    } catch (error) {
      return { success: false, error: error.message }
    }
  }

  /**
   * 计算总收益
   */
  static async calculateTotalEarnings() {
    try {
      const stats = await this.invoke('calculate_total_earnings')
      return { success: true, data: stats }
    } catch (error) {
      return { success: false, error: error.message }
    }
  }

  /**
   * 备份数据库
   */
  static async backupDatabase(backupPath) {
    try {
      const path = await this.invoke('backup_database', { backupPath })
      await this.sendNotification('备份成功', `数据库已备份到：${path}`)
      return { success: true, path }
    } catch (error) {
      return { success: false, error: error.message }
    }
  }

  /**
   * 清空所有数据
   */
  static async clearAllData() {
    try {
      if (this.isTauriApp) {
        const { dialog } = await this.importTauriApi('dialog')
        const confirmed = await dialog.confirm(
          '此操作将删除所有邀请记录和奖励数据，且无法恢复。确定要继续吗？',
          { title: '确认清空数据', type: 'warning' }
        )
        
        if (!confirmed) {
          return { success: false, error: '用户取消操作' }
        }
      }
      
      await this.invoke('clear_all_data')
      await this.sendNotification('数据清空成功', '所有数据已被清空')
      return { success: true }
    } catch (error) {
      return { success: false, error: error.message }
    }
  }

  /**
   * 获取应用配置
   */
  static async getAppConfig() {
    try {
      const config = await this.invoke('get_app_config')
      return { success: true, data: config }
    } catch (error) {
      return { success: false, error: error.message }
    }
  }

  /**
   * 保存应用配置
   */
  static async saveAppConfig(config) {
    try {
      await this.invoke('save_app_config', { config })
      return { success: true }
    } catch (error) {
      return { success: false, error: error.message }
    }
  }

  /**
   * 重置应用配置
   */
  static async resetAppConfig() {
    try {
      const config = await this.invoke('reset_app_config')
      return { success: true, data: config }
    } catch (error) {
      return { success: false, error: error.message }
    }
  }

  /**
   * 便捷方法：复制邀请链接
   */
  static async copyInviteLink(link) {
    const result = await this.copyToClipboard(link)
    if (result.success) {
      await this.sendNotification('复制成功', '邀请链接已复制到剪贴板')
    }
    return result
  }

  /**
   * 便捷方法：快速备份
   */
  static async quickBackup() {
    const now = new Date()
    const filename = `邀请数据备份_${now.getFullYear()}${String(now.getMonth() + 1).padStart(2, '0')}${String(now.getDate()).padStart(2, '0')}_${String(now.getHours()).padStart(2, '0')}${String(now.getMinutes()).padStart(2, '0')}.db`
    return await this.backupDatabase(filename)
  }

  /**
   * 显示错误对话框
   */
  static async showErrorDialog(title, message) {
    try {
      if (this.isTauriApp) {
        const { dialog } = await this.importTauriApi('dialog')
        await dialog.message(message, { title, type: 'error' })
      } else {
        alert(`${title}: ${message}`)
      }
    } catch (error) {
      console.error('显示错误对话框失败:', error)
    }
  }

  /**
   * 显示信息对话框
   */
  static async showInfoDialog(title, message) {
    try {
      if (this.isTauriApp) {
        const { dialog } = await this.importTauriApi('dialog')
        await dialog.message(message, { title, type: 'info' })
      } else {
        alert(`${title}: ${message}`)
      }
    } catch (error) {
      console.error('显示信息对话框失败:', error)
    }
  }

  /**
   * 显示确认对话框
   */
  static async showConfirmDialog(title, message) {
    try {
      if (this.isTauriApp) {
        const { dialog } = await this.importTauriApi('dialog')
        return await dialog.confirm(message, { title, type: 'warning' })
      } else {
        return confirm(`${title}: ${message}`)
      }
    } catch (error) {
      console.error('显示确认对话框失败:', error)
      return false
    }
  }
}

// 导出便捷别名
export const TauriAPI = TauriApiService

// 默认导出
export default TauriApiService