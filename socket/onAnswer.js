import GamesStore from '../store/gamesStore';
import {answerResult} from '../actions/gameActions';
import sendMessage from '../socket/sendMessage';

export default (socket, data) => {

    //Достаем игру с хранилища
    let game = GamesStore.get(data.gameId);

    const answerId = data.answerId;
    const userId = socket.userId;

    //Если такой игры нет - ничего не делаем
    if (!game) return null;

    //Ответы пользователя
    let userAnswers = game.usersAnswers.get(userId);

    const currentQuestion = game.currentQuestion;
    const currentQuestionId = currentQuestion._id;

    //Если пользователь не отвечал на этот вопрос
    if (!userAnswers.answers.has(currentQuestionId)) {

        //Является ли ответ пользователя правильным
        const isCorrectAnswer = answerId === currentQuestion.correctAnswerId;

        if (isCorrectAnswer) {
            userAnswers.correctAnswers++;
            userAnswers.points += 10;
        }

        userAnswers.answers.set(currentQuestionId, {
            answerId: answerId,
            isCorrectAnswer: isCorrectAnswer
        });

        sendMessage(socket, answerResult(answerId, isCorrectAnswer));
    }
}