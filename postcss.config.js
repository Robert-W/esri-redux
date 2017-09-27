/**
* Postcss-loader configurations
* This must either be in the root repo or in the repo of the scss files being loaded
*/
const autoprefixer = require('autoprefixer');

module.exports = {
  plugins: [ autoprefixer ]
};
