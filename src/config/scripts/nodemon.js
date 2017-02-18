const nodemon = require('nodemon');

/**
* Configure nodemon
* Notice: nodemon is triggered from package.json
* all filepaths are relative to the src directory
*/
nodemon({
  ignore: ['node_modules'],
  script: 'config/scripts/dev-server.js',
  ext: 'js json',
  verbose: true,
  watch: ['config/env/*.js', 'config/scripts/*.js']
});

nodemon
.on('restart', files => {
  console.log(`Nodemon restarting because ${files.join(',')} changed.`);
})
.on('crash', () => {
  console.log('Nodemon has crashed. Waiting for changes to restart.');
});
