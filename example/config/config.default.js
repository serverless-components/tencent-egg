/* eslint valid-jsdoc: "off" */

'use strict'

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = (appInfo) => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = (exports = {})

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1576384476895_3620'

  // add your middleware config here
  config.middleware = []

  // add your user config here
  const userConfig = {
    view: {
      mapping: {
        '.html': 'nunjucks'
      }
    }
  }

  return {
    ...config,
    ...userConfig
  }
}
