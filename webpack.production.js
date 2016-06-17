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
  entry: path.join(__dirname, 'src/js/main'),
  output: {
    path: path.resolve('dist/js'),
    filename: 'main.js',
    libraryTarget: 'amd'
  },
  module: {
    loaders: [{
      test: /\.js?$/,
      loader: 'babel',
      exclude: /(node_modules|vendor|public)/,
      query: {
        presets: ['es2015', 'react', 'stage-0']
      }
    }]
  },
  resolve: { alias: modules },
  externals: [esriModules],
  plugins: [new webpack.DefinePlugin({
    'process.env': {
      'NODE_ENV': '"production"'
    }
  })]
};
