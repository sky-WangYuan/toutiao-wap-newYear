module.exports = {
  plugins: {
    autoprefixer: {}, // 自动加前缀
    'postcss-pxtorem': {
      rootValue: 37.5,
      propList: ['*']
    }
  }
}
