'use strict';

const express = require('express');
const router = new express.Router();
const VariableCost = require('../db/models').VariableCost;

router.get('/', (req, res, next) => {

  VariableCost.findAll({
    // order:
    // [['dollarPerMile', 'DESC']]
  })
    .then( variablecost => res.json( variablecost ))
    .catch( next )
})

module.exports = router;
