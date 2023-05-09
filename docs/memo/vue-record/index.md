# 一些 Vue 实战问题记录

## 1. 在 script setup 中优雅的使用动态组件

```js
<component :is="activeTabComponent"></component>

const tabList = shallowRef([
  { name: 'tab1', isActive: false, component: defineAsyncComponent(() => import('@/components/tab1.vue')) },
  { name: 'tab2', isActive: false, component: defineAsyncComponent(() => import('@/components/tab2.vue')) },
])

const activeTabComponent = computed(() => {
  return tabList.value[activeTab.value].component
})

onMounted(() => {
  tabList.value[0].isActive = true
})
```

## 2. 怎样滚动到页面顶部

```js
window.scrollTo({ top: 0 });
```

## 3. 在 vue3 中使用 tsx

- [Vue3 使用 tsx 语法对照](/frontend/vue-archive/vue3-use-tsx.html)

## 4. 在 vue 中使用 css Modules

- [Vue3 使用 tsx 语法对照](/frontend/vue-archive/vue3-use-css-module.html)
