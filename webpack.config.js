/* eslint-disable */
var production = process.env.NODE_ENV === 'production';
var helpers = require('./webpack.helpers');
var webpack = require('webpack');
var path = require('path');

var config = {
  externals: [helpers.esriPackages],
  resolve: { alias: helpers.modules },
  module: {
    loaders: [{
      test: /\.js?$/,
      loader: 'babel',
      exclude: /(node_modules|build)/,
      query: {
        presets: ['es2015', 'react', 'stage-0'],
        plugins: ['transform-runtime', 'babel-plugin-transform-flow-strip-types']
      }
    }]
  }
};

if (production) {
  // Setup for production
  // Configure entry
  config.entry = path.join(__dirname, 'src/js/main');
  // Configure output and public path for hot module
  config.output = {
    path: path.resolve('dist/js'),
    filename: 'main.js',
    libraryTarget: 'amd'
  };
  // Add Environment variables via plugins
  config.plugins = [
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': '"production"'
      }
    })
  ];
} else {
  // Setup for development
  config.debug = true;
  config.cache = true;
  config.devtool = 'source-map';
  // Configure entry
  config.entry = [
    'webpack/hot/dev-server',
    'webpack-hot-middleware/client',
    path.join(__dirname, 'src/js/main')
  ];
  // Configure output and public path for hot module
  config.output = {
    path: path.resolve('build/js'),
    filename: 'main.js',
    publicPath: '/js/',
    libraryTarget: 'amd'
  };
  // Add the hot loader as the first loader
  config.module.loaders.unshift({
    test: /\.js?$/,
    loader: 'react-hot',
    exclude: /(node_modules|build)/
  });
  // Add some plugins
  config.plugins = [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin()
  ];
}

module.exports = config;
