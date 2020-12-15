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

> 一等函数对象

函数作为一等对象，策略模式是隐形的。`strategy` 就是值为函数的变量。

```javascript
/**
 * 策略变量就是一个函数
 * @param salary 
 */
let S = function(salary){
    return salary * 4 
}

let A = function(salary){
    return salary * 3
}

let B = function(salary){
    return salary * 2
}

let calculateBonus2 = function(func, salary){
    return func(salary)
}
```

这样隐形的策略模式，一个策略就是一个函数，并将这个函数赋值给一个变量。

#### 表单验证的案例：

```javascript
/**
 * 表单校验案例
 */
let InputStrategy = function(){

    let strategy = {
        notNull: function(value){
            return /\s+/.test(value) ? '请输入内容':''
        },
        number: function(value){
            return /^[0-9]+(\.[0-9]+)?$/.test(value) ? '' : '请输入数字'
        }
    }

    return {
        /**
         * 校验表单
         * @param type 
         * @param value 
         */
        check: function(type, value){
            value = value.replace(/^\s+|\s+$/g, '')
            return strategy[type] ? strategy[type](value) : "没有该类型的检测方法"
        },

        /**
         * 添加策略模式
         * @param type 
         * @param fn 
         */
        addStrategy: function(type, fn){
            strategy[type] = fn
        }
    }

}
```

这个案例中，新增了一个策略的拓展接口，可以通过该接口添加策略，而不是修改内部代码。

```javascript
InputStrategy().addStrategy('nickname', function(value){
    return /^[a-zA-Z]\w{3,7}$/.test(value) ? '' : '请输入4-8位昵称'
})
```