---
layout: home

title: ccDocs
titleTemplate: 一站式前端内容网站，包括学习路线、知识体系

hero:
  name: ccDocs
  text: "Front-end learning document collection"
  tagline: |
    一站式前端内容网站，包括学习路线、知识体系
  image:
    src: /it.svg
    alt: ccDocs
  actions:
    - theme: brand
      text: 开始阅读
      link: /guide
    - theme: alt
      text: 学习圈子
      link: /zsxq
    - theme: alt
      text: 备用站点
      link: https://main--dancing-dango-bc1810.netlify.app/
features:
  - icon: 📋
    title: 面试专栏
    details: 海量前端面试问题解答，一站式阅读体验。
    link: /interview/
    linkText: 开始刷题
  - icon: 📓
    title: 前端算法
    details: 不再畏惧面试算法，提供刷题路线。
    link: /algorithm/guide/
    linkText: 开始刷题
  - icon: 💭
    title: 学习圈子
    details: 打造专业的前端技术氛围社群，低调务实。
    link: /zsxq
    linkText: 加入圈子
---

<script setup>
import {
  VPTeamPage,
  VPTeamPageTitle,
  VPTeamMembers
} from 'vitepress/theme';
import { icons } from './socialIcons';

const members = [
  {
    avatar: 'https://avatars.githubusercontent.com/u/58018918?s=400&u=320faab333c28272b64af629375158aba1290587&v=4',
    name: 'coderhzy',
    title: '逆水行舟，不进则退',
    links: [
      { icon: 'github', link: 'https://github.com/coderhzy' },
    ]
  },
]
</script>

<!-- <VPTeamPage>
  <VPTeamPageTitle>
    <template #title>
      核心成员介绍
    </template>
  </VPTeamPageTitle>
  <VPTeamMembers
    :members="members"
  />
</VPTeamPage> -->
