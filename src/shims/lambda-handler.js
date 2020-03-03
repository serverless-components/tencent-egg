const { createServer, proxy } = require('tencent-serverless-http')
const app = require('./sls')

module.exports.handler = async (event, context) => {
  const server = createServer(app.callback(), null, app.binaryTypes || [])
  return proxy(server, event, context, 'PROMISE').promise
}
