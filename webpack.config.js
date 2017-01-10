const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
    entry: './src/styles.js',
    module: {
        loaders: [
            {
                test: /\.js$/,
                loader: 'babel',
            },
            {
                test: /\.scss$|\.css$/,
                loader: ExtractTextPlugin.extract('css-loader!sass-loader'),
            },
        ],
    },
    output: {
        path: './dist',
        filename: 'bundle.log',
    },
    plugins: [
        new ExtractTextPlugin('wfui-react.css'),
    ],
};
