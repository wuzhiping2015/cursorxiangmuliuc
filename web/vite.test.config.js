// 最小的vite配置用于测试
import { defineConfig } from 'vite';

export default defineConfig({
  server: {
    port: 3001,
  },
  logLevel: 'info',
});