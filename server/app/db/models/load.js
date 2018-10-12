'use strict';

const db = require('../db');
const DataTypes = db.Sequelize;

const Load = db.define('load', {
    pickupDate: {
        type: DataTypes.DATE,
        allowNull: false

    },
    driverName: {
        type: DataTypes.STRING,
    },
    loadNumber: {
        type: DataTypes.STRING,
        allowNull: false
    },
    brokerName: {
        type: DataTypes.STRING,
    },
    shipper: {
        type: DataTypes.STRING,
    },
    consignee: {
        type: DataTypes.STRING,
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
        type: DataTypes.DECIMAL,
        allowNull: false
    },
    loadedMiles: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    emptyMiles: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    mileage: {
        type: DataTypes.INTEGER,
    },
    dollarPerMile: {
        type: DataTypes.DECIMAL,
    },
    fuelCost: {
        type: DataTypes.DECIMAL,
    },
    driverPay: {
        type: DataTypes.DECIMAL,
    },
    dispatchFee: {
        type: DataTypes.DECIMAL,
    },
    lumper: {
        type: DataTypes.DECIMAL,
    },
    detention: {
        type: DataTypes.DECIMAL,
    },
    detentionDriverPay: {
        type: DataTypes.DECIMAL,
    },
    secondStopDriverPay: {
        type: DataTypes.DECIMAL,
    },
    lateFee: {
        type: DataTypes.DECIMAL,
    },
    toll: {
        type: DataTypes.DECIMAL,
    },
    roadMaintenance: {
        type: DataTypes.DECIMAL,
    },
    otherExpenses: {
        type: DataTypes.DECIMAL,
    },
    totalExpenses: {
        type: DataTypes.DECIMAL,
    },
    profit: {
        type: DataTypes.DECIMAL,
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

module.exports = Load;
