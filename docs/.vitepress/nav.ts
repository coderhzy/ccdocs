import { docsVersion, github } from "./meta";

const nav = [
  { text: "💭 学习圈子", link: "/zsxq" },
  {
    text: "🔥 专栏",
    items: [
      { text: "🔥 前端算法", link: "/algorithm/guide/" },
      { text: "🔥 设计模式", link: "/patterns/guide/" },
      { text: "📋 面试大全", link: "/interview/" },
    ],
  },
  {
    text: "📚 归档",
    items: [
      { text: "📚 前端归档", link: "/frontend/guide/" },
      { text: "📚 后端归档", link: "/backend/" },
    ],
  },
  // {
  //   text: "编程",
  //   items: [
  //     { text: "⭐ 资源导航", link: "/favorites" },
  //     { text: "💻 编程学习", link: "/program/" },
  //     { text: "🔧 编程工具", link: "/tool/" },
  //   ],
  // },
  // {
  //   text: "洞见",
  //   items: [
  //     { text: "✏️ 随笔", link: "/essay/" },
  //     { text: "🌱 青葱岁月", link: "/green/ch" },
  //   ],
  // },
  {
    text: `v${docsVersion}`,
    items: [
      { text: "🔋 备用站点", link: "ad" },
      { text: "🧱 参与贡献", link: "/contributing" },
      { text: "🎉 更新日志", link: `${github}/releases` },
    ],
  },
];

export default nav;
