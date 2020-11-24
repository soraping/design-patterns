class MetaSingleton(type):
    
    def __init__(self, *args, **kwargs):
        self.__instance = None
    
    def __call__(self, *args, **kwargs):
        """
        自定义类被实例化时，元类的 __call__ 方法会被调用（自定义类其实是元类的实例），这样就能控制对象的实例化
        """
        if self.__instance is None:
            self.__instance = super().__call__(*args, **kwargs)
            
        return self.__instance
        
    
    

class YourClass(metaclass=MetaSingleton):
    pass

your1 = YourClass()

your2 = YourClass()

print(your1 is your2)