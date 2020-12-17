### 观察者模式(`Observer`)

创建一个观察者对象：一个观察者对象包括三个方法（订阅消息，取消订阅，发送订阅）和一个消息容器。

```javascript

interface IObserver {
    /**
     * 订阅消息
     */
    register<T>(type: string, fn: ICallback<T>): void
    /**
     * 发布消息
     * args 发布的消息内容
     */
    fire<T>(type: string, args: T): void
    /**
     * 移除订阅
     * 消息名
     * fn 就好比订阅者
     */
    remove(type: string, fn: ICallback<any>): void
}

abstract class ABCObserver implements IObserver {
    constructor(protected _messagePool: IMessagePool = {}){}
    abstract register<T>(type: string, fn: ICallback<T>): void
    abstract fire<T>(type: string, args: T): void
    abstract remove(type: string, fn: ICallback<any>): void
}
```

这是一个简单的订阅发布模式的雏形，其中 `_messagePool` 对象中存放消息池。

```javascript

// 消息约定格式
interface IEvent<T> {
    type: string
    args?: T
}

// 回调函数
interface ICallback<T> {
    (event: IEvent<T>): any 
}

/**
 * 消息池
 */
interface IMessagePool {
    // 消息队列
    [key: string]: ICallback<any>[]
}
```

- 实现消息订阅：

```javascript
register<T>(type: string, fn: ICallback<T>){
    if(this._messagePool[type]){
        this._messagePool[type].push(fn)
    }else{
        this._messagePool[type] = [fn]
    }
}
```

订阅函数有两个参数，一个是消息类型，一个是触发这个消息后的触发函数。

这里需要注意的是，消息池的格式，一个消息类型，所对应的是回调函数的队列，触发此类型后，会逐个执行这个队列内的函数。

- 实现消息发布：

```javascript
    fire<T>(type: string, args?: T){
        let messages = this._messagePool[type]
        if (!messages || !messages.length) return console.error(`没有 ${type} 消息`)
        let events: IEvent<T> = {
            type,
            args
        }
        for(let i = 0; i < messages.length; i++){
            messages[i].call(this, events)
        }
    }
```

消息发布就是会触发对应的消息 `type` ，这时在消息池中找到对应的执行函数队列，并将他们逐个执行。

```javascript
messages[i].call(this, events)

messages[i](events)
```

> 这两种都能实现功能，但第一种使用了 `call` 方法，这么写的话有一个好处，就是回调函数的 `this` 就指向了当前观察者的实例对象，这样在回调函数内就可以通过 `this` 访问观察者提供的其他属性。

- 移除订阅

```javascript
    remove(type: string, fn){
        let messages = this._messagePool[type]
        if(!(messages instanceof Array)) return console.error(`没有 ${type} 消息`)
        for(let i = messages.length - 1; i >= 0; i--){
            messages[i] === fn && messages.splice(i, 1)
        }
    }
```

- 使用：

```javascript
let ob1 = new Observer()

let cb: ICallback<string> = function(event){
    // this 指向 ob1
    console.log(this)
    console.log(event)
}
ob1.register<string>('name', cb)
ob1.fire<string>('name', 'zhangsan')

ob1.remove('name', cb)
ob1.fire<string>('name', 'lisi')
```