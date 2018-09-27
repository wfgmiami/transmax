'use strict';

const express = require('express');
const router = new express.Router();
const FixedCost = require('../db/models').FixedCost;

router.get('/', (req, res, next) => {

  FixedCost.findAll({
    order:
    [['monthlyAmount', 'DESC']]
  })
    .then( fixedcost => res.json( fixedcost ))
    .catch( next )
})

module.exports = router;
