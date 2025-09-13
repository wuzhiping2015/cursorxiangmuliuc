import { createRenderer, getRequestDependencies, getPreloadLinks, getPrefetchLinks } from 'file://D:/Project/AI%E9%A1%B9%E7%9B%AE/%E4%B8%AA%E4%BA%BA%E5%8D%9A%E5%AE%A2/node_modules/.pnpm/vue-bundle-renderer@2.1.2/node_modules/vue-bundle-renderer/dist/runtime.mjs';
import { getResponseStatusText, getResponseStatus, getQuery, createError, appendResponseHeader } from 'file://D:/Project/AI%E9%A1%B9%E7%9B%AE/%E4%B8%AA%E4%BA%BA%E5%8D%9A%E5%AE%A2/node_modules/.pnpm/h3@1.15.4/node_modules/h3/dist/index.mjs';
import { joinURL, withoutTrailingSlash, hasProtocol } from 'file://D:/Project/AI%E9%A1%B9%E7%9B%AE/%E4%B8%AA%E4%BA%BA%E5%8D%9A%E5%AE%A2/node_modules/.pnpm/ufo@1.6.1/node_modules/ufo/dist/index.mjs';
import { renderToString } from 'file://D:/Project/AI%E9%A1%B9%E7%9B%AE/%E4%B8%AA%E4%BA%BA%E5%8D%9A%E5%AE%A2/node_modules/.pnpm/vue@3.5.21_typescript@5.9.2/node_modules/vue/server-renderer/index.mjs';
import { b as buildAssetsURL, u as useRuntimeConfig, a as useStorage, d as defineRenderHandler, p as publicAssetsURL, g as getRouteRules, c as useNitroApp } from './nitro.mjs';
import { createHead as createHead$1, propsToString, renderSSRHead } from 'file://D:/Project/AI%E9%A1%B9%E7%9B%AE/%E4%B8%AA%E4%BA%BA%E5%8D%9A%E5%AE%A2/node_modules/.pnpm/unhead@2.0.14/node_modules/unhead/dist/server.mjs';
import { stringify, uneval } from 'file://D:/Project/AI%E9%A1%B9%E7%9B%AE/%E4%B8%AA%E4%BA%BA%E5%8D%9A%E5%AE%A2/node_modules/.pnpm/devalue@5.3.2/node_modules/devalue/index.js';
import { toValue, isRef } from 'file://D:/Project/AI%E9%A1%B9%E7%9B%AE/%E4%B8%AA%E4%BA%BA%E5%8D%9A%E5%AE%A2/node_modules/.pnpm/vue@3.5.21_typescript@5.9.2/node_modules/vue/index.mjs';
import { DeprecationsPlugin, PromisesPlugin, TemplateParamsPlugin, AliasSortingPlugin } from 'file://D:/Project/AI%E9%A1%B9%E7%9B%AE/%E4%B8%AA%E4%BA%BA%E5%8D%9A%E5%AE%A2/node_modules/.pnpm/unhead@2.0.14/node_modules/unhead/dist/plugins.mjs';
import { relative } from 'file://D:/Project/AI%E9%A1%B9%E7%9B%AE/%E4%B8%AA%E4%BA%BA%E5%8D%9A%E5%AE%A2/node_modules/.pnpm/pathe@2.0.3/node_modules/pathe/dist/index.mjs';
import 'file://D:/Project/AI%E9%A1%B9%E7%9B%AE/%E4%B8%AA%E4%BA%BA%E5%8D%9A%E5%AE%A2/node_modules/.pnpm/unified@11.0.5/node_modules/unified/index.js';
import 'file://D:/Project/AI%E9%A1%B9%E7%9B%AE/%E4%B8%AA%E4%BA%BA%E5%8D%9A%E5%AE%A2/node_modules/.pnpm/remark-parse@11.0.0/node_modules/remark-parse/index.js';
import 'file://D:/Project/AI%E9%A1%B9%E7%9B%AE/%E4%B8%AA%E4%BA%BA%E5%8D%9A%E5%AE%A2/node_modules/.pnpm/remark-rehype@11.1.2/node_modules/remark-rehype/index.js';
import 'file://D:/Project/AI%E9%A1%B9%E7%9B%AE/%E4%B8%AA%E4%BA%BA%E5%8D%9A%E5%AE%A2/node_modules/.pnpm/remark-mdc@3.6.0/node_modules/remark-mdc/dist/index.mjs';
import 'file://D:/Project/AI%E9%A1%B9%E7%9B%AE/%E4%B8%AA%E4%BA%BA%E5%8D%9A%E5%AE%A2/node_modules/.pnpm/defu@6.1.4/node_modules/defu/dist/defu.mjs';
import 'file://D:/Project/AI%E9%A1%B9%E7%9B%AE/%E4%B8%AA%E4%BA%BA%E5%8D%9A%E5%AE%A2/node_modules/.pnpm/remark-gfm@4.0.1/node_modules/remark-gfm/index.js';
import 'file://D:/Project/AI%E9%A1%B9%E7%9B%AE/%E4%B8%AA%E4%BA%BA%E5%8D%9A%E5%AE%A2/node_modules/.pnpm/rehype-external-links@3.0.0/node_modules/rehype-external-links/index.js';
import 'file://D:/Project/AI%E9%A1%B9%E7%9B%AE/%E4%B8%AA%E4%BA%BA%E5%8D%9A%E5%AE%A2/node_modules/.pnpm/rehype-sort-attribute-values@5.0.1/node_modules/rehype-sort-attribute-values/index.js';
import 'file://D:/Project/AI%E9%A1%B9%E7%9B%AE/%E4%B8%AA%E4%BA%BA%E5%8D%9A%E5%AE%A2/node_modules/.pnpm/rehype-sort-attributes@5.0.1/node_modules/rehype-sort-attributes/index.js';
import 'file://D:/Project/AI%E9%A1%B9%E7%9B%AE/%E4%B8%AA%E4%BA%BA%E5%8D%9A%E5%AE%A2/node_modules/.pnpm/rehype-raw@7.0.0/node_modules/rehype-raw/index.js';
import 'file://D:/Project/AI%E9%A1%B9%E7%9B%AE/%E4%B8%AA%E4%BA%BA%E5%8D%9A%E5%AE%A2/node_modules/.pnpm/detab@3.0.2/node_modules/detab/index.js';
import 'file://D:/Project/AI%E9%A1%B9%E7%9B%AE/%E4%B8%AA%E4%BA%BA%E5%8D%9A%E5%AE%A2/node_modules/.pnpm/scule@1.3.0/node_modules/scule/dist/index.mjs';
import 'file://D:/Project/AI%E9%A1%B9%E7%9B%AE/%E4%B8%AA%E4%BA%BA%E5%8D%9A%E5%AE%A2/node_modules/.pnpm/micromark-util-sanitize-uri@2.0.1/node_modules/micromark-util-sanitize-uri/index.js';
import 'file://D:/Project/AI%E9%A1%B9%E7%9B%AE/%E4%B8%AA%E4%BA%BA%E5%8D%9A%E5%AE%A2/node_modules/.pnpm/hast-util-to-string@3.0.1/node_modules/hast-util-to-string/index.js';
import 'file://D:/Project/AI%E9%A1%B9%E7%9B%AE/%E4%B8%AA%E4%BA%BA%E5%8D%9A%E5%AE%A2/node_modules/.pnpm/github-slugger@2.0.0/node_modules/github-slugger/index.js';
import 'file://D:/Project/AI%E9%A1%B9%E7%9B%AE/%E4%B8%AA%E4%BA%BA%E5%8D%9A%E5%AE%A2/node_modules/.pnpm/destr@2.0.5/node_modules/destr/dist/index.mjs';
import 'file://D:/Project/AI%E9%A1%B9%E7%9B%AE/%E4%B8%AA%E4%BA%BA%E5%8D%9A%E5%AE%A2/node_modules/.pnpm/hookable@5.5.3/node_modules/hookable/dist/index.mjs';
import 'file://D:/Project/AI%E9%A1%B9%E7%9B%AE/%E4%B8%AA%E4%BA%BA%E5%8D%9A%E5%AE%A2/node_modules/.pnpm/ofetch@1.4.1/node_modules/ofetch/dist/node.mjs';
import 'file://D:/Project/AI%E9%A1%B9%E7%9B%AE/%E4%B8%AA%E4%BA%BA%E5%8D%9A%E5%AE%A2/node_modules/.pnpm/node-mock-http@1.0.3/node_modules/node-mock-http/dist/index.mjs';
import 'file://D:/Project/AI%E9%A1%B9%E7%9B%AE/%E4%B8%AA%E4%BA%BA%E5%8D%9A%E5%AE%A2/node_modules/.pnpm/klona@2.0.6/node_modules/klona/dist/index.mjs';
import 'file://D:/Project/AI%E9%A1%B9%E7%9B%AE/%E4%B8%AA%E4%BA%BA%E5%8D%9A%E5%AE%A2/node_modules/.pnpm/radix3@1.1.2/node_modules/radix3/dist/index.mjs';
import 'file://D:/Project/AI%E9%A1%B9%E7%9B%AE/%E4%B8%AA%E4%BA%BA%E5%8D%9A%E5%AE%A2/node_modules/.pnpm/@primevue+core@4.3.9_vue@3.5.21_typescript@5.9.2_/node_modules/@primevue/core/base/style/index.mjs';
import 'file://D:/Project/AI%E9%A1%B9%E7%9B%AE/%E4%B8%AA%E4%BA%BA%E5%8D%9A%E5%AE%A2/node_modules/.pnpm/@primevue+core@4.3.9_vue@3.5.21_typescript@5.9.2_/node_modules/@primevue/core/basecomponent/style/index.mjs';
import 'file://D:/Project/AI%E9%A1%B9%E7%9B%AE/%E4%B8%AA%E4%BA%BA%E5%8D%9A%E5%AE%A2/node_modules/.pnpm/@primeuix+styles@1.2.3/node_modules/@primeuix/styles/dist/inputtext/index.mjs';
import 'file://D:/Project/AI%E9%A1%B9%E7%9B%AE/%E4%B8%AA%E4%BA%BA%E5%8D%9A%E5%AE%A2/node_modules/.pnpm/@primeuix+styles@1.2.3/node_modules/@primeuix/styles/dist/textarea/index.mjs';
import 'file://D:/Project/AI%E9%A1%B9%E7%9B%AE/%E4%B8%AA%E4%BA%BA%E5%8D%9A%E5%AE%A2/node_modules/.pnpm/@primeuix+styles@1.2.3/node_modules/@primeuix/styles/dist/button/index.mjs';
import 'file://D:/Project/AI%E9%A1%B9%E7%9B%AE/%E4%B8%AA%E4%BA%BA%E5%8D%9A%E5%AE%A2/node_modules/.pnpm/@primeuix+styles@1.2.3/node_modules/@primeuix/styles/dist/card/index.mjs';
import 'file://D:/Project/AI%E9%A1%B9%E7%9B%AE/%E4%B8%AA%E4%BA%BA%E5%8D%9A%E5%AE%A2/node_modules/.pnpm/@primeuix+styles@1.2.3/node_modules/@primeuix/styles/dist/divider/index.mjs';
import 'file://D:/Project/AI%E9%A1%B9%E7%9B%AE/%E4%B8%AA%E4%BA%BA%E5%8D%9A%E5%AE%A2/node_modules/.pnpm/@primeuix+styles@1.2.3/node_modules/@primeuix/styles/dist/dialog/index.mjs';
import 'file://D:/Project/AI%E9%A1%B9%E7%9B%AE/%E4%B8%AA%E4%BA%BA%E5%8D%9A%E5%AE%A2/node_modules/.pnpm/@primeuix+styles@1.2.3/node_modules/@primeuix/styles/dist/menu/index.mjs';
import 'file://D:/Project/AI%E9%A1%B9%E7%9B%AE/%E4%B8%AA%E4%BA%BA%E5%8D%9A%E5%AE%A2/node_modules/.pnpm/@primeuix+styles@1.2.3/node_modules/@primeuix/styles/dist/menubar/index.mjs';
import 'file://D:/Project/AI%E9%A1%B9%E7%9B%AE/%E4%B8%AA%E4%BA%BA%E5%8D%9A%E5%AE%A2/node_modules/.pnpm/@primeuix+styles@1.2.3/node_modules/@primeuix/styles/dist/toast/index.mjs';
import 'file://D:/Project/AI%E9%A1%B9%E7%9B%AE/%E4%B8%AA%E4%BA%BA%E5%8D%9A%E5%AE%A2/node_modules/.pnpm/@primeuix+styles@1.2.3/node_modules/@primeuix/styles/dist/avatar/index.mjs';
import 'file://D:/Project/AI%E9%A1%B9%E7%9B%AE/%E4%B8%AA%E4%BA%BA%E5%8D%9A%E5%AE%A2/node_modules/.pnpm/@primeuix+styles@1.2.3/node_modules/@primeuix/styles/dist/badge/index.mjs';
import 'file://D:/Project/AI%E9%A1%B9%E7%9B%AE/%E4%B8%AA%E4%BA%BA%E5%8D%9A%E5%AE%A2/node_modules/.pnpm/@primeuix+utils@0.6.1/node_modules/@primeuix/utils/dist/object/index.mjs';
import 'file://D:/Project/AI%E9%A1%B9%E7%9B%AE/%E4%B8%AA%E4%BA%BA%E5%8D%9A%E5%AE%A2/node_modules/.pnpm/@primeuix+styles@1.2.3/node_modules/@primeuix/styles/dist/chip/index.mjs';
import 'file://D:/Project/AI%E9%A1%B9%E7%9B%AE/%E4%B8%AA%E4%BA%BA%E5%8D%9A%E5%AE%A2/node_modules/.pnpm/@primeuix+styles@1.2.3/node_modules/@primeuix/styles/dist/scrolltop/index.mjs';
import 'file://D:/Project/AI%E9%A1%B9%E7%9B%AE/%E4%B8%AA%E4%BA%BA%E5%8D%9A%E5%AE%A2/node_modules/.pnpm/@primeuix+styles@1.2.3/node_modules/@primeuix/styles/dist/skeleton/index.mjs';
import 'file://D:/Project/AI%E9%A1%B9%E7%9B%AE/%E4%B8%AA%E4%BA%BA%E5%8D%9A%E5%AE%A2/node_modules/.pnpm/@primeuix+styles@1.2.3/node_modules/@primeuix/styles/dist/progressspinner/index.mjs';
import 'file://D:/Project/AI%E9%A1%B9%E7%9B%AE/%E4%B8%AA%E4%BA%BA%E5%8D%9A%E5%AE%A2/node_modules/.pnpm/@primeuix+styles@1.2.3/node_modules/@primeuix/styles/dist/tag/index.mjs';
import 'file://D:/Project/AI%E9%A1%B9%E7%9B%AE/%E4%B8%AA%E4%BA%BA%E5%8D%9A%E5%AE%A2/node_modules/.pnpm/@primeuix+styles@1.2.3/node_modules/@primeuix/styles/dist/tooltip/index.mjs';
import 'file://D:/Project/AI%E9%A1%B9%E7%9B%AE/%E4%B8%AA%E4%BA%BA%E5%8D%9A%E5%AE%A2/node_modules/.pnpm/@primeuix+styles@1.2.3/node_modules/@primeuix/styles/dist/ripple/index.mjs';
import 'file://D:/Project/AI%E9%A1%B9%E7%9B%AE/%E4%B8%AA%E4%BA%BA%E5%8D%9A%E5%AE%A2/node_modules/.pnpm/@primeuix+styled@0.7.2/node_modules/@primeuix/styled/dist/index.mjs';
import 'node:fs';
import 'node:url';
import 'file://D:/Project/AI%E9%A1%B9%E7%9B%AE/%E4%B8%AA%E4%BA%BA%E5%8D%9A%E5%AE%A2/node_modules/.pnpm/ipx@2.1.1_db0@0.3.2_ioredis@5.7.0/node_modules/ipx/dist/index.mjs';
import 'file://D:/Project/AI%E9%A1%B9%E7%9B%AE/%E4%B8%AA%E4%BA%BA%E5%8D%9A%E5%AE%A2/node_modules/.pnpm/unstorage@1.17.1_db0@0.3.2_ioredis@5.7.0/node_modules/unstorage/dist/index.mjs';
import 'file://D:/Project/AI%E9%A1%B9%E7%9B%AE/%E4%B8%AA%E4%BA%BA%E5%8D%9A%E5%AE%A2/node_modules/.pnpm/unstorage@1.17.1_db0@0.3.2_ioredis@5.7.0/node_modules/unstorage/drivers/fs.mjs';
import 'file:///D:/Project/AI%E9%A1%B9%E7%9B%AE/%E4%B8%AA%E4%BA%BA%E5%8D%9A%E5%AE%A2/node_modules/.pnpm/nuxt@3.19.1_@parcel+watcher_373915222a3e9ba5001e76740dbb80d1/node_modules/nuxt/dist/core/runtime/nitro/utils/cache-driver.js';
import 'file://D:/Project/AI%E9%A1%B9%E7%9B%AE/%E4%B8%AA%E4%BA%BA%E5%8D%9A%E5%AE%A2/node_modules/.pnpm/unstorage@1.17.1_db0@0.3.2_ioredis@5.7.0/node_modules/unstorage/drivers/fs-lite.mjs';
import 'file://D:/Project/AI%E9%A1%B9%E7%9B%AE/%E4%B8%AA%E4%BA%BA%E5%8D%9A%E5%AE%A2/node_modules/.pnpm/ohash@2.0.11/node_modules/ohash/dist/index.mjs';

const VueResolver = (_, value) => {
  return isRef(value) ? toValue(value) : value;
};

const headSymbol = "usehead";
function vueInstall(head) {
  const plugin = {
    install(app) {
      app.config.globalProperties.$unhead = head;
      app.config.globalProperties.$head = head;
      app.provide(headSymbol, head);
    }
  };
  return plugin.install;
}

function createHead(options = {}) {
  const head = createHead$1({
    ...options,
    propResolvers: [VueResolver]
  });
  head.install = vueInstall(head);
  return head;
}

const appHead = {"meta":[{"charset":"utf-8"},{"name":"viewport","content":"width=device-width, initial-scale=1"},{"name":"description","content":"分享AI驱动的前端开发实践，308+精选AI工具，提升开发效率的最佳实践"},{"name":"keywords","content":"AI工具,前端开发,开发效率,Vue3,Nuxt3,个人博客,工作流优化"},{"name":"author","content":"Frontend AI Engineer"},{"property":"og:title","content":"AI Frontend Engineer Blog"},{"property":"og:description","content":"将AI融入前端开发工作流，提升开发效率"},{"property":"og:type","content":"website"},{"property":"og:image","content":"/og-image.png"},{"name":"twitter:card","content":"summary_large_image"},{"name":"twitter:title","content":"AI Frontend Engineer Blog"},{"name":"twitter:description","content":"将AI融入前端开发工作流，提升开发效率"},{"name":"twitter:image","content":"/twitter-image.png"}],"link":[{"rel":"icon","type":"image/x-icon","href":"/favicon.ico"},{"rel":"apple-touch-icon","href":"/apple-touch-icon.png"}],"style":[],"script":[],"noscript":[],"title":"AI Frontend Engineer - 将AI融入前端开发工作流"};

const appRootTag = "div";

const appRootAttrs = {"id":"__nuxt"};

const appTeleportTag = "div";

const appTeleportAttrs = {"id":"teleports"};

const appId = "nuxt-app";

const APP_ROOT_OPEN_TAG = `<${appRootTag}${propsToString(appRootAttrs)}>`;
const APP_ROOT_CLOSE_TAG = `</${appRootTag}>`;
const getServerEntry = () => import('../build/client.manifest.mjs').then(function (n) { return n.s; }).then((r) => r.default || r);
const getClientManifest = () => import('../build/client.manifest.mjs').then(function (n) { return n.a; }).then((r) => r.default || r).then((r) => typeof r === "function" ? r() : r);
const getSSRRenderer = lazyCachedFunction(async () => {
  const manifest = await getClientManifest();
  if (!manifest) {
    throw new Error("client.manifest is not available");
  }
  const createSSRApp = await getServerEntry();
  if (!createSSRApp) {
    throw new Error("Server bundle is not available");
  }
  const options = {
    manifest,
    renderToString: renderToString$1,
    buildAssetsURL
  };
  const renderer = createRenderer(createSSRApp, options);
  async function renderToString$1(input, context) {
    const html = await renderToString(input, context);
    return APP_ROOT_OPEN_TAG + html + APP_ROOT_CLOSE_TAG;
  }
  return renderer;
});
const getSPARenderer = lazyCachedFunction(async () => {
  const manifest = await getClientManifest();
  const spaTemplate = await import('../virtual/_virtual_spa-template.mjs').then((r) => r.template).catch(() => "").then((r) => {
    {
      return APP_ROOT_OPEN_TAG + r + APP_ROOT_CLOSE_TAG;
    }
  });
  const options = {
    manifest,
    renderToString: () => spaTemplate,
    buildAssetsURL
  };
  const renderer = createRenderer(() => () => {
  }, options);
  const result = await renderer.renderToString({});
  const renderToString = (ssrContext) => {
    const config = useRuntimeConfig(ssrContext.event);
    ssrContext.modules ||= /* @__PURE__ */ new Set();
    ssrContext.payload.serverRendered = false;
    ssrContext.config = {
      public: config.public,
      app: config.app
    };
    return Promise.resolve(result);
  };
  return {
    rendererContext: renderer.rendererContext,
    renderToString
  };
});
function lazyCachedFunction(fn) {
  let res = null;
  return () => {
    if (res === null) {
      res = fn().catch((err) => {
        res = null;
        throw err;
      });
    }
    return res;
  };
}
function getRenderer(ssrContext) {
  return ssrContext.noSSR ? getSPARenderer() : getSSRRenderer();
}
const getSSRStyles = lazyCachedFunction(() => import('../build/styles.mjs').then((r) => r.default || r));
const getEntryIds = () => getClientManifest().then((r) => Object.values(r).filter(
  (r2) => (
    // @ts-expect-error internal key set by CSS inlining configuration
    r2._globalCSS
  )
).map((r2) => r2.src));

const payloadCache = useStorage("internal:nuxt:prerender:payload") ;
useStorage("internal:nuxt:prerender:island") ;
useStorage("internal:nuxt:prerender:island-props") ;

function renderPayloadResponse(ssrContext) {
  return {
    body: stringify(splitPayload(ssrContext).payload, ssrContext._payloadReducers) ,
    statusCode: getResponseStatus(ssrContext.event),
    statusMessage: getResponseStatusText(ssrContext.event),
    headers: {
      "content-type": "application/json;charset=utf-8" ,
      "x-powered-by": "Nuxt"
    }
  };
}
function renderPayloadJsonScript(opts) {
  const contents = opts.data ? stringify(opts.data, opts.ssrContext._payloadReducers) : "";
  const payload = {
    "type": "application/json",
    "innerHTML": contents,
    "data-nuxt-data": appId,
    "data-ssr": !(opts.ssrContext.noSSR)
  };
  {
    payload.id = "__NUXT_DATA__";
  }
  if (opts.src) {
    payload["data-src"] = opts.src;
  }
  const config = uneval(opts.ssrContext.config);
  return [
    payload,
    {
      innerHTML: `window.__NUXT__={};window.__NUXT__.config=${config}`
    }
  ];
}
function splitPayload(ssrContext) {
  const { data, prerenderedAt, ...initial } = ssrContext.payload;
  return {
    initial: { ...initial, prerenderedAt },
    payload: { data, prerenderedAt }
  };
}

const unheadOptions = {
  disableDefaults: true,
  disableCapoSorting: false,
  plugins: [DeprecationsPlugin, PromisesPlugin, TemplateParamsPlugin, AliasSortingPlugin],
};

const PRERENDER_NO_SSR_ROUTES = /* @__PURE__ */ new Set(["/index.html", "/200.html", "/404.html"]);
function createSSRContext(event) {
  const ssrContext = {
    url: event.path,
    event,
    runtimeConfig: useRuntimeConfig(event),
    noSSR: event.context.nuxt?.noSSR || (PRERENDER_NO_SSR_ROUTES.has(event.path) ),
    head: createHead(unheadOptions),
    error: false,
    nuxt: void 0,
    /* NuxtApp */
    payload: {},
    _payloadReducers: /* @__PURE__ */ Object.create(null),
    modules: /* @__PURE__ */ new Set()
  };
  {
    ssrContext.payload.prerenderedAt = Date.now();
  }
  return ssrContext;
}
function setSSRError(ssrContext, error) {
  ssrContext.error = true;
  ssrContext.payload = { error };
  ssrContext.url = error.url;
}

async function renderInlineStyles(usedModules) {
  const styleMap = await getSSRStyles();
  const inlinedStyles = /* @__PURE__ */ new Set();
  for (const mod of usedModules) {
    if (mod in styleMap && styleMap[mod]) {
      for (const style of await styleMap[mod]()) {
        inlinedStyles.add(style);
      }
    }
  }
  return Array.from(inlinedStyles).map((style) => ({ innerHTML: style }));
}

const renderSSRHeadOptions = {"omitLineBreaks":false};

const entryFileName = "bcW36hqf.js";

globalThis.__buildAssetsURL = buildAssetsURL;
globalThis.__publicAssetsURL = publicAssetsURL;
const HAS_APP_TELEPORTS = !!(appTeleportAttrs.id);
const APP_TELEPORT_OPEN_TAG = HAS_APP_TELEPORTS ? `<${appTeleportTag}${propsToString(appTeleportAttrs)}>` : "";
const APP_TELEPORT_CLOSE_TAG = HAS_APP_TELEPORTS ? `</${appTeleportTag}>` : "";
const PAYLOAD_URL_RE = /^[^?]*\/_payload.json(?:\?.*)?$/ ;
const PAYLOAD_FILENAME = "_payload.json" ;
let entryPath;
const renderer = defineRenderHandler(async (event) => {
  const nitroApp = useNitroApp();
  const ssrError = event.path.startsWith("/__nuxt_error") ? getQuery(event) : null;
  if (ssrError && !("__unenv__" in event.node.req)) {
    throw createError({
      statusCode: 404,
      statusMessage: "Page Not Found: /__nuxt_error"
    });
  }
  const ssrContext = createSSRContext(event);
  const headEntryOptions = { mode: "server" };
  ssrContext.head.push(appHead, headEntryOptions);
  if (ssrError) {
    ssrError.statusCode &&= Number.parseInt(ssrError.statusCode);
    setSSRError(ssrContext, ssrError);
  }
  const isRenderingPayload = PAYLOAD_URL_RE.test(ssrContext.url);
  if (isRenderingPayload) {
    const url = ssrContext.url.substring(0, ssrContext.url.lastIndexOf("/")) || "/";
    ssrContext.url = url;
    event._path = event.node.req.url = url;
    if (await payloadCache.hasItem(url)) {
      return payloadCache.getItem(url);
    }
  }
  const routeOptions = getRouteRules(event);
  if (routeOptions.ssr === false) {
    ssrContext.noSSR = true;
  }
  const _PAYLOAD_EXTRACTION = !ssrContext.noSSR;
  const payloadURL = _PAYLOAD_EXTRACTION ? joinURL(ssrContext.runtimeConfig.app.cdnURL || ssrContext.runtimeConfig.app.baseURL, ssrContext.url.replace(/\?.*$/, ""), PAYLOAD_FILENAME) + "?" + ssrContext.runtimeConfig.app.buildId : void 0;
  const renderer = await getRenderer(ssrContext);
  {
    for (const id of await getEntryIds()) {
      ssrContext.modules.add(id);
    }
  }
  const _rendered = await renderer.renderToString(ssrContext).catch(async (error) => {
    if (ssrContext._renderResponse && error.message === "skipping render") {
      return {};
    }
    const _err = !ssrError && ssrContext.payload?.error || error;
    await ssrContext.nuxt?.hooks.callHook("app:error", _err);
    throw _err;
  });
  const inlinedStyles = !ssrContext._renderResponse && !isRenderingPayload ? await renderInlineStyles(ssrContext.modules ?? []) : [];
  await ssrContext.nuxt?.hooks.callHook("app:rendered", { ssrContext, renderResult: _rendered });
  if (ssrContext._renderResponse) {
    return ssrContext._renderResponse;
  }
  if (ssrContext.payload?.error && !ssrError) {
    throw ssrContext.payload.error;
  }
  if (isRenderingPayload) {
    const response = renderPayloadResponse(ssrContext);
    {
      await payloadCache.setItem(ssrContext.url, response);
    }
    return response;
  }
  if (_PAYLOAD_EXTRACTION) {
    appendResponseHeader(event, "x-nitro-prerender", joinURL(ssrContext.url.replace(/\?.*$/, ""), PAYLOAD_FILENAME));
    await payloadCache.setItem(withoutTrailingSlash(ssrContext.url), renderPayloadResponse(ssrContext));
  }
  const NO_SCRIPTS = routeOptions.noScripts;
  const { styles, scripts } = getRequestDependencies(ssrContext, renderer.rendererContext);
  if (!NO_SCRIPTS) {
    let path = entryPath;
    if (!path) {
      path = buildAssetsURL(entryFileName);
      if (/^(?:\/|\.+\/)/.test(path) || hasProtocol(path, { acceptRelative: true })) {
        entryPath = path;
      } else {
        path = relative(event.path.replace(/\/[^/]+$/, "/"), joinURL("/", path));
        if (!/^(?:\/|\.+\/)/.test(path)) {
          path = `./${path}`;
        }
      }
    }
    ssrContext.head.push({
      script: [{
        tagPosition: "head",
        tagPriority: -2,
        type: "importmap",
        innerHTML: JSON.stringify({ imports: { "#entry": path } })
      }]
    }, headEntryOptions);
  }
  if (_PAYLOAD_EXTRACTION && !NO_SCRIPTS) {
    ssrContext.head.push({
      link: [
        { rel: "preload", as: "fetch", crossorigin: "anonymous", href: payloadURL } 
      ]
    }, headEntryOptions);
  }
  if (ssrContext._preloadManifest && !NO_SCRIPTS) {
    ssrContext.head.push({
      link: [
        { rel: "preload", as: "fetch", fetchpriority: "low", crossorigin: "anonymous", href: buildAssetsURL(`builds/meta/${ssrContext.runtimeConfig.app.buildId}.json`) }
      ]
    }, { ...headEntryOptions, tagPriority: "low" });
  }
  if (inlinedStyles.length) {
    ssrContext.head.push({ style: inlinedStyles });
  }
  const link = [];
  for (const resource of Object.values(styles)) {
    link.push({ rel: "stylesheet", href: renderer.rendererContext.buildAssetsURL(resource.file), crossorigin: "" });
  }
  if (link.length) {
    ssrContext.head.push({ link }, headEntryOptions);
  }
  if (!NO_SCRIPTS) {
    ssrContext.head.push({
      link: getPreloadLinks(ssrContext, renderer.rendererContext)
    }, headEntryOptions);
    ssrContext.head.push({
      link: getPrefetchLinks(ssrContext, renderer.rendererContext)
    }, headEntryOptions);
    ssrContext.head.push({
      script: _PAYLOAD_EXTRACTION ? renderPayloadJsonScript({ ssrContext, data: splitPayload(ssrContext).initial, src: payloadURL })  : renderPayloadJsonScript({ ssrContext, data: ssrContext.payload }) 
    }, {
      ...headEntryOptions,
      // this should come before another end of body scripts
      tagPosition: "bodyClose",
      tagPriority: "high"
    });
  }
  if (!routeOptions.noScripts) {
    const tagPosition = "head";
    ssrContext.head.push({
      script: Object.values(scripts).map((resource) => ({
        type: resource.module ? "module" : null,
        src: renderer.rendererContext.buildAssetsURL(resource.file),
        defer: resource.module ? null : true,
        // if we are rendering script tag payloads that import an async payload
        // we need to ensure this resolves before executing the Nuxt entry
        tagPosition,
        crossorigin: ""
      }))
    }, headEntryOptions);
  }
  const { headTags, bodyTags, bodyTagsOpen, htmlAttrs, bodyAttrs } = await renderSSRHead(ssrContext.head, renderSSRHeadOptions);
  const htmlContext = {
    htmlAttrs: htmlAttrs ? [htmlAttrs] : [],
    head: normalizeChunks([headTags]),
    bodyAttrs: bodyAttrs ? [bodyAttrs] : [],
    bodyPrepend: normalizeChunks([bodyTagsOpen, ssrContext.teleports?.body]),
    body: [
      _rendered.html,
      APP_TELEPORT_OPEN_TAG + (HAS_APP_TELEPORTS ? joinTags([ssrContext.teleports?.[`#${appTeleportAttrs.id}`]]) : "") + APP_TELEPORT_CLOSE_TAG
    ],
    bodyAppend: [bodyTags]
  };
  await nitroApp.hooks.callHook("render:html", htmlContext, { event });
  return {
    body: renderHTMLDocument(htmlContext),
    statusCode: getResponseStatus(event),
    statusMessage: getResponseStatusText(event),
    headers: {
      "content-type": "text/html;charset=utf-8",
      "x-powered-by": "Nuxt"
    }
  };
});
function normalizeChunks(chunks) {
  return chunks.filter(Boolean).map((i) => i.trim());
}
function joinTags(tags) {
  return tags.join("");
}
function joinAttrs(chunks) {
  if (chunks.length === 0) {
    return "";
  }
  return " " + chunks.join(" ");
}
function renderHTMLDocument(html) {
  return `<!DOCTYPE html><html${joinAttrs(html.htmlAttrs)}><head>${joinTags(html.head)}</head><body${joinAttrs(html.bodyAttrs)}>${joinTags(html.bodyPrepend)}${joinTags(html.body)}${joinTags(html.bodyAppend)}</body></html>`;
}

export { renderer as default };
//# sourceMappingURL=renderer.mjs.map
