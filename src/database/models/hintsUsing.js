/**
 * Created by vision on 7/28/17.
 */
import Sequelize from 'sequelize';
import connect from '../connect';

const HintsUsing = connect.define('HintsUsing', {
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

    hintId: {
        type: Sequelize.INTEGER.UNSIGNED,
        references: {
            model: 'Hints',
            key: 'id'
        },
    },
    questionId: {
        type: Sequelize.INTEGER.UNSIGNED,
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
});

export default HintsUsing;