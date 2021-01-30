module.exports = {
  css: {
    loaderOptions: {
      less: {

        modifyVars: {
          // 直接覆盖变量
          blue: '#3296fa'
        }

      }
    }
  },
  configureWebpack: (config) => {
    if (process.env.NODE_ENV === 'production') {
      config.optimization.minimizer[0].options.terserOptions.compress.drop_console = true
    }
  },

  // 修改配置-将打包后index.html引入的文件改为./
  publicPath: './'
}
