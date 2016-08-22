var Promise = require('es6-promise').Promise; //To polyfill css-loader promise
var ExtractTextPlugin = require("extract-text-webpack-plugin"); //To 

module.exports = {
  entry: {
    'dist/wfui_base': ['./wfui-base.entry.js', './wfui-react-css.entry.js'],
    'lib/AddAnother': ['./src/AddAnother/add_another.js'],
    'lib/Description': ['./src/Description/description.js'],
    'lib/Grid': ['./src/Grid/grid.js'],
    'lib/Growl': ['./src/Growl/growl.react.js'],
    'lib/Icon': ['./src/Icon/icon.js'],
    'lib/InputField': ['./src/InputField/input_field.js'],
    'lib/InputTable': ['./src/InputTable/input_table.js'],
    'lib/Label': ['./src/Label/label.js'],
    'lib/Listbox': ['./src/Listbox/listbox.js'],
    'lib/Selection': ['./src/Selection/selection.js'],
    'lib/Tooltip': ['./src/Tooltip/tooltip.js'],
  },
  output: {
    path: './',
    filename: '[name].js'
  },
  module: {
    loaders: [
      {
        exclude: /(node_modules|bower_components)/,
        test: /\.js$/,
        exclode: /node_modules/,
        loader: 'babel',
        query: {
          plugins: ['transform-decorators-legacy' ],
          presets: ['react', 'es2015','stage-0']
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
    new ExtractTextPlugin("dist/wfui.bundle.css"),
  ]
}
