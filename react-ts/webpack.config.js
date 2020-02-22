const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: './src/index.tsx',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist')
    },
    performance: {
        //丫的，啥还没干，就 limit 了
        maxEntrypointSize: 40000000,
        maxAssetSize: 4000000
    },
    mode: 'production',
    devServer: {
        port: 3001,
        // quiet: true,
        clientLogLevel: "silent",
        overlay: true,
        compress: true,
        stats: "errors-only"
        // progress: true
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js', 'json']
    },
    devtool: 'source-map',
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                exclude: /node_modules/,
                use: ['babel-loader', 'awesome-typescript-loader']
            },
            {
                test: /\.tsx?$/,
                loader: 'eslint-loader',
                exclude: /node_modules/,
                options: {
                    // cache: true,
                    emitWarning: true, // 这个配置需要打开，才能在控制台输出warning信息
                    emitError: true, // 这个配置需要打开，才能在控制台输出error信息
                    fix: true // 是否自动修复，如果是，每次保存时会自动修复可以修复的部分   
                },
                enforce: 'pre'
            },
            { 
                // ??? maybe 不需要
                test: /\.js$/, 
                loader: "source-map-loader"
            },
            {
                test: /\.(png|jpg|jpeg|gif)/,
                //当图片小于某个尺寸时，使用base64图片,否则用file-loader拷贝生成图片
                use: {
                    loader: 'url-loader',
                    options: {
                        limit: 20480,
                        output: 'img/' //打包到img 目录下；pulicPath参数
                    }
                }
            },
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    'css-loader',
                    {
                        loader: 'postcss-loader',
                        options: {
                            plugins: function() {
                                return [
                                    require('autoprefixer')({
                                        "overrideBrowserslist": [
                                            "defaults"
                                        ]
                                    })
                                ]
                            }
                        }
                    }
                ]
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './public/index.html',
            // minify: {
            //     removeAttributeQuotes: true, //删除属性的双引号
            //     collapseWhitespace: true, //折叠
            // },
        })
    ],
    
}