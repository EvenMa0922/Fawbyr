'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.createTable(
          'user',
          {
              id: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true
              },
              user_name: {
                  type: Sequelize.STRING(30),
                  unique: true,
                  allowNull: false
              },
              email: {
                  type: Sequelize.STRING(50),
                  allowNull: false
              },
              password: {
                  type: Sequelize.STRING(30),
                  allowNull: false
              },
              type: {
                  type: Sequelize.STRING(20),
                  defaultValue: 'registered',
                  allowNull: false
              }
          }
      ).then(() => {
          return queryInterface.addConstraint(
              'user', ['type'], {
                  type: 'check',
                  name: 'user_type_constraint',
                  where: {
                      type: ['registered', 'admin']
                  }
              }
          )
      })
  },

  down: (queryInterface, Sequelize) => {
      return queryInterface.dropTable('user');
  }
};
