/* eslint-disable */
var helpers = require('./webpack.helpers');
var webpack = require('webpack');
var path = require('path');

module.exports = {
  debug: true,
  cache: true,
  devtool: 'source-map',
  entry: [
    'webpack/hot/dev-server',
    'webpack-hot-middleware/client',
    path.join(__dirname, 'src/js/main')
  ],
  output: {
    path: path.resolve('build/js'),
    filename: 'main.js',
    publicPath: '/js/',
    libraryTarget: 'amd'
  },
  module: {
    loaders: [{
      test: /\.js?$/,
      loader: 'react-hot',
      exclude: /(node_modules|build)/
    }, {
      test: /\.js?$/,
      loader: 'babel',
      exclude: /(node_modules|build)/,
      query: {
        presets: ['es2015', 'react', 'stage-0'],
        plugins: ['babel-plugin-transform-flow-strip-types']
      }
    }]
  },
  externals: [helpers.esriPackages],
  resolve: { alias: helpers.modules },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin()
  ]
};
