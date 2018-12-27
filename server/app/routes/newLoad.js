'use strict';

const express = require('express');
const router = new express.Router();
const Load = require('../db/models').Load;
const Broker = require('../db/models').Broker;
const Truck = require('../db/models').Truck;
const Company = require('../db/models').Company;


router.post('/', (req, res, next) => {

  console.log('*** post new loads: ', req.body)

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

//new load with new broker - first create broker with and id, then Load can be created
  if(!loadObj.brokerId){

    Broker.create({
      name: req.body.brokerName,
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
