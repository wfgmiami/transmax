'use strict';

const db = require('../db');
const DataTypes = db.Sequelize;

const Shipment = db.define('shipment', {
    bookDate: {
      type: DataTypes.STRING,
      allowNull: false
    },
    brokerName: DataTypes.STRING,
    loadNumber: {
      type: DataTypes.STRING,
      allowNull: false
    },
    pickUpCityState: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    dropOffCityState: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    pickUpAddress: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    dropOffAddress: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    payment: {
      type: DataTypes.DECIMAL
    },
    miles: {
      type: DataTypes.INTEGER
    },
    commodity: {
      type: DataTypes.TEXT,
    },
    weight: {
      type: DataTypes.INTEGER
    },
    trailer: {
      type: DataTypes.TEXT,
    },
    confirmFilePath: {
      type: DataTypes.STRING
    }
})

module.exports = Shipment;


