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
    }).then(user => {
        //ToDo: Записывать в Store обьект пользователя содержащий информацию о квестах, подсказках и т.д
        const userId = user.id;

        socket.userId = userId;

        //Сохраняем пользователя в хранилище
        UsersStore.add(userId, user);

        //Отправляем клиенту данные о пользователе
        sendMessage(socket, sendUserInfo(user));

        const quests = user.quests;

        //Если нет квестов
        if (quests.length === 0) {
            //Если нет квестов - генерируем случайный квест
            genereteRandomQuest(user).then(() => {
                //Получаем активные квесты
                return getActiveQuests(user);
            }).then(quests => {
                //Отправляем данные о квестах
                sendMessage(socket, sendQuestsInfo(quests));
            })
        } else {
            //Отправляем данные о квестах
            sendMessage(socket, sendQuestsInfo(quests));
        }

        //ToDo: Проверять активную игру в обьекте пользователя в Store
        //restoreGame(socket, GamesStore.get(game.id));
    });
}