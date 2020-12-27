const Promise = require('./Promise.js')

const promise = new Promise((resolve, reject) => {
  setTimeout(() => {
    console.log('run')
    resolve('成功')
  }, 1000)
}).then().then().then(
  (data) => {
    console.log('success', data)
  },
  (err) => {
    console.log('faild', err)
  }
)
