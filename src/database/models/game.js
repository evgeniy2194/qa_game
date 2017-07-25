import sequelize from 'sequelize';
import User from './user';
import Question from './question';

const Game = sequelize.define('game', {
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