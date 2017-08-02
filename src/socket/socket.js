import socketio from 'socket.io';
import onConnection from './onConnection';
import onAnswer from './onAnswer';
import onHint from './onHint';
import onLeaveGame from './onLeaveGame'
import {QueueStore, UsersStore} from '../utils/store';

let io = null;

export function createSocket(server) {

    io = socketio(server);

    io.on('connection', socket => {

        onConnection(socket);

        //Обработка всех входящих сообщений
        socket.on('message', data => {
            switch (data.action) {
                //Поиск игры
                case 'FIND_GAME':
                    //Добавляем игрока в очередь
                    const user = UsersStore.get(socket.userId);

                    QueueStore.add(user.id, user);
                    break;

                //Ответ на вопрос
                case 'ANSWER_GAME':
                    onAnswer(socket, data.data);
                    break;

                //Выход с очереди
                case 'CANCEL_FIND_GAME':
                    //Удаляем из массива игроков в очереди
                    QueueStore.remove(socket.id);
                    break;

                //Использование подсказки
                case 'USE_HINT':
                    onHint(socket, data.data);
                    break;
                case 'LEAVE_GAME':
                    onLeaveGame(socket);
                    break;
                default:
                    break;
            }
        });

        socket.on('disconnect', () => {
            console.log('disconnect');
            //Удаляем игрока с очереди и со списка игроков
            QueueStore.remove(socket.id);
            UsersStore.remove(socket.userId);
        });
    });
}