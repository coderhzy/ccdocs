function foo() {
  var newArr2 = Array.prototype.slice.call(arguments);
  console.log(
    "🚀 ~ file: 06_Array.prototype.slice.call实现.js:3 ~ foo ~ newArr2:",
    newArr2
  );
}
foo(10, 20, 30, 40, 50);

// 2. Array.prototype.slice.call实现
Array.prototype.mySlice = function (start, end) {
  var arr = this;
  start = start || 0;
  end = end || arr.length;
  var newArray = [];
  for (var i = start; i < end; i++) {
    newArray.push(arr[i]);
  }
  return newArray;
};

var newArray = Array.prototype.mySlice.call(["aaaa", "bbb", "cccc"], 1, 3);
console.log(newArray);
