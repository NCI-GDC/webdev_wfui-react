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
            {
                test: /\.json$/,
                loader: 'json-loader',
            },
        ],
    },
    resolve: {
        alias: {
            masonry: 'masonry-layout',
        },
    },
    output: {
        path: './dist',
        filename: 'bundle.log',
    },
    plugins: [
        new ExtractTextPlugin('_wfui-react.scss'),
    ],
};
