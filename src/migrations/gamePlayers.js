const tableName = 'gamePlayers';

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
            userId: {
                type: Sequelize.INTEGER.UNSIGNED,
                references: {
                    model: 'users',
                    key: 'id'
                }
            }
        }, {
            charset: 'UTF-8',
        });

        queryInterface.addIndex(tableName, ['gameId']);
        queryInterface.addIndex(tableName, ['playerId']);
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.dropTable(tableName);
    }
}