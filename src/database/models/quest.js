import Sequelize from 'sequelize';
import connect from '../connect';

const Quest = connect.define('Quest', {
    id: {
        type: Sequelize.INTEGER.UNSIGNED,
        primaryKey: true
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
});

export default Quest;