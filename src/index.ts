/*
 * @Descripttion: ts-axios的入口文件
 * @Author: xiaodai
 * @Date: 2019-07-09 23:23:03
 * @LastEditTime: 2019-08-13 23:58:42
 */
import { AxiosRequestConfig, AxiosPromise } from './types/index'
import { buildUrl } from './helper/url'
import { trnasformRequest } from './helper/data'
import { processHeaders } from './helper/headers'

// 引入xhr
import xhr from './xhr'

function axios(config: AxiosRequestConfig): AxiosPromise {
  // 处理config
  processConfig(config)
  return xhr(config)
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
}

/**
 * @name: transformUrl
 * @desc: 转换url的参数, 将get请求参数亲姐到url上
 * @param {config: AxiosRequestConfig}
 * @return: url: string api?key=value
 */
function transformUrl(config: AxiosRequestConfig): string {
  const { url, params } = config
  return buildUrl(url, params)
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

// 导出
export default axios
