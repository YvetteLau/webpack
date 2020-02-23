const {smart} = require('webpack-merge');
const base = require('./webpack.config.base');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
module.exports = smart(base, {
    mode: 'production',
    plugins: [
        new CleanWebpackPlugin({
            // cleanOnceBeforeBuildPatterns: ['**/*', '!dll', '!dll/**']
        }),
    ]
});