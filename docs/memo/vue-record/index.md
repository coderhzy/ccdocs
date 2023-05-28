# 一些 Vue 实战问题记录

## 1. 在 script setup 中优雅的使用动态组件

```js
<template>
  <div>
    <div class="tab-container-header">
      <div class="tab-container-header-item" v-for="(item, index) in tabList" :key="index" @click="selectTab(index)">
        <span :class="{ active: item.isActive }">{{ item.name }}</span>
      </div>
    </div>
    <component :is="activeTabComponent" :tabContenxtSrc="tabContenxtSrc"></component>
  </div>
</template>

<script lang="ts" setup>
import { selectGroupConfig } from '@/api/getAliveRoomCollection'
import { computed, defineAsyncComponent, markRaw, onMounted, ref, watchEffect } from 'vue'
import { useRouter } from 'vue-router'

const activeTab = ref(0)
const route = useRouter()

const tabName = ref('精选')
const tabContenxtSrc = ref('')

const tabList = ref([
  { name: '直播介绍', isActive: false, component: markRaw(defineAsyncComponent(() => import('@/views/Introduction.vue'))) },
  { name: '互动', isActive: false, component: markRaw(defineAsyncComponent(() => import('@/views/Chat.vue'))) },
  { name: tabName.value, isActive: false, component: markRaw(defineAsyncComponent(() => import('@/views/Featured.vue'))) },
])

const activeTabComponent = computed(() => {
  return tabList.value[activeTab.value].component
})

const selectTab = (index: number) => {
  tabList.value.forEach((item, i) => {
    item.isActive = i === index
  })
  activeTab.value = index
}

// 直播间配置id
const id = route.currentRoute.value.query.id

watchEffect(async () => {
  const result = await selectGroupConfig<{ tabName: string ,tabImage:string}>(String(id))
  console.log("🚀 ~ file: HomeView.vue:45 ~ watchEffect ~ result:", result)
  tabName.value = result.tabName
  tabContenxtSrc.value = result.tabImage
  tabList.value[2].name = tabName.value
})

onMounted(() => {
  tabList.value[0].isActive = true
})
</script>
```

## 2. 怎样滚动到页面顶部

```js
window.scrollTo({ top: 0 });
```

## 3. 在 vue3 中使用 tsx

- [Vue3 使用 tsx 语法对照](/frontend/vue/01_vue3-use-tsx.html)

## 4. 在 vue 中使用 css Modules

- [在 vue 中使用 css Modules](/frontend/vue/02_vue3-use-css-module.html)

## 5. vue 禁止遮罩层下的页面滚动

解决： 功能开发过程中写遮罩时，遇到遮罩下页面还可以滚动的问题。

```vue
<template>
  <div :class="isPopup ? 'disableRoll' : ''">
    <div>...</div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isPopup: false,
    };
  },
};
</script>

<style>
.disableRoll {
  overflow: hidden;
  position: fixed;
  height: 100%;
  width: 100%;
}
</style>
```

## 6. vue 使用 element-ui 的 modal 接入微前端出现蒙层

解决： 查看 element-ui 的文档，modal-append-to-body 设置为 false

```js
<el-dialog
      title="监控条件选择"
      :visible.sync="dialogVisible"
      :modal-append-to-body="false"
      destroy-on-close
    >
</el-dialog>
```

## 7. vue 单页应用 h5 禁止用户缩放

解决：在 index.html 的 mate 加入以下属性

```js
width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=0
```

## 8. vue3 的 reactive 对象初始化

解决：

1. 在 reactive 中如果直接赋值给一个空对象的话，会丢掉响应式
2. 在 ts 检测时候，Object.key 遍历的值会访问显示 string 类型索引错误。

```typescript
const registerInfo = reactive<RegisterInfoType>({
  name: "",
  age: "",
  password: "",
});

type registerInfoItem = keyof typeof registerInfo;

/**
 * 重置注册表单
 */
const onReset = () => {
  Object.keys(registerInfo).forEach((key) => {
    registerInfo[key as registerInfoItem] = "";
  });
};
```

## 9. 图片禁止拖拽成缩略图

问题：在 h5 上禁止用户拖拽某张图片使其有缩略图

- 解决办法

```js
<img class="mtitimg" src="images/m1titimg3.png" draggable="false">
```

## 10. vue 移动端禁止 IOS 的图片按住默认事件

问题：在一个移动端 H5 页面上，IOS 手机可以按住显示拷贝一系列选项菜单

- 解决办法

```css
/* common.css */
* {
  -webkit-touch-callout: none; /*系统默认菜单被禁用*/
  -webkit-user-select: none; /*webkit浏览器*/
  -khtml-user-select: none; /*早期浏览器*/
  -moz-user-select: none; /*火狐*/
  -ms-user-select: none; /*IE10*/
  user-select: none;
}
```

增加上述设置后可以显示 IOS 的长按出现菜单选项问题。不过会出现输入框没办法输入的问题。还需要增加以下代码才能让你的代码正常工作。

```css
input {
  -webkit-user-select: auto; /*webkit浏览器*/
}

/* 如果存在textarea也输入不进文本的情况下，加上这个 */

textarea {
  -webkit-user-select: auto; /*webkit浏览器*/
}
```

## 11. vue 中设置 proxy 代理

- 解决本地开发后端项目，前端需要解决请求跨域问题。
  - 下方代码： 会将前端所有对`collect`请求都代理到`http://101.34.88.158:3333/`上，从而解决跨域问题。
  - 如果请求本地的后端项目，则看下方注释的那一行，填写正常的端口号即可。

`vue.config.js`

```js
module.exports = defineConfig({
  devServer: {
    proxy: {
      "/collect": {
        target: "http://101.34.88.158:3333/",
        // target: 'http://localhost:3333/',
        ws: true, //代理websockets
        changeOrigin: true, // 是否跨域，虚拟的站点需要更管origin
      },
    },
  },
});
```
