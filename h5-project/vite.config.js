import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'

// https://vite.dev/config/
export default defineConfig({
    plugins: [vue()],

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
          @import "@/assets/styles/variables.scss";
          @import "@/assets/styles/mixins.scss";
        `
            }
        }
    },

    // 开发服务器配置
    server: {
        host: '0.0.0.0',
        port: 3000,
        open: true,
        proxy: {
            '/api': {
                target: 'http://localhost:8080',
                changeOrigin: true,
                rewrite: (path) => path.replace(/^\/api/, '')
            }
        }
    },

    // 构建配置
    build: {
        outDir: 'dist',
        assetsDir: 'assets',
        sourcemap: false,
        minify: 'terser',
        rollupOptions: {
            output: {
                chunkFileNames: 'js/[name]-[hash].js',
                entryFileNames: 'js/[name]-[hash].js',
                assetFileNames: 'assets/[name]-[hash].[ext]'
            }
        }
    }
})