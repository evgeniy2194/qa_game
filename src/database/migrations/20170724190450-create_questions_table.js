'use strict';

const questions = 'questions';
const questionAnswers = 'question_answers';

module.exports = {
    up: (queryInterface, Sequelize) => {
        queryInterface.createTable(questions, {
            id: {
                type: Sequelize.INTEGER.UNSIGNED,
                primaryKey: true,
                autoIncrement: true
            },
            question: {
                type: Sequelize.STRING,
                allowNull: false,
            },
        }, {
            charset: 'UTF8',
        });

        queryInterface.createTable(questionAnswers, {
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
        }, {
            charset: 'UTF8',
        });

        queryInterface.addIndex(questionAnswers, ['questionId']);
    },

    down: (queryInterface, Sequelize) => {
        queryInterface.dropTable(questionAnswers);
        queryInterface.dropTable(questions);
    }
};