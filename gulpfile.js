/* eslint-disable */
var webpackDevMiddleware = require('webpack-dev-middleware'),
    webpackHotMiddleware = require('webpack-hot-middleware'),
    webpackConfig = require('./webpack.config.js'),
    browserSync = require('browser-sync'),
    webpack = require('webpack'),
    gulp = require('gulp'),
    // path = require('path'),
    fs = require('fs');

var serverconfig = {
  files: ['build/**/*.html', 'build/**/*.js', 'build/**/*.css'],
  port: process.env.PORT || 3000,
  baseDir: 'dist'
};

var compiler = webpack(webpackConfig);

// Dont really need this, need to test setting up my own server via Caddy or Express
gulp.task('serve', function () {
  var useHttps = process.env.SERVER === 'https';

  browserSync({
    files: serverconfig.files,
    port: serverconfig.port,
    reloadOnRestart: false,
    logFileChanges: false,
    ghostMode: false,
    https: useHttps,
    open: false,
    ui: false,
    server: {
      baseDir: serverconfig.baseDir,
      middleware: [
        webpackDevMiddleware(compiler, {
          // publicPath: webpackConfig.output.publicPath,
          stats: { colors: true }
        }),
        webpackHotMiddleware(compiler)
      ]
    }
  });
});
