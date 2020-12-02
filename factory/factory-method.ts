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

