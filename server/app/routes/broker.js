'use strict';

const express = require('express');
const router = new express.Router();
const Broker = require('../db/models').Broker;

router.get('/', (req, res, next) => {
  Broker.findAll({
    order:
      [['name', 'ASC']]
  })
    .then( brokers => res.json( brokers ))
    .catch( next )
})

module.exports = router;
