const games = 'Games';
const gameAnswers = 'GameAnswers';
const gameUsers = 'GameUsers';
const gameQuestions = 'GameQuestions';

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable(games, {
            id: {
                type: Sequelize.INTEGER.UNSIGNED,
                primaryKey: true,
                autoIncrement: true
            },
            startAt: {
                type: Sequelize.DATE,
                allowNull: false,
                defaultValue: Sequelize.literal('NOW()')
            },
            endAt: {
                type: Sequelize.DATE,
                defaultValue: null
            }

        }, {
            charset: 'UTF8',
        }).then(() => {
            return queryInterface.createTable(gameAnswers, {
                gameId: {
                    type: Sequelize.INTEGER.UNSIGNED,
                    references: {
                        model: games,
                        key: 'id'
                    }
                },
                questionId: {
                    type: Sequelize.INTEGER.UNSIGNED,
                    references: {
                        model: 'Questions',
                        key: 'id'
                    }
                },
                userId: {
                    type: Sequelize.INTEGER.UNSIGNED,
                    references: {
                        model: 'Users',
                        key: 'id'
                    }
                },
                answerId: {
                    type: Sequelize.INTEGER.UNSIGNED,
                    references: {
                        model: 'QuestionAnswers',
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
                charset: 'UTF8',
            });
        }).then(() => {
            return queryInterface.createTable(gameUsers, {
                gameId: {
                    type: Sequelize.INTEGER.UNSIGNED,
                    references: {
                        model: games,
                        key: 'id'
                    }
                },
                userId: {
                    type: Sequelize.INTEGER.UNSIGNED,
                    references: {
                        model: 'Users',
                        key: 'id'
                    }
                }
            }, {
                charset: 'UTF8',
            });
        }).then(() => {
            return queryInterface.createTable(gameQuestions, {
                gameId: {
                    type: Sequelize.INTEGER.UNSIGNED,
                    references: {
                        model: games,
                        key: 'id'
                    }
                },
                questionId: {
                    type: Sequelize.INTEGER.UNSIGNED,
                    references: {
                        model: 'Questions',
                        key: 'id'
                    }
                }
            }, {
                charset: 'UTF8',
            });
        }).then(() => {
            return queryInterface.addIndex(gameQuestions, ['gameId']);
        }).then(() => {
            return queryInterface.addIndex(gameUsers, ['gameId']);
        }).then(() => {
            queryInterface.addIndex(gameUsers, ['userId']);
        }).then(() => {
            queryInterface.addIndex(gameAnswers, ['gameId']);
        });
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.dropTable(gameQuestions).then(()=> {
            queryInterface.dropTable(gameUsers);
        }).then(() => {
            queryInterface.dropTable(gameAnswers);
        }).then(() => {
            queryInterface.dropTable(games);
        });
    }
};