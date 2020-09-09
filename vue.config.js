module.exports = {
  publicPath: './',
  css: {
    extract: false
  },
  chainWebpack: config => {
    config.module
      .rule('images')
      .use('url-loader')
      .loader('url-loader')
      .tap(options => Object.assign(options, { limit: 99999 }))
    
    config.module
      .rule('fonts')
      .use('url-loader')
      .loader('url-loader')
      .tap(options => Object.assign(options, { limit: 99999 }))
  }
}