/*
 * @Descripttion: 处理请求body
 * @Author: sueRimn
 * @Date: 2019-08-08 23:23:31
 * @LastEditTime: 2019-08-14 23:18:20
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

/**
 * @name: transformResponse
 * @desc: 处理响应的data
 * @param {any} 
 * @return: any
 */
export function transformResponse(data: any): any {
  // 如果形影data是字符串,那么要转成对象
  if(typeof data === 'string') {
    try {
      data = JSON.parse(data)
    } catch (error) {
      // do-nothing
    }
  }
  
  return data
}