<template>
  <div class="settings-page">
    <!-- 页面头部 -->
    <div class="page-header">
      <button class="back-btn" @click="goBack">←</button>
      <h1 class="page-title">应用设置</h1>
      <div class="header-placeholder"></div>
    </div>

    <!-- 设置内容 -->
    <div class="settings-content">
      <!-- 通用设置 -->
      <div class="settings-section">
        <h3 class="section-title">通用设置</h3>
        <div class="settings-list">
          <div class="setting-item">
            <div class="setting-info">
              <div class="setting-label">开机自启动</div>
              <div class="setting-desc">开机时自动启动应用</div>
            </div>
            <div class="setting-control">
              <label class="switch">
                <input 
                  type="checkbox" 
                  v-model="config.autoStart"
                  @change="handleSettingChange"
                />
                <span class="switch-slider"></span>
              </label>
            </div>
          </div>

          <div class="setting-item">
            <div class="setting-info">
              <div class="setting-label">最小化到系统托盘</div>
              <div class="setting-desc">关闭窗口时最小化到托盘而不是退出</div>
            </div>
            <div class="setting-control">
              <label class="switch">
                <input 
                  type="checkbox" 
                  v-model="config.minimizeToTray"
                  @change="handleSettingChange"
                />
                <span class="switch-slider"></span>
              </label>
            </div>
          </div>

          <div class="setting-item">
            <div class="setting-info">
              <div class="setting-label">桌面通知</div>
              <div class="setting-desc">启用系统通知提醒</div>
            </div>
            <div class="setting-control">
              <label class="switch">
                <input 
                  type="checkbox" 
                  v-model="config.notificationEnabled"
                  @change="handleSettingChange"
                />
                <span class="switch-slider"></span>
              </label>
            </div>
          </div>
        </div>
      </div>

      <!-- 外观设置 -->
      <div class="settings-section">
        <h3 class="section-title">外观设置</h3>
        <div class="settings-list">
          <div class="setting-item">
            <div class="setting-info">
              <div class="setting-label">主题</div>
              <div class="setting-desc">选择应用主题</div>
            </div>
            <div class="setting-control">
              <select v-model="config.theme" @change="handleSettingChange" class="theme-select">
                <option value="light">浅色主题</option>
                <option value="dark">深色主题</option>
                <option value="auto">跟随系统</option>
              </select>
            </div>
          </div>

          <div class="setting-item">
            <div class="setting-info">
              <div class="setting-label">语言</div>
              <div class="setting-desc">选择界面语言</div>
            </div>
            <div class="setting-control">
              <select v-model="config.language" @change="handleSettingChange" class="language-select">
                <option value="zh-CN">简体中文</option>
                <option value="en-US">English</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      <!-- 数据设置 -->
      <div class="settings-section">
        <h3 class="section-title">数据管理</h3>
        <div class="settings-list">
          <div class="setting-item">
            <div class="setting-info">
              <div class="setting-label">自动备份</div>
              <div class="setting-desc">定期自动备份数据</div>
            </div>
            <div class="setting-control">
              <label class="switch">
                <input 
                  type="checkbox" 
                  v-model="config.autoBackup"
                  @change="handleSettingChange"
                />
                <span class="switch-slider"></span>
              </label>
            </div>
          </div>

          <div class="setting-item">
            <div class="setting-info">
              <div class="setting-label">备份间隔</div>
              <div class="setting-desc">自动备份的时间间隔</div>
            </div>
            <div class="setting-control">
              <select v-model="config.backupIntervalDays" @change="handleSettingChange" class="interval-select">
                <option :value="1">每天</option>
                <option :value="3">每3天</option>
                <option :value="7">每周</option>
                <option :value="30">每月</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      <!-- 操作按钮 -->
      <div class="settings-actions">
        <button class="action-btn primary" @click="handleBackup">
          <span class="btn-icon">💾</span>
          <span class="btn-text">立即备份</span>
        </button>
        
        <button class="action-btn secondary" @click="handleExportData">
          <span class="btn-icon">📤</span>
          <span class="btn-text">导出数据</span>
        </button>
        
        <button class="action-btn warning" @click="handleClearData">
          <span class="btn-icon">🗑️</span>
          <span class="btn-text">清空数据</span>
        </button>
        
        <button class="action-btn default" @click="handleResetSettings">
          <span class="btn-icon">🔄</span>
          <span class="btn-text">恢复默认</span>
        </button>
      </div>

      <!-- 应用信息 -->
      <div class="settings-section">
        <h3 class="section-title">应用信息</h3>
        <div class="app-info">
          <div class="info-item">
            <span class="info-label">版本号：</span>
            <span class="info-value">v1.0.0</span>
          </div>
          <div class="info-item">
            <span class="info-label">构建时间：</span>
            <span class="info-value">{{ buildTime }}</span>
          </div>
          <div class="info-item">
            <span class="info-label">系统平台：</span>
            <span class="info-value">{{ systemInfo.platform }}</span>
          </div>
          <div class="info-item">
            <span class="info-label">系统架构：</span>
            <span class="info-value">{{ systemInfo.arch }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
/**
 * 应用设置页面
 * 桌面版应用的设置和配置管理
 * @author 前端工程师团队
 * @date 2024-12-XX
 */
import { ref, reactive, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { TauriApiService } from '@/utils/tauri-api'
import { showSuccess, showError } from '@/utils/toast'

// 路由
const router = useRouter()

// 响应式数据
const config = reactive({
  autoStart: false,
  minimizeToTray: true,
  notificationEnabled: true,
  autoBackup: true,
  backupIntervalDays: 7,
  theme: 'light',
  language: 'zh-CN'
})

const systemInfo = reactive({
  platform: '',
  arch: '',
  version: '',
  hostname: ''
})

const buildTime = ref('2024-12-25 10:00:00')

/**
 * 加载应用配置
 */
const loadAppConfig = async () => {
  try {
    const result = await TauriApiService.getAppConfig()
    if (result.success) {
      Object.assign(config, result.data)
    }
  } catch (error) {
    console.error('加载应用配置失败:', error)
  }
}

/**
 * 保存配置变更
 */
const handleSettingChange = async () => {
  try {
    const result = await TauriApiService.saveAppConfig(config)
    if (result.success) {
      showSuccess('设置已保存')
      
      // 应用主题变更
      if (config.theme === 'dark') {
        document.body.classList.add('dark-theme')
      } else {
        document.body.classList.remove('dark-theme')
      }
    } else {
      showError('保存设置失败')
    }
  } catch (error) {
    showError(`保存失败: ${error.message}`)
  }
}

/**
 * 立即备份
 */
const handleBackup = async () => {
  try {
    const result = await TauriApiService.quickBackup()
    if (result.success) {
      showSuccess(`备份已完成：${result.path}`)
    } else {
      showError('备份失败')
    }
  } catch (error) {
    showError(`备份失败: ${error.message}`)
  }
}

/**
 * 导出数据
 */
const handleExportData = async () => {
  try {
    // 获取所有邀请记录
    const inviteResult = await TauriApiService.getInviteRecords()
    const rewardResult = await TauriApiService.getRewardRecords()
    
    if (inviteResult.success && rewardResult.success) {
      const exportData = {
        invites: inviteResult.data,
        rewards: rewardResult.data,
        exportTime: new Date().toISOString(),
        version: '1.0.0'
      }
      
      const jsonString = JSON.stringify(exportData, null, 2)
      const filename = `邀请数据导出_${new Date().toISOString().slice(0, 10)}.json`
      
      const result = await TauriApiService.saveFileToDesktop(jsonString, filename)
      if (result.success) {
        showSuccess(`数据已导出：${filename}`)
      }
    }
  } catch (error) {
    showError(`导出失败: ${error.message}`)
  }
}

/**
 * 清空数据
 */
const handleClearData = async () => {
  try {
    const confirmed = await TauriApiService.showConfirmDialog(
      '确认清空数据',
      '此操作将永久删除所有邀请记录和奖励数据，且无法恢复。确定要继续吗？'
    )
    
    if (confirmed) {
      const result = await TauriApiService.clearAllData()
      if (result.success) {
        showSuccess('数据已清空')
      } else {
        showError('清空数据失败')
      }
    }
  } catch (error) {
    showError(`操作失败: ${error.message}`)
  }
}

/**
 * 恢复默认设置
 */
const handleResetSettings = async () => {
  try {
    const confirmed = await TauriApiService.showConfirmDialog(
      '确认重置设置',
      '此操作将恢复所有设置为默认值，确定要继续吗？'
    )
    
    if (confirmed) {
      const result = await TauriApiService.resetAppConfig()
      if (result.success) {
        Object.assign(config, result.data)
        showSuccess('设置已重置为默认值')
      } else {
        showError('重置设置失败')
      }
    }
  } catch (error) {
    showError(`重置失败: ${error.message}`)
  }
}

/**
 * 加载系统信息
 */
const loadSystemInfo = async () => {
  try {
    const result = await TauriApiService.getSystemInfo()
    if (result.success) {
      Object.assign(systemInfo, result.data)
    }
  } catch (error) {
    console.error('获取系统信息失败:', error)
  }
}

/**
 * 返回上一页
 */
const goBack = () => {
  router.back()
}

// 生命周期
onMounted(async () => {
  console.log('⚙️ 设置页面初始化')
  await loadAppConfig()
  await loadSystemInfo()
})
</script>

<style lang="scss" scoped>
@use "@/assets/styles/variables.scss" as *;
@use "@/assets/styles/mixins.scss" as *;

.settings-page {
  min-height: 100vh;
  background-color: $background-color-light;
}

// 页面头部
.page-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: $spacing-base;
  background-color: $background-color;
  border-bottom: 1px solid $border-color-light;
  
  .back-btn {
    width: 40px;
    height: 40px;
    border: none;
    background: none;
    font-size: $font-size-xl;
    color: $text-color-primary;
    cursor: pointer;
    @include transition(color);
    
    &:hover {
      color: $primary-color;
    }
  }
  
  .page-title {
    font-size: $font-size-lg;
    font-weight: $font-weight-medium;
    color: $text-color-primary;
  }
  
  .header-placeholder {
    width: 40px;
  }
}

// 设置内容
.settings-content {
  padding: $spacing-base;
}

.settings-section {
  margin-bottom: $spacing-xl;
  
  .section-title {
    font-size: $font-size-lg;
    font-weight: $font-weight-medium;
    color: $text-color-primary;
    margin-bottom: $spacing-base;
    padding-left: $spacing-sm;
    border-left: 3px solid $primary-color;
  }
}

.settings-list {
  background-color: $background-color;
  border-radius: $border-radius-lg;
  overflow: hidden;
  box-shadow: $box-shadow-base;
}

.setting-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: $spacing-base $spacing-lg;
  border-bottom: 1px solid $border-color-light;
  
  &:last-child {
    border-bottom: none;
  }
  
  .setting-info {
    .setting-label {
      font-size: $font-size-base;
      font-weight: $font-weight-medium;
      color: $text-color-primary;
      margin-bottom: $spacing-xs;
    }
    
    .setting-desc {
      font-size: $font-size-sm;
      color: $text-color-secondary;
    }
  }
  
  .setting-control {
    select {
      padding: $spacing-xs $spacing-sm;
      border: 1px solid $border-color;
      border-radius: $border-radius-base;
      background-color: $background-color;
      color: $text-color-primary;
      font-size: $font-size-sm;
      outline: none;
      
      &:focus {
        border-color: $primary-color;
      }
    }
  }
}

// 开关样式
.switch {
  position: relative;
  display: inline-block;
  width: 48px;
  height: 24px;
  
  input {
    opacity: 0;
    width: 0;
    height: 0;
    
    &:checked + .switch-slider {
      background-color: $primary-color;
      
      &:before {
        transform: translateX(24px);
      }
    }
  }
  
  .switch-slider {
    position: absolute;
    cursor: pointer;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: $border-color;
    @include transition(background-color);
    border-radius: 24px;
    
    &:before {
      position: absolute;
      content: "";
      height: 20px;
      width: 20px;
      left: 2px;
      bottom: 2px;
      background-color: white;
      @include transition(transform);
      border-radius: 50%;
    }
  }
}

// 操作按钮
.settings-actions {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: $spacing-base;
  margin: $spacing-xl 0;
  
  .action-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: $spacing-xs;
    padding: $spacing-base;
    border: none;
    border-radius: $border-radius-lg;
    font-size: $font-size-base;
    font-weight: $font-weight-medium;
    cursor: pointer;
    @include transition(all);
    
    &.primary {
      background-color: $primary-color;
      color: white;
      
      &:hover {
        background-color: $primary-dark;
      }
    }
    
    &.secondary {
      background-color: $info-color;
      color: white;
      
      &:hover {
        background-color: #1677ff;
      }
    }
    
    &.warning {
      background-color: $error-color;
      color: white;
      
      &:hover {
        background-color: #d32f2f;
      }
    }
    
    &.default {
      background-color: $background-color;
      color: $text-color-primary;
      border: 1px solid $border-color;
      
      &:hover {
        border-color: $primary-color;
        color: $primary-color;
      }
    }
    
    .btn-icon {
      font-size: $font-size-lg;
    }
  }
}

// 应用信息
.app-info {
  background-color: $background-color;
  border-radius: $border-radius-lg;
  padding: $spacing-lg;
  box-shadow: $box-shadow-base;
  
  .info-item {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: $spacing-sm;
    
    &:last-child {
      margin-bottom: 0;
    }
    
    .info-label {
      font-size: $font-size-sm;
      color: $text-color-secondary;
    }
    
    .info-value {
      font-size: $font-size-sm;
      color: $text-color-primary;
      font-weight: $font-weight-medium;
    }
  }
}

// 响应式适配
@include respond-to(xs) {
  .settings-actions {
    grid-template-columns: 1fr;
    gap: $spacing-sm;
  }
  
  .setting-item {
    flex-direction: column;
    align-items: flex-start;
    gap: $spacing-sm;
  }
}
</style>