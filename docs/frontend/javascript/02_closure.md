# 02\_闭包模型-内存泄漏

## 1. 形成闭包的条件

- 闭包让你可以在一个内层函数中访问到其外层函数的作用域
- 闭包跟函数是最大的区别在于,当捕捉闭包的时候. 它的 **自由变量** 会在捕捉被确定, 这样即使脱离的捕捉时的上下文, 它能照常运行.
- 从广义来讲: JavaScript 中的函数都是闭包
- 从狭义来讲: JavaScript 中的函数只有在使用了外层自由变量的时候才是闭包

```js
function foo() {
  var a = 2;
  function bar() {
    // 闭包: 访问了外层函数的变量
    console.log(a);
  }
  return bar;
}

var fn = foo();
fn(); // 2
```

![](https://imgsbed-1301560453.cos.ap-shanghai.myqcloud.com//blog202305170845391.png)

## 2. 数组中函数的使用

- filter
- map
- forEach
- reduce
- find/findIndex

## 3. 闭包导致的内存泄露

### 3.1 引用大量闭包

```js
function createFnArray() {
  var arr = new Array(1024 * 1024).fill(1);
  return function () {
    console.log(arr.length);
  };
}

var arrayFn = [];

for (var i = 0; i < 300; i++) {
  arrayFn.push(createFnArray());
}

setTimeout(function () {
  arrayFn = null;
}, 3000);
```

- 此函数会导致浏览器加载时候,出现大量的内存占用,并且不能被回收
- 由于闭包的存在,导致函数内部的变量无法被回收

![](https://imgsbed-1301560453.cos.ap-shanghai.myqcloud.com//blog202305171103241.png)

### 3.2 没有用的闭包变量(销毁情况)

```js
function foo() {
  var name = "asd";
  var age = 14;

  function bar() {
    console.log(name);
  }

  return bar;
}

var fn = foo();
fn();
```

- 上面代码 因为 age 没有被使用, `JS 引擎会自动将其销毁`
