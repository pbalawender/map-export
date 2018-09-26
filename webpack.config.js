const HtmlWebpackPlugin = require('html-webpack-plugin');
const Dotenv = require('dotenv-webpack');

module.exports = {
    mode: 'development',
    entry: __dirname + '/src/index.js',
    output: {
        path: __dirname + '/build',
        filename: '[name].[chunkhash:8].js'
    },
    devtool: 'source-map',
    devServer: {
        contentBase: __dirname + '/public',
        port: 8888,
        publicPath: '/',
        stats: 'minimal'
    },
    module: {
        rules: [
            {
                'test': /\.js$/,
                'exclude': /node_modules/,
                'use': {
                    'loader': 'babel-loader',
                    'options': {
                        'presets': [
                            '@babel/env'
                        ]
                    }
                }
            },
            {
                'test': /\.css$/,
                'use': [
                    'style-loader',
                    'css-loader'
                ]
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            inject: true,
            template: __dirname + '/public/index.html'
        }),
        new Dotenv()
    ]
};
