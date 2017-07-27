const tableName = 'games';

export default {
    up: (queryInterface, Sequelize) => {
        queryInterface.createTable(
            tableName,
            {
                id: {
                    type: Sequelize.INTEGER.UNSIGNED,
                    primaryKey: true,
                    autoIncrement: true
                },
                createdAt: {
                    type: Sequelize.DATE
                },
                updatedAt: {
                    type: Sequelize.DATE
                }
            },
            {
                charset: 'UTF-8',
            }
        )
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.dropTable(tableName);
    }
}