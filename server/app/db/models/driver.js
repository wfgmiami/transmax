'use strict';

const db = require('../db');
const DataTypes = db.Sequelize;

const Driver = db.define('driver', {
    driverId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: true
    },
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
      type: DataTypes.STRING,
      allowNull: false
    },
    address: {
      type: DataTypes.TEXT
    },
    currentRate: {
      type: DataTypes.DECIMAL
    },
    earnings: {
      type: DataTypes.DECIMAL
    },
    employedBy: {
        type: DataTypes.STRING
    }


})

module.exports = Driver;

