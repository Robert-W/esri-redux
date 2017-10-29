module.exports = () => {
  return {
    'process.env': Object
      .keys(process.env)
      .filter(key => /^(?!npm_)/i.test(key))
      .reduce((env, key) => {
        env[key] = (typeof process.env[key] === 'boolean' || typeof process.env[key] === 'number')
          ? process.env[key]
          : JSON.stringify(process.env[key]);

        return env;
      }, {})
  };
};
