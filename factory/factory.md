### 简单工厂模式(`Simple Factory`)

它的理念就是创建对象，是对不同类实例化，还可以用来创建相似对象。
如果有几个类（对象）有很多地方比较相似，如有相同的按钮，描述和操作等，这时可以通过将这些相似的东西提取，不相似的针对性处理即可。

简单工厂没有父类，无需做任何继承，只需要创建一个对象即可，然后通过对这个对象大量拓展方法和属性，并在最终将对象返回出来。

例如，定义一个书的类，每本书都有一个名称，都有总页码数:

```javascript
interface IBook {
    getName(): string
    pageSize: number
}

class PythonBook implements IBook {
    constructor(private name: string, private size: number){}
    getName(){
        return this.name
    }
    get pageSize(){
        return this.size
    }

    getDesc(){
        return '这是《python》的描述'
    }
}

class JavaBook implements IBook {
    constructor(private name: string, private size: number){}
    getName(){
        return this.name
    }

    get pageSize(){
        return this.size
    }

    getContent(){
        return '这是《java》的内容'
    }

}

```

定义了两本书，这两本有两个属性是相同，各自有一个专属属性，如果要创建这些类的实例，那就是有多少类，就要实例化多少个。

**所以，简单工厂就是将这些类的实例收归到一个类中，由这个类来决定实例化操作。**

```javascript
class BookSimpleFactory {
    /**
     * 一定要有一个关键字段来区分返回哪个类的实例
     * @param type 
     */
    public static createBook(type: string): IBook{
        switch (type) {
            case 'python':
                return new PythonBook('python', 300)
            case 'java':
                return new JavaBook('java', 200)
        }
    }
}

let pythonBook = BookSimpleFactory.createBook('python') as PythonBook

console.log(pythonBook.getName(), pythonBook.getDesc())
```

简单工厂一定要有一个 `type` 的关键字段来区分实例化哪个类返回哪个类的实例，只关心参数，不用关心如何创建实例。

简单工厂的缺点也很明显，如果再多几本书的类，这个简单工厂的类也要做修改。

### 工厂方法模式(`Factory Method`)



### 抽象工厂模式(`Abstract Factory`)