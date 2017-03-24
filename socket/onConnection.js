import checkAuthKey from '../app/chekAuthKey';
import { sendUserInfo } from '../actions/userActions';
import User from '../app/models/user';
import UserStore from '../store/usersStore';

export default function(socket) {

    console.log('[SOCKET]', 'new connection: ' + socket.id);

    let query = socket.handshake.query;
    let uid = query.uid;

    //Проверяем авторизирован ли пользователь
    if (!checkAuthKey(uid, query.authKey)) {
        socket.disconnect();
        return;
    }

    //Ищем пользователя, если нет - создаем
    User.findOne({uid: uid}, (err, user) => {

        //Если ошибка - отключаем от сервера
        if (err) {
            socket.disconnect();
            return;
        }

        //Если не нашли юзера - создаем
        if (user) {
            //Сохраняем пользователя в хранилище
            UserStore.add(user._id, user);
            socket.userId = user._id;
            //Отправляем клиенту данные о пользователе
            socket.emit('message', sendUserInfo(user));
        } else {
            User.create({
                uid: uid,
                firstName: query.firstName,
                lastName: query.lastName,
            }, (err, user) => {
                //Сохраняем пользователя в хранилище
                UserStore.add(user._id, user);
                socket.userId = user._id;
                //Отправляем клиенту данные о пользователе
                socket.emit('message', sendUserInfo(user));
            });
        }
    });
}