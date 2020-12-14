interface IBook1 {
    pageSize: number
}

class JavaBook implements IBook1 {
    constructor(private size: number = 100){}

    get pageSize(){
        return this.size
    }

    getContent(){
        return '这是《java》的内容'
    }

}

class PythonBook implements IBook1 {
    constructor(private size: number = 200){}

    get pageSize(){
        return this.size
    }

    getDesc(){
        return '这是《python》的描述'
    }
}

class BookSimpleFactory {
    /**
     * 一定要有一个关键字段来区分返回哪个类的实例
     * @param type 
     */
    public static createBook(type: string): IBook1{
        switch (type) {
            case 'python':
                return new PythonBook(300)
            case 'java':
                return new JavaBook(200)
        }
    }
}

let pythonBook = BookSimpleFactory.createBook('python') as PythonBook

console.log(pythonBook.getDesc())


/**
 * 利用反射，直接将类当参数传入
 */
class BookSimpleFactory1 {
    public static createBook<U extends IBook1, T extends number>(c : { new (args: T) : U }, params: T): U{
        return new c(params)
    }
}

let javaBook = BookSimpleFactory1.createBook(JavaBook, 300)
console.log(javaBook.getContent())