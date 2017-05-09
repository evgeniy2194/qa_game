import socket from '../socket';

const middleware = store => next => action => {

    if(action.socket !== undefined){
        socket.emit('message', action.socket);
    }

    return next(action);
};

export default middleware;