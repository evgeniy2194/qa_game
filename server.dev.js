import https from 'https';
import fs from 'fs';
import config from './config/config';
import app from './src/app';
import {createSocket} from './src/socket/socket';
import GameCreator from './src/utils/gameCreator';
import Question from './src/database/models/question';
import QuestionAnswer from './src/database/models/QuestionAnswer';

import {QueueStore, QuestionsStore} from './src/utils/store';
import startGame from './src/socket/startGame';

const privateKey = fs.readFileSync('config/ssl/server.key', 'utf8');
const certificate = fs.readFileSync('config/ssl/server.crt', 'utf8');
const httpsServer = https.createServer({key: privateKey, cert: certificate}, app);
const port = config.app.port;
const gameCreator = new GameCreator(config, QueueStore, startGame);

createSocket(httpsServer);
gameCreator.run();

httpsServer.listen(port, function (error) {
    if (error) throw error;

    console.info("Server started on port %s.", port);
});

// //Load all questions
Question.findAll({include: [{model: QuestionAnswer}]}).then((questions) => {
    console.log(questions);

    let i = data.length;

    while (i--) {
        let question = data[i];
        QuestionsStore.add(question.id, question);
    }
});