'use strict';

const express = require('express');
const router = new express.Router();
const Earning = require('../db/models').Earning;
// const Truck = require('../db/models').Truck;
// const Company = require('../db/models').Company;
// const Driver = require('../db/models').Driver;

router.get('/', (req, res, next) => {
  Earning.findAll({
    order:
    [['weekNumber', 'ASC']]
  })
    .then( earnings => res.json( earnings ))
    .catch( next )
})


module.exports = router;
