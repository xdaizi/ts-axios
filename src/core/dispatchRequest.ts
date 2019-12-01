
import { AxiosRequestConfig, AxiosPromise, AxiosResponse } from '../types/index'
import { buildUrl } from '../helper/url'
import { trnasformRequest, transformResponse } from '../helper/data'
import { processHeaders,flattenHeaders } from '../helper/headers'

// 引入xhr
import xhr from './xhr'

function dispatchRequest(config: AxiosRequestConfig): AxiosPromise {
  // 处理config
  processConfig(config)
  return xhr(config).then(res => {
    return transformResponseData(res)
  })
}

/**
 * @name: processConfig
 * @desc: 处理请求的参数配置
 * @param {config: AxiosRequestConfig}
 * @return: 无
 */
function processConfig(config: AxiosRequestConfig): void {
  config.url = transformUrl(config)
  // 由于处理请求头部要判断data,所以请求头的处理要在data处理之前
  config.headers = transformHeaders(config)
  config.data = transformRequestData(config)

  // 将headers下的提取出来
  config.headers = flattenHeaders(config.headers, config.method!)
}

/**
 * @name: transformUrl
 * @desc: 转换url的参数, 将get请求参数亲姐到url上
 * @param {config: AxiosRequestConfig}
 * @return: url: string api?key=value
 */
function transformUrl(config: AxiosRequestConfig): string {
  const { url, params } = config
  // 通过!断定url一定存在
  return buildUrl(url!, params)
}

/**
 * @name: transformRequestData
 * @desc: 转换请求时body的参数
 * @param {AxiosRequestConfig}
 * @return: any
 */
function transformRequestData(config: AxiosRequestConfig): any {
  return trnasformRequest(config.data)
}

/**
 * @name: transformHeaders
 * @desc: 转换请求头
 * @param {config: AxiosRequestConfig}
 * @return: 请求头 any
 */
function transformHeaders(config: AxiosRequestConfig): any {
  const { headers = {}, data } = config
  return processHeaders(headers, data)
}

function transformResponseData(res: AxiosResponse): AxiosResponse{
  res.data =  transformResponse(res.data)
  return res
}

// 导出
export default dispatchRequest
