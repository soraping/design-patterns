### 代理模式(`Proxy`)

代理通常是一个介于寻求方和提供方之间的中介系统。当需求方不方便直接访问一个对象或者不满足条件的时候，便可以通过中介代理对象来访问这个对象。

**其实需求方访问的是中介代理对象，而这个访问过程中，中介代理对请求通常会做一些处理，然后再将这个处理的结果交给需求方**

#### 图片预加载

请求网络图片时，一般会在图片完全下载之前，使用 `loading` 占位符，否则会出现页面空白等交互问题。

- 第一步，创建节点，填充图片地址

```javascript
let myImage = (function(){
    let imgNode = document.createElement('img')
    document.body.appendChild(imgNode)

    return {
        'setSrc': function (src) {
            imgNode.src = src
        }
    }
})()
```

这个方法可以直接使用

```javascript
myImage.setSrc("https://img.jpg")
```

- 第二步，使用代理模式，在图片加载好之前，使用 loading.gif 占位符

```javascript
let proxyImage = (function(){

    // 一个过渡的 img 对象，主要用来控制网络图片加载的进度来触发时间句柄
    let img = new Image
    
    // 当图片加载完成后，触发该句柄，将这个
    img.onload = function(){
        myImage.setSrc(img.src)
    }

    return {
        setSrc: function(src){
            myImage.setSrc('loading.gif')
            // 将图片地址赋值给 img 对象，触发 onload 方法
            img.src = src
        }
    }
})()

// 使用代理函数时，先出现 gif 的占位图，直到新图下载完成后，就替换了占位图
proxyImage.setSrc('https://img.jpg')
```

#### 请求缓存

用户头像昵称等这样不经常变动的数据可以在前端请求时缓存，这里利用代理模式实现，在请求前查询缓存字典，没有则调用接口获取，获得到数据后存入字典。

- 第一步，请求函数

请求数据部分很简单，就一个 `ajax` 方法，唯一要注意的是，`success` 方法的回调值传入另一个回调函数，这个函数就是用来处理请求值，实现缓存的关键

```javascript
let github_base_url = 'https://api.github.com/users/'
let query_data = function(name, cb){
    $.ajax({
        url: github_base_url + name,
        method: 'get',
        success: function(res){
            cb(res)
        }
    })
}
```

- 第二步，处理值函数

对请求值的处理，这个函数就是处理 `ajax` 返回值的，属于一个单独的处理函数

```javascript
let modify_user = function(res){
    console.log('result', res)
}
```

有了这两步，其实就能实现功能了，不过没有缓存数据的功能

```javascript
query_data('ruanyf', modify_user)
```

- 第三步，设置代理函数，实现缓存

```javascript
let proxyCacheResult = (function(){

    // 缓存字典
    let cache_result = {}

    // result_func 返回值的处理函数
    return function(name, result_func){

        // 缓存键，可以通过一些方法算出hash等，这里只是用一个参数来当key
        let cache_key = name

        // 存在缓存，则直接调用处理缓存的函数
        if(cache_key in cache_result){
            return result_func(cache_result[cache_key])
        }

        // 调用请求
        // 这个函数可以通过参数传入
        query_data(name, function(res){
            cache_result[name] = res
            result_func(res)
        })
    }
})()

// 调用代理函数
console.time('proxy1')
proxyCacheResult('ruanyf', modify_user)
console.timeEnd('proxy1')

console.time('proxy2')
proxyCacheResult('ruanyf', modify_user)
console.timeEnd('proxy2')
```

