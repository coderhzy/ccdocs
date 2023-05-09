### 1. [Webpack](https://github.com/coderhzy/webapck)

1. 初始化npm,安装webpack

```shell
npm install webpack webpack-cli
```

2. 项目根目录创建`webpack.config.js`

```javascript
const path = require('path');

module.exports = {
    mode: "production", // 打包环境: 为production会额外加入一些配置
    entry: './src/main.js', // 入口文件
    ouput: {
        path: path.resolve(__dirname, './build'),
        filename: 'bunde.js'
    }
}
```

3. source-map
   **development**: 打包会有正常的source-map
   **production**: 打包以后source-map是看不到的

> 设置source-map

3.1 production

```javascript
const path = require('path');

module.exports = {
    mode: "production", // 打包环境: 为production会额外加入一些配置
    devtool: "source-map",
    entry: './src/main.js', // 入口文件
    ouput: {
        path: path.resolve(__dirname, './build'),
        filename: 'bunde.js'
    },
}
``` 

**生成的source-map文件**: [devtools配置](https://webpack.js.org/configuration/devtool/##devtool)
![](https://imgsbed-1301560453.cos.ap-shanghai.myqcloud.com/blog/20230117142323.png)
![](https://imgsbed-1301560453.cos.ap-shanghai.myqcloud.com/blog/20230117142537.png)

## 2 . babel

### 2.1 babel-loader和babel使用

```shell
## 转化块级作用域
npm i @babel/plugin-transform-block-scoping
npx babel ./src --out-dir ./dist --plugins=@babel/plugin-transform-block-scoping


## 转化箭头函数
npm i plugin-transform-arrow-functions
npx babel ./src --out-dir ./dist --plugins=@babel/plugin-transform-block-scoping,plugin-transform-arrow-functions

## babel预设
npm i @babel/preset-env
npx babel ./src --out-dir ./dist --plugins=@babel/preset-env
```

### 2.2 在webpack中使用babel-loader

```JavaScript
const path = require('path')

module.exports = {
    entry: './src/main.js',
    devtool: false, // 是否需要source-map
    output: {
        path: path.resolve(__dirname, './build'),
        filename: 'bundle.js',
        // 重新打包时,先将之前打包的文件夹删除掉
        clean: true
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        // plugins: [
                        //     "@babel/plugin-transform-arrow-functions",
                        //     "@babel/plugin-transform-block-scoping"
                        // ],
                        presets: ['@babel/preset-env']
                    }
                }
            }
        ]
    }
}
```

### 2.3 babel底层原理

![](https://imgsbed-1301560453.cos.ap-shanghai.myqcloud.com/blog/20230117153206.png)

3. 浏览器兼容

### 3.1 使用browserslistrc

1. 查询Can i use : [can I use for Browser](https://caniuse.com/usage-table)
2. 对应`.browserslistrc`文件

```
> 0.1%
last 2 versions
not dead
```

3. 在`babel-loader`中设置**target**

```JavaScript
module: {
    rules: [
        {
            test: /\.js$/,
            exclude: /node_modules/,
            use: {
                loader: 'babel-loader',
                options: {
                    // plugins: [
                    //     "@babel/plugin-transform-arrow-functions",
                    //     "@babel/plugin-transform-block-scoping"
                    // ],
                    presets: ['@babel/preset-env', {
                        target: ">5%"
                    }]
                }
            }
        }
    ]
}
```

### 3.2 制定语言特性过程

![](https://imgsbed-1301560453.cos.ap-shanghai.myqcloud.com/blog/20230117164450.png)

### 3.3 babel.config.js

1. 项目根目录创建`babel.config.js`
2. 编辑`babel.config.js`

```JavaScript
module.exports = {
    presets: [
        [
            "@babel/preset-env",
            {
                targets: ">0.1%",
            },
        ],
    ],
};
```

3. webpack打包时候 会自动寻找`babel.config.js`文件导出的`options`a

### 3.4 polyfill

- 介绍: 补丁,垫片

1. 安装

```shell
npm i core-js regenerator-runtime
```

2. 编辑`babel.config.js`给`babel`的预设`@babel/preset-env`
   ![](https://imgsbed-1301560453.cos.ap-shanghai.myqcloud.com/blog/20230117171247.png)
   ![](https://imgsbed-1301560453.cos.ap-shanghai.myqcloud.com/blog/20230117172639.png)

## 4. Webpack其他配置

### 4.1 搭建webpack打包React

1. 安装

```shell
npm i react react-dom
```

2. 编辑react代码
3. 配置`webpack.config.js`:为其添加`htmlWebpackPlugin`以及入口文件. 记得修改**rules**的匹配正则

```JavaScript
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
module.exports = {
    entry: './src/main.js',
    devtool: false, // 是否需要source-map
    output: {
        path: path.resolve(__dirname, './build'),
        filename: 'bundle.js',
        // 重新打包时,先将之前打包的文件夹删除掉
        clean: true
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        // plugins: [
                        //     "@babel/plugin-transform-arrow-functions",
                        //     "@babel/plugin-transform-block-scoping"
                        // ],
                    }
                }
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './index.html'
        })
    ]
}
```

4. 编辑`babel.config.js`添加**react预设**

```shell
npm install @babel/preset-react -D
```

```JavaScript
module.exports = {
    presets: [
        [
            "@babel/preset-env",
            {
                // useBuiltIns: false
                corejs: 3,
                // useBuiltIns: "usage"
                useBuiltIns: "entry" // 防止有第三方包中用了别的不兼容的api,并需要在主入口引入corejs, regenerator-runtime/runtime
            },
        ],
        ["@babel/preset-react"]
    ],
};
```

### 4.2 Typescript打包

> 不推荐使用,因为开发的ts代码需要使用ployfill

1. 安装ts-loader

```shell
npm i ts-loader -D
```

2. 在webpack.config.js中使用配置`ts-loader`

```javascript
  module: {
    rules: [
        {
            test: /\.ts$/,
            exclude: /node_modules/,
            use: {
                loader: "ts-loader"
            }
        }
    ],
}
,
```

3. 使用命令初始化`tsconfig.js文件`

```shell
tsc --init
```

> 推荐使用: babel-loader + @babel/preset-typescript

```
npm i @babel/preset-typescript
```

2. 正常在babel.config.js加入这个loader即可
3. 需要类型校验的时候,在`package.json`中添加ts校验命令

```json
"scripts": {
"ts-check-watch": "tsc --noEmit --watch"
},
```

### 4.3 webpack-dev-server

1. 安装依赖

```shell
npm i webpack-dev-server -D
```

2. 配置package.json来增加启动

```json
  "scripts": {
"serve": "webpack serve --mode development",
"build:dev": "webpack --mode development",
"build:pro": "webpack --mode production",
"test": "echo \"Error: no test specified\" && exit 1",
"ts-check-watch": "tsc --noEmit --watch"
},
```

3. 如果项目中不是的配置文件不是`webpack.config.js`可以使用手动指定

```json
"scripts": {
"serve": "webpack serve --config wk.config.js"
}
```

4. webpack-dev-server原理

- webpack-dev-server: 在编译后不会写入到任何输出文件,而是将`bundle`文件保存留在了内存中
- webpack-dev-server: 事实上使用了一个memfs库

### 4.4 devServer

1. 在index.html直接引入js则需要配置配置一下devServer
2. webpack.config.js

```shell
  devServer:{
    static: ["public"]
  },
```

3. devServer额外的其他设置

```json
  devServer:{
static: ["public"],
liveReload: true,
port: '8888',
open: true,
compress: true
},
```

### 4.5 跨域问题

![](https://imgsbed-1301560453.cos.ap-shanghai.myqcloud.com/blog/20230118080535.png)

```javascript
  devServer:{
    proxy: {
        '/api'
    :
        {
            target: 'http://localhost:9000',
                pathRewrite
        :
            {
                '^/api'
            :
                ''
            }
        ,
            changeOrigin: true
        }
    }
}
,
```

1. client端请求,然后走到devServer配置的proxy
2. devServer会本地起一个node服务器,然后用这个node服务器帮我们去真实的服务器去请求,从而解决跨域问题
3. 因为同源策略的跨域只存在于浏览器端,因此绕过了浏览器的检测,完成了请求
4. 额外的可以使用nginx来配置反向代理,或者server端开启cores

> 容错属性:     historyApiFallback
> 该属性设置true,可以有效的防止history路由找不到情况后的页面报错.设置为true则最懂重定向到服务启动端口

```javascript
  devServer:{
    proxy: {
        '/api'
    :
        {
            target: 'http://localhost:9000',
                pathRewrite
        :
            {
                '^/api'
            :
                ''
            }
        ,
            changeOrigin: true
        }
    }
,
    historyApiFallback: true
}
,
```

## 5. webpack性能优化-代码分离

### 5.1 多包处理

**场景**: webpack配置多个入口进行分包处理,让用户更快进入页面
**代码展示**:

```javascript
module.exports = {
    entry: {
        index: './src/index.js',
        main: './src/main.js'
    },
    devtool: false, // 是否需要source-map
    output: {
        path: path.resolve(__dirname, "./build"),
        filename: "[name]-bundle.js",
        // 重新打包时,先将之前打包的文件夹删除掉
        clean: true,
    },
};
```

### 5.2 多入口依赖相同第三方库

**场景**: 使用多入口打包,想多个入口引入了相同的第三方库.那么会重复打包,我们需要用shared来共享第三方包,单独打包
**代码展示**:

```JavaScript
module.exports = {
    entry: {
        index: {
            import: "./src/index.js",
            dependOn: "shared",
        },
        main: {
            import: "./src/main.js",
            dependOn: "shared",
        },
        shared: ["axios"]
    },
};
```

### 5.3 路由懒加载分包处理

**场景**: 如果有排行榜页面和一个列表页面,那么我们将进去页面 是需要加载这个两个页面的,需要将排行榜页面和列表页面需要单独分包处理.
**代码演示**:

1. 创建router文件夹 西面创建`about.js` 和 `category.js`
2. 在main.js导入并模拟路由切换

```javascript
// .about.js
const h1 = document.createElement('h1');
h1.textContent = 'About';
document.body.appendChild(h1);

// .category.js
const h2 = document.createElement('h2');
h2.textContent = 'Category';
document.body.appendChild(h2);

// main.js
const btn1 = document.createElement('button')
const btn2 = document.createElement('button')
btn1.textContent = 'about'
btn2.textContent = 'category'
document.body.appendChild(btn1)
document.body.appendChild(btn2)

btn1.onclick = () => {
    import('./router/about').then(res => {
        console.log(res);
    })
}

btn2.onclick = () => {
    import('./router/category').then(res => {
        console.log(res);
    })
}
```

3. 给打包的模块分包重命名: **魔法注释**

```javascript
// main.js

btn1.onclick = () => {
    import(/* webpackChunkName: "about"*/ './router/about').then(res => {
        res.default()
    })
}

btn2.onclick = () => {
    import(/* webpackChunkName: "category" */'./router/category').then(res => {
        console.log(res);
    })
}

// webpack.config.js
output: {
    path: path.resolve(__dirname, "./build"),
        filename
:
    "[name]-bundle.js",
        // 重新打包时,先将之前打包的文件夹删除掉
        clean
:
    true,
        chunkFilename
:
    '[name]_chunk.js'
}
,
```

### 5.4 webpack-spilt第三方包

**场景**: 将第三方库单独分包出去

```JavaScript
// 优化配置
optimization: {
    // 代码分割
    splitChunks: {
        chunks: 'all',
    }
,
}
,
```

额外属性

```JavaScript
  optimization: {
    chunkIds: "named",
        // 代码分割
        splitChunks
:
    {
        chunks: "all",
            // maxSize: 20000,
            // minSize: 10000,
            cacheGroups
    :
        {
            vendors: {
                test: /[\\/]node_modules[\\/]/,
                    priority
            :
                -10,
                    filename
            :
                "[name]_vendors.js",
            }
        ,
            utils: {
                test: /[\\/]src[\\/]utils[\\/]/,
                    priority
            :
                -20,
                    filename
            :
                "[name]_utils.js",
            }
        ,
            src: {
                test: /[\\/]src[\\/]/,
                    priority
            :
                -30,
                    filename
            :
                "[name]_src.js",
            }
        }
    ,
    }
,
}
,
```

### 5.5 浏览器空闲时下载未用到的包

**分两种情况**

1. preload: 随着主包一起下载,仅仅慢一点与主包
2. prefetch: 主包先下载,然后在浏览器空闲的地方再下载

### 5.6 将某些包引入为cdn,不在进入打包,增加网站访问速度

**解决办法**: 配置`webpack`的`externals`, 并在index.html中引入

```javascript

// webpack.config.js
// key为我们在代码中导入的值
// value为cdn注册在全局变量的值
externals: {
    react: 'React',
        axios
:
    'axios',
        'react-dom'
:
    'ReactDOM'
}
,
```

```html
<!-- index.html -->
<body>
<div id="app"></div>

<script src="./abc.js"></script>

<script src="https://cdn.bootcdn.net/ajax/libs/axios/1.2.2/axios.js"></script>
<script src="https://cdn.bootcdn.net/ajax/libs/react/18.2.0/umd/react.development.js"></script>
<script src="https://cdn.bootcdn.net/ajax/libs/react-dom/18.2.0/umd/react-dom.development.js"></script>
</body>
```

### 5.7 第三方库引用另外第三方库,配置导入(很少用)

- 此为垫片,及时你没引入,其实也可以使用. *垫片,无需引入,直接使用*

```javascript
// webpack config.js
const {ProvidePlugin} = require("webpack");
plugins: [
    new HtmlWebpackPlugin({
        template: "./index.html",
    }),
    new ProvidePlugin({
        React: "react",
        ReactDOM: "react-dom",
        axios: "axios",
        dayjs: "dayjs"
    }),
],
```

- **使用dayjs**: 垫片

```javascript
const now = dayjs().format('YYYY-MM-DD HH:mm:ss')
console.log('使用dayjs获取最新值', now);
```

![](https://imgsbed-1301560453.cos.ap-shanghai.myqcloud.com/blog/20230118170220.png)

### 5.8 CSS打包 并将其提取到单独的css文件中

1. 需要借助`MiniCssExtractPlugin`插件来完成
2. 安装

```shell
npm i mini-css-extract-plugin style-loader css-loader
```

4. 代码演示

```css
/* .abc.css */
body {
    background-color: skyblue;
    color: red;
}

button {
    background-color: purple;
    color: white;
}
```

```javascript
// webpack.config.js
module: {
    rules: [
        {
            test: /\.css$/,
            use: [
                // 'style-loader',
                MiniCssExtractPlugin.loader,
                "css-loader",
            ],
        },
    ],
}
,
plugins: [
    new MiniCssExtractPlugin({
        filename: "[name].css",
    }),
],
```

### 5.9 hash值

1. cotenthash: 一个文件引入另外一个文件,改变这个文件,重新打包,不会让被引入的文件重新打包
2. chunkhash: 打包时候,全量重新打包

## 6. webpack打包-性能优化-JS-CSS

### 6.1 压缩代码 js和css

- `Terser` 这个插件是使用拷贝了`uglify-js`代码,并扩展了功能

```shell
npm i terser -D

npx terser ./terser-test/abc.js -o ./terser-test/abc.min.js

npx terser ./terser-test/abc.js -o ./terser-test/abc.min.js -c arrows=true

npx terser ./terser-test/abc.js -o ./terser-test/abc.min.js -c arrows=true,auguments=true

npx terser ./terser-test/abc.js -o ./terser-test/abc.min.js -c arrows=true,auguments=true,dead=true

npx terser ./terser-test/abc.js -o ./terser-test/abc.min.js -c arrows=true,auguments=true,dead=true -m toplevel=true
```

- 在webpack中使用`TerwebpackPlugin`, 压缩javascript代码

```javascript
optimization: {
    minimize: true,
        minimizer
:
    [
        new TerserPlugin({
            extractComments: false,
            terserOptions: {
                compress: {
                    arguments: true
                }
            }
        })
    ]
}
```

- 压缩css: 底层使用cssnano

```shell
npm i css-minimizer-webpack-plugin -D
```

```javascript
optimization: {
    minimize: true,
        minimizer
:
    [
        new TerserPlugin({
            extractComments: false,
            terserOptions: {
                compress: {
                    arguments: true
                }
            }
        }),
        new CSSMinimizerPlugin()
    ]
}
```

### 6.2 tree-shaking

### 1. usedExports

**场景**: 通常我们使用某个文件中导出的多个函数,如果一个文件中的函数被导出. 但是后面并没有被使用,也没有被导入.
*那么其实这段代码是不需要的, 我们希望将其删除*, 这就我们需要的`Tree-shaking`
**代码展示**:  或者配置的mode为production时候,不需要单独设置这个属性. production打包会默认`tree-shaking`

```javascript
module.exports = {
    optimization: {
        usedExports: true,
    }
}
```

### 2. sideEffects

**场景**: 副作用的函数不被打包,在javascript中 我们推荐按照纯模块来编写代码,即不会影响全局
**代码展示**:

```javascript
// package.json
{
    "sideEffects"
:
    false // tree-shaking所有
}

// 或者

{
    "sideEffects"
:
    [
        "*.css"
    ] // tree-shaking除去所有css
}
```

### 3. css-tree-shaking

**场景**: 未有对应的选择器的样式,进行`tree-shaking`
**安装**:

```shell
npm i purgecss-webpack-plugin
```

**代码展示**:

```javascript
const glob = require('glob-all')
const path = require('path')
const PATHS = {
    src: path.join(__dirname, '../src')
}

console.log(PATHS.src);


new PurgeCSSPlugin({
    paths: glob.sync(`${PATHS.src}/**/*`, {nodir: true}),
    safelist: function () {
        return {
            standard: ['body']
        }
    }
})
```

### 6.3 将函数打包到同一作用域,提高函数执行速度

**场景**: 根据`rollup`的思想,将多个函数放到同一作用域可以提高代码执行速度
**代码展示**:

```javascript
const webpack = require('webpack')


plugins: [
    new webpack.optimize.ModuleConcatenationPlugin()
]
```

### 6.4  使用gzip压缩打包文件

**场景**: 当打包以后的文件过大,我们采用压缩打包后的文件的方式来提高用户访问浏览器网页的速度.
**安装**:

```shell
npm i compression-webpack-plugin -D
```

**代码展示**:

```javascript
new CompressionPlugin({
    test: /\.js$|\.css$/,
    // threshold: 10240,
    minRatio: 0.8,
    algorithm: 'gzip'
})
```

### 6.5 压缩html

**场景**: 对某些html的一些不需要的属性 以及 注释一类代码进行极致的压缩,我们通常在开发环境不压缩,而是在生产环境才进行压缩html
**代码展示:**

```javascript
  new HtmlWebpackPlugin({
    template: "./index.html",
    minify: isPro ? {
        removeComments: true, // 压缩时候移除注释
        collapseWhitespace: true, // 压缩时候移除空格
        removeAttributeQuotes: true, // 压缩时候移除属性的引号
        removeEmptyAttributes: true, // 压缩时候移除空属性
        removeRedundantAttributes: true, // 压缩时候移除多余属性
    } : false,
}),
```

### 6.6 对打包速度进行分析

**场景**: 当我们想具体知道,打包的每一个模块的具体时间,借助`speed-measure-webpack-plugin`插件来完成
**安装**:

```shell
npm i speed-measure-webpack-plugin -D
```

**代码展示**:    生产环境下使用`MiniCssExtractPlugin.loader`和`SpeedMeasurePlugin`互斥

```javascript
const SpeedMeasurePlugin = require('speed-measure-webpack-plugin')

const smp = new SpeedMeasurePlugin()


module.exports = function (env) {
    const isPro = env.production
    let mergeConfig = isPro ? prodConfig : devConfig
    const finalConfig = merge(getCommonConfig(isPro), mergeConfig)
    return smp.wrap(finalConfig)
}
```

![](https://imgsbed-1301560453.cos.ap-shanghai.myqcloud.com/blog/20230122223057.png)

### 6.7 webpack-analyse

**场景**: 分析webpack打包后的产物,并且一图形化的方式来显示各个模块之间的依赖关系.
**安装**:

```shell
git clone git@github.com:webpack/analyse.git
```

**代码展示**:

```shell
npm run dev
```

### 6.8 webpack-bundle-analyzer

**场景**: webpack官方推荐分析工具
**安装**:

```shell
npm i webpac-bundle-analyzer
```

**代码展示**:

```javascript
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin

plugins: [
    new BundleAnalyzerPlugin()
]
```