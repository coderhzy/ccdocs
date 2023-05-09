# 一些 React 实战问题记录

## 1. 类组件结合 typescript

```jsx
import { PureComponent } from 'react'
import React from 'react'

interface IState {
  message: string
  counter: number
}

interface IProps {
  name: string
}

// 泛型类
class ClassDemo extends PureComponent<IProps, IState> {
  name = 'aaa'

  state = {
    message: 'hello',
    counter: 0
  }
  render() {
    return (
      <div>
        <p>{this.state.counter}</p>
        <p>{this.state.message}</p>
        <p>{this.props.name}</p>
      </div>
    )
  }
}

export default ClassDemo

```

## 2. Redux 中推导联合类型及复杂数组修改

```jsx
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface IState {
  count: number
  message: string
  direction: 'left' | 'right' | 'up' | 'down'
  names: string[]
}

const initialState: IState = {
  count: 100,
  message: 'hello redux',
  direction: 'left',
  names: ['a', 'b', 'c']
}
const counterSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    changeMessageAction(state, { payload }: PayloadAction<string>) {
      state.message = payload
    }
  }
})

export const { changeMessageAction } = counterSlice.actions
export default counterSlice.reducer
```

## 3. 将请求在 RTK 中维护数据及状态

1. 创建请求函数

```ts
import hzyRequest from "@/service";

export function getBanners() {
  return hzyRequest.get({
    url: "/banner",
  });
}
```

2. 定义 store 中请求`Action`

```jsx
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getBanners } from "../service/recommend";

// redux request
export const fetchBannerDataAction = createAsyncThunk("banners", async () => {
  const res = await getBanners();
  console.log(res);
  return res.banners;
});

interface IRecommendState {
  banners: any[];
}

const initialState: IRecommendState = {
  banners: [],
};

const recommendSlice = createSlice({
  name: "recommend",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchBannerDataAction.pending, () => {
        console.log("pending");
      })
      .addCase(fetchBannerDataAction.fulfilled, (state, action) => {
        state.banners = action.payload;
      })
      .addCase(fetchBannerDataAction.rejected, () => {
        console.log("rejected");
      });
  },
});

export default recommendSlice.reducer;
```

3. 将`RTK`的模块融入到`store`

```ts
import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "./modules/counter";
import recommendReducer from "../views/discover/c-views/recommend/store/recommend";

const store = configureStore({
  reducer: {
    counter: counterReducer,
    recommend: recommendReducer,
  },
});

export default store;
```

4. `使用disptch`来派发事件，让对应`action`执行

```jsx
import React, { FC, memo, ReactNode, useEffect } from "react";
import { useAppDispatch } from "@/store/hooks/useApp";
import HotRecommend from "./c-cpns/hot-recommend";
import TopBanner from "./c-cpns/top-banner";
import {
  fetchBannerDataAction,
  fetchRecommendListDataAction,
} from "./store/recommend";
import { RecommendWrapper } from "./style";

interface IProps {
  children?: ReactNode;
}

const Recommend: FC<IProps> = () => {
  // dispatch action
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(fetchBannerDataAction());
    dispatch(fetchRecommendListDataAction());
  }, []);

  return (
    <RecommendWrapper>
      <TopBanner />
      <div className="content">
        <div className="left">
          <HotRecommend />
        </div>
        <div className="right">right</div>
      </div>
    </RecommendWrapper>
  );
};

export default memo(Recommend);
```

5. 使用`useSelector`获取`RTX`中维护的数据

```jsx
import { useAppSelector } from "@/store/hooks/useApp";
import React, {
  ElementRef,
  FC,
  memo,
  ReactNode,
  useRef,
  useState,
} from "react";
import { shallowEqual } from "react-redux";
import { Carousel } from "antd";
import {
  TopBannerWrapper,
  TopBannerLeft,
  TopBannerRight,
  TopBannerControl,
} from "./style";
import classNames from "classnames";

interface IProps {
  children?: ReactNode;
}

const TopBanner: FC<IProps> = () => {
  const bannerRef = useRef < ElementRef < typeof Carousel >> null;
  // get data from store
  const selector = useAppSelector(
    (state) => ({
      banners: state.recommend.banners,
    }),
    shallowEqual
  );

  return (
    <TopBannerWrapper
      style={{
        background: `url('${bgImageUrl}') center center / 6000px`,
      }}
    >
      <div className="banner">
        <TopBannerLeft>
          <Carousel
            autoplay
            autoplaySpeed={2000}
            ref={bannerRef}
            dots={false}
            effect="fade"
            afterChange={handleAfterChange}
          >
            {selector.banners.map((item) => {
              return (
                <div key={item.imageUrl} className="banner-item">
                  <img
                    className="image"
                    src={item.imageUrl}
                    alt={item.typeTitle}
                  />
                </div>
              );
            })}
          </Carousel>
        </TopBannerLeft>
      </div>
    </TopBannerWrapper>
  );
};

export default memo(TopBanner);
```
