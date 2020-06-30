module.exports = {
    presets: [
        [
            '@babel/env',
            {
                targets: {
                    browsers: ['>0.25%, not dead'],
                },
                modules: false,
            },
        ],
    ],
    plugins: [
        ['@babel/proposal-object-rest-spread', { loose: true }],
        ['@babel/plugin-proposal-decorators', { legacy: true }],
        '@babel/plugin-transform-react-jsx',
        "@babel/plugin-proposal-class-properties"
    ],
};
