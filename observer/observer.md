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
interface IEvent<T> {
    type: string
    args?: T
}

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



