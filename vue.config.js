/*
 * @Author: your name
 * @Date: 2021-02-06 11:31:07
 * @LastEditTime: 2021-03-20 10:10:27
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