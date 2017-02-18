const path = require('path');

const makeConfig = () => {
  // Validate NODE_ENV is set or set to default
  if (!process.env.NODE_ENV) {
    console.log('NODE_ENV is not set, setting to "development"');
    process.env.NODE_ENV = 'development';
  }

  const defaultConfig = require(path.resolve('./config/env/default'));

  // Get environment config
  let environmentConfig;
  try {
    environmentConfig = require(path.resolve(`./config/env/${process.env.NODE_ENV}`));
  } catch (err) {
    console.log(`No configuration files found matching ${process.env.NODE_ENV} environment`);
    environmentConfig = {};
  }

  return Object.assign({}, defaultConfig, environmentConfig);
};

module.exports = makeConfig();
