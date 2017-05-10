import https from 'https';
import fs from 'fs';
import mongoose from 'mongoose';
import config from './config/config';
import app from './src/app';
import { createSocket } from './src/socket/socket';

const privateKey  = fs.readFileSync('config/ssl/server.key', 'utf8');
const certificate = fs.readFileSync('config/ssl/server.crt', 'utf8');
const httpsServer = https.createServer({ key: privateKey, cert: certificate }, app);
const port = config.app.port;

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