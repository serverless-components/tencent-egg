const ensureIterable = require('type/iterable/ensure')
const ensurePlainObject = require('type/plain-object/ensure')
const ensureString = require('type/string/ensure')
const random = require('ext/string/random')
const path = require('path')
const { Component } = require('@serverless/core')

const DEFAULTS = {
  runtime: 'Nodejs8.9',
  handler: 'entry.handler',
  exclude: ['.git/**', '.gitignore', '.serverless', '.DS_Store', 'run', 'logs']
}

class TencentEgg extends Component {
  getDefaultProtocol(protocols) {
    if (protocols.map((i) => i.toLowerCase()).includes('https')) {
      return 'https'
    }
    return 'http'
  }

  /**
   * prepare create function inputs
   * @param {object} inputs inputs
   */
  async prepareInputs(inputs = {}) {
    inputs.name =
      ensureString(inputs.functionName, { isOptional: true }) ||
      this.state.functionName ||
      `EggComponent_${random({ length: 6 })}`
    inputs.codeUri = ensureString(inputs.code, { isOptional: true }) || process.cwd()
    inputs.region = ensureString(inputs.region, { default: 'ap-guangzhou' })
    inputs.include = ensureIterable(inputs.include, { default: [], ensureItem: ensureString })
    inputs.exclude = ensureIterable(inputs.exclude, { default: [], ensureItem: ensureString })
    inputs.apigatewayConf = ensurePlainObject(inputs.apigatewayConf, { default: {} })

    const shimsDir = path.join(__dirname, 'shims')
    inputs.include = [shimsDir]
    inputs.exclude.push('.git/**', '.gitignore', '.serverless', '.DS_Store')

    inputs.handler = ensureString(inputs.handler, { default: DEFAULTS.handler })
    inputs.runtime = ensureString(inputs.runtime, { default: DEFAULTS.runtime })
    inputs.apigatewayConf = ensurePlainObject(inputs.apigatewayConf, { default: {} })

    if (inputs.functionConf) {
      inputs.timeout = inputs.functionConf.timeout ? inputs.functionConf.timeout : 3
      inputs.memorySize = inputs.functionConf.memorySize ? inputs.functionConf.memorySize : 128
      if (inputs.functionConf.environment) {
        inputs.environment = inputs.functionConf.environment
      }
      if (inputs.functionConf.vpcConfig) {
        inputs.vpcConfig = inputs.functionConf.vpcConfig
      }
    }

    return inputs
  }

  async default(inputs = {}) {
    inputs = await this.prepareInputs(inputs)

    const tencentCloudFunction = await this.load('@serverless/tencent-scf')
    const tencentApiGateway = await this.load('@serverless/tencent-apigateway')

    const tencentCloudFunctionOutputs = await tencentCloudFunction(inputs)
    const apigwParam = {
      serviceName: inputs.serviceName,
      description: 'Serverless Framework tencent-egg Component',
      serviceId: inputs.serviceId,
      region: inputs.region,
      protocols: inputs.apigatewayConf.protocols || ['http'],
      environment:
        inputs.apigatewayConf && inputs.apigatewayConf.environment
          ? inputs.apigatewayConf.environment
          : 'release',
      endpoints: [
        {
          path: '/',
          method: 'ANY',
          function: {
            isIntegratedResponse: true,
            functionName: tencentCloudFunctionOutputs.Name
          }
        }
      ]
    }

    if (inputs.apigatewayConf && inputs.apigatewayConf.auth) {
      apigwParam.endpoints[0].usagePlan = inputs.apigatewayConf.usagePlan
    }
    if (inputs.apigatewayConf && inputs.apigatewayConf.auth) {
      apigwParam.endpoints[0].auth = inputs.apigatewayConf.auth
    }

    const tencentApiGatewayOutputs = await tencentApiGateway(apigwParam)
    const outputs = {
      region: inputs.region,
      functionName: inputs.name,
      apiGatewayServiceId: tencentApiGatewayOutputs.serviceId,
      url: `${this.getDefaultProtocol(tencentApiGatewayOutputs.protocols)}://${
        tencentApiGatewayOutputs.subDomain
      }/${tencentApiGatewayOutputs.environment}/`
    }

    this.state = outputs

    await this.save()

    return outputs
  }

  async remove() {
    const tencentCloudFunction = await this.load('@serverless/tencent-scf')
    const tencentApiGateway = await this.load('@serverless/tencent-apigateway')

    await tencentCloudFunction.remove()
    await tencentApiGateway.remove()

    return {}
  }
}

module.exports = TencentEgg
