var HtmlWebpackPlugin = require('html-webpack-plugin');
var webpack = require('webpack');
var path = require('path');

const root = process.cwd();

function isResolvable (request) {
  return /^dojo/.test(request) || /^dojox/.test(request) || /^dijit/.test(request) || /^esri/.test(request);
}

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
      path.join(root, 'src/js/main')
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
        'js': path.join(root, 'src/js'),
        'css': path.join(root, 'src/css'),
        'images': path.join(root, 'src/images')
      }
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: 'src/index.html',
        filename: 'index.html',
        inject: false
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
        loader: 'babel-loader',
        exclude: /(node_modules)/,
        query: {
          presets: ['es2015', 'react', 'stage-0'],
          plugins: ['transform-runtime']
        }
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
