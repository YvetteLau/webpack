const merge = require('webpack-merge');
const baseWebpackConfig = require('./webpack.config.base');
const SpeedMeasurePlugin = require("speed-measure-webpack-plugin");
const smp = new SpeedMeasurePlugin();
const webpack = require('webpack');

const config = merge(baseWebpackConfig, {
    mode: 'development',
    devtool: 'cheap-module-eval-source-map',
    //...其它的一些配置
});
module.exports = smp.wrap(config);
// module.exports = config;