import webpack from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import path from 'path';
import express from 'express';
import webpackConfig from '../config/webpack.config';

let app = new express();
let compiler = webpack(webpackConfig);

app.use(webpackDevMiddleware(compiler, {noInfo: true, publicPath: webpackConfig.output.publicPath}));
app.use(webpackHotMiddleware(compiler));

app.use('/static', express.static(path.join(__dirname, '../static')));

app.get("/", function (req, res) {
    res.sendFile(path.join(__dirname + '/../static/index.html'));
});

/**
 * has to return { response: ... } like vk api
 */
app.all('/dev/api', function (req, res) {

    const url = req.query.url;
    let response = {};

    switch (url){
        case 'friends.getAppUsers':
            response = [20012099];
            break;
    }

    res.send({ response: response });
    res.end();
});

export default app;