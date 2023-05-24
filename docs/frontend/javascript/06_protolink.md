
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