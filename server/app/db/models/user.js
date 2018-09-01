'use strict';

const db = require('../db');
const DataTypes = db.Sequelize;

const user = db.define('user', {
    userName: {
        type: DataTypes.STRING,
        unique: true,
        validate: {
            isUserName: true,
            notEmpty: true
        }
    },
    password: {
        type: DataTypes.STRING
    },

})

module.exports = user;