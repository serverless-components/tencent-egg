[![Serverless Egg Tencent Cloud](https://img.serverlesscloud.cn/20191226/1577361751088-egg_width.png)](http://serverless.com)


# Tencent Egg.js Serverless Component

[简体中文](https://github.com/serverless-components/tencent-egg/blob/master/README.md) | English

## Introduction

[Egg.js](https://github.com/eggjs/egg) Serverless Component for Tencent Cloud, support Restful API deploy.

## Content

1. [Prepare](#0-prepare)
1. [Install](#1-install)
2. [Create](#2-create)
3. [Configure](#3-configure)
4. [Deploy](#4-deploy)
5. [Remove](#5-Remove)

### 0. Prepare

#### Init Egg Project

```shell
$ mkdir egg-example && cd egg-example
$ npm init egg --type=simple
$ npm i
```

#### Change Egg Config

When cloud funtion executing, only `/tmp` folder is writable, so we need change the folder of logging for `egg.js`, then we change the configuration in `config/config.default.js` as below:

```js
const config = exports = {
  env: 'prod', // prod is recommended
  rundir: '/tmp',
  logger: {
    dir: '/tmp',
  },
};
```

### 1. Install

Install the Serverless Framework globally:

```shell
$ npm install -g serverless
```

### 2. Create

In project root, create the following simple boilerplate:

```shell
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
  component: "@serverless/tencent-egg"
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
      protocol: https
      environment: release
```

- [More Options](https://github.com/serverless-components/tencent-egg/blob/master/docs/configure.md)

### 4. Deploy

```shell
$ sls --debug
```

> Notice: `sls` is short for `serverless` command.

&nbsp;

### 5. Remove

```shell
$ sls remove --debug
```

### More Components

Checkout the [Serverless Components](https://github.com/serverless/components) repo for more information.
