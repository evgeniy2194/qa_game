import https from 'https';
import fs from 'fs';
import config from './config/config';
import app from './src/app';
import {createSocket} from './src/socket/socket';
import GameCreator from './src/utils/gameCreator';
import {Question, QuestionAnswer, Hints, HintCosts} from './src/database/models';

import {QueueStore, QuestionsStore, HintsStore} from './src/utils/store';
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
Hints.findAll({include: [{model: HintCosts, as: 'costs'}], order: [ ['id', 'ASC'], ['costs', 'countOfUse', 'ASC'] ]}).then(hints => {


    hints.map(hint=> {
        //console.log(hint);
        HintsStore.add(hint.name, {'costs':[]} );

        hint.costs.map(cost => {
            //console.log(HintsStore.getAll());
            //console.log(cost.hintId);
            HintsStore.addCost(hint.name, {coins: cost.coins, gems: cost.gems});
        });

    });


})
// //Load all questions
Question.findAll({include: [{model: QuestionAnswer, as: 'answers'}]}).then((questions) => {
    let i = questions.length;

    while (i--) {
        let question = questions[i];

        QuestionsStore.add(question.id, question);
    }
});
