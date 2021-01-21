[![Serverless Egg Tencent Cloud](https://img.serverlesscloud.cn/20191226/1577361751088-egg_width.png)](http://serverless.com)

# 腾讯云 Egg.js Serverless Component

简体中文 | [English](https://github.com/serverless-components/tencent-egg/tree/master/README.en.md)

## 简介

腾讯云 [Egg.js](https://github.com/eggjs/egg) Serverless Component。

## 目录

0. [准备](#0-准备)
1. [安装](#1-安装)
1. [配置](#2-配置)
1. [部署](#3-部署)
1. [移除](#4-移除)

### 1. 安装

通过 npm 全局安装 [serverless cli](https://github.com/serverless/serverless)

```bash
$ npm install -g serverless
```

### 2. 创建

通过如下命令，快速创建一个 eggjs 应用

```bash
$ serverless init eggjs-starter --name example
$ cd example
```

### 3. 部署

在 `serverless.yml` 文件所在的项目根目录，运行以下指令，将会弹出二维码，直接扫码授权进行部署：

```
serverless deploy
```

> **说明**：如果鉴权失败，请参考 [权限配置](https://cloud.tencent.com/document/product/1154/43006) 进行授权。


部署完成后，控制台会打印相关的输出信息，您可以通过 `${output:${stage}:${app}:apigw.url}` 的形式在其他 `serverless` 组件中引用该组件的 API 网关访问链接（或通过类似的形式引用该组建其他输出结果），具体的，可以查看完成的输出文档：

- [点击此处查看输出文档](https://github.com/serverless-components/tencent-egg/tree/master/docs/output.md)

### 4. 配置

Egg 组件支持 0 配置部署，也就是可以直接通过配置文件中的默认值进行部署。但你依然可以修改更多可选配置来进一步开发该 Egg 项目。

以下是 Egg 组件的 `serverless.yml`配置示例：

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

- [更多配置](https://github.com/serverless-components/tencent-egg/tree/master/docs/configure.md)

### 5. 移除

通过以下命令移除部署的 Egg 服务资源，包括云函数和 API 网关。

```bash
$ serverless remove
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

### 更多组件

可以在 [Serverless Components](https://github.com/serverless/components) repo 中查询更多组件的信息。

## License

MIT License

Copyright (c) 2020 Tencent Cloud, Inc.
