const tableName = 'users';

module.exports = {
    up: (queryInterface, Sequelize) => {
        queryInterface.createTable(tableName, {
            id: {
                type: Sequelize.INTEGER.UNSIGNED,
                primaryKey: true,
                autoIncrement: true
            },
            uid: {
                type: Sequelize.INTEGER.UNSIGNED,
                allowNull: false
            },
            firstaName: {
                type: Sequelize.STRING,
                defaultValue: null,
            },
            lastName: {
                type: Sequelize.STRING,
                defaultValue: null,
            },
            expTotal: {
                type: Sequelize.INTEGER.UNSIGNED,
                defaultValue: 0,
            },
            expToLevel: {
                type: Sequelize.INTEGER.UNSIGNED,
                defaultValue: 0,
            },
            coins: {
                type: Sequelize.INTEGER.UNSIGNED,
                defaultValue: 0,
            },
            gems: {
                type: Sequelize.INTEGER.UNSIGNED,
                defaultValue: 0,
            },
            createdAt: {
                type: Sequelize.DATE
            },
            updatedAt: {
                type: Sequelize.DATE
            }
        }, {
            charset: 'utf8',
        });

        queryInterface.addIndex(tableName, ['uid'], {indicesType: 'UNIQUE'});
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.dropTable(tableName);
    }
};