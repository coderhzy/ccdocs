# async-await


## 1. async/await是什么

- async/await是ES7的新语法, 用于解决异步回调地狱的问题
- async/await是基于Promise实现的, 它不能用于普通的回调函数
- async/await与Promise一样, 是非阻塞的
- async/await使得异步代码看起来像同步代码, 使代码的阅读和写法更加的简洁
- async/await最终返回的是Promise对象
- async/await的优点
  - 代码简洁
  - 错误处理方便
  - 解决了回调地狱的问题
- async/await的缺点
  - 不能用于普通的回调函数
  - await后面只能跟随Promise对象
  - await必须包裹在async函数中
  - async函数执行返回的也是Promise对象
  - 不能在forEach中使用await

```js
// await/async
async function foo1() {

}

const foo2 = async () => {

}

class Foo {
  async bar() {

  }
}
```


```js
async function foo() {
  console.log("foo function start~")

  console.log("内部的代码执行1")
  console.log("内部的代码执行2")
  console.log("内部的代码执行3")

  console.log("foo function end~")
}


console.log("script start")
foo()
console.log("script end")

// 代码执行顺序和普通函数一样
```


### 1.1 async函数的返回值

- async函数的返回值是一个Promise对象

```js
async function foo() {
  console.log("foo function start~")

  console.log("中间代码~")

  console.log("foo function end~")

  // 1.返回一个值

  // 2.返回thenable
  // return {
  //   then: function(resolve, reject) {
  //     resolve("hahahah")
  //   }
  // }

  // 3.返回Promise
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve("hehehehe")
    }, 2000)
  })
}

// 异步函数的返回值一定是一个Promise
const promise = foo()
promise.then(res => {
  console.log("promise then function exec:", res)
})


//     foo function start~
//     中间代码~
//     foo function end~
//     promise then function exec: hehehehe
```



### 1.2 异常处理

- async函数内部抛出错误, 会导致返回的Promise对象变为reject状态, 抛出的错误对象会被catch方法回调函数接收到

```js
async function foo() {
  console.log("foo function start~")

  console.log("中间代码~")

  // 异步函数中的异常, 会被作为异步函数返回的Promise的reject值的
  throw new Error("error message")

  console.log("foo function end~")
}

// 异步函数的返回值一定是一个Promise
foo().catch(err => {
  console.log("codehzy err:", err)
})

console.log("后续还有代码~~~~~")
```


## 2. await

- await后面可以跟随一个Promise对象, 如果不是Promise对象, 会被转换为一个立即resolve的Promise对象
- await必须包裹在async函数中
- await后面的代码会等待Promise对象的状态变为resolve或者reject

```js
async function foo() {
  console.log("foo function start~")

  // await后面可以跟随一个Promise对象, 如果不是Promise对象, 会被转换为一个立即resolve的Promise对象
  // await后面的代码会等待Promise对象的状态变为resolve或者reject
  const res = await new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve("hehehehe")
    }, 2000)
  })

  console.log("foo function end~", res)
}

// foo function start~
// foo function end~ hehehehe
```
