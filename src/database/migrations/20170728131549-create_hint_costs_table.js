'use strict';
const tableName='HintsCosts';

module.exports = {
    up: function (queryInterface, Sequelize) {
        return queryInterface.createTable(tableName, {
            id: {
                type: Sequelize.INTEGER.UNSIGNED,
                primaryKey: true,
                autoIncrement: true
            },
            hintId: {
                type: Sequelize.INTEGER.UNSIGNED,
                defaultValue: null,
                references: {
                    model: 'Hints',
                    key: 'id'
                },
            },
            countOfUse: {
                type: Sequelize.INTEGER,
                defaultValue: 0
            },
            coins: {
                type: Sequelize.INTEGER.UNSIGNED,
                defaultValue: 0,
            },
            gems: {
                type: Sequelize.INTEGER.UNSIGNED,
                defaultValue: 0,
            },
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
