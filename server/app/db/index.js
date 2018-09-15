'use strict';
const path = require('path');
const db = require('./db');
const chalk = require('chalk');

// Require our models. Running each module registers the model into sequelize
// so any other part of the application can simply call sequelize.model('User')
// to get access to the User model.
const User = require('./models').User;
const Trip = require('./models').Trip
const Shipment = require('./models').Shipment;
const Driver = require('./models').Driver;
const Company = require('./models').Company;
const Broker = require('./models').Broker;
const Truck = require('./models').Truck;
const trips = require('./tripsSeed');
const users = require('./usersSeed');
const shipments = require('./shipmentsSeed');
const drivers = require('./driversSeed');
const companies = require('./companiesSeed');
const brokers = require('./brokersSeed');
const trucks = require('./trucksSeed');

// Syncing all the models at once. This promise is used by main.js.
module.exports = db.sync({ force: true })
  .then( () => console.log(chalk.yellow('Beginning seed ')))
  .then( () => Promise.all(users.map( user => User.create( user ))))
  .then( () => Promise.all(trips.map( trip => Trip.create( trip ))))
  .then( () => Promise.all(shipments.map( shipment => Shipment.create( shipment ))))
  .then( () => Promise.all(drivers.map( driver => Driver.create( driver ))))
  .then( () => Promise.all(companies.map( company => Company.create( company ))))
  .then( () => Promise.all(brokers.map( broker => Broker.create( broker ))))
  .then( () => Promise.all(trucks.map( truck => Truck.create( truck ))))
  .then( () => console.log(chalk.green('Sequelize models synced to PostgreSQL')))


// module.exports = syncedDbPromise;
