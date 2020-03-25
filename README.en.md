[![Serverless Egg Tencent Cloud](https://img.serverlesscloud.cn/20191226/1577361751088-egg_width.png)](http://serverless.com)

# Tencent Egg.js Serverless Component

[![npm](https://img.shields.io/npm/v/%40serverless%2Ftencent-egg)](http://www.npmtrends.com/%40serverless%2Ftencent-egg)
[![NPM downloads](http://img.shields.io/npm/dm/%40serverless%2Ftencent-egg.svg?style=flat-square)](http://www.npmtrends.com/%40serverless%2Ftencent-egg)

[简体中文](https://github.com/serverless-components/tencent-egg/blob/master/README.md) | English

## Introduction

[Egg.js](https://github.com/eggjs/egg) Serverless Component for Tencent Cloud.

## Content

1. [Prepare](#0-prepare)
1. [Install](#1-install)
1. [Create](#2-create)
1. [Configure](#3-configure)
1. [Deploy](#4-deploy)
1. [Remove](#5-Remove)

### 0. Prepare

#### Init Egg Project

```bash
$ mkdir egg-example && cd egg-example
$ npm init egg --type=simple
$ npm i
```

#### Change Egg Config

When cloud funtion executing, only `/tmp` folder is writable, so we need change the folder of logging for `egg.js`, then we change the configuration in `config/config.default.js` as below:

```js
const config = (exports = {
  env: 'prod', // prod is recommended
  rundir: '/tmp',
  logger: {
    dir: '/tmp'
  }
})
```

### 1. Install

Install the Serverless Framework globally:

```bash
$ npm install -g serverless
```

### 2. Create

In project root, create the following simple boilerplate:

```bash
$ touch serverless.yml
$ touch .env           # your Tencent api keys
```

Add the access keys of a [Tencent CAM Role](https://console.cloud.tencent.com/cam/capi) with `AdministratorAccess` in the `.env` file, using this format:

```
# .env
TENCENT_SECRET_ID=XXX
TENCENT_SECRET_KEY=XXX
```

- If you don't have a Tencent Cloud account, you could [sign up](https://intl.cloud.tencent.com/register) first.

### 3. Configure

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

- [More Options](https://github.com/serverless-components/tencent-egg/blob/master/docs/configure.md)

### 4. Deploy

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

  23s › MyEgg › done
```

> Notice: `sls` is short for `serverless` command.

&nbsp;

### 5. Remove

```bash
$ sls remove --debug

  DEBUG ─ Flushing template state and removing all components.
  DEBUG ─ Removed function egg-function successful
  DEBUG ─ Removing any previously deployed API. api-et0yjwci
  DEBUG ─ Removing any previously deployed service. service-jkcevoqw

  10s › MyEgg › done
```

### Notice!!!

After egg project initialed, it will create `app/public` directory automatically. But when deploying, because it is empty, so this directory will not be uploaded. So when egg application start up, it will try to create `app/public` directory, but it can not write to it. So please create empty file `.gitkeep` in `app/public` directory.

### More Components

Checkout the [Serverless Components](https://github.com/serverless/components) repo for more information.
