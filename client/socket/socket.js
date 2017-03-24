import io from 'socket.io-client';
import querystring from 'querystring';
import queryStore from '../store/queryStore';

console.log(queryStore);
const query = querystring.stringify({
    authKey: queryStore.authKey,
    firstName: queryStore.user.firstName,
    lastName: queryStore.user.lastName,
    uid: queryStore.user.uid
});

const connect = io.connect("wss://188.231.188.19:3000", { query: query });

export const socket = connect;

export function listenSocket(store){

    //Нужно обработать отключение от сервера
    socket.on('connect', () => {});

    socket.on('disconnect', () => {});

    socket.on('message', data => {
        store.dispatch(data);
    });

}