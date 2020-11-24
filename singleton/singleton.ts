/**
 * 饿汉模式
 */
class Singleton {
    
    // 类初始化时就将实例赋值给静态属性
    private static _instance = new Singleton()

    // 构造函数使用 private ，防止类被实例化
    private constructor(){}

    static getInstance(): Singleton {
        return Singleton._instance
    }

}

// 直接用 new 会抛出异常
// let s = new Singleton()

// 调用静态方法创建实例
let s1 = Singleton.getInstance()
let s2 = Singleton.getInstance()

console.log(s1 === s2)

/**
 * 懒汉模式
 */
class SingletonAsync {

    // 加载时不创建实例
    private static _instance: SingletonAsync

    private constructor(){}

    /**
     * 在使用时创建实例
     */
    static getInstance(){
        if(!SingletonAsync._instance){
            SingletonAsync._instance = new SingletonAsync()
        }
        return SingletonAsync._instance
    }

}

let s3 = SingletonAsync.getInstance()
let s4 = SingletonAsync.getInstance()

console.log(s3 === s4)


/**
 * 用代理实现
 */
class MyClass {
    constructor(private name: string){}
}
let ProxySingleton = (function(){
    let _instance
    return function(name){
        if(!_instance){
            _instance = new MyClass(name)
        }
    }
})()

let s5 = ProxySingleton('zhangsan')
let s6 = ProxySingleton('lisi')

console.log(s5 === s6)