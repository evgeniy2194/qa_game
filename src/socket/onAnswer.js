import {GamesStore, UsersStore} from '../utils/store';
import {answerResult} from '../actions/gameActions';
import sendMessage from './sendMessage';

export default (user, data) => {

    //Достаем игру с хранилища
    let game = GamesStore.get(data.gameId);

    const answerId = data.answerId;
    const userId = user.id;

    //Если такой игры нет - ничего не делаем
    if (!game) return null;

    //Ответы пользователя
    let userAnswers = game.usersAnswers.get(userId);

    const currentQuestion = game.currentQuestion;
    const currentQuestionId = currentQuestion.id;

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

        //Сохраняем ответ пользователя в базу
        game.model.setAnswers([answerId], {
            through: {
                userId: userId,
                questionId: currentQuestionId,
                isCorrect: isCorrectAnswer
            }
        });

        sendMessage(user, answerResult(answerId, isCorrectAnswer));
    }
}