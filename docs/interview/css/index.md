# CSS

## 一、说一下css盒模型吧

1. 每一个html元素都可以被看成一个盒子,这个盒子由里到外由这个元素的`内容content`,`边框border`,`内边距padding`
   以及`外边框margin组成`
2. 盒子模型一般分为**标准盒模型**和**怪异盒模型**,怪异盒模型又叫IE盒模型。那么这两种盒模型有什么区别呢。
3. **标准盒模型**：元素的`width`就是内容`content`的宽度。如果我们给一个元素设置`width`，那么`width`
   指的就是内容的宽度。此时这个元素的`总宽度 = width + 内边距 + 边框+ 外边距`。
4. **怪异盒模型**：`width`并部署元素的宽度，`width`属性值 = `内容` + `内边距` + `边框`。如果给元素设置`width`
   ，那么这个元素的总宽度为`width` + `外边距`。
5. 正常来说是标准盒模型，通过`box-sizing`值为`border-box`的时候就是*怪异盒模型*。`box-sizing`值为`content-box`的时候就是
   *标准盒模型*。

## 二、css的display双值

### 介绍

[原文链接](https://hacks.mozilla.org/2019/10/the-two-value-syntax-of-the-css-display-property/)

1. 本文介绍了为display在使用的时候可以设置双值。
2. 主要产生原因阐述
    1. 我们常在开发中使用`display:flex`，其实此时这个属性为`block flex`。因为我们设置以后，无论是行级元素`span`
       还是块级元素`div`都会被设置为**块元素**。
    2. 因此我们需要了解`display`的双值来应对某个特定的开发场景。
3. ![双值表](https://imgsbed-1301560453.cos.ap-shanghai.myqcloud.com/blog/display-two-values.png)

### 应用

1. 如果想`display: flex`以后，设置为`inline`。可以设置`display: inline-flex`，此时容器为`flex`容器，并且还是行内元素。
2. 普通的`display: flex`，则是`block`。或者可以手动设置`display: block-flex`。

## 三、一行代码实现网页变灰

```css
filter: grayscale(1)
```