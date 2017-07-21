import https from 'https';
import fs from 'fs';
import mongoose from 'mongoose';
import config from './config/config';
import app from './src/app';
import {createSocket} from './src/socket/socket';
import GameCreator from './src/utils/gameCreator';

import {QueueStore} from './src/utils/store';
import startGame from './src/socket/startGame';


const privateKey = fs.readFileSync('config/ssl/server.key', 'utf8');
const certificate = fs.readFileSync('config/ssl/server.crt', 'utf8');
const httpsServer = https.createServer({key: privateKey, cert: certificate}, app);
const port = config.app.port;

createSocket(httpsServer);

const gameCreator = new GameCreator(config, QueueStore, startGame);

gameCreator.run();

mongoose.connect('mongodb://localhost/game', {useMongoClient: true});

const db = mongoose.connection;

db.once('open', () => {
    httpsServer.listen(port, function (error) {
        if (error) throw error;

        console.info("Server started on port %s.", port);
    });
});

db.on('error', console.error.bind(console, 'connection error:'));