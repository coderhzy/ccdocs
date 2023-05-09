export default {
  "/": [
    {
      text: "开始阅读",
      collapsed: false,
      items: [
        { text: "阅读须知", link: "/guide" },
        { text: "学习圈子", link: "/zsxq" },
        // {
        //   text: "23 年每周学习动态",
        //   items: [
        //     {
        //       text: "内容介绍",
        //       link: "/weekly/guide",
        //     },
        //     {
        //       text: "3 月",
        //       link: "/weekly/202303",
        //     },
        //     {
        //       text: "4 月",
        //       link: "/weekly/202304",
        //     },
        //   ],
        // },
      ],
    },
    {
      text: "🍏 Vue.js 实战",
      collapsed: false,
      items: [
        {
          text: "基于 Vue3 后台管理系统",
          link: "/vuejs/vue3-management-system/",
        },
      ],
    },
    {
      text: "📘 TS 学习",
      collapsed: false,
      items: [
        { text: "导读", link: "/ts/ch" },
        { text: "环境配置", link: "/ts/ch0" },
        { text: "基础操作", link: "/ts/ch1" },
        { text: "工具类", link: "/ts/ch2" },
        { text: "函数系统", link: "/ts/ch3" },
        { text: "泛型", link: "/ts/ch4" },
      ],
    },
    {
      text: "📝 备忘录",
      collapsed: false,
      items: [
        { text: "Git 命令", link: "/memo/git-command/" },
        { text: "Vue实战问题", link: "/memo/vue-record/" },
      ],
    },
  ],
  "/patterns/": sidebarPartterns(),
  "/frontend/": sidebarFrontend(),
};

function sidebarPartterns() {
  return [
    {
      text: "📔 前端设计模式",
      collapsed: false,
      items: [
        { text: "导读", link: "/patterns/guide/" },
        { text: "单例模式", link: "/patterns/singleton-pattern/" },
        { text: "代理模式", link: "/patterns/proxy-pattern/" },
        { text: "提供者模式", link: "/patterns/provider-pattern/" },
        { text: "原型模式", link: "/patterns/prototype-pattern/" },
        {
          text: "容器/演示模式",
          link: "/patterns/container-presentational-pattern/",
        },
        { text: "观察者模式", link: "/patterns/observer-pattern/" },
        { text: "模块模式", link: "/patterns/module-pattern/" },
        { text: "混合模式", link: "/patterns/mixin-pattern/" },
        { text: "中介/中间件模式", link: "/patterns/middleware-pattern/" },
        { text: "高阶组件模式", link: "/patterns/hoc-pattern/" },
      ],
    },
  ];
}

// 归档 - 前端归档
function sidebarFrontend() {
  return [
    {
      text: "🍏 Vue.js",
      collapsed: false,
      items: [
        { text: "导读", link: "/frontend/guide/" },
        { text: "Vue3使用tsx", link: "/frontend/vue-archive/vue3-use-tsx" },
        {
          text: "Vue3使用cssModule",
          link: "/frontend/vue-archive/vue3-use-css-module",
        },
      ],
    },
  ];
}
