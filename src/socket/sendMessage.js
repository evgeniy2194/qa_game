export default function (sockets, message) {

    if (sockets instanceof Array) {
        sockets.forEach((socket) => {
            socket.emit('message', message);
        });
    } else {
        sockets.emit('message', message);
    }
}