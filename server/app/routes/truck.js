'use strict';

const express = require('express');
const router = new express.Router();
const Truck = require('../db/models').Truck;
const Company = require('../db/models').Company;

router.get('/', (req, res, next) => {
  Truck.findAll({
    include:[{
      model: Company,
      order:
      [['truckId', 'ASC']]
    }]
  })
    .then( trucks => res.json( trucks ))
    .catch( next )
})

module.exports = router;
