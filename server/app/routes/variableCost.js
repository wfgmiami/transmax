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
  console.log('post variableCost', req.body)
  const variableCosts = req.body;
  // for( let cost of req.body ){
  //   console.log('cost', cost)
  //   VariableCost.findById(cost.id)
  //     .then( variableCost => {
  //       if(!variableCost){
  //         return res.status(404).send({
  //           message: "Variable Cost Not Found"
  //         })
  //       }
  //       variableCost.update({
  //         id: cost.id,
  //         costName: cost.costName,
  //         dollarPerMile: cost.dollarPerMile,
  //       })
  //     })
  // }

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

  // for( let i = 0; i < req.body.length; i++ ){
  //   VariableCost.findById(cost.id)
  //     .then( variableCost => {
  //       if(!variableCost){
  //         return res.status(404).send({
  //           message: "Variable Cost Not Found"
  //         })
  //       }
  //       variableCost.update({
  //         costName: req.body.costName,
  //         dollarPerMile: req.body.dollarPerMile,
  //       })
  //     })

  // }


})

module.exports = router;
