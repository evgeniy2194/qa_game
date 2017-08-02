/**
 * Created by vision on 7/21/17.
 */
import {GamesStore, UsersStore} from '../utils/store';

export default (user) => {

    //Достаем игру с хранилища
    const game = GamesStore.get(user.gameId);

    //Если такой игры нет - ничего не делаем
    if (!game) return null;

    //Удаляем игрока со списка игроков
    game.users = game.users.filter(item => {
        if (item.userId !== user.id) {
            return item;
        }
    });

    user.gameId = null;

    game.model.save();
}