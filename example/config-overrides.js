// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require('path');
const {
  override,
  fixBabelImports,
  addDecoratorsLegacy,
  addWebpackAlias,
  overrideDevServer
  // eslint-disable-next-line @typescript-eslint/no-var-requires
} = require('customize-cra');

// 跨域配置
// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
const devServerConfig = () => (config) => {
  return {
    ...config,
    // 服务开启gzip
    compress: true,
    proxy: {
      '/api': {
        target: 'xxx',
        changeOrigin: true,
        pathRewrite: {
          '^/api': '/api'
        }
      }
    }
  };
};

module.exports = {
  webpack: override(
    // 装饰器 @babel/plugin-proposal-decorators
    addDecoratorsLegacy(),
    addWebpackAlias({
      '@': path.resolve(__dirname, 'src')
    })
  ),
  devServer: overrideDevServer(devServerConfig()),
  jest: function (config) {
    // ...add your jest config customisation...
    return config;
  },
  // The paths config to use when compiling your react app for development or production.
  paths: function (paths, env) {
    // ...add your paths config
    return paths;
  }
};
