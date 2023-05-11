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
        { text: "React", link: "/memo/react/" },
        {
          text: "前端工程化",
          items: [
            { text: "webpack", link: "/memo/webpack/" },
            { text: "vite", link: "/memo/vite/" },
            { text: "rollup", link: "/memo/rollup/" },
            { text: "jenkins", link: "/memo/jenkins/" },
          ],
        },
        {
          text: "React",
          link: "/memo/react/",
        },
        {
          text: "Webview",
          link: "/memo/webview/",
        },
        {
          text: "微信原生小程序",
          link: "/memo/miniprogram/",
        },
      ],
    },
  ],
  "/frontend/": sidebarFrontend(),
  "/backend/": sidebarBackend(),
  "/interview/": sidebarInterview(),
  "/algorithm/": frontendAlgorithm(),
};

// 专栏 - 面试大全
function sidebarInterview() {
  return [
    {
      text: "前端面试",
      collapsed: false,
      items: [{ text: "导读", link: "/interview/guide/" }],
    },
    {
      text: "VueJs题",
      collapsed: false,
      items: [{ text: "导读", link: "/interview/vueJs/" }],
    },
    {
      text: "CSS题",
      collapsed: false,
      items: [{ text: "基础题", link: "/interview/css/" }],
    },
    {
      text: "JavaScript",
      collapsed: false,
      items: [{ text: "基础题", link: "/interview/JavaScript/" }],
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
    {
      text: "🍓 React.js",
      collapsed: false,
      items: [
        { text: "导读", link: "/frontend/react/" },
        { text: "ReactJSX", link: "/frontend/react/01_JSX" },
        { text: "React基础", link: "/frontend/react/02_React-Base" },
        { text: "React全家桶", link: "/frontend/react/03_React-Around" },
        { text: "ReactHooks", link: "/frontend/react/04_React-Hooks" },
      ],
    },
    {
      text: "项目搭建",
      collapsed: false,
      items: [
        { text: "导读", link: "/frontend/program-management/" },
        {
          text: "01_Monrepo管理你的代码",
          link: "/frontend/program-management/01_Monrepo管理你的代码",
        },
        {
          text: "02_Nuxt项目部署",
          link: "/frontend/program-management/02_Nuxt项目部署",
        },
        {
          text: "03_Linux使用Clash科学上网",
          link: "/frontend/program-management/03_Linux使用Clash科学上网",
        },
        {
          text: "04_vite+vue3接入微前端",
          link: "/frontend/program-management/04_vite+vue3接入微前端",
        },
        {
          text: "05_MySQL部署问题",
          link: "/frontend/program-management/05_MySQL部署问题",
        },
        {
          text: "06_搭建React项目",
          link: "/frontend/program-management/06_搭建React项目",
        },
      ],
    },
  ];
}

// 归档 - 后端归档
function sidebarBackend() {
  return [
    {
      text: "🍏 Node.js",
      collapsed: false,
      items: [{ text: "导读", link: "/backend/guide/" }],
    },
  ];
}

// 专栏 - 前端算法

function frontendAlgorithm() {
  return [
    {
      text: "数组",
      collapsed: false,
      items: [
        { text: "导读", link: "/algorithm/guide/" },
        {
          text: "01_排序数组",
          link: "/algorithm/array/01_排序数组",
        },
      ],
    },
  ];
}
