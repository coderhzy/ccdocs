
## 3. 原型链

- 一图胜千言
![](https://imgsbed-1301560453.cos.ap-shanghai.myqcloud.com//blog202305242139300.png)

### 3.1 原型链的概念

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

### 3.2 原型链继承


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