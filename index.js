const { getLegislators } = require('./getLegislatorsForPoint')
const koa = require('koa')
const cors = require('@koa/cors')
const bodyParser = require('koa-bodyparser')

const app = new koa()
app.use(cors())
app.use(bodyParser())

function responseError (ctx, code, message) {
  ctx.status = code
  ctx.type = 'json'
  ctx.body = JSON.stringify({ message })
  return
}

app.use(async (ctx, next) => {
  if (ctx.URL.pathname !== 'list' || ctx.method !== 'POST') {
    await next()
    return
  }

  const body = ctx.request.body
  if (!Array.isArray(body) || body.some((el) => typeof el.lng !== 'number' || typeof el.lat !== 'number' )) {
    responseError(ctx, 400, 'wrong body content')
    return
  }

  ctx.type = 'json'
  ctx.body = JSON.stringify(await Promise.all(body.map((el) => getLegislators(el.lng, el.lat))))
})

app.use(async (ctx, next) => {
  if (ctx.URL.pathname !== '/' || ctx.method !== 'GET') {
    await next()
    return
  }

  const lng = Number(ctx.query.lng)
  const lat = Number(ctx.query.lat)
  if (Number.isNaN(lng) || Number.isNaN(lat)) {
    responseError(ctx, 400, 'wrong query params')
    return
  }

  ctx.type = 'json'
  try {
    const result = await getLegislators(lng, lat)
    ctx.body = JSON.stringify(result)
  } catch (e) {
    responseError(ctx, 500, e.message)
  }
})

const PORT = 8888

app.listen(PORT)
console.log(`Listening web server on http://0.0.0.0:${PORT}`)
