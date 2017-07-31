'use strict';
const tableName='HintsUsing';

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
                defaultValue: null,
                references: {
                    model: 'Game',
                    key: 'id'
                },
            },
            userId: {
                type: Sequelize.INTEGER.UNSIGNED,
                defaultValue: null,
                references: {
                    model: 'User',
                    key: 'id'
                },
            },
            hintId: {
                type: Sequelize.INTEGER.UNSIGNED,
                defaultValue: null,
                references: {
                    model: 'Hints',
                    key: 'id'
                },
            },
            questionId: {
                type: Sequelize.INTEGER.UNSIGNED,
                defaultValue: null,
                references: {
                    model: 'Questions',
                    key: 'id'
                },
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
