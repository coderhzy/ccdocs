# 前端好用技能

## 1. Git--开启区分大小写

```shell
git config --global core.ignorecase false
```

```shell
git config --list
```

## 2. Vue使用element-plus组件实例的类型推倒

```typescript
import { ElMessage } from 'element-plus'

const messageRef = ref<InstanceType<typeof ElMessage>>()
```

- 介绍
  - `InstanceType`是一个内置的类型，它接受一个构造函数并创建一个实例类型
  - `typeof`是一个类型操作符，它返回一个类型的构造函数类型

## 3. JWT

- Cookie存储服务端给的信息容易被篡改, 也容易被伪造, 但此时服务器无法识别, 从而导致安全问题
- 解决问题: 
  - 签名: hs256, rs256, 服务器将签名后的信息和签名发给客户端, 下次请求将签名和信息一起发给服务器, 服务器通过签名验证信息是否被篡改
  - ![](https://imgsbed-1301560453.cos.ap-shanghai.myqcloud.com//blog202307270839298.png)
  - 结合https来防止token被窃取
```javascript
const crypto = require('crypto')

function sign(info, key) {
    return crypto.createHmac('sha256', key).update(info).digest('base64')
}

const KEY = '123456'

const result = sign('hello', KEY)
```

## 4. 老项目package.json配置存在冲突，如何启动项目

```javascript
npm install--legacy-peer-deps
```

- 项目中两个不同的包依赖同一个包的不同版本，按照新的 peerDependencies 机制，npm 可能无法自动处理这种情况而报错。