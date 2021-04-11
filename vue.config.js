/*
 * @Author: your name
 * @Date: 2021-02-06 11:31:07
 * @LastEditTime: 2021-04-11 11:36:11
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \vue-airline-01\vue.config.js
 */
module.exports = {
  devServer: {
    proxy: {
      '/api': {
        target: 'http://localhost:32001',
        changeOrigin: true,
        pathRewrite: {
          '/api': ''
        }
      },
      'websocket': {
        target: 'http://localhost:32002',
        changeOrigin: true,
        pathRewrite: {
          'api': ''
        }
      }
    }
  },
  configureWebpack: {
    devtool: 'source-map'
  },
  runtimeCompiler: true,
  transpileDependencies: [
    /\bvue-awesome\b/
  ]
}