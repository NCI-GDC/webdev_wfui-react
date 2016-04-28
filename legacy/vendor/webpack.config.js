module.exports = {
  entry: './react_bundle_exec.js',
  output: {
    path: './',
    filename: 'react_bundle.js'
  },
  devServer: {
    inline: true,
    port: 3333
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
      }
    ]
  }
}
