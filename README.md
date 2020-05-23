# Oka-Mini

koa 的简单实现（js + ts）

## Example

```
const Oka = require('./index.js')

const app = new Oka()

app.use(async (ctx, next) => {
    console.log('1 Start')
    await next()
    console.log('1 End')
})

app.use(async (ctx, next) => {
    console.log('2 Start')
    await next()
    console.log('2 End')

})

app.use(async (ctx, next) => {
    console.log('3 Start')
    await next()
    console.log('3 End')
    ctx.body = 'Are you ok?'
})

app.listen(8090)
```

### 如果你使用 TypeScript
```
import Oka from './index-ts'

const app = new Oka()

app.use(async (ctx, next) => {
    console.log('1 Start')
    await next()
    console.log('1 End')
})

app.use(async (ctx, next) => {
    console.log('2 Start')
    await next()
    console.log('2 End')
})

app.use(async (ctx, next) => {
    console.log('3 Start')
    await next()
    console.log('3 End')
    ctx.body = 'Are you ok?'
})

app.listen(8090)

```