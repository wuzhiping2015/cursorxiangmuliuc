<template>
  <div class="layout-container">
    <!-- 顶部信息栏 -->
    <div class="header">
      <div class="logo">群发系统</div>
      <div class="user-info">
        <el-dropdown trigger="click" @command="handleCommand">
          <span class="el-dropdown-link">
            {{ authStore.user?.username }}
            <el-icon class="el-icon--right"><arrow-down /></el-icon>
          </span>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item command="logout">退出登录</el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </div>
    </div>

    <div class="main-container">
      <!-- 左侧导航 -->
      <el-menu
        :router="true"
        :default-active="route.path"
        class="side-menu"
        background-color="#001529"
        text-color="#fff"
        active-text-color="#409EFF"
      >
        <el-menu-item index="/messages">
          <el-icon><message /></el-icon>
          <span>消息管理</span>
        </el-menu-item>
        <el-menu-item index="/users">
          <el-icon><user /></el-icon>
          <span>用户管理</span>
        </el-menu-item>
        <el-menu-item index="/records">
          <el-icon><document /></el-icon>
          <span>发送记录</span>
        </el-menu-item>
      </el-menu>

      <!-- 右侧内容区 -->
      <div class="content-container">
        <div class="content-wrapper">
          <router-view></router-view>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.layout-container {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background-color: #f5f7fa;
}

.header {
  height: 60px;
  background-color: #fff;
  border-bottom: 1px solid #dcdfe6;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 20px;
  box-shadow: 0 1px 4px rgba(0,21,41,.08);
}

.logo {
  font-size: 20px;
  font-weight: bold;
  color: #409eff;
}

.user-info {
  cursor: pointer;
}

.el-dropdown-link {
  display: flex;
  align-items: center;
  color: #606266;
}

.main-container {
  flex: 1;
  display: flex;
}

.side-menu {
  width: 200px;
  height: calc(100vh - 60px);
  border-right: none;
  box-shadow: 2px 0 6px rgba(0,21,41,.05);
}

.side-menu .el-menu-item {
  height: 50px;
  line-height: 50px;
  padding: 0 20px !important;
}

.side-menu .el-menu-item.is-active {
  background-color: #1890ff !important;
}

.side-menu .el-menu-item:hover {
  background-color: #1890ff !important;
  color: #fff !important;
}

.side-menu .el-icon {
  font-size: 18px;
  margin-right: 10px;
}

.content-container {
  flex: 1;
  padding: 20px;
  overflow-y: auto;
}

.content-wrapper {
  background-color: #fff;
  border-radius: 4px;
  padding: 20px;
  min-height: calc(100vh - 140px);
  box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);
}
</style>

<script setup>
import { useRoute } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import { ArrowDown, Message, User, Document } from '@element-plus/icons-vue'

const route = useRoute()
const authStore = useAuthStore()

const handleCommand = (command) => {
  if (command === 'logout') {
    authStore.logout()
  }
}
</script> 