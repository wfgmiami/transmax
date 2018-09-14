'use strict';

const db = require('../db');
const DataTypes = db.Sequelize;

const Company = db.define('broker', {
    companyName: DataTypes.STRING,
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
    trucksOwned: {
      type: DataTypes.INTEGER
    },
    trailersOwned: {
      type: DataTypes.INTEGER
    },
    employeeNumber: {
      type: DataTypes.INTEGER
    }

})

module.exports = Company;
