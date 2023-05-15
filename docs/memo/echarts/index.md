## 0. 初始化 echarts

```js
let main = ref<HTMLElement>()
let myChart: echarts.ECharts

const options = {}

myChart = echarts.init(main.value)

// 更新Chart
onMounted(() => {
  myChart.setOption(options)
})
```

## 1. 扩充整体网格宽度

```js
grid: {
	x: 5,
	y: 15,
	x2: 5,
	y2: 25,
	containLabel: true,
},
```

## 2. 选中点,强调选中点,包括样式

```js
emphasis: {
    disabled: true,
    itemStyle: {
        color: '#4983F5',
        borderWidth: 0,
        lineStyle: {
        width: 2,
        },
    },
},
```

## 3. 监听划线的数据 list 重新 setOption 来绘图

```js
watch(
  [
    oilCloseD.BList,
    oilCloseD.WList,
    oilCloseD.date,
    pmRatioD.DList,
    pmRatioD.GList,
    averageD.FList,
    averageD.TList,
    averageD.ZList,
  ],
  () => {
    myChart.setOption(options);

    // 选中最后一个点
    myChart.dispatchAction({
      type: "showTip",
      seriesIndex: 0,
      dataIndex: lastIndex.value, // 显示第几个数据
    });
  }
);
```

## 4. 计算滑动到了哪一个点(Index)

```js
if (main.value !== undefined) {
  myChart = echarts.init(main.value);
}

// 记录滑动的最后一个索引，使tooltip常显
myChart
  .getZr()
  .on("mousemove", (params: { offsetX: number, offsetY: number }) => {
    const pointInPixel = [params.offsetX, params.offsetY];
    if (myChart.containPixel("grid", pointInPixel)) {
      const pointInGrid = myChart.convertFromPixel(
        {
          seriesIndex: 0,
        },
        pointInPixel
      );
      const xIndex = pointInGrid[0];
      const handleIndex = Number(xIndex);
      lastIndex.value = handleIndex;
    } else {
      myChart.dispatchAction({
        type: "showTip",
        seriesIndex: 0,
        dataIndex: lastIndex.value, // 显示第几个数据
      });
    }
  });
```

## 5. 自定义图例

```js
// legend.vue组件
 <div class="legend-warp">
    <div class="time">
      <span>日期</span><span>：{{ data.date }}</span>
    </div>
    <div class="legend-list">
      <div class="legend-item" v-for="(item, index) in data.list" :key="item.name">
        <span :class="['legend-icon', 'color' + index]"></span>
        <span class="legend-name">{{ item.name }}</span>
        <span class="legend-value">{{ showDiff(item.value) }}</span>
      </div>
    </div>
  </div>
```

```js
// 监听图标滑动高亮事件,修改图例值
// eslint-disable-next-line @typescript-eslint/no-explicit-any
myChart.on("highlight", (params: any) => {
  const index = params.batch[0].dataIndex;
  legend.date = controlShowData(type.value).date[index];
  legend.list = [
    {
      name: "qwe",
      value: oilCloseD.WList[index],
    },
    {
      name: "asd",
      value: oilCloseD.BList[index],
    },
  ];
});
```

## 6. echarts 图表自适应

```js
// 自适应大小
window.onresize = function () {
  myChart.resize();
};
```

## 7. 修改 Echarts 样式

```scss
.chart {
  margin-top: 12px;
  margin-bottom: 24px;

  width: calc(100% - 12px);
  .xAxis {
    display: flex;
    justify-content: space-between;
    padding: 0 4px 0 25px;
    margin-top: -18px;

    .leftData,
    .rightData {
      font-size: 10px;
      color: #8d96a2;
    }

    .leftData {
      float: left;
    }

    .rightData {
      float: right;
    }
  }
}

.chart-title {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin: 12px 0 0 10px;
  img {
    width: 23px;
    height: 26px;
  }

  span {
    font-size: 16px;
    font-weight: bold;
    color: #f3f2f1;
    line-height: 24px;
    margin-left: 7px;
  }
}
```
