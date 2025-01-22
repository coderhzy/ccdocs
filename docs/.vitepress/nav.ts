import { docsVersion, github } from "./meta";

const nav = [
  { text: "💭 学习圈子", link: "/zsxq" },
  {
    text: "🔥 专栏",
    items: [
      { text: "🔥 前端算法", link: "/algorithm/常见算法/" },
      // {text: "🔥 设计模式", link: "/patterns/guide/"},
      { text: "📋 面试大全", link: "/interview/guide/" },
    ],
  },
  {
    text: "🚀 实战项目",
    items: [
      { text: "🚀 Vue3实战", link: "/practicalProject/vue3/guide/" },
      { text: "🚀 React实战", link: "/practicalProject/react/guide/" },
    ],
  },
  {
    text: "📚 归档",
    items: [
      { text: "📚 前端归档", link: "/frontend/javascript/" },
      { text: "🔙 后端归档", link: "/backend/nodejs/" },
      { text: "🌈 好文收录", link: "/goodArticle/guide/" },
      { text: "📝 实用工具", link: "/practicalTools/" },
    ],
  },
  {
    text: `v${docsVersion}`,
    items: [
      {
        text: "🔋 备用站点",
        link: "https://codehzy.netlify.app/",
      },
      { text: "🧱 参与贡献", link: "/contributing" },
      { text: "🎉 更新日志", link: `${github}/releases` },
    ],
  },
];

export default nav;
