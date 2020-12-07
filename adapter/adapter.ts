const webapi_v1 = function(){
    return {
        zhangsan: 20,
        lisi: 25
    }
}

const webapi_v2 = function(){
    return [
        {
            name: "zhangsan",
            age: 20
        },
        {
            name: "lisi",
            age: 25
        }
    ]
}

let adapterWebapi = function(fn){
    return Object.keys(fn()).map(key => {
        return {
            "name": key,
            "age": fn()[key]
        }
    })
}

console.log(webapi_v1())
console.log(webapi_v2())
console.log(adapterWebapi(webapi_v1))

