'use strict';

let path = require('path');
let webpack = require('webpack');

module.exports = {
    devtool: 'cheap-module-eval-source-map',
    entry: [
        'webpack-hot-middleware/client',
        'babel-polyfill',
        'whatwg-fetch',
        './client/index'
    ],
    output: {
        path: path.join(__dirname, '/static'),
        filename: 'bundle.js',
        publicPath: '/static/'
    },
    plugins: [
        new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoErrorsPlugin()
    ],
    module: {
        loaders: [
            {
                loaders: ['babel-loader'],
                include: [
                    path.resolve(__dirname, "./client"),
                ],
                test: /\.js$/,
                plugins: ['transform-runtime'],
            }
        ]
    }
};
