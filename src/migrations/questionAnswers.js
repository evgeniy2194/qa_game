const tableName = 'questionAnswers';

export default {
    up: (queryInterface, Sequelize) => {
        queryInterface.createTable(tableName, {
            id: {
                type: Sequelize.INTEGER.UNSIGNED,
                primaryKey: true,
                autoIncrement: true
            },
            questionId: {
                type: Sequelize.INTEGER.UNSIGNED,
                allowNull: false,
                references: {
                    model: 'questions',
                    key: 'id'
                },
            },
            answer: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            isCorrect: {
                type: Sequelize.BOOLEAN,
                defaultValue: false
            }
        }, {
            charset: 'UTF-8',
        });

        queryInterface.addIndex(tableName, ['questionId']);
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.dropTable(tableName);
    }
}