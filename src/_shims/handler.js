const path = require('path')
const fs = require('fs')
const { createServer, proxy } = require('tencent-serverless-http')

let app
let server

module.exports.handler = async (event, context) => {
  const userSls = path.join(__dirname, '..', 'sls.js')
  if (fs.existsSync(userSls)) {
    // eslint-disable-next-line
    console.log('Using user custom sls.js')
    app = require(userSls)
  } else {
    app = require('./sls')
  }

  if (!server) {
    server = createServer(app.callback(), null, app.binaryTypes || [])
  }

  context.callbackWaitsForEmptyEventLoop =
    app.callbackWaitsForEmptyEventLoop === false ? false : true

  return proxy(server, event, context, 'PROMISE').promise
}
