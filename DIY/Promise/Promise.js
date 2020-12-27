// 三个状态
const PENDING = 'PENDING'
const FULFILLED = 'FUFILLED'
const REJECTED = 'REJECTED'

const resolvePromise = (promise2, x, resolve, reject) => {
  // 判断不能循环回调
  if (promise2 === x) {
    return reject(new TypeError('Chaining cycle detected for promise #<Promise>'))
  }

  let called

  if ((typeof x === 'object' && x != null) || typeof x === 'function') {
    try {
      let then = x.then
      if (typeof then === 'function') {
        then.call(x, y => {
          if (called) return
          caller = true
          // 可能 promise 里面还有 promise，递归执行
          resolvePromise(promise2, y, resolve, reject)
        }, r => {
          if (called) return
          called = true
          reject(r)
        })
      } else {
        resolve(x)
      }
    } catch (e) {
      if (called) return
      called = true
      reject(e)
    }
  } else {
    resolve(x)
  }
}

class Promise {
  constructor(executor) {
    // 默认状态
    this.status = PENDING
    this.value = undefined // 成功结果
    this.reason = undefined // 错误原因
    this.onResolvedCallbacks = [] // 存放成功回调
    this.onRejectedCallbacks = [] // 存放失败回调

    let resolve = (value) => {
      if (this.status === PENDING) {
        this.status = FULFILLED
        this.value = value
        this.onResolvedCallbacks.forEach(fn => fn())
      }
    }

    let reject = (reason) => {
      if (this.status === PENDING) {
        this.status = REJECTED
        this.reason = reason
        this.onResolvedCallbacks.forEach(fn => fn())
      }
    }

    try {
      executor(resolve, reject)
    } catch (error) {
      reject(error)
    }
  }

  then(onFulFilled, onRejected) {

    onFulFilled = typeof onFulFilled === 'function' ? onFulFilled : v => v

    onRejected = typeof onRejected === 'function' ? onRejected : err => { throw err }

    let promise2 = new Promise((resolve, reject) => {
      if (this.status === FULFILLED) {
        setTimeout(() => {
          try {
            let x = onFulFilled(this.value) // x 可能是 Prmoise
            // 传入 resolvePromise 方法
            resolvePromise(promise2, x, resolve, reject)
          } catch (e) {
            reject(e)
          }
        }, 0)
      }

      if (this.status === REJECTED) {
        setTimeout(() => {
          try {
            let x = onRejected(this.reason)
            resolvePromise(promise2, x, resolve, reject)
          } catch (e) {
            reject(e)
          }
        }, 0)
      }

      if (this.status === PENDING) {
        this.onResolvedCallbacks.push(() => {
          // 真实场景 promise 实现是微任务，不是 setTimeout
          setTimeout(() => {
            try {
              let x = onFulFilled(this.value)
              resolvePromise(promise2, x, resolve, reject)
            } catch (e)  {
              reject(e)
            }
          }, 0)
        })

        this.onRejectedCallbacks.push(() => {
          setTimeout(() => {
            try {
              let x = onRejected(this.reason)
              resolvePromise(promise2, x, resolve, reject)
            } catch (e) {
              reject(e)
            }
          }, 0)
        })
      }
    })

    return promise2

    // if (this.status === FULFILLED) {
    //   onFulFilled(this.value)
    // }
    // if (this.status === REJECTED) {
    //   onRejected(this.reason)
    // }
    // if (this.status === PENDING) {
    //   this.onResolvedCallbacks.push(() => {
    //     onFulFilled(this.value)
    //   })

    //   this.onRejectedCallbacks.push(() => {
    //     onRejected(this.value)
    //   })
    // }
  }
}
module.exports = Promise