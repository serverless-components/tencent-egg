const { generateId, getServerlessSdk } = require('./utils')
const execSync = require('child_process').execSync
const path = require('path')
const axios = require('axios')

// set enough timeout for deployment to finish
jest.setTimeout(600000)

// the yaml file we're testing against
const instanceYaml = {
  org: 'orgDemo',
  app: 'appDemo',
  component: 'egg@dev',
  name: `egg-integration-tests-${generateId()}`,
  stage: 'dev',
  inputs: {
    region: 'ap-hongkong',
    runtime: 'Nodejs8.9',
    apigatewayConf: { environment: 'test' }
  }
}

// get credentials from process.env but need to init empty credentials object
const credentials = {
  tencent: {}
}

// get serverless construct sdk
const sdk = getServerlessSdk(instanceYaml.org)

it('should successfully deploy egg app', async () => {
  const instance = await sdk.deploy(instanceYaml, { tencent: {} })
  expect(instance).toBeDefined()
  expect(instance.instanceName).toEqual(instanceYaml.name)
  // get src from template by default
  expect(instance.outputs.templateUrl).toBeDefined()
})

it('should successfully update source code', async () => {
  // change source to own source '../example' and need to install packages before deploy
  const srcPath = path.join(__dirname, '../example')
  execSync('npm install', { cwd: srcPath })
  instanceYaml.inputs.src = srcPath

  const instance = await sdk.deploy(instanceYaml, credentials)
  const response = await axios.get(instance.outputs.apigw.url)

  expect(instance.outputs.templateUrl).not.toBeDefined()
  expect(response.data.includes('Hello Egg.js')).toBeTruthy()
})

it('should successfully remove egg app', async () => {
  await sdk.remove(instanceYaml, credentials)
  result = await sdk.getInstance(instanceYaml.org, instanceYaml.stage, instanceYaml.app, instanceYaml.name)

  expect(result.instance.instanceStatus).toEqual('inactive')
})
