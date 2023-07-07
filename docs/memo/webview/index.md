# Webview-Issue

## 1. 怎样实现安卓系统跳转到对应的手机厂商的应用商店

- 需求
  - 实现安卓系统跳转到对应的手机厂商的应用商店
  - 微信中和其他非主流手机型号跳转到腾讯应用宝

- 解决思路
  - 首先，判断是否安卓环境，其次判断是否微信
  - 然后对不同手机厂商的 ua 判断，命中则走对应厂商跳转，未命中则应用宝

```JavaScript
  // 判断是否为微信环境
  function isWeixin() {
    var ua = window.navigator.userAgent.toLowerCase();

    // 判断微信环境
    if (ua.match(/MicroMessenger/i) == 'micromessenger') {
      return true;
    } else {
      return false;
    }
  }


  var ua = navigator.userAgent.toLowerCase();
  // 腾讯应用宝跳转地址
  var qqUrl = 'https://a.app.qq.com/o/simple.jsp?pkgname=com.finance.gain'
  if (ua.indexOf("android") > -1) {
    if (isWeixin()) {
      window.location.replace(qqUrl);
    } else {
      // 判断是否为vivo,华为，oppo，小米，魅族手机
      if (ua.indexOf("vivo") > -1) {
        window.location.replace("vivoMarket://details?id=com.finance.gain");
      } else if (ua.indexOf("huawei") > -1) {
        window.location.replace("appmarket://details?id=com.finance.gain");
      } else if (ua.indexOf("oppo") > -1) {
        window.location.replace(
          "oppomarket://details?packagename=com.finance.gain"
        );
      } else if (ua.indexOf("xiaomi") > -1) {
        // window.location.replace("mimarket://details?id=com.finance.gain");
        window.location.replace(qqUrl);
      } else if (ua.indexOf("meizu") > -1) {
        window.location.replace(qqUrl);
        // window.location.replace(
        //   "mstore://details?package_name=com.finance.gain"
        // );
      } else {
        window.location.replace(qqUrl);
      }
    }
  }
```

## 2. 微信中如何实现唤起微信企业客服

### 2.1 需求
  - 现需要写一个h5页面,嵌入webview, 当页面进入时,自动唤起微信企业客服
  - 要求客服是一对一(用户信息中回返回对应的客服链接)
  - 因为要适配老版本的ios和安卓app,所以不能通过全量更新, 通过重定向之前客服的页面到h5页面, 完成上述功能

### 2.2 解决思路
  - 根据后端返回的用户信息, 用户信息可能包含客服链接, 也可能不包含客服链接. 不包含客服链接, 则设置默认的链接, 包含链接, 则使用后端返回的链接. 后端请求出错, 则使用默认链接.
  - 判断用户是否登录, 如果登录走上方逻辑, 如果为登录, 则获取后端提供的随机客服的列表, 从列表中随机获取一个客服链接, 如果获取不到, 则使用默认链接. 并将其存入本地缓存.
  - 根据上述两步, 获取可以链接成功后, 则使用`a`标签模拟点击(此方法在webview中不建议使用,因为会留下空白页, 也有其他不知名的bug), 唤起企业微信客服, 并将客服链接**替换**存入本地缓存. 

### 2.3 问题: 
  - 出现很多安卓手机不能正常唤起企业微信客服, 但是ios手机可以正常唤起. 根据多次尝试,得出是因为微信版本过低, 导致不能正常唤起微信. 

### 2.4 由问题引申的需求
  - 上述问题, 由于微信版本过低, 导致不能正常唤起微信, 所以需要在h5页面中, 将客服链接生成二维码. 当用户不能跳转成功时, 提示用户将二维码保存到相册, 然后打开微信扫一扫, 扫描二维码, 即可进入客服页面. 

### 2.5 技术要点
  - 上述说不能正常唤起微信, 那么需要`webview`给我们提供一个唤起本机浏览器并且载入我们传入链接的方法.暂且我们叫他`opneOutUrl`. 
  - 关于上述微信版本过低, 借助`qrcodejs2`库, 生成二维码. 再借助`html2canvas`库, 将二维码转换为图片, 其会转换成`base64`格式的图片. 然后将其赋值给`img`标签的`src`属性, 即可显示图片.
  - 关于`html2canvas`库, 由于其生成的图片, 会有一定的延迟, 所以需要在生成图片之前, 先将`img`标签隐藏, 等图片生成后, 再将其显示出来.
  - 我们可以通过结合后端将图片上传到七牛云, 获取`https`链接的图片,最终调用`webView`提供的`saveIamge`方法, 将图片保存到相册.

### 2.6 遇到的坑
  - 自己主动载入页面跳转,安卓会导致应用错乱, 并且跳转完成以后会留下一个空白页
  - 当用户微信是低版本的时候, 无法完成跳转
  - `qrcodejs2`这个库有个bug, 需要主动修改源码来完成, 安卓低版本`this`的问题, [issue地址](https://github.com/davidshimjs/qrcodejs/issues/292)
  - 关于`qrcodejs2`, (vue中使用qrcodejs2生成二维码)[https://juejin.cn/post/7033644196250517511].
  - 关于`html2canvas`使用参考下方代码


```typescript
const getUploadToken = async () => {
  uploadToken.value = await request({
    url: '/xxxxxxServicer/qiNiu/getToken',
    data: {},
  })
}

const saveImage = () => {
  html2canvas(qrcode.value).then((canvas: { toDataURL: (arg0: string) => never }) => {
    imgSrc.value = canvas.toDataURL('image/png')

    if (env.isAndroid) {
      putb64(imgSrc.value, uploadToken.value)
      webViewxxxxxx.save.saveImage(picUrl.value)
    } else {
      webViewxxxxxx.save.saveImage(imgSrc.value)
    }
  })
}


const putb64 = (picBase: string, myUptoken: string) => {
  picBase = picBase.substring(22)
  let url = 'https://upload.qiniup.com/xxxx/-1/'
  let xhr = new XMLHttpRequest()
  xhr.onreadystatechange = function () {
    if (xhr.readyState == 4) {
      let keyText = JSON.parse(xhr.responseText)
      picUrl.value = 'http://xxxxx.xxxxx.com/' + keyText.key
    }
  }

  xhr.open('POST', url, true)
  xhr.setRequestHeader('Content-Type', 'application/octet-stream')
  xhr.setRequestHeader('Authorization', 'UpToken ' + myUptoken)
  xhr.send(picBase)
}
```

### 2.7 更换二维码库

将二维码库更改为`qrcode`, 从而更方便项目部署.
