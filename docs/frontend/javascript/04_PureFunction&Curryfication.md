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
