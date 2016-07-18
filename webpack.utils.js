/**
* Custom Plugin to inline css into html file via HtmlWebpackPlugin, the way that you can use
* this is to add <style><%= htmlWebpackPlugin.options.inlineStyles %></style> to your html
* @param {string} filepath - path to critical css file that is extracted via ExtractTextPlugin
*/
function InlineCriticalStyle (filepath) {
  this.filepath = filepath || 'css/critical.css';
}

InlineCriticalStyle.prototype.apply = function (compiler) {
  var self = this;
  compiler.plugin('compilation', function (compilation) {
    //- Code is Compiling
    compilation.plugin('html-webpack-plugin-before-html-generation', function (htmlPluginData, callback) {
      var asset = compilation.assets[self.filepath].source();
      htmlPluginData.plugin.options.inlineStyles = asset;
      callback(null, htmlPluginData);
    });
  });
};

/**
* Function passed in to Webpack Excludes, any modules that are going to be required at runtime
* and are not present at compilation time, should be matched by these regular expressions
* @param {string} request - module name being requested
*/
function shouldBeExcluded (request) {
  return /^dojo/.test(request) || /^dojox/.test(request) || /^dijit/.test(request) || /^esri/.test(request);
}

module.exports = {
  InlineCriticalStyle: InlineCriticalStyle,
  shouldBeExcluded: shouldBeExcluded
};
