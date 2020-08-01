[![Serverless Egg Tencent Cloud](https://img.serverlesscloud.cn/20191226/1577361751088-egg_width.png)](http://serverless.com)

# 腾讯云 Egg.js Serverless Component

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
$ npm init egg serverless-egg --type=simple
$ cd serverless-egg && npm install
```

#### 修改 Egg 配置

由于云函数在执行时，只有 `/tmp` 可读写的，所以我们需要将 `egg.js` 框架运行尝试的日志写到该目录下，为此需要修改 `config/config.default.js` 中的配置如下：

```js
const config = (exports = {
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

在项目根目录 `serverless-egg`，创建 `serverless.yml` 文件，在其中进行如下配置

```bash
$ touch serverless.yml
```

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

- [更多配置](https://github.com/serverless-components/tencent-egg/tree/v2/docs/configure.md)

### 3. 部署

如您的账号未 [登陆](https://cloud.tencent.com/login) 或 [注册](https://cloud.tencent.com/register) 腾讯云，您可以直接通过 `微信` 扫描命令行中的二维码进行授权登陆和注册。

通过 `sls` 命令进行部署，并可以添加 `--debug` 参数查看部署过程中的信息

```bash
$ sls deploy
```

> 注意: `sls` 是 `serverless` 命令的简写。

### 4. 移除

通过以下命令移除部署的 Egg 服务资源，包括云函数和 API 网关。

```bash
$ sls remove
```

### 账号配置（可选）

当前默认支持 CLI 扫描二维码登录，如您希望配置持久的环境变量/秘钥信息，也可以在项目根目录 `serverless-egg` 中创建 `.env` 文件：

```dotenv
# .env
TENCENT_SECRET_ID=XXX
TENCENT_SECRET_KEY=XXX
```

如果没有腾讯云账号，可以在此 [注册新账号](https://cloud.tencent.com/register)。

如果已有腾讯云账号，可以在 [API 密钥管理](https://console.cloud.tencent.com/cam/capi) 中获取 `SecretId` 和`SecretKey`.

### 注意！！！

通常初始化的 egg 项目，会自动创建 `app/public` 目录。但是在打包压缩时，如果该目录为空，则部署后，该目录不会存在。所以 egg 项目启动时会自动创建，但是云函数是没有操作权限的，建议可以在 `app/public` 目录下创建一个空文件 `.gitkeep`，来解决此问题。

### 更多组件

可以在 [Serverless Components](https://github.com/serverless/components) repo 中查询更多组件的信息。
