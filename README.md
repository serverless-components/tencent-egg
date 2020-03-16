[![Serverless Egg Tencent Cloud](https://img.serverlesscloud.cn/20191226/1577361751088-egg_width.png)](http://serverless.com)

# 腾讯云 Egg.js Serverless Component

[![npm](https://img.shields.io/npm/v/%40serverless%2Ftencent-egg)](http://www.npmtrends.com/%40serverless%2Ftencent-egg)
[![NPM downloads](http://img.shields.io/npm/dm/%40serverless%2Ftencent-egg.svg?style=flat-square)](http://www.npmtrends.com/%40serverless%2Ftencent-egg)

简体中文 | [English](https://github.com/serverless-components/tencent-egg/blob/master/README.en.md)

## 简介

腾讯云 [Egg.js](https://github.com/eggjs/egg) Serverless Component。

## 目录

0. [准备](#0-准备)
1. [安装](#1-安装)
1. [配置](#2-配置)
1. [部署](#3-部署)
1. [移除](#4-移除)

### 0. 准备

#### 初始化 Egg 项目

```bash
$ mkdir egg-example && cd egg-example
$ npm init egg --type=simple
$ npm i
```

#### 新增初始化文件

在项目根目录下新建文件 `sls.js`，内容如下：

```js
const { Application } = require('egg')

const app = new Application({
  env: 'prod'
})

module.exports = app
```

#### 修改 Egg 配置

由于云函数在执行时，只有 `/tmp` 可读写的，所以我们需要将 `egg.js` 框架运行尝试的日志写到该目录下，为此需要修改 `config/config.default.js` 中的配置如下：

```js
const config = (exports = {
  env: 'prod', // 推荐云函数的 egg 运行环境变量修改为 prod
  rundir: '/tmp',
  logger: {
    dir: '/tmp'
  }
})
```

### 1. 安装

通过 npm 全局安装 [serverless cli](https://github.com/serverless/serverless)

```bash
$ npm install -g serverless
```

### 2. 配置

在项目根目录创建 `serverless.yml` 文件，在其中进行如下配置

```bash
$ touch serverless.yml
```

```yml
# serverless.yml

MyComponent:
  component: '@serverless/tencent-egg'
  inputs:
    region: ap-guangzhou
    functionName: egg-function
    code: ./
    functionConf:
      timeout: 10
      memorySize: 128
      environment:
        variables:
          TEST: vale
      vpcConfig:
        subnetId: ''
        vpcId: ''
    apigatewayConf:
      protocols:
        - https
      environment: release
```

- [更多配置](https://github.com/serverless-components/tencent-egg/tree/master/docs/configure.md)

### 3. 部署

如您的账号未 [登陆](https://cloud.tencent.com/login) 或 [注册](https://cloud.tencent.com/register) 腾讯云，您可以直接通过 `微信` 扫描命令行中的二维码进行授权登陆和注册。

通过 `sls` 命令进行部署，并可以添加 `--debug` 参数查看部署过程中的信息

```bash
$ sls --debug

  DEBUG ─ Resolving the template's static variables.
  DEBUG ─ Collecting components from the template.
  DEBUG ─ Downloading any NPM components found in the template.
  DEBUG ─ Analyzing the template's components dependencies.
  DEBUG ─ Creating the template's components graph.
  DEBUG ─ Syncing template state.
  DEBUG ─ Executing the template's components graph.
  DEBUG ─ Compressing function egg-function file to /Users/yugasun/Desktop/Develop/serverless/tencent-egg/example/.serverless/egg-function.zip.
  DEBUG ─ Compressed function egg-function file successful
  DEBUG ─ Uploading service package to cos[sls-cloudfunction-ap-guangzhou-code]. sls-cloudfunction-default-egg-function-1584348537.zip
  DEBUG ─ Uploaded package successful /Users/yugasun/Desktop/Develop/serverless/tencent-egg/example/.serverless/egg-function.zip
  DEBUG ─ Creating function egg-function
  egg-function [████████████████████████████████████████] 100% | ETA: 0s | Speed: 4422.09k/s
  DEBUG ─ Updating code...
  DEBUG ─ Updating configure...
  DEBUG ─ Created function egg-function successful
  DEBUG ─ Setting tags for function egg-function
  DEBUG ─ Creating trigger for function egg-function
  DEBUG ─ Deployed function egg-function successful
  DEBUG ─ Starting API-Gateway deployment with name ap-guangzhou-apigateway in the ap-guangzhou region
  DEBUG ─ Using last time deploy service id service-jkcevoqw
  DEBUG ─ Updating service with serviceId service-jkcevoqw.
  DEBUG ─ Endpoint ANY / already exists with id api-et0yjwci.
  DEBUG ─ Updating api with api id api-et0yjwci.
  DEBUG ─ Service with id api-et0yjwci updated.
  DEBUG ─ Deploying service with id service-jkcevoqw.
  DEBUG ─ Deployment successful for the api named ap-guangzhou-apigateway in the ap-guangzhou region.

  MyEgg:
    functionName:        egg-function
    functionOutputs:
      ap-guangzhou:
        Name:        egg-function
        Runtime:     Nodejs8.9
        Handler:     serverless-handler.handler
        MemorySize:  128
        Timeout:     10
        Region:      ap-guangzhou
        Namespace:   default
        Description: This is a template function
    region:              ap-guangzhou
    apiGatewayServiceId: service-jkcevoqw
    url:                 https://service-jkcevoqw-1251556596.gz.apigw.tencentcs.com/release/
    cns:                 (empty array)
```

> 注意: `sls` 是 `serverless` 命令的简写。

### 4. 移除

通过以下命令移除部署的 Egg 服务资源，包括云函数和 API 网关。

```bash
$ sls remove --debug

  DEBUG ─ Flushing template state and removing all components.
  DEBUG ─ Removed function egg-function successful
  DEBUG ─ Removing any previously deployed API. api-et0yjwci
  DEBUG ─ Removing any previously deployed service. service-jkcevoqw

  10s › MyEgg › done
```

### 账号配置（可选）

当前默认支持 CLI 扫描二维码登录，如您希望配置持久的环境变量/秘钥信息，也可以本地创建 `.env` 文件

```bash
$ touch .env # 腾讯云的配置信息
```

在 `.env` 文件中配置腾讯云的 SecretId 和 SecretKey 信息并保存

如果没有腾讯云账号，可以在此 [注册新账号](https://cloud.tencent.com/register)。

如果已有腾讯云账号，可以在 [API 密钥管理](https://console.cloud.tencent.com/cam/capi) 中获取 `SecretId` 和`SecretKey`.

```text
# .env
TENCENT_SECRET_ID=123
TENCENT_SECRET_KEY=123
```

### 更多组件

可以在 [Serverless Components](https://github.com/serverless/components) repo 中查询更多组件的信息。

### 常见问题解答

1. [部署时一直处于打包压缩阶段](https://github.com/serverless-components/tencent-egg/issues/5)

### FAQ

1. [为什么不需要入口文件了？](https://github.com/serverless-components/tencent-egg/issues/1)
