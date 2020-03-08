const HtmlWebpackPlugin = require('html-webpack-plugin');
const isDev = process.env.NODE_ENV === 'development'
const path = require('path');
const apiMocker = require('mocker-api');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCssPlugin = require('optimize-css-assets-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const webpack = require('webpack');
const config = require('./public/config')[isDev ? 'dev' : 'build'];


module.exports = {
    entry: {
        index: './src/index.js',
        login: './src/login.js'
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].[hash:6].js',
        publicPath: '/'
    },
    mode: 'development',
    devtool: 'source-map',
    devServer: {
        port: '3000',
        hot: true,
        // stats: "errors-only",
        //有服务端，不使用代理来处理，在服务端中启用webpack，端口使用服务端端口
        //模拟数据
        // before(app){
        //     apiMocker(app, path.resolve('./mock/mocker.js'))
        //     // app.get('/user', (req, res) => {
        //     //     res.json({name: '刘小夕'});
        //     // })
        // }
        // proxy: {
        //     "/api": "http://localhost:4000"
        // }
        proxy: {
            '/api': {
                target: 'http://localhost:4000',
                pathRewrite: {
                    '/api': ''
                }
            }
        }
    },
    optimization: {
        //优化项
        minimizer: [
            new UglifyJsPlugin({
                cache: true,
                parallel: true,
                sourceMap: true
            }),
            new OptimizeCssPlugin()
        ]
    },
    resolve: {
        modules: ['./src', 'node_modules']
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                use: ['babel-loader'],
                exclude: /node_modules/
            },
            // {
            //     test: /\.html$/,
            //     use: 'html-withimg-loader'
            // },
            {
                test: /\.(c|le)ss$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader', {
                        loader: 'postcss-loader',
                        options: {
                            plugins: function () {
                                return [
                                    require('autoprefixer')()
                                ]
                            }
                        }
                    }, 'less-loader'],
                exclude: /node_modules/
            },
            {
                test: /\.(png|jpg|gif|jpeg|webp|eot|ttf|woff)$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 1024,
                            name: '[name]_[hash:6].[ext]',
                            outputPath: 'assets',
                            esModule: false,
                        }
                    }
                ],
                exclude: /node_modules/
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './public/index.html',
            filename: 'index.html', //打包后的文件名
            config: config.template,
            chunks: ['index']
        }),
        new HtmlWebpackPlugin({
            template: './public/login.html',
            filename: 'login.html', //打包后的文件名
            chunks: ['login']
        }),
        
        new MiniCssExtractPlugin({
            filename: 'css/main.css',
            // chunkFilename: '[id].css'
        }),
        new CopyWebpackPlugin([
            {
                from: 'public/js/*.js',
                to: path.resolve(__dirname, 'dist', 'js'),
                flatten: true,
            }
        ], {
            ignore: ['other.js']
        }),
        new webpack.ProvidePlugin({
            _map: ['lodash', 'map'],
            Vue: ['vue/dist/vue.esm.js', 'default'],
            $: 'jquery',
            React: 'react'
        })
    ]
}