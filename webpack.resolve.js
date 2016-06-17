/**
* These are packages and aliases I want webpack to be able to resolve
* Configure these here and use them in webpack.config and webpack.production
*/
var path = require('path');

module.exports = {
  'js': path.join(__dirname, 'src/js')
};
