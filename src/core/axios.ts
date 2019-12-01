import { AxiosRequestConfig, AxiosPromise, Method,AxiosResponse,ResolvedFn,RejectedFn} from '../types'
import dispatchRequest from './dispatchRequest'
import InterceptorManager from './Interceptor'
// Interceptor两个属性
// 1.request: use方法传入 AxiosRequestConfig
// 2.response: use方法传入  AxiosResponse
interface Interceptors {
    request: InterceptorManager<AxiosRequestConfig>
    response: InterceptorManager<AxiosResponse>
  }
// 定义个promise的数组,来存储 响应及请求的拦截器
interface PromiseChain {
    // 可以是同步的方法,也可以是异步的
    resolved: ResolvedFn | ((config: AxiosRequestConfig) => AxiosPromise)
    rejected?: RejectedFn // 可选
  }

// 创建axios类
export default class Axios {
    // 定义interceptors 属性
    interceptors: Interceptors
    // 定义defaults默认对象
    defaults: AxiosRequestConfig
    constructor(initConfig: AxiosRequestConfig) {
        // 初始化默认配置
        this.defaults = initConfig
        // 出事化两个拦截器 --- 实例可以调用use ,eject,等方法
        this.interceptors = {
            request: new InterceptorManager<AxiosRequestConfig>(),
            response: new InterceptorManager<AxiosResponse>()
        }
    }
    // request方法
    request(url:any, config?: any) :AxiosPromise {
        // 重载判断
        if(typeof url === 'string') {
            !config  && (config = {})
            config.url = url
        } else {
            config = url
        }
        // 在调用的时候将请求及响应拦截处理
        // 一开始退一个进去
        const chain: PromiseChain[] =  [{
            resolved: dispatchRequest,
            rejected: undefined
        }]

        // 处理请求拦截器,后进入先执行
        this.interceptors.request.forEach(interceptor => {
            chain.unshift(interceptor)
        })

        // 处理响应拦截器, 先进入先执行
        this.interceptors.response.forEach(interceptor => {
            chain.push(interceptor)
        })

        let promise = Promise.resolve(config)

        // 循环
        while(chain.length > 0) {
            // 取出
            const { resolved, rejected } = chain.shift()!
            // 从而形成练市调用
            promise = promise.then(resolved, rejected)
        }

        return promise
        // promise会将返回的参数传给后一个promise, promise.then
        // 链式调用 请求拦截 => xhr => 响应拦截器 => 数据返回
    }
    // get
    get(url: string, config?: AxiosRequestConfig): AxiosPromise {
        return this._requestMethodWithoutData('get', url, config)
    }
    // delete
    delete(url: string, config?: AxiosRequestConfig): AxiosPromise {
        return this._requestMethodWithoutData('delete', url, config)
    }
    // head
    head(url: string, config?: AxiosRequestConfig): AxiosPromise {
        return this._requestMethodWithoutData('head', url, config)
    }
    // options
    options(url: string, config?: AxiosRequestConfig): AxiosPromise {
        return this._requestMethodWithoutData('options', url, config)
    }
    // post
    post(url: string, data?: any, config?: AxiosRequestConfig): AxiosPromise {
        return this._requestMethodWithData('post', url, data, config)
    }
    // put
    put(url: string, data?: any, config?: AxiosRequestConfig): AxiosPromise {
        return this._requestMethodWithData('put', url, data, config)
    }
    // patch
    patch(url: string, data?: any, config?: AxiosRequestConfig): AxiosPromise {
        return this._requestMethodWithData('patch', url, data, config)
    }

    // 处理请求不带data
    _requestMethodWithoutData(method:Method, url:String, config?: AxiosRequestConfig): AxiosPromise {
        return this.request(Object.assign(config || {}, {
            method,
            url
        }))
    }

    // 处理请求带data
    _requestMethodWithData(method:Method, url:String, data?: any, config?: AxiosRequestConfig): AxiosPromise {
        return this.request(Object.assign(config || {}, {
            method,
            url,
            data
        }))
    }
}