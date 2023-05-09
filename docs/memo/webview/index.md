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
