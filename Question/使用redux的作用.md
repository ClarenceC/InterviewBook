## 使用 Redux 的作用

在 Redux 文档上面写了这句话
`If you are not sure whether you need it, you probably not.`
表示如果你不明确你是否需要使用 Redux 的时候，你很可能就不需要使用到 Redux，因为现在 React 也有 Context API 来处理组件间的数据状态流，那一般什么时候需要使用到 `Redux` 呢？

在业务比较复杂的状态管理场景就需要引入 Redux 这样的状态管理工具。
1. Redux 可以让你的状态/数据和**组件解耦**，更好的管理和做组件间的通信
2. 并且可以保证全局的 **单一数据源**。
3. 所以有数据都是只读形式，必须通过 `dispatch` 一个 `action` 来对数据的更改。
4. Redux 也可以使到状态组件做到**可预测**、**可回退**、**可监测**。


### 参考引用

- [什么时候react.js合适使用redux与不使用？](https://www.zhihu.com/question/266777670)
- [如何评价数据流管理架构 Redux?](https://www.zhihu.com/question/38591713)


