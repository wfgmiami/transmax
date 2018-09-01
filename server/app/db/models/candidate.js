'use strict';

const db = require('../db');
const DataTypes = db.Sequelize;

const candidate = db.define('candidate', {
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    email: {
        type: DataTypes.STRING,
        unique: true,
        validate: {
            isEmail: true,
            notEmpty: true
        }
    },
    phone: {
        type: DataTypes.STRING
    },
    driversLicense: {
        type: DataTypes.STRING
    },
    experience: DataTypes.STRING,
    city: DataTypes.STRING,
    state: DataTypes.STRING

})

module.exports = candidate;