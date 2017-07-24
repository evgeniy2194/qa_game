const tableName = 'gameAnswers';

export default {
    up: (queryInterface, Sequelize) => {
        queryInterface.createTable(tableName, {
            gameId: {
                type: Sequelize.INTEGER.UNSIGNED,
                references: {
                    model: 'games',
                    key: 'id'
                }
            },
            questionId: {
                type: Sequelize.INTEGER.UNSIGNED,
                references: {
                    model: 'questions',
                    key: 'id'
                }
            },
            userId: {
                type: Sequelize.INTEGER.UNSIGNED,
                references: {
                    model: 'users',
                    key: 'id'
                }
            },
            answerId: {
                type: Sequelize.INTEGER.UNSIGNED,
                references: {
                    model: 'questionAnswers',
                    key: 'id'
                }
            },
            isCorrect: {
                type: Sequelize.BOOLEAN,
                defaultValue: false
            },
            createdAt: {
                type: Sequelize.DATE
            }
        }, {
            charset: 'UTF-8',
        });

        queryInterface.addIndex(tableName, ['gameId']);
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.dropTable(tableName);
    }
}