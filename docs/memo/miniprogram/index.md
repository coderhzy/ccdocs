# 原生微信小程序开发

## 1. 给 swiper 加边距,最右侧被吃掉问题

**场景**: 当一个 swiper 左右滑动的时候,我们通常在写 css 样式的时候会给所有`item`添加`margin-left`或者`margin-right`
**异常**: 如果你加`marign-right`,此时你会发现最后侧的`item`的`margin-right`是无效的,仿佛被吃掉了. 经过查看文档和搜索引擎并找不到为什么,此时统计为小程序的`swiper`组件的 bug.
**解决办法**: 加`margin-left` 1. 给所有的`item`添加`margin-left` 2. 将`item`设置为`display: inline-block;` 3. 使用`last-of-type`选中最后一个,给其加`margin-right`
**代码演示**:

- 页面

```html
<view class="menu">
  <area-header title="{{title}}" bind:moreClick="onMenuMoreClick" />
  <scroll-view
    class="list"
    scroll-x
    enable-flex
    style="width: {{screenWidth}}px;"
  >
    <block wx:for="{{menuList}}" wx:key="id">
      <view class="item">
        <menu-item itemData="{{item}}" />
      </view>
    </block>
  </scroll-view>
</view>
```

- css

```css
.list {
  /* display: flex; */
  margin-left: -24rpx;
  white-space: nowrap;
}

.list .item {
  display: inline-block;
  /* flex-shrink: 0; */
  width: 220rpx;
  margin-left: 24rpx;
}

.list .item:last-of-type {
  margin-right: 24rpx;
}
}
```

## 2. 添加 npm 包

**场景**: 我们需要使用第三方组件或者第三方包,需要借助`npm`来安装. 然后小程序中又没有`webpack`一类的打包工具. 那么安装依赖则是一个技术活
**解决办法**: 项目目录初始化 npm, 跟随 vant 的组件库一步步做下来就可以了 1. 项目目录下初始化 npm 2. 跟着 vant 组件库的文章一步步做下来 3. 记得点击微信开发者工具上的**npm**来构建工程,以后方可使用
**vant 组件库文档位置**: [vant 小程序组件库位置](https://vant-contrib.gitee.io/vant-weapp/#/quickstart)

## 3. 给元素设置动态高度,来适配不同机型

**场景**: 当我们使用类似于`swiper`或者某个图片展示要根据机型动态变化时
**解决办法**: 将要使用的高度放在全局,配合`wx.getSystemInfo` 1. 将变量设置到`app.ts`中的,`app`的`globalData`中 2. 在`onLauch`中使用`getSystemInfo`获取设备信息,并将返回值设置到对应的变量上 3. 在组件中,使用`const app = getApp()`,并通过`app`访问对应 global`变量` 4. 将其获取的变量值使用`setData`赋值给组件中`data`的变量 5. 在页面使用写入动态的`style`使用变量
**代码演示**:

- 全局: app.ts

```typescript
App({
  globalData: {
    screenWidth: 375,
    screenHeight: 667,
    statusHeight: 20,
  },
  onLaunch() {
    // 1. 获取设备的信息
    wx.getSystemInfo({
      success: (res) => {
        this.globalData.screenWidth = res.screenWidth;
        this.globalData.screenHeight = res.screenHeight;
        this.globalData.statusHeight = res.statusBarHeight;
      },
    });
  },
});
```

- ts: nav-bar.ts

```typescript
  /**
   * 组件的初始数据
   */
  data: {
    statusHeight: 20,
  },
  lifetimes: {
    attached() {
      // @ts-ignore
      this.setData({ statusHeight: app.globalData.statusHeight })
    },
  },
```

- 页面: nav-bar.wxml

```html
<view class="status" style="height: {{statusHeight}}px;"></view>
```

## 4. 给 swiper 设置对应高度,来解决指示器距离过远问题

**场景**: 通常在原生微信小程序开发时,需要使用`swiper`组件来展示轮播图
**异常**: 当我们正常给一个`swiper`设置数据,正常展示以后. 你会发现指示器在距离图片下方很远的位置.
**解决问题**: 沿用第三点的解决办法.并通过获取`dom`高度动态将`swiper`的高度设置成获取的图片高度 1. 全局定义一个可以`querySelect`方法使用**boundingClientRect**来获取某个元素的宽高 2. 使用节流函数来对获取进行节流 3. 传入`image`的`class`类名,返回对应高度. 将反应的高度设置给组件`data`中定义的高度变量 4. 最终: 将变量设置给 swiper 的高度(将其设置成动态高度)
**代码演示**:

- 工具函数: query-select.js

```javascript
export default function querySelect(selector) {
  return new Promise((resolve, reject) => {
    const query = wx.createSelectorQuery();
    query.select(selector).boundingClientRect();
    query.exec((res) => {
      resolve(res);
    });
  });
}
```

- 使用节流函数来节流`querySelect`获取高度: main-music.ts. 获取以后再赋值

```typescript
const querySelectorThrottle = throttle(querySelect, 1000);



async onBannerImageLoad(e: WechatMiniprogram.Event) {
	const res = await querySelectorThrottle(".banner-image");
	this.setData({
	  bannerHeight: res[0].height,
	});
},
```

- 页面: main.music.wxml

```html
<swiper
  class="banner"
  circular
  autoplay
  indicator-dots
  duration="500"
  style="height: {{bannerHeight}}px;"
  wx:if="{{bannerList.length}}"
>
  <block wx:for="{{ bannerList }}" wx:key="targetId">
    <swiper-item class="item">
      <image
        class="banner-image"
        src="{{ item.imageUrl }}"
        mode="widthFix"
        bindload="onBannerImageLoad"
      />
    </swiper-item>
  </block>
</swiper>
```
