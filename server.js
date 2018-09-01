'use strict';
/* eslint-disable global-require */
const chalk = require('chalk');
const app = require('./server/app');
const server = require('http').createServer();

// Requires in ./db/index.js -- which returns a promise that represents
// sequelize syncing its models to the postgreSQL database.
const startDb = require('./server/app/db');

// Create a node server instance! cOoL!

const createApplication = () => {
    server.on('request', app); // Attach the Express application.
};

const startServer = () => {
    var PORT = process.env.PORT || 5000;

    server.listen(PORT, () => {
        console.log(chalk.blue('Server started on port', chalk.magenta(PORT)));
    });
};

startDb
.then(createApplication)
.then(startServer)
.catch(function (err) {
    console.error(chalk.red(err.stack));
    process.exit(1);
});
