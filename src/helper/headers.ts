/*
 * @Descripttion: 处理请求头
 * @Author: sueRimn
 * @Date: 2019-08-12 23:21:44
 * @LastEditTime: 2019-12-01 12:30:27
 */
import { isPlainObject,deepMerge } from './util'
import { Method } from '../types'

/**
 * @name: normalizeHeaderName
 * @desc: 规整化headers的属性名
 * @param {headers: any, normalizedName: string 格式后的属性名}
 * @return: 无
 */
function normalizeHeaderName(headers: any, normalizedName: string): void {
  if (!headers) return
  Object.keys(headers).forEach(name => {
    if (name !== normalizedName && name.toUpperCase() === normalizedName.toUpperCase()) {
      headers[normalizedName] = headers[name]
      delete headers[name]
    }
  })
}

/**
 * @name: processHeaders
 * @desc: 当data为普通对象时,处理请求头
 * @param {headers: any, data: any}
 * @return: 请求头
 */
export function processHeaders(headers: any, data: any): any {
  // debugger
  normalizeHeaderName(headers, 'Content-Type')
  if (isPlainObject(data)) {
    if (headers && !headers['Content-Type']) {
      headers['Content-Type'] = 'application/json;charset=utf-8'
    }
  }
  return headers
}

/**
 * @name: parseHeaders
 * @desc: 解析headers的数据,由字符串分割然后变成对象
 * @param {type} 
 * @return: 
 */
export function parseHeaders(headers: string): any {
  // 准备一个新对象用于存储键值对
  const parsed = Object.create(null)

  // 如果headers不存在.直接返回
  if (!headers) {
    return parsed
  }
  

  // 存在,先分割(空格,换行符),在遍历
  headers.split('\r\n').forEach(line => {
    // 分割拿到对应的key,value
    let [key, value] = line.split(":")
    key = key.trim().toLowerCase()
    if(!key) return
    value = value.trim()
    if(value) {
      parsed[key] = value
    }
  })
  return parsed

}


/**
 * @name: flattenHeaders
 * @desc: 将headers.common及将headers[method]的属性提取到外层
 * @param {type} 
 * @return: 将headers
 */
export function flattenHeaders(headers: any, method: Method): any {
  if(!headers) {
    return headers
  }
  // 深度合并
  headers = deepMerge(headers.common || {}, headers[method] || {}, headers)
  // 删除不需要的方法
  const methodsToDelete = ['delete', 'get', 'head', 'options', 'post', 'put', 'patch', 'common']

  methodsToDelete.forEach(method => {
    delete headers[method]
  })

  return headers
}