'use strict';

const express = require('express');
const router = new express.Router();
const { Trip } = require('../db/models');

router.get('/', (req, res, next) => {
  Trip.findAll({})
    .then( trips => res.json( trips ))
    .catch( next )
})

module.exports = router;