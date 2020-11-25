/**
 * 在文档中创建一个图片的节点
 */
let myImage = (function(){
    let imgNode = document.createElement('img')
    document.body.appendChild(imgNode)

    return {
        'setSrc': function (src) {
            imgNode.src = src
        }
    }
})()

// 加载图片，在图片请求完成之前，页面中会出现一个空白时间
myImage.setSrc("https://img.jpg")

/**
 * 使用代理模式，在图片加载好之前，使用 loading.gif 占位符
 */
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

proxyImage.setSrc('https://img.jpg')


