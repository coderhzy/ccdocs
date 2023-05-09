## 1. rollup打包基本使用

1. 创建对应文件
   ![](https://imgsbed-1301560453.cos.ap-shanghai.myqcloud.com/blog/20230130114645.png)

2. 编写代码: `/lib/index.js`

```javascript
// index.js
function foo () {
    console.log('foo');
}

export {
    foo
}
```

3. 打包
   ![](https://imgsbed-1301560453.cos.ap-shanghai.myqcloud.com/blog/20230128121542.png)

## 2. 配置rollup.config.js配置文件

1. 创建以下文件
   ![](https://imgsbed-1301560453.cos.ap-shanghai.myqcloud.com/blog/20230130134705.png)
2. **代码展示**

`/lib/utils/math.js`

```javascript
export function sum(a, b) {
  return a + b;
}

export function mul(a, b) {
  return a * b;
}
```

`/lib/index.js`

```javascript
import { sum,mul } from './utils/math';

function foo () {
    console.log('foo');
    console.log(sum(1,2));
}

export {
    foo,
    sum,
    mul
}
```

`rollup.config.js`: 配置入口和出口

```javascript
module.exports = {
  // 入口
  input: "./lib/index.js",
  // 出口
  output: [
    {
        format: "umd",
        name: "myUtils",
        file: "./build/bundle.umd.js"
    },
    {
        format: 'amd',
        file: './build/bundle.amd.js'
    },
    {
        format: 'cjs',
        file: './build/bundle.cjs.js'
    },
    {
        format: 'iife',
        name:"myUtils",
        file: './build/bundle.browser.js'
    }
  ]
};
```

3. 执行打包命令,会得到刚配置出口的四个文件

```shell
npx rollup -c
```

## 3. 解决node_modules中第三方库打包,会一起打包问题

1. 安装第三方库并引用

```shell
npm i lodash
```

2. 创建对应文件
   ![](https://imgsbed-1301560453.cos.ap-shanghai.myqcloud.com/blog/20230130135826.png)
3. **代码展示**:
   ``
   `/lib/utils/format.js`

```javascript
function formatPrice() {
    return 'R$ 1.000,00'
}

module.exports = {
    formatPrice
}
```

`/lib/index.js`

```javascript
import { sum,mul } from './utils/math';
import { formatPrice } from './utils/format'
import _ from 'lodash'
function foo () {
    console.log('foo');
    console.log(sum(1,2));
    console.log(formatPrice())
    console.log(_.join(['a', 'b', 'c'], '~'));
}

export {
    foo,
    sum,
    mul
}
```

4. 疑问: 这样引入loadsh不会被打包,因为它使用`commonjs`规范,而rollup默认使用**es_module**规范,所以需要配置.
   此时需要两个插件来让其正常打包lodash,分别是`@rollup/plugin-commonjs`,`@rollup/plugin-node-resolve`.
   并配置出口的globals让浏览器能识别lodash的`_`,通**external**来排除某个

```javascript
const commonjs = require("@rollup/plugin-commonjs");
const nodeResolve = require("@rollup/plugin-node-resolve")

module.exports = {
  // 入口
  input: "./lib/index.js",
  // 出口
  output: {
    format: "umd",
    name: "myUtils",
    file: "./build/bundle.umd.js",
    globals: {
      lodash: "_",
    }
  },
  external: ["lodash"],
  plugins: [
    commonjs(),
    nodeResolve()
  ]
};
```

## 4. rollup使用babel和terser

`rollup.config.js`

```javascript
const babel = require("@rollup/plugin-babel")
const terser = require("@rollup/plugin-terser");

plugins: [
	commonjs(),
	nodeResolve(),
	babel({ babelHelpers: "bundled",exclude: 'node_modules/**'}),
	terser()
]
```

## 5. rollup打包业务代码

1. 创建对应文件
   ![](https://imgsbed-1301560453.cos.ap-shanghai.myqcloud.com/blog/20230130142756.png)
2. 编写业务代码

对应依赖

```json
  "dependencies": {
    "lodash": "^4.17.21",
    "rollup": "^3.11.0"
  },
  "devDependencies": {
    "@babel/core": "^7.0.0",
    "@babel/preset-env": "^7.20.2",
    "@rollup/plugin-babel": "^6.0.3",
    "@rollup/plugin-commonjs": "^24.0.1",
    "@rollup/plugin-node-resolve": "^15.0.1",
    "@rollup/plugin-terser": "^0.4.0",
    "postcss": "^8.4.21",
    "postcss-preset-env": "^8.0.1",
    "rollup-plugin-postcss": "^4.0.2"
  }
```

`/lib/css/style.css`

```css
body {
    background: skyblue;
    color: #fff;
    font-family: Arial, Helvetica, sans-serif;
    font-size: 12px;
    margin: 0;
    padding: 0;
}

.title {
    color: red;
    user-select: none;
}
```

`/lib/index.js`

```javascript
import { sum,mul,logTitle } from './utils/math';
import { formatPrice } from './utils/format'
import './css/style.css'

function foo () {
    console.log('foo');
    console.log(sum(1,2));
    console.log(formatPrice())
}
foo()

// DOM操作
const titleEl = document.createElement('h2');
titleEl.textContent = 'Hello Rollup';
titleEl.className = 'title';
document.body.appendChild(titleEl);
```

`babel.config.js`

```javascript
module.exports = {
    presets: ["@babel/preset-env"],
}
```

`postcss.config.js`

```javascript
module.exports = {
    plugins: [
        require('postcss-preset-env') 
    ]
}
```

`index.html`

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
   <script src="./build/bundle.umd.js"></script> 
</body>
</html>
```

`rollup.config.js`

```javascript
// 默认 lodash 没有被打包, 是因为它使用commonjs规范, 而rollup默认使用es module规范, 所以需要配置
const commonjs = require("@rollup/plugin-commonjs");
const nodeResolve = require("@rollup/plugin-node-resolve")
const babel = require("@rollup/plugin-babel")
const terser = require("@rollup/plugin-terser");
const postcss = require("rollup-plugin-postcss")

module.exports = {
  // 入口
  input: "./lib/index.js",
  // 出口
  output: {
    format: "umd",
    name: "myUtils",
    file: "./build/bundle.umd.js",
    globals: {
      lodash: "_",
    }
  },
  plugins: [
    commonjs(),
    nodeResolve(),
    babel({ babelHelpers: "bundled",exclude: 'node_modules/**'}),
    terser(),
    postcss()
  ]
};
```

## 6. rollup打包vue代码

1. 安装vue

```shell
npm i vue
```

2. 创建对应文件
   ![](https://imgsbed-1301560453.cos.ap-shanghai.myqcloud.com/blog/20230130144326.png)

3. 编写代码

`/lib/vue/App.vue`

```javascript
<template>
    <div class="app">
        <h2>App计数器, {{ count }}</h2>
        <button @click="handleClick">+1</button>
    </div>
</template>

<script setup>
import { ref } from 'vue'


const count = ref(0)

const handleClick = () => {
    count.value++
}
</script>

<style scoped>

</style>
```

`index.js`

```javascript
import { sum,mul,logTitle } from './utils/math';
import { formatPrice } from './utils/format'
import './css/style.css'
import App from './vue/App.vue'
import {createApp} from 'vue'

function foo () {
    console.log('foo');
    console.log(sum(1,2));
    console.log(formatPrice())
}
foo()

// DOM操作
const titleEl = document.createElement('h2');
titleEl.textContent = 'Hello Rollup';
titleEl.className = 'title';
document.body.appendChild(titleEl);

// 编写vue代码
const app = createApp(App)
app.mount("#app")
```

`index.html`

```html
<div id="app"></div>
```

4. 打包vue需要两个插件: 一个解析vue的插件,另一个给vue中注入mode环境变量. 插件分别是: `rollup-plugin-vue`
   和`rollup-plugin-replace`

`rollup.config.js`

```javascript
const vuePlugin = require("rollup-plugin-vue")
const replace = require('rollup-plugin-replace')

  plugins: [
    commonjs(),
    nodeResolve(),
    babel({ babelHelpers: "bundled",exclude: 'node_modules/**'}),
    terser(),
    postcss(),
    vuePlugin(),
    replace({
      "process.env.NODE_ENV": JSON.stringify("production"),
    })
  ]

```

5. 执行rollup打包命令

```javascript
npx rollup -c
```

## 7. 配置开发服务器

1. 需要借助两个插件,一个是启动服务的插件,一个是reload的插件. `rollup-plugin-serve` , `rollup-plugin-livereload`

`rollup.config.js`

```javascript
const serve = require('rollup-plugin-serve')
const liveReload = require('rollup-plugin-livereload')

plugins: [
	serve({
	  port: 8080,
	  open: true,
	  contentBase: '.',
	}),
	liveReload(),
]
```

**`warning`**: Plugin replace: @rollup/plugin-replace: 'preventAssignment' currently defaults to false. It is
recommended to set this option to `true`, as the next major version will default this option to `true`.

解决办法:  ![](https://imgsbed-1301560453.cos.ap-shanghai.myqcloud.com/blog/20230130150329.png)

## 8. rollup区分开发和生产环境

1. 修改`package.json`

```json
  "scripts": {
    "build": "rollup -c",
    "serve": "rollup -v -w",
    "serve:dev": "rollup -c --environment NODE_ENV:development",
    "serve:pro": "rollup -c --environment NODE_ENV:production"
  },
```

2. 修改`rollup.config.js`

```javascript
// 默认 lodash 没有被打包, 是因为它使用commonjs规范, 而rollup默认使用es module规范, 所以需要配置
const commonjs = require("@rollup/plugin-commonjs");
const nodeResolve = require("@rollup/plugin-node-resolve")
const babel = require("@rollup/plugin-babel")
const terser = require("@rollup/plugin-terser");
const postcss = require("rollup-plugin-postcss")
const vuePlugin = require("rollup-plugin-vue")
const replace = require('@rollup/plugin-replace')
const serve = require('rollup-plugin-serve')
const liveReload = require('rollup-plugin-livereload')

const isPro = process.env.NODE_ENV === 'production'
const plugins = [
    commonjs(),
    nodeResolve(),
    babel({babelHelpers: "bundled", exclude: 'node_modules/**'}),
    postcss(),
    vuePlugin(),
    replace({
        preventAssignment: true,
        'process.env.NODE_ENV': JSON.stringify('production'),
    }),
]

if (isPro) {
    plugins.push(terser())
} else {
    const extraPlugin = [
        serve({
            port: 8080,
            open: true,
            contentBase: '.',
        }),
        liveReload()
    ]
    plugins.push(...extraPlugin)
}

module.exports = {
    // 入口
    input: "./lib/index.js",
    // 出口
    output: {
        format: "umd",
        name: "myUtils",
        file: "./build/bundle.umd.js",
        globals: {
            lodash: "_",
        }
    },
    plugins: plugins
};
```