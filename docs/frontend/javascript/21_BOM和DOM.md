# BOM和DOM

## 1. BOM

### 1.1 认识BOM

JavaScript 通过 BOM 可以操作浏览器的窗口、文档、地址栏等, 可以将BOM看成连接JavaScript和浏览器窗口之间的桥梁

### 1.2 BOM的组成

- BOM主要包括以下对象类型
  - window: 包括全局属性、方法，控制浏览器窗口相关的属性、方法;
    - 身份一: 全局对象
    - 身份二: 浏览器窗口对象(查询地址[MDN-window](https://developer.mozilla.org/zh-CN/docs/Web/API/Window))
      - 属性: localStorage、console、location、history、screenX、scrollX
      - 方法: alert、close、scrollTo、open、print、confirm、prompt
      - 事件: onload、onunload、onresize、onerror,focus、blur、load、hashchange
      - 其他: 包含从EventTarget继承过来的方法，addEventListener、removeEventListener、dispatchEvent方法;
  - location: 包括浏览器地址栏相关的属性、方法;
  - history: 包括浏览器历史记录相关的属性、方法;
  - document: 当前窗口操作文档的对象;

## 2. DOM


### 2.1 一图胜千言

- JavaScript通过DOM可以对页面中的元素进行操作
- **因为继承自EventTarget，所以也可以使用EventTarget的方法. (元素可以addEventListener、removeEventListener、dispatchEvent方法的本质)**

![](https://imgsbed-1301560453.cos.ap-shanghai.myqcloud.com//blog202306190709818.png)

### 2.2 DOM的组成

- Node节点
  - nodeName: 节点名称
  - nodeType: 节点类型
  - nodeValue: 节点值
  - parentNode: 父节点
  - childNodes: 子节点
- Document: Document节点表示的整个载入的网页，我们来看一下常见的属性和方法
- Element: Element节点表示的是HTML或者XML文档中的元素，我们来看一下常见的属性和方法
- Attr: Attr节点表示的是HTML或者XML文档中的属性，我们来看一下常见的属性和方法
- Text: Text节点表示的是HTML或者XML文档中的文本内容，我们来看一下常见的属性和方法

### 2.3 事件监听

#### 2.3.1 什么是事件监听

事件监听的本质: 事件监听的本质就是在事件源上注册一个事件处理函数，当事件发生时，执行事件处理函数

#### 2.3.2 事件监听的三种方式

- 在script中直接监听
- 通过元素的on来监听事件
- 通过EventTarget的addEventListener方法来监听事件

### 2.4 事件流

#### 2.4.1 什么是事件流

- 当我们在浏览器上对着一个元素点击时，你点击的不仅仅是这个元素本身;
- 因为我们的HTML元素是存在父子元素叠加层级的;
- 比如一个span元素是放在div元素上的，div元素是放在body元素上的，body元素是放在html元素上的;

#### 2.4.2 事件冒泡和事件捕获

- 事件冒泡: 事件从最具体的元素开始接收，然后逐级向上传播到较为不具体的节点(文档)(由内向外)
- 事件捕获: 事件从最不具体的节点(文档)开始接收，然后逐级向下传播到较为具体的节点(由外向内)

![](https://imgsbed-1301560453.cos.ap-shanghai.myqcloud.com//blog202306190752811.png)

### 2.5 事件对象event

#### 2.5.1 什么是事件对象

- 事件的类型是什么，你点击的是哪一个元素，点击的位置是哪里等等相关的信息;
- 那么这些信息会被封装到一个Event对象中;
- 该对象给我们提供了想要的一些属性，以及可以通过该对象进行某些操作;

#### 2.5.2 事件对象的属性

- type: [事件类型](https://developer.mozilla.org/zh-CN/docs/Web/Events)
- target: 事件源(当事件发生的元素)
- currentTarget: 当前事件所绑定的元素
- offsetX、offsetY:点击元素的位置;

#### 2.5.3 事件对象的方法

- preventDefault: 阻止默认行为
- stopPropagation: 阻止事件冒泡

