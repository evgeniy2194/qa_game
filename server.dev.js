import https from 'https';
import fs from 'fs';
import config from './config/config';
import connect from './src/database/connect';
import app from './src/app';
import {createSocket} from './src/socket/socket';
import GameCreator from './src/utils/gameCreator';
import Question from './src/database/models/question';
import QuestionAnswer from './src/database/models/questionAnswers';

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
//console.log('here is');
const sql = "SELECT Q.id, Q.question FROM Questions Q";
connect.query(sql).then((questions) => {
    questions = questions[0];
    let i = questions.length;

    while (i--) {
        let question = questions[i];

        QuestionsStore.add(question.id, question);
    }
});
//Question.findAll({include: [{model: QuestionAnswer, as: 'answers'}]}).then((questions) => {});