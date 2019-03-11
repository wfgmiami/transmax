'use strict';

const express = require('express');
const router = new express.Router();
const Load = require('../db/models').Load;
const Broker = require('../db/models').Broker;
const Truck = require('../db/models').Truck;
const Company = require('../db/models').Company;


router.post('/newload', (req, res, next) => {
  const loadObj = req.body;
  console.log('*** routes newLoad req.body: ', loadObj)

//new load with new broker - first create broker with and id, then Load can be created
  if(!loadObj.brokerId){
    console.log('brokerName ', loadObj.brokerName);
    Broker.create({
      name: loadObj.brokerName,
    })
    .then( broker => {
      console.log('broker ', broker, " Brokerid ", broker.dataValues.id, 'LOAD-OBJ: ', loadObj);
      loadObj.brokerId = broker.dataValues.id;

      return broker.update({
        bookedLoads: 1,
        totalPayment: Number(loadObj.payment),
        totalLoadedMiles: Number(loadObj.loadedMiles),
        address: "",
        phone: "",
        email: "",
        avgDollarPerMile: 0
      })
      .then( () => {
        return Load.create(loadObj)
      })
      .then( load => {
        console.log('*** new load with NEW broker- load ', load);
        res.json( load )
      })
      .catch( (error) => res.status(400).send(error))
    })
    .catch( error => res.status(400).send(error))

// new load with existing broker
  }else{
    Broker.findOne({
      where: { id: loadObj.brokerId},
    })
    .then( broker => {
      const updateBroker = {
        bookedLoads: Number(broker.bookedLoads) + 1,
        totalPayment: Number(broker.totalPayment) +
          loadObj.payment,
        totalLoadedMiles: Number(broker.totalLoadedMiles) +
          loadObj.loadedMiles
      }
      console.log('*** new load with EXISTING broker: BROKER ', broker, 'UPDATEBROKER: ', updateBroker, 'LOADOBJ ', loadObj);

      return broker.update(updateBroker)
      .then( () => {
        return Load.create(loadObj)
      })
      .then( load => {
        console.log('*** new load with EXISTING broker- load ', load);
        res.json( load )
      })
      .catch( (error) => res.status(400).send(error))

    })

  }

})

module.exports = router;
