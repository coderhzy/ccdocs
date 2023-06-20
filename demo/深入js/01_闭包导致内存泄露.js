function createFnArray() {
  var arr = new Array(1024 * 1024).fill(1);
  return function () {
    console.log(arr.length);
  };
}

var arrayFn = [];

for (var i = 0; i < 300; i++) {
  arrayFn.push(createFnArray());
}

setTimeout(() => {
  arrayFn = null;
});
