function myCompose(...fns) {
  const length = fns.length;
  for (var i = 0; i < length; i++) {
    if (typeof fns[i] !== "function") {
      throw new TypeError("Expected a function");
    }
  }

  return function componse(...args) {
    var index = 0;
    var result = length ? fns[index].apply(this, args) : args;
    while (++index < length) {
      result = fns[index].call(this, result);
    }

    return result;
  };
}

function double(x) {
  return x * 2;
}

function square(n) {
  return n ** 2;
}

const newFn = myCompose(double, square);
console.log(newFn(10)); // 400
