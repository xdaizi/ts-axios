import { AxiosRequestConfig } from './types'
import {processHeaders} from './helper/headers'
import {trnasformRequest,transformResponse} from './helper/data'
// 定义默认配置
const defaults: AxiosRequestConfig = {
    method: 'get', // 请求方法
    timeout: 0, // 请求超时
    headers: {
        common: {
          Accept: 'application/json, text/plain, */*' // 接受的响应
        }
    },
    transformRequest: [
      // 最初添加一个处理函数
      function(data: any, headers: any): any {
        headers = processHeaders(headers, data)
        return trnasformRequest(data)
      }
    ],
    transformResponse: [
      function(data:any):any {
        return transformResponse(data)
      }
    ],
    
    // 自定义合法状态码
    validateStatus(status: number): boolean {
      return status >= 200 && status < 300
    },
    xsrfCookieName: 'XSRF-TOKEN',
    xsrfHeaderName: 'X-XSRF-TOKEN',
}
// 不需要请求体
const methodsNoData = ['delete', 'get', 'head', 'options']
methodsNoData.forEach(method => {
    defaults.headers[method] = {}
})

// 需要数据的请求体
const methodsWithData = ['post', 'put', 'patch']

methodsWithData.forEach(method => {
  defaults.headers[method] = {
    'Content-Type': 'application/x-www-form-urlencoded'
  }
})

export default defaults