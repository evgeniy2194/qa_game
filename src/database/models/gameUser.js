import Sequelize from 'sequelize';
import connect from '../connect';
import Game from './game';
import User from './user';

const GamePlayers = connect.define('GameUser', {
    gameId: {
        type: Sequelize.INTEGER.UNSIGNED,
        references: {
            model: Game,
            key: "id"
        }
    },
    userId: {
        type: Sequelize.INTEGER.UNSIGNED,
        references: {
            model: User,
            key: "id"
        }
    }
});

export default GamePlayers;