const path = require('path');
const APENCHEV_PASS = require(path.join(__dirname, '../../env')).APENCHEV_PASS;
const AKARAPEEV_PASS = require(path.join(__dirname, '../../env')).AKARAPEEV_PASS;

const users = [
  { userName: 'apenchev', password: APENCHEV_PASS },
  { userName: 'akarapeev', password: AKARAPEEV_PASS }
]

module.exports = users;
