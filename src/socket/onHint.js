import sendMessage from './sendMessage';
import {GameStore} from '../utils/store';
import {sendWrongAnswers} from '../actions/gameActions';
import shuffle from 'shuffle-array';

export default (socket, data) => {
    const {hint, gameId, questionId} = data;

    const game = GameStore.get(gameId);
    const question = game.round.question;
    const answers = game.round.question.answers;

    shuffle(answers);

    let wrongAnswers = [];
    let count = 0;

    answers.forEach(answer => {
        if (question.correctAnswerId !== answer.id && count < 2) {
            count++;
            wrongAnswers.push(answer);
        }
    });

    sendMessage(socket, sendWrongAnswers(wrongAnswers));
}