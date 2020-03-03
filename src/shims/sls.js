const { Application } = require.fromParentEnvironment('egg')
const pkg = require.fromParentEnvironment('./package.json')

const app = new Application({
  env: 'prod'
})

app.binaryTypes = pkg.binaryTypes || ['*/*']

module.exports = app
