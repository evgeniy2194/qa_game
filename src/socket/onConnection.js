import checkAuthKey from '../utils/chekAuthKey';
import {UsersStore, GamesStore} from '../utils/store';
import {sendUserInfo} from '../actions/userActions';
import User from '../models/user';
import restoreGame from './restoreGame';
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
        User.findOne({uid: uid}).then(user => {

            //Если не нашли юзера - создаем
            if (user) {
                const userId = String(user._id);
                user._id = String(user._id);

                //Сохраняем пользователя в хранилище
                UsersStore.add(userId, user);
                socket.userId = userId;

                //Отправляем клиенту данные о пользователе
                socket.emit('message', sendUserInfo(user));

                //Если у игрока есть незаконченная игра
                if (user.currentGameId) {
                    restoreGame(socket, GamesStore.get(user.currentGameId));
                }
            } else {
                User.create({
                    uid: uid,
                    firstName: query.firstName,
                    lastName: query.lastName,
                    expToNextLevel: getExpToLevel(2)
                }).then(user => {
                    const userId = String(user._id);

                    //Сохраняем пользователя в хранилище
                    UsersStore.add(userId, user);
                    socket.userId = userId;

                    //Отправляем клиенту данные о пользователе
                    socket.emit('message', sendUserInfo(user));
                });
            }
        }).catch(error => {
            throw error;
        })
    } catch (err) {
        console.trace(err);
    }
}