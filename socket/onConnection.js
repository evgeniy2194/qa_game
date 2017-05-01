import checkAuthKey from '../app/chekAuthKey';
import { sendUserInfo } from '../actions/userActions';
import User from '../app/models/user';
import UserStore from '../store/usersStore';

export default function(socket) {

    let query = socket.handshake.query;
    let uid = query.uid;

    console.log('[SOCKET]', 'uid: ', uid, 'new connection: ' + socket.id);


    //Проверяем авторизирован ли пользователь
    if (!checkAuthKey(uid, query.authKey)) {
        socket.disconnect();
        return;
    }

    try {
        //Ищем пользователя, если нет - создаем
        User.findOne({uid: uid}, (err, user) => {
            if (err) {
                throw err;
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
                    if (err) {
                        throw err;
                    }
                    //Сохраняем пользователя в хранилище
                    UserStore.add(user._id, user);
                    socket.userId = user._id;
                    //Отправляем клиенту данные о пользователе
                    socket.emit('message', sendUserInfo(user));
                });
            }
        });
    } catch (err) {
        console.trace(err);
    }
}