const { Application } = require('egg')

const app = new Application({
  env: 'prod'
})

app.binaryTypes = ['*/*']

module.exports = app
