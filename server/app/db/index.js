'use strict';
const path = require('path');
const db = require('./db');
const chalk = require('chalk');

// Require our models. Running each module registers the model into sequelize
// so any other part of the application can simply call sequelize.model('User')
// to get access to the User model.

const User = require('./models').User;
const Load = require('./models').Load
const Driver = require('./models').Driver;
const Company = require('./models').Company;
const Broker = require('./models').Broker;
const Truck = require('./models').Truck;
const Earning = require('./models').Earning;
const FixedCost = require('./models').FixedCost;
const VariableCost = require('./models').VariableCost;
const InputsVariableCost = require('./models').InputsVariableCost;

const users = require('./usersSeed');
const drivers = require('./driversSeed');
const companies = require('./companiesSeed');
const brokers = require('./brokersSeed');
const trucks = require('./trucksSeed');
const loads = require('./loadsSeed');
const earnings = require('./earningsSeed');
const fixedcost = require('./fixedCostSeed');
const variablecost = require('./variableCostSeed');
const inputsvariablecost = require('./inputsVariableCostSeed');

// Syncing all the models at once. This promise is used by main.js.
module.exports = db.sync()
// module.exports = db.sync({ force: true })
//   .then( () => console.log(chalk.yellow('Beginning seed ')))
//   .then( () => Promise.all(users.map( user => User.create( user ))))
//   .then( () => Promise.all(brokers.map( broker => Broker.create( broker ))))
//   .then( () => Promise.all(drivers.map( driver => Driver.create( driver ))))
//   .then( () => Promise.all(companies.map( company => Company.create( company ))))
//   .then( () => Promise.all(fixedcost.map( fixedcost => FixedCost.create( fixedcost ))))
//   .then( () => Promise.all(variablecost.map( variablecost => VariableCost.create( variablecost ))))
//   .then( () => Promise.all(inputsvariablecost.map( inputsvariablecost => InputsVariableCost.create( inputsvariablecost ))))
//   .then( () => Promise.all(trucks.map( truck => Truck.create( truck ))))
//   .then( () => console.log(chalk.green('Sequelize models synced before LOADS')))
//   .then( () => Promise.all(loads.map( load => Load.create( load ))))
//   .then( () => Promise.all(earnings.map( earning => Earning.create( earning ))))
//   .then( () => console.log(chalk.green('Sequelize models synced to PostgreSQL')))


