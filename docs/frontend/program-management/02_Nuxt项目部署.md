---
title: nuxt项目部署
description: 前端ssr项目部署踩坑流程
publishedAt: '2022-11-30'
lastUpdated: '2022-11-30'
tags: 'management'
---

## 1. 创建项目
这个不分不多赘述，根据官网创建对应项目
https://nuxtjs.org/docs/get-started/installation
## 2. 打包的两种方式
### 2.1 静态部署
1. `nuxt.config.js` : 文件需要对不同打包方式进行配置
```js
target: "static" // build静态部署,默认为server
```
2. generate打包
```shell
npm run generate
```
生成`dist` 文件夹，直接放到有`nginx`的服务器上就可以访问了
### 2.2 ssr部署
1. `nuxt.config.js`：将target设置为server，或者删除target的设置
```js
target: "server"


// 新增host,这个端口则是部署到服务器要访问的端口
server: {
	port: 8333,
	host: '0.0.0.0'
}
```
2. 新增`ecosystem.config.js`: 为了后期使用pm2启动项目
```js
module.exports = {
	apps: [
		{
		name: 'youproject-name', // 你的项目名
		
		exec_mode: 'cluster',
		
		instances: 'max',
		
		script: './node_modules/nuxt/bin/nuxt.js',
		
		args: 'start',
		
		},
	],
}
```
3. 修改package.json
```json
// 新增一行
"scripjt": {
	"pm2": "pm2 start npm --name project-name -- run start --watch"
}
```
4. 打包
```shell
npm run build
```
5. 查找需要部署的文件夹和文件
```js
.nuxt
static
package.json
nuxt.config.js
ecosystem.config.js
```
6. 将上述文件打包，并放入服务器上
- 使用scp上传到服务器
- 在服务器上安装`pm2`
- 给你的项目创建一个文件夹，将打包的文件解压到文件夹内
- `npm i ` 安装依赖
- `npm run start`: 看看项目是否能正常运行
- `npm run pm2`: 开启pm2守护进程，启动项目
8. 通过 服务器`ip地址:8333` 来访问此项目
# END-关于我

[本文源码](https://github.com/codehzy/nuxt-demo1)

[掘金地址](https://juejin.cn/user/1714893872178823)
[个人博客](https://www.codehzy.cn/)
[GitHub](https://github.com/codehzy)