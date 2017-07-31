'use strict';
const tableName='Hints';

module.exports = {
  up: function (queryInterface, Sequelize) {
      return queryInterface.createTable(tableName, {
          id: {
              type: Sequelize.INTEGER.UNSIGNED,
              primaryKey: true,
              autoIncrement: true
          },
          name: {
              type: Sequelize.STRING,
              defaultValue: null,
          },
      }, {
          charset: 'utf8',
      }).then(function(){
          return queryInterface.addIndex(tableName, ['id'], {indicesType: 'UNIQUE'});
      });
  },

  down: function (queryInterface, Sequelize) {
      return queryInterface.dropTable(tableName);
  }
};
