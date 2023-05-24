# 严格模式和面向对象

## 1. 严格模式


### 1.1 严格模式的作用

- 消除 Javascript 语法的一些不合理、不严谨之处，减少一些怪异行为
- 消除代码运行的一些不安全之处，保证代码运行的安全
- 提高编译器效率，增加运行速度
- 为未来新版本的 Javascript 做好铺垫
- 严格模式是 ES5 引入的，从此所有新版本的 Javascript 都是严格模式
- ES6 的模块自动采用严格模式，不管你有没有在模块头部加上 "use strict"


### 1.2 严格模式使用方式

- 全局使用
  - 在脚本文件开头加上 "use strict"
  - 在函数体开头加上 "use strict"
  - 严格模式下，函数内部的 this 不能指向全局对象
  - 严格模式下，函数内部的 this 为 undefined

```js
'use strict'
```


## 2. 面向对象


### 2.1 面向对象的概念

- 面向对象是一种编程思想，是一种编程范式


### 2.2 数据属性描述符

- 数据属性描述符是一个对象，用来描述一个属性的特征
- 数据属性描述符有 4 个特性
  - configurable: 是否可以删除，默认值为 true
  - enumerable: 是否可以枚举，默认值为 true. 如果为 false, 不能使用 `for...in` 和 `Object.keys()` 遍历
  - writable: 是否可以修改，默认值为 true
  - value: 属性的值，默认值为 undefined. value和get/set不能同时存在
- 阻止对象扩展
  - `Object.preventExtensions(obj)` 阻止对象扩展
  - Object.seal(obj) 密封对象,不可删除
  - Object.freeze(obj) 冻结对象,不可删除,不可修改



```js
var obj = {
  name: "why",
  age: 18,
  _address: "南京市",
};

Object.defineProperty(obj, "address", {
  enumerable: true,
  configurable: true,
  get: function () {
    foo();
    return this._address;
  },
  set: function (value) {
    bar();
    this._address = value;
  },
});

console.log(obj.address);

obj.address = "1231231";

function foo() {
  console.log("获取了一次address的值");
}

function bar() {
  console.log("设置了address的值");
}

// console.log
// 获取了一次address的值
// 南京市
// 设置了address的值
```


### 2.3 new 操作符


- new 调用函数，会经历以下 5 个步骤
  - 创建一个新对象
  - 将对象内部的`[[Prototype]]`指向构造函数的 `prototype` 属性
  - 将构造函数的作用域赋给新对象（因此 this 就指向了这个新对象）
  - 执行构造函数中的代码（为这个新对象添加属性）
  - 返回新对象


```js
function Person(name, age, height, address) {
  this.name = name;
  this.age = age;
  this.height = height;
  this.address = address;

  this.eating = function () {
    console.log(this.name + " eating");
  };

  this.running = function () {
    console.log(this.name + " running");
  };
}

const p1 = new Person("张三", 18, 1.88, "南京市");
const p2 = new Person("lisi", 97, 1.88, "南京市");

console.log(p1);
console.log(p2);
p1.eating();
p2.running();
//  Person {
//     name: '张三',
//     age: 18,
//     height: 1.88,
//     address: '南京市',
//     eating: [Function (anonymous)],
//     running: [Function (anonymous)]
//   }
//   Person {
//     name: 'lisi',
//     age: 97,
//     height: 1.88,
//     address: '南京市',
//     eating: [Function (anonymous)],
//     running: [Function (anonymous)]
//   }
//   张三 eating
//   lisi running
```
