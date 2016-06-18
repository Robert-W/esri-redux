/* eslint-disable */
var path = require('path');

module.exports = {

  /**
  * These are packages and aliases I want webpack to be able to resolve
  * Configure these here and use them in webpack.config and webpack.production
  */
  modules: {
    'js': path.join(__dirname, 'src/js')
  },

  /**
  * Utility to tell webpack to ignore esri modules and treat them as external
  */
  esriPackages: function esriPackages (context, request, callback) {
    if (
      /^dojo/.test(request) ||
      /^dojox/.test(request) ||
      /^dijit/.test(request) ||
      /^esri/.test(request)
    ) {
      return callback(null, 'amd ' + request);
    }
    callback();
  }
};
