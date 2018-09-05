'use strict';
const path = require('path');
const db = require('./db');
const chalk = require('chalk');
const APENCHEV_PASS = require(path.join(__dirname, '../../env')).APENCHEV_PASS;
const AKARAPEEV_PASS = require(path.join(__dirname, '../../env')).AKARAPEEV_PASS;

// Require our models. Running each module registers the model into sequelize
// so any other part of the application can simply call sequelize.model('User')
// to get access to the User model.
const User = require('./models').User;

const users = [
  { userName: 'apenchev', password: APENCHEV_PASS },
  { userName: 'akarapeev', password: AKARAPEEV_PASS }
]
// Syncing all the models at once. This promise is used by main.js.
module.exports = db.sync({ force: true })
  .then( () => console.log(chalk.yellow('Beginning seed ')))
  .then( () => Promise.all(users.map( user => User.create( user ))))
  .then( () => console.log(chalk.green('Sequelize models synced to PostgreSQL')))


// module.exports = syncedDbPromise;
