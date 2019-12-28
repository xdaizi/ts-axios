
import { AxiosRequestConfig, AxiosPromise, AxiosResponse } from '../types/index'
import { buildUrl } from '../helper/url'
import { flattenHeaders } from '../helper/headers'
import transform from './transform'

// 引入xhr
import xhr from './xhr'

function dispatchRequest(config: AxiosRequestConfig): AxiosPromise {
  // 判断token 已经被使用过了，直接抛错。
  throwIfCancellationRequested(config)
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
  config.data = transform(config.data, config.headers, config.transformRequest)
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
  const { url, params,paramsSerializer  } = config
  // 通过!断定url一定存在
  return buildUrl(url!, params, paramsSerializer )
}

function transformResponseData(res: AxiosResponse): AxiosResponse{
  res.data = transform(res.data, res.headers, res.config.transformResponse)
  return res
}


function throwIfCancellationRequested(config: AxiosRequestConfig): void {
  if (config.cancelToken) {
    config.cancelToken.throwIfRequested()
  }
}
// 导出
export default dispatchRequest
