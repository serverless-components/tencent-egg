const { Application } = require('egg')

Object.defineProperty(Application.prototype, Symbol.for('egg#eggPath'), {
  value: '/opt'
})

const app = new Application({
  mode: 'single',
  env: 'prod'
})

app.binaryTypes = ['*/*']

module.exports = app
