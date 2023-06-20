function Person(name, title, friend) {
  this.age = 32;
  this.name = name;
  this.title = title;
  this.friend = friend;
}

Person.prototype.eating = function () {
  console.log(this.name, "eating");
};

function Student(name, title, friend) {
  Person.call(this, name, title, friend);
  this.sno = 111;
}

var p = new Person();
Student.prototype = p;

Student.prototype.study = function () {
  console.log(this.name, "study");
};

var s = new Student();

console.log(s);

var stu1 = new Student("123", 123, ["luck", "james"]);
var stu2 = new Student("456", 456, ["kobe", "jordan"]);

stu1.name = "kobe";
console.log(stu2.name);

stu1.friend.push("kobe");
console.log(stu2.friend);

console.log(stu1);
