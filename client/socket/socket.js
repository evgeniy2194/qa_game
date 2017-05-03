import io from 'socket.io-client';
import querystring from 'querystring';
import queryStore from '../store/queryStore';

console.log('queryStore', queryStore);
const query = querystring.stringify({
    authKey: queryStore.authKey,
    firstName: queryStore.user.firstName,
    lastName: queryStore.user.lastName,
    uid: queryStore.userId
});

const connect = io.connect("wss://localhost:3000", { query: query });

export const socket = connect;

export function listenSocket(store){

    //TODO: Add connect/disconnect/error handlers
    socket.on('connect', () => {
        console.log('[SOCKET]', 'connect');
    });

    socket.on('disconnect', () => {
        console.log('[SOCKET]', 'disconnect');
    });

    socket.on('message', data => {
        console.log('[SOCKET MESSAGE]', data);
        store.dispatch(data);
    });

}