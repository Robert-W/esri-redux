/* eslint-disable */
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var webpack = require('webpack');
var path = require('path');

//- Helper functions
var isEsriPackage = function isEsriPackage (module) {
  return /^dojo/.test(module) || /^dojox/.test(module) || /^dijit/.test(module) || /^esri/.test(module);
};

//- Development Webpack Config
var webpackconfig = {
  entry: [
    'webpack/hot/dev-server',
    'webpack-hot-middleware/client',
    path.join(__dirname, 'src/js/main')
  ],
  output: {
    path: path.resolve('dist'),
    filename: 'js/[name].[hash].js',
    libraryTarget: 'amd'
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
      loader: 'babel',
      exclude: /(node_modules|build)/,
      query: {
        presets: ['es2015', 'react', 'stage-0'],
        plugins: ['transform-runtime', 'babel-plugin-transform-flow-strip-types']
      }
    }]
  },
  externals: [function (context, request, callback) {
    if (isEsriPackage(request)) { callback(null, 'amd ' + request); }
    else { callback(); }
  }],
  resolve: {
    alias: {
      'js': path.join(__dirname, 'src/js'),
      'css': path.join(__dirname, 'src/css')
    }
  }
};

if (process.env.NODE_ENV === 'production') {
  // Override entry and plugins for production
  webpackconfig.entry = path.join(__dirname, 'src/js/main');
  webpackconfig.plugins = [
    new ExtractTextPlugin('css/critical.css'),
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': '"production"'
      }
    }),
    new HtmlWebpackPlugin({
      template: 'src/index.html',
      inject: false,
      minify: {
        collapseWhitespace: true,
        removeComments: true,
        minifyCSS: true,
        minifyJS: true
      }
    })
  ];
  // Add Sass Loaders, Extract critical and let below the fold content get injected as style tags
  webpackconfig.module.loaders = [{
    test: /critical\.scss$/,
    loader: ExtractTextPlugin.extract(['css', 'sass'])
  }, {
    test: /app\.scss$/,
    loaders: ['style', 'css', 'sass']
  }].concat(webpackconfig.module.loaders);
} else {
  // Add the remaining development configurations
  webpackconfig.debug = webpackconfig.cache = true;
  webpackconfig.devtool = 'source-map';
  // Add the hot loader as the first loader
  webpackconfig.module.loaders = [{
    test: /\.js?$/,
    loader: 'react-hot',
    exclude: /(node_modules|build)/
  }, {
    test: /\.scss$/,
    loaders: ['style', 'css', 'sass']
  }].concat(webpackconfig.module.loaders);
}

module.exports = webpackconfig;
