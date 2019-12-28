const express = require('express')
const bodyParser = require('body-parser')
const webpack = require('webpack')
const webpackDevMiddleware = require('webpack-dev-middleware')
const webpackHotMiddleware = require('webpack-hot-middleware')
const WebpackConfig = require('./webpack.config')
const router = express.Router()
const cookieParser = require('cookie-parser')
require('./server2.js')
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

// 给一个token
app.use(express.static(__dirname, {
  setHeaders (res) {
    res.cookie('XSRF-TOKEN-D', '1234abc')
  }
}))

// 4.webpack-hot-middleware
app.use(webpackHotMiddleware(compiler))

// 5.这个方法和下边注释的方法作用一样，就是设置访问静态文件的路径
app.use(express.static(__dirname))

// 6.body-parser --- 解析请求
app.use(bodyParser.json()) // 解析JSON格式
app.use(bodyParser.urlencoded({ extended: true })) // 解析文本格式

// 解析cookie
app.use(cookieParser())

// 注册请求路由
registerSimpleRouter()

registerBaseRouter()

registerErrorRouter()

registerExtendRouter()
registerInterceptorRouter()
registerConfigRouter()
registerCancelRouter()
registerMoreRouter()
function registerSimpleRouter() {
  // 路由
  router.get('/simple/get', function(req, res) {
    res.json({
      msg: `hello world`
    })
  })
}

function registerBaseRouter() {
  router.get('/base/get', function(req, res) {
    res.json(req.query)
  })
  
  router.post('/base/post', function(req, res) {
    res.json(req.body)
  })
  
  router.post('/base/buffer', function(req, res) {
    let msg = []
    req.on('data', (chunk) => {
      if (chunk) {
        msg.push(chunk)
      }
    })
    req.on('end', () => {
      let buf = Buffer.concat(msg)
      res.json(buf.toJSON())
    })
  })
}

function registerErrorRouter() {
  router.get('/error/get', function(req, res) {
    if (Math.random() > 0.5) {
      res.json({
        msg: `hello world`
      })
    } else {
      res.status(500)
      res.end()
    }
  })
  
  router.get('/error/timeout', function(req, res) {
    setTimeout(() => {
      res.json({
        msg: `hello world`
      })
    }, 3000)
  })
}
function registerExtendRouter() {
  router.get('/extend/get', function(req, res) {
    res.json({
      msg: 'hello world'
    })
  })

  router.options('/extend/options', function(req, res) {
    res.end()
  })

  router.delete('/extend/delete', function(req, res) {
    res.end()
  })

  router.head('/extend/head', function(req, res) {
    res.end()
  })

  router.post('/extend/post', function(req, res) {
    res.json(req.body)
  })

  router.put('/extend/put', function(req, res) {
    res.json(req.body)
  })

  router.patch('/extend/patch', function(req, res) {
    res.json(req.body)
  })

  router.get('/extend/user', function(req, res) {
    res.json({
      code: 0,
      message: 'ok',
      result: {
        name: 'jack',
        age: 18
      }
    })
  })
}
function registerInterceptorRouter () {
  router.get('/interceptor/get', function(req, res) {
    res.end('hello')
  })
}
function registerConfigRouter () {
  router.post('/config/post', function(req, res) {
    res.json(req.body)
  })
}

function registerCancelRouter () {
  router.get('/cancel/get', function(req, res) {
    setTimeout(() => {
      res.json('hello')
    }, 1000)
  })

  router.post('/cancel/post', function(req, res) {
    setTimeout(() => {
      res.json(req.body)
    }, 1000)
  })
}
function registerMoreRouter () {
  router.get('/more/get', function(req, res) {
    res.json(req.cookies)
  })

  // router.post('/more/upload', function(req, res) {
  //   console.log(req.body, req.files)
  //   res.end('upload success!')
  // })

  // router.post('/more/post', function(req, res) {
  //   const auth = req.headers.authorization
  //   const [type, credentials] = auth.split(' ')
  //   console.log(atob(credentials))
  //   const [username, password] = atob(credentials).split(':')
  //   if (type === 'Basic' && username === 'Yee' && password === '123456') {
  //     res.json(req.body)
  //   } else {
  //     res.status(401)
  //     res.end('UnAuthorization')
  //   }
  // })

  // router.get('/more/304', function(req, res) {
  //   res.status(304)
  //   res.end()
  // })

  // router.get('/more/A', function(req, res) {
  //   res.end('A')
  // })

  // router.get('/more/B', function(req, res) {
  //   res.end('B')
  // })
}
app.use(router)

//7.起服务监听端口
const port = 3333 || process.env.PORT || 8080
const server = app.listen(port,()=>{
    console.log(`Server listening on http://localhost:${port}, Ctrl+C to stop`)
})

// 导出
module.exports = server
