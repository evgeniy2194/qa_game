import { socket } from '../socket/socket';

const middleware = store => next => action => {
    console.log('socket middleware', action);
    if(action.socket !== undefined){
        console.log(action.socket);
        socket.emit('message', action.socket);
    }

    return next(action);
};

export default middleware;