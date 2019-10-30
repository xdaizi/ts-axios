
// 实现xhr请求方法的模块
import { AxiosRequestConfig, AxiosPromise, AxiosResponse } from '../types/index'
import { parseHeaders } from '../helper/headers'
import { createError } from '../helper/error'
export default function xhr(config: AxiosRequestConfig): AxiosPromise {
  // 返回promise对象
  return new Promise((resolve, reject) =>{
    // 利用解构赋值拿到参数,并且赋给默认值
    const { data = null, url, method = 'get', headers, responseType, timeout } = config
  
    // 创建xhr对象
    const request = new XMLHttpRequest()
  
    // 响应数据类型
    if(responseType) {
      request.responseType = responseType
    }
    // 如果超时配置存在
    if(timeout) {
      request.timeout = timeout
    }
  
    // 初始化请求 请求方法，请求url，是否异步
    // 使用! 断定url必定存在
    request.open(method.toUpperCase(), url!, true)
  
    // 监听响应变化
    request.onreadystatechange = function handeLoad() {

      if(request.readyState !== 4) { // 请求未回
        return
      }

      // 如果是超时或者请求出错,status = 0
      if(request.status === 0) {
        return
      }
       

      // 获取头部 
      const responseHeaders = parseHeaders(request.getAllResponseHeaders())
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
      handeRespons(response)
    }

    // 监听请求异常
    request.onerror = function handeError() {
      reject(createError(
        'Network Error',
        config,
        null,
        request
      ))
    }
  
    // 监听请求超时
    request.ontimeout = function handeTimeout() {
      reject(createError(
        `Timeout of ${config.timeout} ms exceeded`,
        config,
        'ECONNABORTED',
        request
      ))
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

    /**
     * @name: handeRespons
     * @desc: 处理响应结果
     * @param {AxiosResponse} 
     * @return: 无
     */
    function handeRespons(response: AxiosResponse): void {
      // 正常返回
      if(response.status >= 200 && response.status< 300) {
        resolve(response)
      } else {
        reject(createError(
          `Request failed with status code ${response.status}`,
          config,
          null,
          request,
          response
        ))
      }
    }
  })

}
