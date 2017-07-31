import Sequelize from 'sequelize';
import connect from '../connect';

const Game = connect.define('Game', {
    id: {
        type: Sequelize.INTEGER.UNSIGNED,
        primaryKey: true,
        autoIncrement: true
    },
    startedAt: Sequelize.DATE,
    finishedAt: Sequelize.DATE
});

export default Game;