---
title:  Monorepo
description: 快速上手Monorepo
publishedAt: '2022-07-25'
lastUpdated: '2022-08-01'
tags: 'management'
---

# 用最简单的话语教会你如何使用monorepo管理你的项目

## 1. monorepo介绍

Monorepo 中文：单体仓库 (单个仓库)。就是单个项目仓库 (repository)，其中包含多个开发项目 project (模块 module，或包 package)。虽然这些 project 也许是相关联的，但它们通常在逻辑上相互独立，并被不同的团队负责编写，运行。

## 2. monorepo操作
0. 安装pnpm

```shell
brew install pnpm  # mac
# OR
npm install -g pnpm # windows
```

### 1. 创建项目文件夹

```shell
mkdir monorepo # 创建项目文件夹
cd monorepo # 进入文件夹
pnpm init # 初始化pnpm
```


### 2. 创建pnpm的yaml文件

```shell
touch pnpm-workspace.yaml
```

- https://pnpm.io/zh/pnpm-workspace_yaml

- 将上方链接打开，复制对应内容
```yaml
packages:
  # all packages in direct subdirs of packages/
  # 个人翻译： 存放你得具体web项目
  - 'packages/*'
  # all packages in subdirs of components/
  # 个人翻译： 存放公用组件
  - 'components/**'
  # common api
  - "api/**"
```


### 3. 创建公共api文件夹

**我们要在api中封装一个整个项目公用的axios**

- 文件目录


- 安装依赖
```shell
cd api 

pnpm init

pnpm install axios
```


- 编写代码： 嫌麻烦可以直接复制

`/api/base.js`
```javascript
import axios from "axios";

let Axios = axios.create({
  baseURL: "/",
});

export default Axios;
```

`/api/user.js`
```javascript
import Axios from "./base";

export const getUser = (data) => Axios.get(data);
```

`/api/index.js`
```javascript
export * from "./user";
```

`package.json`
```json
{
  // 修改包名为自己的
  "name": "@zy/api",
  // 更改版本
  "version": "1.0.1",
  "description": "",
  "main": "index.js",
  // 添加为私有
  "private": true,
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "dependencies": {
    "axios": "^1.1.3"
  }
}
```

### 4. 在packages下创建对应项目

```shell
cd packages

npm create vite

# 创建一个叫做web的project
# 使用yarn安装依赖
```


- 4.1 移除项目中App组件内容
```javascript
<script setup></script>

<template>
  <div></div>
</template>

```

- 4.2 安装公共api的库

```shell
pnpm install @zy/api
```


- 4.3 使用axios

```javascript
<script setup>
import { getUser } from "@zy/api";

console.log(getUser);
</script>

<template>
  <div></div>
</template>
```

- 打开控制台我们可以看到对应的函数已经成功引入

![](https://imgsbed-1301560453.cos.ap-shanghai.myqcloud.com/blog/20221111142419.png)

- 4.4 **解读一下**

`在web项目下的package.json能这一行，此为我们引入本地的包`
```
 "@zy/api": "workspace:^1.0.1",
```

## 3. 封装公告组件包

```shell
npm create vite # 创建对应的javascript项目

# 项目名 components

pnpm install # 安装依赖
# 这个地方有坑，正常来说组件是不需要安装依赖。
# 但是不安装依赖打包会报错，因为打包需要使用javascript来对我们写的组件进行解析

touch index.js # 

mkdir dir && cd dir && touch Button.javascript # 创建公共组件文件
```

- 编写组件`/components/dir/Button.javascript`

```javascript
<template>
  <button>我是一个按钮公共组件</button>
</template>

<script lang="ts" setup></script>
```

- `/components/index.js`
```javascript
import Button from "./dir/Button.javascript";

export default Button;
```

- `/components/package.json`

```json
{
  "name": "@zy/components",
  "private": true,
  "version": "0.0.1",
  "type": "module",
  "main": "index.js",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview"
  },
  "dependencies": {
    "javascript": "^3.2.41"
  },
  "devDependencies": {
    "@vitejs/plugin-javascript": "^3.2.0",
    "vite": "^3.2.3"
  }
}
```

- 安装components包

```javascript
pnpm install @zy/component
```


- 使用`components`包

```javascript
<script setup>
import { getUser } from "@zy/api";
import Button from "@zy/components";

console.log(getUser);
</script>

<template>
  <div>
    <Button />
  </div>
</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.javascript:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
```
- 效果

![](https://imgsbed-1301560453.cos.ap-shanghai.myqcloud.com/blog/20221111155725.png)

# END-关于我

[本文源码](https://github.com/codehzy/monorepo)

[掘金地址](https://juejin.cn/user/1714893872178823)
[个人博客](https://www.codehzy.cn/)
[GitHub](https://github.com/codehzy)