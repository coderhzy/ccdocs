// 首页
export function rootDir() {
  return [
    {
      text: "开始阅读",
      collapsed: false,
      items: [
        {text: "阅读须知", link: "/guide"},
        {text: "学习圈子", link: "/zsxq"},
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
        {text: "导读", link: "/ts/"},
        {text: "TS工具函数", link: "/ts/01_TS工具函数"},
      ],
    },
    {
      text: "📝 备忘录",
      collapsed: false,
      items: [
        {text: "Git 命令", link: "/memo/git-command/"},
        {text: "Vue实战问题", link: "/memo/vue-record/"},
        {text: "React", link: "/memo/react/"},
        {
          text: "前端工程化",
          items: [
            {text: "webpack", link: "/memo/webpack/"},
            {text: "vite", link: "/memo/vite/"},
            {text: "rollup", link: "/memo/rollup/"},
            {text: "jenkins", link: "/memo/jenkins/"},
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
        {
          text: "Echarts心得",
          link: "/memo/echarts/",
        },
        {
          text: "WebStorm快捷键",
          link: "/memo/WebStorm/",
        },
      ],
    },
    {
      text: "📘 前端之声",
      collapsed: false,
      items: [
        {text: "好用的前端技能", link: "/front-skills/"},
      ],
    },
  ];
}

// 专栏 - 面试大全
export function sidebarInterview() {
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
export function sidebarFrontend() {
  return [
    {
      text: "🍏 JavaScript",
      collapsed: false,
      items: [
        { text: "导读", link: "/frontend/javascript/" },
        {
          text: "01_深入JavaScript运行原理",
          link: "/frontend/javascript/01_deep-run",
        },
        {
          text: "02_闭包模型-内存泄漏",
          link: "/frontend/javascript/02_closure",
        },
        {
          text: "03_this",
          link: "/frontend/javascript/03_this",
        },
        {
          text: "04_纯函数和柯里化函数",
          link: "/frontend/javascript/04_PureFunctionCurryFunction",
        },
        {
          text: "05_严格模式和面向对象",
          link: "/frontend/javascript/05_strict&OO",
        },
        {
          text: "06_原型链",
          link: "/frontend/javascript/06_protolink&inherit",
        },
        {
          text: "07_Es6类",
          link: "/frontend/javascript/07_es6-class",
        },
        {
          text: "08_es6&es7知识",
          link: "/frontend/javascript/08_es6&es7知识",
        },
        {
          text: "09_es++知识",
          link: "/frontend/javascript/09_es++知识",
        },
        {
          text: "10_Proxy",
          link: "/frontend/javascript/10_proxy",
        },
        {
          text: "11_响应式原理",
          link: "/frontend/javascript/11_reactive",
        },
        {
          text: "12_Promise",
          link: "/frontend/javascript/12_promise",
        },
        {
          text: "13_iterator(迭代器)",
          link: "/frontend/javascript/13_iterator",
        },
        {
          text: "14_async-await",
          link: "/frontend/javascript/14_async-await",
        },
        {
          text: "15_event-loop",
          link: "/frontend/javascript/15_event-loop",
        },
        {
          text: "16_错误捕获",
          link: "/frontend/javascript/16_throw-Error",
        },
        {
          text: "17_JavaScript-模块化",
          link: "/frontend/javascript/17_JS-module",
        },
        {
          text: "18_包管理",
          link: "/frontend/javascript/18_package-management",
        },
        {
          text: "19_JSON详解",
          link: "/frontend/javascript/19_JSON-serialization",
        },
        {
          text: "20_浏览器存储",
          link: "/frontend/javascript/20_browser-storage",
        },
        {
          text: "21_BOM和DOM",
          link: "/frontend/javascript/21_BOM和DOM",
        },
        {
          text: "22_防抖和节流",
          link: "/frontend/javascript/22_防抖和节流",
        },
        {
          text: "23_深拷贝",
          link: "/frontend/javascript/23_深拷贝",
        },
        {
          text: "24_事件总线",
          link: "/frontend/javascript/24_事件总线",
        },
      ],
    },
    {
      text: "🍉 TypeScript",
      collapsed: false,
      items: [
        { text: "导读", link: "/frontend/typeScript/" },
        {
          text: "原始类型和对象类型",
          link: "/frontend/typeScript/01_原始类型和对象类型",
        },
      ],
    },
    {
      text: "🍏 Vue.js",
      collapsed: false,
      items: [
        { text: "导读", link: "/frontend/vue/" },
        { text: "Vue3使用tsx", link: "/frontend/vue/01_vue3-use-tsx" },
        {
          text: "Vue3使用cssModule",
          link: "/frontend/vue/02_vue3-use-css-module",
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
export function sidebarBackend() {
  return [
    {
      text: "🍏 Node.js",
      collapsed: false,
      items: [{ text: "导读", link: "/backend/nodejs/" }],
    },
    {
      text: "🍓 Nest.js",
      collapsed: false,
      items: [
        { text: "导读", link: "/backend/nest/" },
        { text: "01_为什么是nestjs", link: "/backend/nest/01_为什么是nestjs" },
      ],
    },
  ];
}

// 专栏 - 前端算法
export function frontendAlgorithm() {
  return [
    {
      text: "常见题",
      collapsed: false,
      items: [
        { text: "开篇", link: "/algorithm/常见算法/" },
        {
          text: "01_两数之和",
          link: "/algorithm/常见算法/01_两数之和",
        },
      ],
    },
    {
      text: "数组",
      collapsed: false,
      items: [
        { text: "快捷导航", link: "/algorithm/array/" },
        {
          text: "01_排序数组",
          link: "/algorithm/array/01_排序数组",
        },
        {
          text: "02_冒泡排序",
          link: "/algorithm/array/02_冒泡排序",
        },
      ],
    },
    {
        text: "栈(stack)",
        collapsed: false,
        items: [
            { text: "快捷导航", link: "/algorithm/stack/" },
            {
                text: "01_有效括号",
                link: "/algorithm/stack/01_有效括号",
            },
           {
                text: "02_使用数组实现Stack",
                link: "/algorithm/stack/02_使用数组实现Stack",
            },
        ]
    }
  ];
}
