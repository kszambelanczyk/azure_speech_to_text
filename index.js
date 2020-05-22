const Koa = require('koa');
const app = module.exports = new Koa();


let port = process.env.PORT;
if (port == null || port == "") {
  port = 8000;
}

// logger

app.use(async (ctx, next) => {
  console.log('starting logger');
  await next();
  const rt = ctx.response.get('X-Response-Time');
  console.log(`${ctx.method} ${ctx.url} - ${rt}`);
});

// x-response-time

app.use(async (ctx, next) => {
  console.log('starting response time');
  const start = Date.now();
  await next();
  const ms = Date.now() - start;
  ctx.set('X-Response-Time', `${ms}ms`);
});

// response

app.use(async ctx => {
  console.log('starting response');
  ctx.body = 'Hello World';
});

if (!module.parent) app.listen(port);