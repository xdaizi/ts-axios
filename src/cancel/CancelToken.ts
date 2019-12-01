// 实现cancelToken的类
import {CancelExecutor, CancelTokenSource, Canceler} from '../types'
import Cancel from './Cancel'

interface ResolvePromise {
    (reason?: Cancel): void
}

export default class CancelToken {
    // 定义promise
    promise: Promise<Cancel>
    // 定义取消的消息
    reason?: Cancel

    constructor(executor: CancelExecutor) {
        // 定义一个中间变量接一下
        let resolvePromise:ResolvePromise
        // 实例化一个padding状态的promise
        this.promise = new Promise<Cancel>(resolve => {
            resolvePromise = resolve
        })

        executor(message => {
            if(this.reason) return;
            // 装饰城一个类,方便检测是否是取消请求返回的信息
            this.reason = new Cancel(message)
            resolvePromise(this.reason)
        })
    }

    // 静态方法
    static source(): CancelTokenSource {
        let cancel!: Canceler
        // 相当于手动完成cancel的赋值,并暴露出去
        const token = new CancelToken(c => {
          cancel = c
        })
        return {
          cancel,
          token
        }
    }

    throwIfRequested(): void {
        // reason被赋值,那么就被使用过
        if (this.reason) {
          throw this.reason
        }
    }
}