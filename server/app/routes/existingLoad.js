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

router.post('/', (req, res, next) => {

  const loadId = req.body._original.id;
  console.log('*** POST EXISTING LOAD: ', req.body, " LOAD_ID: ", loadId)

  const loadObj = {
    pickupDate: req.body.pickupDate,
    truckId: req.body.truckId,
    driverName: req.body.driverName,
    driverId: req.body.driverId,
    loadNumber: req.body.loadNumber,
    brokerName: req.body.brokerName,
    brokerId:  typeof(req.body.brokerId) === 'string' ? Number(req.body.brokerId.replace(",", "")) : req.body.brokerId,
    shipper:req.body.shipper,
    consignee:req.body.consignee,
    pickUpCityState: req.body.pickUpCityState,
    dropOffCityState: req.body.dropOffCityState,
    pickUpAddress: req.body.pickUpAddress,
    dropOffAddress: req.body.dropOffAddress,
    payment: typeof(req.body.payment) === 'string' ? Number(req.body.payment.replace(",", "")) : req.body.payment,
    loadedMiles: typeof(req.body.loadedMiles) === 'string' ? Number(req.body.loadedMiles.replace(",", "")) : req.body.loadedMiles,
    emptyMiles: typeof(req.body.emptyMiles) === 'string' ? Number(req.body.emptyMiles.replace(",", "")) : req.body.emptyMiles,
    mileage: typeof(req.body.mileage) === 'string' ? Number(req.body.mileage.replace(",", "")) : req.body.mileage,
    dollarPerMile: typeof(req.body.dollarPerMile) === 'string' ? Number(req.body.dollarPerMile.replace(",", "")) : req.body.dollarPerMile,
    fuelCost: typeof(req.body.fuelCost) === 'string' ? Number(req.body.fuelCost.replace(",", "")) : req.body.fuelCost,
    driverPay: typeof(req.body.driverPay) === 'string' ? Number(req.body.driverPay.replace(",", "")) : req.body.driverPay,
    dispatchFee: typeof(req.body.dispatchFee) === 'string' ? Number(req.body.dispatchFee.replace(",", "")) : req.body.dispatchFee,
    lumper: typeof(req.body.lumper) === 'string' ? Number(req.body.lumper.replace(",", "")) : req.body.lumper,
    detention: typeof(req.body.detention) === 'string' ? Number(req.body.detention.replace(",", "")) : req.body.detention,
    detentionDriverPay: typeof(req.body.detentionDriverPay) === 'string' ? Number(req.body.detentionDriverPay.replace(",", "")) : req.body.detentionDriverPay,
    secondStopDriverPay: typeof(req.body.secondStopDriverPay) === 'string' ? Number(req.body.secondStopDriverPay.replace(",", "")) : req.body.secondStopDriverPay,
    lateFee: typeof(req.body.lateFee) === 'string' ? Number(req.body.lateFee.replace(",", "")) : req.body.lateFee,
    toll: typeof(req.body.toll) === 'string' ? Number(req.body.toll.replace(",", "")) : req.body.toll,
    roadMaintenance: typeof(req.body.roadMaintenance) === 'string' ? Number(req.body.roadMaintenance.replace(",", "")) : req.body.roadMaintenance,
    otherExpenses: typeof(req.body.otherExpenses) === 'string' ? Number(req.body.otherExpenses.replace(",", "")) : req.body.otherExpenses,
    totalExpenses: typeof(req.body.totalExpenses) === 'string' ? Number(req.body.totalExpenses.replace(",", "")) : req.body.totalExpenses,
    profit: typeof(req.body.profit) === 'string' ?  Number(req.body.profit.replace(",", "")) : req.body.profit,
    commodity: req.body.commodity,
    weight:  typeof(req.body.weight) === 'string' ? Number(req.body.weight.replace(",", "")) : req.body.weight,
    trailer: req.body.trailer,
    confirmFilePath: req.body.confirmFilePath,
  }

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

module.exports = router;
