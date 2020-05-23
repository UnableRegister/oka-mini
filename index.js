const http = require("http")

// 递归调用中间件
function compose (middlewares) {
  return ctx => {
    const dispatch = (i) => {
      const middleware = middlewares[i]
      if (i === middlewares.length) {
        return
      }
      return middleware(ctx, () => dispatch(i + 1))
    }
    return dispatch(0)
  }
}

// 请求上下文
class Content {
  constructor(req, res) {
    this.req = req
    this.res = res
    this.body = ''
  }

  get url () {
    return this.req.url
  }

  get methods () {
    return this.req.method
  }
}

class Application {
  constructor() {
    this.middlewares = []
  }

  // 监听
  listen (...args) {
    const server = http.createServer(async (req, res) => {
      const ctx = new Content(req, res)
      const fn = compose(this.middlewares)
      try {
        await fn(ctx)
      } catch (e) {
        console.log(e)
        ctx.res.statusCode = 500
        ctx.res.end('Internal Server Error')
      }
      ctx.res.end(ctx.body)
    })
    server.listen(...args)
  }

  // 添加中间件
  use (middleware) {
    this.middlewares.push(middleware)
  }
}


module.exports = Application