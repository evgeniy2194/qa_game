import https from 'https';
import fs from 'fs';
import Sequelize from 'sequelize';
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
const gameCreator = new GameCreator(config, QueueStore, startGame);

createSocket(httpsServer);
gameCreator.run();

const sequelize = new Sequelize('game', 'game', 'aq1sw2de3', {
    host: 'localhost',
    dialect: 'mysql',
    pool: {
        max: 5,
        min: 0,
        idle: 10000
    }
});

sequelize.authenticate().then(() => {
    httpsServer.listen(port, function (error) {
        if (error) throw error;

        console.info("Server started on port %s.", port);
    });
}).catch(err => {
    console.error('Unable to connect to the database:', err);
});

// //Load all questions
// Question.find({}).then((data) => {
//     let i = data.length;
//
//     while (i--) {
//         let item = data[i];
//         QuestionsStore.add(String(item._id), item);
//     }
// });