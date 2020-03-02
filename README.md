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

#### 注意!!!

由于 `egg` 的 `egg-static` 静态资源插件是默认开启的，所以在启动应用时，会尝试创建 `app/public` 目录，但是云函数执行环境只有 `/tmp` 可读写，所以需要本地创建，并添加 `.gitkeep` 文件（为空就好）。

但是如果你并不想使用静态资源，可以修改 `config/plugin.js` 来禁用它：

```js
module.exports = {
  static: {
    enable: false
  }
}
```

如果需要开启静态资源功能，并且 public 已经存在，且里面包含静态资源。
此时需要配置 `binaryTypes`，修改 `sls.js` 文件如下：

```js
const { Application } = require('egg')

const app = new Application({
  env: 'prod'
})

// 这里可以根据实际情况来配置
// 如果你的站点开启gzip，那么所有返回类型都应该是二进制类型，所以应该是 `app.binaryTypes = ['*/*']`
app.binaryTypes = ['image/*']

module.exports = app
```

参考：[example](https://github.com/serverless-components/tencent-egg/blob/master/example/sls.js)

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
```

> 注意: `sls` 是 `serverless` 命令的简写。

### 4. 移除

通过以下命令移除部署的 API 网关

```bash
$ sls remove --debug
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
