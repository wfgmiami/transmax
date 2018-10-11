'use strict';

const db = require('../db');
const DataTypes = db.Sequelize;

const InputsVariableCost = db.define('inputsvariablecost', {
  driverpayDollarPerMile: {
        type: DataTypes.DECIMAL,
    },
  dieselppg: DataTypes.DECIMAL,
  mpg: DataTypes.DECIMAL,
  defppg: DataTypes.DECIMAL,
  defConsumptionRate: DataTypes.DECIMAL,
  oilChangeMiles: DataTypes.INTEGER,
  oilChangeCost: DataTypes.INTEGER,
  truckTiresChangeMiles: DataTypes.INTEGER,
  truckTiresChangeCost: DataTypes.INTEGER,
  trailerTiresChangeMiles: DataTypes.INTEGER,
  trailerTiresChangeCost: DataTypes.INTEGER,
  dispatchPercent: DataTypes.DECIMAL,
})

module.exports = InputsVariableCost;

