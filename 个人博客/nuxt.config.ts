/**
 * Nuxt 3 配置文件
 * AI驱动的前端工程师个人博客
 */
export default defineNuxtConfig({
  // 开发工具
  devtools: { enabled: true },
  
  // 开发服务器配置
  devServer: {
    port: 3001,
    host: 'localhost'
  },
  
  // TypeScript 配置
  typescript: {
    typeCheck: true
  },

  // CSS 框架配置
  css: [
    'primeicons/primeicons.css',
    '~/assets/css/main.css'
  ],

  // Components aвто-импорт конфигурация
  components: [
    {
      path: '~/components',
      pathPrefix: false,
    },
  ],

  // 模块配置
  modules: [
    // UI 组件库
    '@primevue/nuxt-module',
    
    // CSS 框架
    '@nuxtjs/tailwindcss',
    
    // 内容管理
    '@nuxt/content',
    
    // 图片优化
    '@nuxt/image',
    
    // 状态管理
    '@pinia/nuxt',
    
    // 工具库
    '@vueuse/nuxt',
    
    // 代码规范
    '@nuxt/eslint',

    // 颜色模式
    '@nuxtjs/color-mode',

    // JSON-LD SEO
    'nuxt-jsonld'
  ],

  // PrimeVue 配置
  primevue: {
    usePrimeVue: true,
    options: {
      theme: 'aura-light-blue'
    },
    components: {
      include: [
        'Button',
        'Card',
        'Menu',
        'Menubar',
        'InputText',
        'Textarea',
        'Dialog',
        'Toast',
        'ProgressSpinner',
        'Chip',
        'Tag',
        'Badge',
        'Avatar',
        'Divider',
        'ScrollTop',
        'Skeleton'
      ]
    }
  },

  // Tailwind CSS 配置
  tailwindcss: {
    cssPath: '~/assets/css/tailwind.css',
    configPath: 'tailwind.config.js'
  },


  // 内容模块配置
  content: {
    // 文档驱动模式
    documentDriven: false,
    
    // Markdown 配置
    markdown: {
      // 目录生成
      toc: {
        depth: 3,
        searchDepth: 3
      }
    },
    
    // 高亮配置
    highlight: {
      theme: {
        default: 'github-light',
        dark: 'github-dark'
      }
    }
  },

  // 图片模块配置  
  image: {
    // 图片优化
    format: ['webp', 'avif'],
    // 质量设置
    quality: 80,
    // 响应式图片
    screens: {
      xs: 320,
      sm: 640,
      md: 768,
      lg: 1024,
      xl: 1280,
      xxl: 1536
    }
  },

  // 应用配置
  app: {
    // 页面标题
    head: {
      title: 'AI Frontend Engineer - 将AI融入前端开发工作流',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { 
          name: 'description', 
          content: '分享AI驱动的前端开发实践，308+精选AI工具，提升开发效率的最佳实践' 
        },
        { 
          name: 'keywords', 
          content: 'AI工具,前端开发,开发效率,Vue3,Nuxt3,个人博客,工作流优化' 
        },
        { name: 'author', content: 'Frontend AI Engineer' },
        
        // Open Graph
        { property: 'og:title', content: 'AI Frontend Engineer Blog' },
        { property: 'og:description', content: '将AI融入前端开发工作流，提升开发效率' },
        { property: 'og:type', content: 'website' },
        { property: 'og:image', content: '/og-image.png' },
        
        // Twitter Card
        { name: 'twitter:card', content: 'summary_large_image' },
        { name: 'twitter:title', content: 'AI Frontend Engineer Blog' },
        { name: 'twitter:description', content: '将AI融入前端开发工作流，提升开发效率' },
        { name: 'twitter:image', content: '/twitter-image.png' }
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
        { rel: 'apple-touch-icon', href: '/apple-touch-icon.png' }
      ]
    }
  },

  // 路由配置
  router: {
    options: {
      scrollBehaviorType: 'smooth'
    }
  },

  // 运行时配置
  runtimeConfig: {
    // 私有配置（仅服务端）
    apiSecret: process.env.API_SECRET,
    
    // 公共配置（客户端可访问）
    public: {
      apiBase: process.env.API_BASE || '/api',
      siteUrl: process.env.SITE_URL || 'http://localhost:3000',
      gtag: process.env.GTAG_ID
    }
  },

  // 构建配置
  build: {
    transpile: ['primevue']
  },

  // Vite 配置
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: '@use "~/assets/scss/variables.scss" as *;'
        }
      }
    }
  },

  // 生成配置（静态站点）
  nitro: {
    prerender: {
      routes: ['/sitemap.xml', '/robots.txt']
    }
  },

  // 实验性功能
  experimental: {
    // 视图过渡
    viewTransition: true,
    // 类型化页面
    typedPages: true
  },

  // 兼容性
  compatibilityDate: '2024-11-01'
})
