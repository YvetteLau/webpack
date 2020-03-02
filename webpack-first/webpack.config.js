const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const isDev = process.env.NODE_ENV === 'development';
const config = require('./public/config')[isDev ? 'dev' : 'build'];
console.log(config)
module.exports = {
    mode: isDev ? 'development' : 'production',
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, 'dist'), //必须是绝对路径
        filename: 'bundle.[hash:6].js',
        publicPath: '/' //通常是CDN地址
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                use: ['babel-loader'],
                exclude: /node_modules/ //排除 node_modules 目录
            },
            {
                test: /\.(le|c)ss$/,
                use: ['style-loader', 'css-loader', {
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
            // {
            //     test: /.html$/,
            //     use: 'html-withimg-loader'
            // },
            {
                test: /\.(png|jpg|gif|jpeg|webp|svg|eot|ttf|woff|woff2)$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 10240, //10K
                            esModule: false
                        }
                    }
                ],
                exclude: /node_modules/
            }
        ]
    },
    devtool: isDev ? 'cheap-module-eval-source-map' : 'source-map',
    plugins: [
        //数组 放着所有的webpack插件
        new HtmlWebpackPlugin({
            template: './public/index.html',
            filename: 'index.html', //打包后的文件名
            config: config.template
            // hash: true //是否加上hash，默认是 false
        }),
        new CleanWebpackPlugin({
            cleanOnceBeforeBuildPatterns:['**/*', '!dll', '!dll/**'] //不删除dll目录下的文件
        })
    ]
}