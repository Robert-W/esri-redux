const ExtractTextPlugin = require('extract-text-webpack-plugin');
const InlineStylePlugin = require('../scripts/inline-style');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const autoprefixer = require('autoprefixer');
const defaultConfig = require('./default');
const webpack = require('webpack');
const path = require('path');

const root = process.cwd();

function isResolvable (request) {
  return /^dojo/.test(request) || /^dojox/.test(request) || /^dijit/.test(request) || /^esri/.test(request);
}

/**
* Text for html webpack plugin
*/
const text = Object.assign({
  arcgisVersion: process.env.ARCGIS_API_VERSION || 4.2
}, defaultConfig.app);

/**
* @name exports
* @static
* @summary Production environment configurations
*/
module.exports = {

  webpack: {
    profile: true,
    entry: path.join(root, 'app/js/main'),
    output: {
      path: path.join(root, 'dist'),
      filename: 'js/[name].[hash].js',
      libraryTarget: 'amd'
    },
    resolve: {
      alias: {
        'js': path.join(root, 'app/js'),
        'css': path.join(root, 'app/css'),
        'images': path.join(root, 'app/images')
      }
    },
    externals: [function (context, request, callback) {
      if (isResolvable(request)) {
        callback(null, 'amd ' + request);
      } else {
        callback();
      }
    }],
    module: {
      rules: [{
        test: /\.js?$/,
        loader: 'babel-loader',
        exclude: /(node_modules|build)/,
        query: {
          presets: ['es2015', 'react', 'stage-0'],
          plugins: ['transform-runtime']
        }
      }, {
        test: /critical\.scss$/,
        use: ExtractTextPlugin.extract(['css-loader', 'postcss-loader', 'sass-loader'])
      }, {
        test: /app\.scss$/,
        loaders: ['style-loader', 'css-loader', 'postcss-loader', 'sass-loader']
      }, {
        test: /\.(jpg|png|svg)$/,
        loader: 'url-loader?limit=25000',
        include: path.images
      }]
    },
    plugins: [
      new webpack.DefinePlugin({ 'process.env': {'NODE_ENV': '"production"'}}),
      new webpack.LoaderOptionsPlugin({ options: { postcss: [autoprefixer] }}),
      new webpack.optimize.OccurrenceOrderPlugin(),
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
        template: 'app/index.html',
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
        },
        text: text
      })
    ]
  }

};
