function Person(name, age, height, address) {
  this.name = name;
  this.age = age;
  this.height = height;
  this.address = address;

  this.eating = function () {
    console.log(this.name + " eating");
  };

  this.running = function () {
    console.log(this.name + " running");
  };
}

const p1 = new Person("张三", 18, 1.88, "南京市");
const p2 = new Person("lisi", 97, 1.88, "南京市");

console.log(p1);
console.log(p2);
p1.eating();
p2.running();
//  Person {
//     name: '张三',
//     age: 18,
//     height: 1.88,
//     address: '南京市',
//     eating: [Function (anonymous)],
//     running: [Function (anonymous)]
//   }
//   Person {
//     name: 'lisi',
//     age: 97,
//     height: 1.88,
//     address: '南京市',
//     eating: [Function (anonymous)],
//     running: [Function (anonymous)]
//   }
//   张三 eating
//   lisi running
