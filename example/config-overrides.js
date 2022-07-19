const path = require('path');
const { override, fixBabelImports, addBabelPreset, addDecoratorsLegacy, addWebpackAlias, overrideDevServer, setWebpackPublicPath } = require('customize-cra');

// 跨域配置
const devServerConfig = () => (config) => {
  return {
    ...config,
    // 服务开启gzip
    compress: true,
    proxy: {
      '/itaas': {
        target: 'http://192.168.137.1:8080',
        changeOrigin: true,
        pathRewrite: {
          '^/itaas': '/itaas'
        }
      }
    }
  };
};

module.exports = {
  webpack: override(
    // addBabelPreset('@emotion/babel-preset-css-prop'),
    // 装饰器 @babel/plugin-proposal-decorators
    addDecoratorsLegacy(),
    addWebpackAlias({
      '@': path.resolve(__dirname, 'src')
    }),
    setWebpackPublicPath(process.env.PUBLIC_URL)
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
