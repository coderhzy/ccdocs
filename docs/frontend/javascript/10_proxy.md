# Proxy

## 1. Proxy

### 1. Object.defineProperty

- es5拦截对象的方法: *Object.defineProperty*
- **Object.defineProperty**的缺点
  - 无法监听数组的变化
  - 只能监听对象的属性变化
  - 需要深度遍历整个对象


```js
Object.keys(obj).forEach(key => {
  Object.defineProperty(obj, key, {
    get() {
      console.log('get')
      return obj[key]
    },
    set(newVal) {
      console.log('set')
      obj[key] = newVal
    }
  })
})
```


### 2. Proxy

- es6拦截对象的方法: *Proxy*


```js
new Proxy(obj, {
  // 获取值时的捕获器
  get: function(target, key) {
    console.log(`监听到对象的${key}属性被访问了`, target)
    return target[key]
  },

  // 设置值时的捕获器
  set: function(target, key, newValue) {
    console.log(`监听到对象的${key}属性被设置值`, target)
    target[key] = newValue
  }
})
```

- receiver: 代理对象本身
- 传入第三个参数receiver, 代理对象本身, 用于解决this指向问题. 如果不传入receiver, 那么this指向的是原始对象(下方代码中的obj). 如果传入receiver, 那么this指向的是代理对象(下方代码中的objProxy)

```js
const obj = {
  _name: "hzy",
  get name() {
    return this._name;
  },
  set name(newValue) {
    this._name = newValue;
  },
};

const objProxy = new Proxy(obj, {
  get: function (target, key, receiver) {
    // receiver是创建出来的代理对象
    console.log("get方法被访问--------", key, receiver);
    console.log(receiver === objProxy);
    return Reflect.get(target, key, receiver);
  },
  set: function (target, key, newValue, receiver) {
    console.log("set方法被访问--------", key);
    Reflect.set(target, key, newValue, receiver);
  },
});

// console.log(objProxy.name)
objProxy.name = "kobe";
```

## 2. Proxy捕获器

![](https://imgsbed-1301560453.cos.ap-shanghai.myqcloud.com//blog202305301303944.png)\

### 2.1 Proxy捕获器用法
```js
const objProxy = new Proxy(obj, {
  // 获取值时的捕获器
  get: function(target, key) {
    console.log(`监听到对象的${key}属性被访问了`, target)
    return target[key]
  },

  // 设置值时的捕获器
  set: function(target, key, newValue) {
    console.log(`监听到对象的${key}属性被设置值`, target)
    target[key] = newValue
  },

  // 监听in的捕获器 -> in操作符
  has: function(target, key) {
    console.log(`监听到对象的${key}属性in操作`, target)
    return key in target
  },

  // 监听delete的捕获器 -> delete
  deleteProperty: function(target, key) {
    console.log(`监听到对象的${key}属性in操作`, target)
    delete target[key]
  }
})
```

### 2.2 Proxy捕获器对函数对象监听

```js
function foo() {}

const fooProxy = new Proxy(foo, {
  apply: function(target, thisArg, argArray) {
    console.log("对foo函数进行了apply调用")
    return target.apply(thisArg, argArray)
  },
  construct: function(target, argArray, newTarget) {
    console.log("对foo函数进行了new调用")
    return new target(...argArray)
  }
})

fooProxy.apply({}, ["abc", "cba"])
new fooProxy("abc", "cba")
```


## 3. Reflect

### 3.1 Reflect本质
- Reflect出现原因就是es6之前, 所有的操作对象访达都添加到了Object对象上, 但是Object对象上的方法不够完善, 所以es6将Object对象上的方法全部迁移到了Reflect对象上
- Reflect是一个内置的对象，它提供拦截JavaScript操作的方法
- Reflect与Proxy的方法一一对应

![](https://imgsbed-1301560453.cos.ap-shanghai.myqcloud.com//blog202305301309315.png)


```js
const obj = {
  name: "hzy",
  age: 18,
};

const objProxy = new Proxy(obj, {
  get: function (target, key, receiver) {
    console.log("get---------");
    return Reflect.get(target, key);
  },
  set: function (target, key, newValue, receiver) {
    console.log("set---------");
    target[key] = newValue;

    const result = Reflect.set(target, key, newValue);
    if (result) {
    } else {
    }
  },
});

objProxy.name = "kobe";
console.log(objProxy.name);
```

### 3.2 Reflect.construct

- Reflect.construct作用
  - 用于拦截new操作符
  - 用于拦截new操作符后的构造函数的调用

```js
function Student(name, age) {
  this.name = name;
  this.age = age;
}

function Teacher() {}

// const stu = new Student("hzy", 18)
// console.log(stu)
// console.log(stu.__proto__ === Student.prototype)

// 执行Student函数中的内容, 但是创建出来对象是Teacher对象
const teacher = Reflect.construct(Student, ["hzy", 18], Teacher);
console.log(teacher);
console.log(teacher.__proto__ === Teacher.prototype);
```