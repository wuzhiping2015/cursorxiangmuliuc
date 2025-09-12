# 路由技术文档（Router Tech Guide）

> 面向新加入（含 AI 程序员）的技术资料，帮助快速理解并正确开发/排错与迭代本项目的路由体系，保证 100% 正确交付。

---

## 1. 路由总体设计

- **路由器创建**：使用 `vue-router@4`，在 `hash` 模式下运行。
- **基础路由**：`basicRoutes` 包含登录、根路由、重定向、404 等静态路由。
- **异步路由**：通过 `import.meta.glob` 急切导入 `./modules/**/*.ts`，聚合为 `asyncRoutes`。
- **动态组件映射**：后端/菜单返回的 `component` 字符串由 `routeHelper.ts` 动态映射到 `src/views` 下的真实组件文件。
- **路由守卫**：统一在 `src/router/guard/index.ts` 中注册，顺序严格，负责加载态、取消请求、回到顶部、消息收拢、进度条、权限与参数菜单等。

---

## 2. 关键入口与聚合

- 路由器创建（节选）：
```1:26:src/router/index.ts
// app router
export const router = createRouter({
  history: createWebHashHistory(import.meta.env.VITE_PUBLIC_PATH),
  routes: basicRoutes as unknown as RouteRecordRaw[],
  strict: true,
  scrollBehavior: () => ({ left: 0, top: 0 }),
});
```

- 异步路由聚合：
```1:20:src/router/routes/index.ts
// import.meta.glob() 直接引入所有的模块
const modules = import.meta.glob('./modules/**/*.ts', { eager: true });
const routeModuleList: AppRouteModule[] = [];
Object.keys(modules).forEach((key) => {
  const mod = (modules as Recordable)[key].default || {};
  const modList = Array.isArray(mod) ? [...mod] : [mod];
  routeModuleList.push(...modList);
});
export const asyncRoutes = [PAGE_NOT_FOUND_ROUTE, ...routeModuleList];
```

---

## 3. 动态组件映射（后端菜单 → 真实视图）

- 动态导入入口与匹配逻辑：
```1:41:src/router/helper/routeHelper.ts
function asyncImportRoute(routes: AppRouteRecordRaw[] | undefined) {
  dynamicViewsModules = dynamicViewsModules || import.meta.glob('../../views/**/*.{vue,tsx}');
  // 遍历每个路由项，将 component 字符串映射为真实组件或布局
  // 'LAYOUT' → 布局组件；其他字符串 → dynamicImport 映射到 src/views
}

function dynamicImport(dynamicViewsModules, component: string) {
  const keys = Object.keys(dynamicViewsModules);
  const matchKeys = keys.filter((key) => {
    const k = key.replace('../../views', '');
    const startFlag = component.startsWith('/');
    const endFlag = component.endsWith('.vue') || component.endsWith('.tsx');
    const startIndex = startFlag ? 0 : 1;
    const lastIndex = endFlag ? k.length : k.lastIndexOf('.');
    return k.substring(startIndex, lastIndex) === component;
  });
  // 命中 1 个文件时返回对应模块；未命中则警告并返回异常组件
}
```

- 使用方式：后端/Mock 菜单返回的 `component` 形如：`/fuadmin/system/menu/index`，将被解析并加载 `src/views/fuadmin/system/menu/index.vue`。

---

## 4. 菜单与权限模式

- 菜单来源与模式判断：
```1:41:src/router/menus/index.ts
const modules = import.meta.glob('./modules/**/*.ts', { eager: true });
// 根据 PermissionModeEnum 切换：
// - BACK: 后端返回菜单
// - ROUTE_MAPPING: 路由映射生成菜单
// - ROLE: 角色模式（从已注册路由中过滤）
```

- 基础过滤逻辑：
```115:136:src/router/menus/index.ts
function basicFilter(routes: RouteRecordNormalized[]) {
  return (menu: Menu) => {
    const matchRoute = routes.find((route) => {
      if (isUrl(menu.path)) return true;
      if (route.meta?.carryParam) {
        return pathToRegexp(route.path).test(menu.path);
      }
      const isSame = route.path === menu.path;
      if (!isSame) return false;
      if (route.meta?.ignoreAuth) return true;
      return isSame || pathToRegexp(route.path).test(menu.path);
    });
    if (!matchRoute) return false;
    menu.icon = (menu.icon || matchRoute.meta.icon) as string;
    menu.meta = matchRoute.meta;
    return true;
  };
}
```

---

## 5. 路由守卫（注册顺序与职责）

- 注册顺序（必须保持）：
```16:27:src/router/guard/index.ts
export function setupRouterGuard(router: Router) {
  createPageGuard(router);          // 页面已加载标记 & 路由变更事件
  createPageLoadingGuard(router);   // 页面 Loading 状态
  createHttpGuard(router);          // 路由切换取消未完成请求
  createScrollGuard(router);        // 切换后滚动到顶部
  createMessageGuard(router);       // 切换时关闭消息实例
  createProgressGuard(router);      // NProgress 进度条
  createPermissionGuard(router);    // 权限与动态路由构建
  createParamMenuGuard(router);     // 参数菜单（依赖已构建的菜单）
  createStateGuard(router);         // 页面状态（如标签页状态等）
}
```

- 关键守卫要点：
  - `createPermissionGuard`：从后端/本地构建动态路由，注入 `asyncRoutes`；处理登录与权限跳转。
  - `createParamMenuGuard`：基于参数匹配菜单（需在权限守卫之后）。
  - `createHttpGuard`：切换路由时取消未完成的 Axios 请求，防止脏数据污染。
  - `createProgressGuard`：基于设置控制进度条显示，避免闪烁并提升用户感知。

---

## 6. 常见路径与示例

- `#/system/menu` → 对应组件：`src/views/fuadmin/system/menu/index.vue`
  - 确保后端返回菜单项：`{ path: 'menu', component: '/fuadmin/system/menu/index', ... }`
  - 若返回为 `/demo/system/menu/index` 将会尝试加载 `src/views/demo/system/menu/index.vue`（如不存在则触发异常组件）

- 其他常见：`#/dashboard/analysis`、`#/dashboard/workbench`、`#/system/role` 等，均遵循相同映射规则。

---

## 7. 新增路由/页面指引

1. 新建页面：`src/views/<module>/<page>/index.vue`
2. 若属于后端动态菜单：在后端返回 `component: '/<module>/<page>/index'`
3. 若属于前端静态模块：在 `src/router/routes/modules/` 新增对应模块路由文件，并导出默认路由配置
4. 页面命名与目录层级应与 `component` 字符串严格一致，避免动态映射失败

---

## 8. 调试与排错

- 路由未命中 404：
  - 检查 `component` 字符串是否与 `src/views` 下的真实相对路径一致（前缀必须是 `/`，后缀省略 `.vue`）。
  - 检查是否与 `.tsx` 同名同层级并存，导致动态导入歧义。

- 权限无法进入：
  - 确认 Token、用户权限与返回菜单是否包含目标路径；查看 `createPermissionGuard` 日志。

- 进度条/消息未关闭：
  - 检查 `projectSetting` 中开关项及守卫注册顺序。

---

## 9. 对接规范（后端返回菜单）

- 核心字段建议：`path`, `name`, `component`, `meta`, `children`
- `component`：
  - `LAYOUT`：表示顶层布局
  - `IFRAME`：内嵌页面（配合 `meta.frameSrc`）
  - `/<folder>/<sub>/<page>/index`：映射到 `src/views/.../index.vue`
- `meta` 建议：`title`, `icon`, `ignoreKeepAlive`, `carryParam`, `hideMenu`, `currentActiveMenu`

---

## 10. 开发自检（Router 篇）

- 路由模块命名是否唯一？路径是否与菜单一致？
- 组件路径是否能被 `dynamicImport` 唯一命中？
- 路由守卫顺序不可变更；新增守卫请在 `setupRouterGuard` 中统一注册。
- 页面需配合 i18n 标题与权限码；`meta` 字段是否完善？

---

## 11. 参考文件清单

- `src/router/index.ts`：路由器创建、reset、setup
- `src/router/routes/index.ts`：静态/异步路由聚合
- `src/router/helper/routeHelper.ts`：动态组件映射、路由扁平化
- `src/router/guard/*.ts`：全量路由守卫
- `src/router/menus/index.ts`：菜单生成与过滤
- `src/views/**`：实际视图文件

---

> 本文档依据当前仓库源码生成，请在框架或依赖升级（如切换到 `history` 模式、改造权限模式）后同步更新。

