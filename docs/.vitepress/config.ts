import { defineConfig } from "vitepress";
import { description, docsVersion, github, keywords, name, site } from "./meta";
import sidebar from "./sidebar";
import nav from "./nav";

// 根据环境变量设置 base，确保 GitHub Pages 使用正确的路径
const base = process.env.DEPLOY_ENV === 'gh-pages' ? '/ccdocs/' : '/';

// https://vitepress.dev/reference/site-config
export default defineConfig({
  base,
  title: name,
  description,
  lastUpdated: true,
  useWebFonts: false,
  markdown: {
    lineNumbers: true,
  },
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    logo: base + "ccdocs-logo.svg",
    outline: "deep",
    docFooter: {
      prev: "上一篇",
      next: "下一篇",
    },
    returnToTopLabel: "返回顶部",
    outlineTitle: "导航栏",
    darkModeSwitchLabel: "外观",
    sidebarMenuLabel: "归档",
    editLink: {
      pattern: `${github}/tree/main/docs/:path`,
      text: "在 GitHub 上编辑此页",
    },
    lastUpdatedText: "最后一次更新于",
    footer: {
      message: `用心去做高质量的专业前端内容网站，欢迎 <a target="_blank" style="color: var(--vp-c-brand)" href="${github}">star ⭐</a> 让更多人发现`,
      copyright: `<a target="_blank" href="${github}/blob/main/LICENSE">MIT License</a> | 版权所有 © 2022-${new Date().getFullYear()} <a target="_blank" href="${github}">ccdocs and ccDocs contributors</a>`,
    },
    nav,
    sidebar,
    socialLinks: [{ icon: "github", link: "https://github.com/coderhzy" }],
  },

  head: [
    ["meta", { name: "referrer", content: "no-referrer-when-downgrade" }],
    ["meta", { name: "keywords", content: keywords }],
    ["meta", { name: "author", content: "coderhzy" }],
    ["meta", { property: "og:type", content: "article" }],
    ["meta", { name: "application-name", content: name }],
    ["meta", { name: "apple-mobile-web-app-title", content: name }],
    [
      "meta",
      { name: "apple-mobile-web-app-status-bar-style", content: "default" },
    ],

    ["link", { rel: "shortcut icon", href: base + "favicon.ico" }],
    ["link", { rel: "icon", type: "image/x-icon", href: base + "favicon.ico" }],
    ["link", { rel: "mask-icon", href: base + "ccdocs-logo.svg", color: "#06f" }],
    ["meta", { name: "theme-color", content: "#06f" }],

    [
      "link",
      {
        rel: "apple-touch-icon",
        sizes: "120x120",
        href: base + "images/icons/apple-touch-icon.png",
      },
    ],
  ],
});
