const {smart} = require('webpack-merge');
const base = require('./webpack.config.base');

const webpack = require('webpack');

module.exports = smart(base, {
    mode: 'development',
    
    plugins: [
        new webpack.HotModuleReplacementPlugin()
    ]
});