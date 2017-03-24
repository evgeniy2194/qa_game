import GamesStore from '../store/gamesStore';
import { answerResult } from '../actions/gameActions';
import sendMessage from '../socket/sendMessage';

export default function onAnswer(socket, data){

    //Достаем игру с хранилища
    let game = GamesStore.get(data.gameId);

    const answerId = data.answerId;
    const userId = socket.userId;

    //Если такой игры нет - ничего не делаем
    if(!game) return null;

    let usersAnswer = game.usersAnswers[userId];
    let currentQuestion = game.currentQuestion;

    if (usersAnswer.answers[currentQuestion._id]) {        //Уже отвечал

    } else {        //Еще не отвечал

        //Правильный ответ
        const correctAnswerId = currentQuestion.correctAnswerId;

        //Является ли ответ пользователя правильным
        const isCorrect = answerId == correctAnswerId;

        if(isCorrect) {
            usersAnswer.correctAnswers++;
            usersAnswer.points += 10;
        }

        usersAnswer.answers[currentQuestion._id] = {
            answerId: answerId,
            correctAnswer: isCorrect
        };

        sendMessage(socket, answerResult(answerId, isCorrect));
    }
}