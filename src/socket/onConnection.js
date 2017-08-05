import checkAuthKey from '../utils/chekAuthKey';
import {UsersStore, GamesStore} from '../utils/store';
import {sendUserInfo, sendQuestsInfo} from '../actions/userActions';
import sendMessage from './sendMessage';
import restoreGame from './restoreGame';
import {getExpToLevel} from "../utils/userUtils";
import {findOrCreate, genereteRandomQuest} from '../utils/userUtils';

export default function (socket) {
    const query = socket.handshake.query;
    const uid = query.uid;

    //Проверяем авторизирован ли пользователь
    if (!checkAuthKey(uid, query.authKey) && process.env.NODE_ENV === 'production') {
        socket.disconnect();
        return;
    }

    //Ищем или создаем пользователя
    findOrCreate({
        uid: uid,
        firstName: query.firstName,
        lastName: query.lastName,
        expToLevel: getExpToLevel(2)
    }).then(model => {
        const userId = socket.userId = model.id;
        const quests = model.quests;

        let user = UsersStore.get(userId) || {gameId: null, hints: {}};

        user.id = model.id;
        user.isOnline = true;
        user.model = model;
        user.socket = socket;
        user.quests = model.quests;
        user.isOnline = true;

        //Сохраняем пользователя в хранилище
        UsersStore.add(userId, user);

        //Отправляем клиенту данные о пользователе
        sendMessage(user, sendUserInfo(user.model));

        //Отправка данных о квестах
        Promise.resolve(quests.length ? quests : genereteRandomQuest(user.model)).then(quests => {
            user.quests = quests;
            sendMessage(user, sendQuestsInfo(quests));
        });

        if (user.gameId) {
            restoreGame(user, GamesStore.get(user.gameId));
        }
    });
}