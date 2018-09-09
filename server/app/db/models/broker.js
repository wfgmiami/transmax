'use strict';

const db = require('../db');
const DataTypes = db.Sequelize;

const Broker = db.define('broker', {
    brokerName: DataTypes.STRING,
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
    totalOrder: {
      type: DataTypes.DECIMAL
    }


})

module.exports = Broker;
