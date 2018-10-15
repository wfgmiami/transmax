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
  console.log('*** post loads', req.body)
  const rowId = req.body._original.id ? req.body._original.id : 0;
  console.log('...............rowId', rowId)

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
  Load.findOrCreate({
      where: { id: rowId },
      defaults: loadObj
      // include: [ Broker ]
    })
    .spread((load, created) => {

      if(created){
        console.log('created------------- ', created)
        // return Load.create(loadObj)
        // return created;
      }else{
        console.log('created.......... ', loadObj)
        return load.update(loadObj)
      }
    })
    // .then( () => res.status(200).send(load))
    // .catch( (error) => res.status(400).send(error))


})
module.exports = router;
