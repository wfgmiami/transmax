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

router.post('/', (req, res, next) => {
  console.log('post', req.body, req.body.row._original)
  FixedCost.findById(req.body.row._original.id)
    .then( fixedCost => {
      if(!fixedCost){
        return res.status(404).send({
          message: "Fixed Cost Not Found"
        })
      }
      return fixedCost.update({
        costName: req.body.row._original.costName,
        monthlyAmount: req.body.row._original.monthlyAmount,
        yearlyAmount: req.body.row._original.yearlyAmount
      })
      .then( () => res.status(200).send(fixedCost))
      .catch( (error) => res.status(400).send(error))
    })

})

module.exports = router;
