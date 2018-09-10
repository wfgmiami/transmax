'use strict';

const express = require('express');
const router = new express.Router();
const Trip = require('../db/models').Trip;

router.get('/', (req, res, next) => {
  console.log('HITTTING ROUTE GET............',req)
  Trip.findAll({})
    .then( trips => res.json( trips ))
    .catch( next )
})

module.exports = router;
