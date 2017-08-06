import socketio from 'socket.io';
import moment from 'moment';
import onConnection from './onConnection';
import onAnswer from './onAnswer';
import onHint from './onHint';
import onLeaveGame from './onLeaveGame';
import getQuestReward from './getQuestReward';
import {QueueStore, UsersStore} from '../utils/store';

let io = null;

export function createSocket(server) {

    io = socketio(server);

    io.on('connection', socket => {

        onConnection(socket);

        //Обработка всех входящих сообщений
        socket.on('message', data => {
            const user = UsersStore.get(socket.userId);

            switch (data.action) {
                //Поиск игры
                case 'FIND_GAME':
                    //Добавляем игрока в очередь
                    QueueStore.add(user.id, user);
                    break;

                //Ответ на вопрос
                case 'ANSWER_GAME':
                    onAnswer(user, data.data);
                    break;

                //Выход с очереди
                case 'CANCEL_FIND_GAME':
                    //Удаляем из массива игроков в очереди
                    QueueStore.remove(user.id);
                    break;

                //Использование подсказки
                case 'USE_HINT':
                    onHint(user, data.data);
                    break;

                case 'GET_QUEST_REWARD':
                    getQuestReward(user, data.data);
                    break;

                case 'LEAVE_GAME':
                    onLeaveGame(user);
                    break;
                default:
                    break;
            }
        });

        socket.on('disconnect', () => {
            const user = UsersStore.get(socket.userId);

            if (user) {
                user.isOnline = false;
                user.exitTime = moment();
                //Удаляем игрока с очереди
                QueueStore.remove(user.id);
            }
        });
    });
}