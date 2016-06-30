// TODO: If this is the code I choose, add requirejs and cheerio to package.json as devDependencies
var reactDomServer = require('react-dom/server');
var webpackconfig = require('./webpack.config');
var requirejs = require('requirejs');
var webpack = require('webpack');
var cheerio = require('cheerio');
var react = require('react');
var path = require('path');
var fs = require('fs');

var config = {
  tempPath: path.join(__dirname, './temp.js'),
  ignorePatterns: [/esri\//, /dojo\//, /dijit\//],
  webpack: {
    entry: path.join(__dirname, 'src/js/components/App'),
    outputPath: path.resolve('./'),
    outputFilename: 'temp.js'
  },
  rjs: {
    map: function (map) { return { '*': map }; },
    remap: 'temp' // Same as outputFilename minus extension
  },
  react: {
    mount: '#react-mount',
    target: path.join(__dirname, 'dist/index.html')
  }
};

//- Update the entry and output path to create a component file
webpackconfig.entry = config.webpack.entry;
webpackconfig.output.path = config.webpack.outputPath;
webpackconfig.output.filename = config.webpack.outputFilename;
//- Create a compiler, and run it with the production config + above
var compiler = webpack(webpackconfig);
compiler.run(function (err, stats) {
  if (err) { throw err; }
  var modules, ignores = [];
  // Try to get a list of the modules excluded from the bundle, I need to remap these so require does not throw ENOENT
  modules = stats.compilation.namedChunks.main.modules;
  ignores = modules.map(function (module) { return module.request; }).filter(function (module) {
    return config.ignorePatterns.some(function (pattern) { return pattern.test(module); });
  });
  // Create a map object and remap excluded modules
  var map = {};
  ignores.forEach(function (ignore) { map[ignore] = config.rjs.remap; });
  // Configure requirejs
  var requireconfig = {};
  requireconfig.nodeRequire = require;
  requireconfig.map = config.rjs.map(map);
  // Setup and require App Component
  requirejs(requireconfig);
  var Component = requirejs(config.webpack.outputFilename);
  var markup = reactDomServer.renderToString(react.createElement(Component.default));
  // Load html file
  var file = fs.readFileSync(config.react.target, 'utf-8');
  var $ = cheerio.load(file);
  //- write to html and write back out
  $(config.react.mount).replaceWith(markup);
  fs.writeFileSync(config.react.target, $.html());
  // Delete Temp file
  fs.unlinkSync(config.tempPath);
});
