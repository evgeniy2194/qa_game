import checkAuthKey from '../utils/chekAuthKey';
import {UsersStore, GamesStore} from '../utils/store';
import {sendUserInfo, sendQuestsInfo} from '../actions/userActions';
import sendMessage from './sendMessage';
import restoreGame from './restoreGame';
import {getExpToLevel} from "../utils/levelCalculation";
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
        const userId = model.id;
        const quests = model.quests;

        let user = {
            id: model.id,
            model: model,
            socket: socket,
            quests: model.quests,
        };

        socket.userId = userId;

        //Сохраняем пользователя в хранилище
        UsersStore.add(userId, user);

        //Отправляем клиенту данные о пользователе
        sendMessage(user, sendUserInfo(model));

        //Если нет квестов
        if (quests.length === 0) {
            //Если нет квестов - генерируем случайный квест
            genereteRandomQuest(model).then(() => {
                //Получаем активные квесты
                return getActiveQuests(model);
            }).then(quests => {
                //Отправляем данные о квестах
                sendMessage(user, sendQuestsInfo(quests));
            })
        } else {
            //Отправляем данные о квестах
            sendMessage(user, sendQuestsInfo(quests));
        }

        //ToDo: Проверять активную игру в обьекте пользователя в Store
        //restoreGame(socket, GamesStore.get(game.id));
    });
}