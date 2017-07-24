const tableName = 'gameQuestions';

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