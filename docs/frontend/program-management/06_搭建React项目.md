---
title: 搭建React项目
description: 搭建React项目
publishedAt: '2023-01-03'
lastUpdated: '2023-01-03'
tags: 'deploy'
---

## 1. 使用脚手架创建项目
1. 使用脚手架创建typescript项目
```shell
npx create-react-app demo1 --template typescript
```
2. 删除不必要的文件
## 2. .editorconfig
1. 根目录下创建`.editorconfig`复制进去
```shell
# https://editorconfig.org

root = true

  

[*]

charset = utf-8

end_of_line = lf

indent_size = 2

indent_style = space

insert_final_newline = true

max_line_length = 80

trim_trailing_whitespace = true

  

[*.md]

max_line_length = 0

trim_trailing_whitespace = false

  

[COMMIT_EDITMSG]

max_line_length = 0
```
## 3. prettier
1. 根目录下创建`.prettierrc`
```javascript
{
	"useTabs": false,
	"tabWidth": 2,
	"printWidth": 80,
	"singleQuote": true,
	"trailingComma": "none",
	"semi": false
}
```
2. 根目录下创建`.prettierignore`
```javascript
# dependencies
/node_modules

# static
/public

# debug
npm-debug.log*
yarn-debug.log*
yarn-error.log*
```
3. 在项目中安装`prettier`
```shell
npm i prettier -D
```
在`package.json`中添加`prettier`脚本
```json
"scripts": {
	"prettier": "prettier --write .",
}
```
## 4. 配置@路径
1. 安装`@craco/craco`
```shell
npm i @craco/craco -D
```
2. 根目录创建`craco.config.js`
```javascript
const path = require('path')
const resolve = (dir) => path.resolve(__dirname, dir)

module.exports = {
	webpack: {
		alias: {
			'@': resolve('src'),
			'@components': resolve('src/components')
		}
	}
}
```
3. 配置`tsconfig.json`
```json
"compilerOptions": {
	"baseUrl": ".",
	"paths": {
		"@/*": ["src/*"]
	}
}
```
## 5. husky + lint-staged
1. 安装husky
```shell
npm install husky -D
```
2. 然后执行脚本: 这个命令会在**package.json**的**scripts**字段里加一条 `{ "prepare": "husky install" }`
```shell
npm set-script prepare "husky install"
```
3. 安装`lint-staged`
```shell
npm install lint-staged -D
```
4. 配置`package.json`
```json
"scripts": {
	"start": "craco start",
	"build": "craco build",
	"test": "craco test",
	"prettier": "prettier --write .",
	"prepare": "husky install",
	"lint": "lint-staged",
},
"lint-staged": {
	"*.{js,jsx}": [
		"eslint --fix",
		"git add"
	]
},
```
## 6. commitlint
1. 安装代码校验依赖
```shell
npm i commitlint @commitlint/config-conventional -D
```
2. 初始化 **husky**
```shell
npx husky add .husky/commit-msg 'npx --no-install commitlint --edit "$1"'
```
3. 跟目录下创建`commitlint.config.js`
```javascript
module.exports = {
	extends: ['@commitlint/config-conventional'], // 检测规则
	rules: {}
}
```
4. 配置package.json
```json
"script": {
	"commit": "git-cz"
}
```
5. 执行`npm run commit`来提交代码
## 7. 配置eslint
1. 安装eslint
```shell
npm i eslint -D
```
3. 初始化eslintrc文件
```javascript
npx eslint --init
```
3. 安装pritter配合eslint
```shell
npm i eslint-plugin-prettier eslint-config-preitter -D
```
4. 修改`vscode - setting-json`
```json
"eslint.lintTask.enable": true,
"eslint.alwaysShowStatus": true,
"editor.codeActionsOnSave": {
	"source.fixAll": true
},
"eslint.validate": [
	"javascript",
	"javascriptreact",
	"typescript",
	"typescriptreact",
	"svelte"
],
```