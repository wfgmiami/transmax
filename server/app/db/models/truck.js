'use strict';

const db = require('../db');
const DataTypes = db.Sequelize;

const Truck = db.define('truck', {
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true
    },
    model: DataTypes.STRING,
    year: DataTypes.STRING,
    purchaseDate: DataTypes.STRING,
    purchasePrice: DataTypes.INTEGER,
    originalMiles: DataTypes.INTEGER,
    maintenanceDate: DataTypes.STRING,
    maintenanceType: DataTypes.TEXT,
    maintenanceCost: DataTypes.INTEGER,
    repairDate: DataTypes.STRING,
    repairType: DataTypes.TEXT,
    repairCost: DataTypes.INTEGER,
    companyId: DataTypes.INTEGER

})

module.exports = Truck;
