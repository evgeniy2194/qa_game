'use strict';
const tableName='GemsAndCoinsUsing';

module.exports = {
    up: function (queryInterface, Sequelize) {
        return queryInterface.createTable(tableName, {
            id: {
                type: Sequelize.INTEGER.UNSIGNED,
                primaryKey: true,
                autoIncrement: true
            },
            gameId: {
                type: Sequelize.INTEGER.UNSIGNED,
                references: {
                    model: 'Games',
                    key: 'id'
                },
            },
            userId: {
                type: Sequelize.INTEGER.UNSIGNED,
                references: {
                    model: 'Users',
                    key: 'id'
                },
            },
            coins: {
                type: Sequelize.INTEGER.UNSIGNED,
                defaultValue: 0,
            },
            gems: {
                type: Sequelize.INTEGER.UNSIGNED,
                defaultValue: 0,
            },
            usedDt: {
                type: Sequelize.DATE,
                allowNull: false,
                defaultValue: Sequelize.NOW
            }

        }, {
            charset: 'utf8',
        }).then(function(){
            return queryInterface.addIndex(tableName, ['id'], {indicesType: 'UNIQUE'});
        });
    },

    down: function (queryInterface, Sequelize) {
        return queryInterface.dropTable(tableName);
    }
};
