/**
 * Created by vision on 7/28/17.
 */
import Sequelize from 'sequelize';
import connect from '../connect';

const Hints = connect.define('Hints', {
    id: {
        type: Sequelize.INTEGER.UNSIGNED,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: Sequelize.STRING,
        defaultValue: null,
    }
});

export default Hints;