// 执行webpack及起本地服务

const express = require('express')
const bodyParser = require('body-parser')
const webpack = require('webpack')
const webpackDevMiddleware = require('webpack-dev-middleware')
const webpackHotMiddleware = require('webpack-hot-middleware')
const WebpackConfig = require('./webpack.config')
const router = express.Router()

// 1.拿到express的实例
const app = new express()

// 2.拿到对应的webpack配置的编译
const compiler = webpack(WebpackConfig)

// 3.webpack-dev-middleware
app.use(webpackDevMiddleware(compiler, {
    publicPath: '/__build__/', // 公共路径
    stats: {       //  用于形成统计信息的选项 
        colors: true,
        chunks: false
    },
}))

// 4.webpack-hot-middleware
app.use(webpackHotMiddleware(compiler))

// 5.这个方法和下边注释的方法作用一样，就是设置访问静态文件的路径
app.use(express.static(__dirname))

// 6.body-parser --- 解析请求
app.use(bodyParser.json()) // 解析JSON格式
app.use(bodyParser.urlencoded({ extended: true })) // 解析文本格式

// 路由
router.get('/simple/get', function(req, res) {
  res.json({
    msg: `hello world`
  })
})

app.use(router)

//7.起服务监听端口
const port = process.env.PORT || 8080
const server = app.listen(port,()=>{
    console.log(`Server listening on http://localhost:${port}, Ctrl+C to stop`)
})

// 导出
module.exports = server
