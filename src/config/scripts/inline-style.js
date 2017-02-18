/**
* Custom Plugin to inline css into html file via HtmlWebpackPlugin, the way that you can use
* this is to add <style><%= htmlWebpackPlugin.options.inlineStyles %></style> to your html
* @param {string} filepath - path to critical css file that is extracted via ExtractTextPlugin
*/
function InlineStyle (filepath) {
  this.filepath = filepath || 'css/critical.css';
}

InlineStyle.prototype.apply = function (compiler) {
  var self = this;
  compiler.plugin('compilation', function (compilation) {
    //- Code is Compiling
    compilation.plugin('html-webpack-plugin-before-html-generation', function (htmlPluginData, callback) {
      var asset = compilation.assets[self.filepath];
      if (asset) {
        htmlPluginData.plugin.options.inlineStyles = asset.source();
      }
      callback(null, htmlPluginData);
    });
  });
};

module.exports = InlineStyle;
