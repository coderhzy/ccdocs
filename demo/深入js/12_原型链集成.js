function Person() {
  this.name = "kevin";
  this.title = "FE";
  this.friend = ["daisy", "kelly"];
}

Person.prototype.eating = function () {
  console.log(this.name, "eating");
};

function Student() {
  this.sno = 111;
}

var p = new Person();
Student.prototype = p;

Student.prototype.study = function () {
  console.log(this.name, "study");
};

var s = new Student();

s.study();
s.eating();
console.log(s);

var stu1 = new Student();
var stu2 = new Student();

console.log(stu1.eating === stu2.eating);
stu1.name = "kobe";
console.log(stu2.name);
stu1.friend.push("kobe");
console.log(stu2.friend);

var stu3 = new Student("123", 123);
