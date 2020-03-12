### 实现 LikeArray 函数

```js
// 实现 LikeArray 能运行如下代码
function LikeArray() {
  // ...
}
var arr = new LikeArray()
arr.length = 0
arr.push(1)
console.log(arr.length) // 1
console.log(arr[0]) // 1 
```

### 答案

```js
function likeArray() {
  var obj = new Object()
  var length = 0
  obj.push = function(data) {
      obj[length] = data
      this.length = this.length + 1
  }
  obj.length = length
  return obj
}
```