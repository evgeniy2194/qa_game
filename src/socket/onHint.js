import sendMessage from './sendMessage';
import {GamesStore} from '../utils/store';
import {sendWrongAnswers} from '../actions/gameActions';
import shuffle from 'shuffle-array';

export default (socket, data) => {
    const gameId = data.gameId;
    const userId = socket.userId;
    const game = GamesStore.get(gameId);
    const question = game.currentQuestion;
    const answers = shuffle(question.answers);

    switch (data.hint) {
        case '50/50':

            let alreadyUsed = false;

            game.game.users = game.game.users.map(user => {
                if (user._id == userId) {
                    alreadyUsed = user.is50HintUsed;

                    user.is50HintUsed = true;
                }
                return user;
            });
            game.game.save();
            let wrongAnswers = [];
            let count = 0;

            if (!alreadyUsed) {
                answers.forEach(answer => {
                    if (question.correctAnswerId !== answer.id && count < 2) {
                        count++;
                        wrongAnswers.push(answer.id);
                    }
                });
            }

            sendMessage(socket, sendWrongAnswers({wrongAnswers: wrongAnswers}));
            break;
        default:
            break;

    }

}