const path = require('path')
const fs = require('fs')
const { createServer, proxy } = require('tencent-serverless-http')

module.exports.handler = async (event, context) => {
  const userSls = path.join(__dirname, 'sls.js')
  let app
  if (fs.existsSync(userSls)) {
    // eslint-disable-next-line
    console.log('Using user custom sls.js')
    app = require(userSls)
  } else {
    app = require('./sls')
  }

  context.callbackWaitsForEmptyEventLoop =
    app.callbackWaitsForEmptyEventLoop === true ? true : false

  if (!global.server) {
    global.server = createServer(app.callback(), null, app.binaryTypes || [])
  }
  return proxy(global.server, event, context, 'PROMISE').promise
}
