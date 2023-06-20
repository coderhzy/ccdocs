var obj = {
  name: "why",
  age: 18,
  _address: "南京市",
};

Object.defineProperty(obj, "address", {
  enumerable: true,
  configurable: true,
  get: function () {
    foo();
    return this._address;
  },
  set: function (value) {
    bar();
    this._address = value;
  },
});

console.log(obj.address);

obj.address = "1231231";

function foo() {
  console.log("获取了一次address的值");
}

function bar() {
  console.log("设置了addres的值");
}
