const path = require('path');

// module.exports = {
//   module: {
//     loaders: [
//       {
//         test: /.scss$/,
//         loaders: ["style", "css", "sass"],
//         include: path.resolve(__dirname, '../')
//       },
//       {
//         test: /.src$/,
//         loaders: ["raw"],
//         include: path.resolve(__dirname, '../')
//       },
//     ]
//   }
// }

// load the default config generator.
var genDefaultConfig = require('@kadira/storybook/dist/server/config/defaults/webpack.config.js');

module.exports = function(config, env) {
  var config = genDefaultConfig(config, env);
  
  config.module.loaders.push(
      {
        test: /\.src$/,
        include: [ '/web/wfui-react' ],
        loader: require.resolve('raw-loader')
      }
  )

  console.log(config.module.loaders);
  // Extend it as you need.

  return config;
};