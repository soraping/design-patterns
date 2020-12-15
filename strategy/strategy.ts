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

let calculateBonus = function(level, salary){
    return strategies[level](salary)
}

console.log(calculateBonus('S', 2000))
console.log(calculateBonus('A', 1000))

/**
 * 使用函数来概括策略
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

InputStrategy().addStrategy('nickname', function(value){
    return /^[a-zA-Z]\w{3,7}$/.test(value) ? '' : '请输入4-8位昵称'
})