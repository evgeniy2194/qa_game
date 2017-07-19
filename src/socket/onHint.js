import sendMessage from './sendMessage';
import {GamesStore} from '../utils/store';
import {sendWrongAnswers} from '../actions/gameActions';
import shuffle from 'shuffle-array';


export default (socket, data) => {
    const hint = data.hint;
    const gameId = data.gameId;
    const questionId = data.questionId;
    const userId = data.userId;
    const game = GamesStore.get(gameId);
    const question = game.currentQuestion;
    const answers = shuffle(question.answers);

    switch (data.hint){
        case '50/50':

            let alreadyUsed = false;

            game.game.users = game.game.users.map(user => {
                 if(user._id == userId){
                     if (user.is50HintUsed){
                         alreadyUsed = true;
                     }
                     user.is50HintUsed = true;
                 }
                 return user;
            });

            let wrongAnswers = [];
            let count = 0;

            answers.forEach(answer => {
                if (question.correctAnswerId !== answer.id && count < 2) {
                    count++;
                    wrongAnswers.push(answer.id);
                }
            });
            if(alreadyUsed){
                wrongAnswers = [];
            }
            sendMessage(socket, sendWrongAnswers({wrongAnswers: wrongAnswers}));
        default:

    }

}