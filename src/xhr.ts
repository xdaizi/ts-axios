/*
 * @Descripttion: xhr功能模块
 * @Author: sueRimn
 * @Date: 2019-07-09 23:39:12
 * @LastEditTime: 2019-08-12 23:45:20
 */
// 实现xhr请求方法的模块
import { AxiosRequestConfig } from './types/index'
export default function xhr(config: AxiosRequestConfig): void {
  // 利用解构赋值拿到参数,并且赋给默认值
  const { data = null, url, method = 'get', headers } = config

  // 创建xhr对象
  const request = new XMLHttpRequest()

  // 初始化请求 请求方法，请求url，是否异步
  request.open(method.toUpperCase(), url, true)

  // 处理请求头
  Object.keys(headers).forEach(name => {
    // 如果data不存在,不需要设置请求头
    if (data === null && headers[name].toLowerCase === 'content-type') {
      delete headers[name]
    } else {
      // 设置请求头信息
      request.setRequestHeader(name, headers[name])
    }
  })

  // 发送请求
  request.send(data)
}
