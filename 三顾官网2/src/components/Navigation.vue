<template>
  <nav class="fixed top-0 left-0 w-full bg-primary z-50">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between items-center h-20">
        <!-- Logo -->
        <div class="flex-shrink-0">
          <router-link to="/" class="flex items-center">
            <img
              src="@/images/logo.png"
              alt="SANGO AI"
              class="h-10 w-auto"
            />
          </router-link>
        </div>

        <!-- 桌面端导航 -->
        <div class="hidden md:flex items-center space-x-8">
          <div v-for="item in navItems" :key="item.path" class="relative group">
            <router-link
              :to="item.path"
              class="text-white hover:text-secondary-light transition-colors duration-200 py-2 flex items-center"
            >
              {{ item.name }}
              <svg
                v-if="item.children"
                class="w-4 h-4 ml-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M19 9l-7 7-7-7" />
              </svg>
            </router-link>
            <!-- 二级菜单 -->
            <div
              v-if="item.children"
              class="absolute left-0 mt-1 w-64 bg-white rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform -translate-y-1 group-hover:translate-y-0"
            >
              <router-link
                v-for="child in item.children"
                :key="child.path"
                :to="child.path"
                class="block px-4 py-3 text-sm text-gray-700 hover:bg-gray-100 hover:text-primary whitespace-nowrap"
              >
                {{ child.name }}
              </router-link>
            </div>
          </div>
        </div>

        <!-- 移动端菜单按钮 -->
        <div class="md:hidden">
          <button
            @click="toggleMenu"
            class="text-white p-2 rounded-md hover:bg-primary-light focus:outline-none"
            aria-label="Toggle menu"
          >
            <svg
              class="h-6 w-6"
              :class="{ hidden: isMenuOpen, block: !isMenuOpen }"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
            <svg
              class="h-6 w-6"
              :class="{ block: isMenuOpen, hidden: !isMenuOpen }"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>

    <!-- 移动端导航菜单 -->
    <div class="md:hidden" :class="{ block: isMenuOpen, hidden: !isMenuOpen }">
      <div class="px-2 pt-2 pb-3 space-y-1 bg-primary-light">
        <div v-for="item in navItems" :key="item.path" class="mb-2">
          <!-- 主菜单项 -->
          <div
            class="flex items-center justify-between px-3 py-2 text-white rounded-md cursor-pointer hover:bg-primary-dark"
            @click="toggleSubmenu(item)"
          >
            <router-link
              :to="item.path"
              class="flex-grow text-white hover:text-secondary-light"
              @click.native="closeMenu"
            >
              {{ item.name }}
            </router-link>
            <svg
              v-if="item.children"
              class="w-4 h-4 ml-2 transform transition-transform duration-200"
              :class="{ 'rotate-180': openSubmenus[item.path] }"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M19 9l-7 7-7-7" />
            </svg>
          </div>
          <!-- 子菜单 -->
          <div
            v-if="item.children"
            class="mt-1 pl-4 space-y-1"
            :class="{ hidden: !openSubmenus[item.path] }"
          >
            <router-link
              v-for="child in item.children"
              :key="child.path"
              :to="child.path"
              class="block px-4 py-2 text-sm text-white hover:bg-primary-dark rounded-md"
              @click.native="closeMenu"
            >
              {{ child.name }}
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { ref, reactive } from "vue";

// 导航项配置
const navItems = [
  { name: "首页", path: "/", 
    children: [
      { name: "Our competitive edge", path: "/competitive-edge" },
      { name: "Our Technologies", path: "/technologies" },
      { name: "Our Products", path: "/products" },
      { name: "Our Latest News", path: "/latest-news" }
    ]
  },
  { 
    name: "产品中心", 
    path: "/solutions",
    children: [
      { name: "Digital Trident System", path: "/solutions/digital-trident" },
      { name: "Smart Trident System", path: "/solutions/smart-trident" },
      { name: "Cyber Trident System", path: "/solutions/cyber-trident" },
      { name: "Central Monitoring System", path: "/solutions/central-monitoring" }
    ]
  },
  { 
    name: "技术优势", 
    path: "/tech-advantage",
    children: [
      { name: "Digital Twin", path: "/tech-advantage/digital-twin" },
      { name: "AI", path: "/tech-advantage/ai" },
      { name: "AIoT", path: "/tech-advantage/aiot" },
      { name: "Big Data", path: "/tech-advantage/big-data" }
    ]
  },
  {
    name: "关于我们", 
    path: "/about",
    children: [
      { name: "Smart Trident System & Digital Trident System - JANA", path: "/about/jana-case" }
    ]
  },
  {
    name: "联系我们", 
    path: "/contact",
    children: [
      { name: "Company Profile", path: "/contact/company-profile" },
      { name: "Team Introduction", path: "/contact/team-intro" },
      { name: "Business partner", path: "/contact/business-partner" },
      { name: "Form Submission", path: "/contact/form" },
      { name: "Partner map", path: "/contact/partner-map" }
    ]
  },
];

// 移动端菜单状态
const isMenuOpen = ref(false);
const openSubmenus = reactive({});

// 切换主菜单
const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value;
};

// 切换子菜单
const toggleSubmenu = (item) => {
  if (item.children) {
    openSubmenus[item.path] = !openSubmenus[item.path];
  }
};

// 关闭菜单
const closeMenu = () => {
  isMenuOpen.value = false;
  // 关闭所有子菜单
  Object.keys(openSubmenus).forEach(key => {
    openSubmenus[key] = false;
  });
};
</script>

<style scoped>
.router-link-active {
  color: theme("colors.secondary.light");
}

@media (max-width: 768px) {
  .router-link-active {
    background-color: theme("colors.primary.dark");
  }
}

/* 确保二级菜单不会被截断 */
.group:hover .absolute {
  z-index: 50;
}
</style> 