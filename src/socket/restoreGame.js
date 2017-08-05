import {startGame, sendQuestion, answerResult, sendHintsCost} from '../actions/gameActions';
import sendMessage from './sendMessage';
import {CalculateHints} from '../utils/HintsCalculator';

export default function (user, game) {
    if (game) {
        const currentQuestion = game.currentQuestion;
        const userAnswers = game.usersAnswers.get(user.id);
        const currentQuestionId = currentQuestion.id;
        const hints = game.hints;

        // let hints = {};
        // game.game.users.map(user =>{
        //
        //     if(socket.userId == user._id ){
        //         hints =  CalculateHints(user);
        //     }
        // });
        game.users.push(user);

        //Отправляем данные об игре
        let userModels = game.users.map(user => {
            return user.model;
        });
        sendMessage(user, startGame(game.model.id, userModels));

        //Отправляем игроку текущий вопрос
        sendMessage(user, sendQuestion(currentQuestion));

        sendMessage(user, sendHintsCost(hints));
        //Если пользователь уже отвечал на этот вопрос
        if (userAnswers.answers.has(currentQuestionId)) {
            const answer = userAnswers.answers.get(currentQuestionId);

            sendMessage(user, answerResult(answer.answerId, answer.isCorrectAnswer));
        }
    }
}