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

router.post('/', (req, res, next) => {

  const loadId = req.body._original.id ? req.body._original.id : 0;
  console.log('*** post loads: ', req.body, " loadId: ", loadId)

  const loadObj = {
    pickupDate: req.body.pickupDate,
    truckId: req.body.truckId,
    driverName: req.body.driverName,
    driverId: req.body.driverId,
    loadNumber: req.body.loadNumber,
    brokerName: req.body.brokerName,
    brokerId: req.body.brokerId,
    shipper:req.body.shipper,
    consignee:req.body.consignee,
    pickUpCityState: req.body.pickUpCityState,
    dropOffCityState: req.body.dropOffCityState,
    pickUpAddress: req.body.pickUpAddress,
    dropOffAddress: req.body.dropOffAddress,
    payment: req.body.payment,
    loadedMiles: req.body.loadedMiles,
    emptyMiles: req.body.emptyMiles,
    mileage: req.body.mileage,
    dollarPerMile: req.body.dollarPerMile,
    fuelCost: req.body.fuelCost,
    driverPay: req.body.driverPay,
    dispatchFee: req.body.dispatchFee,
    lumper: req.body.lumper,
    detention: req.body.detention,
    detentionDriverPay: req.body.detentionDriverPay,
    secondStopDriverPay: req.body.secondStopDriverPay,
    lateFee: req.body.lateFee,
    toll: req.body.toll,
    roadMaintenance: req.body.roadMaintenance,
    otherExpenses: req.body.otherExpenses,
    totalExpenses: req.body.totalExpenses,
    profit: req.body.profit,
    commodity: req.body.commodity,
    weight: req.body.weight,
    trailer: req.body.trailer,
    confirmFilePath: req.body.confirmFilePath,
  }
//if with new broker - first create broker with and id, then Load can be created
  if(!loadId){

    Broker.create({
      name: req.body.brokerName,
    })
    .then( broker => {
      console.log('broker ', broker, " Brokerid ", broker.dataValues.id)

      loadObj.brokerId = broker.dataValues.id;
    })
    .then( () => {
      Load.create(loadObj)
      .then( (load) => res.status(200).send(load))
      .catch( (error) => res.status(400).send(error))
     })

  }else{
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
      const updateBroker = {
        bookedLoads: Number(load.broker.bookedLoads) + 1,
        totalPayment: Number(load.broker.totalPayment) +
          Number(loadObj.payment),
        totalLoadedMiles: Number(load.broker.totalLoadedMiles) +
          Number(loadObj.loadedMiles)
      }

      console.log('** load ', load, "** updateBroker", updateBroker)
      return Promise.all(

           [load.broker.updateAttributes(updateBroker),
           load.update(loadObj)]
      )
      //return load.Broker.updateAttributes(updateBroker)
      // return load.update(loadObj)
      .then( () => res.status(200).send(load))
      .catch( (error) => res.status(400).send(error))
    })

  }

})

module.exports = router;
