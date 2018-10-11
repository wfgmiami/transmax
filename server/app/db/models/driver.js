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

    },
    driversLicense: {
      type: DataTypes.STRING,

    },
    email: {
        type: DataTypes.STRING,
    },
    phone: {
        type: DataTypes.STRING
    },
    hireDate: {
      type: DataTypes.STRING,

    },
    dob: {
      type: DataTypes.STRING,

    },
    streetAddress: {
      type: DataTypes.TEXT
    },
    city: {
      type: DataTypes.STRING
    },
    state: {
      type: DataTypes.STRING
    },
    zipCode: {
      type: DataTypes.STRING
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


