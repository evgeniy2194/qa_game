import Sequelize from 'sequelize';
import connect from '../connect';
import Question from './question';

const QuestionAnswer = connect.define('QuestionAnswer', {
    id: {
        type: Sequelize.INTEGER.UNSIGNED,
        primaryKey: true,
        autoIncrement: true
    },
    questionId: {
        type: Sequelize.INTEGER.UNSIGNED,
        allowNull: false,
        // references: {
        //     model: 'questions',
        //     key: 'id'
        // },
    },
    answer: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    isCorrect: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
    }
}, {
    timestamps: false
});

// QuestionAnswer.belongsTo(Question);

export default QuestionAnswer;