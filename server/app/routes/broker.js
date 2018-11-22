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

router.post('/', (req, res, next) => {

  const brokerId = req.body.id;

  Broker.findOne({
    where: { id: brokerId },
  })
  .then( broker => {
    if(!broker){
      return res.status(404).send({
        message: "Broker Not Found"
      })
    }

    let updateBroker = {
      address: req.body.address,
      phone: req.body.phone,
      email: req.body.email
    }

    console.log('** BROKER TO UPDATE ', broker, "** UPDATED_BROKER", updateBroker)

    broker.updateAttributes(updateBroker)
    .then( broker => {
      console.log('*** UPDATED BROKER ', broker);
      res.json( broker.dataValues )
    })
    .catch( (error) => res.status(400).send(error))
  })

})

module.exports = router;
