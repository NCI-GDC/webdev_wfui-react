var Promise = require('es6-promise').Promise; //To polyfill css-loader promise
var ExtractTextPlugin = require("extract-text-webpack-plugin"); //To 

module.exports = {
  entry: ['./wfui-base.entry.js','./wfui-react.entry.js', './wfui-react-css.entry.js'],
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
      },
      { test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: "url-loader?limit=10000&minetype=application/font-woff" },
      { test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: "file-loader" }
    ]
  },
  plugins: [
    new ExtractTextPlugin("wfui_bundle.css"),
  ]
}