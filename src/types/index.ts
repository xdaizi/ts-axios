/*
 * @Descripttion: 接口定义
 * @Author: sueRimn
 * @Date: 2019-07-09 23:24:53
 * @LastEditTime: 2019-08-13 23:40:49
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
  url: string

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
}


// axios 响应对象
export interface AxiosResponse {
  // 响应头
  headers: any

  // 响应数据
  data: any

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
export interface AxiosPromise extends Promise<AxiosResponse> {
}