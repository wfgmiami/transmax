'use strict';

const db = require('../db');
const DataTypes = db.Sequelize;

const FixedCost = db.define('fixedcost', {
    costName: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    monthlyAmount: DataTypes.DECIMAL,
    yearlyAmount: {
      type: DataTypes.DECIMAL
    },

})

module.exports = FixedCost;


