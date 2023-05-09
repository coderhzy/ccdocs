---
title: React-Hooks
description: React18-Hooks精讲
publishedAt: '2022-09-23'
lastUpdated: '2022-11-26'
tags: 'interview'
---


# Hooks


## 1. useState

### 1.1 介绍useState
1. useState作为React中函数式组件`定义变量`存在，使用useState将需要的变量勾入。
2. 在某个时刻，则使用setState函数来更改这个变量的定义
3. React会根据调用了setState更改值以后，对组件进行重新渲染。


### 1.2 useState使用

```javascript
import React, { memo } from "react";

const UseStateHook = memo(() => {
  const [message, setMessage] = React.useState("This is code for setState");

  const changeMessage = () => {
    setMessage("state change");
  };
  return (
    <div>
      Message: {message}
      <button onClick={changeMessage}>修改文本</button>
    </div>
  );
});

export default UseStateHook;
```


## 2. useEffect

### 2.1 介绍：useEffect

1. `useEffect` 用来执行副作用函数。在函数式组件中，**不允许变更、订阅、计时器、日志记录和其他副作用，进一步会影响UI的渲染**。
2. 我们将要执行的副作用都放在useEffect中执行，而useEffect则在DOM挂载结束后执行一次。
3. 一个函数式组件中，可以调用多个useEffect。
4. useEffect参数
   1. 在DOM挂载后执行
   2. 传入第二个参数作为依赖项，依赖项变更时执行
   3. 在useEffect中返回一个函数，则该函数在组件卸载的时候执行
   4. 如果你只想执行在DOM改在执行一段逻辑，那么useEffect第二个参数则写入一个空数组


### 2.2 清除机制-返回回调函数

- `ClearEffectComponent.jsx`: 清除机制-返回回调函数

```javascript
// .ClearEffectComponent.jsx
import React, { memo, useEffect } from "react";

const ClearEffectComponent = memo(() => {
  const [counter, setCounter] = React.useState(0);

  useEffect(() => {
    console.log("set effect, store the handler and name it.");

    // return callback function, that will be executed befor component unmount
    return () => {
      console.log("clear effect, clear the handler.");
    };
  });

  return (
    <div>
      <h2>清除机制</h2>
      <button onClick={(e) => setCounter(counter + 1)}>+1{counter}</button>
    </div>
  );
});

export default ClearEffectComponent;
```

### 2.3 逻辑分离-多个Effect

- `SplitMultiEffectComponent.jsx`: 逻辑分离-多个Effect

```javascript
// .SplitMultiEffectComponent.jsx
import React, { memo, useEffect } from "react";

const SplitMultiEffectComponent = memo(() => {
  const [counter, setCounter] = React.useState(0);

  // 一个函数式组件中, 可以存在多个useEffect
  useEffect(() => {
    console.log("first effect!");
  });

  useEffect(() => {
    console.log("second effect!");
  });

  useEffect(() => {
    console.log("third effect!");

    return () => {
      console.log("third effect return!");
    };
  });

  return (
    <div>
      SplitMultiEffectComponent
      <button onClick={(e) => setCounter(counter + 1)}>+1{counter}</button>
    </div>
  );
});

export default SplitMultiEffectComponent;
```


### 2.3 执行时机-控制回调执行

- `ControlExecCallback.jsx`: 执行时机-控制回调执行

```javascript
// .ControlExecCallback.jsx
import React, { memo, useEffect } from "react";

const ControlExecCallback = memo(() => {
  const [counter, setCounter] = React.useState(0);
  const [message, setMessage] = React.useState("This is code for setState.");

  useEffect(() => {
    console.log("mirror redux store state");

    return () => {};
  }, [counter]);

  useEffect(() => {
    console.log("mirror eventBus event");
    return () => {};
  }, []);

  useEffect(() => {
    console.log("get dataList from server by axios");

    return () => {
      console.log("unmount, cancel axios request.");
    };
  }, []);
  return (
    <div>
      ControlExecCallback
      <button onClick={(e) => setCounter(counter + 1)}>+1{counter}</button>
      <button onClick={(e) => setMessage("see hello")}>
        修改Message：{message}
      </button>
    </div>
  );
});

export default ControlExecCallback;

```
## 3. useContext


### 1. 介绍useContext
- 1. 使用useContext可以更快捷得获取上下文对象。
- 2. 当前上下文值由组件树树中调用组件上方，最近的`<MyContext.Provider>`的值prop确定。
- 3. 当组件上方最近的`<MyContext.Provider>`更新时，此Hook将触发重新渲染，并将最新的上下文值传递给该MyContext提供程序。
- 4. 即使祖先使用`React.memo`或应该`ComponentUpdate`，**重新渲染仍将从使用useContext的组件本身开始**。


### 2. 使用useContext
  
- `./context/index.js`
```javascript
// ./context/index.js

const themes = {
  light: {
    foreground: "#000000",
    background: "#eeeeee"
  },
  dark: {
    foreground: "#ffffff",
    background: "#222222"
  }
};

const ThemeContext = React.createContext(themes.light);

export { ThemeContext }
```

- `./App.js`: 主入口,当然也可以是某个组件的组件树上的某个父组件
```javascript
// ./context/App.js
import { ThemeContext } from "./context";

function App() {
  return (
    <ThemeContext.Provider value={themes.dark}>
      <UseContextComponent />
    </ThemeContext.Provider>
  );
}
```

- `./pages/UseContextComponent.jsx`: 使用useContext的组件
```javascript
import React, { memo, useContext } from "react";
import { ThemeContext } from "./context";

const UseContextComponent = memo(() => {
  const theme = useContext(ThemeContext);
  return (
    <div>
      UseContextComponent
      <h2 style={{ background: theme.background, color: theme.foreground }}>Theme</h2>
    </div>
  );
});

export default UseContextComponent;
```

## 4. useReducer


### 1. 介绍useReducer
- 作为useState的代替方案。
- 使用场景为，某个组件需要定义多个State状态时，使用`useReducer`来将多个State传入到第二个参数中。并定义一个类似`redux`的reducer来控制State的状态。
- 使用场景很少，并且不推荐在组件中这么使用，因为会导致某个组件过于臃肿，此场景建议将数据放到redux中使用。


### 2. 使用useReducer 
```javascript
// .UseReducerHook.jsx
import React, { memo } from "react";

function reducer(state, action) {
  switch (action.type) {
    case "increment":
      return { ...state, counter: state.counter + 1 };
    case "decrement":
      return { ...state, counter: state.counter - 1 };
    case "add_number":
      return { ...state, counter: state.counter + action.payload };
    case "sub_number":
      return { ...state, counter: state.counter - action.payload };
    default:
      return state;
  }
}

const UseReducerHook = memo(() => {
  const [state, dispatch] = React.useReducer(reducer, {
    counter: 0,
    friends: [],
    user: {},
  });

  return (
    <>
      <h2>当前计数: {state.counter}</h2>
      <button onClick={() => dispatch({ type: "increment" })}>+1</button>
      <button onClick={() => dispatch({ type: "decrement" })}>-1</button>
      <button onClick={() => dispatch({ type: "add_number", payload: 5 })}>
        +5
      </button>
      <button onClick={() => dispatch({ type: "sub_number", payload: 5 })}>
        -5
      </button>
    </>
  );
});

export default UseReducerHook;
```

## 5. useCallback

- 网络上很多文章对useCallback理解都是有误的。
- useCallback，本质不能解决函数重复定义的问题。他只能解决函数传递给子组件时，子组件不必要的重新渲染问题。
- 两种方法
  - 方法一： 使用相等性Ref配合useCallback来避免重复渲染
  - 方法二： 使用useCallback来避免重复渲染


### 1. 使用useCallback-避免子组件重复渲染
```javascript
// .UseCallbackComponent.jsx
import React, { memo, useCallback, useState, useRef } from "react";

const MYHome = memo((props) => {
  const { increment } = props;
  console.log("Home重新渲染");
  return (
    <div>
      <button onClick={increment}>increment</button>
    </div>
  );
});

const UseCallbackComponent = memo(() => {
  const [count, setCount] = useState(0);
  const [message, setMessage] = useState("hello");
  // 从上方的代码可以看出，increment函数每次都会重新创建，这样会导致子组件重新渲染。
  // 注意： useCallback并不能解决函数重复定义的问题。他只能解决函数传递给子组件时，子组件不必要的重新渲染问题。

  // 方法一： 使用相等性Ref配合useCallback来避免重复渲染
  // const countRef = useRef();

  // countRef.current = count;

  // const increment = useCallback(() => {
  //   console.log("increment重新渲染");
  //   setCount(countRef.current + 1);
  // }, []);

  // 方法二： 使用useCallback来避免重复渲染
  // const increment = useCallback(() => {
  //   console.log("increment重新渲染");
  //   setCount(count + 1);
  // }, [count]);

  const increment = () => {
    console.log("increment重新渲染");
    setCount(count + 1);
  };

  return (
    <div>
      <h2>计数器：{count} </h2>
      <button onClick={increment}>+ 1</button>

      <MYHome increment={increment} />

      <h2>message: {message}</h2>
      <button onClick={(e) => setMessage(Math.random())}>修改message</button>
    </div>
  );
});

export default UseCallbackComponent;
```

## 6. useMemo
- 对返回值进行缓存。
- 对比：useCallback对传入到组件的函数进行缓存。useMemo对值缓存。


### 1. useMemo使用

```javascript
// .UseMemoComponent.jsx
import React, { memo, useState, useMemo } from "react";

const HelloWorld = memo((props) => {
  console.log("hello world被渲染");
  return <h2>Hello World</h2>;
});

function calcNumTotal(num) {
  let total = 0;
  for (let i = 1; i <= num; i++) {
    total += i;
  }
  return total;
}

const UseMemoComponent = memo(() => {
  const [count, setCount] = useState(0);

  // 不依赖任何只，进行计算，只会在第一次渲染时执行
  //   const result = useMemo(() => {
  //     return calcNumTotal(count);
  //   }, []);

  // 依赖count，只有count发生变化时，才会执行
  const result = useMemo(() => {
    return calcNumTotal(count);
  }, [count]);

  // info会因为每次渲染都会重新创建，所以会导致子组件重新渲染
  // 使用useMemo
  const info = useMemo(() => {
    return { name: "hzy", age: 18 };
  }, []);

  return (
    <div>
      <h2>计算结果： {result}</h2>
      <h2>计数器：{count} </h2>
      <button onClick={(e) => setCount(count + 1)}>+1</button>
      <HelloWorld result={result} info={info} />
    </div>
  );
});

export default UseMemoComponent;
```

## 7. useRef

- 介绍： useRef
  - useRef能更方便的获取绑定ref的dom

### 1. 基础使用useRef
```javascript
// ./UseRefComponent.jsx
import React, { memo, useRef } from "react";

const UseRefComponent = memo(() => {
  const titleRef = useRef();
  const inputRef = useRef();

  function showTitleDom() {
    console.log(titleRef.current);
    inputRef.current.focus();
  }
  return (
    <div>
      UseRefComponent
      <h2 ref={titleRef}>hello world</h2>
      <input type="text" ref={inputRef} />
      <button onClick={showTitleDom}>查看title的Dom</button>
    </div>
  );
});

export default UseRefComponent;
```

### 2. 使用useRef绑定值

```javascript
import React, { memo, useCallback } from "react";

let obj = null;
const UseRefComponentBindValue = memo(() => {
  const [count, setCount] = React.useState(0);
  const nameRef = React.useRef();
  console.log(obj === nameRef); // true
  obj = nameRef;

  const countRef = React.useRef();
  countRef.current = count;

  const increment = useCallback(() => {
    setCount(countRef.current + 1);
  }, []);

  return (
    <div>
      UseRefComponentBindValue
      <h2>Hello world: {count}</h2>
      <button onClick={(e) => setCount(count + 1)}>+1</button>
      <button onClick={increment}>+1</button>
    </div>
  );
});

export default UseRefComponentBindValue;
```

## 8. useImperativeHandle

- 介绍：useImperativeHandle
  - 1. 限制父组件对子组件操控能力
  - 2. 在子组件中，使用`forwardRef`包裹，并用`useImperativeHandle`来**限制子组件对父组件传入的ref的操作**

```javascript
import React, { forwardRef, memo, useImperativeHandle, useRef } from "react";

const HelloWorld = memo(
  forwardRef((props, ref) => {
    const inputRef = useRef();
    // 限制子组件对父组件传入的ref的操作
    useImperativeHandle(ref, () => {
      return {
        focus() {
          console.log("focus");
          inputRef.current.focus();
        },
        setValue(value) {
          inputRef.current.value = value;
        },
      };
    });

    return <input type="text" ref={inputRef} />;
  })
);

const UseImperativeHandleComponent = memo(() => {
  const titleRef = useRef();
  const inputRef = useRef();

  const handleDom = () => {
    inputRef.current.focus();
    inputRef.current.setValue("hello");
  };

  return (
    <div>
      UseImperativeHandleComponent
      <h2 ref={titleRef}>哈哈哈</h2>
      <HelloWorld ref={inputRef} />
      <button onClick={handleDom}>Dom操作</button>
    </div>
  );
});

export default UseImperativeHandleComponent;
```

## 9. useLayoutEffect

- 介绍： useLayoutEffect
  - `useLayoutEffect`会在渲染内容更新到DOM之前执行，**会阻塞DOM更新**

```javascript
// 场景： 解决数字变更闪烁
// ./UseLayOutEffectSolveCounterBoliBoli.jsx
import React, { memo, useLayoutEffect, useState } from "react";

const UseLayOutEffectSolveCounterBoliBoli = memo(() => {
  const [count, setCount] = useState(0);

  useLayoutEffect(() => {
    console.log("useLayoutEffect");
    if (count === 0) {
      setCount(Math.random() + 100);
    }
  }, [count]);
  return (
    <div>
      UseLayOutEffectSolveCounterBoliBoli
      <h2>counter: {count}</h2>
      <button onClick={(e) => setCount(0)}>设置为0</button>
    </div>
  );
});

export default UseLayOutEffectSolveCounterBoliBoli;

```

## 10. 自定义Hooks

- 介绍：自定义hooks
  - 这个没啥好说的，就是自定义一个有返回值的函数。用的时候，执行这个函数拿到对应返回值就可以来。
  - 对应逻辑都在自定义hook中实现。


### 1. 自定义hooks

- `useScrollPosition`: 自定义获取鼠标位置参数hook
```javascript
// ./hooks/useScrollPosition.js
import { useEffect, useState } from "react";
const useScrollPosition = () => {
  const [scrollX, setScrollX] = useState(0);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollX(window.scrollX);
      setScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return [scrollX, scrollY];
};

export default useScrollPosition;
```

### 2. 使用自定义hook 
- `UseGetWindowScrollComponent`: 使用自定义hook --- `useScrollPosition`
```javascript
import React, { memo } from "react";
import { useScrollPosition } from "./hooks";

const UseGetWindowScrollComponent = memo(() => {
  const [scrollX, scrollY] = useScrollPosition();
  return (
    <div style={{ height: "2000px", width: "2000px" }}>
      UseGetWindowScrollComponent
      <div style={{ position: "fixed" }}>
        {" "}
        {scrollX} - {scrollY}
      </div>
    </div>
  );
});

export default UseGetWindowScrollComponent;
```

## 11. redux中使用hook
- 介绍redux中用的hook
  - useSelector： 获取redux定义的state
  - useDispatch： 获取redux中定义的action

### 1. 定义redux

- `counter.js`: 定义store必要组成
```javascript
// ./store/modules/counter.js

import { createSlice } from "@reduxjs/toolkit"

const counterSlice = createSlice({
  name: "counter",
  initialState: {
    count: 99,
    message: "Hello World"
  },
  reducers: {
    addNumberAction(state, { payload }) {
      state.count = state.count + payload
    },
    subNumberAction(state, { payload }) {
      state.count = state.count - payload
    },

    changeMessageAction(state, { payload }) {
      console.log(payload)
      state.message = payload
    }
  }
})

export const { addNumberAction, subNumberAction, changeMessageAction } = counterSlice.actions
export default counterSlice.reducer

```

- `index.js`: 导出store
```javascript
// ./store/index.js
import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "./modules/counter";

const store = configureStore({
  reducer: {
    counter: counterReducer,
  },
});

export default store;
```

### 2. 使用useSelector和useDispatch

- **UseHookInRedux**: 在Redux中使用useSelector和useDispatch
```javascript
// ./UseHookInRedux.jsx
import React, { memo } from "react";
import { shallowEqual, useSelector, useDispatch } from "react-redux";
import { addNumberAction } from "./store/modules/counter";

const UseHookInRedux = memo(() => {
  const { count } = useSelector((state) => {
    return {
      count: state.counter.count,
    };
  }, shallowEqual);

  const dispatch = useDispatch();

  const addNumberHandle = (num, isAdd = true) => {
    if (isAdd) {
      dispatch(addNumberAction(num));
    } else {
      dispatch(addNumberAction(num));
    }
  };

  return (
    <div>
      UseHookInRedux
      <h2>当前计数： {count}</h2>
      <button onClick={(e) => addNumberHandle(1)}>+1</button>
    </div>
  );
});

export default UseHookInRedux;
```

## 12. useId

- 介绍： useId
  - 为服务端渲染`NxtJs`提供，生成唯一id
  - 可以了解下hydration

```javascript
import React, { memo, useId } from "react";

const UseIdComponent = memo(() => {
  const [count, setCount] = React.useState(0);

  // 使用场景了解服务端渲染 hydration
  const id = useId();
  console.log(id);
  return <div>UseIdComponent</div>;
});

export default UseIdComponent;
```


## 13. useTransition
- 介绍： useTransition
  - 返回转换的pending状态，以及启动它的函数

```javascript
// ./UseTransitionComponent.jsx
import { memo, useState, useTransition } from "react";
import namesArray from "./namesArray";
const UseTransitionComponent = memo(() => {
  const [showNames, setShowNames] = useState(namesArray);
  const [pending, startTransition] = useTransition();

  const valueChangeHandler = (e) => {
    startTransition(() => {
      const keyWord = e.target.value;
      const filterShowNames = namesArray.filter((item) =>
        item.includes(keyWord)
      );
      setShowNames(filterShowNames);
    });
  };

  return (
    <div>
      <input type="text" onInput={valueChangeHandler} />
      <h2>用户名列表： {pending && <span>data loading</span>}</h2>
      <ul>
        {showNames.map((item, index) => {
          return <li key={index}>{item}</li>;
        })}
      </ul>
    </div>
  );
});

export default UseTransitionComponent;
```

## 14. useDeferredValue
- 介绍： 在用户交互紧急处理以后立即呈现新值
  - 如果当前呈现是紧急更新（如用户输入）的结果，React将返回之前的值，然后在紧急呈现完成后呈现新值。
  - 一旦其他工作完成，React就会立即处理更新（而不是等待任意时间），并且像开始过渡一样，延迟值可以挂起，而不会触发现有内容的意外回退。

- UseDeferredValueComponent: 进行筛选，使用useDeferredValue，在用户交互后输入结束后立马进行呈现新值。
```javascript
// ./UseDeferredValueComponent.jsx
import { memo, useState, useDeferredValue } from "react";
import namesArray from "./namesArray";

const UseDeferredValueComponent = memo(() => {
  const [showNames, setShowNames] = useState(namesArray);
  const deferedShowNames = useDeferredValue(showNames);

  const valueChangeHandler = (e) => {
    const keyWord = e.target.value;
    const filterShowNames = namesArray.filter((item) => item.includes(keyWord));
    setShowNames(filterShowNames);
  };

  return (
    <div>
      <input type="text" onInput={valueChangeHandler} />
      <h2>用户名列表：</h2>
      <ul>
        {deferedShowNames.map((item, index) => {
          return <li key={index}>{item}</li>;
        })}
      </ul>
    </div>
  );
});

export default UseDeferredValueComponent;
```

# END-关于我

[本文源码](https://github.com/codehzy/react18-base)

[掘金地址](https://juejin.cn/user/1714893872178823)
[个人博客](https://www.codehzy.cn/)
[GitHub](https://github.com/codehzy)