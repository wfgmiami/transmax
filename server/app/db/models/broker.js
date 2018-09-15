'use strict';

const db = require('../db');
const DataTypes = db.Sequelize;

const Broker = db.define('broker', {
    brokerId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    name: DataTypes.STRING,
    email: {
        type: DataTypes.STRING,
        // unique: true,
    },
    phone: {
        type: DataTypes.STRING
    },
    address: {
      type: DataTypes.TEXT
    },
    bookedLoads: {
        type: DataTypes.INTEGER
    },
    totalBooked: {
      type: DataTypes.DECIMAL
    },
    totalMiles: {
      type: DataTypes.INTEGER
    },
    avgDollarPerMile: {
      type: DataTypes.DECIMAL
    },


})

module.exports = Broker;


