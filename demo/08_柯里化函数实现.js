function add1(x, y, z) {
  return x + y + z;
}

function myCurrying(fn) {
  return function curried(...args) {
    if (args.length >= fn.length) {
      return fn.apply(this, args);
    } else {
      function curried2(...args2) {
        return curried.apply(this, [...args, ...args2]);
      }

      return curried2;
    }
  };
}

const curryAdd = myCurrying(add1);
console.log(curryAdd(1)(2)(3)); // 6
console.log(curryAdd(1, 2)(3)); // 6
console.log(curryAdd(1, 2, 3)); // 6
