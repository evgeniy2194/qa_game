import Sequelize from 'sequelize';
import connect from '../connect';

const Game = connect.define('Game', {
    id: {
        type: Sequelize.INTEGER.UNSIGNED,
        primaryKey: true,
        autoIncrement: true
    },
    createdAt: Sequelize.DATE,
    updatedAt: Sequelize.DATE,

});

export default Game;