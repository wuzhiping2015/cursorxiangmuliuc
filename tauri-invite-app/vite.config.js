import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'

// https://vitejs.dev/config/
export default defineConfig(async () => ({
  plugins: [vue()],

  // Vite 选项根据 tauri.conf.json 中的 devPath 和 distDir 进行调整
  clearScreen: false,
  
  // Tauri 在开发模式下期望一个固定端口，如果端口不可用则失败
  server: {
    port: 1420,
    strictPort: true,
    watch: {
      // 3. 告诉 vite 忽略监视 `src-tauri`
      ignored: ["**/src-tauri/**"],
    },
  },

  // 路径别名配置
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
      '@components': resolve(__dirname, 'src/components'),
      '@views': resolve(__dirname, 'src/views'),
      '@utils': resolve(__dirname, 'src/utils'),
      '@stores': resolve(__dirname, 'src/stores'),
      '@assets': resolve(__dirname, 'src/assets')
    }
  },

  // CSS 预处理器配置
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `
          @use "@/assets/styles/variables.scss" as *;
          @use "@/assets/styles/mixins.scss" as *;
        `
      }
    }
  },

  // 构建配置
  build: {
    // Tauri 支持 es2021
    target: process.env.TAURI_PLATFORM == 'windows' ? 'chrome105' : 'safari13',
    
    // 为了 Tauri 不压缩代码，默认值是 "esbuild"
    minify: !process.env.TAURI_DEBUG ? 'esbuild' : false,
    
    // 为调试构建生成 sourcemap
    sourcemap: !!process.env.TAURI_DEBUG,
    
    // 输出目录
    outDir: 'dist',
    
    // 资源处理
    assetsDir: 'assets',
    
    // 代码分割
    rollupOptions: {
      output: {
        chunkFileNames: 'assets/js/[name]-[hash].js',
        entryFileNames: 'assets/js/[name]-[hash].js',
        assetFileNames: 'assets/[ext]/[name]-[hash].[ext]'
      }
    }
  },

  // 环境变量前缀
  envPrefix: ['VITE_', 'TAURI_'],
}))