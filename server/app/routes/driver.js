'use strict';

const express = require('express');
const router = new express.Router();
const Driver = require('../db/models').Driver;

router.get('/', (req, res, next) => {
  Driver.findAll({
    order:
    [['firstName', 'ASC']]
  })
    .then( drivers => res.json( drivers ))
    .catch( next )
})

module.exports = router;
