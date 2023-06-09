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
    [oilCloseD.BList, oilCloseD.WList, oilCloseD.date, pmRatioD.DList, pmRatioD.GList, averageD.FList, averageD.TList, averageD.ZList],
    () => {
        myChart.setOption(options)
        const dataList = options.series.map(item => {
            if (item) return item.data.length
            return 0
        })

        updateHighlight(Math.max(...dataList) - 1)

        setTimeout(() => {
            myChart.dispatchAction({
                type: 'showTip',
                seriesIndex: 0,
                dataIndex: Math.max(...dataList) - 1, // 显示第几个数据
            })

            myChart.dispatchAction({
                type: 'highlight',
                seriesIndex: 0,
                dataIndex: Math.max(...dataList) - 1, // 显示第几个数据
            })
        }, 100)
    }
)
```

## 4. 计算滑动到了哪一个点(Index)

- 组件挂在的时候执行

```js
if (main.value !== undefined) {
  myChart = echarts.init(main.value);
}

// 绘制图表
myChart.setOption(options)

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

- 将这段updateHighlight函数放到第三点的watch里面初始化的时候进行设置

```js
// 监听图标滑动高亮事件,修改图例值
const updateHighlight = (index: number) => {
    legend.date = controlShowData(type.value).date[index]
    if (type.value === '1') {
        legend.list = [
            {
                name: 'WTI：',
                value: oilCloseD.WList[index],
            },
            {
                name: '布伦特：',
                value: oilCloseD.BList[index],
            },
        ]
    } else if (type.value === '2') {
        legend.list = [
            {
                name: '柴油：',
                value: pmRatioD.DList[index],
            },
            {
                name: '汽油：',
                value: pmRatioD.GList[index],
            },
        ]
    } else {
        legend.list = [
            {
                name: '0#柴油：',
                value: averageD.ZList[index],
            },
            {
                name: '95#汽油：',
                value: averageD.FList[index],
            },
            {
                name: '92#汽油：',
                value: averageD.TList[index],
            },
        ]
    }
}


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

## 8. 完整的配置

```js
const options = {
  tooltip: {
    show: true,
    trigger: 'axis',
    showContent: false,
    axisPointer: { z: 100, lineStyle: { type: 'solid', width: 0.5, color: '#E8A000' } },
  },
  yAxis: {
    splitNumber: 3,
    scale: true,
    splitLine: {
      lineStyle: {
        color: '#282828',
        type: 'dashed',
      },
    },
    axisLabel: {
      color: '#555555',
      fontSize: 10,
      align: 'right',
    },
  },
  xAxis: {
    type: 'category',
    boundaryGap: false,
    scale: true,
    position: 'bottom',
    axisTick: {
      show: false,
    },
    axisLine: {
      onZero: false,
      lineStyle: {
        color: '#2A2928',
        height: 1,
      },
    },
    axisLabel: {
      show: false,
    },
    data: type.value === '1' ? oilCloseD.date : type.value === '2' ? pmRatioD.date : averageD.date,
  },
  grid: {
    x: 5,
    y: 15,
    x2: 5,
    y2: 25,
    containLabel: true,
  },
  series: [
    {
      name: type.value === '1' ? 'WTI' : type.value === '2' ? '汽油' : '92#汽油',
      type: 'line',
      symbolSize: 5,
      showSymbol: false,
      data: type.value === '1' ? oilCloseD.WList : type.value === '2' ? pmRatioD.GList : averageD.TList,
      lineStyle: {
        normal: {
          color: type.value == '3' ? '#1DA840' : type.value == '1' ? '#4983F5' : '#F26F11',
          width: 2,
        },
      },
      emphasis: {
        disabled: true,
        itemStyle: {
          color: type.value == '3' ? '#1DA840' : type.value == '1' ? '#4983F5' : '#F26F11',
          borderWidth: 0,
          lineStyle: {
            width: 2,
          },
        },
      },
    },
    {
      name: type.value === '1' ? '布伦特' : type.value === '2' ? '柴油' : '95#汽油',
      type: 'line',
      symbolSize: 5,
      showSymbol: false,
      data: type.value === '1' ? oilCloseD.BList : type.value === '2' ? pmRatioD.DList : averageD.FList,
      lineStyle: {
        normal: {
          color: type.value == '3' ? '#F26F11' : type.value == '1' ? '#F26F11' : '#4983F5',
          width: 2,
        },
      },
      emphasis: {
        disabled: true,
        itemStyle: {
          color: type.value == '3' ? '#F26F11' : type.value == '1' ? '#F26F11' : '#4983F5',
          borderWidth: 0,
          lineStyle: {
            width: 2,
          },
        },
      },
    },
    type.value === '3' && {
      name: '0#柴油',
      type: 'line',
      symbolSize: 5,
      showSymbol: false,
      data: averageD.ZList,
      lineStyle: {
        normal: {
          color: '#4983F5',
          width: 2,
        },
      },
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
    },
  ],
  animationDuration: 100,
}
```
