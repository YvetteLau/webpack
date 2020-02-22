const merge = require('webpack-merge');
const baseWebpackConfig = require('./webpack.config.base');
const SpeedMeasurePlugin = require("speed-measure-webpack-plugin");
const smp = new SpeedMeasurePlugin();

const config = merge(baseWebpackConfig, {
    mode: 'production',
    // devtool: 'source-map',
    performance: {
        hints: "warning", // "error" 或者 false 都是有效值
        maxEntrypointSize: 5000000, // 以字节为单位, 默认为 250k
        maxAssetSize: 4500000, // 以字节单位
    },
    //...其它的一些配置
});

module.exports = smp.wrap(config);

// module.exports = config;