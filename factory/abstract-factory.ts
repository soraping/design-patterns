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
        return 'image book 薄书'
    }
}

class TextBook1 extends ABCTextBook {
    getTextDesc(){
        return 'text book 薄书'
    }
}

/**
 * 书的实体类厚书
 */
class ImageBook2 extends ABCImageBook {
    getImageDesc(){
        return 'image book 厚书'
    }
}
class TextBook2 extends ABCTextBook {
    getTextDesc(){
        return 'text book 厚书'
    }
}

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


let bookFactory1 = new BookFactory1()

let image_book1 = bookFactory1.createImageBook()
console.log(image_book1.getImageDesc())

let text_book1 = bookFactory1.createTextBook()
console.log(text_book1.getTextDesc())
