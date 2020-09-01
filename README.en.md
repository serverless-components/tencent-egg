[![Serverless Egg Tencent Cloud](https://img.serverlesscloud.cn/20191226/1577361751088-egg_width.png)](http://serverless.com)

# Tencent Egg.js Serverless Component

[简体中文](./README.md) | English

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
$ npm init egg serverless-egg --type=simple
$ cd serverless-egg && npm install
```

#### Change Egg Config

When cloud funtion executing, only `/tmp` folder is writable, so we need change the folder of logging for `egg.js`, then we change the configuration in `config/config.default.js` as below:

```js
const config = (exports = {
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

In project root `serverless-egg`, create the following simple boilerplate:

```bash
$ touch serverless.yml
$ touch .env           # your Tencent api keys
```

Add the access keys of a [Tencent CAM Role](https://console.cloud.tencent.com/cam/capi) with `AdministratorAccess` in the `.env` file, using this format:

```dotenv
# .env
TENCENT_SECRET_ID=XXX
TENCENT_SECRET_KEY=XXX
```

- If you don't have a Tencent Cloud account, you could [sign up](https://intl.cloud.tencent.com/register) first.

### 3. Configure

```yml
# serverless.yml
org: orgDemo
app: appDemo
stage: dev
component: egg
name: eggDemo

inputs:
  src:
    src: ./
    exclude:
      - .env
  region: ap-guangzhou
  functionName: eggDemo
  runtime: Nodejs10.15
  apigatewayConf:
    protocols:
      - http
      - https
    environment: release
```

- [More Options](/docs/configure.md)

> Notice: Now, `runtime` is default `Nodejs8.9`, for deployed project using `Nodejs8.9`, should set `runtime` to `Nodejs8.9` manually for updating.

### 4. Deploy

```bash
$ sls deploy
```

> Notice: `sls` is short for `serverless` command.

&nbsp;

### 5. Remove

```bash
$ sls remove
```

### Notice!!!

After egg project initialed, it will create `app/public` directory automatically. But when deploying, because it is empty, so this directory will not be uploaded. So when egg application start up, it will try to create `app/public` directory, but it can not write to it. So please create empty file `.gitkeep` in `app/public` directory.

### More Components

Checkout the [Serverless Components](https://github.com/serverless/components) repo for more information.
