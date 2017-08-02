/**
 * Created by vision on 7/21/17.
 */
import {GamesStore, UsersStore} from '../utils/store';

export default (socket) => {

    const user = UsersStore.get(socket.userId);
    //Достаем игру с хранилища
    let game = GamesStore.get(user.currentGameId);

    //Если такой игры нет - ничего не делаем
    if (!game) return null;

    game.players = game.players.filter(player => {
        if (player.userId !== socket.userId) {
            return player;
        }
    });

    game.game.users = game.game.users.filter(player => {

        if (player._id !== socket.userId) {
            return player;
        }
    });

    user.currentGameId = null;

    user.model.save();
    game.game.save();
}