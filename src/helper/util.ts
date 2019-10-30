/*
 * @Descripttion: 辅助类函数
 * @Author: xiaodai
 * @Date: 2019-08-07 23:35:36
 * @LastEditTime: 2019-10-30 21:41:53
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