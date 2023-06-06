# iterator


## 1. iterator: 本质

- 一种接口机制
- 为各种不同的数据结构提供统一的访问机制
- 任何数据结构只要部署了Iterator接口，就可以完成遍历操作
- ES6中的有些数据结构原生具备Iterator接口（比如数组），即不用任何处理，就可以被for...of循环遍历
- 原生具备Iterator接口的数据结构如下
  - Array
  - Map
  - Set
  - String
  - TypedArray
  - 函数的 arguments 对象
  - NodeList 对象


### 1.1 初体验: 写死一个names迭代器
```js
// 使用迭代器来访问数组

const names = ['小明', '小红', '小刚']

let index = 0

const namesIterator = {
    next: function () {
        if(index < names.length){
            return {
                value: names[index++],
                done: false
            }
        }else {
            return {
                value: undefined,
                done: true
            }
        }
    }
}


console.log(namesIterator.next())
console.log(namesIterator.next())
console.log(namesIterator.next())
console.log(namesIterator.next())
console.log(namesIterator.next())
console.log(namesIterator.next())
console.log(namesIterator.next())

// { value: '小明', done: false }
// { value: '小红', done: false }
// { value: '小刚', done: false }
// { value: undefined, done: true }
// { value: undefined, done: true }
// { value: undefined, done: true }
// { value: undefined, done: true }
```


### 1.2 封装一个数组迭代器

```js
// 创建一个迭代器对象来访问数组
function createArrayIterator(arr) {
    let index = 0
    return {
        next: function() {
            if (index < arr.length) {
                return { done: false, value: arr[index++] }
            } else {
                return { done: true, value: undefined }
            }
        }
    }
}

const names = ["abc", "cba", "nba"]
const nums = [10, 22, 33, 12]

const namesIterator = createArrayIterator(names)
console.log(namesIterator.next())
console.log(namesIterator.next())
console.log(namesIterator.next())

const numsIterator = createArrayIterator(nums)
console.log(numsIterator.next())
console.log(numsIterator.next())
console.log(numsIterator.next())
console.log(numsIterator.next())
```


## 2 可迭代对象

- 可迭代对象: 实现了迭代器接口的对象
- 可迭代对象的本质: 一个对象如果实现了Symbol.iterator属性, 那么它就是一个可迭代对象
- 可迭代对象的作用: 可以使用for...of遍历

```js
// 创建一个迭代器对象来访问数组
const iterableObj = {
  names: ["abc", "cba", "nba"],
  [Symbol.iterator]: function() {
    let index = 0
    return {
      next: () => {
        if (index < this.names.length) {
          return { done: false, value: this.names[index++] }
        } else {
          return { done: true, value: undefined }
        }
      }
    }
  }
}

const iterator = iterableObj[Symbol.iterator]()
for (const item of iterableObj) {
    console.log(item)
}


// abc
// cba
// nba
```


### 2.1 可迭代对象的应用场景


- 普通我们创建的对象不支持迭代器, 那么为什么我们可以使用...来展开对象呢?

```js
const obj = {
    name: '小明',
    age: 18
}

console.log(...obj) // 报错: obj is not iterable

// 对象解构赋值

const newObject  = {...obj}
// 这行代码可以正常执行, 原因是es9新增的特性: 用的并不是迭代器, 可以使用`Object.entries()`来实现
```


### 2.2 自定义类的可迭代性

- 自定义类的可迭代性: 一个类如果要实现可迭代对象, 那么必须实现Symbol.iterator属性, 该属性必须返回一个迭代器对象


```js
class Classroom {
  constructor(address, name, students) {
    this.address = address
    this.name = name
    this.students = students
  }

  entry(newStudent) {
    this.students.push(newStudent)
  }

  [Symbol.iterator]() {
    let index = 0
    return {
      next: () => {
        if (index < this.students.length) {
          return { done: false, value: this.students[index++] }
        } else {
          return { done: true, value: undefined }
        }
      },
      return: () => {
        console.log("迭代器提前终止了~")
        return { done: true, value: undefined }
      }
    }
  }
}

const classroom = new Classroom("3幢5楼205", "计算机教室", ["james", "kobe", "curry", "why"])
classroom.entry("lilei")

for (const stu of classroom) {
  console.log(stu)
  if (stu === "why") break
}
```


## 3. 生成器函数


### 3.1 什么是生成器函数

- 生成器函数: 一个普通函数, 但是有两个特征
  - 有一个function关键字
  - 函数名前面有一个*
  - 函数体内部使用yield表达式来定义不同的状态
  - 生成器函数的返回值是一个迭代器对象
  - 生成器函数的执行结果是一个迭代器对象
  - 生成器函数的执行过程是惰性的, 只有当调用next方法时, 函数体内的代码才会执行一次, 直到遇到下一个yield表达式或者函数结束
- 执行时机
  - 当遇到yield时候值暂停函数的执行
  - 当遇到return时候生成器就停止执行


```js
function* foo() {
  console.log("函数开始执行~")

  const value1 = 100
  console.log("第一段代码:", value1)
  yield

  const value2 = 200
  console.log("第二段代码:", value2)
  yield

  const value3 = 300
  console.log("第三段代码:", value3)
  yield

  console.log("函数执行结束~")
  
  return '123'
}

// 调用生成器函数时, 会给我们返回一个生成器对象
const generator = foo()

// 开始执行第一段代码
generator.next()

// 开始执行第二端代码
console.log("-------------")
generator.next()
generator.next()
console.log("----------")
generator.next()
```


### 3.2 生成器函数的参数传递

- 生成器函数的参数传递: next方法可以传递参数, 该参数会作为上一个yield表达式的返回值
  - `generator.return(参数)`: 可以提前终止生成器函数的执行, 参数会作为返回值
  - `generator.throw(参数)`: 可以在生成器函数体内部抛出一个错误, 参数会作为错误对象

```js
function* foo(num) {
  console.log("函数开始执行~");

  const value1 = 100 * num;
  console.log("第一段代码:", value1);
  const n = yield value1;
  console.log("🚀 ~ file: 10_生成器的next传递参数.js:7 ~ function*foo ~ n:", n);

  const value2 = 200 * n;
  console.log("第二段代码:", value2);
  const count = yield value2;

  const value3 = 300 * count;
  console.log("第三段代码:", value3);
  yield value3;

  console.log("函数执行结束~");
  return "123";
}

// 生成器上的next方法可以传递参数
const generator = foo(5);
console.log(generator.next());
// 第二段代码, 第二次调用next的时候执行的
console.log(generator.next(10));
console.log(generator.next(25));


// 函数开始执行~
//         第一段代码: 500
// { value: 500, done: false }
// 🚀 ~ file: 10_生成器的next传递参数.js:7 ~ function*foo ~ n: 10
// 第二段代码: 2000
// { value: 2000, done: false }
// 第三段代码: 7500
// { value: 7500, done: false }
```



### 3.3 生成器函数的应用场景
- 优化2.2中的代码
  - 主要优化: class中`Symbol.iterator`方法中的代码

```js
class Classroom {
  constructor(address, name, students) {
    this.address = address
    this.name = name
    this.students = students
  }

  entry(newStudent) {
    this.students.push(newStudent)
  }

  foo = () => {
    console.log("foo function")
  }

  // [Symbol.iterator] = function*() {
  //   yield* this.students
  // }

  *[Symbol.iterator]() {
    yield* this.students
  }
}

const classroom = new Classroom("3幢", "1102", ["abc", "cba"])
for (const item of classroom) {
  console.log(item)
}
```


### 3.4 生成器异步代码处理方案

> 需求:  
> url: hzy -> res: hzy 
> url: res + "aaa" -> res: hzyaaa 
> url: res + "bbb" -> res: hzyaaabbb


```js
// request.js
function requestData(url) {
  // 异步请求的代码会被放入到executor中
  return new Promise((resolve, reject) => {
    // 模拟网络请求
    setTimeout(() => {
      // 拿到请求的结果
      resolve(url)
    }, 2000);
  })
}
```

### 3.4.1 方法一: 多次回调(回调地狱)

```js
requestData("hzy").then(res => {
  requestData(res + "aaa").then(res => {
    requestData(res + "bbb").then(res => {
      console.log(res)
    })
  })
})
```

### 3.4.2 方法二: Promise链式调用

```js
requestData("hzy").then(res => {
  return requestData(res + "aaa")
}).then(res => {
  return requestData(res + "bbb")
}).then(res => {
  console.log(res)
})
```


### 3.4.3 方法三: Promise + generator

```js
function* getData() {
  const res1 = yield requestData("hzy")
  const res2 = yield requestData(res1 + "aaa")
  const res3 = yield requestData(res2 + "bbb")
  const res4 = yield requestData(res3 + "ccc")
  console.log(res4)
}
```

### 3.4.4 方法四: async/await

```js
async function getData() {
  const res1 = await requestData("hzy")
  const res2 = await requestData(res1 + "aaa")
  const res3 = await requestData(res2 + "bbb")
  const res4 = await requestData(res3 + "ccc")
  console.log(res4)
}
```
