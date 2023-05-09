# JavaScript

## 1.箭头函数和普通函数有什么区别

1. 写法不同，箭头函数使用箭头定义，写法简洁。 普通函数使用 function 定义。
2. 箭头函数都是匿名函数，而普通函数既可以是匿名函数，也可以是具名函数。
3. 箭头函数不能作为构造函数来使用，普通函数可以用作构造函数，以此来创建一个对象的实例。
4. this 指向不同，箭头函数没有 this，在声明的时候，捕获上下文的 this 供自己使用，一旦确定不会再变化。在普通函数中，this 指向调用自己的对象，如果用在构造函数，this 指向创建的对象实例。普通函数可以使用 call，apply，bind 改变 this 的指向。
5. 箭头函数没有 arguments（实参列表，类数组对象），每一个普通函数在调用后都有一个 arguments 对象，用来存储实际传递的参数。
6. 箭头函数没有原型，而普通函数有。

## 2. 如何判断一个数组是数组

1. `Object.prototype.toString.call(arr)`，判断其是否等于`[object Array]`，顶端判断
2. `Array.isArray(arr)`a

## 3. 颜色拾取器 windows 失焦 Bug

- 问题存在
  - 选择拾色器以后，错误吸取空白地方，会导致`windows`系统无法切换`中英文`。
  - 使用`fixIMEWin`函数，开启一个新的窗口再关闭。**主要就是让浏览器失去焦点**。
  - 解决方法存在问题：过老的浏览器会有闪烁一下的问题。

```html
<body>
  <input type="text" />
  <input type="color" onclick="fixIME" />

  <script>
    function fixIME() {
      // 是否为windows系统
      const isWindows = navigator.platform.indexOf("Win") > -1;
      if (!isWin) {
        return;
      }
      let fixIMEWin = window.open();
      fixIMEWin.close();
    }
  </script>
</body>
```

## 4. 使用 export 具名导出和默认导出区别

## 结论

:::tip
开篇先阐述个结论，建议使用具名导出。不推荐使用默认导出。
:::

1.1 **默认导出的缺点**

- 默认导出编辑器提示不完善
- 默认导出可以任意命名，会导致函数语义不固定。
- 命名风格统一比较困难
- 默认导出对重构不友好，需要手动修改。
- 如一个包，你不知道他哪个功能是默认导出，此时就需要去阅读源码和文档。
- 默认导出不利于`Tree shaking`。

  1.2 **具名导出的优点**

- 具名导出编辑器提示完善
- 具名导出可以使用编辑器自带的命名工具。
- 具名导出，就可以很快找到对应函数和功能。
- 具名导出则利于`Tree shaking`

  1.3 **不适用默认导出的缺点**

- 1. 导出重名问题
  ```JavaScript
  import { Article } from './types'
  import { Article as ArticleComponent } from 'my-design-system'
  ```
- 2. 组件导出
     ![组件导出](https://imgsbed-1301560453.cos.ap-shanghai.myqcloud.com/blog/20220909101029.png)
  ```JavaScript
  export { default as Counter } from './HomeView.vue'
  ```
  作为用户就可以具名使用这个组件了。
  ## 5. 说说你使用 JSON.Stringify 的场景
  1. 存储对象在`localstorage`中
  2. 深拷贝对象
  3. 利用第二个参数可以传入函数来巧妙删除对象中的某个值
  ## 6. 你了解的内存泄漏
  **场景一**: 使用 for 循环来入全局变量,比如循环 1W 次,那么程序在执行的时候则为不可控.此时会内存泄漏.因为全局变量不被设置为`null`,js 的垃圾回收器就不会回收
  **场景二**: 使用 for 循环来一万次`console.log(obj.a)`,也会出现内存不受控制,因为`obj`内存会激增.这也就是很多打包工具会在 `production`环境来配置移除`console.log`的原因.
  **场景三**: 闭包场景: 定义一个函数,这个函数返回另外一个函数.返回的函数是返回一个变量. 那么在全局定义一个`obj`对象,使用`for`循环来给`obj`的每个`key`加入返回的那个对象.
  **场景四**: 定义一个按钮,这个按钮向某个容器中去`appendChild`. 此时我们叫这个容器为`container`. 再定义一个按钮, 是移除`container`的元素. 虽然`container`被移除,但是`container` 依然会依赖其中被添加进去的元素.从而导致内存泄漏.
