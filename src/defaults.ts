import { AxiosRequestConfig } from './types'
// 定义默认配置
const defaults: AxiosRequestConfig = {
    method: 'get', // 请求方法
    timeout: 0, // 请求超时
    headers: {
        common: {
          Accept: 'application/json, text/plain, */*' // 接受的响应
        }
    }
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