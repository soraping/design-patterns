### 策略模式(`Strategy`)

多重条件选择语句

书上定义描述：**定义一系列的算法，把它们一个个封装起来，并且使它们可以相互替换。**

#### 书上的经典案例：

一名会计，计算员工的奖金。奖金是有等级的，每个等级，所加的系数是不同的。

使用字面量的形式，把每个档位的定义成一个函数:

```javascript
let strategies = {
    "S": function(salary){
        return salary * 4
    },
    "A": function(salary){
        return salary * 3
    },
    "B": function(salary){
        return salary * 2
    }
}
```

使用策略模式，调用对应的函数：

```javascript
let calculateBonus = function(level, salary){
    return strategies[level](salary)
}

console.log(calculateBonus('S', 2000))
console.log(calculateBonus('A', 1000))
```

也可以将具体的策略放在函数内部，这样外部 `context` 是不需要了解具体实现的。

#### 表单验证的案例：

