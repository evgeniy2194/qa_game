import io from 'socket.io-client';
import querystring from 'querystring';

import {onConnect, onDisconnect, onMessage} from './utils/socketHandlers';
import {getAppParams} from './utils/queryParser';

const params = getAppParams();
const query = querystring.stringify({
    authKey: params.authKey,
    firstName: params.user.firstName,
    lastName: params.user.lastName,
    uid: params.userId
});

const socket = io.connect("wss://localhost:3000", {query: query});

//TODO: Add connect/disconnect/error handlers
socket.on('connect', () => {
    onConnect();
});

socket.on('disconnect', () => {
    onDisconnect();
});

socket.on('message', data => {
    onMessage(data);
});

export default socket;