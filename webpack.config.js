/* eslint-disable */
var production = process.env.NODE_ENV === 'production';
var HtmlWebpackPlugin = require('html-webpack-plugin');
var webpack = require('webpack');
var path = require('path');

//- Helper functions
var isEsriPackage = function isEsriPackage (module) {
  return /^dojo/.test(module) || /^dojox/.test(module) || /^dijit/.test(module) || /^esri/.test(module);
};

//- Base Webpack Config
var webpackconfig = {
  entry: [
    'webpack/hot/dev-server',
    'webpack-hot-middleware/client',
    path.join(__dirname, 'src/js/main')
  ],
  output: {
    path: path.resolve('build'),
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
      'js': path.join(__dirname, 'src/js')
    }
  }
};



if (production) {
  webpackconfig.entry = path.join(__dirname, 'src/js/main');
  webpackconfig.output = {
    path: path.resolve('dist'),
    filename: 'js/[name].[hash].js',
    libraryTarget: 'amd'
  };
  // Add Environment variables for production so webpack can optimize more
  webpackconfig.plugins = [
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
} else {
  webpackconfig.debug = webpackconfig.cache = true;
  webpackconfig.devtool = 'source-map';

  // Add the hot loader as the first loader
  webpackconfig.module.loaders.unshift({
    test: /\.js?$/,
    loader: 'react-hot',
    exclude: /(node_modules|build)/
  });

}

module.exports = webpackconfig;
