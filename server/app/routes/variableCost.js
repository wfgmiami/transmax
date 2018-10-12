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
  const variableCosts = req.body;

  async function processCost (variableCosts)  {
    await Promise.all(variableCosts.map(async cost => {
      const response = await VariableCost.findById(cost.id);
      return await response.update({
                id: cost.id,
                costName: cost.costName,
                dollarPerMile: cost.dollarPerMile,
              })
    }))
    .then( (updatedCosts) => res.status(200).send(updatedCosts))
    .catch( (error) => res.status(400).send(error))

  }
  processCost(variableCosts)

})

module.exports = router;
