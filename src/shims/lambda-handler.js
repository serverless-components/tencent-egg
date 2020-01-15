const { createServer, proxy } = require('tencent-serverless-http')

module.exports.handler = async (event, context) => {
  const app = require.fromParentEnvironment('./sls')
  const server = createServer(app.callback())
  return proxy(server, event, context, 'PROMISE').promise
}
