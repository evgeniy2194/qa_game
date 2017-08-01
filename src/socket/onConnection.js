import checkAuthKey from '../utils/chekAuthKey';
import {UsersStore, GamesStore} from '../utils/store';
import {sendUserInfo, sendQuestsInfo} from '../actions/userActions';
import sendMessage from './sendMessage';
import {User, Quest, UserQuest} from '../database/models';
import restoreGame from './restoreGame';
import {getExpToLevel} from "../utils/levelCalculation";
import connect from '../database/connect';
import Sequelize from 'sequelize';
import moment from 'moment';

export default function (socket) {
    const query = socket.handshake.query;
    const uid = query.uid;
    const now = moment().format('YYYY-MM-DD HH:mm:ss');

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
        },
        include: [{
            model: Quest,
            as: 'quests',
            through: {
                where: {
                    isReceivedReward: false,
                    dateFrom: { $lte: now },
                    dateTill: { $gt: now }
                }
            }
        }]
    }).then((data, created) => {
        //ToDo: Записывать в Store обьект пользователя содержащий информацию о квестах, подсказках и т.д
        const user = data[0];
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
            Quest.findOne({order: [Sequelize.fn('RAND')]}).then(quest => {
                return user.addQuest(quest, {
                    through: {
                        progress: 0,
                        isDone: false,
                        isReceivedReward: false,
                        dateFrom: moment().format('YYYY-MM-DD HH:mm:ss'),
                        dateTill: moment().add(12, 'hours').format('YYYY-MM-DD HH:mm:ss')
                    }
                });
            }).then(() => {
                return user.getQuests({
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
                })
            }).then(quests => {
                sendMessage(socket, sendQuestsInfo(quests));
            })
        } else {
            sendMessage(socket, sendQuestsInfo(quests));
        }

        //ToDo: Проверять активную игру в обьекте пользователя в Store
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