'use strict';
/* eslint-disable global-require */
const path = require('path');
const NODE_ENV = require(path.join(__dirname, '/server/env')).NODE_ENV;
const chalk = require('chalk');
const app = require('./server/app');
const server = require('http').createServer();
const httpServer = require('http');
const httpsServer = require('https');
let credentials = {};

if( NODE_ENV === 'production'){
	const fs = require('fs');
	const key = fs.readFileSync('/home/ubuntu/letsencrypt/config/live/transmaxfleet.com/privkey.pem');
	const cert = fs.readFileSync('/home/ubuntu/letsencrypt/config/live/transmaxfleet.com/fullchain.pem');
	const ca = fs.readFileSync('/home/ubuntu/letsencrypt/config/live/transmaxfleet.com/chain.pem');
	credentials = {key: key, cert: cert, ca: ca};
}


// Requires in ./db/index.js -- which returns a promise that represents
// sequelize syncing its models to the postgreSQL database.
const startDb = require('./server/app/db');

// Create a node server instance! cOoL!

const createApplication = () => {

	server.on('request', app); // Attach the Express application.
};

const startServer = () => {

	const httpPORT = process.env.HTTPPORT || 3000;
	httpServer.createServer(app).listen(httpPORT, () => {
        console.log(chalk.blue('Server started on port ', chalk.magenta(httpPORT)));
    });

	if( NODE_ENV === 'production'){
		const httpsPORT = process.env.HTTPSPORT || 8443;
		httpsServer.createServer(credentials,app).listen(httpsPORT, () => {
			console.log(chalk.blue('Server started on port ', chalk.magenta(httpsPORT)));
		});
	}
/*
	const PORT = process.env.PORT || 3000;
   	server.listen(PORT, () => {
    	console.log(chalk.blue('Server started on port ', chalk.magenta(PORT)));
    });
*/
};


startDb
//.then(createApplication)
.then(startServer)
.catch(function (err) {
    console.error(chalk.red(err.stack));
    process.exit(1);
});
