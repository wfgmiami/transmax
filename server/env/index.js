/* eslint-disable global-require */

var path = require('path');
var devConfigPath = path.join(__dirname, './development.js');
var productionConfigPath = path.join(__dirname, './production.js');

if (process.env.NODE_ENV === 'production') {
  console.log("production: ", productionConfigPath)
  module.exports = require(productionConfigPath);
} else {
  console.log("dev: ", devConfigPath)
  module.exports = require(devConfigPath);
}
