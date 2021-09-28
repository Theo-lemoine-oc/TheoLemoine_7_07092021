'use strict';

const { DataTypes } = require("sequelize/types");
const sequelize = require("../Database");
const user = require("../database/user");

module.exports = (sequelize, DataTypes) => {
    var Message = sequelize.define('Message', {
        idUSERS: DataTypes.INTEGER,
        title: DataTypes.STRING,
        content: DataTypes.STRING,
        attachment: DataTypes.STRING,
        likes: DataTypes.INTEGER
    }, {
        classMethods: {
            associate: function(models) {
                models.Message.belongsTo(models.User, {
                    foreignKey: {
                        allowNull: false
                    }
                })
            }
        }
    });
    return Message;
}