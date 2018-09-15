'use strict';

const express = require('express');
const router = new express.Router();
const Truck = require('../db/models').Truck;

router.get('/', (req, res, next) => {
  Truck.findAll({
    order:
      [['truckId', 'ASC']]
  })
    .then( trucks => res.json( trucks ))
    .catch( next )
})

module.exports = router;
