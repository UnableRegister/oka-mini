import { IncomingMessage, ServerResponse, createServer } from 'http'

// 递归调用中间件
function compose(middlewares: Middleware[]) {
    return ctx => {
        const dispatch = i => {
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
    body: any = ''

    constructor(public req: IncomingMessage, public res: ServerResponse) {
        this.req = req
        this.res = res
    }

    get url() {
        return this.req.url
    }

    get methods() {
        return this.req.method
    }
}

type Middleware = (ctx: Content, next: () => void) => void

class Application {
    constructor(public middlewares?: Middleware[]) {
        this.middlewares = []
    }

    listen(...args) {
        const server = createServer(
            async (req: IncomingMessage, res: ServerResponse) => {
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
            }
        )
        server.listen(...args)
    }

    // 添加中间件
    use(middleware: Middleware) {
        this.middlewares.push(middleware)
    }
}

export default Application
