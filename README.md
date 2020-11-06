### 一个通用的 webpack 对页面应用环境。

---

-   ~~最基本的功能可以完成~~。
-   ~~对 webpack 文件进行拆分以及 js css 图片等处理~~。
-   webpack 打包速度优化。 (只是完成了部分优化)
-   为什么 hot reload 没有生效。

### 适用场景

移动端内嵌的 webview 页面。
使用 vue3。

### 思考

1. 移动端与 H5 有没有更好的方法进行数据的传递？ （）

### 使用

本地开发: yarn run dev
打测试包: yarn run build-local
正式包: yarn run build-server

### 说明

1. 默认使用 src/view 下所有的 js/ts 作为构建目标（如果存在重名 如 a.js 和 a.ts 优先使用 js）。 可以 通过更改 webpack.base.js 中的 basePath 如果想使用特定文件名称的文件作为构建目标，getFileDir 可以传递第二个参数 (后期提取一个 config.js 文件进行控制)
