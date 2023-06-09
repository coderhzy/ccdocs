# 事件循环


## 0. 进程和线程

- 进程是CPU资源分配的最小单位，线程是CPU调度的最小单位。
- 一个进程可以包含多个线程，但至少有一个线程。
- JavaScript是单线程语言，它只有一个主线程，所有任务都在这个主线程上执行，其他线程都在后台配合。


## 1. 什么是JavaScript事件循环

- JavaScript是一门单线程语言，它的所有任务都需要在一个线程上完成，所以它的运行机制称为事件循环（Event Loop）。
- JavaScript的运行机制是，当主线程运行时，其他任务都会在后台运行，等主线程运行完毕，再执行后台任务。
- JavaScript的事件循环机制就是，主线程从“任务队列”中读取事件，这个过程是循环不断的，所以整个的运行机制称为“Event Loop”（事件循环）。
- 事件循环的每一轮称为一个tick，每一轮的任务处理模型是一样的，只是处理的事件队列不一样。
- 事件循环的运行机制如下：
  - 所有同步任务都在主线程上执行，形成一个执行栈（execution context stack）。
  - 主线程之外，还存在一个“任务队列”（task queue）。只要异步任务有了运行结果，就在“任务队列”之中放置一个事件。
  - 一旦“执行栈”中的所有同步任务执行完毕，系统就会读取“任务队列”，看看里面有哪些事件。那些对应的异步任务，于是结束等待状态，进入执行栈，开始执行。
  - 主线程不断重复上面的第三步。
  - 主线程和任务队列是绝对的异步，不会互相干扰。

## 2. 宏任务和微任务

- 宏任务（macro-task）：包括整体代码script，setTimeout，setInterval，setImmediate，I/O，UI交互事件，postMessage，MessageChannel，setImmediate（Node.js 环境）
- 微任务（micro-task）：Promise，process.nextTick（Node.js 环境）
- 宏任务和微任务的区别在于，宏任务是在当前执行栈执行的任务，微任务是在微任务队列中的任务，当前执行栈执行完毕后立即执行微任务队列中的任务。
 
            
## 3. 事件循环的执行顺序(题目)


### 3.1 题目一


```js
setTimeout(() => {
  console.log("setTimeout")
}, 1000)

queueMicrotask(() => {
  console.log("queueMicrotask")
})

Promise.resolve().then(() => {
  console.log("Promise then")
})

function foo() {
  console.log("foo")
}

function bar() {          
  console.log("bar")
  foo()
}

bar()

console.log("其他代码")

// bar
// foo
// 其他代码
// queueMicrotask
// promise then
// setTimeout
```


### 3.2 题目二


```js
setTimeout(function () {
  console.log("setTimeout1");
  new Promise(function (resolve) {
    resolve();
  }).then(function () {
    new Promise(function (resolve) {
      resolve();
    }).then(function () {
      console.log("then4");
    });
    console.log("then2");
  });
});

new Promise(function (resolve) {
  console.log("promise1");
  resolve();
}).then(function () {
  console.log("then1");
});

setTimeout(function () {
  console.log("setTimeout2");
});

console.log(2);

queueMicrotask(() => {
  console.log("queueMicrotask1")
});

new Promise(function (resolve) {
  resolve();
}).then(function () {
  console.log("then3");
});

// promise1
// 2
// then1
// queueMicrotask1
// then3
// setTimeout1
// then2
// then4
// setTimeout2
```


## 3.3 题目三


```js
async function bar() {
  console.log("22222")
  return new Promise((resolve) => {
    resolve()
  })
}

async function foo() {
  console.log("111111")

  await bar()

  console.log("33333")
}

foo()
console.log("444444")

// 1111
// 2222
// 4444
// 3333
```


### 3.4 题目四


```js
async function async1() {
  console.log("async1 start");
  await async2();
  console.log("async1 end");
}

async function async2() {
  console.log("async2");
}

console.log("script start");

setTimeout(function () {
  console.log("setTimeout");
}, 0);

async1();

new Promise(function (resolve) {
  console.log("promise1");
  resolve();
}).then(function () {
  console.log("promise2");
});

console.log("script end");

// script start
// async1 start
// async2
// promise1
// script end
// async1 end
// promise2
// setTimeout
```


### 3.5 题目五


```js
async function async1() {
  console.log('async1 start')
  await async2()
  console.log('async1 end')
}

async function async2() {
  console.log('async2')
}

console.log('script start')

setTimeout(function () {
  console.log('setTimeout0')
}, 0)

setTimeout(function () {
  console.log('setTimeout2')
}, 300)

setImmediate(() => console.log('setImmediate'));

process.nextTick(() => console.log('nextTick1'));

async1();

process.nextTick(() => console.log('nextTick2'));

new Promise(function (resolve) {
  console.log('promise1')
  resolve();
  console.log('promise2')
}).then(function () {
  console.log('promise3')
})

console.log('script end')

// script start
// async1 start 
// async2
// promise1
// promise2
// script end
// nextTick1
// nextTick2
// async1 end
// promise3
// setTimeout0
// setImmediate
// setTimeout2
```
