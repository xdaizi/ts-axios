// 管理器对象
import {ResolvedFn, RejectedFn} from '../types/index'
// 定义Interceptor接口
interface Interceptor<T> {
    resolved: ResolvedFn<T>
    rejected?: RejectedFn
}

export default class InterceptorManager<T> {
    // 定义一个私有属性来储存传入的函数
    private interceptors: Array<Interceptor<T> | null>
    constructor() {
        // 初始化存储
        this.interceptors = []
    }
    // 定义USE方法,存储拦截器返回id
    use(resolved: ResolvedFn<T>, rejected?: RejectedFn): number {
        this.interceptors.push({
            resolved,
            rejected
        })
        // 将索引作为id
        return this.interceptors.length - 1
    }
    // 定义 解除方法
    eject(id: number): void {
        if(this.interceptors[id]) {
            this.interceptors[id] = null
        }
    }

    // 定义forEach 方法 ,方便外部调用,传入函数处理use推进得函数
    forEach(fn: (interceptor: Interceptor<T>) => void):void{
        this.interceptors.forEach(interceptor => {
            // 存在则处理,应为注销后可能为null
            if(interceptor) {
                fn(interceptor)
            }
        })
    }
}