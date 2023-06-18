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
