import {startGame, sendQuestion, answerResult, sendHintsCost} from '../actions/gameActions';
import sendMessage from './sendMessage';
import {CalculateHints} from '../utils/HintsCalculator';

export default function (socket, game) {
    if (game) {
        const currentQuestion = game.currentQuestion;
        const userAnswers = game.usersAnswers.get(socket.userId);
        const currentQuestionId = currentQuestion._id;
        //const hints = game.hints;

        // let hints = {};
        // game.game.users.map(user =>{
        //
        //     if(socket.userId == user._id ){
        //         hints =  CalculateHints(user);
        //     }
        // });

        game.players.push(socket);

        //Отправляем данные об игре
        sendMessage(socket, startGame(game.game._id, game.users));

        //Отправляем игроку текущий вопрос
        sendMessage(socket, sendQuestion(currentQuestion));

        sendMessage(socket, sendHintsCost(hints));
        //Если пользователь уже отвечал на этот вопрос
        if (userAnswers.answers.has(currentQuestionId)) {
            const answer = userAnswers.answers.get(currentQuestionId);
            sendMessage(socket, answerResult(answer.answerId, answer.isCorrectAnswer));
        }
    }
}