'use strict';

const { DataTypes } = require("sequelize/types");
const sequelize = require("../Database");
const user = require("../database/user");

module.exports = (sequelize, DataTypes) => {
    var User = sequelize.define('User', {
        email: DataTypes.STRING,
        name: DataTypes.STRING,
        lastname: DataTypes.STRING,
        password: DataTypes.STRING,
        bio: DataTypes.STRING,
        isAdmin: DataTypes.BOOLEAN
    }, {
        classMethods: {
            associate: function(models) {
                models.User.hasMany(models.Message);
            }
        }
    });
    return User;
}