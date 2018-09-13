'use strict';

const express = require('express');
const router = new express.Router();
const Shipment = require('../db/models').Shipment;

router.get('/', (req, res, next) => {
  Shipment.findAll({
    order:
    [['bookDate', 'ASC']]
  })
    .then( shipments => res.json( shipments ))
    .catch( next )
})

module.exports = router;
