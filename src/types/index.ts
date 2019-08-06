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
}
