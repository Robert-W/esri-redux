const HtmlWebpackPlugin = require('html-webpack-plugin');
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
* @summary Development environment configurations
*/
module.exports = {

  webpack: {
    devtool: 'source-map',
    cache: true,
    entry: [
      'webpack/hot/dev-server',
      'webpack-hot-middleware/client',
      path.join(root, 'app/js/main')
    ],
    output: {
      path: path.join(root, 'public'),
      filename: 'js/[name].[hash].js',
      libraryTarget: 'amd'
    },
    externals: [function (context, request, callback) {
      if (isResolvable(request)) {
        callback(null, 'amd ' + request);
      } else {
        callback();
      }
    }],
    resolve: {
      alias: {
        'js': path.join(root, 'app/js'),
        'css': path.join(root, 'app/css'),
        'images': path.join(root, 'app/images')
      }
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: 'app/index.html',
        filename: 'index.html',
        inject: false,
        text: text
      }),
      new webpack.HotModuleReplacementPlugin(),
      new webpack.NoEmitOnErrorsPlugin()
    ],
    module: {
      rules: [{
        test: /\.js?$/,
        loader: 'react-hot-loader',
        exclude: /(node_modules|build)/
      }, {
        test: /\.scss$/,
        loaders: ['style-loader', 'css-loader', 'sass-loader']
      }, {
        test: /\.js?$/,
        loader: 'babel-loader'
      }, {
        test: /\.(jpe?g|png|gif|svg)$/i,
        loaders: [
          'file-loader?hash=sha512&digest=hex&name=[hash].[ext]',
          'image-webpack-loader?bypassOnDebug&optimizationLevel=7&interlaced=false'
        ]
      }]
    }
  }

};
