import {AxiosRequestConfig} from '../types'
import {isPlainObject, deepMerge} from '../helper/util'

// 定义一个对象来存储合并策略函数
const strats = Object.create(null)

// 默认合并策略
function defaultStrat(val1:any, val2:any):any {
    return typeof val2 !== 'undefined'? val2: val1
}

// 只取传入的配置
function fromVal2Strat(val1:any, val2:any):any {
    if(typeof val2 !== 'undefined'){
        return val2
    }
}

// 实现深度合并 --- 复杂对象合并
function deepMergeStrat(val1:any, val2:any):any {
    if(isPlainObject(val2)) {
        deepMerge(val1,val2)
    } else if(typeof val2 !== 'undefined'){
        return val2
    } else if(isPlainObject(val1)) {
        deepMerge(val1)
    } else if(typeof val1 !== 'undefined') {
        return val1
    }
}


//定义只取传入配置的字段数组
const stratKeysFromVal2 = ['url', 'data', 'params']

stratKeysFromVal2.forEach(strat => {
    strats[strat] = fromVal2Strat
})

//定义复杂合并字段数组
const stratKeysDeepMerge = ['headers']

stratKeysDeepMerge.forEach(strat => {
    strats[strat] = deepMergeStrat
})



// 定义config合并函数
export default function mergeConfig (config1: AxiosRequestConfig, config2?:AxiosRequestConfig): AxiosRequestConfig{
    // 可能没有传入配置
    if(!config2) {
        config2 = {}
    }

    // 定义一个对象由于返回合并的配置
    const config = Object.create(null)
    
    // 遍历config2
    for(let key in config2) {
        mergeFiled(key)
    }

    // 遍历config1
    for(let key in config1) {
        // 如果config2中没有则调用
        if(!config2[key]) {
            mergeFiled(key)
        }
    }
    
    // 定义合并策略函数
    function mergeFiled(key: string):void {
        // 根据key取不同的配置导函数
        const strat = strats[key] || defaultStrat
        config[key] = strat(config1[key], config2![key])
    }

    return config
}