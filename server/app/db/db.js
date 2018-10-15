'use strict';
const path = require('path');
const chalk = require('chalk');
const Sequelize = require('sequelize');
const DATABASE_HOST = require(path.join(__dirname, '../../env')).DATABASE_HOST;
const DATABASE_NAME = require(path.join(__dirname, '../../env')).DATABASE_NAME;
const DATABASE_PASSWORD = require(path.join(__dirname, '../../env')).DATABASE_PASSWORD;
const DATABASE_USERNAME = require(path.join(__dirname, '../../env')).DATABASE_USERNAME;
const DATABASE_URI = require(path.join(__dirname, '../../env')).DATABASE_URI;


// create the database instance

if(!DATABASE_HOST){
	console.log(chalk.yellow('Opening connection to PostgreSQL:', DATABASE_URI))
	module.exports = new Sequelize(DATABASE_URI, {
		logging: false, // set to console.log to see the raw SQL queries
		// native: true // lets Sequelize know we can use pg-native for ~30% more speed
	});

}else{
	console.log(chalk.yellow('Opening connection to PostgreSQL:', DATABASE_HOST, 'pass', DATABASE_PASSWORD, DATABASE_USERNAME, DATABASE_NAME));
	module.exports = new Sequelize(DATABASE_NAME, DATABASE_USERNAME, DATABASE_PASSWORD, {
		host: DATABASE_HOST,
		port: 5432,
		logging: console.log,
		maxConcurrentQueries: 100,
		dialect: 'postgres',
		dialectOptions: {
			ssl:'Amaxon RDS'
		},
		pool: {maxConnections: 5, maxIdleTime: 30},
		language: 'en'
	})

}



