const { Application } = require('egg')
const { createServer, proxy } = require('./aws-serverless-express')

module.exports.handler = async (event, context) => {
  const app = new Application()
  await app.ready((err) => {
    throw err
  })
  const server = createServer(app.callback())
  return proxy(server, event, context, 'PROMISE').promise
}
