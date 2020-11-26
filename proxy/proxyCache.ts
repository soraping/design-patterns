let mult = function(){
    let params = Array.prototype.slice.call(arguments)
    return params.reduce((prev, cur) => {
        return prev * cur
    }, 1)
}

console.log(mult(1,2,3,4))

let proxyMult = (function(){
    // 缓存字典
    let cache = {}
    return function(){
        // 缓存key
        let cache_key = Array.prototype.join.call(arguments, ",")

        if(cache_key in cache){
            return cache[cache_key]
        }
        return cache[cache_key] = mult(...arguments)
        // return cache[cache_key] = mult.apply(this, arguments)
    }

})()

console.time('fisrt')
console.log(proxyMult(1,2,3,4))
console.timeEnd('fisrt')

console.time('secend')
console.log(proxyMult(1,2,3,4))
console.timeEnd('secend')

