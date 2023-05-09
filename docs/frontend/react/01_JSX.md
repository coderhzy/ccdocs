# JSX
## 1.  recognize
- JSX is a syntax extension of JavaScript(*Extension*), and it is also called `JavaScript XML` in many places, because it looks like a section of XML syntax.
- It is used to describe our UI interface, and its completion can be used with JavaScript.
- It is different from the module syntax in Vue. You don't need to learn some instructions in the syntax of module (such as `v-for`,`v-bind`,`v-if`)
- They are inseparable between them, so React does not separate the mark into different files, but combines them together. This place is component.
## 2. Writing specification
- The top layer of JSX can only have one root element, so we often wrap a div element.
- In order to facilitate reading, we usually wrap a small parentheses `()` on the outer layer of JSX, which can be easy to read, and JSX can be replaced by a row.
- The labels in JSX can be a single label or a dual tag. If it is a single label, it must end at `</>`
## 3. Use JSX
- JSX insert variables as sub-elements.
	- 1. When the variable is `Number`,`String`,`Array` type, can be displayed directly.
	- 2. When the variable is `null`,`undefined`,`Boolean` type, the content is empty.
- JSX insert expression
	- 1. operational expression
	- 2. triple computing symbol
	- 3. execute a function
- JSX binding attribute
	- 1. element has title attribute
	- 2.`<img />` has src attribute
	- 3. `<a />` has href  attribute
	- 4. element maybe need binding class
	- 5. original use inline-style
- JSX event binding
	- 1. Naming of React Event uses camel case, and not pure lowercase
	- 2. We need to pass the event processing function through {}, which will be executed at the time of the event.
## 4. In React this binding issues
- 1. After the event is executed, we may need to obtain the related attributes in the current class. You need to use this as this time.
	- If we print this directly here, we will also find that it is an undefined.
- 2. **Why is undefined ?**
	- The reason is that the `getThis` function is not actively called by us, and when button changes, the `getThis` function is called internally by React
	- And when it is called internally, it does not know how to bind this correct this;
```jsx
// :question
import React, { Component } from 'react'

export default class Counter1 extends Component {
    constructor(){
        super()
        this.state = {}
    }

    getThis () {
        console.log(this)
    } 

    
    render() {
        return (
        <div>
            <button onClick={this.getThis}>get this</button>
        </div>
        )
    }
}

// :solution
// case1: Bind to getThis to display binding this Scheme
<button onClick={this.getThis.bind(this)}>get this</button>

// case2: Use Es6 class fields syntax
getThis() = () => {
	console.log(this)
}

// case3: pass in arrow function when event monitoring(personal recommendation)
<button onClick={() => this.goThis()}>get this</button>
```
## 5.  Event parameter passing
- When executing the event function, it is possible that we need to obtain some parameter information: such as event object, other parameters:
	- case1: Get the event object
		- Many times we need to get the event object to do something(like block the default behavior)
		- Then by default, the event objects is passed directly, and the function can get the event object;
	- case2: Get more parameters
		- When there are more parameters, our best way is to pass in an arrow function, an actively executed event function, and pass in other related parameters;
```jsx
import React, { Component } from 'react'

export default class JSXEventParameters extends Component {
    constructor(){
        super()

       this.state ={
            name: 'nice'
       } 
    }

    btnClick(event,name,age){
        console.log("btnClick:", event, this)
        console.log("name, age:", name, age)
    }

  render() {

    return (
      <div>
        {/* 1. event参数传递 */}
        <button onClick={(event) => this.btnClick(event)}>event-parameters</button>

        {/* 2. 额外传递参数 */}
        <button onClick={(event) => this.btnClick(event,'nice',18)}>extra-event-parameters</button>
      </div>
    )
  }
}
```
## 6.  React Conditional Rendering
- some cases, the content of  the interface will display different content according to different situations, or decide whether to render a certain part of the content. In vue, we will control  through commands: such as `v-if` ,`v-show`
- In React, all conditional judgments are consistent  with normal JavaScript code;
	- What are the common ways of conditional rendering? 
		- method1: `conditional judgment statement` ----- suitable for more logic
		- method2:  `Triple computing symbol`  ---- simple way suitbale logic
		- method3:  `and operator &&` ----- suitable for rendering a certain component if the condition is true; if this condition is not true, no content is rendered;
	- achieve the effect of  `v-show`
		- Mainly to control whether the `display` property is none.
```jsx
import React, { Component } from "react";

export default class JSXConditionRender extends Component {
  constructor() {
    super();

    this.state = {
      message: "Hello World",
      isShow: true,
    };
  }

  changShow(){
    this.setState({isShow: !this.state.isShow})
  }

  render() {
    const { message, isShow } = this.state;

    let showElement = null
    if (isShow) {
        showElement = <h2>{message}</h2>
    }

    return (
      <div>
        <button onClick={() => this.changShow()}>toggle</button>
        {/* 1. 条件判断 */}
        {showElement}
       
        {/* 2. 三元运算符 */}
        {isShow ? <h2>{message}</h2> : null}
        {/* 3. 逻辑与运算符 */}
        {isShow && <h2>{message}</h2>}
      </div>
    );
  }
}
```
## 7. React list rending
- In real development, we will request a large amount of data from the server, and the data will be stored in the from of a list: sunch as the data of songs, singers, and chart lists;
	- Such as product , shopping cart, review list data
	- Such as friend message,news , contact list data
- There is no v-for instruction in React like the Vue module syntax, and we need to organize the data in the way of JavaScript code and covert it to JSX. But JSX in React is precisely beacause it it seamessly integrated with JavaScript , making it more flexiable;
	- we binding key in map element `<div>` attributes, **use key can be improve the efficency of the diff algorithm**.
```jsx
import React, { Component } from 'react'

export default class JSXListRender extends Component {
    constructor(){
        super()

        this.state = {
            students: [
              { id: 111, name: "why", score: 199 },
              { id: 112, name: "kobe", score: 98 },
              { id: 113, name: "james", score: 199 },
              { id: 114, name: "curry", score: 188 },
            ]
          }
    }
  render() {
    const {students} = this.state

    return (
      <div>
        <h2>学生列表</h2>
        <div>
            {
                students.filter(item => item.score > 100).map(item => {
                    return (
                        <div style={{display: 'flex'}} key={item.id}>
                            <h3>学号：{item.id}</h3>
                            <h3>姓名：{item.name}</h3>
                            <h3>分数：{item.score}</h3>
                        </div>
                    )
                })
            }
        </div>
      </div>
    )
  }
}
```
## 8. JSX-Essence
- JSX is just syntactic sugar for `React.createElement (component, props,... children) functions`.
- createElement need pass three events
	- event one : type
		- The type of the current ReactElement
		- if it is a label element, then use string to represent "div"; 
		- if it is a compont element, then use the name of the component directly
	- event two : config
		- All properties in jsx are stored in config as properties and values of objects; 
		- such as passing className as the class of the element;
	- event three: children
		- The content stored in the tag is stored as a children array;
		- Of course, what if there are multiple elements? React processes them internally.