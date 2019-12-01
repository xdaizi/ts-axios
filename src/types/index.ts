import { Interface } from "readline"

/*
 * @Descripttion: 接口定义
 * @Author: sueRimn
 * @Date: 2019-07-09 23:24:53
 * @LastEditTime: 2019-12-01 13:53:24
 */
// 存放要使用到的接口

// axios请求method的接口 -- 字符串字面量的形式
export type Method =
  | 'get'
  | 'GET'
  | 'delete'
  | 'Delete'
  | 'head'
  | 'HEAD'
  | 'options'
  | 'OPTIONS'
  | 'post'
  | 'POST'
  | 'put'
  | 'PUT'
  | 'patch'
  | 'PATCH'

// axios 请求参数的接口
export interface AxiosRequestConfig {
  // 请求的地址,参数可拼接在url上所以其他为可选
  // 由于url 可以单独传,所以url也不是必选
  url?: string

  // 请求的方法
  method?: Method

  // get时请求的参数
  params?: any

  // post时请求的参数
  data?: any

  // 请求头
  headers?: any

  // 响应的数据类型
  responseType?: XMLHttpRequestResponseType

  // 请求超时
  timeout?: number

  // 请求转化函数
  transformRequest?: AxiosTransformer | AxiosTransformer[]
  // 响应转化函数
  transformResponse?: AxiosTransformer | AxiosTransformer[]

  //索引签名 属性名(字符串) 属性值any
  [propName:string]: any
}


// axios 响应对象
export interface AxiosResponse<T = any> {
  // 响应头
  headers: any

  // 响应数据
  data: T

  // api配置
  config: AxiosRequestConfig

  // 响应状态
  status: number
  
  // 响应状态信息
  statusText: string

  // 情趣响应对象
  request: any
}


// 响应对象是一个promise,所以继承Promise
export interface AxiosPromise<T = any> extends Promise<AxiosResponse<T>> {
}

// 错误信息接口
export interface AxiosError extends Error {
  // 配置
  config: AxiosRequestConfig 

  // code码
  code?: string

  // 请求
  request: any

  // 响应
  response: AxiosResponse

  // 是否为axios错误
  isAxiosError: boolean

}


// 定义Axios接口
export interface AxiosType {
    // 实例的属性在接口中也定义,方便取
    defaults: AxiosRequestConfig
    interceptors: {
      request: AxiosInterceptorManager<AxiosRequestConfig>,
      response: AxiosInterceptorManager<AxiosResponse>
  }

  // request 函数方法
  request<T = any>(config: AxiosRequestConfig): AxiosPromise<T>

  // get 方法
  get<T = any>(url: string, config?: AxiosRequestConfig): AxiosPromise<T>

  // delete方法
  delete<T = any>(url: string, config?: AxiosRequestConfig): AxiosPromise<T>

  // head方法
  head<T = any>(url: string, config?: AxiosRequestConfig): AxiosPromise<T>

  // options方法
  options<T = any>(url: string, config?: AxiosRequestConfig): AxiosPromise<T>

  // post方法
  post<T = any>(url: string, data?:any, config?: AxiosRequestConfig): AxiosPromise<T>

  // put方法
  put<T = any>(url: string, data?:any, config?: AxiosRequestConfig): AxiosPromise<T>

  // patch方法
  patch<T = any>(url: string, data?:any, config?: AxiosRequestConfig): AxiosPromise<T>
}

// 定义Axios实例类 除了axios.post 行直接axios()调用 --- 混合对象 不但自身是函数,其方法也是函数
// 所以接口继承于Axios接口
// 函数重载 --- axios('get/url',{}) axios({url: 'get/url'})
export interface AxiosInstance extends AxiosType{
  <T = any>(config: AxiosRequestConfig): AxiosPromise<T>
  <T = any>(url:String, config?: AxiosRequestConfig): AxiosPromise<T>
}

// 定义axiosStatic接口, 从而创造实例
export interface AxiosStatic extends AxiosInstance {
  create(config?: AxiosRequestConfig):  AxiosInstance
}

// 定义拦截器的管理对象的忌口,提供外部使用,只有 use ,eject
export interface AxiosInterceptorManager<T> {
  // use 方法 两个参数苏,第一个必选,第二个可选, 返回 ID ,方便取消
  use(resolve: ResolvedFn<T>, RejectedFn? :RejectedFn) :number
  // eject: 取消,传入id即可
  eject(id: number): void
}

// 定义成功的回调
// 可能是同步,也可能是promise
export interface ResolvedFn<T = any> {
  (val: T) :T | Promise<T>
}

// 失败的回到
// 传入any,返回any
export interface RejectedFn  {
  (error: any): any
}

// 定义 transform接口
export interface AxiosTransformer {
  (data: any, headers?: any): any
}
