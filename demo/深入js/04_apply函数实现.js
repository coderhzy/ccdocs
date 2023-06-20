Function.prototype.myapply = function (thisArg, argArgs) {
  var fn = this;

  thisArg =
    thisArg !== null && thisArg !== undefined ? Object(thisArg) : window;

  thisArg.fn = fn;
  argArgs = argArgs || []; // 主要判断有没有传递阐述
  var result = thisArg.fn(...argArgs);
  delete thisArg.fn;

  return result;
};

function sum(...nums) {
  console.log(this); // String {'asd', fn: ƒ}
  return nums.reduce((prev, cur) => prev + cur, 0);
}

var result = sum.myapply("asd", [1, 2]);
console.log(result); // 3
