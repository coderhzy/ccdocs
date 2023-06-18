var info = {};

function foo(obj) {
  return { ...obj, name: "foo1" };
}

info = foo(info);
