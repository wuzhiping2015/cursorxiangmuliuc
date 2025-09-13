/**
 * PostCSS 配置文件
 * 处理 Tailwind CSS 和其他 CSS 预处理
 */
module.exports = {
  plugins: {
    // Tailwind CSS 支持
    tailwindcss: {},
    
    // 自动添加浏览器前缀
    autoprefixer: {},
    
    // CSS 纳米优化
    ...(process.env.NODE_ENV === 'production' ? {
      cssnano: {
        preset: ['default', {
          // 保留重要的选择器
          discardComments: {
            removeAll: true,
          },
          // 不压缩类选择器以保留 !important 修饰符
          mergeRules: false,
        }]
      }
    } : {})
  }
}