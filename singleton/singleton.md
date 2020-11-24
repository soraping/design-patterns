### 单例模式

- `typescript` 类实现的两种模式

饿汉模式，在类加载时就将实例赋值给静态属性，这样实例化时，直接能获取到，但是缺点也很明显，首次实例参数无法透传，仅仅使用无参数或者类内部确定参数的场景

懒汉模式，在创建的时候实例化，允许传递参数

- 使用代理实现

个人认为这种实现方式比上述的方式更好。

定义类 `MyClass` 时，不用 `private` 限制构造函数，这样这个类就是一个普通的类。而让它成为单例类，那就是代理类 `ProxySingleton` 的工作了，这样的分工更加明确，负责业务的类只管业务，而单例的逻辑就由专门的函数负责。

```javascript
/**
 * 一个普通的类
 */
class MyClass {
    constructor(private name: string){}
}

/**
 * 代理实现单例
 * 将一个普通类，输出一个单例
 * 闭包+高阶函数
 */
let ProxySingleton = (function(){
    let _instance
    return function(name){
        if(!_instance){
            _instance = new MyClass(name)
        }
    }
})()
```
