'use strict';

const db = require('../db');
const DataTypes = db.Sequelize;

const MultiStopLoad = db.define('mutlistopload', {
    loadId: {
        type: DataTypes.DATE,
        allowNull: false
    },
    secondShipper: {
        type: DataTypes.TEXT,
    },
    secondConsignee: {
        type: DataTypes.TEXT,
    },
    secondPickUpCityState: {
        type: DataTypes.TEXT,
      },
    secondDropOffCityState: {
        type: DataTypes.TEXT,
    },
    secondPickUpAddress: {
        type: DataTypes.TEXT,
    },
    secondDropOffAddress: {
        type: DataTypes.TEXT,
    },

})

module.exports = MultiStopLoad;
