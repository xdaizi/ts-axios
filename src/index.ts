/*
 * @Descripttion: ts-axios的入口文件
 * @Author: xiaodai
 * @Date: 2019-07-09 23:23:03
 * @LastEditTime: 2019-08-08 23:35:01
 */
import { AxiosRequestConfig } from './types/index'
import { buildUrl } from './helper/url'
import { trnasformRequest } from './helper/data'
// 引入xhr
import xhr from './xhr'

function axios(config: AxiosRequestConfig): void {
  // 处理config
  processConfig(config)
  xhr(config)
}

/**
 * @name: processConfig
 * @desc: 处理请求的参数配置
 * @param {config: AxiosRequestConfig}
 * @return: 无
 */
function processConfig(config: AxiosRequestConfig): void {
  config.url = transformUrl(config)
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

// 导出
export default axios
