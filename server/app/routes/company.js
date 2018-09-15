'use strict';

const express = require('express');
const router = new express.Router();
const Company = require('../db/models').Company;

router.get('/', (req, res, next) => {
  Company.findAll({
    order:
      [['name', 'ASC']]
  })
    .then( companies => res.json( companies ))
    .catch( next )
})

module.exports = router;
