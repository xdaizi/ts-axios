// 实现xhr请求方法的模块
import { AxiosRequestConfig } from './types/index'
export default function xhr(config: AxiosRequestConfig): void {
  // 利用解构赋值拿到参数,并且赋给默认值
  const { data = null, url, method = 'get' } = config

  // 创建xhr对象
  const request = new XMLHttpRequest()

  // 初始化请求 请求方法，请求url，是否异步
  request.open(method.toUpperCase(), url, true)

  // 发送请求
  request.send(data)
}
