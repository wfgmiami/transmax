'use strict';

// Require our models. Running each module registers the model into sequelize
// so any other part of the application could call sequelize.model('Song')
// to get access to the Song model.

const Candidate = require('./candidate');
const User = require('./user');
const Trip = require('./trip');
const Shipment = require('./shipment');
const Driver = require('./driver');
const Truck = require('./truck');
const Broker = require('./broker');
const Company = require('./company');

// Form the associations

Broker.hasMany(Trip);
Trip.belongsTo(Broker);

Broker.hasMany(Shipment);
Shipment.belongsTo(Broker);

Driver.hasMany(Trip);
Trip.belongsTo(Driver);

Trip.belongsToMany(Shipment, { through: 'loadNumber' });
Shipment.belongsToMany(Trip, { through: 'loadNumber' });


module.exports = {
    Candidate: Candidate,
    User: User,
    Trip: Trip,
    Broker: Broker,
    Driver: Driver,
    Shipment: Shipment,
    Company: Company,
    Truck: Truck,
    Broker: Broker
};
