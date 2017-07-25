const games = 'games';
const gameAnswers   = 'game_answers';
const gamePlayers   = 'game_players';
const gameQuestions = 'game_questions';

module.exports = {
    up: (queryInterface, Sequelize) => {
        queryInterface.createTable(games, {
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
        }, {
            charset: 'UTF8',
        });

        queryInterface.createTable(gameAnswers, {
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
            },
            userId: {
                type: Sequelize.INTEGER.UNSIGNED,
                references: {
                    model: 'users',
                    key: 'id'
                }
            },
            answerId: {
                type: Sequelize.INTEGER.UNSIGNED,
                references: {
                    model: 'question_answers',
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

        queryInterface.createTable(gamePlayers, {
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
            charset: 'UTF8',
        });

        queryInterface.createTable(gameQuestions, {
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
            charset: 'UTF8',
        });

        queryInterface.addIndex(gameQuestions,  ['gameId']);
        queryInterface.addIndex(gamePlayers,    ['gameId']);
        queryInterface.addIndex(gamePlayers,    ['userId']);
        queryInterface.addIndex(gameAnswers,    ['gameId']);
    },

    down: (queryInterface, Sequelize) => {
        queryInterface.dropTable(gameQuestions);
        queryInterface.dropTable(gamePlayers);
        queryInterface.dropTable(gameAnswers);
        queryInterface.dropTable(games);
    }
};