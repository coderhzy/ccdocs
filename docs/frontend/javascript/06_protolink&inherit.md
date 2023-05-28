
## 1. 原型链

- 一图胜千言
![](https://imgsbed-1301560453.cos.ap-shanghai.myqcloud.com//blog202305242139300.png)

## 2. 继承
### 2.1 原型链的概念

- **原型链解决了,构造函数定义方法重新创建方法的问题.没有必要在每次创建对象的时候,都重新创建一次方法. 因此将方法放到原型对象中,这样所有的实例对象就可以共享这些方法了**

- 原型链是由一些列对象组成的，每个对象都有一个内部的 `[[Prototype]]` 属性，指向创建它的对象的 `prototype` 属性
- 当我们访问一个对象的属性时，如果这个对象内部不存在这个属性，那么就会去它的 `[[Prototype]]` 属性指向的对象中查找，如果还是没有找到，那么就会去这个对象的 `[[Prototype]]` 属性指向的对象的 `[[Prototype]]` 属性指向的对象中查找，直到找到或者 `[[Prototype]]` 属性为 null 为止
- 这种一级一级的查找关系就是原型链


```js
function Person(name, age, height, address) {
  this.name = name
  this.age = age
  this.height = height
  this.address = address
}

Person.prototype.eating = function() {
  console.log(this.name + "在吃东西~")
}

Person.prototype.running = function() {
  console.log(this.name + "在跑步~")
}

var p1 = new Person("why", 18, 1.88, "北京市")
var p2 = new Person("kobe", 20, 1.98, "洛杉矶市")

p1.eating()
p2.eating()
```

### 2.2 原型链继承

- 弊端
  - 1.第一个弊端: 打印stu对象, 继承的属性是看不到的
  - 2.第二个弊端: 创建出来两个stu的对象, 直接修改对象上的属性, 是给本对象添加了一个新属性, 获取引用, 修改引用中的值, 会相互影响
  - 3.第三个弊端: 在前面实现类的过程中都没有传递参数


- 注意prototype复制循序

```js
var p = new Person()
Student.prototype = p

Student.prototype.studying = function() {
  console.log(this.name + " studying~")
}
```

- 上述代码,如果先执行`Student.prototype.studying = function() {}`再执行`Student.prototype = p`会怎么样呢?
  - 会导致找不到函数,因为`Student.prototype`已经指向了`p`,而`p`中,此时当`new Student`时候,新的student对象的原型链上已经不指向`Student.prototype`了,而是指向了`p`,而`p`中没有`studying`函数,所以会报错.

```js
// 父类: 公共属性和方法
function Person() {
  this.name = "why"
  this.friends = []
}

Person.prototype.eating = function() {
  console.log(this.name + " eating~")
}

// 子类: 特有属性和方法
function Student() {
  this.sno = 111
}

var p = new Person()
Student.prototype = p

Student.prototype.studying = function() {
  console.log(this.name + " studying~")
}


// name/sno
var stu = new Student()

// console.log(stu.name)
// stu.eating()

// stu.studying()


// 原型链实现继承的弊端:
// 1.第一个弊端: 打印stu对象, 继承的属性是看不到的
// console.log(stu.name)

// 2.第二个弊端: 创建出来两个stu的对象
var stu1 = new Student()
var stu2 = new Student()

// 直接修改对象上的属性, 是给本对象添加了一个新属性
stu1.name = "kobe"
console.log(stu2.name)

// 获取引用, 修改引用中的值, 会相互影响
stu1.friends.push("kobe")

console.log(stu1.friends)
console.log(stu2.friends)

// 3.第三个弊端: 在前面实现类的过程中都没有传递参数
var stu3 = new Student("lilei", 112)
```


### 2.3 借用构造函数继承

- 解决了原型链继承的弊端
- 自己的弊端
  - 1.只能继承父类的属性和方法, 不能继承父类原型对象上的属性和方法
  - 2.每次创建子类对象的时候, 都会创建一份父类的副本, 导致子类对象的内存占用率高


```js
// 父类: 公共属性和方法
function Person(name, age, friends) {
  // this = stu
  this.name = name
  this.age = age
  this.friends = friends
}

Person.prototype.eating = function() {
  console.log(this.name + " eating~")
}

// 子类: 特有属性和方法
function Student(name, age, friends, sno) {
  Person.call(this, name, age, friends)
  // this.name = name
  // this.age = age
  // this.friends = friends
  this.sno = 111
}

var p = new Person()
Student.prototype = p

Student.prototype.studying = function() {
  console.log(this.name + " studying~")
}


// name/sno
var stu = new Student("why", 18, ["kobe"], 111)

// console.log(stu.name)
// stu.eating()

// stu.studying()


// 原型链实现继承已经解决的弊端
// 1.第一个弊端: 打印stu对象, 继承的属性是看不到的
console.log(stu)

// 2.第二个弊端: 创建出来两个stu的对象
var stu1 = new Student("why", 18, ["lilei"], 111)
var stu2 = new Student("kobe", 30, ["james"], 112)

// // 直接修改对象上的属性, 是给本对象添加了一个新属性
// stu1.name = "kobe"
// console.log(stu2.name)

// // 获取引用, 修改引用中的值, 会相互影响
stu1.friends.push("lucy")

console.log(stu1.friends)
console.log(stu2.friends)

// // 3.第三个弊端: 在前面实现类的过程中都没有传递参数
// var stu3 = new Student("lilei", 112)



// 强调: 借用构造函数也是有弊端:
// 1.第一个弊端: Person函数至少被调用了两次
// 2.第二个弊端: stu的原型对象上会多出一些属性, 但是这些属性是没有存在的必要
```


### 2.4 原型式继承


- 本质
  - 将一个对象的实例赋值给一个新的对象的原型
  - 现将一个对象赋值给构造函数的原型, 然后再通过构造函数创建一个新的对象

```js
const obj = {
  name: "hzy",
  age: 20,
};

const info = Object.create(obj);

// 下方为Object.create原理

function createObject1(o) {
  const newObj = {};
  Object.setPrototypeOf(newObj, o);
  return newObj;
}

// 道格拉斯
function createObject2(o) {
  function Fn() {}
  Fn.prototype = o;
  const newObj = new Fn();
  return newObj;
}

const info1 = createObject2(obj);
```

### 2.5 寄生式继承

- 本质
  - 使用工厂函数创建一个新的对象, 寄生在原有的对象上
- 缺点
  - 创建多个对象, 像代码中的`studying`函数会被重复创建多次

```js
var personObj = {
    running: function () {
        console.log('running');
    }
}

function createStudent(name){
    var stu = Object.create(personObj);
    stu.name = name;
    stu.studying = function(){
        console.log('studying');
    }
    return stu;
}

var stu1 = createStudent('xiaoming');
var stu2 = createStudent('xiaohong');
stu1.running();
```

### 2.6 寄生式组合继承

- 本质: 借用构造函数继承 + 原型链继承
  - 通过借用构造函数继承父类的属性, 通过原型链的方式继承父类的方法
```js
function createObject(o) {
  function Fn() {}
  Fn.prototype = o;
  return new Fn();
}

function inheritPrototype(subType, superType) {
  subType.prototype = Object.create(superType.prototype);
  Object.defineProperty(subType.prototype, "constructor", {
    enumerable: false,
    configurable: true,
    writable: true,
    value: subType,
  });
}

function Person(name, age, friends) {
  this.name = name;
  this.age = age;
  this.friends = friends;
}

Person.prototype.running = function () {
  console.log("running~");
};

Person.prototype.eating = function () {
  console.log("eating~");
};


function Student(name, age, friends, sno, score){
  Person.call(this, name, age, friends)
  this.sno = sno
  this.score = score  
}


inheritPrototype(Student, Person)


Student.prototype.studying = function() {
  console.log("studying~")
}

var stu = new Student("hzy", 18, ["kobe"], 111, 100)
console.log(stu)
stu.studying()
stu.running()
stu.eating()

console.log(stu.constructor.name)
```

## 3. JS原型方法额外


- hasOwnProperty
  - 对象是否有一个属于自己的属性(不是在原型上的属性), 原型链上有的属性不算(false)
- in / for in 操作符
  - 判断某个属性是否在某个对象或对象的原型上
- instanceof
  - 用于检测构造函数的`prototype`, 是出现在某个实例对象的原型链上
- isPrototypeOf
  - 用于检测某个对象是否存在于另一个对象的原型链上