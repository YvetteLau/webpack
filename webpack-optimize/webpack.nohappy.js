const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const webpack = require('webpack');
const Happypack = require('happypack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
// const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
// const CopyWebpackPlugin = require('copy-webpack-plugin');
const config = {
    entry: "./src/index.js",
    output: {
        filename: '[name].[hash:4].js',
        path: path.resolve(__dirname, 'dist')
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
        }
    },
    module: {
        noParse: /jquery|lodash/,
        rules: [
            {
                test: /\.js[x]?$/,
                use: 'babel-loader',
                include: [path.resolve(__dirname, 'src')]
            },
            {
                test: /\.css$/,
                use: [MiniCssExtractPlugin.loader, 'css-loader',{
                    loader: 'postcss-loader',
                    options: {
                        plugins: function () {
                            return [
                                require('autoprefixer')()
                            ]
                        }
                    }
                }],
                include: [
                    path.resolve(__dirname, 'src'),
                    path.resolve(__dirname, 'node_modules', 'antd', 'dist'),
                    path.resolve(__dirname, 'node_modules', 'bootstrap', 'dist')
                ]
            },
            {
                test: /\.(png|jpg|gif|jpeg|webp|svg|eot|ttf|woff|woff2|.gexf)$/,
                use: [{
                    loader: 'url-loader',
                    options: {
                        limit: 10240 //10K
                    }
                }],
                include: [
                    path.resolve(__dirname, 'src'),
                    path.resolve(__dirname, 'public'),
                    path.resolve(__dirname, 'node_modules', 'bootstrap', 'dist')
                ]
            }
        ]
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: 'css/main.css' //个人习惯将css文件放在单独目录下
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

        new webpack.IgnorePlugin(/\.\/locale/, /moment/)
    ]
}

// module.exports = smp.wrap(config);
module.exports = config;