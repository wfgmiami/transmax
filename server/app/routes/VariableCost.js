'use strict';

const express = require('express');
const router = new express.Router();
const VariableCost = require('../db/models').VariableCost;

router.get('/', (req, res, next) => {

  VariableCost.findAll({
    order:
    [['dollarPerMile', 'DESC']]
  })
    .then( variablecost => res.json( variablecost ))
    .catch( next )
})

router.post('/', (req, res, next) => {
  // console.log('post variableCost', req.body)
  VariableCost.findById(req.body.row._original.id)
    .then( variableCost => {
      if(!variableCost){
        return res.status(404).send({
          message: "Variable Cost Not Found"
        })
      }
      return variableCost.update({
        costName: req.body.row._original.costName,
        dollarPerMile: req.body.row._original.dollarPerMile,
      })
      .then( () => res.status(200).send(variableCost))
      .catch( (error) => res.status(400).send(error))
    })

})

module.exports = router;
