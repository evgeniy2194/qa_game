import {GameStore} from '../utils/store';
import shuffle from 'shuffle-array';

export default (hint, gameId, questionId) => {
    const game = GameStore.get(gameId);
    const question = game.question;
    const answers = game.question.answers;

    shuffle(answers);

    let incorectAnswers = [];
    let count = 0;

    answers.forEach(answer => {
        if (question.correctAnswerId !== answer.id && count < 2) {
            count++;
            incorectAnswers.push(answer);
        }
    });


}