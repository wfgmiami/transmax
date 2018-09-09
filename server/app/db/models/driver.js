'use strict';

const db = require('../db');
const DataTypes = db.Sequelize;

const Driver = db.define('driver', {
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    ssn: {
      type: DataTypes.STRING,
      allowNull: false
    },
    driversLicense: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        unique: true,
    },
    phone: {
        type: DataTypes.STRING
    },
    hireDate: {
      type: DataTypes.DATE,
      allowNull: false
    },
    address: {
      type: DataTypes.TEXT
    },
    earnings: {
      type: DataTypes.DECIMAL
    }


})

module.exports = Driver;
