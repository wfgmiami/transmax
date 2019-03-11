'use strict';

const express = require('express');
const router = new express.Router();
const Load = require('../db/models').Load;
const Broker = require('../db/models').Broker;
const Truck = require('../db/models').Truck;
const Company = require('../db/models').Company;

router.get('/', (req, res, next) => {
  Load.findAll({
    include: [{
      model: Truck,
      include: [{
        model: Company
      }],
    }],
    order:
      [['pickupDate', 'ASC']]
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
      pickupDate: {
        "$between": [startDate, endDate]
      }
    },
    include: [{
      model: Truck,
      include: [{
        model: Company
      }],
      order:
      [['pickupDate', 'ASC']]
    }],

  })
    .then( loads => res.json( loads ))
    .catch( next )
})

router.delete('/deleteload/:loadId', (req, res, next) => {
  let brokerId = 0;
  let bookedLoads = 0;
  let totalPayment = 0;
  let totalLoadedMiles = 0;
  let deletedPayment = 0;
  let deletedLoadedMiles = 0;

  Load.findOne({
    where:{
      id: req.params.loadId
    },
    include: [{
      model: Broker
    }]
  })
  .then( loadPlusBroker => {
    brokerId = loadPlusBroker.broker.dataValues.id;
    bookedLoads = loadPlusBroker.broker.dataValues.bookedLoads;
    deletedPayment = Number(loadPlusBroker.dataValues.payment);
    deletedLoadedMiles = Number(loadPlusBroker.dataValues.loadedMiles);

    if(bookedLoads > 1){
      totalPayment = Number(loadPlusBroker.broker.dataValues.totalPayment);
      totalLoadedMiles = Number(loadPlusBroker.broker.dataValues.totalLoadedMiles);
    }

    Load.destroy({
      where: {
        id: req.params.loadId
      }
    })
    .then( (d) => {

      console.log('loadPlus broker ', brokerId, ".......", bookedLoads, "...........", totalPayment,
      "..............", d, "..............", loadPlusBroker)

      if (bookedLoads > 1) {

        const updateBroker = {
          bookedLoads: bookedLoads - 1,
          totalPayment: totalPayment - deletedPayment,
          totalLoadedMiles: totalLoadedMiles - deletedLoadedMiles
        }
        Broker.findById(brokerId)
        .then( broker => broker.update(updateBroker))

      } else {
        Broker.destroy({ where: { id: brokerId } })
      }
    })
    .then( (d) => {
      console.log('broker destroyed ', d)
      res.status(204).end()}
    )
    .catch( (error) => res.status(400).send(error))
  })


})

router.post('/existingload', (req, res, next) => {

  const loadId = req.body.id;
  console.log('*** POST EXISTING LOAD: ', req.body, " LOAD_ID: ", loadId)
  const loadObj = req.body;

  Load.findOne({
    where: { id: loadId },
    include: [ { model: Broker }]
  })
  .then( load => {
    if(!load){
      return res.status(404).send({
        message: "Load Not Found"
      })
    }

    let bookedLoads = Number(load.broker.dataValues.bookedLoads);
    let updateBroker = {};

    // first seed code
    // if( bookedLoads >= 1 ){
    // normal code
    if( bookedLoads > 1 ){
// console.log('..................', loadObj.payment, '...........', load,'........' ,load.payment)
      const paymentChange = loadObj.payment - load.payment;
      const loadedMilesChange = loadObj.loadedMiles - load.loadedMiles;

      updateBroker = {
         // first seed code
        // bookedLoads: bookedLoads + 1,
        totalPayment: Number(load.broker.dataValues.totalPayment) +
          // first seed code
          // loadObj.payment,
          // normal code
          paymentChange,
        totalLoadedMiles: Number(load.broker.dataValues.totalLoadedMiles) +
          // first seed code
          // loadObj.loadedMiles
          // normal code
          loadedMilesChange
      }
    } else {
      updateBroker = {
        // first seed code
        // bookedLoads: 1,
        totalPayment: Number(loadObj.payment),
        totalLoadedMiles: Number(loadObj.loadedMiles)
      }
    }

    console.log('** LOAD TO UPDATE ', load, "** UPDATED_BROKER", updateBroker)
    return Promise.all(
          [load.broker.updateAttributes(updateBroker),
          load.update(loadObj)]
    )
    .then( load => {
      console.log('*** UPDATED LOAD ', load);
      res.json( load.dataValues )
    })
    .catch( (error) => res.status(400).send(error))
  })


})

router.post('/newload', (req, res, next) => {
  const loadObj = req.body;
  console.log('*** routes newLoad req.body: ', loadObj)

//new load with new broker - first create broker with and id, then Load can be created
  if(!loadObj.brokerId){

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
