import socketio from 'socket.io';
import onConnection from './onConnection';
import onAnswer from './onAnswer';
import onHint from './onHint';
import {QueueStore, UsersStore} from '../utils/store';

let io = null;

export function createSocket(server) {

    io = socketio(server);

    io.on('connection', socket => {

        onConnection(socket);

        //Обработка всех входящих сообщений
        socket.on('message', data => {
            console.log('DEBUG', data.action);
            switch (data.action) {
                //Поиск игры
                case 'FIND_GAME':
                    //Добавляем игрока в очередь
                    QueueStore.add(socket.id, socket);
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

                default:
                    break;
            }
        });

        socket.on('disconnect', () => {
            //Удаляем игрока с очереди и со списка игроков
            QueueStore.remove(socket.id);
            UsersStore.remove(socket.userId);
        });
    });
}