---
title: React全家桶
description: React18全家桶精讲
publishedAt: '2022-09-23'
lastUpdated: '2022-11-26'
tags: 'interview'
---

# React全家桶


## 一、[Redux](https://redux.js.org/)

### 1. **介绍：redux**
  - 1. 状态管理库，理解为独立于整个项目其他组件之外的一个仓库。可以在其中存数据，这样就可以从整个项目的不同组件来访问这个仓库的数据。
  - 2. 使用createStore传入redux来创建store，视图中**必须**使用`dispatch`来派发事件。具体逻辑走reducer中的action函数。处理完成后，驱动视图来更新。
  - 3. 通常为了方便管理，将整个redux拆分为四个js文件。分别为，index.js, actionCreators.js, constants.js, reducer.js


### 2-Definition. **定义Store**

- `index.js`
```javascript
// ./index.js
const { createStore } = require("redux");
const reducer = require("./reducer.js");

const store = createStore(reducer);

module.exports = store;
```

- `constants.js`
```javascript
// ./constants.js
const ADD_NUMBER = "add_number";
const CHANGE_NAME = "change_name";

module.exports = {
  ADD_NUMBER,
  CHANGE_NAME,
};
```

- `actionCreators.js`
```javascript
// ./actionCreators.js
const { ADD_NUMBER, CHANGE_NAME } = require("./constants");

const changeNameAction = (name) => ({
  type: CHANGE_NAME,
  name,
});

const addNumberAction = (number) => ({
  type: ADD_NUMBER,
  number,
});

module.exports = {
  changeNameAction,
  addNumberAction,
};
```

- `reducer.js`
```javascript
// ./reducer.js
const { ADD_NUMBER, CHANGE_NAME } = require("./constants");

const initialState = {
  name: "hzy",
  counter: 110,
};

function reducer(state = initialState, action) {
  switch (action.type) {
    case CHANGE_NAME:
      return { ...state, name: action.name };
    case ADD_NUMBER:
      return { ...state, counter: state.counter + action.number };
    default:
      return state;
  }
}

module.exports = reducer;
```

### 2-useStore. **使用Store以及派发事件**

```javascript
// use1. 使用Store中的数据
const store = require("../store");

console.log(store.getState());

// use2. 修改Store中的数据
const store = require("../store");
const { ADD_NUMBER, CHANGE_NAME } = require("../store/constants");

// 修改store中的数据

const nameAction = { type: CHANGE_NAME, name: "kobe" };
store.dispatch(nameAction);
console.log(store.getState());

const nameAction2 = { type: CHANGE_NAME, name: "james" };
store.dispatch(nameAction2);
console.log(store.getState());

const counterAction = { type: ADD_NUMBER, number: 100 };
store.dispatch(counterAction);
console.log(store.getState());

// use3. 订阅store中的数据
const store = require("../store");
const { changeNameAction } = require("../store/actionCreators");

const unsubscribe = store.subscribe(() => {
  console.log("store发生了变化", store.getState());
});
store.dispatch({ type: "CHANGE_NAME", name: "lisi" });

unsubscribe();

// use4: 动态生成的action
/**
 * redux代码优化:
 *  1.将派发的action生成过程放到一个actionCreators函数中
 *  2.将定义的所有actionCreators的函数, 放到一个独立的文件中: actionCreators.js
 *  3.actionCreators和reducer函数中使用字符串常量是一致的, 所以将常量抽取到一个独立constants的文件中
 *  4.将reducer和默认值(initialState)放到一个独立的reducer.js文件中, 而不是在index.js
 */

const store = require("../store");
const {
  changeNameAction,
  addNumberAction,
} = require("../store/actionCreators");

const unsubscribe = store.subscribe(() => {
  console.log("store发生了变化", store.getState());
});

store.dispatch(changeNameAction("zhangsan"));

unsubscribe();

store.dispatch(addNumberAction(10));
```

## 二、[React Redux](https://react-redux.js.org/introduction/getting-started)

### 1. 介绍：React Redux
 - 1. Redux本身是一个独立的库，可以与任何UI层或框架一起使用，包括React、Angular、Vue、Ember和vanilla JS。虽然Redux和React通常一起使用，但它们是相互独立的。
 - 2. 如果您将Redux与任何类型的UI框架一起使用，您通常会使用“UI绑定”库将Redux与您的UI框架联系在一起，而不是从您的UI代码直接与redux交互。
 - 3. React Redux是React的官方Redux UI绑定库。如果您同时使用Redux和React，您还应该使用React Redux绑定这两个库。

### 2. **使用react-redux改变定义store方法**

- `index.js`
```javascript
// ./index.js

import { createStore, applyMiddleware } from "redux";
import reducer from "./reducer";

import thunk from "redux-thunk";

// redux-devtools
const store = createStore(reducer, applyMiddleware(thunk));

export default store;
```


- `constants.js`
```javascript
// ./constants.js

export const ADD_NUMBER = "add_number"
export const SUB_NUMBER = "sub_number"

export const CHANGE_BANNERS = "change_banners"
export const CHANGE_RECOMMENDS = "change_recommends"
```

- `actionCreators.js`
```javascript
// ./actionCreators.js

import * as actionTypes from "./constants"
import axios from "axios"

export const addNumberAction = (num) => ({
  type: actionTypes.ADD_NUMBER,
  num
})

export const subNumberAction = (num) => ({
  type: actionTypes.SUB_NUMBER,
  num
})


export const changeBannersAction = (banners) => ({
  type: actionTypes.CHANGE_BANNERS,
  banners
})

export const changeRecommendsAction = (recommends) => ({
  type: actionTypes.CHANGE_RECOMMENDS,
  recommends
})


export const fetchHomeMultidataAction = () => {
  // 如果是一个普通的action, 那么我们这里需要返回action对象
  // 问题: 对象中是不能直接拿到从服务器请求的异步数据的
  // return {}

  return function(dispatch, getState) {
    // 异步操作: 网络请求
    // console.log("foo function execution-----", getState().counter)
    axios.get("http://123.207.32.32:8000/home/multidata").then(res => {
      const banners = res.data.data.banner.list
      const recommends = res.data.data.recommend.list

      // dispatch({ type: actionTypes.CHANGE_BANNERS, banners })
      // dispatch({ type: actionTypes.CHANGE_RECOMMENDS, recommends })
      dispatch(changeBannersAction(banners))
      dispatch(changeRecommendsAction(recommends))
    })
  }

  // 如果返回的是一个函数, 那么redux是不支持的
  // return foo
}
```

- `reducer.js`
```javascript
// ./reducer.js

import * as actionTypes from "./constants";

const initialState = {
  counter: 100,

  banners: [],
  recommends: [],
};

function reducer(state = initialState, action) {
  switch (action.type) {
    case actionTypes.ADD_NUMBER:
      return { ...state, counter: state.counter + action.num };
    case actionTypes.SUB_NUMBER:
      return { ...state, counter: state.counter - action.num };
    case actionTypes.CHANGE_BANNERS:
      return { ...state, banners: action.banners };
    case actionTypes.CHANGE_RECOMMENDS:
      return { ...state, recommends: action.recommends };
    default:
      return state;
  }
}

export default reducer;
```

- `index.tsx`: 项目根目录的主入口
```javascript
// ./index.tsx

<Provider store={store}>
    <App />
</Provider>
```

## 2.UseStore **使用Store以及派发事件**

- `XAbout.tsx`: 某个组件

```javascript
// ./pages/XAbout.tsx

import React, { PureComponent } from "react";
import { connect } from "react-redux";
// import store from "../store"
import {
  addNumberAction,
  subNumberAction,
  changeBannersAction,
  changeRecommendsAction,
  fetchHomeMultidataAction,
} from "../store/actionCreators";

export class XAbout extends PureComponent {
  calcNumber(num, isAdd) {
    if (isAdd) {
      console.log("加", num);
      this.props.addNumber(num);
    } else {
      console.log("减", num);
      this.props.subNumber(num);
    }
  }

  componentDidMount() {
    this.props.fetchHomeMultiData();
  }

  // componentDidMount() {
  //   axios.get("http://123.207.32.32:8000/home/multidata").then((res) => {
  //     const data = res.data.data;
  //     this.props.changeBanners(data.banner.list);
  //     this.props.changeRecommends(data.recommend.list);
  //   });
  // }

  render() {
    const { counter, banners, recommends } = this.props;

    return (
      <div>
        <h2>About Page: {counter}</h2>
        <div>
          <button onClick={(e) => this.calcNumber(6, true)}>+6</button>
          <button onClick={(e) => this.calcNumber(88, true)}>+88</button>
          <button onClick={(e) => this.calcNumber(6, false)}>-6</button>
          <button onClick={(e) => this.calcNumber(88, false)}>-88</button>
        </div>
        <div className="banner">
          <h2>轮播图数据:</h2>
          <ul>
            {banners.map((item, index) => {
              return <li key={index}>{item.title}</li>;
            })}
          </ul>
        </div>
        <div className="recommend">
          <h2>推荐数据:</h2>
          <ul>
            {recommends.map((item, index) => {
              return <li key={index}>{item.title}</li>;
            })}
          </ul>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  counter: state.counter,
  banners: state.banners,
  recommends: state.recommends,
});

const mapDispatchToProps = (dispatch) => ({
  addNumber(num) {
    dispatch(addNumberAction(num));
  },
  subNumber(num) {
    dispatch(subNumberAction(num));
  },
  changeBanners(banners) {
    dispatch(changeBannersAction(banners));
  },
  changeRecommends(recommends) {
    dispatch(changeRecommendsAction(recommends));
  },
  fetchHomeMultiData() {
    dispatch(fetchHomeMultidataAction());
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(XAbout);
```

## 三、[ReduxToolkit](https://redux-toolkit.js.org/)


### 1. 介绍：ReduxToolkit
- 1. Redux Toolkit包旨在成为编写Redux逻辑的标准方式。它最初是为了帮助解决有关Redux的三个常见问题而创建的：
  - 配置Redux Store太复杂了
  - 我必须添加很多包才能让Redux做任何有用的事情
  - Redux需要太多的样板代码
- 2. 简而言之：让我们更愉快的使用store，更少的去写样板代码，而在此后配合Hooks写法。
- 3. 让我们来修改一下之前写的Redux代码。


### 2. 定义Store
- `index.js`: store出口
```javascript
// ./index.js

import { configureStore } from "@reduxjs/toolkit";

import counterReducer from "./features/counter";
import homeReduce from "./features/home";

const store = configureStore({
  reducer: {
    counter: counterReducer,
    home: homeReduce,
  },
});

export default store;
```

- `counter.js`: 定义核心1
```javascript
// ./features/counter.js

import { createSlice } from "@reduxjs/toolkit";

const counterSlice = createSlice({
  name: "counter",
  initialState: {
    counter: 888,
  },
  reducers: {
    addNumber(state, { payload }) {
      state.counter = state.counter + payload;
    },
    subNumber(state, { payload }) {
      state.counter = state.counter - payload;
    },
  },
});

export const { addNumber, subNumber } = counterSlice.actions;
export default counterSlice.reducer;
```

- `home.js`: 定义核心2
```javascript
// ./features/home.js

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchHomeMultidataAction = createAsyncThunk(
  "fetch/homemultidata",
  async (extraInfo, { dispatch, getState }) => {
    // 1.发送网络请求, 获取数据
    const res = await axios.get("http://123.207.32.32:8000/home/multidata");

    // 2.取出数据, 并且在此处直接dispatch操作(可以不做)
    const banners = res.data.data.banner.list;
    const recommends = res.data.data.recommend.list;
    dispatch(changeBanners(banners));
    dispatch(changeRecommends(recommends));
    // 3.返回结果, 那么action状态会变成fulfilled状态
    return res.data;
  }
);

const homeSlice = createSlice({
  name: "home",
  initialState: {
    banners: [],
    recommends: [],
  },
  reducers: {
    changeBanners(state, { payload }) {
      state.banners = payload;
    },
    changeRecommends(state, { payload }) {
      state.recommends = payload;
    },
  },
});

export const { changeBanners, changeRecommends } = homeSlice.actions;
export default homeSlice.reducer;
```

### 2. 使用Store

- `About.js`: 消费store
```javascript
// ./pages/About.js
import { connect } from "react-redux";
import React, { PureComponent } from "react";
import { fetchHomeMultidataAction } from "../store/features/home";

export class XXXAbout extends PureComponent {
  componentDidMount() {
    this.props.fetchHomeMultidata();
  }

  render() {
    const { counter, banners, recommends } = this.props;
    return (
      <div>
        <h2>Home Counter: {counter}</h2>
        <h2>Banners: </h2>
        <ul>
          {banners.map((banner, index) => {
            return <li key={index}>{banner.title}</li>;
          })}
        </ul>
        <h2>Recommends: </h2>
        <ul>
          {recommends.map((recommend, index) => {
            return <li key={index}>{recommend.title}</li>;
          })}
        </ul>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  counter: state.counter.counter,
  banners: state.home.banners,
  recommends: state.home.recommends,
});

const mapDispatchToProps = (dispatch) => ({
  fetchHomeMultidata() {
    dispatch(fetchHomeMultidataAction());
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(XXXAbout);
```



## 四、[React-Router](https://reactrouter.com/en/main)


### 1. 介绍：React-Router
  1. 客户端路由允许您的应用程序通过单击链接来更新URL，而无需从服务器再次请求另一个文档。相反，您的应用程序可以立即呈现一些新的用户界面，并使用fetch发出数据请求，以使用新信息更新页面。
  2. Router主要作为多个页面之间的之间**导航作用。**

### 2. **case1-React-Router导航**

`./router/index.js`: 单独维护路由表
```javascript
// ./router/index.js`

import Home from '../pages/Home'
import HomeRecommend from "../pages/HomeRecommend"
import HomeRanking from "../pages/HomeRanking"
import HomeSongMenu from '../pages/HomeSongMenu'
// import About from "../pages/About"
// import Login from "../pages/Login"
import Category from "../pages/Category"
import Order from "../pages/Order"
import NotFound from '../pages/NotFound'
import Detail from '../pages/Detail'
import User from '../pages/User'
import { Navigate } from 'react-router-dom'
import React from 'react'

const About = React.lazy(() => import("../pages/About"))
const Login = React.lazy(() => import("../pages/Login"))

const routes = [
  {
    path: "/",
    element: <Navigate to="/home"/>
  },
  {
    path: "/home",
    element: <Home/>,
    children: [
      {
        path: "/home",
        element: <Navigate to="/home/recommend"/>
      },
      {
        path: "/home/recommend",
        element: <HomeRecommend/>
      },
      {
        path: "/home/ranking",
        element: <HomeRanking/>
      },
      {
        path: "/home/songmenu",
        element: <HomeSongMenu/>
      }
    ]
  },
  {
    path: "/about",
    element: <About/>
  },
  {
    path: "/login",
    element: <Login/>
  },
  {
    path: "/category",
    element: <Category/>
  },
  {
    path: "/order",
    element: <Order/>
  },
  {
    path: "/detail/:id",
    element: <Detail/>
  },
  {
    path: "/user",
    element: <User/>
  },
  {
    path: "*",
    element: <NotFound/>
  }
]


export default routes
```

`App.jsx`: 使用路由表

```javascript
import React from 'react'
import { Link, Navigate, Route, Routes, useNavigate, useRoutes } from 'react-router-dom'
import routes from './router'
import "./style.css"

export function App(props) {
  const navigate = useNavigate()
  
  function navigateTo(path) {
    navigate(path)
  }

  return (
    <div className='app'>
      <div className='header'>
        <span>header</span>
        <div className='nav'>
          <Link to="/home">首页</Link>
          <Link to="/about">关于</Link>
          <Link to="/login">登录</Link>
          <button onClick={e => navigateTo("/category")}>分类</button>
          <span onClick={e => navigateTo("/order")}>订单</span>

          <Link to="/user?name=why&age=18">用户</Link>
        </div>
        <hr />
      </div>
      <div className='content'>
        {useRoutes(routes)}
      </div>
      <div className='footer'>
        <hr />
        Footer
      </div>
    </div>
  )
}

export default App
```

- `./hoc/with-router/js`: 定义路由高阶函数,增强并获取一些参数
```javascript
import { useState } from "react"
import { useLocation, useNavigate, useParams, useSearchParams } from "react-router-dom"

// 高阶组件: 函数
function withRouter(WrapperComponent) {
  return function(props) {
    // 1.导航
    const navigate = useNavigate()

    // 2.动态路由的参数: /detail/:id
    const params = useParams()

    // 3.查询字符串的参数: /user?name=why&age=18
    const location = useLocation()
    const [searchParams] = useSearchParams()
    const query = Object.fromEntries(searchParams)

    const router = { navigate, params, location, query }

    return <WrapperComponent {...props} router={router}/>
  }
}

export default withRouter
```

- `./pages/About.jsx`： 定义组件About
```javascript
// ./pages/About.jsx

import React, { PureComponent } from 'react'

export class About extends PureComponent {
  render() {
    return (
      <div>
        <h1>About Page</h1>
      </div>
    )
  }
}

export default About
```

- `./pages/Login.jsx`： 定义组件
```javascript
// ./pages/Login.jsx

import React, { PureComponent } from 'react'
import { Navigate } from 'react-router-dom'

export class Login extends PureComponent {
  constructor(props) {
    super(props)

    this.state = {
      isLogin: false
    }
  }
  
  login() {
    this.setState({ isLogin: true })
  }

  render() {
    const { isLogin } = this.state

    return (
      <div>
        <h1>Login Page</h1>
        {!isLogin ? <button onClick={e => this.login()}>登录</button>: <Navigate to="/home"/>}
      </div>
    )
  }
}

export default Login
```

- `./pages/Home.jsx`： 定义组件Home
```javascript
// ./pages/Home.jsx

import React, { PureComponent } from 'react'
import { Link, Outlet } from 'react-router-dom'
import { withRouter } from "../hoc"

export class Home extends PureComponent {
  navigateTo(path) {
    const { navigate } = this.props.router
    navigate(path)
  }

  render() {
    return (
      <div>
        <h1>Home Page</h1>
        <div className='home-nav'>
          <Link to="/home/recommend">推荐</Link>
          <Link to="/home/ranking">排行榜</Link>
          <button onClick={e => this.navigateTo("/home/songmenu")}>歌单</button>
        </div>

        {/* 占位的组件 */}
        <Outlet/>
      </div>
    )
  }
}

export default withRouter(Home)
```


- `./pages/Detail.jsx`： 定义组件Detail
```javascript
// ./pages/Detail.jsx

import React, { PureComponent } from 'react'
import { withRouter } from '../hoc'

export class Detail extends PureComponent {
  render() {
    const { router } = this.props
    const { params } = router

    return (
      <div>
        <h1>Detail Page</h1>
        <h2>id: {params.id}</h2>
      </div>
    )
  }
}

export default withRouter(Detail)
```


# END-关于我

[本文源码](https://github.com/codehzy/react18-base)

[掘金地址](https://juejin.cn/user/1714893872178823)
[个人博客](https://www.codehzy.cn/)
[GitHub](https://github.com/codehzy)