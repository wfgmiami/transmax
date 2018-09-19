'use strict';

const express = require('express');
const router = new express.Router();
const Load = require('../db/models').Load;
const Truck = require('../db/models').Truck;
const Company = require('../db/models').Company;
const Driver = require('../db/models').Driver;

router.get('/', (req, res, next) => {
  Load.findAll({
    include: [{
      model: Truck,
      include: [{
        model: Company
      }],
      order:
      [['bookDate', 'ASC']]
    }],

  })
    .then( loads => res.json( loads ))
    .catch( next )
})

router.get( '/daterange', ( req, res, next ) => {
  const startDate = new Date(req.query.startDate);
  const endDate = new Date(req.query.endDate);

  // console.log( 'daterange: ', startDate, endDate);
  Load.findAll({
    where: {
      bookDate: {
        "$between": [startDate, endDate]
      }
    },
    include: [{
      model: Truck,
      include: [{
        model: Company
      }],
      order:
      [['bookDate', 'ASC']]
    }],

  })
    .then( loads => res.json( loads ))
    .catch( next )
})

module.exports = router;
