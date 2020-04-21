const path = require('path')
const fs = require('fs')
const { createServer, proxy } = require('tencent-serverless-http')
let app = require('./sls')

module.exports.handler = async (event, context) => {
  const userSls = path.join(__dirname, 'sls.js')
  if (fs.existsSync(userSls)) {
    // eslint-disable-next-line
    console.log('Using user custom sls.js')
    app = require(userSls)
  }

  context.callbackWaitsForEmptyEventLoop =
    app.callbackWaitsForEmptyEventLoop === true ? true : false

  const server = createServer(app.callback(), null, app.binaryTypes || [])
  return proxy(server, event, context, 'PROMISE').promise
}
