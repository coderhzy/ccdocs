# 包管理工具


## 1. npm-install原理

### 1.1. npm install 含缓存

- 一图胜千言
![](https://imgsbed-1301560453.cos.ap-shanghai.myqcloud.com//blog202306081316327.png)



- 具体查找逻辑
  - 如果那没有lock.json文件，那么就会去找package.json文件, 安装对应的版本,并生成lock.json文件
  - 如果有lock.json
    - ![](https://imgsbed-1301560453.cos.ap-shanghai.myqcloud.com//blog202306081319315.png)
    - lock版本 等于 package.json的时候,用上图的lock文件中的`integrity`的256去上次下载的缓存中找到
    - 本地缓存的npm包的位置: 终端执行`npm get cache`查看
    - ![](https://imgsbed-1301560453.cos.ap-shanghai.myqcloud.com//blog202306081323633.png)
    - 根据`integrity`的256去本地的`index-v5`中找到对应的配置,对应配置中 `_shasum`字段找到对应文件的位置
    - 然后去`content-v2`中找到对应的文件,然后解压到`node_modules`中

### 1.2 npm 其他命令

### 1.2.1 卸载某个依赖包

- `npm uninstall <package-name>`
- `npm uninstall <package-name> --save` 会删除package.json中的依赖
- `npm uninstall <package-name> --save-dev` 会删除package.json中的开发依赖

### 1.2.2 强制重新build

- `npm rebuild`


### 1.2.3 查看npm包的信息

- `npm view <package-name>`
- `npm view <package-name> versions` 查看所有版本
- `npm view <package-name> version` 查看最新版本


### 1.2.3 npm包的发布

- `npm publish`

## 2. yarn


- 对于yarn 基本和 npm用法差不多, 另外yarn还有一个`yarn add`命令, 用来安装依赖包, 会自动更新package.json文件

### 2.1 安装yarn

- `npm install -g yarn`


### 2.2 yarn命令

- `yarn add <package-name>` 安装依赖包
- `yarn remove <package-name>` 卸载依赖包
- `yarn upgrade <package-name>` 升级依赖包
- `yarn upgrade <package-name> --latest` 升级依赖包到最新版本


### 2.3 yarn.lock

- yarn.lock文件是yarn的缓存文件, 用来记录每个依赖包的版本号, 以及依赖包的依赖包的版本号, 以及依赖包的依赖
- 想对比npm的lock.json文件, yarn.lock文件是一个扁平的.
- ![](https://imgsbed-1301560453.cos.ap-shanghai.myqcloud.com//blog202306091257092.png)


## 3. npx

## 3.1 为什么要有npx

- 为了解决全局安装的包, 不能在不同的项目中使用的问题
- 当正常使用vue项目执行`npm run serve`的时候, 就是`vue-cli`底层帮我们找到了`node_modules/.bin/`这个文件, 然后执行这个文件
- 如果我们在相比中执行使用`webpack`其实使用的是全局的`webpack`, 但是我们在不同的项目中使用的`webpack`版本可能不一样, 所以我们需要在不同的项目中使用不同的`webpack`版本, 所以我们需要在不同的项目中安装不同的`webpack`版本, 但是我们又不想在每个项目中安装`webpack`, 所以我们需要一个工具来帮我们解决这个问题, 这个工具就是`npx`
- 我们直接使用`npx`那么执行的就是当前项目中的`node_modules/.bin/`中的文件


## 4. 发布自己的包

- 将自己的代码写好, 配置`package.json`文件, 然后执行`npm publish`就可以发布自己的包了


```json
// package.json
{
  "name": "hy_test_utils",
  "version": "1.1.0",
  "description": "a test utils",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "author": "coderhzy",
  "license": "MIT",
  "repository": {
    "type": "git",
    "url": "https://github.com/codehzy/codehzy"
  },
  "homepage": "https://github.com/codehzy/codehzy",
  "keywords": [
    "hzy",
    "coderhzy",
    "utils"
  ]
}
```
