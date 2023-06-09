# JavaScript模块化


## 1. 什么是模块化

- 初始的JavaScript是没有模块化的, 因此不同文件声明同一个变量会导致变量被覆盖


## 1.1 require细节

- require是同步加载模块, 会阻塞后面代码的执行, 直到模块加载完毕
- 查找规则
  - 情况1:X是一个Node核心模块
    - 比如path、http: 直接返回核心模块，并且停止查找
  - 情况2: X以"./"或者"../"开头
    - 1. 如果有后缀名，按照后缀名的格式查找对应的文件
    - 2. 如果没有后缀名，会按照如下顺序
      - 直接查找文件X
      - 查找X.js文件
      - 查找X.json文件
      - 查找X.node文件
    - 3. 没有找到对应的文件，将X作为一个目录，查找目录下的index文件
      - 查找index.js文件
      - 查找index.json文件
      - 查找index.node文件
  - 情况3: 直接是一个X(没有路径)，并且X不是一个核心模块
    - 从绝对路径查找

## 2. CommonJS


### 2.1 什么是commonJs

- commonJS是一种模块化规范, 用于服务器端的模块化, 由于服务器端的模块文件都存放在本地磁盘, 所以加载速度很快, 不需要考虑异步加载的问题, 所以commonJS规范就是同步加载模块
- commonJS规范规定, 每个模块内部, module变量代表当前模块, 这个变量是一个对象, 它的exports属性是对外的接口, 加载某个模块, 实际上是加载该模块的module.exports属性
- 一个模块想要对外暴露变量(函数也是变量), 可以用module.exports = variable; 一个模块要引用其他模块暴露的变量, 用var ref = require('module_name'); 引入的变量就是那个模块的module.exports属性
- commonJS模块的特点如下:
  - 所有代码都运行在模块作用域, 不会污染全局作用域
  - 模块可以多次加载, 但是只会在第一次加载时运行一次, 然后运行结果就被缓存了, 以后再加载就直接读取缓存结果, 要想让模块再次运行, 必须清除缓存
  - 模块加载的顺序, 按照其在代码中出现的顺序


```js
// a.js
var a = 1;

function add() {
  a++;
}

function get() {
  console.log(a);
}

module.exports = {
  add: add,
  get: get
}

// b.js

var a = require('./a.js');

a.add();
a.get();

// c.js

var a = require('./a.js');

a.get();
```

- 上述代码中, a.js是一个模块, 里面有一个变量a, 还有两个方法add和get, add方法是对变量a进行自增, get方法是打印变量a的值, 然后通过module.exports将这三个变量暴露出去
- b.js和c.js都是模块, 通过require方法引入a.js模块, 然后就可以使用a.js模块中暴露出来的变量和方法了


### 2.2 CommonJS的缺点

- 加载模块是同步
  - 同步的意味着只有等到对应的模块加载完毕，当前模块中的内容才能被运行
  - 这个在服务器不会有什么问题，因为服务器加载的js文件都是本地文件，加载速度非常快;
- 不能直接在浏览器中运行
  - 浏览器加载js文件需要先从服务器将文件下载下来，之后再加载运行
  - 那么采用同步的就意味着后续的js代码都无法正常运行，即使是一些简单的DOM操作
- 浏览器中，我们通常不使用CommonJS规范
  - 在webpack中使用CommonJS是另外一回事
  - 它会将我们的代码转成浏览器可以直接执行的代码;


## 3. AMD(Asynchronous Module Definition)

- 异步加载模块
- AMD规范是commonJS规范的一个补充, 由于commonJS规范是同步加载模块, 所以在浏览器端使用时会有性能问题, 因此AMD规范就是为了解决这个问题而出现的
- AMD规范规定, 模块必须按照依赖顺序加载, 也就是说, 模块加载器会在加载某个模块之前, 先加载这个模块的所有依赖, 并且依赖加载完后, 就会执行模块的回调函数
- 依赖第三方库: https://github.com/requirejs/requirejs

```js
// index.html
<script src="./lib/require.js" data-main="./src/main.js"></script>


// main.js
require.config({
  baseUrl: '',
  paths: {
    foo: "./src/foo",
    bar: "./src/bar"
  }
})

require(["foo", "bar"], function(foo) {
  console.log("main:", foo)
})


// foo.js
define(function() {
  const name = "hzy"
  const age = 18
  function sum(num1, num2) {
    return num1 + num2
  }

  return {
    name,
    age,
    sum
  }
})

// bar.js
define(["foo"], function(foo) {
  console.log("bar:", foo)
})
```

## 4. CMD规范

- CMD规范和AMD规范很像, 都是为了解决commonJS规范在浏览器端的性能问题, 但是CMD规范和AMD规范的区别在于, AMD规范是提前执行, 而CMD规范是延迟执行, 只有在用到某个模块时, 才会去加载该模块
- 依赖第三方库: SeaJS

```js
// index.html

<script src="./lib/sea.js"></script>
<script>
  seajs.use("./src/main.js")
</script>


// main.js
define(function(require, exports, module) {
  const foo = require("./foo")
  console.log("main:", foo)
})

// foo.js
define(function(require, exports, module) {
  const name = "hzy"
  const age = 18
  function sum(num1, num2) {
    return num1 + num2
  }

  // exports.name = name
  // exports.age = age

  module.exports = {
    name,
    age,
    sum
  }
});
```

## 5. ES Module
- 使用webpack打包, esModule中可以导入commonjs模块

```js
// bar.js
const name = "bar"
const age = 100

// es module导出
export {
  name,
  age
}


// foo.js
const name = "foo"
const age = 18

// commonjs导出
module.exports = {
  name,
  age
}


// index.js
// es module导入
// import { name, age } from './foo'

// console.log(name, age)

// commonjs导入 - 使用webpack打包, esmodule中可以导入commonjs模块
const bar = require("./bar")
console.log(bar.name, bar.age)
```


### 6. 详解ES Module

- 文章: https://hacks.mozilla.org/2018/03/es-modules-a-cartoon-deep-dive/
- ES Module的解析流程

- 总共三个阶段
  - 阶段一: 构建(Construction)，根据地址查找js文件，并且下载，将其解析成模块记录(Module Record);
  - 阶段二: 实例化(Instantiation)，对模块记录进行实例化，并且分配内存空间，解析模块的导入和导出语句，把模块指向 对应的内存地址。
  - 阶段三: 运行(Evaluation)，运行代码，计算值，并且将值填充到内存地址中;运行(Evaluation)，运行代码，计算值，并且将值填充到内存地址中;

- 阶段一: 构建阶段
![](https://imgsbed-1301560453.cos.ap-shanghai.myqcloud.com//blog202306081257807.png)

- 阶段二三: 实例化阶段和运行阶段
![](https://imgsbed-1301560453.cos.ap-shanghai.myqcloud.com//blog202306081258339.png)
