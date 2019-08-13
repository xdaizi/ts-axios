/*
 * @Descripttion: xhr功能模块
 * @Author: sueRimn
 * @Date: 2019-07-09 23:39:12
 * @LastEditTime: 2019-08-13 23:59:03
 */
// 实现xhr请求方法的模块
import { AxiosRequestConfig, AxiosPromise, AxiosResponse } from './types/index'
export default function xhr(config: AxiosRequestConfig): AxiosPromise {
  // 返回promise对象
  return new Promise((resolve) =>{
    // 利用解构赋值拿到参数,并且赋给默认值
    const { data = null, url, method = 'get', headers, responseType } = config
  
    // 创建xhr对象
    const request = new XMLHttpRequest()
  
    // 响应数据类型
    if(responseType) {
      request.responseType = responseType
    }
  
    // 初始化请求 请求方法，请求url，是否异步
    request.open(method.toUpperCase(), url, true)
  
    // 监听响应变化
    request.onreadystatechange = function handeLoad() {

      if(request.readyState !== 4) { // 请求未回
        return
      }
      // 获取头部 
      const responseHeaders = request.getAllResponseHeaders()
      // 根据类型获取请求数据
      const responseData = responseType && responseType !== 'text' ? request.response : request.responseText
      const response: AxiosResponse = {
        data: responseData,
        status: request.status,
        statusText: request.statusText,
        headers: responseHeaders,
        config,
        request
      }
      resolve(response)
    }
  
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
  })

}
