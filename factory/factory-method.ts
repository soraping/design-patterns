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
        return '这是 python 的介绍'
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
    abstract create(): IBook
}

/**
 * 具体工厂
 */
class GoFactory extends AbcFactory {
    create(){
        return new GoBook("go", 200)
    }
}
class CssFactory extends AbcFactory {
    create(){
        return new GoBook("css", 400)
    }
}