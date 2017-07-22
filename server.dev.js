import https from 'https';
import fs from 'fs';
import mongoose from 'mongoose';
import config from './config/config';
import app from './src/app';
import {createSocket} from './src/socket/socket';
import GameCreator from './src/utils/gameCreator';
import Question from './src/models/question';

import {QueueStore, QuestionsStore} from './src/utils/store';
import startGame from './src/socket/startGame';


const privateKey = fs.readFileSync('config/ssl/server.key', 'utf8');
const certificate = fs.readFileSync('config/ssl/server.crt', 'utf8');
const httpsServer = https.createServer({key: privateKey, cert: certificate}, app);
const port = config.app.port;

const db = mongoose.connection;
const gameCreator = new GameCreator(config, QueueStore, startGame);

createSocket(httpsServer);
gameCreator.run();

mongoose.connect('mongodb://localhost/game', {useMongoClient: true});

//Load all questions
Question.find({}).then((data) => {
    let i = data.length;

    while(i--) {
        let item = data[i];
        QuestionsStore.add(String(item._id), item);
    }
});

db.once('open', () => {
    httpsServer.listen(port, function (error) {
        if (error) throw error;

        console.info("Server started on port %s.", port);
    });
});

db.on('error', console.error.bind(console, 'connection error:'));