// 引入Axios类生成混合对象
import {AxiosStatic, AxiosRequestConfig} from './types/index'
import { extend } from './helper/util'
import Axios from './core/axios'
import defaultsConfig from './defaults'
import mergeConfig from './core/mergeConfig'
function createInstance(config: AxiosRequestConfig): AxiosStatic {
    const context = new Axios(config)
    const instance = Axios.prototype.request.bind(context)
    extend(instance, context)
    // 通过extend 保证instance 可以通过 instance.post的形式调用, 且instance本身作为函数可以被调用
    return instance as AxiosStatic
}

const axios = createInstance(defaultsConfig)

axios.create = function(config:AxiosRequestConfig) {
    // 将创造实例的配置与默认配置合并
    let configTemp =  mergeConfig(defaultsConfig, config)
    return createInstance(configTemp)
}

export default axios