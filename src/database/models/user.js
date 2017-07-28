import Sequelize from 'sequelize';
import connect from '../connect';

const User = connect.define('User', {
    id: {
        type: Sequelize.INTEGER.UNSIGNED,
        primaryKey: true,
        autoIncrement: true
    },
    uid: {
        type: Sequelize.INTEGER.UNSIGNED,
        allowNull: false
    },
    firstName: {
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
    createdAt: Sequelize.DATE,
    updatedAt: Sequelize.DATE
});

export default User;