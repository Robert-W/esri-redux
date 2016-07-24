process.env.NODE_ENV = 'development';

// const webpackDevMiddleware = require('webpack-dev-middleware');
// const webpackHotMiddleware = require('webpack-hot-middleware');
// const config = require('../config/webpack.dev');
// const browserSync = require('browser-sync');
// const webpack = require('webpack');
//
// const compiler = webpack(config);
//
// browserSync({
//   files: ['build/**/*.html', 'build/**/*.js', 'build/**/*.css'],
//   port: process.env.PORT || 3000,
//   reloadOnRestart: false,
//   logFileChanges: false,
//   ghostMode: false,
//   open: false,
//   ui: false,
//   server: {
//     baseDir: 'dist',
//     middleware: [
      // webpackDevMiddleware(compiler, {
      //   // publicPath: webpackConfig.output.publicPath,
      //   stats: { colors: true }
      // }),
      // webpackHotMiddleware(compiler)
//     ]
//   }
// });

const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const config = require('../config/webpack.dev');
const webpack = require('webpack');
const express = require('express');
const app = express();

const compiler = webpack(config);

app.use(webpackDevMiddleware(compiler, { stats: { colors: true } }));
app.use(webpackHotMiddleware(compiler));
app.use(express.static('dist'));
app.listen(3000);
