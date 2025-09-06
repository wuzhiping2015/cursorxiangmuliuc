<template>
  <div class="login-container">
    <el-card class="login-card">
      <template #header>
        <h2 class="login-title">群发系统</h2>
      </template>

      <el-form
        ref="formRef"
        :model="form"
        :rules="rules"
        label-width="0"
        @keyup.enter="handleLogin"
      >
        <el-form-item prop="username">
          <el-input
            v-model="form.username"
            placeholder="用户名"
            prefix-icon="User"
          />
        </el-form-item>

        <el-form-item prop="password">
          <el-input
            v-model="form.password"
            type="password"
            placeholder="密码"
            prefix-icon="Lock"
            show-password
          />
        </el-form-item>

        <div class="tips">默认账户: admin / admin</div>

        <el-form-item>
          <el-button
            type="primary"
            :loading="authStore.loading"
            class="login-button"
            @click="handleLogin"
          >
            登录系统
          </el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<style scoped>
.login-container {
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #f5f7fa;
}

.login-card {
  width: 400px;
  border-radius: 8px;
  box-shadow: 0 2px 12px 0 rgba(0,0,0,0.1);
}

.login-title {
  text-align: center;
  margin: 0;
  color: #409eff;
  font-size: 24px;
}

.tips {
  text-align: center;
  color: #909399;
  font-size: 14px;
  margin: 16px 0;
}

.login-button {
  width: 100%;
  height: 40px;
  font-size: 16px;
  border-radius: 20px;
}

/* 输入框样式优化 */
:deep(.el-input__wrapper) {
  border-radius: 20px;
}

:deep(.el-input__inner) {
  height: 40px;
}
</style>

<script setup>
import { ref, reactive } from "vue";
import { useAuthStore } from "@/stores/auth";

const authStore = useAuthStore();
const formRef = ref(null);

const form = reactive({
  username: "admin", // 预填写默认用户名
  password: "admin", // 预填写默认密码
});

const rules = {
  username: [{ required: true, message: "请输入用户名", trigger: "blur" }],
  password: [{ required: true, message: "请输入密码", trigger: "blur" }],
};

const handleLogin = async () => {
  if (!formRef.value) return;

  try {
    await formRef.value.validate();
    await authStore.login(form.username, form.password);
  } catch (error) {
    // 错误已在 store 中处理
  }
};
</script>
