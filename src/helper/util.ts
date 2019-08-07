/*
 * @Descripttion: 辅助类函数
 * @Author: xiaodai
 * @Date: 2019-08-07 23:35:36
 * @LastEditTime: 2019-08-07 23:42:04
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
 * @name: isObject
 * @desc: 判断是否是是对象类型
 * @param {val:any}
 * @return: boolean
 */
export function isObject(val: any): val is Object {
  return toString.call(val) === '[object Object]'
}
