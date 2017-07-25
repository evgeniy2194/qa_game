import Sequelize from 'sequelize';
import connect from '../connect';
import User from './user';
import Question from './question';

const Game = connect.define('game', {
    id: {
        type: Sequelize.INTEGER.UNSIGNED,
        primaryKey: true,
        autoIncrement: true
    },
    createdAt: Sequelize.DATE,
    updatedAt: Sequelize.DATE
});

Game.hasMany(User,      {as: 'users'});
Game.hasMany(Question,  {as: 'questions'});

export default Game;