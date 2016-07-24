/* eslint-disable */
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var webpack = require('webpack');
var path = require('path');

const root = process.cwd();

const weCantMake = function weCantMake (request) {
  return /^dojo/.test(request) || /^dojox/.test(request) || /^dijit/.test(request) || /^esri/.test(request);
};

module.exports = {
  devtool: 'source-map',
  debug: true,
  cache: true,
  entry: [
    'webpack/hot/dev-server',
    'webpack-hot-middleware/client',
    path.join(root, 'src/js/main')
  ],
  output: {
    path: path.join(root, 'public'),
    filename: 'js/[name].[hash].js',
    libraryTarget: 'amd'
  },
  externals: [function (context, request, callback) {
    if (weCantMake(request)) {
      callback(null, 'amd ' + request);
    } else {
      callback();
    }
  }],
  resolve: {
    alias: {
      'js': path.join(root, 'src/js'),
      'css': path.join(root, 'src/css')
    }
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'src/index.html',
      filename: 'index.html',
      inject: false
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin()
  ],
  module: {
    loaders: [{
      test: /\.js?$/,
      loader: 'react-hot',
      exclude: /(node_modules|build)/
    }, {
      test: /\.scss$/,
      loaders: ['style', 'css', 'sass']
    }, {
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
