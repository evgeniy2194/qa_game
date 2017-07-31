import Sequelize from 'sequelize';
import connect from '../connect';

const UserQuest = connect.define('UserQuest', {
    id: {
        type: Sequelize.INTEGER.UNSIGNED,
        primaryKey: true
    },
    userId: Sequelize.INTEGER.UNSIGNED,
    questId: Sequelize.INTEGER.UNSIGNED,
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

export default UserQuest;