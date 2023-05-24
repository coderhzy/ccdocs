# 纯函数和柯里化

## 1. 纯函数

- 无副作用的函数
- 不可以修改外部变量,不可修改传入的参数
- 如: react 组件接受的 props, 不能修改 props 的值.
- 除了返回值以后,不能有任何输出

### 1.1 reducer 纯函数实现原理

```js
var info = {};

function foo(obj) {
  return { ...obj, name: "foo1" };
}

info = foo(info);
```

## 2. 柯里化函数的实现

- 柯里化本质就是返回多个函数,每次调用函数都会返回一个新的函数,直到参数收集完毕,执行函数
- 柯里化函数的参数收集,可以使用递归的方式,也可以使用闭包的方式
- 柯里化方便了一些函数逻辑在第一层,或者某几层进行复用.

```js
function add1(x, y, z) {
  return x + y + z;
}

function myCurrying(fn) {
  return function curried(...args) {
    if (args.length >= fn.length) {
      return fn.apply(this, args);
    } else {
      function curried2(...args2) {
        return curried.apply(this, [...args, ...args2]);
      }

      return curried2;
    }
  };
}

const curryAdd = myCurrying(add1);
console.log(curryAdd(1)(2)(3)); // 6
console.log(curryAdd(1, 2)(3)); // 6
console.log(curryAdd(1, 2, 3)); // 6
```


## 3. 柯里化实现函数组合

```js
function myCompose(...fns) {
  const length = fns.length;
  for (var i = 0; i < length; i++) {
    if (typeof fns[i] !== "function") {
      throw new TypeError("Expected a function");
    }
  }

  return function componse(...args) {
    var index = 0;
    var result = length ? fns[index].apply(this, args) : args;
    while (++index < length) {
      result = fns[index].call(this, result);
    }

    return result;
  };
}

function double(x) {
  return x * 2;
}

function square(n) {
  return n ** 2;
}

const newFn = myCompose(double, square);
console.log(newFn(10)); // 400
```
