# Promise

## 1. 为什么会出现Promise

在ES6之前，我们使用回调函数来处理异步操作，但是回调函数有一个缺点，就是不容易管理，如果回调函数嵌套的层级过多，就会出现回调地狱，代码不容易维护。

```js
function requestData(url, successCallback, errorCallBack){
    setTimeout(() => {
        if(Math.random() > 0.5){
            successCallback('成功')
        }else{
            errorCallBack('失败')
        }
    },3000)
}

requestData('kobe', (res) => {
    console.log(res)
}, (err) => {
    console.log(err)
})
```

## 2. Promise的基本使用

> promise是ES6中新增的语法，它是一个类，可以创建一个实例，这个实例就是一个promise对象，promise对象表示一个异步操作，每一个promise对象都有三个状态分别是pending(进行中)、fulfilled(已成功)、rejected(已失败)，状态只能从pending->fulfilled或者pending->rejected，状态一旦改变就不能再改变。

```js
function foo(){
    return new Promise((resolve,reject) => {
        resolve('成功')
    })
}

// 此种用法符合promise规范
const fooPromise = new foo()
fooPromise.then((res) => {
    console.log(res)
},(err) => {
    console.log(err)
})
```

### 3. Promise的三种状态

> 注意: Promise状态一旦确定下来, 那么就是不可更改的(锁定)
> 
```js
new Promise((resolve, reject) => {
  // pending状态: 待定/悬而未决的
  console.log("--------")
  reject() // 处于rejected状态(已拒绝状态)
  resolve() // 处于fulfilled状态(已敲定/兑现状态)
  console.log("++++++++++++")
}).then(res => {
  console.log("res:", res)
}, err => {
  console.log("err:", err)
})
```

### 4. Promise的链式调用

> 注意: Promise的链式调用中, 每一次调用then方法都会返回一个新的Promise实例, 从而实现了链式调用

```js
new Promise((resolve, reject) => {
  resolve(1)
}).then(res => {
  console.log(res)
  return 2
}).then(res => {
  console.log(res)
  return 3
}).then(res => {
  console.log(res)
})
```


### 5. Promise的方法

- then: 指定成功和失败的回调函数
- catch: 指定失败的回调函数
- finally: 指定回调函数, 无论成功还是失败都会调用
- resolve: 返回一个成功的promise对象
- reject: 返回一个失败的promise对象
- all: 接收一个promise对象的数组, 当所有的promise对象都成功时才成功, 只要有一个失败就失败
- allSettled: 以 promise 组成的可迭代对象作为输入，并且返回一个 Promise 实例。当输入的所有 promise 都已敲定时（包括传递空的可迭代类型），返回的 promise 将兑现，并带有描述每个 promise 结果的对象数组。以 promise 组成的可迭代对象作为输入，并且返回一个 Promise 实例。当输入的所有 promise 都已敲定时（包括传递空的可迭代类型），返回的 promise 将兑现，并带有描述每个 promise 结果的对象数组。
- race: 接收一个promise对象的数组, 返回一个新的promise对象, 其结果由第一个完成的promise决定
- any: 接收一个promise对象的数组, 只要有一个成功就成功, 全部失败才失败
