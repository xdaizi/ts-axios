/*
 * @Descripttion: 针对url的帮助类方方
 * @Author: xiaodao
 * @Date: 2019-08-07 23:12:33
 * @LastEditTime: 2019-08-08 23:29:47
 */

import { isDate, isPlainObject } from './util'

/**
 * @name: encode
 * @desc: 加密url,出去部分的特殊字符不错处理, '@' ':' '$' "," ' ' '[' ']'
 * @param {val: any}
 * @return: string
 */
function encode(val: string): string {
  return encodeURIComponent(val)
    .replace(/%40/g, '@')
    .replace(/%3A/gi, ':')
    .replace(/%24/g, '$')
    .replace(/%2C/gi, ',')
    .replace(/%20/g, '+')
    .replace(/%5B/gi, '[')
    .replace(/%5D/gi, ']')
}

/**
 * @name: buildUrl
 * @desc: 拼接get请求的URL
 * @param {url: string, params: any 可选}
 * @return: url: string
 */
export function buildUrl(url: string, params?: any): string {
  // 01 --- 如果params不存在直接返回url
  if (!params) {
    return url
  }

  // 02 --- 定义数组用来存储解析的参数,以'key=value'的形式
  const parts: string[] = []

  // 03 --- 宾利params解析参数
  Object.keys(params).forEach(key => {
    const val = params[key]
    // 如果属性值为null或者undefined直接返回
    if (val === null || val === undefined) {
      return
    }
    // 定义临时数组存储val
    let values: string[] = []

    // 判断val是否维数组
    if (Array.isArray(val)) {
      values = val
      key += '[]'
    } else {
      values = [val]
    }

    // 遍历values,拼接url
    values.forEach(val => {
      if (isDate(val)) {
        // 判断是否为日期
        val = val.toISOString()
      } else if (isPlainObject(val)) {
        // 判断是否为对象类型
        val = JSON.stringify(val)
      }
      parts.push(`${encode(key)}=${encode(val)}`)
    })
  })

  // 04 --- 拼接参数
  const serializedParams = parts.join('&')
  // 判断是否存在hash
  const markIndex = url.indexOf('#')
  if (markIndex !== -1) {
    url = url.slice(0, markIndex)
  }
  // 判断url上是否已有?及参数
  url += url.indexOf('?') !== -1 ? `&` : `?` + serializedParams
  return url
}
