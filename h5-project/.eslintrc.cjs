/**
 * ESLint 配置文件
 * 代码质量检查配置
 * @author 前端工程师团队
 * @date 2024-12-XX
 */

module.exports = {
  root: true,
  env: {
    browser: true,
    es2021: true,
    node: true
  },
  extends: [
    'eslint:recommended',
    'plugin:vue/vue3-essential'
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module'
  },
  plugins: ['vue'],
  rules: {
    // Vue 相关规则
    'vue/multi-word-component-names': 'off',
    
    // JavaScript 通用规则
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-unused-vars': ['warn', { 
      argsIgnorePattern: '^_',
      varsIgnorePattern: '^_' 
    }],
    'prefer-const': 'warn',
    'no-var': 'error'
  },
  ignorePatterns: [
    'dist',
    'node_modules',
    '*.min.js',
    'public'
  ]
}