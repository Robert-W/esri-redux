process.env.NODE_ENV = 'development';

const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const config = require('../config/webpack.dev');
const webpack = require('webpack');
const express = require('express');
const app = express();

const port = process.env.PORT || 3000;
const compiler = webpack(config);
const path = 'public';

app.use(webpackDevMiddleware(compiler, { stats: { colors: true } }));
app.use(webpackHotMiddleware(compiler));
app.use(express.static('public'));
app.listen(port, function () {
  console.log('[\x1B[34mexpress\x1B[39m] \x1B[1mDev Server\x1B[1m');
  console.log('\x1B[37m------------------------------\x1B[39m');
  console.log('\x1B[1mAccess:\x1B[1m \x1B[35mhttp://localhost:' + port + '\x1B[39m');
  console.log('\x1B[37m------------------------------\x1B[39m');
  console.log('[\x1B[34mexpress\x1B[39m] Serving files from \x1B[35m' + path + '\x1B[39m');
  console.log('[\x1B[34mexpress\x1B[39m] \x1B[1mWebpack compiling...\x1B[1m');
  console.log('\x1B[37m------------------------------\x1B[39m');
  console.log();
});
