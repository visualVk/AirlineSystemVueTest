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
  runtimeCompiler: true
}