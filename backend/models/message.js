'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Message extends Model {
        static associate(models) {
            models.Message.belongsTo(models.User, {
                foreignKey: {
                    allowNull: false
                }
            })
        }
    };
    Message.init({
        idUSERS: DataTypes.INTEGER,
        title: DataTypes.STRING,
        content: DataTypes.STRING,
        attachment: DataTypes.STRING,
        likes: DataTypes.INTEGER
    }, {
        sequelize,
        modelName: 'Message',
    });
    return Message;
};