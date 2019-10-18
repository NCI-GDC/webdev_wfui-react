const path = require('path');

// Export a function. Accept the base config as the only param.
module.exports = async ({ config, mode }) => {
  // `mode` has a value of 'DEVELOPMENT' or 'PRODUCTION'
  // You can change the configuration based on that.
  // 'PRODUCTION' is used when building the static version of storybook.

  // Make whatever fine-grained changes you need
  config.module.rules.push({
    test: /\.scss$/,
    use: [{
      loader: "style-loader"
    },
    {
      loader: "css-loader"
    },
    {
      loader: "sass-loader",
      options: {
        javascriptEnabled: true
      }
    }],
    include: path.resolve(__dirname, '../'),
  });

  // config.module.rules.push({
  //   test: /\.js$/,
  //   exclude: /node_modules/,
  //   loader: 'eslint-loader',
  //   options: {
  //     quiet: true,
  //     failOnError: false,
  //     failOnWarning: false,
  //     emitWarning: false,
  //     emitError: false,
  //   },
  //   // include: path.resolve(__dirname, '../src')
  // })

  // Return the altered config
  return config;
};