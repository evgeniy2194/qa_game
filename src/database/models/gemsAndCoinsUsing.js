/**
 * Created by vision on 7/28/17.
 */
import Sequelize from 'sequelize';
import connect from '../connect';

const GemsAndCoinsUsing = connect.define('GemsAndCoinsUsing', {
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
});

export default GemsAndCoinsUsing;