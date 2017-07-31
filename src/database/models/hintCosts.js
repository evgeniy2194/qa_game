/**
 * Created by vision on 7/28/17.
 */
import Sequelize from 'sequelize';
import connect from '../connect';

const HintsUsing = connect.define('HintCosts', {
    id: {
        type: Sequelize.INTEGER.UNSIGNED,
        primaryKey: true,
        autoIncrement: true
    },
    hintId: {
        type: Sequelize.INTEGER.UNSIGNED,
        defaultValue: null,
        references: {
            model: 'Hints',
            key: 'id'
        },
    },
    countOfUse: {
        type: Sequelize.INTEGER,
        defaultValue: 0
    },
    coins: {
        type: Sequelize.INTEGER.UNSIGNED,
        defaultValue: 0,
    },
    gems: {
        type: Sequelize.INTEGER.UNSIGNED,
        defaultValue: 0,
    }
});

export default HintsUsing;