const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

// load the default config generator.
var genDefaultConfig = require('@kadira/storybook/dist/server/config/defaults/webpack.config.js');

module.exports = function(config, env) {
  var config = genDefaultConfig(config, env);
  
  config.module.loaders.push(
      {
        test: /\.scss$/,
        include: path.resolve(__dirname, '../'),
        loader: 'style-loader!css-loader!sass-loader',
      }
  );

  return config;
};