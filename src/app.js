import path from 'path';
import express from 'express';

let app = new express();

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