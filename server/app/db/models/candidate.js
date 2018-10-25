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
        }
    },
    phone: {
        type: DataTypes.STRING
    },
    driversLicense: {
        type: DataTypes.STRING
    },
    experience: DataTypes.STRING,
    streetAddress: DataTypes.STRING,
    city: DataTypes.STRING,
    state: DataTypes.STRING,
    zipCode: DataTypes.STRING,
    dob: DataTypes.DATE,
    formerEmployer: DataTypes.STRING,
    formerEmployerPhone: DataTypes.STRING,
})

module.exports = candidate;

