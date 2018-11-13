'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable(
          'category',
          {
              id: {
                  type: Sequelize.INTEGER,
                  primaryKey: true,
                  autoIncrement: true
              },
              name: {
                  type: Sequelize.STRING(50),
                  unique: true,
                  allowNull: false
              }
          }
      ).then(()=>{
          return queryInterface.bulkInsert(
              'category',
              [
                  {name: 'School'},
                  {name: 'Nature'},
                  {name: 'Art'},
                  {name: 'Holiday'},
                  {name: 'Universe'}
              ]
          )}
      );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('category');
  }
};
