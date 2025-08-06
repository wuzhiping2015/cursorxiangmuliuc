module.exports = {
    root: true,
    env: {
        browser: true,
        es2021: true,
        node: true
    },
    extends: [
        'eslint:recommended',
        'plugin:vue/vue3-essential',
        'plugin:prettier/recommended'
    ],
    parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module'
    },
    plugins: ['vue', 'prettier'],
    rules: {
        "no-unused-expressions": "off",
        "no-unused-vars": "off",
        "@typescript-eslint/no-unused-vars": "off",
        "no-unsafe-optional-chaining": "off",
        "space-unary-ops": ["error", { "words": true, "nonwords": false }],
        'prettier/prettier': ['error', {
            // 这里的规则会覆盖 .prettierrc.js
            singleQuote: true,
            semi: false,
            tabWidth: 2,
            trailingComma: 'es5',
            endOfLine: 'auto',
            // 禁止可选链操作符周围的空格
            'operator-linebreak': ['error', 'before'],
            'no-whitespace-before-property': 'error'
        }],

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
        'no-var': 'error',

        // 运算符相关规则
        'space-infix-ops': 'error',
        'space-unary-ops': 'error',
        'no-whitespace-before-property': 'error',

        // 可选链操作符规则
        'no-extra-parens': ['error', 'all', {
            nestedBinaryExpressions: false,
            enforceForNewInMemberExpressions: false,
            enforceForFunctionPrototypeMethods: false
        }]
    },
    ignorePatterns: [
        'dist',
        'node_modules',
        '*.min.js',
        'public'
    ]
};