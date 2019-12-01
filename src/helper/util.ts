/*
 * @Descripttion: 辅助类函数
 * @Author: xiaodai
 * @Date: 2019-08-07 23:35:36
 * @LastEditTime: 2019-12-01 11:56:15
 */

// 类型判断 --- 可能多次用到,所以缓存下来
const toString = Object.prototype.toString

/**
 * @name: isDate
 * @desc: 判断是否是是日期对象
 * @param {val:any}
 * @return: boolean
 */
export function isDate(val: any): val is Date {
  return toString.call(val) === '[object Date]'
}

/**
 * @name: isPlainObject
 * @desc: 判断是否是是普通对象类型
 * @param {val:any}
 * @return: boolean
 */
export function isPlainObject(val: any): val is Object {
  return toString.call(val) === '[object Object]'
}

/**
 * @name: extend
 * @desc: 将一个对象上的属性拷贝到另一个对象
 * @param {type} to:any 目标杜爱香 from:any 拷贝的对象 
 * @return: to 
 */
export function extend<T, U>(to: T, from: U): T & U {
  for (const key in from) {
    ;(to as T & U)[key] = from[key] as any
  }
  return to as T & U
}

/**
 * @name: deepMerge
 * @desc: 深度合并函数
 * @param {any} 参数可以是多个对象
 * @return: 合并后的对象
 */
export function deepMerge(...objs:any[]):any {
  const result = Object.create(null)
  // 遍历参数
  objs.forEach(obj => {
    if(obj) {
      let keys = Object.keys(obj)
      // 遍历属性值
      keys.forEach(key => {
        // 对象 --- 递归
        if(isPlainObject(obj[key])){
          // 原先有,则再次合并
          if (isPlainObject(result[key])) {
            result[key] = deepMerge(result[key], obj[key])
          } else {
            result[key] = deepMerge(obj[key])
          }
        } else { // 非对象 --- 直接赋值
          result[key] = obj[key]
        }
      })
    }
  })
  return result
}