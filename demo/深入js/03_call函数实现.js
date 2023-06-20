Function.prototype.myCall = function (thisArg, ...args) {
  var fn = this;

  thisArg =
    thisArg !== null && thisArg !== undefined ? Object(thisArg) : window;

  thisArg.fn = fn;
  var result = thisArg.fn(...args);
  delete thisArg.fn;

  return result;
};

function sum(...nums) {
  return nums.reduce((prev, cur) => prev + cur, 0);
}

console.log(sum.myCall("title", 1, 2, 3, 5));
