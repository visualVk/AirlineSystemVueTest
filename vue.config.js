/*
 * @Author: your name
 * @Date: 2021-02-06 11:31:07
 * @LastEditTime: 2021-02-13 11:39:57
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \vue-airline-01\vue.config.js
 */
module.exports = {
  devServer: {
    proxy: {
      '/api': {
        target: 'http://localhost:32003',
        changeOrigin: true,
        pathRewrite: {
          '/api': ''
        }
      }
    }
  },
  runtimeCompiler: true,
  transpileDependencies: [
    /\bvue-awesome\b/
  ]
}