'use strict';

const db = require('../db');
const DataTypes = db.Sequelize;

const Trip = db.define('trip', {
    bookDate: {
        type: DataTypes.STRING,
        allowNull: false

    },
    truckId: {
        type: DataTypes.STRING,
        allowNull: false
    },
    driverId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    driverName: {
        type: DataTypes.STRING,
    },
    loadNumber: {
        type: DataTypes.STRING,
        allowNull: false
    },
    brokeId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    brokerName: {
        type: DataTypes.STRING,

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
    dieselPrice: {
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
    confirmFilePath: {
        type: DataTypes.STRING
    }

})

module.exports = Trip;
