'use strict';
const path = require('path');
const db = require('./db');
const chalk = require('chalk');

// Require our models. Running each module registers the model into sequelize
// so any other part of the application can simply call sequelize.model('User')
// to get access to the User model.
const User = require('./models').User;
const Trip = require('./models').Trip;
const trips = require('./trips');
const users = require('./users');


// Syncing all the models at once. This promise is used by main.js.
module.exports = db.sync({ force: true })
  .then( () => console.log(chalk.yellow('Beginning seed ')))
  .then( () => Promise.all(users.map( user => User.create( user ))))
  .then( () => Promise.all(trips.map( trip => Trip.create( trip ))))
  .then( () => console.log(chalk.green('Sequelize models synced to PostgreSQL')))


// module.exports = syncedDbPromise;
