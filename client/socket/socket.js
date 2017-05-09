import io from 'socket.io-client';
import querystring from 'querystring';
import queryStore from '../store/queryStore';

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
    });

    socket.on('disconnect', () => {
    });

    socket.on('message', data => {
        store.dispatch(data);
    });

}