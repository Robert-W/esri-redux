/* eslint-disable */
var helpers = require('./webpack.helpers');
var webpack = require('webpack');
var path = require('path');

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
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': '"production"'
      }
    })
  ]
};
