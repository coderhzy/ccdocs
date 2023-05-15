## 关于 vue3 与 jsx（tsx）使用 cssModule

css 带有全局性，当我们的项目复杂到一定程度的时候，css 文件会很多，如果像传统的引入方式，那么这些 css 文件都会全局生效，难免会照成样式冲突。  
这时候就需要对样式进行模块化，就是一个样式文件只对一个组件产生作用。vue 已经提供了`scoped`解决方案，当一个`style`标签拥有`scoped`属性时候，它的 css 样式只能用于当前的 Vue 组件，可以使组件的样式不相互污染。如果一个项目的所有`style`标签都加上了`scoped`属性，相当于实现了样式的模块化。  
相信`scoped`这个写法大家都非常熟悉，下面是它的实现原理：  
转译前：

```js
<style scoped>
    .example{
        color:red;
    }
</style>

<template>
    <div>scoped测试案例</div>
</template>
```

转译后：

```js
.example[data-v-5558831a] {
  color: red;
}

<template>
    <div class="example" data-v-5558831a>scoped测试案例</div>
</template>
```

这个方式非常简单也是最常用的，但是有个局限性，就是只能作用于 vue 文件。  
当我想使用**jsx**写法编写组件的时候，无法使用`scoped`这个用法，因为**jsx**等同于一个 js 文件，里面可写不了`template`与`style`标签。那么当我想使用一个样式文件的时候，就类似于下面这样：  
test.tsx 文件

```js
import { defineComponent } from "vue";
import "./test.scss";

export default defineComponent({
  setup() {
    return () => {
      return <div class="test"></div>;
    };
  },
});
```

test.scss 文件：

```js
.test {
  width: 100px;
  height: 100px;
  background: rebeccapurple;
}
```

这样样式确实能够作用到 div 上，但是当我们看网页代码的时候：
![](https://imgsbed-1301560453.cos.ap-shanghai.myqcloud.com//blog202305091430373.png)

可以看到这个样式文件会挂载到全局的`style`标签上，且类名没有任何转译，这样就会容易造成样式污染。

解决方案就是`css module`，vue 对于样式除了`scoped`这种方案其实还有`css module`，可能大家平时用得也比较少（反正我没用过），因为 vue 文件使用`scoped`实在是太方便而且已经满足需求。  
vue cli 已经集成了，我们都可以直接使用。

那么，在**jsx**文件中该如何使用呢，我们需要改一下项目配置：  
在**vue.config.js**中，添加：

```js
module.exports = {
  css: {
    requireModuleExtension: true,
  },
};
```

关于`requireModuleExtension`的作用，看这里：[https://cli.vuejs.org/zh/config/#configurewebpack](https://links.jianshu.com/go?to=https%3A%2F%2Fcli.vuejs.org%2Fzh%2Fconfig%2F%23configurewebpack)  
然后将上面的 test.scss 文件改名，更改为 test.module.scss:

![](https://imgsbed-1301560453.cos.ap-shanghai.myqcloud.com//blog202305091431268.png)
回到 test.tsx 文件中，将引入的方式修改：

```js
import { defineComponent } from "vue";
import styles from "./test.module.scss";

export default defineComponent({
  setup() {
    return () => {
      return <div class={styles.test}></div>;
    };
  },
});
```

如果你跟我一样使用的是 ts，那么 from 一个 scss 文件的时候会报错，因为 ts 不识别这类文件的定义，我们需要到 src 文件夹下的**shims-vue.d.ts**中添加一项：

```js
declare module "*.scss" {
  const classes: { readonly [key: string]: string };
  export default classes;
}
```

定义了 scss 文件的类型，如果你是 css、less、stylus 这些样式的话，把上面的 scss 改成你们的样式文件后缀就可以。

好了，现在来看一下效果：

![](https://imgsbed-1301560453.cos.ap-shanghai.myqcloud.com//blog202305091431850.png)

可以看到 css module 会自动将我们类名进行转译，避免了全局污染。

如果你跟我一样使用**ts**，使用**vscode**，那么还有更厉害的，类名自动提示！！！  
首先安装`typescript-plugin-css-modules`

```sh
npm install typescript-plugin-css-modules --save-dev
```

然后 ts 开启这个插件，到项目下的**tsconfig.json**中，在`compilerOptions`属性下添加:

```js
"plugins": [{"name": "typescript-plugin-css-modules"}]
```

最后一步，配合 vscode，在项目根目录上创建.vscode 文件夹，添加**settings.json**文件:

![](https://imgsbed-1301560453.cos.ap-shanghai.myqcloud.com//blog202305091432004.png)
在 settings.json 中，添加：

```js
{
    "typescript.tsdk": "node_modules/typescript/lib",
    "typescript.enablePromptUseWorkspaceTsdk": true
}
```

效果：

![](https://imgsbed-1301560453.cos.ap-shanghai.myqcloud.com//blog202305091436208.png)
