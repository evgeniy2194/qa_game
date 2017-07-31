import Sequelize from 'sequelize';
import connect from '../connect';

const Question = connect.define('Question', {
    id: {
        type: Sequelize.INTEGER.UNSIGNED,
        primaryKey: true,
        autoIncrement: true
    },
    question: {
        type: Sequelize.STRING,
        allowNull: false,
    }
}, {
    timestamps: false
});

export default Question;