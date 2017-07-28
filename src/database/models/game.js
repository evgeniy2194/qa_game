import Sequelize from 'sequelize';
import connect from '../connect';
import User from './user';
import Question from './question';

const Game = connect.define('Game', {
    id: {
        type: Sequelize.INTEGER.UNSIGNED,
        primaryKey: true,
        autoIncrement: true
    },
    createdAt: Sequelize.DATE,
    updatedAt: Sequelize.DATE,

});

//Game.hasMany(User, {through: 'GameUsers', as: 'users'});
//Game.hasMany(Question, {through: 'GameQuestions', as: 'questions'});

export default Game;