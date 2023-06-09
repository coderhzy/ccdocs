# JSON序列化

## 1. JSON表示方式

- JSON的三种表示方式
    - 对象表示法
    - 数组表示法
    - 简单值表示法

> 对象表示法
```json
{
  "name": "hzy",
  "age": 18,
  "friend": {
    "name": "kobe"
  },
  "hobbies": ["篮球", "足球"]
}
```

> 数组表示法
```js
[
  "abc",
  123,
  {
    "name": "kobe"
  }
]
```

> 简单值表示法
```js
"abc"
123
```

## 2. JSON序列化

### 2.1 JSON序列化的基本概念


```js
const obj = {
  name: "hzy",
  age: 18,
  friends: {
    name: "kobe"
  },
  hobbies: ["篮球", "足球"]
}

// 将obj转成JSON格式的字符串
const objString = JSON.stringify(obj)

// 将对象数据存储localStorage
localStorage.setItem("obj", objString)

const jsonString = localStorage.getItem("obj")

// 将JSON格式的字符串转回对象
const info = JSON.parse(jsonString)
console.log(info)
```

### 2.1 JSON序列化方法stringify的细节和参数

- JSON.stringify(value[, replacer [, space]])
    - value: 要序列化的对象
    - replacer: 可选参数，如果是数组，表示需要序列化的属性名；如果是函数，表示序列化的过程
    - space: 可选参数，指定缩进用的空白字符串，用于美化输出（pretty-print）；如果是数字，表示每个级别缩进的空格数

```js
const obj = {
  name: "hzy",
  age: 18,
  friends: {
    name: "kobe"
  },
  hobbies: ["篮球", "足球"],
  // toJSON: function() {
  //   return "123456"
  // }
}

// 需求: 将上面的对象转成JSON字符串
// 1.直接转化
const jsonString1 = JSON.stringify(obj)
console.log(jsonString1)

// 2.stringify第二个参数replacer
// 2.1. 传入数组: 设定哪些是需要转换
const jsonString2 = JSON.stringify(obj, ["name", "friends"])
console.log(jsonString2)

// 2.2. 传入回调函数:
const jsonString3 = JSON.stringify(obj, (key, value) => {
  if (key === "age") {
    return value + 1
  }
  return value
})
console.log(jsonString3)

// 3.stringify第三参数 space
const jsonString4 = JSON.stringify(obj, null, "---")
console.log(jsonString4)

// 4.如果obj对象中有toJSON方法
```


### 2.2 JSON序列化方法parse的细节和参数

- JSON.parse(text[, reviver])
    - text: 要解析成对象的字符串
    - reviver: 可选参数，如果是函数，表示解析过程

```js
const JSONString = '{"name":"hzy","age":19,"friends":{"name":"kobe"},"hobbies":["篮球","足球"]}'

const info = JSON.parse(JSONString, (key, value) => {
  if (key === "age") {
    return value - 1
  }
  return value
})
console.log(info)
```


### 2.3 JSON序列化深拷贝


```js
const obj = {
  name: "hzy",
  age: 18,
  friends: {
    name: "kobe"
  },
  hobbies: ["篮球", "足球"],
  foo: function() {
    console.log("foo function")
  }
}

// 将obj对象的内容放到info变量中
// 1.引用赋值
const info = obj
obj.age = 100
console.log(info.age)

// 2.浅拷贝
const info2 = { ...obj }
obj.age = 1000
console.log(info2.age)

obj.friends.name = "james"
console.log(info2.friends.name)

// 3.stringify和parse来实现
const jsonString = JSON.stringify(obj)
console.log(jsonString)
const info3 = JSON.parse(jsonString)
obj.friends.name = "curry"
console.log(info3.friends.name)
console.log(info3)
```
