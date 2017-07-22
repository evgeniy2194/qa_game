import {startGame, sendQuestion, answerResult} from '../actions/gameActions';
import sendMessage from './sendMessage';

export default function (socket, game) {
    if (game) {
        const currentQuestion = game.currentQuestion;
        const userAnswers = game.usersAnswers.get(socket.userId);
        const currentQuestionId = currentQuestion._id;

        game.players.push(socket);

        //Отправляем данные об игре
        sendMessage(socket, startGame(game.game._id, game.users));

        //Отправляем игроку текущий вопрос
        sendMessage(socket, sendQuestion(currentQuestion));

        //Если пользователь уже отвечал на этот вопрос
        if (userAnswers.answers.has(currentQuestionId)) {
            const answer = userAnswers.answers.get(currentQuestionId);
            sendMessage(socket, answerResult(answer.answerId, answer.isCorrectAnswer));
        }
    }
}