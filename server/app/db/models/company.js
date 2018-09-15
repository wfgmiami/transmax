'use strict';

const db = require('../db');
const DataTypes = db.Sequelize;

const Company = db.define('company', {
    taxId: {
      type: DataTypes.STRING,
      allowNull: false
    },
    name: DataTypes.STRING,
    foundedDate: DataTypes.STRING,
    incorporatedState: DataTypes.STRING,
    email: {
      type: DataTypes.STRING,
      unique: true,
    },
    phone: {
      type: DataTypes.STRING
    },
    address: {
      type: DataTypes.TEXT
    },
    numberOfTrucks: {
      type: DataTypes.INTEGER
    },
    numberOfTrailers: {
      type: DataTypes.INTEGER
    },
    numberOfEmployees: {
      type: DataTypes.INTEGER
    }

})

module.exports = Company;

