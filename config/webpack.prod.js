const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const InlineStylePlugin = require('./inline-style');
const autoprefixer = require('autoprefixer');
const webpack = require('webpack');
const path = require('path');

const root = process.cwd();

const weCantMake = function weCantMake (request) {
  return /^dojo/.test(request) || /^dojox/.test(request) || /^dijit/.test(request) || /^esri/.test(request);
};

module.exports = {
  progress: true,
  profile: true,
  entry: path.join(root, 'src/js/main'),
  output: {
    path: path.join(root, 'dist'),
    filename: 'js/[name].[hash].js',
    libraryTarget: 'amd'
  },
  resolve: {
    alias: {
      'js': path.join(root, 'src/js'),
      'css': path.join(root, 'src/css'),
      'images': path.join(root, 'src/images')
    }
  },
  externals: [function (context, request, callback) {
    if (weCantMake(request)) {
      callback(null, 'amd ' + request);
    } else {
      callback();
    }
  }],
  module: {
    loaders: [{
      test: /\.js?$/,
      loader: 'babel',
      exclude: /(node_modules|build)/,
      query: {
        presets: ['es2015', 'react', 'stage-0'],
        plugins: ['transform-runtime', 'babel-plugin-transform-flow-strip-types']
      }
    }, {
      test: /critical\.scss$/,
      loader: ExtractTextPlugin.extract(['css', 'postcss', 'sass'])
    }, {
      test: /app\.scss$/,
      loaders: ['style', 'css', 'postcss', 'sass']
    }, {
      test: /\.(jpg|png|svg)$/,
      loader: 'url?limit=25000',
      include: path.images
    }]
  },
  postcss: function () {
    return [autoprefixer];
  },
  plugins: [
    new webpack.DefinePlugin({ 'process.env': {'NODE_ENV': '"production"'}}),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.UglifyJsPlugin({
      compressor: {
        screw_ie8: true,
        warnings: false
      },
      mangle: {
        screw_ie8: true
      },
      output: {
        comments: false,
        screw_ie8: true
      }
    }),
    new ExtractTextPlugin('css/critical.css'),
    new InlineStylePlugin('css/critical.css'),
    new HtmlWebpackPlugin({
      template: 'src/index.html',
      inject: false,
      minify: {
        removeStyleLinkTypeAttributes: true,
        removeRedundantAttributes: true,
        removeEmptyAttributes: true,
        collapseWhitespace: true,
        removeComments: true,
        minifyURLs: true,
        minifyCSS: true,
        minifyJS: true
      }
    })
  ]
};
