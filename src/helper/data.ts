/*
 * @Descripttion: 处理请求body
 * @Author: sueRimn
 * @Date: 2019-08-08 23:23:31
 * @LastEditTime: 2019-08-08 23:31:58
 */
import { isPlainObject } from './util'

/**
 * @name: trnasformRequest
 * @desc: 处理请求时的body参数
 * @param {data: any}
 * @return: any
 */
export function trnasformRequest(data: any): any {
  // 如果是普通对象类型需要转换成JSON字符串对象
  if (isPlainObject(data)) {
    return JSON.stringify(data)
  }
  return data
}
