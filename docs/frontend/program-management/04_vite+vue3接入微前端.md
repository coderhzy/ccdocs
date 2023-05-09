---
title: Vite+Vue3接入乾坤
description: Vite+Vue3接入乾坤
publishedAt: '2022-11-30'
lastUpdated: '2022-11-30'
tags: 'management'
---

## 1.  打包为umd格式
1. 修改`vite.config.ts`
```js
import path, { resolve } from 'path';

export default {
	build: {
	  target: 'esnext',
	  lib: {
		name: name,
		entry: path.resolve(__dirname, 'src/main.ts'),
		formats: ['umd'],
	  },
	  rollupOptions: {
		output: {
		  inlineDynamicImports: true,
		},
	  }
	}
}
```
## 2. 添加打包后umd的入口文件
1. 修改vite的`plugin`
```js
import html from '@rollup/plugin-html'; // 安装依赖

html({
  title: 'vite接入微前端',
  attributes: {
	html: { lang: 'zh-cn' },
  },
  template: () => {
	return `<!DOCTYPE html>
		  <html lang="en">
			<head>
			  <meta charset="UTF-8" />
			  <link rel="icon" href="/favicon.ico" />
			  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
			  <title>${name.name}</title>
			  <link rel="stylesheet" href="${VITE_PUBLIC_PATH}style.css">
			</head>
			<body>
			  <div id="app"></div>
			  <script type="module" src="./
			  projectname.umd.js"></script>
			</body>
		  </html>`;
  },
}),
```
## 3. 修改main.ts
```javascript
// let router;
let instance: Vue.App<Element>;

declare global {
  interface Window {
    __POWERED_BY_QIANKUN__?: string;
  }
}

interface IRenderProps {
  container: Element | string;
}

function render(props: IRenderProps) {
  const { container } = props;
  instance = createApp(App);
  instance.use(antDesign);
  instance.use(store);
  instance.use(router);
  

  instance.mount(
    container instanceof Element
      ? (container.querySelector('#app') as Element)
      : (container as string),
  );
}
// 独立运行时
if (!window.__POWERED_BY_QIANKUN__) {
  // render({ container: '#app' });
  message.error('检测到未接入微应用项目，请在微应用项目中打开');
}
//暴露主应用生命周期钩子
export async function bootstrap() {
  console.log('subapp bootstraped');
}

export async function mount(props: any) {
  console.log('mount subapp');
  render(props);
}

export async function unmount() {
  console.log('unmount college app');
  instance.unmount();
}
```