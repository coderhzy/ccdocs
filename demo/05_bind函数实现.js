Function.prototype.mybind = function (thisArg, ...argsArray) {
  var fn = this;

  thisArg =
    thisArg !== null && thisArg !== undefined ? Object(thisArg) : window;

  return function (...args) {
    this.fn = fn;

    var result = this.fn([...args, ...argsArray]);
    delete this.fn;

    return result;
  };
};

function sum(...nums) {
  return nums.reduce((prev, cur) => prev + cur, 0);
}

var newSum = sum.bind("title", 10, 20, 30, 40);
console.log(newSum()); // 100
