'use strict';

// Require our models. Running each module registers the model into sequelize
// so any other part of the application could call sequelize.model('Song')
// to get access to the Song model.

const Candidate = require('./candidate');
const User = require('./user');
const Trip = require('./trip');
const Broker = require('./broker');
const Driver = require('./driver');
const Shipment = require('./shipment');

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
    Shipment: Shipment
};
