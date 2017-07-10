import sendMessage from './sendMessage';
import {GamesStore} from '../utils/store';
import {sendWrongAnswers} from '../actions/gameActions';
import shuffle from 'shuffle-array';

export default (socket, data) => {
    const hint = data.hint;
    const gameId = data.gameId;
    const questionId = data.questionId;
    const game = GamesStore.get(gameId);
    const question = game.currentQuestion;
    const answers = shuffle(question.answers);

    let wrongAnswers = [];
    let count = 0;

    answers.forEach(answer => {
        if (question.correctAnswerId !== answer.id && count < 2) {
            count++;
            wrongAnswers.push(answer.id);
        }
    });

    sendMessage(socket, sendWrongAnswers(wrongAnswers));
}