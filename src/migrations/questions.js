const tableName = 'questions';

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
                question: {
                    type: Sequelize.STRING,
                    allowNull: false,
                },
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