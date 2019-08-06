// 源码的入口
import { AxiosRequestConfig } from './types/index'
// 引入xhr
import xhr from './xhr'

function axios(config: AxiosRequestConfig): void {
  // TODO
  xhr(config)
}

// 导出
export default axios
