'use strict';

const db = require('../db');
const DataTypes = db.Sequelize;

const Earning = db.define('earning', {
    weekNumber: {
      type: DataTypes.STRING,
    },
    begWeekDate: {
        type: DataTypes.DATE,
    },
    endWeekDate: {
      type: DataTypes.DATE,
    },
    weekRange: {
        type: DataTypes.STRING,
    },
    revenue: {
      type: DataTypes.DECIMAL,
    },
    fuelCost: {
        type: DataTypes.DECIMAL,
    },
    milesPaid: {
      type: DataTypes.INTEGER,
    },
    driverPay: {
        type: DataTypes.DECIMAL,
    },
    dispatchFee: {
        type: DataTypes.DECIMAL,
    },
    toll: {
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
    operatingMargin: {
        type: DataTypes.DECIMAL,
    },
    docFilePath: {
        type: DataTypes.STRING
    }

})

module.exports = Earning;
