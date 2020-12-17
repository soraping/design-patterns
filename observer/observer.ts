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

abstract class ABCObserver implements IObserver {
    constructor(protected _messagePool: IMessagePool = {}){}
    abstract register<T>(type: string, fn: ICallback<T>): void
    abstract fire<T>(type: string, args: T): void
    abstract remove(type: string, fn: ICallback<any>): void
}

class Observer extends ABCObserver {
    private name: string = 'zhangsan'
    register<T>(type: string, fn: ICallback<T>){
        if(this._messagePool[type]){
            this._messagePool[type].push(fn)
        }else{
            this._messagePool[type] = [fn]
        }
    }
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
    remove(type: string, fn){
        let messages = this._messagePool[type]
        if(!(messages instanceof Array)) return console.error(`没有 ${type} 消息`)
        for(let i = messages.length - 1; i >= 0; i--){
            messages[i] === fn && messages.splice(i, 1)
        }
    }
}


let ob1 = new Observer()

let cb: ICallback<string> = function(event){
    console.log(event)
}
ob1.register<string>('name', cb)
ob1.fire<string>('name', 'zhangsan')

ob1.remove('name', cb)
ob1.fire<string>('name', 'lisi')