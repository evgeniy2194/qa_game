import sequelize from 'sequelize';

const QuestionAnswers = sequelize.define('question_answers', {
    id: {
        type: Sequelize.INTEGER.UNSIGNED,
        primaryKey: true,
        autoIncrement: true
    },
    questionId: {
        type: Sequelize.INTEGER.UNSIGNED,
        allowNull: false,
        references: {
            model: 'questions',
            key: 'id'
        },
    },
    answer: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    isCorrect: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
    }
});

export default QuestionAnswers;