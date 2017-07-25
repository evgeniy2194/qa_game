import checkAuthKey from '../utils/chekAuthKey';
import {UsersStore, GamesStore} from '../utils/store';
import {sendUserInfo} from '../actions/userActions';
import sendMessage from './sendMessage';
import User from '../database/models/user';
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

    //Ищем или создаем пользователя
    User.findOrCreate({
        where: {
            uid: uid
        },
        defaults: {
            uid: uid,
            firstName: query.firstName,
            lastName: query.lastName,
            expToNextLevel: getExpToLevel(2)
        }
    }).then((user, created) => {
        const userId = user.id;

        socket.userId = userId;

        //Сохраняем пользователя в хранилище
        UsersStore.add(userId, user);

        console.log('send');

        //Отправляем клиенту данные о пользователе
        sendMessage(socket, sendUserInfo(user));

        console.log('after');


        //Если игрок не новый и у него есть незаконченная игра
        // if (!created && user.currentGameId) {
        //     restoreGame(socket, GamesStore.get(user.currentGameId));
        // }
    });
}