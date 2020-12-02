/**
 * 抽象工厂
 * 印刷厂
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
 */
class BookFactory1 extends ABCBookFactory {
    createImageBook(){
        return 
    }
    createTextBook(){}
}

class BookFactory2 extends ABCBookFactory {
    createImageBook(){}
    createTextBook(){}
}

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
 * 书的实体类
 */
class ImageBook1 extends ABCImageBook {
    getImageDesc(){
        return 'image book 1'
    }
}

class ImageBook2 extends ABCImageBook {
    getImageDesc(){
        return 'image book 2'
    }
}

class TextBook1 extends ABCTextBook {
    getTextDesc(){
        return 'text book 1'
    }
}

class TextBook2 extends ABCTextBook {
    getTextDesc(){
        return 'text book 2'
    }
}
