/* eslint-disable */
var modules = require('./webpack.resolve');
var webpack = require('webpack');
var path = require('path');

/**
* Resolver for Esri Modules, tells Webpack to ignore them
*/
var esriModules = function esriModules (context, request, callback) {
  if (
    /^dojo/.test(request) ||
    /^dojox/.test(request) ||
    /^dijit/.test(request) ||
    /^esri/.test(request)
  ) {
    return callback(null, 'amd ' + request);
  }
  callback();
};

module.exports = {
  debug: true,
  cache: true,
  // devtool: 'source-map',
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
      exclude: /(node_modules|vendor|public)/
    }, {
      test: /\.js?$/,
      loader: 'babel',
      exclude: /(node_modules|vendor|public)/,
      query: {
        presets: ['es2015', 'react', 'stage-0']
      }
    }]
  },
  externals: [esriModules],
  resolve: { alias: modules },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': '"production"'
      }
    })
  ]
};
