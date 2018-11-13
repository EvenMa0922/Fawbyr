'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable(
            'image',
            {
                id: {
                    type: Sequelize.INTEGER,
                    primaryKey: true,
                    autoIncrement: true
                },
                categoryId: {
                    type: Sequelize.INTEGER,
                },
                name: {
                    type: Sequelize.STRING(64),
                    allowNull: false
                },
                description: {
                    type: Sequelize.STRING(128),
                    allowNull: false
                },
                high_res: {
                    type:Sequelize.BLOB,
                    allowNull: false
                },
                med_res: {
                    type:Sequelize.BLOB,
                    allowNull: true //for now
                },
                thumbnail: {
                    type:Sequelize.BLOB,
                    allowNull: true //for now
                },
                size: {
                    type: Sequelize.INTEGER,
                    allowNull: true
                },
                resolution: {
                    type: Sequelize.STRING(128),
                    allowNull: true
                },
                approved: {
                    type:Sequelize.BOOLEAN,
                    defaultValue: false
                }
            }
        ).then(() => {
            return queryInterface.addConstraint(
                'image', ['categoryId'], {
                    type: 'foreign key',
                    name: 'image_category_foreign_key',
                    references: {
                        table: 'category',
                        field: 'id'
                    },
                    onDelete: 'cascade',
                    onUpdate: 'cascade'
                });
        })
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.dropTable('image');
    }
};
