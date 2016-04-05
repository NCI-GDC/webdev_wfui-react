var Promise = require('es6-promise').Promise; //To polyfill css-loader promise
var ExtractTextPlugin = require("extract-text-webpack-plugin"); //To 

module.exports = {
  entry: './bundle.config.js',
  output: {
    path: './dist/',
    filename: 'wfui_bundle.js'
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclode: /node_modules/,
        loader: 'babel',
        query: {
          presets: ['es2015','react']
        }
      },
      {
        test: /\.scss$/,
        loader: ExtractTextPlugin.extract("css-loader!sass-loader")
      }
    ]
  },
  plugins: [
    new ExtractTextPlugin("wfui_bundle.css"),
  ]
}