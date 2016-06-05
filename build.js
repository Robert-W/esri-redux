'uae strict';
// Compile JS & Prerender comopnents
const pluginBabel = require('rollup-plugin-babel');
const prerender = require('react-prerender');
const requirejs = require('requirejs');
const rollup = require('rollup');
var path = require('path');

const packages = {
  'dojo': 'empty:',
  'esri': 'empty:',
  'dijit': 'empty:',
  'dojox': 'empty:',
  'js': 'js',
  'libs': 'libs',
  'redux': 'libs/redux/index',
  'react': 'libs/react/react.min',
  'react-dom': 'libs/react/react-dom.min'
};

const config = {
  rollup: {
    entry: 'src/js/main.js',
    bundle: {
      dest: 'build/js/main.js',
      format: 'amd'
    }
  },
  requirejs: {
    name: 'js/main',
    paths: packages,
    baseUrl: 'build',
    out: 'dist/js/main.js'
  },
  prerender: {
    target: path.join(__dirname, 'dist/index.html'),
    component: 'js/components/App',
    mount: '#react-mount',
    requirejs: {
      baseUrl: path.join(__dirname, 'build'),
      paths: packages,
      map: {
        moduleRoot: path.join(__dirname, 'build/js'),
        remapModule: 'js/config',
        ignorePatterns: [/esri\//, /dojo\//, /dijit\//]
      }
    }
  }
};

/* eslint-disable no-console, consistent-return */

const optimize = function optimize () {
  // prerender
  prerender(config.prerender);
  // rjs optimizer
  requirejs.optimize(config.requirejs, console.log, console.error);
};

const remap = function remap () {
  return {
    resolveId: function (code, id) {
      if (id && code.search(/js\//) > -1) {
        return path.join(__dirname, 'src', code + '.js');
      }
    }
  };
};

rollup.rollup({
  entry: config.rollup.entry,
  plugins: [pluginBabel(), remap()]
}).then(function (bundle) {
  bundle.write(config.rollup.bundle).then(optimize);
}, console.error);

/* eslint-enable no-console, consistent-return */
