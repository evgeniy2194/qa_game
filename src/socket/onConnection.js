import checkAuthKey from '../utils/chekAuthKey';
import {sendUserInfo} from '../actions/userActions';
import {startGame, sendQuestion} from '../actions/gameActions';
import User from '../models/user';
import {UsersStore, GamesStore} from '../utils/store';
import sendMessage from './sendMessage';


import {getExpToLevel} from "../utils/levelCalculation";

export default function (socket) {

    let query = socket.handshake.query;
    let uid = query.uid;

    //Проверяем авторизирован ли пользователь
    if (!checkAuthKey(uid, query.authKey)) {
        socket.disconnect();
        return;
    }

    try {
        //Ищем пользователя, если нет - создаем
        User.findOne({uid: uid}, (err, user) => {
            if (err) {
                throw err;
            }

            //Если не нашли юзера - создаем
            if (user) {
                //Сохраняем пользователя в хранилищеэ
                user._id = String(user._id);
                let userId = String(user._id);

                UsersStore.add(userId, user);
                socket.userId = userId;

                //Отправляем клиенту данные о пользователе
                socket.emit('message', sendUserInfo(user));

                //Если у игрока есть незаконченная игра

                if(user.currentGameId){
                    //console.log(user);
                    const game = GamesStore.get(user.currentGameId);

                    if(game) {

                        sendMessage(socket, startGame(game.game._id, game.users));
                        game.players.push(socket);
                        const question = game.currentQuestion;
                        const questions = game.questions;
                        //Отправляем игроку новый вопрос
                        let questionToSend = {
                            questionNumber: question.questionNumber, //Номер вопроса
                            totalQuestion: questions.length,   //Всего вопросов
                            question: question.question,    //Вопрос
                            answers: question.answers,      //Ответы
                        };
                        sendMessage(socket, sendQuestion(questionToSend));

                    }

                }


            } else {
                User.create({
                    uid: uid,
                    firstName: query.firstName,
                    lastName: query.lastName,
                    expToNextLevel: getExpToLevel(2)
                }, (err, user) => {
                    if (err) {
                        throw err;
                    }
                    //Сохраняем пользователя в хранилище


                    let userId = String(user._id);
                    UsersStore.add(userId, user);
                    socket.userId = userId;
                    //Отправляем клиенту данные о пользователе
                    socket.emit('message', sendUserInfo(user));
                });
            }
        });
    } catch (err) {
        console.trace(err);
    }
}