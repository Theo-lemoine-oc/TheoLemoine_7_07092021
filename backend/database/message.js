'use strict';
module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('Messages', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            idUSERS: {
                llowNull: false,
                type: Sequelize.INTEGER,
                references: {
                    model: 'Users',
                    key: 'id'
                }
            },
            title: {
                llowNull: false,
                type: Sequelize.STRING
            },
            content: {
                llowNull: false,
                type: Sequelize.STRING
            },
            attachment: {
                llowNull: true,
                type: Sequelize.STRING
            },
            likes: {
                llowNull: false,
                type: Sequelize.INTEGER
            },
            createAt: {
                allowNull: false,
                type: Sequelize.DATE
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE
            }
        });
    }
}