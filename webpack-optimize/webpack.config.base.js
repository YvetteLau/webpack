const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const webpack = require('webpack');
// const CopyWebpackPlugin = require('copy-webpack-plugin');
const Happypack = require('happypack');
// const TerserPlugin = require('terser-webpack-plugin');
// const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const HardSourceWebpackPlugin = require('hard-source-webpack-plugin');
const config = {
    entry: "./src/index.js",
    output: {
        filename: '[name].[hash:4].js',
        path: path.resolve(__dirname, 'dist'),
        publicPath: '/'
    },
    devServer: {
        hot: true,
        inline: true,
        stats: "errors-only",
        contentBase: path.resolve(__dirname, 'dist')
    },
    optimization: {
        splitChunks: {//分割代码块
            cacheGroups: {
                vendor: {
                    //第三方依赖
                    priority: 1,
                    name: 'vendor',
                    test: /node_modules/,
                    chunks: 'initial',
                    minSize: 100,
                    minChunks: 1 //重复引入了几次
                }
            }
        },
        runtimeChunk: {
            name: 'mainifest'
        },
        // minimize: true,
        // minimizer: [
        //     new TerserPlugin({
        //         test: /\.js(\?.*)?$/i,
        //     }),
        // ],
    },
    externals: {
        'jquery': 'jQuery'
    },
    module: {
        noParse: /jquery|lodash/,
        rules: [
            {
                test: /\.js[x]?$/,
                use: 'Happypack/loader?id=js',
                include: [path.resolve(__dirname, 'src')]
            },
            {
                test: /\.css$/,
                use: 'Happypack/loader?id=css',
                include: [
                    path.resolve(__dirname, 'src'),
                    path.resolve(__dirname, 'node_modules', 'antd', 'dist'),
                    path.resolve(__dirname, 'node_modules', 'bootstrap', 'dist')
                ]
            },
            {
                test: /\.(png|jpg|gif|jpeg|webp|svg|eot|ttf|woff|woff2|.gexf)$/,
                use: 'Happypack/loader?id=file',
                include: [
                    path.resolve(__dirname, 'src'),
                    path.resolve(__dirname, 'public'),
                    path.resolve(__dirname, 'node_modules', 'bootstrap', 'dist')
                ]
            }
        ]
    },
    plugins: [
        new Happypack({
            id: 'js', //和rule中的id=js对应
            //将之前 rule 中的 loader 在此配置
            use: ['babel-loader'] //必须是数组
        }),
        new Happypack({
            id: 'css',//和rule中的id=css对应
            use: ['style-loader', 'css-loader', 'postcss-loader'],
        }),
        new Happypack({
            id: 'file', //和rule中的id=file对应
            use: [{
                loader: 'url-loader',
                options: {
                    limit: 10240, //10K
                    esModule: false
                }
            }],
        }),
        new HtmlWebpackPlugin({
            template: './public/index.html'
        }),
        new CleanWebpackPlugin({
            cleanOnceBeforeBuildPatterns: ['**/*', '!dll', '!dll/**']
        }),
        // new webpack.HotModuleReplacementPlugin(),
        new webpack.DllReferencePlugin({
            manifest: require(path.resolve(__dirname, 'dist', 'dll', 'manifest.json'))
        }),

        new webpack.IgnorePlugin(/\.\/locale/, /moment/),
        new HardSourceWebpackPlugin()
    ]
}

module.exports = config;