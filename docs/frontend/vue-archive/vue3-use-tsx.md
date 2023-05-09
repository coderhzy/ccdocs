## 在 vue3 中使用 jsx

本篇介绍在 vue3 中使用 tsx 的使用方法，之前博主有一篇根据路由生成菜单的文章，里面也介绍了 jsx
语法的基本使用：[vue3+jsx 使用递归组件实现无限级菜单](https://www.jianshu.com/p/73264214a97e)

本篇聚焦于 vue3 中使用 tsx，从基础语法到复杂使用，再到一些特殊情况的处理方法，并且对照传统 template
写法，目的是覆盖日常开发的全部使用。本篇主要是总结 tsx 的使用，至于跟 template 写法的优劣以及原理，博主不会深入。

### 在项目中使用

### 安装与配置

首先要安装插件：

```sh
npm insatll @vue/babel-plugin-jsx --save
```

这是这个插件的
github：[babel-plugin-jsx](https://links.jianshu.com/go?to=https%3A%2F%2Fgithub.com%2Fvuejs%2Fbabel-plugin-jsx)  
在 github 可以学到一些基础用法

安装完后在项目的 `babel.config.js` 文件的 plugins 中添加配置：

```js
module.exports = {
    presets: ["@vue/cli-plugin-babel/preset"],
    plugins: ["@vue/babel-plugin-jsx"],
};
```

### vue3 的 tsx 文件基本结构

到这一步就配置好了，接下来看在组件中怎么使用：  
tsx 文件就相当一个 ts 文件，里面都是 ts 代码，不能像 vue 文件一样出现 html 和 css，我们在 tsx 文件中返回一个组件

```js
import {defineComponent} from "vue";

export default defineComponent({
    setup() {
        return () => {
            return <div>hello tsx</div>;
        };
    },
});
```

setup 如果返回一个函数，那么这个函数就是 render 函数，然后在 render 函数中返回我们的组件模板也就是 html，然后 setup
里面的其他东西与使用 vue 文件一模一样，所以 tsx 文件在用法上可以理解就是将 template 转移到 render 函数中。

### 基本语法对照 vue 文件写法

### defineComponent 与 setup 基本结构

上面说到 tsx 写法上就是把 template 转移到 render 函数中，defineComponent 的其他配置，与 setup 其他参数与用法无区别：

```js
import {defineComponent, ref, reactive} from "vue";

export default defineComponent({
    props: {},
    setup(props) {
        const msg = ref("hello tsx");
        const state = reactive({
            count: 1,
        });

        return () => {
            return (
                <div>
                    {msg.value}
                    <span>{state.count}</span>
                </div>
            );
        };
    },
});
```

render 函数中的模版可以直接使用整个文件的变量，通过上面的代码可以看到，tsx 使用变量是使用一个 `{}` ，只要在 tsx
想使用任何非字符串的代码，都需要用 `{}` 包裹，包括数字、布尔、函数表达式等

### 指令

#### bind:

```js
vue文件：
<
com :data = "data" > < /com>

tsx文件：
<com data={data}></com>
```

这里表示传递给子组件的数据，顺便说一下引入组件写法的区别  
vue 文件， 需要注册，且在 template 中可以将驼峰换成中划线：

```js
import TestCom from './test-com.vue'

export default defineComponent({
    components: {
        TestCom
    }
})

在template中：
<template>
    <test-com></test-com>
</template>
```

在 tsx 文件，不需要注册，且不能修改名称:

```js
import TestCom from "./test-com.vue";

export default defineComponent({
    setup() {
        return () => {
            return <TestCom></TestCom>;
        };
    },
});
```

#### v-if

```js
vue文件：
<div v-if="flag"></div>

tsx文件，js逻辑代码必须用大括号包裹：
{
    flag ? <div></div> : null
}
```

#### v-show

```js
vue文件：
<div v-show="flag"></div>

tsx文件，插件已处理，可以直接使用：
<div v-show={flag}></div>
```

#### v-for

```js
vue文件：
<ul>
    <li v-for="item in list"
    :key="item">{{item}}
</li>
</ul>

tsx文件：
<ul>
    {
        list.map((item) => {
            return <li key={item}>{item}</li>
        })
    }
</ul>
```

#### v-model

##### v-model 普通用法

```js
vue文件：
<input v-model="keyword"/>

tsx文件：
<input v-model={keyword}/>
```

##### v-model 传递参数

vue2.0 可以用 v-bind.sync 来做组件的数据的双向绑定，vue3 移除了这个语法，改用了 v-model 的写法，先来看看在 vue 文件中 2.0 和
3.0 的区别：

```js
2.0
< ChildComponent
:
title.sync = "pageTitle" / >

    然后在子组件里面使用：
this.$emit('update:title', newValue)
就可以更新父组件传递的值

3.0
< ChildComponent
v - model = "pageTitle" / >
    在子组件里面会接收到一个modelValue（默认名称）的变量
同样：
this.$emit('update:modelValue', newValue)
就可以更新父组件pageTitle的值

如果不想使用默认名称modelValue，就可以传递参数:
    <ChildComponent v-model:pageTitle="pageTitle"/>
子组件接收到的props就有一个pageTitle的变量
```

tsx 文件写法：

```js
<ChildComponent v-model={[pageTitle, 'pageTitle']}/>
传递一个数组，第一项为传递的值，第二项为子组件接收的名称

在子组件里面想更新就：
emit('update:pageTitle', newValue)
这个vue文件tsx文件无区别
```

##### v-model 修饰符

```js
vue文件
< input
v - model.trim = "keyword" / >

    tsx文件
    < input
v - model = {[keyword, ['trim']
]
}
/>
传递一个数组，第一项为传递的值，第二项为修饰器名称
```

vue3 可以利用这个修饰符结合上面的传递参数实现一些功能，下面是官网链接：  
[处理 v-model 修饰符](https://links.jianshu.com/go?to=https%3A%2F%2Fv3.cn.vuejs.org%2Fguide%2Fcomponent-custom-events.html%23%25E5%25A4%2584%25E7%2590%2586-v-model-%25E4%25BF%25AE%25E9%25A5%25B0%25E7%25AC%25A6)  
一般是与子组件数据双向绑定时配合使用，具体功能看上面的官方文档，下面介绍一下在 tsx 中怎么使用：

```js
vue文件：
<ChildComponent v-model.custom:pageTitle="pageTitle"/>

tsx文件：
<ChildComponent v-model={[pageTitle, ['custom'], 'pageTitle']}/>
传递一个数组，数组第一项为传递的数据，第二项也是一个数组，传入修饰符名称，第三项是子组件接收的名称
```

### 事件监听

#### 基本对照

```js
vue文件：
<div @click = "handleClick" > < /div>

tsx文件：
<div onClick={handleClick}></div>
```

由 v-on 变成 on+事件类型，首字母大写

#### 传递参数

```js
vue文件：
<div @click = "handleClick(1,2)" > < /div>

tsx文件：
<div onClick={() => {
    handleClick(1, 2)
}}></div>
```

需要声明一个匿名函数，只能接收函数定义

#### 监听自定义事件 ts 报错处理

在子组件中 emit 一个事件，父组件用 v-on 来接收，vue 文件：

```js
子组件:
    emit('custom')

父组件：
<ChildComponent @custom = "handleCustom" / >
```

tsx 文件：

```js
子组件:
    emit('custom')

父组件：
<ChildComponent onCustom={handleCustom}/>
```

但是此时 tsx 会将 `onCustom` 当成一个 prop 传入，会报 “与子组件 props 类型不一致” 的错误  
处理方法就是在子组件的 props 中定义 emit 的函数名称：

```js
子组件：
props: {
    onCustom: {
        type: Function
    }
}
```

#### 处理事件冒泡

```js
vue文件：
<div @click.stop = "handleClick" > < /div>

tsx中没有事件修饰符，只能通过原生写法来处理
< div
onClick = {handleClick} > < /div>

const handleClick = (e: MouseEvent) => {
    e.stopPropagation()
}
```

#### 处理回车事件

```js
vue文件：
<input @keyup.enter = "search" / >

    tsx文件，通过监听键盘事件来实现：
<input onKeypress={search}/>

const search = (e: any) => {
    if (e.keyCode === 13) {
        //
    }
}
```

### 样式相关

#### 文件引入

tsx 文件直接在文件里面引入样式文件

```js
import "./style.css";
```

但这样没有 vue 文件的 scoped，容易造成样式冲突，如果项目是中小型的，可以通过将顶部类型写复杂来规避，通常为：模块名+文件名+组件名来命名顶部元素的
claas，例如：

```js
import {defineComponent} from "vue";

export default defineComponent({
    setup() {
        return () => {
            return <div class="moudle-file-component-wrapper"></div>;
        };
    },
});
```

目前博主是使用这种方式来处理，在迭代了一年的系统里面并没感觉不便

如果要保险规避，达到 vue 文件 scoped 的效果，可以参考博主之前的一篇文章：

- [vue3+ts jsx 写法 css module 处理方案](/frontend/vue-archive/vue3-use-css-module.html)

#### 动态 class 写法

```js
vue文件：
<div class="box" :class

= "{active: count === 1}" > < /div>

tsx文件：
<div class={['box', count === 1 ? 'active' : '']}></div>
class名称集合换成一个数组
```

顺便说下动态 style 的：

```js
<div style={{width: count + 'px'}}></div>
style是一个对象，处理js代码要用大括号，所以有两层大括号
```

### 调用组件方法

#### ref 引用组件

```js
vue文件：
<ChildComponent ref="com"/>

...
js
setup()
{
    const com = ref < any > (null)

    onMount(() => {
        console.log(com.value)
    })

    return {
        com
    }
}

tsx文件：
setup()
{
    const com = ref < any > (null)
    onMount(() => {
        console.log(com.value)
    })

    return () => {
        return <ChildComponent ref={com}/>
    }
}
```

注意引用的时候没有 `.value`，引用 dom 普通元素也是一样的写法

#### render 配置写法暴露组件方法

上面已经引用了组件，这种场景无非就是调用子组件里面的方法，那要成功调用自组件就得暴露方法，在 vue 文件里面非常简单，就是在
setup 里面 return 就行：

```js
setup()
{
    return {
        fn1,
        fn2
    }
}
这样父组件用ref引用后就可以直接调用
```

那在 tsx 文件中怎么暴露呢，setup 已经返回了一个 render 函数，里面返回我们的组件模版，处理方法就是将 render 函数和 setup
拆开，让 setup 可以正常返回方法。

那我们的模版改写在哪呢，其实 setup 返回一个函数就是 render 函数只是 vue 提供了一种便捷的方式，让我们可以在模版中快速使用
setup 中定义的变量，真正的 render 函数是和 setup 同级的，同属于 `defineComponent` 配置的一个属性，下面我分别写出 setup 返回
render 函数与单独编写 render 函数的写法：  
setup 返回函数写法：

```js
import {defineComponent, ref, reactive} from "vue";

export default defineComponent({
    props: {
        name: {
            type: String,
            default: "超人鸭",
        },
    },
    setup(props) {
        const msg = ref("hello tsx");
        const state = reactive({
            count: 1,
        });

        const handleClick = () => {
            console.log("click");
        };

        return () => {
            return (
                <div onClick={handleClick}>
                    {msg.value}
                    <span>{state.count}</span>
                    <span>{props.name}</span>
                </div>
            );
        };
    },
});
```

单独编写 render 函数写法：

```js
import {defineComponent, ref, reactive} from "vue";

export default defineComponent({
    props: {
        name: {
            type: String,
            default: "超人鸭",
        },
    },
    setup(props) {
        const msg = ref("hello tsx");
        const state = reactive({
            count: 1,
        });

        const handleClick = () => {
            console.log("click");
        };

        return {
            msg,
            state,
            handleClick,
        };
    },
    render() {
        return (
            <div onClick={this.handleClick}>
                {this.msg.value}
                <span>{this.state.count}</span>
                <span>{this.name}</span>
            </div>
        );
    },
});
```

setup 中的变量要 return，render 中使用要使用 this，props 数据会和组件属性结合，所以直接使用 this 使用。  
这样在 setup 中 return 后，父组件使用 ref 引用这个组件就可以调用 setup 中返回的方法，例如上面的 handleClick

#### render 写法使用 ref 引用组件

有这样一个场景，父组件有一个子组件，里面放着一个 element-ui 的 table，此时父组件想要去触发 element-ui 的 table
的方法，比如清空筛选、清空排序等。  
基于上面，我们在子组件里面要使用 ref 引用 el-table 组件，然后在 setup 里面暴露一个方法，所以要使用 render 函数写法。  
在 render 函数中使用 ref 变量引用组件，写法会有点违背常规思路，这个问题是我使用 tsx 被坑得最厉害的问题

```js
import {defineComponent, ref} from "vue";

export default defineComponent({
    setup() {
        const elTableCom = ref < any > null;

        const handle = () => {
            console.log("click");
        };

        return {
            handle,
            elTableCom,
        };
    },
    render() {
        return (
            <div>
                <el-table ref="elTableCom"></el-table>
            </div>
        );
    },
});
```

不用 `this` , 不用大括号，直接字符串引用 🧐🧐🧐

### 其他细节

#### 占位标签

在 vue 文件里，template 可以当作一个站位标签，不会渲染成什么，且 vue3 也不要求组件需要一个根标签。  
但是 tsx 要求必须有一个根标签包裹，如果不想要这个根标签可以使用：

```js
setup()
{
    return () => {
        return <>
            <div></div>
            <div></div>
        </>
    }
}
```

#### 递归组件

vue 文件使用递归组件是通过 name 属性来引用自己：

```js
<template>
    <test-com></test-com>
</template>

<script>
    import {defineComponent} from 'vue'
    export default defineComponent({
    name: 'TestCom'
})
</script>
```

注意使用 v-if 结束递归

tsx 文件使用引用变量的方式

```js
import {defineComponent} from "vue";

const TestCom = defineComponent({
    setup() {
        return () => {
            return <TestCom></TestCom>;
        };
    },
});

export default TestCom;
```

同样记得使用判断结束递归

### 插槽

插槽应该是 tsx 语法中最复杂的，所以单独提出来介绍

### 父组件中插入内容至子组件的插槽

先用 vue 文件写一个子组件，并且在这个组件中定义默认插槽、具名插槽、作用域插槽三种插槽：

```js
<template>
    <div>
        <p>子组件</p>
        <!-- 这是默认插槽 -->
        <slot></slot>

        <!-- 这是具名插槽 -->
        <slot></slot>

        <!-- 这是作用域插槽 -->
        <slot></slot>
    </div>
</template>

<script lang="ts">
    import {defineComponent, reactive, toRefs} from 'vue'

    export default defineComponent({
    setup() {
    const state = reactive({
    list: ['超人', '鸭']
})

    return {
    ...toRefs(state)
}
}
})
</script>
```

#### vue 文件中使用

##### 父组件使用默认插槽：

```js
<template>
    <div>
        <p>父组件</p>
        <children>
            <p>父组件插入内容至子组件：默认插槽</p>
        </children>
    </div>
</template>

<script lang="ts">
    import {defineComponent, reactive, toRefs} from 'vue'
    import children from './children.vue'

    export default defineComponent({
    components: {
    children
},
    setup() {
    const state = reactive({
})

    return {
    ...toRefs(state)
}
}
})
</script>
```

任何没有使用具名插槽的元素都会被渲染至默认插槽中

效果：
![](https://imgsbed-1301560453.cos.ap-shanghai.myqcloud.com//blog202305091324402.png)

##### 父组件使用具名插槽：

```js
<template>
    <div>
        <p>父组件</p>
        <children>
            <p>父组件插入内容至子组件：默认插槽</p>
            <template v-slot:chaoren>
                <p>父组件插入内容至子组件：具名插槽</p>
            </template>
        </children>
    </div>
</template>
```

效果：

![](https://imgsbed-1301560453.cos.ap-shanghai.myqcloud.com//blog202305091324003.png)

其实默认插槽也有一个名字，叫做 `default` ,所以使用默认插槽也可以写成：

```js
<template>
    <div>
        <p>父组件</p>
        <children>
            <template v-slot:default>
                <p>父组件插入内容至子组件：默认插槽</p>
            </template>
            <template v-slot:chaoren>
                <p>父组件插入内容至子组件：具名插槽</p>
            </template>
        </children>
    </div>
</template>
```

##### 父组件作用域插槽：

```js
<template>
    <div>
        <p>父组件</p>
        <children>
            <template v-slot:default>
                <p>父组件插入内容至子组件：默认插槽</p>
            </template>
            <template v-slot:chaoren>
                <p>父组件插入内容至子组件：具名插槽</p>
            </template>
            <template v-slot:ya="scope">
                <p>父组件插入内容至子组件：作用域插槽</p>
                <p v-for="item in scope.list"
                :key="item">{{item}}
            </p>
</template>
</children>
</div>
</template>
```

效果：

![](https://imgsbed-1301560453.cos.ap-shanghai.myqcloud.com//blog202305091325987.png)

作用域插槽其实就是一个具名插槽，然后传递数据给父组件，父组件可以用这些数据拿去做自定义渲染。  
父组件在拿这个数据的时候，拿到的是包裹着传递数据的对象，因为子组件可以传递很多数据，也就是上面代码的：

```
<template v-slot:ya="scope">
```

这个 `scope` 就代表着包裹数据的对象，可以随便命名。

#### 在 tsx 文件中使用

还是基于上面的 children 组件，同时包含默认插槽，具名插槽，作用域插槽，下面展示一下一起用这三种插槽的写法：

```js
import {defineComponent} from "vue";
import Children from "./children.vue";

export default defineComponent({
    setup() {
        const childrenSlot = {
            default: () => {
                return <p>父组件插入内容至子组件：默认插槽</p>;
            },
            chaoren: () => {
                return <p>父组件插入内容至子组件：具名插槽</p>;
            },
            ya: (scope: any) => {
                return (
                    <>
                        <p>父组件插入内容至子组件：作用域插槽</p>
                        {scope.list.map((item: any) => {
                            return <p key={item}>{item}</p>;
                        })}
                    </>
                );
            },
        };

        return () => {
            return (
                <div>
                    <p>父组件</p>
                    <Children v-slots={childrenSlot}></Children>
                </div>
            );
        };
    },
});
```

tsx 文件使用插槽是传入一个对象，每一个插槽都是一个方法，里面返回要渲染的 dom，如果是作用域插槽，传递的数据会在方法的参数里面。效果：

![](https://imgsbed-1301560453.cos.ap-shanghai.myqcloud.com//blog202305091326865.png)

### tsx 编写子组件定义插槽

上面的子组件使用 vue 文件写的，下面看一下在 tsx 文件中如果定义插槽，供父组件使用：

```js
import {defineComponent, reactive} from "vue";

export default defineComponent({
    setup(props, {slots}) {
        const state = reactive({
            list: ["超人", "鸭"],
        });

        return () => {
            return (
                <div>
                    <p>子组件</p>
                    {/* 这是默认插槽 */}
                    {slots.default ? slots.default() : null}

                    {/* 这是具名插槽 */}
                    {slots.chaoren ? slots.chaoren() : null}

                    {/* 这是作用域插槽 */}
                    {slots.ya ? slots.ya({list: state.list}) : null}
                </div>
            );
        };
    },
});
```

setup 的第二个参数是一个上下文对象，可能平时用的最多的就是 emit，他其中还有 `slot` 这个参数，我觉得就是专门为 jsx
文件准备的，其实通过上面 tsx 文件父组件使用子组件插槽时就可以发现，vue 在处理插槽时其实是传入一个函数，这个函数返回要渲染的
dom，所以上面的子组件就是将外部传入的函数进行执行，渲染传进来的 dom。

父组件引用：

```js
import {defineComponent} from "vue";
import Children from "./children";

export default defineComponent({
    setup() {
        const childrenSlot = {
            default: () => {
                return <p>父组件插入内容至子组件：默认插槽</p>;
            },
            chaoren: () => {
                return <p>父组件插入内容至子组件：具名插槽</p>;
            },
            ya: (scope: any) => {
                return (
                    <>
                        <p>父组件插入内容至子组件：作用域插槽</p>
                        {scope.list.map((item: any) => {
                            return <p key={item}>{item}</p>;
                        })}
                    </>
                );
            },
        };

        return () => {
            return (
                <div>
                    <p>父组件</p>
                    <Children v-slots={childrenSlot}></Children>
                </div>
            );
        };
    },
});
```

效果：

![](https://imgsbed-1301560453.cos.ap-shanghai.myqcloud.com//blog202305091325663.png)
一致。
