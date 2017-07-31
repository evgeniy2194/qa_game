import checkAuthKey from '../utils/chekAuthKey';
import {UsersStore, GamesStore} from '../utils/store';
import {sendUserInfo} from '../actions/userActions';
import sendMessage from './sendMessage';
import {User, Quest, UserQuest} from '../database/models';
import restoreGame from './restoreGame';
import {getExpToLevel} from "../utils/levelCalculation";
import connect from '../database/connect';
import Sequelize from 'sequelize';
import moment from 'moment';

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

        user.getQuests({
            through: {
                model: UserQuest,
                where: {
                    isReceivedReward: false,
                    dateFrom: {
                        $lte: moment().format('YYYY-MM-DD HH:mm:ss')
                    },
                    dateTill: {
                        $gt: moment().format('YYYY-MM-DD HH:mm:ss')
                    }
                }
            }
        }).then(response => {
            //Если нет квестов - генерируем случайный квест
            if (response.length === 0) {
                return Quest.findOne({order: [Sequelize.fn('RAND')]});
            }
        }).then(quest => {
            if (quest) {
                return user.addQuest(quest, {
                    through: {
                        isDone: false,
                        isReceivedReward: false,
                        dateFrom: moment().format('YYYY-MM-DD HH:mm:ss'),
                        dateTill: moment().add(12, 'hours').format('YYYY-MM-DD HH:mm:ss')
                    }
                });
            }
        });

        //Если игрок не новый и у него есть незаконченная игра
        if (!created) {
            const sql = "SELECT g.* FROM Games g INNER JOIN GameUsers p ON p.gameId = g.id WHERE g.finishedAt IS NULL LIMIT 1";
            connect.query(sql, {type: Sequelize.QueryTypes.SELECT}).then((response) => {
                const game = response[0];
                if (game) {
                    restoreGame(socket, GamesStore.get(game.id));
                }
            })
        }
    });
}