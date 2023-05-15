## 1. JavaScript 应用场景

1. Web 开发
   1. 原生 JavaScript
   2. React 开发
   3. Vue 开发
2. 移动端开发
   1. ReactNative
   2. Weex
3. 小程序端开发
   1. 微信小程序
   2. 支付宝小程序
   3. uniapp
   4. taro
4. 桌面应用开发
   1. Electron (比如 VSCode)
5. 后端开发
   1. Node 环境(比如 express、koa、egg.js)

## 2. JavaScript 核心知识点

### 2.1 面向对象

- JavaScript 面向对象、继承、 原型、原型链等

### 2.2 函数、闭包

- 闭包的访问规则
- 闭包的内存泄露
- 函数中 this 的指向

### 2.3 ES 新特性

- ES6、7、8、9、10、11、12 新特性

### 2.4 作用域

- 作用域的理解
- 作用域提升
- 块级作用域
- 作用域链
- AO、GO、VO 等概念

### 2.5 其他一系列知识

- 事件循环
- 微任务
- 宏任务
- 内存管理
- Promise
- await、 asnyc
- 防抖、节流等等

## 3. JavaScript 高级语言是怎么被执行的

### 3.1 语言被系统转换并执行

![](https://imgsbed-1301560453.cos.ap-shanghai.myqcloud.com//blog202305061311119.png)

- 高级语言 -> 汇编语言 -> 机器语言

### 3.2 浏览器的工作原理

![](https://imgsbed-1301560453.cos.ap-shanghai.myqcloud.com//blog202305061312902.png)

- 输入服务器地址
- 访问 index.html
- 下载 css + 下载 JavaScript

### 3.3 浏览器的内核

> 浏览器内核指的是浏览器排版引擎

- Gecko
- Trident
- Webkit
- Blink

### 3.4 浏览器渲染引擎

![](https://imgsbed-1301560453.cos.ap-shanghai.myqcloud.com//blog202305070900008.png)

1. 将 html 进行**解析**, 将其转换成 DOMTree
2. 将 css 进行**解析**, 将其转换成 styleRules
3. 将两者合并, 通过 layout 进行布局排版, 形成渲染树
4. 通过浏览器`Painting`, 最终渲染到浏览器上

### 3.5 V8 引擎原理

![](https://imgsbed-1301560453.cos.ap-shanghai.myqcloud.com//blog202305070904137.png)

1. 解析(parse): 词法分*生成 tokens*和语法分析
   1. ![](https://imgsbed-1301560453.cos.ap-shanghai.myqcloud.com//blog202305070908088.png)
2. 形成抽象语法树(AST)
3. 通过*Ignition*转换成字节码*bytecode*.
4. _TurboFan_: 追踪热点函数标记为(hot), 记录对应的机器指令, 下次再执行代码时候,直接执行这个机器指令. 如果此时机器码受到操作设备问题, 那么通过**Deoptimization**将机器码转换成字节码, 再进行转换为汇编 -> 机器码.

### 3.6 v8 引擎架构

![](https://imgsbed-1301560453.cos.ap-shanghai.myqcloud.com//blog202305070932678.png)

1. `Blink`内核,加载 html, 下载 JavaScript 代码. 通过`stream流方式`传递给 V8 引擎.
2. 通过*Scanner 扫描器*, 转化成 **tokens**. 将 tokens 给 Parser, **Parser**将其转换成**AST 树**.
3. 再通过*Ignition*来将其转换成字节码, 最后转换成**CPU 可以执行的指令**
4. 图上方的`PerParser`
   1. ![](https://imgsbed-1301560453.cos.ap-shanghai.myqcloud.com//blog202305070938502.png)

## 4. JavaScript 代码执行原理

![](https://imgsbed-1301560453.cos.ap-shanghai.myqcloud.com//blog202305070904137.png)

1. 从源代码 到 AST 这一步, V8 引擎内部会帮助我们创建一个对象(GlobalObject -> go) 并附带 window
2. 运行代码:
   1. v8 为了执行代码,内部有个**执行上下文栈**(Execution Context Stack, EC Stack)(函数调用栈)
   2. 为了执行全局代码, V8 会创建`GO(Golbal Execution Context)`. 在 GO 中执行代码,又会有`VO(Variable Object)`, 对于执行全局代码执行时,此时的`VO===GO`. 从而再执行代码
   3. 如果执行代码时候,有函数则对函数单独生成`函数执行上下文(FEC) - Functional Execution Context`, 并在函数内部定义一个`VO===AO`, 此时还会加一个`作用域链`**scope chain = VO + ParentScope**, 也就是所谓的函数作用域.
      ![](https://imgsbed-1301560453.cos.ap-shanghai.myqcloud.com//blog202305102301226.png)

### 4.1 环境变量

- VO
  ![](https://imgsbed-1301560453.cos.ap-shanghai.myqcloud.com//blog202305102339974.png)

## 5. 垃圾回收

### 5.1 引用计数

1. 当 a 被 b 引用, 那么 a 计数加一, a 再被 c 引用, 计数再加一. 手动将引用设置为 null, 则计数减一. 当计数为 0,则被清除
2. **引用计数缺陷**: 两个对象存在循环引用的问题, 那么这内存永远不会被释放.

### 5.2 标记清除

1. 算法从设置一个根对象, 垃圾回收期会定期从这个根开始, 找所有从根开始有引用到的对象,对于哪些没有引用到的对象,就认为是不可用的对象.
