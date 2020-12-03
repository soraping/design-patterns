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

该模式本意是将实际创建对象工作推迟到子类，如此，首先创建一个核心的抽象类，让子类实现这个抽象类。

```javascript
interface IBook {
    getName(): string
    pageSize: number
    getDesc(): string
}

/**
 * 抽象产品
 */
abstract class AbcBook implements IBook {
    constructor(protected name: string, protected size: number){

    }
    getName(){
        return this.name
    }
    get pageSize(){
        return this.size
    }
    abstract getDesc(): string
}

/**
 * 具体产品
 */
class GoBook extends AbcBook {
    getDesc(){
        return '这是 go 的介绍'
    }
}

/**
 * 具体产品
 */
class CssBook extends AbcBook {
    getDesc(){
        return '这是 css 的介绍'
    }
}

/**
 * 抽象工厂
 */
abstract class AbcFactory {
    abstract createBook(): IBook
}

/**
 * 具体工厂
 */
class GoFactory extends AbcFactory {
    createBook(){
        return new GoBook("go", 200)
    }
}
class CssFactory extends AbcFactory {
    createBook(){
        return new GoBook("css", 400)
    }
}
```

将工厂拆分多块，各自管各自的产线，将各自的产品实现放在各自的工厂内部，如果要新增新产品时，抽象类不需要修改，只要实现两个抽象类即可

使用工厂：

```javascript
let cssBook = new GoFactory().createBook()
console.log(cssBook.getDesc())
```

使用时，只要实例化需要的工厂类就可以了，但这要做并不能简化用户行为，且需要用户自己手动 `new` 一个类，并不能提现设计模式所带来的便利，所以，可以用下面的优化，将 `new` 封装在内部

```javascript
/**
 * 配置字典
 */
let bookTypes = {
    css: CssFactory,
    go: GoFactory
}

/**
 * 真实的提供工厂，简化行为
 */
class FactoryMethod {
    public static create<T extends AbcFactory>(c: { new() : T }): T{
        return new c()
    }
}

let cssBook = FactoryMethod.create(bookTypes['css']).createBook()
console.log(cssBook.getDesc())
```

将 `new` 封装在工厂内部有很多种方法，这里新增了一个提供给外部调用的工厂函数，类似简单工厂，主要是为了简化行为。

**创建多类实例，简单工厂就不适用了，而工厂方法却能适用，可以轻松的创建多个类的实例，用户不必关心创建该对象的具体类，只需要调用工厂方法即可。**

### 抽象工厂模式(`Abstract Factory`)

同样是书的例子，书有纯图片的书，也有小说类的纯文字书，而且书有薄有厚。

创建一个书本抽象类

```javascript
/**
 * 书的抽象类
 */
abstract class ABCImageBook {
    abstract getImageDesc(): string
}
abstract class ABCTextBook {
    abstract getTextDesc(): string
}

/**
 * 书的实体类薄书
 */
class ImageBook1 extends ABCImageBook {
    getImageDesc(){
        return 'image book 1'
    }
}

class TextBook1 extends ABCTextBook {
    getTextDesc(){
        return 'text book 1'
    }
}

/**
 * 书的实体类厚书
 */
class ImageBook2 extends ABCImageBook {
    getImageDesc(){
        return 'image book 2'
    }
}
class TextBook2 extends ABCTextBook {
    getTextDesc(){
        return 'text book 2'
    }
}
```

书的刊印一般都是有出版社负责的，有的出版社拥有自己的风格，这里就实现两个出版社，一个专门出版薄书，一个专门出版厚书。
创建一个出版社的抽象工厂，每个出版社都能刊印图书和文字书，所有会有两个抽象方法：

```javascript
/**
 * 抽象工厂
 * 出版社
 */
abstract class ABCBookFactory {
    
    /**
     * 图画书
     */
    abstract createImageBook(): ABCImageBook

    /**
     * 文字书
     */
    abstract createTextBook(): ABCTextBook
}
```

两个出版社：

```javascript
/**
 * 实现两个出版社
 * 第一个出版社出书
 * 专门出薄书
 */
class BookFactory1 extends ABCBookFactory {
    createImageBook(){
        return new ImageBook1()
    }
    createTextBook(){
        return new TextBook1()
    }
}

/**
 * 第二个出版社
 * 专门出厚书
 */
class BookFactory2 extends ABCBookFactory {
    createImageBook(){
        return new ImageBook2()
    }
    createTextBook(){
        return new TextBook2()
    }
}
```

如果想要薄书，就可以直接实例化对应的工厂就可以了：

```javascript
let bookFactory1 = new BookFactory1()

let image_book1 = bookFactory1.createImageBook()
console.log(image_book1.getImageDesc())

let text_book1 = bookFactory1.createTextBook()
console.log(text_book1.getTextDesc())
```

抽象工厂函数，主要针对一个系列，例如一个出版社，擅长刊印薄的书，而这书有图书，也有文字书。