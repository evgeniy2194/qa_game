import checkAuthKey from '../utils/chekAuthKey';
import {UsersStore, GamesStore} from '../utils/store';
import {sendUserInfo} from '../actions/userActions';
import sendMessage from './sendMessage';
import User from '../database/models/user';
import restoreGame from './restoreGame';
import {getExpToLevel} from "../utils/levelCalculation";
import connect from '../database/connect';

export default function (socket) {

    let query = socket.handshake.query;
    let uid = query.uid;

    //Проверяем авторизирован ли пользователь
    if (!checkAuthKey(uid, query.authKey) && process.env.NODE_ENV === 'production') {
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
            expToLevel: getExpToLevel(2)
        }
    }).then((data, created) => {
        const user = data[0];
        const userId = user.id;

        socket.userId = userId;

        //Сохраняем пользователя в хранилище
        UsersStore.add(userId, user);

        //Отправляем клиенту данные о пользователе
        sendMessage(socket, sendUserInfo(user));

        //Если игрок не новый и у него есть незаконченная игра
        if (!created) {
            const sql = "SELECT g.id FROM games g INNER JOIN game_players p ON p.gameId = g.id WHERE g.endAt IS NULL";
            connect.query(sql).then((game) => {
                if (game) {
                    restoreGame(socket, GamesStore.get(game.id));
                }
            })
        }
    });
}