'use strict';

const express = require('express');
const router = new express.Router();
const InputsVariableCost = require('../db/models').InputsVariableCost;

router.get('/', (req, res, next) => {

  InputsVariableCost.findAll({
    // order:
    // [['dollarPerMile', 'DESC']]
  })
    .then( inputsvariablecost => res.json( inputsvariablecost ))
    .catch( next )
})

router.post('/', (req, res, next) => {
  // console.log('post InputsVariableCost', req.body)
  InputsVariableCost.findById(req.body.id)
    .then( inputsVariableCost => {
      if(!inputsVariableCost){
        return res.status(404).send({
          message: "Inputs Variable Cost Not Found"
        })
      }
      return inputsVariableCost.update({
        driverpayDollarPerMile: req.body.driverpayDollarPerMile,
        dieselppg: req.body.dieselppg,
        mpg: req.body.mpg,
        defppg:req.body.defppg,
        defConsumptionRate: req.body.defConsumptionRate,
        oilChangeMiles: req.body.oilChangeMiles,
        oilChangeCost: req.body.oilChangeCost,
        truckTiresChangeMiles: req.body.truckTiresChangeMiles,
        truckTiresChangeCost: req.body.truckTiresChangeCost,
        trailerTiresChangeMiles: req.body.trailerTiresChangeMiles,
        trailerTiresChangeCost: req.body.trailerTiresChangeCost,
        dispatchPercent: req.body.dispatchPercent
      })
      .then( () => res.status(200).send(inputsVariableCost))
      .catch( (error) => res.status(400).send(error))
    })

})


module.exports = router;
