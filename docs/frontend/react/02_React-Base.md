---
title: React基础
description: React18基础语法讲解
publishedAt: '2022-09-23'
lastUpdated: '2022-11-26'
tags: 'interview'
---

# React18


- 文中有些案例过长： 请选择性观看。
- 一文解决React基本使用，如果看不太懂React官网，建议可以看看本文。


## 一、类组件
### 1. **class组件注意点**

  - 继承React中`Component`组件
  - 在constructor中执行`super()`以及定义`state`
  - 函数定义及绑定，注意`this`指向
    - 1. 函数定义为箭头函数
    - 2. 使用es6 class Filed
    - 3. 使用`bind`来改变this指向
  - 注意使用`setState()`函数来改变`state`中的值，这样React才可以在数据更改后，重新执行render函数。

### 2. **case1-Counter**

```javascript
import React, { Component } from 'react'

export default class Counter extends Component {
  constructor() {
    super()

    this.state = {
      message: 'Hello world',
      counter: 100,
    }

    this.increment = this.increment.bind(this)
    this.decrement = this.decrement.bind(this)
  }

  // methods
  increment() {
    this.setState({
      counter: this.state.counter + 1,
    })
  }

  decrement() {
    this.setState({
      counter: this.state.counter - 1,
    })
  }

  render() {
    const { counter } = this.state

    return (
      <div>
        <h2>current-Counter: {counter}</h2>
           <button onClick={this.increment}>+1</button>
           <button onClick={this.decrement}>-1</button>
      </div>
    )
  }
}
```

### 3. **case2-FirstProject**

```javascript
import React, { Component } from 'react'

export default class FirstProject extends Component {
    constructor(props) {
    super(props)

    this.state = {
      movies: ["星际穿越", "流浪地球", "独行月球", "大话西游", "火星救援"]
    }
  }

  render() {
    return (
      <div>
        <h2>movie-list</h2>
        <ul>
          {this.state.movies.map(movie => <li>{movie}</li>)}
        </ul>
      </div>
    )
  }
}
```

## 二、函数组件

### 1. **函数组件注意点**
  - 1. 函数通过返回`jsx`来进行渲染
  - 2. 注意搭配React-Hooks来使用，详细需要了解[Hook具体用法](https://reactjs.org/docs/hooks-reference.html)
  - 3. 尤其注意：使用Hooks来对你的函数组件进行优化，避免多余的重复渲染。

### 2. **case1：CounterHook**

```javascript
import { memo, useState } from "react";
function CounterHook() {
  const [counter, setCounter] = useState(0);
  return (
    <div>
      <h2>Counter: {counter}</h2>
      <button onClick={() => setCounter(counter + 1)}>+1</button>
      <button onClick={() => setCounter(counter - 1)}>-1</button>
    </div>
  );
}

export default memo(CounterHook);
```


## 三、JSX语法

### 1. **介绍JSX**
  - 1. 具体语法参考React官方的[JSX](https://reactjs.org/docs/introducing-jsx.html)
  - 2. 在React中，没有`Vue`的`template`，所有UI部分都是使用JSX来书写。

### 2. **case1-JSXInsertContent**
  
```javascript
import * as React from 'react'

export default class JSXInsertContent extends React.Component {
  constructor() {
    super()
    this.state = {
      counter: 100,
      message: 'Hello World',
      names: ['abc', 'cba', 'nba'],

      aaa: undefined,
      bbb: null,
      ccc: true,

      friend: { name: 'kobe' },


      firstName: 'kobe',
      lastName: 'bryant',

      age: 20,

      movies: ['流浪地球', '星际穿越', '独行月球'],
    }
  }

  render() {
    // 1. insert-identifier
    const { message, names, counter } = this.state
    const { aaa, bbb, ccc } = this.state
    const { friend } = this.state

    const { firstName, lastName } = this.state
    const fullName = firstName + ' ' + lastName

    const { age } = this.state
    const ageText = age >= 18 ? '成年人' : '未成年人'
    const liEls = this.state.movies.map((movie) => <li>{movie}</li>)
    return (
      <div>
        <h2>{message}</h2>
        <h2>{names}</h2>
        <h2>{counter}</h2>

        <h2>{counter}</h2>


        <h2>{String(aaa)}</h2>
        <h2>{bbb + ''}</h2>
        <h2>{ccc.toString()}</h2>

        <h2>{friend.name}</h2>
        <h2>{Object.keys(friend)[0]}</h2>

        <h2>{10 + 20}</h2>
        <h2>{fullName}</h2>

        <h2>{ageText}</h2>
        <h2>{age >= 18 ? "one" : "two" }</h2>

        {/* <ul>{liEls}</ul> */}
        <ul>{this.state.movies.map(movie => <li>{movie}</li>)}</ul>
      </div>
    )
  }
}
```

### 3. **case1-JSXBindAttribute**

```javascript
import React, { Component } from 'react'

import './02-attribute.css'

export default class JSXBindAttribute extends Component {
  constructor(){
    super()

    this.state = {
      title: "哈哈哈",
      imgURL: "https://ts1.cn.mm.bing.net/th/id/R-C.95bc299c3f1f0e69b9eb1d0772b14a98?rik=W5QLhXiERW4nLQ&riu=http%3a%2f%2f20178405.s21i.faiusr.com%2f2%2fABUIABACGAAgoeLO-wUo4I3o2gEw8Qs4uAg.jpg&ehk=N7Bxe9nqM08w4evC2kK6yyC%2bxIWTjdd6HgXsQYPbMj0%3d&risl=&pid=ImgRaw&r=0",
      href: "https://www.baidu.com",

      isActive: true,
      objStyle: {color: "red", fontSize: "30px"}
    }
  }
  render() {
    const { href,imgURL,title,isActive,objStyle} = this.state
    return (
      <div>
        <a href={href}>{title}</a>
        <img src={imgURL} alt={title} style={{height:'100px'}}></img>

        <div style={{color: objStyle.color,fontSize: objStyle.fontSize}}>
          add inline-style in JSX
        </div>


        <div className={isActive ? objStyle.color : ''}>
          JSX ----
        </div>
      </div>
    )
  }
}

```

- **JSX本质**
  - 1. React使用`React.createElement`函数将JSX转化，最终创建元素。
  - 2. 会将JSX转换成使用`React.createElement`构建的对应DOM树

- **转换前： React组件编写**

```javascript
// 1.定义App根组件
  class App extends React.Component {
    constructor() {
      super()
      this.state = {
        message: "Hello World"
      }
    }

    render() {
      const { message } = this.state

      return (
        <div>
          <div className="header">Header</div>
          <div className="Content">
            <div>{message}</div>
            <ul>
              <li>列表数据1</li>
              <li>列表数据2</li>
              <li>列表数据3</li>
              <li>列表数据4</li>
              <li>列表数据5</li>
            </ul>
          </div>
          <div className="footer">Footer</div>
        </div>
      )
    }
  }
```

- **转换后： React组件转换后**

```javascript
import React, { Component } from 'react'

export default class JSXConvert extends Component {
    constructor(){
        super()

        this.state = {
            message: "Hello World"
        }
    }
    
  render() {

    const element = React.createElement(
        "div",
        null,
/*#__PURE__*/ React.createElement(
          "div",
          {
            className: "header"
          },
          "Header"
        ),
/*#__PURE__*/ React.createElement(
          "div",
          {
            className: "Content"
          },
  /*#__PURE__*/ React.createElement("div", null, "Banner"),
  /*#__PURE__*/ React.createElement(
            "ul",
            null,
    /*#__PURE__*/ React.createElement(
              "li",
              null,
              "\u5217\u8868\u6570\u636E1"
            ),
    /*#__PURE__*/ React.createElement(
              "li",
              null,
              "\u5217\u8868\u6570\u636E2"
            ),
    /*#__PURE__*/ React.createElement(
              "li",
              null,
              "\u5217\u8868\u6570\u636E3"
            ),
    /*#__PURE__*/ React.createElement(
              "li",
              null,
              "\u5217\u8868\u6570\u636E4"
            ),
    /*#__PURE__*/ React.createElement("li", null, "\u5217\u8868\u6570\u636E5")
          )
        ),
/*#__PURE__*/ React.createElement(
          "div",
          {
            className: "footer"
          },
          "Footer"
        )
      );

    return (
      <div>{element}</div>
    )
  }
}
```


## 四、组件生命周期函数

### 1. **介绍： [组件生命周期](https://reactjs.org/docs/react-component.html#componentdidmount)**
  - 1. 通常我们在类组件中使用组件生命周期函数来执行代码，从而保证页面数据正产渲染。
  - 2. 类组件-生命周期函数分类：
    - `componentDidMount`: 组件被渲染到DOM: 被挂载到DOM
    - `componentDidUpdate`:  组件的DOM被更新完成： DOM发生更新
    - `componentWillUnmount`: 组件从DOM中卸载掉： 从DOM移除掉
    - `shouldComponentUpdate`: 该声明周期返回`true`可以正常使得组件执行`componentDidUpdate`渲染，返回`false`则会拒绝更新渲染。
    - `getSnapshotBeforeUpdate`: 它使您的组件能够在DOM可能被更改之前从DOM捕获一些信息（例如滚动位置）
  - 3. 等后文，介绍Hooks时候，对函数式组件怎么来声明周期再详细讲解

### 2. **case1-组件生命周期函数**

```javascript
import React from "react";

class HelloWorld extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            message: 'hello world'
        }
    }

    changeText() {
        this.setState({message: 'hello react'})
    }

    render(){
        const {message} = this.state
        return (
            <div>
                <h2>{message}</h2>
                <p>{message}是程序员的第一个代码!</p>
                <button onClick={e => this.changeText()}>修改文本</button>
            </div>
        )
    }

    // 组件被渲染到DOM: 被挂载到DOM
    componentDidMount() {
        console.log('Hello-world componentDidMount')
    }

    // 组件的DOM被更新完成： DOM发生更新
    componentDidUpdate(prevProps, prevState, snapshot) {
        console.log('Hello-world componentDidUpdate')
    }

    // 组件从DOM中卸载掉： 从DOM移除掉
    componentWillUnmount() {
        console.log('Hello-world componentWillUnmount')
    }


    // 不常用的生命周期补充
    shouldComponentUpdate(nextProps, nextState, nextContext) {
        return true
    }

    getSnapshotBeforeUpdate(prevProps, prevState) {
        console.log('Hello-world getSnapshotBeforeUpdate')
        return {
            scrollPosition: 1000
        }
    }
}

export default HelloWorld
```

## 五、父子组件通信

- **介绍： 父子组件通信**
  - 1. 父 -> 子
  - 2. 子 -> 父
  - 3. 非父子组件通信
    - Context
    - EventBus

- **详解：父子组件通信**

### 1. **父 -> 子**

- 核心代码
```javascript
<Child title='轮播图' banners={banners} productList={productList}/>
```

- 完整代码

```javascript
// Father.jsx

import React from 'react'
import axios from 'axios'
import Child from "./Child";

export default class Father extends React.Component{
    constructor(props) {
        super(props)

        this.state = {
            message: "Father",
            banners: [],
            productList: []
        }
    }

    componentDidMount() {
        const getListData = async () => {
            const {data} = await axios.get('http://123.207.32.32:8000/home/multidata')
            const banners = data.data.banner.list
            const recommends = data.data.recommend.list
            this.setState({banners, productList: recommends})
        }
        getListData()
    }

    render(){
        const {message,banners,productList } = this.state
        return (
                <div className='father'>
                    <div>{message}</div>
                    <Child title='轮播图' banners={banners} productList={productList}/>
                </div>
        )
    }
}

// Child.jsx
import React from "react";
import styled from './fater.module.css'
import PropTypes from "prop-types";
import GrandSon from "./GrandSon";

export default  class Child extends React.Component{
    constructor(props) {
        super(props)

        this.state = {
            message: "Child"
        }
    }
    render(){
        const {title,banners,productList } = this.props
        const { message } = this.state
        return (
            <div className={styled.banner}>
                <h2>封装一个轮播图: {title}</h2>
                <ul>
                    {
                        banners.map(item => {
                            return <li key={item.acm}>{message} ----- {item.title}</li>
                        })
                    }
                </ul>
                <GrandSon productList={productList}/>
            </div>
        )
    }
}

Child.propTypes = {
    banners: PropTypes.array,
    title: PropTypes.string
}

Child.defaultProps = {
    banners: [],
    title: '默认标题'
}

// GrandSon.jsx
import React from "react";
import PropTypes from "prop-types";

export default class GrandSon extends React.Component{
    constructor(props) {
        super(props)

        this.state = {
            message: "GrandSon"
        }
    }
    render(){
        const { productList } = this.props
        const { message } = this.state
        return (
            <div>
                {
                    productList.map(item => {
                        return <li key={item.acm}>{message} ---- {item.title}</li>
                    })
                }
            </div>
        )
    }
}

GrandSon.propTypes = {
    productList: PropTypes.array
}

GrandSon.defaultProps = {
    productList: []
}
```

### 2. **子 -> 父**

- **核心代码**

```javascript
// Father.jsx
  getTitle(title){
    console.log(title)
    this.setState({sonTitle: title})
  }

  <Son getTitle={title => this.getTitle(title)}/>

// Son.jsx
  handleClick = (title) => {
      this.props.getTitle(title)
  }
  <button onClick={() => this.handleClick(title)}>子传输给父</button>
```

- **完整代码**

```javascript
// Father.jsx
import React from "react";
import Son from "./Son";

export default class Father extends React.Component{
    constructor(props) {
        super(props)

        this.state = {
            message: "Father",
            sonTitle: "传输数据"
        }
    }
    getTitle(title){
        console.log(title)
        this.setState({sonTitle: title})
    }

    render(){
        const { message,sonTitle } = this.state
        return (
            <div>
                <div>{message}</div>
                <div>sonSendTitle: {sonTitle}</div>
                <Son getTitle={title => this.getTitle(title)}/>
            </div>
        )
    }
}

// Son.jsx
import React from "react";

export default class Son extends React.Component{
    constructor(props) {
        super(props)

        this.state = {
            message: "Son",
            title: "Son的传输数据"
        }
    }

    handleClick = (title) => {
        this.props.getTitle(title)
    }

    render(){
        const { message,title } = this.state
        return (
            <div>
                <div>{message}</div>
                <button onClick={() => this.handleClick(title)}>子传输给父</button>
            </div>
        )
    }
}
```

2. **MAX: 组件通信案例练习 - 实现tab切换，导航栏**

```javascript
// Communicate.jsx
import TabControl from "./TabControl";
import React from "react";

export default class Communicate extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            titles: ["新款", "精选", "流行"],
            tabIndex: 0
        }
    }

    tabClick(index){
        this.setState({
            tabIndex: index
        })
    }

    render(){
        const {titles, tabIndex} = this.state;
        return (
            <div>
                <TabControl titles={titles} tabClick={(i) => this.tabClick(i)} />
                <h1>{titles[tabIndex]}</h1>
            </div>
        )
    }
}

// TabControl.jsx
import React from "react";
import styled from './styled.module.css'

export default class TabControl extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            currentIndex: 0
        }
    }

    itemClick(index){
        this.setState({
            currentIndex: index
        })

        this.props.tabClick(index);
    }

    render() {
        const { titles }  = this.props;
        const { currentIndex } = this.state;
        return (
            <div className={styled.tabControl}>
                {
                    titles.map((item,index) => {
                        return (
                            <div className={`${styled.item} ${index === currentIndex ? styled.active : ""}`} key={item} onClick={() => this.itemClick(index)}>
                                <span className={styled.text}>{item}</span>
                            </div>
                        )
                    })
                }
            </div>
        )
    }
}
```

### 3. 非父子组件通信


#### 3.1 Context

- **介绍： Context**
  - 1. 使用`createContext`创建对应的Context
  - 2. 使用创建出的Context的`Provider`作为父组件，其中所有被嵌套的子组件使用对应`Context-Consumer`来**消费**Context中的数据
  - 3. 主要方式方式为： 回调函数，参数为`value`，value中就能拿到外层嵌套的Context中的数据

**case1-Context**


```javascript
// ./context/theme-Context.js
import React from "react";

const ThemeContext = React.createContext({color: 'blue', size: 10})

export default ThemeContext

// ./Context.jsx
import React from "react";
import Home from "./Home";
import ThemeContext from "./Context/theme-context";
import UserContext from "./Context/user-context";

export default  class  Context  extends  React.Component {
    constructor(props) {
        super(props);

        this.state = {
            info: { name: "kobe", age: 30 }
        }
    }

    render(){
        const { info } = this.state
        return (
            <div>
                <h1>Context</h1>

                {/* 1. 普通传值   */}
                {/*<Home name={info.name} age={info.age} />*/}
                {/*<Home {...info} />*/}
                  <ThemeContext.Provider value={{color: 'red',size:30}}>
                      <Home {...info} />
                  </ThemeContext.Provider>

            </div>
        )
    }
}

// ./ThemeContext.jsx
import ThemeContext from "./Context/theme-context";

export default function HomeBanner() {
  return (
    <div>
      <h2>HomeBanner</h2>
        <ThemeContext.Consumer>
            {
                value => {
                    return <h2>Banner theme: {value.color}</h2>
                }
            }
        </ThemeContext.Consumer>
    </div>
  );
}
```


#### 3.2 EventBus

- **介绍： 通过EventBus来派发数据**
  - 1. 使用EventBus的`on`方法来添加事件名
  - 2. 使用EventBus的`emit`方法将值传递给对应事件名

```javascript 
// ./utils/event-bus.js

import { HYEventBus } from "hy-event-store"

const eventBus = new HYEventBus()

export default eventBus


// ./EventBus.jsx

import React from "react";
import Home from "./Home";
import eventBus from './utils/event-bus'


export default class EventBus extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
        name: "kobe",
        age: 30,
        height: 180
    }
  }


  bannerPrevClick(info) {
    console.log("app中监听到bannerPrev", info)
  }

  bannerNextClick(name, age, height) {
    console.log("app中监听到bannerNext", name, age, height)
    this.setState({ name, age, height })
  }

  componentDidMount() {
    eventBus.on('bannerPrev', this.bannerPrevClick,this)
    eventBus.on('bannerNext', this.bannerNextClick,this)
  }



  render() {
    const { name,age,height } = this.state
    return (
      <div>
        <h1>EventBus: Component: {name}-{age}-{height}</h1>
        <Home />
      </div>
    );
  }
}

// ./HomeBanner.jsx

import React from "react";
import eventBus from './utils/event-bus'

export default class HomeBanner extends React.Component {


    prevClick(){
        console.log('上一个')
        eventBus.emit('bannerPrev', {nickname: "kobe", level: 99})
    }

    nextClick(){
        console.log('下一个')
        eventBus.emit('bannerNext', 'james', 35, 190)
    }


    render() {
        return (
            <div>
                <h1>HomeBanner</h1>
                <button onClick={() => this.prevClick()}>上一个</button>
                <button onClick={() => this.nextClick()}>下一个</button>
            </div>
        );
    }
}
```

## 六、React中插槽实现

### 1. 普通插槽
- **介绍： react中并没有类似Vue的插槽**
  - 1. react将要传入的DOM或者组件嵌套在组件标签中
  - 2. 在被使用组件中`props`中获取`children`，children为数组，对应索引就是刚才传入的DOM或者组件，直接从`children`中取出并渲染。

```javascript
// ./Slot.jsx

import React from "react";
import NavBar from "./nav-bar";
import NavBarTwo from "./nav-bar-two";

export default class Slot extends React.Component {
    render() {
        const btn = <button>按钮2</button>;
        return (
            <div>
                <NavBar>
                    <button>按钮</button>
                    <h2>哈哈哈</h2>
                    <i>斜体文本</i>
                </NavBar>

                <NavBarTwo left={btn} center={<h2>hehehe</h2>} right={<i>微软雅黑</i>} />
            </div>
        )
    }
}

// ./nav-bar/index.jsx
import React from "react";
import styled from './styled.module.css'

export default class NavBar extends React.Component {
    render(){
        const { children } = this.props
        return(
            <div className={styled.navBar}>
                <div className={styled.left}>{children[0]}</div>
                <div className={styled.center}>{children[1]}</div>
                <div className={styled.right}>{children[2]}</div>
            </div>
        )
    }
}
```

### 2. 作用域插槽


#### **case1-作用域插槽**

```javascript
// .ScopedSlot

import React from "react";
import TabControl from "./TabControl";

export default class ScopedSlot extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            titles: ["流行", "新款", "精选"],
            tabIndex: 0
        }
    }

    tabClick(index){
        this.setState({tabIndex: index})
    }

    getTabItem(item) {
        if (item === "流行") {
            return <span>{item}</span>
        } else if (item === "新款") {
            return <button>{item}</button>
        } else {
            return <i>{item}</i>
        }
    }


    render(){
        const { titles,tabIndex } = this.state
        return (
            <div>
                <TabControl titles={titles} tabClick={(index) => this.tabClick(index)}  itemType={item => this.getTabItem(item)} />
                <h1>{titles[tabIndex]}</h1>
            </div>
        )
    }
}

// ./TabControl/index.jsx
import React from "react";
import styled from './styled.module.css'

export default class TabControl extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            currentIndex: 0
        }
    }

    itemClick(index){
        this.setState({currentIndex: index})

        this.props.tabClick(index)
    }

    render(){
        const { titles,itemType} = this.props
        const {currentIndex} = this.state
        return (
            <div className={styled.tabControl}>
                {
                    titles.map((item,index) => {
                        return (
                            <div className={`${styled.item} ${index === currentIndex ? styled.active : ''}`} key={item} onClick={() => this.itemClick(index)}>
                                {/*<span className={styled.text}>{item}</span>*/}
                                {itemType(item)}
                            </div>
                        )
                    })
                }
            </div>
        )
    }
}
```

## 七、SetState

### 1. **SetState注意点**
  - 1. 在类组件中，定义的state可以通过`setState`来修改值，此方法为`异步`
    - 1. 方式一： 直接传入要修改的对象
    - 2. 方式二： 返回要修改的对象
    - 3. 方式三： SetState第一个参数传入要修改的对象，第二个参数传入回调函数。此方法可以同步获取`setState`设置后的值。
  - 2. React会将多次调用的`setState`

### 2. **case1-SetState**

```javascript
import React from "react";

export default class SetStateComponent extends React.Component {
    constructor(props){

        super(props);

        this.state = {
            message: "hello",
            count: 0
        }
    }

    changeText(){
        // case1: 直接修改state
        // this.setState({
        //     message: "world"
        // })

        // case2
        // this.setState((state,props) => {
        //     return {
        //         message: '111'
        //     }
        // })

        // case3
        this.setState({message: '111'},() => {
            console.log(this.state.message)
        })
        console.log(this.state.message) //可以同步 获取到111
    }

    render(){
        const { message } = this.state
        return (
            <>
                <h2>{message}</h2>
                <button onClick={() => this.changeText()}>changeText</button>
            </>
        )
    }
}
```

### 3. **case2-setState设计成异步**

```javascript
import React from "react";

export default  class SetStateAsync extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            message: "hello",
            counter: 0
        }
    }

    increment(){
        console.log("------")

        // this.setState({
        //   counter: this.state.counter + 1
        // })
        //
        // this.setState({
        //   counter: this.state.counter + 1
        // })
        //
        // this.setState({
        //   counter: this.state.counter + 1
        // })
        // + 1

        // this.setState((state) => {
        //   return {
        //     counter: state.counter + 1
        //   }
        // })
        //
        // this.setState((state) => {
        //   return {
        //     counter: state.counter + 1
        //   }
        // })
        //
        // this.setState((state) => {
        //   return {
        //     counter: state.counter + 1
        //   }
        // })
        // + 3
    }

    render(){
        const { counter } = this.state
        return (
            <>
                <h1>{counter}</h1>
                <button onClick={() => this.increment()}>increment</button>
            </>

        )
    }
}
```

## 八、PureComponent数据不可变的力量


### 1. 介绍：[PureComponent](https://reactjs.org/docs/react-api.html#reactpurecomponent)
  1. React.PureComponent类似于React.Component.它们之间的区别在于React.Component不实现的是应ComponentUpdate()
  2. React.PureComponent实现它与浅道具和状态比较
  3. 我们extends PureComponent，并不会修改原数据，而是浅拷贝一份，修改拷贝出的值。

```javascript
// .StateNoChange.jsx

import React, {PureComponent} from "react";

export default  class StateNoChange extends PureComponent{
    constructor(props) {
        super(props);

        this.state = {
            books: [
                { name: "你不知道JS", price: 99, count: 1 },
                { name: "JS高级程序设计", price: 88, count: 1 },
                { name: "React高级设计", price: 78, count: 2 },
                { name: "Vue高级设计", price: 95, count: 3 },
            ],
            friend: {
                name: "kobe"
            },
            message: "Hello World"
        }
    }

    addBookCount(index){
        const books = [...this.state.books]
        books[index].count++
        this.setState({books})
    }



    addNewBook(){
        const newBook = { name: "Angular高级设计", price: 88, count: 1 }

        // 1.直接修改原有的state, 重新设置一遍
        // 在PureComponent是不能引入重新渲染(re-render)
        this.state.books.push(newBook)
        this.setState({books: this.state.books})

        // 2.赋值一份books, 在新的books中修改, 设置新的books
        // const books = [...this.state.books]
        // books.push(newBook)
        // this.setState({books})
    }


    render() {
        const { books } = this.state

        return (
            <div>
                <h2>数据列表</h2>
                <ul>
                    {
                        books.map((item, index) => {
                            return (
                                <li key={index}>
                                    <span>name:{item.name}-price:{item.price}-count:{item.count}</span>
                                    <button onClick={()=> this.addBookCount(index)}>+1</button>
                                </li>
                            )
                        })
                    }
                </ul>
                <button onClick={() => this.addNewBook()}>添加新书籍</button>
            </div>
        )
    }
}
```

## 九、Ref获取DOM和组件


### 1. ref获取DOM

- **case-精简**

```javascript
  this.titleRef = createRef()
  this.titleEl = null

  <h2 ref={this.titleRef}>你好</h2>
  <h2 ref={el => this.titleEl = el}>凄凄切切</h2>
```


- **case-完整**
```javascript
import React, {createRef} from "react";

export default class RefGetDOM extends React.Component {
    constructor(props){
        super(props);

        this.titleRef = createRef()
        this.titleEl = null
    }

    getNativeDom(){
        console.log('1',this.refs.hzy)

        console.log('2',this.titleRef.current)

        console.log('3',this.titleEl)
    }

    render(){
        return (
            <div>
                <h2 ref='hzy'>Hello world</h2>
                <h2 ref={this.titleRef}>你好</h2>
                <h2 ref={el => this.titleEl = el}>凄凄切切</h2>
                <button onClick={() => this.getNativeDom()}>获取DOM</button>
            </div>
        )
    }
}
```

### 2. ref获取类组件实例

- **case-精简**

```javascript
  this.xxRef = createRef()

  <HelloWorld ref={this.xxRef}/>
```

- **case-完整**

```javascript
import React, {createRef, PureComponent} from "react";

class HelloWorld extends PureComponent {
    test() {
        console.log("test------")
    }

    render() {
        return <h1>Hello World</h1>
    }
}


export default class RefComponent extends PureComponent {
    constructor(props) {
        super(props);

        this.xxRef = createRef()
    }

    getComponent() {
        console.log(this.xxRef.current)
        this.xxRef.current.test()
    }

    render() {
        return (
            <>
                <HelloWorld ref={this.xxRef}/>
                <button onClick={() => this.getComponent()}>getComponent</button>
            </>
        )
    }
}
```

### 3. ref获取函数组件的DOM

- **case-精简**

```javascript
  this.xxRef = createRef()
  <HelloWorld ref={this.xxRef} />

  const HelloWorld = forwardRef(function (props,ref){
      return (
          <>
              <h1 ref={ref}>Hello world</h1>
              <p>哈哈哈</p>
          </>
      )
  })
```

- **case-完整**

```javascript
import React, {createRef, forwardRef, PureComponent} from "react";

const HelloWorld = forwardRef(function (props,ref){
    return (
        <>
            <h1 ref={ref}>Hello world</h1>
            <p>哈哈哈</p>
        </>
    )
})

export default class RefComponent extends PureComponent{
    constructor(props){
        super(props)

        this.xxRef = createRef()
    }

    getComponent(){
        console.log(this.xxRef.current)
    }

    render(){
        return (
            <>
                <HelloWorld ref={this.xxRef} />
                <button onClick={() => this.getComponent()}>获取组件实例</button>
            </>
        )
    }
}
```

## 十、受控组件和非受控组件


### 1. 介绍：受控和非受控组件
  1. [受控组件](https://reactjs.org/docs/forms.html#controlled-components)：表单元素，如`<enter>、<text Area>和<select>`通常会维护自己的状态，并根据用户输入进行更新。在React中，可变状态通常保留在组件的state属性中，并且仅使用setState（）进行更新。
  2. [非受控组件](https://reactjs.org/docs/uncontrolled-components.html#gatsby-focus-wrapper)：要编写不受控组件，您可以使用ref从DOM获取表单值，而不是为每个状态更新编写事件处理程序。

### 2. **case-受控组件**

```javascript
import React, { PureComponent } from 'react'

export class Control extends PureComponent {
  constructor() {
    super()

    this.state = {
      username: "hzy"
    }
  }

  inputChange(event) {
    console.log("inputChange:", event.target.value)
    this.setState({ username: event.target.value })
  }

  render() {
    const { username } = this.state

    return (
      <div>
        {/* 受控组件 */}
        <input type="checkbox" value={username} onChange={e => this.inputChange(e)}/>

        {/* 非受控组件 */}
        <input type="text" />
        <h2>username: {username}</h2>
      </div>
    )
  }
}

export default Control
```

### 3. **case-非受控组件**

```javascript
import React, { createRef, PureComponent } from 'react'

export class UnControlComponent extends PureComponent {

  constructor() {
    super()

    this.state = {
      username: "",
      password: "",
      isAgree: false,
      hobbies: [
        { value: "sing", text: "唱", isChecked: false },
        { value: "dance", text: "跳", isChecked: false },
        { value: "rap", text: "rap", isChecked: false }
      ],
      fruit: ["orange"],
      intro: "哈哈哈"
    }

    this.introRef = createRef()
  }

  componentDidMount() {
    // this.introRef.current.addEventListener
  }

  handleSubmitClick(event) {
    // 1.阻止默认的行为
    event.preventDefault()

    // 2.获取到所有的表单数据, 对数据进行组件
    console.log("获取所有的输入内容")
    console.log(this.state.username, this.state.password)
    const hobbies = this.state.hobbies.filter(item => item.isChecked).map(item => item.value)
    console.log("获取爱好: ", hobbies)
    console.log("获取结果:", this.introRef.current.value)

    // 3.以网络请求的方式, 将数据传递给服务器(ajax/fetch/axios)
  }

  handleInputChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  handleAgreeChange(event) {
    this.setState({ isAgree: event.target.checked })
  }

  handleHobbiesChange(event, index) {
    const hobbies = [...this.state.hobbies]
    hobbies[index].isChecked = event.target.checked
    this.setState({ hobbies })
  }

  handleFruitChange(event) {
    const options = Array.from(event.target.selectedOptions)
    const values = options.map(item => item.value)
    this.setState({ fruit: values })

    // 额外补充: Array.from(可迭代对象)
    // Array.from(arguments)
    const values2 = Array.from(event.target.selectedOptions, item => item.value)
    console.log(values2)
  }

  render() {
    const { username, password, isAgree, hobbies, fruit, intro } = this.state

    return (
      <div>
        <form onSubmit={e => this.handleSubmitClick(e)}>
          {/* 1.用户名和密码 */}
          <div>
            <label htmlFor="username">
              用户: 
              <input 
                id='username' 
                type="text" 
                name='username' 
                value={username} 
                onChange={e => this.handleInputChange(e)}
              />
            </label>
            <label htmlFor="password">
              密码: 
              <input 
                id='password' 
                type="password" 
                name='password' 
                value={password} 
                onChange={e => this.handleInputChange(e)}
              />
            </label>
          </div>

          {/* 2.checkbox单选 */}
          <label htmlFor="agree">
            <input 
              id='agree' 
              type="checkbox" 
              checked={isAgree} 
              onChange={e => this.handleAgreeChange(e)}
            />
            同意协议
          </label>

          {/* 3.checkbox多选 */}
          <div>
            您的爱好:
            {
              hobbies.map((item, index) => {
                return (
                  <label htmlFor={item.value} key={item.value}>
                    <input 
                      type="checkbox"
                      id={item.value} 
                      checked={item.isChecked}
                      onChange={e => this.handleHobbiesChange(e, index)}
                    />
                    <span>{item.text}</span>
                  </label>
                )
              })
            }
          </div>

          {/* 4.select */}
          <select value={fruit} onChange={e => this.handleFruitChange(e)} multiple>
            <option value="apple">苹果</option>
            <option value="orange">橘子</option>
            <option value="banana">香蕉</option>
          </select>

          {/* 5.非受控组件 */}
          <input type="text" defaultValue={intro} ref={this.introRef} />

          <div>
            <button type='submit'>注册</button>
          </div>
        </form>
      </div>
    )
  }
}

export default UnControlComponent
```

## 十一、高阶组件

### 1. 介绍：高阶组件
  1. 高阶组件（HOC）是React中用于重用组件逻辑的高级技术。
  2. 通俗的说法，高阶组件就是支持传入一个组件，然后返回一个组件，在高阶组件中可以对传入组件进行`增强`或者`拦截`操作。


### 2. **case1-高阶组件登录鉴权**


```javascript
// 高阶组件 ./hoc/loginAuth.js
function loginAuth(OriginComponent) {
  return (props) => {
    const token = localStorage.getItem("token");

    if (token) {
      return <OriginComponent {...props} />;
    } else {
      return <h2>请先登录，再跳转到对应页面</h2>;
    }
  };
}

export default loginAuth;


// .LoginAuth.jsx
import React, { PureComponent } from "react";
import Cart from "./page/Cart";
export class LoginAuth extends PureComponent {
  constructor() {
    super();

    this.state = {
      isLogin: false,
    };
  }

  loginClick() {
    localStorage.setItem("token", "123456");

    this.setState({ isLogin: true });

    // this.forceUpdate();
  }

  render() {
    return (
      <div>
        <button onClick={(e) => this.loginClick()}>登录</button>
        <Cart />
      </div>
    );
  }
}

export default LoginAuth;

// ./Cart.jsx
import React, { PureComponent } from 'react'
import loginAuth from '../hoc/login_auth'

export class Cart extends PureComponent {
  render() {
    return (
      <h2>Cart Page</h2>
    )
  }
}

export default loginAuth(Cart)
```


## 十二、Portals

### 1. 介绍：Portals
  - 1. 学过Vue同学，参考Teleport用法就可以
  - 2. 将某个元素渲染到root以外的指定含有id的DOM上

### 2. **case1-Portals**

```javascript
// .index.html
<div id="modal"></div>

// .Modal.jsx
import { PureComponent } from "react";
import { createPortal } from "react-dom";

class Modal extends PureComponent {
  render() {
    return createPortal(this.props.children, document.querySelector("#modal"));
  }
}

export default Modal;

// .Portals
import { PureComponent } from "react";
import { createPortal } from "react-dom";
import Modal from "./Modal";

export class PortalsComponent extends PureComponent {
  render() {
    return (
      <div className="app">
        <h1>App H1</h1>
        {createPortal(<h2>App h2</h2>, document.querySelector("#zxs"))}

        <Modal>
          <h2>我是标题</h2>
          <p>我是内容 Modal</p>
        </Modal>
      </div>
    );
  }
}

export default PortalsComponent;
```


## 十三、React动画

### 1. 介绍React动画(react-transition-group)
   1. CSSTransition: 来给某个单元素定义动画，分为appear,enter,appear-active,enter-active,exit,exit-active
   2. SwitchTransition: 切换消失隐藏动画，分为enter,enter-active,exit,exit-active
   3. TransitionGroup: 对一组显示（比如列表）定义动画，分为enter,enter-active,exit,exit-active

### 2. **case1-CSSTransition**

```css
/* ./styles.css */

.hzy-appear,
.hzy-enter {
  opacity: 0;
}

.hzy-appear-active,
.hzy-enter-active {
  opacity: 1;
  transition: opacity 2s ease;
}

.hzy-exit {
  opacity: 1;
}

.hzy-exit-active {
  opacity: 0;
  transition: opacity 2s ease;
}
```

```javascript
// ./CSSTransition.jsx

import React, { PureComponent, createRef } from "react";
import { CSSTransition } from "react-transition-group";
import "./styles.css";

export class CssTransitionComponent extends PureComponent {
  constructor(props) {
    super();

    this.state = {
      isShow: true,
    };

    this.sectionRef = createRef();
  }
  render() {
    const { isShow } = this.state;

    return (
      <>
        <button onClick={(e) => this.setState({ isShow: !isShow })}>
          切换
        </button>

        <CSSTransition
          nodeRef={this.sectionRef}
          in={isShow}
          unmountOnExit={true}
          classNames="hzy"
          timeout={2000}
          appear
          onEnter={(e) => console.log("开始进入动画")}
          onEntering={(e) => console.log("执行进入动画")}
          onEntered={(e) => console.log("执行进入结束")}
          onExit={(e) => console.log("开始离开动画")}
          onExiting={(e) => console.log("执行离开动画")}
          onExited={(e) => console.log("执行离开结束")}
        >
          <div className="section" ref={this.sectionRef}>
            <h2>哈哈哈</h2>
            <p>我是内容, 哈哈哈</p>
          </div>
        </CSSTransition>
      </>
    );
  }
}

export default CssTransitionComponent;
```

### 3. **case2-SwitchTransition**

```css
.login-enter {
  transform: translateX(100px);
  opacity: 0;
}

.login-enter-active {
  transform: translateX(0);
  opacity: 1;
  transition: all 1s ease;
}

.login-exit {
  transform: translateX(0);
  opacity: 1;
}

.login-exit-active {
  transform: translateX(-100px);
  opacity: 0;
  transition: all 1s ease;
}
```

```javascript
import React, { PureComponent } from "react";
import { CSSTransition, SwitchTransition } from "react-transition-group";
import "./style.css";

export class SwitchTransitionComponent extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      isLogin: true,
    };
  }

  render() {
    const { isLogin } = this.state;

    return (
      <div>
        <SwitchTransition mode="out-in">
          <CSSTransition
            key={isLogin ? "exit" : "login"}
            classNames="login"
            timeout={1000}
          >
            <button onClick={() => this.setState({ isLogin: !isLogin })}>
              {isLogin ? "退出" : "登录"}
            </button>
          </CSSTransition>
        </SwitchTransition>
      </div>
    );
  }
}

export default SwitchTransitionComponent;
```

### 4. **case3-TransitionGroup**

```css
.book-enter {
  transform: translateX(-150px);
  opacity: 0;
}

.book-enter-active {
  transform: translateX(0);
  opacity: 1;
  transition: all 1s ease;
}

.book-exit {
  transform: translateX(0);
  opacity: 1;
}

.book-exit-active {
  transform: translateX(150px);
  opacity: 0;
  transition: all 1s ease;
}
```

```javascript
import React, { PureComponent } from "react";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import "./style.css";

export class TransitionGroupComponent extends PureComponent {
  constructor() {
    super();
    this.state = {
      books: [
        { id: 111, name: "你不知道JS", price: 99 },
        { id: 222, name: "JS高级程序设计", price: 88 },
        { id: 333, name: "VueJs高级设计", price: 77 },
      ],
    };
  }

  removeBook(index) {
    const books = [...this.state.books];
    books.splice(index, 1);
    this.setState({
      books,
    });
  }

  addNewBook() {
    const books = [...this.state.books];
    books.push({ id: new Date().getTime(), name: "React高级设计", price: 66 });
    this.setState({ books });
  }
  render() {
    const { books } = this.state;
    return (
      <div>
        <h2>书籍列表</h2>
        <TransitionGroup component="ul">
          {books.map((item, index) => {
            return (
              <CSSTransition key={item.id} timeout={1000} classNames="book">
                <li>
                  <span>
                    {item.name}-{item.price}
                    <button onClick={() => this.removeBook(index)}>删除</button>
                  </span>
                </li>
              </CSSTransition>
            );
          })}
        </TransitionGroup>
        <button onClick={(e) => this.addNewBook()}>添加新书籍</button>
      </div>
    );
  }
}

export default TransitionGroupComponent;
```

## 十四、React中使用CSS

### 1. 介绍:React中使用CSS
  1. 内联样式： 将样式写在DOM标签中，不推荐
  2. 普通的css样式写法： 将css写在文件中，而后将css引入到jsx文件中（不推荐，React中会污染其他的组件样式）
  3. CSSModules: 通过import将某个css文件按照变量方式引入，再在jsx的DOM上使用{}语法加入className（**推荐**）
  4. CSSinJS: 需要添加`styled-components`库，可以使用js方式写css,最终生成一个组件，嵌套在jsx外面就可以了（**非常推荐**）。
  5. 扩展： `classnames`库，可以帮助我们，将多个Class类名很好的融合。

### 2. **case1-内联样式**

```javascript
import React, { PureComponent } from "react";

export class ReactInLineCss extends PureComponent {
  constructor() {
    super();
    this.state = {
      titleSize: 30,
    };
  }

  addTitleSize() {
    this.setState({ titleSize: this.state.titleSize + 10 });
  }

  render() {
    const { titleSize } = this.state;
    return (
      <div>
        <button onClick={(e) => this.addTitleSize()}>addTitleSize</button>
        <h2 style={{ color: "red", fontSize: `${titleSize}px` }}>我是标题</h2>
        <p style={{ color: "blue", fontSize: "20px" }}>我是内容</p>
      </div>
    );
  }
}

export default ReactInLineCss;
```

### 3. **case2-普通的css样式写法**

```css
/* .style.css */
.title {
  color: red;
}
```

```javascript
// ./NormalCssComponent.jsx
import React, { PureComponent } from "react";
import "./style.css";

export class NormalCssComponent extends PureComponent {
  render() {
    return <div className="title">NormalCssComponent</div>;
  }
}

export default NormalCssComponent;
```

### 4. **case3-CSSModules**

```css
/* ./style.module.css */

.title {
  color: purple;
  font-size: 50px;
}
```

```javascript
// ./CSSModulesComponent.jsx

import React, { PureComponent } from "react";
import styled from "./style.module.css";
export class CSSModulesComponent extends PureComponent {
  render() {
    return <div className={styled.title}>CSSModulesComponent</div>;
  }
}

export default CSSModulesComponent;
```


### 5. **case4-CSSinJS**

```javascript
/* css in JS -> .style.js */
import styled from "styled-components";

export const AppWrapper = styled.div`
  .footer {
    border: 1px solid orange;
  }
`;

export const SectionWrapper = styled.div.attrs((props) => ({
  size: props.size || "1em",
}))`
  .title {
    font-size: ${(props) => props.size}px;
  }
`;
```

```javascript
import React, { PureComponent } from "react";
import { AppWrapper, SectionWrapper } from "./style";

export class CSSInJs extends PureComponent {
  constructor() {
    super();

    this.state = {
      size: 200,
      color: "yellow",
    };
  }

  render() {
    const { size } = this.state;

    return (
      <AppWrapper>
        <SectionWrapper size={size}>
          <h2 className="title">title</h2>
        </SectionWrapper>
        <div className="footer">
          <p>免责声明</p>
          <p>本网站所有内容均为原创，转载请注明出处</p>
        </div>
      </AppWrapper>
    );
  }
}

export default CSSInJs;
```

### 6. **case5-扩展-classnames**


```javascript
import React, { PureComponent } from "react";
import classNames from "classnames";

export class ClassNameLibrary extends PureComponent {
  constructor() {
    super();

    this.state = {
      isbbb: true,
      isaaa: true,
    };
  }
  render() {
    const { isaaa, isbbb } = this.state;
    const classList = ["ccc"];
    if (isbbb) classList.push("bbb");
    if (isaaa) classList.push("aaa");
    const classname = classList.join(" ");
    return (
      <div>
        <h2 className={`ccc ${isaaa ? "aaa" : ""}`}>哈哈哈</h2>
        <h2 className={classname}>哈哈哈</h2>

        <h2 className={classNames("ccc", { aaa: isaaa, bbb: isbbb })}>嘿嘿</h2>
        <h2 className={classNames(["ccc", { aaa: isaaa, bbb: isbbb }])}>
          哈哈
        </h2>
      </div>
    );
  }
}

export default ClassNameLibrary;
```

## END-关于我

[本文源码](https://github.com/codehzy/react18-base)

[掘金地址](https://juejin.cn/user/1714893872178823)
[个人博客](https://www.codehzy.cn/)
[GitHub](https://github.com/codehzy)

