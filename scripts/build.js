// Ensure NODE_ENV is set before we require webpack.dev
process.env.NODE_ENV = process.env.NODE_ENV || 'production';

const config = require('../config/webpack.prod');
const webpack = require('webpack');

let compiler;

try {
  compiler = webpack(config);
} catch (err) {
  console.log(err);
  throw err;
}

//- Output progress
compiler.apply(new webpack.ProgressPlugin(function (percentage, msg) {
  process.stdout.clearLine();
  process.stdout.cursorTo(0);
  process.stdout.write(Math.floor(percentage * 100) + '% ' + msg.toString());
}));

console.log('\x1B[1mStarting build script\x1B[22m');
console.log('---------------------');

//- Trace any deprecation output to help debug deprecation issues
process.traceDeprecation = true;

//- Generate build and output stats
compiler.run(function (err, stats) {
  if (err) {
    throw err;
  }

  // Clear process.stdout
  process.stdout.clearLine();
  process.stdout.cursorTo(0);

  // Output some stats
  console.log(stats.toString({
    errorDetails: true,
    warnings: true,
    chunks: false,
    colors: true
  }));

  console.log('\x1B[1mWebpack bundling has completed\x1B[22m');
  console.log('------------------------------');

});
