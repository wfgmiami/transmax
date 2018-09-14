'use strict';

const db = require('../db');
const DataTypes = db.Sequelize;

const Truck = db.define('truck', {
    model: DataTypes.STRING,
    year: DataTypes.STRING,
    dateAquired: DataTypes.STRING,
    pricePaid: DataTypes.INTEGER,
    milesAquired: DataTypes.INTEGER,
    maintenanceDate: DataTypes.STRING,
    maintenanceType: DataTypes.TEXT,
    maintenanceCost: DataTypes.INTEGER,
    repairDate: DataTypes.STRING,
    repairType: DataTypes.TEXT,
    repairCost: DataTypes.INTEGER,

})

module.exports = Truck;

