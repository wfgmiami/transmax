'use strict';

const db = require('../db');
const DataTypes = db.Sequelize;

const VariableCost = db.define('variablecost', {
    costName: {
        type: DataTypes.STRING,
        allowNull: false,
        // unique: true
    },
    dollarPerMile: DataTypes.DECIMAL,


})

module.exports = VariableCost;


