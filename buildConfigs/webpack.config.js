const path = require('path');

const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CleanUpStatsPlugin = require('./CleanUpStatsPlugin');

module.exports = {
    entry: './src/components/styles.js',
    plugins: [
        new MiniCssExtractPlugin({
            filename: '_wfui-react.scss',
        }),
        new CleanUpStatsPlugin(),
    ],
    module: {
        rules: [
            {
                test: /\.(sa|sc|c)ss$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                    },
                    {
                        loader: 'css-loader',
                    },
                    {
                        loader: 'sass-loader',
                    },
                ],
            },
        ],
    },
    output: {
        path: path.resolve(__dirname, '../dist'),
        filename: 'bundle.log',
    },
};
