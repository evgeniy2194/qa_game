import Sequelize from 'sequelize';
import connect from '../connect';

const GameAnswer = connect.define('GameAnswer', {
    gameId: Sequelize.INTEGER.UNSIGNED,
    questionId: Sequelize.INTEGER.UNSIGNED,
    userId: Sequelize.INTEGER.UNSIGNED,
    answerId: Sequelize.INTEGER.UNSIGNED,
    isCorrect: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
    },
    createdAt: Sequelize.DATE
});

export default GameAnswer;