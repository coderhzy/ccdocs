# 浏览器存储方案


## 1. localStorage

### 1.1 localStorage的特点
> localStorage 是 HTML5 标准中新加入的技术，它并不是什么划时代的新玩意，早在 IE6 时代，就有一个叫 userData 的东西用于本地存储，而当时考虑到浏览器兼容性，更通用的方案是使用 flash。而如今，localStorage 被大多数浏览器所支持，它为开发者提供了一个持久化存储的解决方案，而且存储容量也比传统的 cookie 大得多，基本上都达到了 5MB 的级别，这样对于存储一些用户敏感数据再适合不过了。


### 1.2 localStorage的使用


```js
// 1.setItem
localStorage.setItem("name", "hzy")
localStorage.setItem("age", 18)

// 2.length
console.log(localStorage.length)
for (let i = 0; i < localStorage.length; i++) {
  const key = localStorage.key(i)
  console.log(localStorage.getItem(key))
}

// 3.key方法
console.log(localStorage.key(0))

// 4.getItem(key)
console.log(localStorage.getItem("age"))

// 5.removeItem
localStorage.removeItem("age")

// 6.clear方法
localStorage.clear()

```

### 1.3 Storage的工具类封装

```js
class myCache {
  constructor(isLocal = true) {
    this.storage = isLocal ? localStorage: sessionStorage
  }

  setItem(key, value) {
    if (value) {
      this.storage.setItem(key, JSON.stringify(value))
    }
  }

  getItem(key) {
    let value = this.storage.getItem(key)
    if (value) {
      value = JSON.parse(value)
      return value
    } 
  }

  removeItem(key) {
    this.storage.removeItem(key)
  }

  clear() {
    this.storage.clear()
  }

  key(index) {
    return this.storage.key(index)
  }

  length() {
    return this.storage.length
  }
}

const localCache = new HYCache()
const sessionCache = new HYCache(false)

export {
  localCache,
  sessionCache
}
```


## 2. indexDB

```js
// 打开数据(和数据库建立连接)
const dbRequest = indexedDB.open("hzy", 3)
dbRequest.onerror = function(err) {
  console.log("打开数据库失败~")
}
let db = null
dbRequest.onsuccess = function(event) {
  db = event.target.result
}
// 第一次打开/或者版本发生升级
dbRequest.onupgradeneeded = function(event) {
  const db = event.target.result

  console.log(db)

  // 创建一些存储对象
  db.createObjectStore("users", { keyPath: "id" })
}

class User {
  constructor(id, name, age) {
    this.id = id
    this.name = name
    this.age = age
  }
}

const users = [
  new User(100, "why", 18),
  new User(101, "kobe", 40),
  new User(102, "james", 30),
]

// 获取btns, 监听点击
const btns = document.querySelectorAll("button")
for (let i = 0; i < btns.length; i++) {
  btns[i].onclick = function() {
    const transaction = db.transaction("users", "readwrite")
    console.log(transaction)
    const store = transaction.objectStore("users")

    switch(i) {
      case 0:
        console.log("点击了新增")
        for (const user of users) {
          const request = store.add(user)
          request.onsuccess = function() {
            console.log(`${user.name}插入成功`)
          }
        }
        transaction.oncomplete = function() {
          console.log("添加操作全部完成")
        }
        break
      case 1:
        console.log("点击了查询")

        // 1.查询方式一(知道主键, 根据主键查询)
        // const request = store.get(102)
        // request.onsuccess = function(event) {
        //   console.log(event.target.result)
        // }

        // 2.查询方式二:
        const request = store.openCursor()
        request.onsuccess = function(event) {
          const cursor = event.target.result
          if (cursor) {
            if (cursor.key === 101) {
              console.log(cursor.key, cursor.value)
            } else {
              cursor.continue()
            }
          } else {
            console.log("查询完成")
          }
        }
        break
      case 2:
        console.log("点击了删除")
        const deleteRequest = store.openCursor()
        deleteRequest.onsuccess = function(event) {
          const cursor = event.target.result
          if (cursor) {
            if (cursor.key === 101) {
              cursor.delete()
            } else {
              cursor.continue()
            }
          } else {
            console.log("查询完成")
          }
        }
        break
      case 3:
        console.log("点击了修改")
        const updateRequest = store.openCursor()
        updateRequest.onsuccess = function(event) {
          const cursor = event.target.result
          if (cursor) {
            if (cursor.key === 101) {
              const value = cursor.value;
              value.name = "curry"
              cursor.update(value)
            } else {
              cursor.continue()
            }
          } else {
            console.log("查询完成")
          }
        }
        break
    }
  }
}
```


## 3. cookie

### 3.1 cookie的特点

- cookie是存储在浏览器端的一段字符串
- cookie会自动携带在请求中
- cookie的存储大小是有限制的(4kb)
- cookie有过期时间, 如果没有设置, 默认关闭浏览器后失效
- cookie可以设置访问权限, 也可以设置有效路径
- cookie可以被删除
- cookie可以被覆盖

### 3.2 cookie的使用
