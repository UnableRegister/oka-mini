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
