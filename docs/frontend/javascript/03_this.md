# this

## 1.指向

### 1.1 this 在全局环境下指向

- 浏览器中的全局对象是 window，所以 this 指向 `window`
- 在 node 环境是 `{}`
  - 👍 原因: module -> 加载 -> 编译 -> 放到一个函数 -> 执行函数的 `apply({})`

## 2. this 绑定

> 汇总

- 默认绑定
  - 函数独立调用，this 指向全局对象
- 隐式绑定
  - 函数调用位置, 是通过对象发起的函数调用, this 指向对象
- 显式绑定
  - call, apply, bind. this 指向绑定的对象, 优先级高于隐式绑定
- new 绑定
  - new 调用一个函数时(构造器), 这个时候 this 是调用这个构造器创建出来的对象

> 1. 默认绑定 - 函数独立调用，this 指向全局对象

- 案例一

```js
function foo() {
  console.log(this); // window
}

function foo2() {
  console.log(this); // window
  foo();
}

function foo3() {
  console.log(this); // window
  foo2();
}

foo3();
```

- 案例 2

```js
var obj = {
  name: "hzy",
  foo: function () {
    console.log(this);
  },
};

var bar = obj.foo;
bar(); // window
```

- 案例 3

```js
function foo() {
  function bar() {
    console.log(this);
  }
  return bar;
}

var fn = foo();
fn(); // window
```

> 2. 隐式绑定 - 函数调用位置, 是通过对象发起的函数调用, this 指向对象

```js
var obj = {
  name: "hzy",
  foo: function () {
    console.log(this.name + "foo");
  },
  running: function () {
    console.log(obj.name + " running");
  },
};

obj.foo(); // hzy foo
obj.running(); // hzy running
```

```js
var obj1 = {
  name: "obj1",
  foo: function () {
    console.log(this);
  },
};

var obj2 = {
  name: "obj2",
  bar: obj1.foo,
};

obj2.bar(); // obj2
```

> 3. 显式绑定 - call, apply, bind. this 指向绑定的对象, 优先级高于隐式绑定

- 案例一:

```js
function foo() {
  console.log("函数调用", this);
}

var obj = {
  name: "hzy",
};

// 直接可以改变this指向
foo.call(obj); // 函数调用 {name: "hzy"}
foo.apple(obj); // 函数调用 {name: "hzy"}
```

- 案例 2:

```js
function sum(a, b) {
  console.log(a + b);
}

sum.call("call", 1, 2); // 3
sum.apply("apply", [1, 2]); // 3
```

- 案例 3:

```js
function foo() {
  console.log(this);
}

// foo.call('aaa')
// foo.call('aaa')
// foo.call('aaa')
// 此时会重复调用call方法, 对其优化为bind

var bar = foo.bind("aaa");
bar(); // aaa
```

### 2.1 this 绑定优先级

> new 绑定 > 显式绑定 > 隐式绑定 > 默认绑定

```js
function foo() {
  console.log(this);
}

var obj = {
  name: "hzy",
  foo: foo.bind("aaa"),
};

obj.foo(); // aaa
```

### 2.2 规则之外的 this 绑定

> apply, call, bind: 当传入 null/undefined 时, this 指向全局对象

```js
function foo() {
  console.log(this);
}

foo.call(null); // window
foo.call(undefined); // window
```

### 2.3 this 的绑定

> 通常: 对象中的方法调用, this 指向对象

```js
// 非箭头函数的代码

var obj = {
  data: [],
  getData: function () {
    var _this = this;
    setTimeout(function () {
      const result = [1, 2, 3];
      _this.data = result;
    }, 1000);
  },
};

obj.getData(); // 1s 后, obj.data = [1, 2, 3]
```

> 箭头函数: this 指向定义时所在的对象 - 此时为 this 解决的问题

```js
// 箭头函数的代码
var obj = {
  data: [],
  getData: function () {
    setTimeout(function () {
      const result = [1, 2, 3];
      this.data = result;
    }, 1000);
  },
};

obj.getData(); // 1s 后, obj.data = [1, 2, 3]
```

## 3. this 对应面试题

### 3.1 面试题一:

```js
var name = "window";

var person = {
  name: "person",
  sayName: function () {
    console.log(this.name);
  },
};

function sayName() {
  var sss = person.sayName;
  sss(); // window: 函数独立调用
  person.sayName(); // person : 隐式调用
  person.sayName(); // person : 隐式调用
  (b = person.sayName)(); // window : 赋值表达式(函数独立调用)
}

sayName();
```

### 3.2 面试题二

```js
var name = "window";

var person1 = {
  name: "person1",
  foo1: function () {
    console.log(this.name);
  },
  foo2: () => console.log(this.name),
  foo3: function () {
    return function () {
      console.log(this.name);
    };
  },
  foo4: function () {
    return () => {
      console.log(this.name);
    };
  },
};

var person2 = { name: "person2" };

// person1.foo1(); // person1(隐式绑定)
// person1.foo1.call(person2); // person2(显示绑定优先级大于隐式绑定)

// person1.foo2(); // window(不绑定作用域,上层作用域是全局)
// person1.foo2.call(person2); // window

// person1.foo3()(); // window(独立函数调用)
// person1.foo3.call(person2)(); // window(独立函数调用)
// person1.foo3().call(person2); // person2(最终调用返回函数式, 使用的是显示绑定)

// person1.foo4()(); // person1(箭头函数不绑定this, 上层作用域this是person1)
// person1.foo4.call(person2)(); // person2(上层作用域被显示的绑定了一个person2)
// person1.foo4().call(person2); // person1(上层找到person1)
```

### 3.3 面试题三

```js
var name = "window";

function Person(name) {
  this.name = name;
  (this.foo1 = function () {
    console.log(this.name);
  }),
    (this.foo2 = () => console.log(this.name)),
    (this.foo3 = function () {
      return function () {
        console.log(this.name);
      };
    }),
    (this.foo4 = function () {
      return () => {
        console.log(this.name);
      };
    });
}

var person1 = new Person("person1");
var person2 = new Person("person2");

person1.foo1(); // person1
person1.foo1.call(person2); // person2(显示高于隐式绑定)

person1.foo2(); // person1 (上层作用域中的this是person1) : 函数是有作用域的, 对象没有作用域
person1.foo2.call(person2); // person1 (上层作用域中的this是person1)

person1.foo3()(); // window(独立函数调用)
person1.foo3.call(person2)(); // window
person1.foo3().call(person2); // person2

person1.foo4()(); // person1
person1.foo4.call(person2)(); // person2
person1.foo4().call(person2); // person1
```

### 3.4 面试题四

```js
var name = "window";

function Person(name) {
  this.name = name;
  this.obj = {
    name: "obj",
    foo1: function () {
      return function () {
        console.log(this.name);
      };
    },
    foo2: function () {
      return () => {
        console.log(this.name);
      };
    },
  };
}

var person1 = new Person("person1");
var person2 = new Person("person2");

person1.obj.foo1()(); // window
person1.obj.foo1.call(person2)(); // window
person1.obj.foo1().call(person2); // person2

person1.obj.foo2()(); // obj
person1.obj.foo2.call(person2)(); // person2
person1.obj.foo2().call(person2); // obj
```

## 4. call apply bind 实现

### 4.1 call 实现

```js
Function.prototype.myCall = function (thisArg, ...args) {
  var fn = this;

  thisArg =
    thisArg !== null && thisArg !== undefined ? Object(thisArg) : window;

  thisArg.fn = fn;
  var result = thisArg.fn(...args);
  delete thisArg.fn;

  return result;
};

function sum(...nums) {
  return nums.reduce((prev, cur) => prev + cur, 0);
}

console.log(sum.myCall("sum", 1, 2, 3, 5)); // 11
```

### 4.2 apply 实现

```js
Function.prototype.myapply = function (thisArg, argArgs) {
  var fn = this;

  thisArg =
    thisArg !== null && thisArg !== undefined ? Object(thisArg) : window;

  thisArg.fn = fn;
  argArgs = argArgs || []; // 主要判断有没有传递阐述
  var result = thisArg.fn(...argArgs);
  delete thisArg.fn;

  return result;
};

function sum(...nums) {
  console.log(this); // String {'asd', fn: ƒ}
  return nums.reduce((prev, cur) => prev + cur, 0);
}

var result = sum.myapply("asd", [1, 2]);
console.log(result); // 3
```

### 4.3 bind 实现

```js
Function.prototype.mybind = function (thisArg, ...argsArray) {
  var fn = this;

  thisArg =
    thisArg !== null && thisArg !== undefined ? Object(thisArg) : window;

  return function (...args) {
    this.fn = fn;

    var result = this.fn([...args, ...argsArray]); // 合并调用以后的参数
    delete this.fn;

    return result;
  };
};

function sum(...nums) {
  return nums.reduce((prev, cur) => prev + cur, 0);
}

var newSum = sum.bind("title", 10, 20, 30, 40);
console.log(newSum()); // 100
```

### 4.4 Array.prototype.slice.call() 实现原理

> 4 种用法

- var newArr2 = Array.prototype.slice.call(arguments)
- var newArr3 = [].slice.call(arguments)
- var newArr4 = Array.from(arguments)
- var newArr5 = [...arguments]

```js
Array.prototype.mySlice = function (start, end) {
  var arr = this;
  console.log("🚀 ~ file: 03_this.md:443 ~ this:", this);
  start = start || 0;
  end = end || arr.length;
  var newArray = [];
  for (var i = start; i < end; i++) {
    newArray.push(arr[i]);
  }
  return newArray;
};

var newArray = Array.prototype.mySlice.call(["aaaa", "bbb", "cccc"], 1, 3);
console.log(newArray); // [ 'bbb', 'cccc' ]
```
