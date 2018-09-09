'use strict';

const db = require('../db');
const DataTypes = db.Sequelize;

const Shipment = db.define('shipment', {
    brokerName: DataTypes.STRING,
    loadNumber: {
      type: DataTypes.STRING,
      allowNull: false
    },
    pickupAddress: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    dropoffAddress: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    miles: {
      type: DataTypes.INTEGER
    },
    weight: {
      type: DataTypes.INTEGER
    },
    lumper: {
      type: DataTypes.DECIMAL
    }




})

module.exports = Shipment;
