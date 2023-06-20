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