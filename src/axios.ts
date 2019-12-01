// 引入Axios类生成混合对象
import {AxiosInstance, AxiosRequestConfig} from './types/index'
import { extend } from './helper/util'
import Axios from './core/axios'
import defaultsConfig from './defaults'
function createInstance(config: AxiosRequestConfig): AxiosInstance {
    const context = new Axios(config)
    const instance = Axios.prototype.request.bind(context)
    extend(instance, context)
    // 通过extend 保证instance 可以通过 instance.post的形式调用, 且instance本身作为函数可以被调用
    return instance as AxiosInstance
}

const axios = createInstance(defaultsConfig)

export default axios