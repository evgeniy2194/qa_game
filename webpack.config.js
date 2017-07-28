var path = require('path');
var webpack = require('webpack');

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
        new webpack.NoErrorsPlugin(),
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify(process.env.NODE_ENV)
            }
        })
    ],
    module: {
        loaders: [ //добавили babel-loader
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
