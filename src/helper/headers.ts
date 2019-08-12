/*
 * @Descripttion: 处理请求头
 * @Author: sueRimn
 * @Date: 2019-08-12 23:21:44
 * @LastEditTime: 2019-08-12 23:33:39
 */
import { isPlainObject } from './util'

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
  normalizeHeaderName(headers, 'Content-Type')
  if (isPlainObject(data)) {
    if (headers && !headers['Content-Type']) {
      headers['Content-Type'] = 'application/json;charset=utf-8'
    }
  }
  return headers
}
