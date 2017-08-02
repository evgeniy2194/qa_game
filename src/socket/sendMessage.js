export default function (users, message) {
    users = users instanceof Array ? users : [users];

    users.forEach((user) => {
        user.socket.emit('message', message);
    });
}
