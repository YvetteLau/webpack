const webpack = require('webpack');
const path = require('path');

module.exports = {
    entry: {
        react: ['react', 'react-dom']
    },
    mode: 'production',
    output: {
        filename: '[name].dll.[hash:6].js',
        path: path.resolve(__dirname, 'dist', 'dll'),
        library: '[name]_dll',
    },
    plugins: [
        new webpack.DllPlugin({
            //name和library一致
            name: '[name]_dll', 
            path: path.resolve(__dirname, 'dist', 'dll', 'manifest.json') 
        })
    ]
}