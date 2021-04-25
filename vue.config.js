module.exports = {
  configureWebpack: {
    resolve: {
      alias: {
        'assets': '@/assets',//@默认对应了./src
        'common': '@/common',
        'components': '@/components',
        'network': '@/network',
        'views': '@/views',
        'router': '@/router',
        'store': '@/store',
      }
    }
  }
};
