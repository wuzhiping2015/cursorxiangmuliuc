/**
 * PostCSS 配置文件
 * CSS 后处理器配置，包含自动前缀和移动端适配
 * @author 前端工程师团队
 * @date 2024-12-XX
 */

export default {
    plugins: {
        autoprefixer: {
            overrideBrowserslist: [
                'Android 4.1',
                'iOS 7.1',
                'Chrome > 31',
                'ff > 31',
                'ie >= 8',
                'last 10 versions'
            ],
            grid: true
        },
    }
}