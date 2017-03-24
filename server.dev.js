import https from 'https';
import fs from 'fs';
import mongoose from 'mongoose';
import config from './config/config';
import app from './app/app';
import { createSocket } from './socket/socket';

var privateKey  = fs.readFileSync('ssl/server.key', 'utf8');
var certificate = fs.readFileSync('ssl/server.crt', 'utf8');

var credentials = { key: privateKey, cert: certificate };

var httpsServer = https.createServer(credentials, app);
var port = config.app.port;

createSocket(httpsServer);

mongoose.connect('mongodb://localhost/game', (err) => {
    if (err) throw err;

    httpsServer.listen(port, function(error) {
        if (error) {
            console.error(error);
        } else {
            console.info("Server started on port %s.", port);
        }
    });
});