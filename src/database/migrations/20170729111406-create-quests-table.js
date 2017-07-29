'use strict';

const quests = 'Quests';
const userQuests = 'userQuests';

module.exports = {
    up: function (queryInterface, Sequelize) {
        return queryInterface.createTable(quests, {
            id: {
                type: Sequelize.INTEGER.UNSIGNED,
                primaryKey: true,
                autoIncrement: true
            },
            description: {
                type: Sequelize.STRING(3000),
                defaultValue: null
            },
            requirements: {
                type: Sequelize.INTEGER.UNSIGNED,
                allowNull: false,
                defaultValue: 0
            },
            check: {
                type: Sequelize.STRING(3000),
                allowNull: false
            },
            rewardCount: {
                type: Sequelize.INTEGER.UNSIGNED,
                allowNull: false,
                defaultValue: 0
            },
            rewardType: {
                type: Sequelize.STRING(255),
                allowNull: false,
                defaultValue: 0
            }
        }, {
            charset: 'UTF8',
            timestamp: false
        }).then(() => {
            return queryInterface.createTable(userQuests, {
                id: {
                    type: Sequelize.INTEGER.UNSIGNED,
                    primaryKey: true,
                    autoIncrement: true
                },
                userId: {
                    type: Sequelize.INTEGER.UNSIGNED,
                    references: {
                        model: 'Users',
                        key: 'id'
                    }
                },
                questId: {
                    type: Sequelize.INTEGER.UNSIGNED,
                    references: {
                        model: 'Quests',
                        key: 'id'
                    }
                },
                dateFrom: {
                    type: Sequelize.DATE,
                    allowNull: false
                },
                dateTill: {
                    type: Sequelize.DATE,
                    allowNull: false
                },
                isDone: {
                    type: Sequelize.BOOLEAN,
                    defaultValue: false
                },
                isReceivedReward: {
                    type: Sequelize.BOOLEAN,
                    defaultValue: false
                }
            });
        });
    },
    down: function (queryInterface, Sequelize) {
        return queryInterface.dropTable(userQuests).then(() => {
            return queryInterface.dropTable(quests);
        });
    }
};