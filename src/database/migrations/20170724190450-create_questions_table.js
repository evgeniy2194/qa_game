'use strict';

const questions = 'Questions';
const questionAnswers = 'QuestionAnswers';

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable(questions, {
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
        }).then(() => {
            return queryInterface.createTable(questionAnswers, {
                id: {
                    type: Sequelize.INTEGER.UNSIGNED,
                    primaryKey: true,
                    autoIncrement: true
                },
                questionId: {
                    type: Sequelize.INTEGER.UNSIGNED,
                    allowNull: false,
                    references: {
                        model: questions,
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
        }).then(() => {
            return queryInterface.addIndex(questionAnswers, ['questionId']);
        });
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.dropTable(questionAnswers).then(() => {
            return queryInterface.dropTable(questions);
        });
    }
};