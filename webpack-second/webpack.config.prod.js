const {smart} = require('webpack-merge');
const base = require('./webpack.config.base');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const OptimizeCssPlugin = require('optimize-css-assets-webpack-plugin');
const TerserWebpackPlugin = require('terser-webpack-plugin');
module.exports = smart(base, {
    mode: 'production',
    devtool: 'source-map',
    // optimization: {
    //     //优化项
    //     minimizer: [
    //         new TerserWebpackPlugin({
    //             test: /\.js(\?.*)?$/i,
    //             cache: true, //指定cache第一次构建时会略慢
    //             parallel: 3,
    //             sourceMap: true
    //         }),
    //         new OptimizeCssPlugin()
    //     ]
    // },
    plugins: [
        new CleanWebpackPlugin({
            // cleanOnceBeforeBuildPatterns: ['**/*', '!dll', '!dll/**']
        }),
        new OptimizeCssPlugin()
    ]
    
});