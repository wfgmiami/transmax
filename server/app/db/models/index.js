'use strict';

// Require our models. Running each module registers the model into sequelize
// so any other part of the application could call sequelize.model('Song')
// to get access to the Song model.

const Candidate = require('./candidate');
const User = require('./user');
const Driver = require('./driver');
const Truck = require('./truck');
const Broker = require('./broker');
const Company = require('./company');
const Load = require('./load');
const Earning = require('./earning');
const FixedCost = require('./fixedCost');
const VariableCost = require('./variableCost');
const InputsVariableCost = require('./inputsVariableCost');

// Form the associations

Broker.hasMany(Load);
Load.belongsTo(Broker);

Driver.hasMany(Load);
Load.belongsTo(Driver);

Truck.hasMany(Load);
Load.belongsTo(Truck);

Company.hasMany(Truck);
Truck.belongsTo(Company);

// Trip.belongsToMany(Shipment, { through: 'loadNumber' });
// Shipment.belongsToMany(Trip, { through: 'loadNumber' });


module.exports = {
    Candidate: Candidate,
    User: User,
    Broker: Broker,
    Driver: Driver,
    Company: Company,
    Truck: Truck,
    Broker: Broker,
    Load: Load,
    Earning: Earning,
    FixedCost: FixedCost,
    VariableCost: VariableCost,
    InputsVariableCost: InputsVariableCost
};
