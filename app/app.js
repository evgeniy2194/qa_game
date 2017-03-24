import webpack from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import path from 'path';
import express from 'express';
import webpackConfig from '../config/webpack.config';

var app = new express();
var compiler = webpack(webpackConfig);

app.use(webpackDevMiddleware(compiler, { noInfo: true, publicPath: webpackConfig.output.publicPath }));
app.use(webpackHotMiddleware(compiler));
app.use(express.static(path.join(__dirname, 'static')));

app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname + '/../static/index.html'));
});

app.all('/api', function(req, res){
    res.send('It is api man!');
    res.close();
});

export default app;